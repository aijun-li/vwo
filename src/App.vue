<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner';
import { useUserStore } from '@/store/user';
import { RouterView, useRouter } from 'vue-router';

const router = useRouter();

const { accessToken } = useUserStore();

if (!accessToken.value) {
  router.push({ name: 'login' });
}
</script>

<template>
  <div class="h-screen w-screen">
    <RouterView />
    <Toaster position="top-center" :duration="1500" />
  </div>
</template>
