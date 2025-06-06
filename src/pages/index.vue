<template>
  <HelloWorld />
  <v-data-iterator :items="items" :page="page">
    <template v-slot:default="{ items }">
      <template v-for="(item, i) in items" :key="i">
        <v-card :title="item.raw.name" :subtitle="`Created by ${item.raw.created_by}`"
          :text="item.raw.description"></v-card>

        <br>
      </template>
    </template>
  </v-data-iterator>
</template>

<script lang="ts" setup>
import { ref, watchEffect, type Ref } from 'vue'
import { VDataIterator, VCard } from 'vuetify/components';

type Tournament = {
  name: string,
  id: string,
  description: string,
  created_by: string
};
const page = ref(1)
const items: Ref<Tournament[]> = ref([])

watchEffect(async () => {
  items.value = await fetchTournaments()
})

async function fetchTournaments() {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tournaments`)
  return response.json()
}
</script>
