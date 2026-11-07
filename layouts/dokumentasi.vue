<script setup lang="ts">
import AppHeader from "~/components/app/AppHeader.vue";
import AppFooter from "~/components/app/AppFooter.vue";
import SidebarNavigasi from "~/components/dok/SidebarNavigasi.vue";
import { usePreferensiStore } from "~/stores/preferensiStore";

const preferensiStore = usePreferensiStore();
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[var(--latar-utama)]">
    <!-- Header Utama Platform -->
    <AppHeader />

    <!-- Wadah Layout Tiga Kolom Dokumentasi -->
    <div class="flex-1 mx-auto w-full max-w-7xl flex">
      <!-- Drawer Sidebar Mobile -->
      <Teleport to="body">
        <div
          v-if="preferensiStore.drawerMobileTerbuka"
          class="fixed inset-0 z-50 lg:hidden flex"
        >
          <!-- Latar Gelap Belakang Drawer -->
          <div
            class="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            @click="preferensiStore.toggleDrawerMobile(false)"
          ></div>

          <!-- Panel Konten Drawer -->
          <div class="relative w-80 max-w-[85vw] h-full shadow-2xl z-10">
            <SidebarNavigasi />
          </div>
        </div>
      </Teleport>

      <!-- Sidebar Desktop Kiri (Sticky) -->
      <div
        class="hidden lg:block w-64 xl:w-72 shrink-0 border-r border-[var(--pembatas)]"
      >
        <div class="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <SidebarNavigasi />
        </div>
      </div>

      <!-- Area Tengah: Konten Materi & TOC Kanan -->
      <main class="flex-1 min-w-0 px-4 sm:px-8 lg:px-10 py-8">
        <slot />
      </main>
    </div>

    <!-- Footer Platform -->
    <AppFooter />
  </div>
</template>
