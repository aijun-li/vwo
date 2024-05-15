<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/sonner';
import { Configuration, UserServiceApi } from '@/service/emby';
import { ref } from 'vue';
import { toast } from 'vue-sonner';

const server = ref('');
const account = ref('');
const password = ref('');

async function getUserInfo() {
  const user = new UserServiceApi(
    new Configuration({ basePath: server.value, username: account.value, password: password.value }),
  );

  const result = await user.postUsersAuthenticatebyname(
    { username: account.value, pw: password.value },
    'Emby UserId="e8837bc1-ad67-520e-8cd2-f629e3155721", Client="VWO", Device="PC", DeviceId="xxx", Version="1.0.0.0"',
  );
  toast('Login Succeed!', {
    description: `Access Token: ${result.accessToken}`,
  });
  console.log(result);
}
</script>

<template>
  <div class="h-screen w-screen flex items-center justify-center">
    <div class="flex flex-col gap-4">
      <Input v-model="server" placeholder="server" />
      <Input v-model="account" placeholder="account" />
      <Input v-model="password" placeholder="password" type="password" />
      <Button @click="getUserInfo">Login</Button>
    </div>

    <Toaster position="top-center" :duration="1500" />
  </div>
</template>
