<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";
import {
  useRoute,
  type LocationQuery,
  type LocationQueryValue,
} from "vue-router";

const { query } = useRoute();

const viewers = ref(0);
watch(
  [() => query.twitch, () => query.kick, () => query.youtube],
  fetchViewers,
  { immediate: true },
);

const intervalId = setInterval(
  () => fetchViewers([query.twitch, query.kick, query.youtube]),
  60 * 1000,
);

onBeforeUnmount(() => clearInterval(intervalId));

async function fetchViewers([twitch, kick, youtube]: (
  | LocationQueryValue
  | LocationQueryValue[]
  | undefined
)[]) {
  if (!twitch && !kick && !youtube) {
    viewers.value = 0;
  }
  const params = new URLSearchParams();
  if (twitch) {
    params.set("twitch", twitch.toString());
  }
  if (kick) {
    params.set("kick", kick.toString());
  }
  if (youtube) {
    params.set("youtube", youtube.toString());
  }
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/stream/viewers?${params.toString()}`,
  );
  const body = await response.json();
  viewers.value = body.total;
}
</script>
<template>
  <div>{{ viewers }}</div>
</template>
<style lang="css">
html {
  background-color: transparent;
  overflow: hidden;
}
.navbar {
  display: none;
}
</style>
