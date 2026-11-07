<script setup lang="ts">
import AppHeader from "~/components/app/AppHeader.vue";
import AppFooter from "~/components/app/AppFooter.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
