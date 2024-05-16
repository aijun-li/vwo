<script lang="ts" setup>
import { BaseItemDto, Configuration, UserViewsServiceApi } from '@/service/emby';
import { useUserStore } from '@/store/user';
import { useLocalStorage } from '@vueuse/core';
import { onMounted, ref } from 'vue';

const basePath = useLocalStorage('server', '');
const { user, accessToken } = useUserStore();

const views = ref<BaseItemDto[]>([]);

onMounted(async () => {
  const api = new UserViewsServiceApi(new Configuration({ basePath: basePath.value, accessToken: accessToken.value }));

  const { items = [] } = await api.getUsersByUseridViews(user.value?.id ?? '', false, {
    headers: {
      'X-Emby-Authorization': `Emby UserId="${user.value?.id ?? ''}", Client="VWO", Device="PC", DeviceId="xxx", Version="1.0.0"`,
      'X-Emby-Token': accessToken.value ?? '',
    },
  });

  views.value = items;
});
</script>

<template>
  <div class="p-4">
    <div class="font-bold text-2xl">VWO</div>
    <div>
      <div v-for="view in views" :key="view.id">
        {{ view.name }}
      </div>
    </div>
  </div>
</template>
