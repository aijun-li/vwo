<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Configuration, UserServiceApi } from '@/service/emby';
import { useUserStore } from '@/store/user';
import { ReloadIcon } from '@radix-icons/vue';
import { useLocalStorage } from '@vueuse/core';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';

const router = useRouter();

const loading = ref(false);

const server = useLocalStorage('server', '');
const account = useLocalStorage('account', '');
const password = useLocalStorage('password', '');

const { updateAuthResult } = useUserStore();

async function getUserInfo() {
  const user = new UserServiceApi(
    new Configuration({ basePath: server.value, username: account.value, password: password.value }),
  );

  loading.value = true;
  const result = await user.postUsersAuthenticatebyname(
    { username: account.value, pw: password.value },
    'Emby UserId="", Client="VWO", Device="PC", DeviceId="xxx", Version="1.0.0"',
  );
  loading.value = false;
  toast('Login Succeed!');

  updateAuthResult(result);

  router.push({ name: 'home' });
}
</script>

<template>
  <div class="h-screen w-screen flex flex-col items-center justify-center">
    <div class="flex-grow-[1]" />
    <div class="flex flex-col gap-4 w-[50%] max-w-[300px]">
      <div class="text-center font-bold text-5xl mb-8">VWO</div>
      <Input v-model="server" placeholder="server" :disabled="loading" />
      <Input v-model="account" placeholder="account" :disabled="loading" />
      <Input v-model="password" placeholder="password" type="password" :disabled="loading" />
      <Button :disabled="loading" @click="getUserInfo">
        <ReloadIcon v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
        Login
      </Button>
    </div>
    <div class="flex-grow-[2]" />
  </div>
</template>
