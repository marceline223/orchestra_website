import {createRouter, createWebHistory} from 'vue-router'

import MainPage from "../pages/main-page/MainPage.vue";
import AboutUsPage from "../pages/AboutUsPage.vue";
import ContactsPage from "../pages/ContactsPage.vue";
import GalleryPage from "../pages/GalleryPage.vue";
import NewsPage from "../pages/NewsPage.vue";
import AboutAuditionPage from "../pages/AboutAuditionPage.vue";
import ErrorPage from "../pages/ErrorPage.vue";

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
  {
    path: '/audition',
    name: 'О прослушивании',
    component: AboutAuditionPage,
  },
  {
    path: '/:catchAll(.*)',
    name: 'Страница не найдена',
    component: ErrorPage,
  },
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
