import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Collection Personnes
const personnes = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/personnes' }),
  schema: z.object({
    nom: z.string(),
    photo: z.string().optional(),
    email: z.string().optional(),
    telephone: z.string().optional(),
    bio: z.string().optional(),
  }),
});

// Collection Saisons
const saisons = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/saisons' }),
  schema: z.object({
    nom: z.string(),
    current: z.boolean().default(false),
  }),
});

// Collection Équipes
const equipes = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/equipes' }),
  schema: z.object({
    nom: z.string(),
    niveau: z.string(),
    saison: z.string().optional(),
    ordre: z.number().default(0),
    lien_classement: z.string().optional(),
    description: z.string().optional(),
    coaches: z.array(z.object({
      personne: z.string().optional(),
      role: z.string().optional(),
    })).optional(),
    photo_equipe: z.string().optional(),
    planning_texte: z.string().optional(),
    entrainements: z.array(z.object({
      jour: z.string(),
      heure_debut: z.string(),
      heure_fin: z.string(),
      salle: z.string().optional(),
    })).optional(),
  }),
});


// Collection Stats
const stats = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/stats' }),
  schema: z.object({
    name: z.string(),
    value: z.number(),
    sigle: z.string().optional(),
    ordre: z.number().default(0),
  }),
});

// Collection Partenaires
const partenaires = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/partenaires' }),
  schema: z.object({
    nom: z.string(),
    logo: z.string(),
    url: z.string().optional(),
    niveau: z.enum(['principal', 'premium', 'standard']).default('standard'),
    ordre: z.number().default(0),
  }),
});

// Collection Salles
const salles = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/salles' }),
  schema: z.object({
    nom: z.string(),
    type: z.enum(['gymnase', 'salle_polyvalente', 'complexe']).default('gymnase'),
    adresse: z.string(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    photo: z.string().optional(),
    notice_url: z.string().optional(),
    ordre: z.number().default(0),
  }),
});

// Collection Albums Photo
const albums = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/albums' }),
  schema: z.object({
    nom: z.string(),
    date: z.coerce.date(),
    cover_image: z.string().optional(),
    lien_externe: z.string(),
    ordre: z.number().default(0),
  }),
});

// Collection Configs (singletons Keystatic)
const configs = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/config' }),
});

export const collections = {
  personnes,
  equipes,
  saisons,
  stats,
  partenaires,
  salles,
  albums,
  configs,
};
