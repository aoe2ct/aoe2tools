<template>
  <div class="container fill-height" max-width="900">
    <div class="tournament-list">
      <div class="card" v-for="item in items">
        <!--
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="https://bulma.io/assets/images/placeholders/1280x960.png" alt="Placeholder image" />
          </figure>
        </div>
-->
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{ item.name }}</p>
              <p class="subtitle is-6">Created by <em>{{ item.created_by }}</em></p>
            </div>
          </div>

          <div class="content">
            {{ item.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Tournament } from '@/utils/tournament'
import { ref, watchEffect, type Ref } from 'vue'

const items: Ref<Tournament[]> = ref([])

watchEffect(async () => {
  items.value = await fetchTournaments()
})

async function fetchTournaments() {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tournaments`)
  return response.json()
}
</script>

<style lang="scss" scoped>
.tournament-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
}
</style>
