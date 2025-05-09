import {createRouter, createWebHistory} from 'vue-router'

import MainPage from "../pages/main-page/MainPage.vue";
import ContactsPage from "../pages/ContactsPage.vue";
import GalleryPage from "../pages/GalleryPage.vue";
import NewsPage from "../pages/NewsPage.vue";
import AboutAuditionPage from "../pages/AboutAuditionPage.vue";
import ErrorPage from "../pages/ErrorPage.vue";
import MembersPage from "../pages/about-us/MembersPage.vue";
import HistoryPage from "../pages/about-us/HistoryPage.vue";

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
    path: '/members',
    name: 'Участники',
    component: MembersPage,
  },
  {
    path: '/history',
    name: 'История',
    component: HistoryPage,
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
