import {createRouter, createWebHashHistory} from 'vue-router'

import MainPage from "../components/main-page/MainPage.vue";
import AboutUsPage from "../components/AboutUsPage.vue";
import ContactsPage from "../components/ContactsPage.vue";
import GalleryPage from "../components/GalleryPage.vue";
import NewsPage from "../components/NewsPage.vue";

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
  history: createWebHashHistory()
})

export default router
