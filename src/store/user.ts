import { AuthenticationAuthenticationResult } from '@/service/emby';
import { withRefs } from '@/utils/pinia';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUserStore = withRefs(
  defineStore('user', () => {
    const authResult = ref<AuthenticationAuthenticationResult>();

    const user = computed(() => authResult.value?.user);
    const accessToken = computed(() => authResult.value?.accessToken ?? '');
    const serverId = computed(() => authResult.value?.serverId ?? '');

    function updateAuthResult(result: AuthenticationAuthenticationResult) {
      authResult.value = result;
    }

    return {
      user,
      accessToken,
      serverId,

      updateAuthResult,
    };
  }),
);
