<template>
  <section class="container">
    <b-field label="Tournament Name">
      <b-input v-model="tournament.name"></b-input>
    </b-field>

    <b-field label="Abbreviation">
      <b-input v-model="tournament.id" maxlength="30"></b-input>
    </b-field>

    <b-field label="Description">
      <b-input maxlength="200" type="textarea"></b-input>
    </b-field>

    <b-field label="Created by">
      <b-input :model-value="tournament.created_by" :readonly="true"></b-input>
    </b-field>

    <b-button type="is-primary" @click="">Add tournament</b-button>
  </section>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import type { Tournament } from '@/utils/tournament';
import { ref, watchEffect } from 'vue';

const authStore = useAuthStore();

const tournament = ref<Tournament>({
  name: '',
  id: '',
  description: '',
  created_by: '<missing>'
})

watchEffect(() => tournament.value.created_by = authStore.userInfo.authenticated ? authStore.userInfo.username : '<missing>');
</script>
