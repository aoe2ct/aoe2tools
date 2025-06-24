import { defineStore } from "pinia";
import { type Ref, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const credentials: Ref<string | null> = ref(localStorage.getItem('credentials'));

  function hasTokens() {
    console.log(credentials.value)
    return !!credentials.value
  }

  function getAuthorizationHeaders(): {} | { Authorization: string } {
    if (!(credentials.value)) {
      return {}
    }
    console.log({ value: credentials.value });
    const tokens = JSON.parse(credentials.value);
    return {
      Authorization: `Bearer ${tokens.access_token}`
    }
  }

  function setCredentials(tokens: string) {
    localStorage.setItem('credentials', tokens)
    credentials.value = tokens
  }

  function removeCredentials() {
    localStorage.removeItem('credentials')
    credentials.value = null
  }

  return { credentials, getAuthorizationHeaders, setCredentials, hasTokens, removeCredentials }
})
