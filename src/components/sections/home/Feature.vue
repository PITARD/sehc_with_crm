<template>
  <div class="bg-yellow-100 py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2 class="text-base/7 font-semibold text-yellow-600">Bienvenue</h2>
        <p
          class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
          Rejoignez notre famille de handball
        </p>
        <p class="mt-6 text-lg/8 text-gray-600">
          Au Sud Estuaire Handball Club, nous cultivons un esprit de famille où
          chaque membre est valorisé. Notre passion pour le sport et
          l'inclusivité font de nous un lieu unique pour tous.
        </p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl
          class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          <div
            v-for="feature in features"
            :key="feature.name"
            class="flex flex-col">
            <dt
              class="flex items-center gap-x-3 text-base/7 font-semibold text-gray-900">
              <component
                :is="feature.icon"
                class="size-5 flex-none text-yellow-600"
                aria-hidden="true" />
              {{ feature.name }}
            </dt>
            <dd class="mt-4 flex flex-auto flex-col text-base/7 text-gray-600">
              <p class="flex-auto">{{ feature.description }}</p>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  UserGroupIcon,
  CursorArrowRaysIcon,
  AcademicCapIcon,
} from "@heroicons/vue/20/solid";

const features = [
  {
    name: "Un esprit de famille inégalé",
    description:
      "Ici, dans cet espace chaleureux et accueillant, chaque joueur se sent véritablement chez lui, entouré d'une ambiance conviviale qui favorise l'interaction et l'amitié.",
    href: "#",
    icon: UserGroupIcon,
  },
  {
    name: "Inclusivité pour tous les âges et niveaux",
    description:
      "Nous accueillons des joueurs de tout horizon, que ce soit des amateurs passionnés, des compétiteurs aguerris ou simplement des personnes désireuses de découvrir le plaisir du jeu. Chacun d'eux apporte une richesse d'expériences et de cultures qui enrichissent notre communauté.",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Passion pour le handball à chaque entraînement",
    description:
      "Venez partager avec nous l'amour que nous éprouvons pour le jeu et découvrir ensemble des moments de joie et de camaraderie.",
    href: "#",
    icon: AcademicCapIcon,
  },
];
</script>
