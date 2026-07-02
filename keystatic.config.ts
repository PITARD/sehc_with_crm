import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
  kind: 'github',
  repo: 'PITARD/sehc_with_crm',
},
  collections: {
    // Collection Personnes - Informations de base uniquement
    personnes: collection({
      label: 'Personnes',
      slugField: 'nom',
      path: 'src/content/personnes/*',
      schema: {
        nom: fields.slug({ name: { label: 'Nom complet' } }),
        photo: fields.image({
          label: 'Photo',
          directory: 'public/images/personnes',
          publicPath: '/images/personnes/',
        }),
        email: fields.text({
          label: 'Email',
          description: 'Optionnel'
        }),
        telephone: fields.text({
          label: 'Téléphone',
          description: 'Optionnel'
        }),
        bio: fields.text({
          label: 'Biographie courte',
          multiline: true,
          description: 'Optionnel - quelques lignes sur la personne'
        }),
      },
    }),

    // Collection Saisons
    saisons: collection({
      label: 'Saisons',
      slugField: 'nom',
      path: 'src/content/saisons/*',
      schema: {
        nom: fields.slug({ name: { label: 'Saison (ex: 2025-2026)' } }),
        current: fields.checkbox({
          label: 'Saison actuelle',
          defaultValue: false,
          description: 'Cocher pour indiquer que c\'est la saison en cours',
        }),
      },
    }),

    // Collection Équipes
    equipes: collection({
      label: 'Équipes',
      slugField: 'nom',
      path: 'src/content/equipes/*',
      format: { contentField: 'description' },
      schema: {
        nom: fields.slug({
          name: {
            label: 'Nom de l\'équipe',
            description: 'Ex: Sénior Masculins (le slug sera généré automatiquement)'
          }
        }),
        saison: fields.relationship({
          label: 'Saison',
          collection: 'saisons',
          description: 'Saison à laquelle appartient cette équipe',
        }),
        ordre: fields.number({
          label: 'Ordre d\'affichage',
          defaultValue: 0,
          description: 'Plus le nombre est petit, plus l\'équipe apparaît en premier',
        }),
        niveau: fields.text( { label: 'Niveau' } ),
        lien_classement: fields.url({
          label: 'Lien classement fédération',
          description: 'URL vers le classement sur le site de la fédération (optionnel)'
        }),
        coaches: fields.array(
          fields.object({
            personne: fields.relationship({
              label: 'Personne',
              collection: 'personnes',
            }),
            role: fields.text({
              label: 'Rôle spécifique',
              description: 'Ex: Entraîneur principal, Entraîneur adjoint, etc.'
            }),
          }),
          {
            label: 'Entraîneurs/Coaches',
            itemLabel: (props) => props.fields.role.value || 'Coach',
          }
        ),
        photo_equipe: fields.image({
          label: 'Photo d\'équipe (Paysage recommandé)',
          directory: 'public/images/equipes',
          publicPath: '/images/equipes/',
          description: 'Format paysage/landscape pour voir toute l\'équipe (ex: 1600x900, 1920x1080)'
        }),
        description: fields.markdoc({
          label: 'Description',
          extension: 'mdoc',
        }),
        planning_texte: fields.text({
          label: 'Planning (texte)',
          multiline: true,
          description: 'Ex: Entraînements : Mardi 19h, Jeudi 20h'
        }),
        entrainements: fields.array(
          fields.object({
            jour: fields.select({
              label: 'Jour de la semaine',
              options: [
                { label: 'Lundi', value: 'lundi' },
                { label: 'Mardi', value: 'mardi' },
                { label: 'Mercredi', value: 'mercredi' },
                { label: 'Jeudi', value: 'jeudi' },
                { label: 'Vendredi', value: 'vendredi' },
                { label: 'Samedi', value: 'samedi' },
                { label: 'Dimanche', value: 'dimanche' },
              ],
              defaultValue: 'lundi',
            }),
            heure_debut: fields.text({
              label: 'Heure de début',
              description: 'Format: 20h00'
            }),
            heure_fin: fields.text({
              label: 'Heure de fin',
              description: 'Format: 22h00'
            }),
            salle: fields.relationship({
              label: 'Salle/Gymnase',
              collection: 'salles',
            }),
          }),
          {
            label: 'Entraînements',
            itemLabel: (props) => `${props.fields.jour.value} ${props.fields.heure_debut.value || ''}`,
          }
        ),
      },
    }),

    // Collection Partenaires
    partenaires: collection({
      label: 'Partenaires',
      slugField: 'nom',
      path: 'src/content/partenaires/*',
      schema: {
        nom: fields.slug({ name: { label: 'Nom du partenaire' } }),
        logo: fields.image({
          label: 'Logo',
          directory: 'public/images/partenaires',
          publicPath: '/images/partenaires/',
        }),
        url: fields.url({ label: 'Site web (optionnel)' }),
        niveau: fields.select({
          label: 'Niveau de partenariat',
          options: [
            { label: 'Partenaire principal', value: 'principal' },
            { label: 'Partenaire premium', value: 'premium' },
            { label: 'Partenaire', value: 'standard' },
          ],
          defaultValue: 'standard',
        }),
        ordre: fields.number({
          label: 'Ordre d\'affichage',
          defaultValue: 0,
          description: 'Plus le nombre est petit, plus le partenaire sera affiché en premier'
        }),
      },
    }),

    // Collection Albums Photo
    albums: collection({
      label: 'Albums Photo',
      slugField: 'nom',
      path: 'src/content/albums/*',
      schema: {
        nom: fields.slug({
          name: {
            label: 'Nom de l\'album',
            description: 'Ex: Tournoi de Noël 2024'
          }
        }),
        date: fields.date({
          label: 'Date',
          description: 'Date de l\'événement ou de l\'album'
        }),
        cover_image: fields.image({
          label: 'Image de couverture',
          directory: 'public/images/albums',
          publicPath: '/images/albums/',
          description: 'Image de couverture de l\'album'
        }),
        lien_externe: fields.url({
          label: 'Lien vers l\'album',
          description: 'Lien vers l\'album Google Photos, Flickr, etc.'
        }),
        ordre: fields.number({
          label: 'Ordre d\'affichage',
          defaultValue: 0,
          description: 'Plus le nombre est petit, plus l\'album sera affiché en premier'
        }),
      },
    }),

    // Collection Stats (existante, améliorée)
    stats: collection({
      label: 'Statistiques',
      slugField: 'name',
      path: 'src/content/stats/*',
      schema: {
        name: fields.slug({ name: { label: 'Nom' } }),
        value: fields.number({ label: 'Valeur' }),
        sigle: fields.text({
          label: 'Suffixe/Symbole',
          description: 'Ex: %, +, années, etc.'
        }),
        ordre: fields.number({
          label: 'Ordre d\'affichage',
          defaultValue: 0,
        }),
      },
    }),

    // Collection Salles/Gymnases
    salles: collection({
      label: 'Salles',
      slugField: 'nom',
      path: 'src/content/salles/*',
      format: { contentField: 'description' },
      schema: {
        nom: fields.slug({ name: { label: 'Nom de la salle' } }),
        type: fields.select({
          label: 'Type de salle',
          options: [
            { label: 'Gymnase', value: 'gymnase' },
            { label: 'Salle polyvalente', value: 'salle_polyvalente' },
            { label: 'Complexe sportif', value: 'complexe' },
          ],
          defaultValue: 'gymnase',
        }),
        adresse: fields.text({
          label: 'Adresse complète',
          multiline: true,
        }),
        latitude: fields.number({
          label: 'Latitude',
          description: 'Coordonnée GPS pour la carte'
        }),
        longitude: fields.number({
          label: 'Longitude',
        }),
        photo: fields.image({
          label: 'Photo de la salle',
          directory: 'public/images/salles',
          publicPath: '/images/salles/',
        }),
        description: fields.markdoc({
          label: 'Description',
          extension: 'mdoc',
        }),
        notice_url: fields.url({
          label: 'Lien vers la notice/plan',
          description: 'Optionnel - Google Maps, PDF, etc.'
        }),
        ordre: fields.number({
          label: 'Ordre d\'affichage',
          defaultValue: 0,
        }),
      },
    }),
  },

  singletons: {
    // Configuration globale
    global_config: singleton({
      label: 'Configuration globale',
      path: 'src/content/config/global',
      schema: {
        // Informations du club
        club_nom: fields.text({ label: 'Nom du club', defaultValue: 'Sud Estuaire Handball Club' }),
        club_email: fields.text({ label: 'Email de contact' }),
        club_telephone: fields.text({ label: 'Téléphone' }),
        club_adresse: fields.text({
          label: 'Adresse',
          multiline: true,
        }),

        // Réseaux sociaux
        facebook_url: fields.url({ label: 'URL Facebook' }),
        instagram_url: fields.url({ label: 'URL Instagram' }),

        // Navigation
        navigation: fields.array(
          fields.object({
            label: fields.text({ label: 'Libellé' }),
            url: fields.text({ label: 'URL' }),
          }),
          {
            label: 'Menu de navigation',
            itemLabel: (props) => props.fields.label.value || 'Lien',
          }
        ),

        // Footer
        footer_texte: fields.text({
          label: 'Texte du footer',
          defaultValue: '© 2025 Sud Estuaire Handball Club. Tous droits réservés.',
        }),
        mentions_legales: fields.markdoc({
          label: 'Mentions légales',
          extension: 'mdoc',
        }),
      },
    }),

    // Contenu de la page d'accueil
    home_content: singleton({
      label: 'Page d\'accueil',
      path: 'src/content/config/home',
      schema: {
        // Section Hero
        hero_titre: fields.text({
          label: 'Titre principal',
          defaultValue: 'Bienvenue au Club de Handball Sud Estuaire',
        }),
        hero_sous_titre: fields.text({
          label: 'Sous-titre',
          multiline: true,
          defaultValue: 'Rejoignez-nous pour partager notre passion du handball et vivre des moments inoubliables en communauté.',
        }),
        hero_image: fields.image({
          label: 'Image hero',
          directory: 'public/images/home',
          publicPath: '/images/home/',
        }),
        hero_cta_texte: fields.text({
          label: 'Texte bouton principal',
          defaultValue: 'Infos Sportives',
        }),
        hero_cta_lien: fields.text({
          label: 'Lien bouton principal',
          defaultValue: '/infos-sportive',
        }),
        hero_cta_secondaire_texte: fields.text({
          label: 'Texte bouton secondaire',
          defaultValue: 'Nous rejoindre',
        }),
        hero_cta_secondaire_lien: fields.text({
          label: 'Lien bouton secondaire',
          defaultValue: '/inscription',
        }),

        // Galerie hero (5 images)
        hero_galerie: fields.array(
          fields.image({
            label: 'Image',
            directory: 'public/images/home/galerie',
            publicPath: '/images/home/galerie/',
          }),
          {
            label: 'Galerie hero'
          }
        ),

        // Sections
        section_features_titre: fields.text({
          label: 'Titre section features',
          defaultValue: 'Rejoignez notre famille de handball',
        }),
        section_features_description: fields.text({
          label: 'Description section features',
          multiline: true,
        }),

        section_stats_titre: fields.text({
          label: 'Titre section statistiques',
          defaultValue: 'Nos Performances',
        }),
        section_stats_description: fields.text({
          label: 'Description section statistiques',
          defaultValue: 'Découvrez les statistiques du club !',
        }),

        // Testimonial
        testimonial_texte: fields.text({
          label: 'Citation/Témoignage',
          multiline: true,
        }),
        testimonial_auteur: fields.text({
          label: 'Auteur',
          defaultValue: 'Jean-Yves PIBERNE',
        }),
        testimonial_role: fields.text({
          label: 'Rôle',
          defaultValue: 'Président du club',
        }),
        testimonial_photo: fields.image({
          label: 'Photo',
          directory: 'public/images/testimonial',
          publicPath: '/images/testimonial/',
        }),

        section_partenaires_titre: fields.text({
          label: 'Titre section partenaires',
          defaultValue: 'Accompagné par nos partenaires de confiance.',
        }),
      },
    }),

    // Page Club
    page_club: singleton({
      label: 'Page Club',
      path: 'src/content/config/page-club',
      schema: {
        // Section En-tête
        entete_titre: fields.text({
          label: 'Titre en-tête',
          defaultValue: 'Bienvenue au Club',
        }),
        entete_description: fields.text({
          label: 'Description en-tête',
          multiline: true,
          defaultValue: 'Introduction au Club Sud Estuaire Handball, mettant en avant son histoire et son engagement envers la communauté.',
        }),

        // Section À Propos
        apropos_titre: fields.text({
          label: 'Titre section À Propos',
          defaultValue: 'Notre Histoire',
        }),
        apropos_contenu: fields.text({
          label: 'Contenu À Propos',
          multiline: true,
          defaultValue: 'Histoire du club, depuis sa fondation jusqu\'à aujourd\'hui, en soulignant les moments clés et les accomplissements.',
        }),

        // Section Conseil d'Administration
        conseil_titre: fields.text({
          label: 'Titre section Conseil',
          defaultValue: 'Le Conseil d\'Administration',
        }),

        // Le Bureau
        bureau_membres: fields.array(
          fields.object({
            personne: fields.relationship({
              label: 'Personne',
              collection: 'personnes',
            }),
            fonction: fields.text({
              label: 'Fonction',
              description: 'Ex: CO-PRÉSIDENT, TRÉSORIÈRE, SECRÉTAIRE, etc.'
            }),
            email: fields.text({
              label: 'email',
              defaultValue: 'contact@sehc.fr',
            }),
          }),
          {
            label: 'Le Bureau',
            itemLabel: (props) => props.fields.fonction.value || 'Membre du bureau',
          }
        ),

        // Les Membres du Conseil
        conseil_membres: fields.array(
          fields.relationship({
            label: 'Membre',
            collection: 'personnes',
          }),
          {
            label: 'Les Membres du Conseil',
            itemLabel: (props) => props.value || 'Membre',
          }
        ),

        // Section Arbitres
        arbitres_titre: fields.text({
          label: 'Titre section arbitres',
          defaultValue: 'Nos Arbitres',
        }),
        arbitres: fields.array(
          fields.object({
            personne: fields.relationship({
              label: 'Personne',
              collection: 'personnes',
            }),
            grade: fields.text({
              label: 'Grade',
              description: 'Ex: Arbitre Départemental, Arbitre Régional, etc.'
            }),
          }),
          {
            label: 'Arbitres',
            itemLabel: (props) => props.fields.grade.value || 'Arbitre',
          }
        ),

        // Section Commissions
        commissions: fields.array(
          fields.object({
            nom: fields.text({ label: 'Nom de la commission' }),
            description: fields.text({
              label: 'Description/Missions',
              multiline: true,
              description: 'Liste des missions (une par ligne)',
            }),
            email: fields.text({ label: 'Email de contact' }),
            icone: fields.select({
              label: 'Icône',
              options: [
                { label: 'Sifflet (Sportive)', value: 'whistle' },
                { label: 'Boutique (Partenaires)', value: 'store' },
                { label: 'Communication', value: 'communication' },
                { label: 'Discipline', value: 'discipline' },
                { label: 'Bière (Animations)', value: 'beer' },
              ],
              defaultValue: 'whistle',
            }),
          }),
          {
            label: 'Les Commissions',
            itemLabel: (props) => props.fields.nom.value || 'Commission',
          }
        ),

        // Section Boutique
        boutique_titre: fields.text({
          label: 'Titre section Boutique',
          defaultValue: 'Notre Boutique',
        }),
        boutique_description: fields.text({
          label: 'Description boutique',
          multiline: true,
          defaultValue: 'Section dédiée à la boutique en ligne où les joueurs et supporteurs peuvent acheter des équipements et des vêtements du club.',
        }),
        boutique_lien: fields.text({
          label: 'Lien vers la boutique',
          defaultValue: '#',
        }),
      },
    }),

    // Page Inscription
    page_inscription: singleton({
      label: 'Page Inscription',
      path: 'src/content/config/page-inscription',
      schema: {
        // Section Hero
        hero_titre: fields.text({
          label: 'Titre principal',
          defaultValue: 'Rejoignez le SEHC',
        }),
        hero_description: fields.text({
          label: 'Description',
          multiline: true,
          defaultValue: 'Que vous soyez débutant ou confirmé, enfant ou adulte, rejoignez notre club et découvrez la passion du handball!',
        }),
        hero_image: fields.image({
          label: 'Image hero',
          directory: 'public/images/inscription',
          publicPath: '/images/inscription/',
        }),
        bouton_inscription_texte: fields.text({
          label: 'Texte bouton inscription',
          defaultValue: 'S\'inscrire maintenant',
        }),
        bouton_inscription_url: fields.text({
          label: 'Lien formulaire inscription',
          description: 'URL du formulaire HelloAsso ou autre',
        }),

        // Section Documentation
        section_docs_titre: fields.text({
          label: 'Titre section documents',
          defaultValue: 'Documents nécessaires',
        }),
        documents: fields.array(
          fields.object({
            nom: fields.text({ label: 'Nom du document' }),
            description: fields.text({
              label: 'Description',
              multiline: true,
            }),
            icone: fields.select({
              label: 'Icône',
              options: [
                { label: 'Document', value: 'document' },
                { label: 'Certificat médical', value: 'medical' },
                { label: 'Photo', value: 'photo' },
                { label: 'Carte d\'identité', value: 'id-card' },
              ],
              defaultValue: 'document',
            }),
            fichier: fields.file({
              label: 'Fichier à télécharger',
              description: 'Fichier PDF ou autre document à joindre',
              directory: 'public/documents/inscription',
              publicPath: '/documents/inscription/',
            }),
          }),
          {
            label: 'Liste des documents',
            itemLabel: (props) => props.fields.nom.value || 'Document',
          }
        ),

        // Section HelloAsso
        section_formulaire_titre: fields.text({
          label: 'Titre section formulaire',
          defaultValue: 'Formulaire d\'inscription',
        }),
        helloasso_url: fields.text({
          label: 'URL HelloAsso',
          description: 'URL complète de l\'iframe HelloAsso',
        }),
      },
    }),

    // Page Infos Sportive
    page_infos_sportive: singleton({
      label: 'Page Infos Sportive',
      path: 'src/content/config/page-infos-sportive',
      schema: {
        entete_titre: fields.text({
          label: 'Titre en-tête',
          defaultValue: 'Informations Sportives',
        }),

        // Section 1: Planning
        section_planning_titre: fields.text({
          label: 'Titre section planning',
          defaultValue: 'Planning Matchs & Tâches',
        }),
        planning_matchs_image: fields.image({
          label: 'Image planning des matchs',
          directory: 'public/images/infos-sportive',
          publicPath: '/images/infos-sportive/',
          description: 'Planning des matchs (PDF converti en image ou capture d\'écran)'
        }),
        planning_taches_image: fields.image({
          label: 'Image planning des tâches',
          directory: 'public/images/infos-sportive',
          publicPath: '/images/infos-sportive/',
          description: 'Planning des tâches (PDF converti en image ou capture d\'écran)'
        }),

        // Section 2: Entraînements
        section_entrainements_titre: fields.text({
          label: 'Titre section entraînements',
          defaultValue: 'Horaires des Entraînements',
        }),

        // Section 3: Salles
        section_salles_titre: fields.text({
          label: 'Titre section salles',
          defaultValue: 'Nos Gymnases',
        }),
      },
    }),

    // Page Boutique
    page_boutique: singleton({
      label: 'Page Boutique',
      path: 'src/content/config/page-boutique',
      schema: {
        titre: fields.text({
          label: 'Titre de la page',
          defaultValue: 'Boutique SEHC',
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          defaultValue: 'Équipez-vous aux couleurs du club ! Découvrez notre boutique en ligne pour acheter vos maillots, équipements et goodies SEHC.',
        }),
        helloasso_url: fields.text({
          label: 'URL HelloAsso',
          description: 'URL complète de l\'iframe HelloAsso pour la boutique',
        }),
      },
    }),
  },
});
