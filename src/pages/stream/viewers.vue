<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { useRoute, type LocationQueryValue } from "vue-router";

const { query } = useRoute();

const viewers = ref(0);
watch(
  [
    () => query.twitch,
    () => query.kick,
    () => query.youtube,
    () => query.yt_playlist,
  ],
  fetchViewers,
  { immediate: true },
);

const intervalId = setInterval(
  () =>
    fetchViewers([query.twitch, query.kick, query.youtube, query.yt_playlist]),
  60 * 1000,
);

onBeforeUnmount(() => clearInterval(intervalId));

async function fetchViewers([twitch, kick, youtube, yt_playlist]: (
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
  if (yt_playlist) {
    params.set("yt_playlist", yt_playlist.toString());
  }
  if (!yt_playlist && youtube) {
    params.set("youtube", youtube.toString());
  }
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/stream/viewers?${params.toString()}`,
  );
  const body = await response.json();
  viewers.value = body.total;
}

const isMemb = computed(
  () =>
    query.twitch?.toString()?.toLowerCase() == "membtv" ||
    query.kick?.toString()?.toLowerCase() == "membtv" ||
    query.youtube?.toString()?.toLowerCase() == "@membtv",
);
</script>
<template>
  <div :class="{ [$style.memb]: isMemb }">{{ viewers }}</div>
</template>
<style lang="css">
html {
  background-color: transparent;
  overflow: hidden;
}
.navbar {
  display: none;
}
@font-face {
  font-family: Muara;
  src: url(@/assets/Muara.ttf);
}
</style>
<style lang="scss" module>
.memb {
  font-family: "Muara";
  font-size: 8em;
  color: white;
  padding: 0.4rem;
}
</style>
