import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const credentials = ref<string | null>(localStorage.getItem('credentials'));

  function hasTokens() {
    return !!credentials.value
  }

  function getAuthorizationHeaders(): {} | { Authorization: string } {
    if (!(credentials.value)) {
      return {}
    }
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

  type UserInfo = { authenticated: false } | { authenticated: true, display_name: string, username: string }

  async function fetchProfile(): Promise<UserInfo> {
    if (!hasTokens()) {
      return { authenticated: false }
    }
    const userResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/me`, { headers: getAuthorizationHeaders(), credentials: "include" })
    if (userResponse.status == 200) {
      return { ...(await userResponse.json()), authenticated: true }

    }
    removeCredentials()
    return { authenticated: false }
  }

  const userInfo = ref<UserInfo>({ authenticated: false });

  watchEffect(async () => {
    userInfo.value = await fetchProfile()
  })


  return { credentials, getAuthorizationHeaders, setCredentials, hasTokens, removeCredentials, userInfo }
})
