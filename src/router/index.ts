import {createRouter, createWebHistory} from 'vue-router'

import MainPage from "../pages/main-page/MainPage.vue";
import AboutUsPage from "../pages/AboutUsPage.vue";
import ContactsPage from "../pages/ContactsPage.vue";
import GalleryPage from "../pages/GalleryPage.vue";
import NewsPage from "../pages/NewsPage.vue";

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainPage,
  },
  {
    path: '/news',
    name: 'Новости',
    component: NewsPage,
  },
  {
    path: '/gallery',
    name: 'Галерея',
    component: GalleryPage,
  },
  {
    path: '/about',
    name: 'О нас',
    component: AboutUsPage,
  },
  {
    path: '/contacts',
    name: 'Контакты',
    component: ContactsPage,
  },
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
