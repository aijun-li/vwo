import EmbyHome from '@/views/EmbyHome.vue';
import Login from '@/views/Login.vue';
import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    component: EmbyHome,
  },
];
