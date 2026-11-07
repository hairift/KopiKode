<script setup lang="ts">
// Komponen pembungkus tabel parameter agar responsif dan selaras dengan design token
</script>

<template>
  <div
    class="my-6 overflow-x-auto rounded-xl border border-[var(--pembatas)] bg-[var(--latar-kartu)] shadow-xs"
  >
    <div class="inline-block min-w-full align-middle">
      <slot />
    </div>
  </div>
</template>

<style scoped>
:deep(table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  text-align: left;
}

:deep(thead) {
  background-color: var(--latar-sekunder);
  border-bottom: 1px solid var(--pembatas);
}

:deep(th) {
  padding: 0.75rem 1rem;
  font-weight: 600;
  color: var(--teks-utama);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

:deep(td) {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--pembatas);
  color: var(--teks-sekunder);
  vertical-align: top;
}

:deep(tr:last-child td) {
  border-bottom: none;
}

:deep(tr:hover td) {
  background-color: var(--latar-sekunder);
}

:deep(code) {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.8125rem;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  background-color: var(--latar-sekunder);
  color: var(--aksen-primer);
  border: 1px solid var(--pembatas);
}
</style>
