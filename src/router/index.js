/* eslint-disable no-undef */
import { createRouter, createWebHistory } from 'vue-router';
import AboutUs from '../components/AboutUs.vue';
import VideoCall from '../components/VideoCall.vue';
import HomePage from '../components/HomePage.vue';
import ChatComponent from '../components/ChatComponent.vue';
import LoginPage from '../components/LoginPage.vue';
import RegisterPage from '../components/RegisterPage.vue';
import ContactsPage from '../components/ContactsPage.vue';
import ServicesPage from '../components/ServicesPage.vue';
import UserProfile from '../components/UserProfile.vue';
import NotFound from '../components/NotFound.vue';
import AppDashboard from '../components/AppDashboard.vue';
import Contacts1 from '@/components/ContactList1.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/chat',
    name: 'Chat',
    component: ChatComponent,
    meta: { hideHeaderFooter: true } // Add this line
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { hideHeaderFooter: true } // Add this line
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: { hideHeaderFooter: true } // Add this line
  },
  {
    path: '/about',
    name: 'AboutUs',
    component: AboutUs
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: ContactsPage
  },
  {
    path: '/services',
    name: 'Services',
    component: ServicesPage
  },
  {
    path: '/user-profile',
    name: 'UserProfile',
    component: UserProfile,
    meta: { hideHeaderFooter: true } // Add this line
  },
  {
    path: '/video-call',
    name: 'VideoCall',
    component: VideoCall,
    meta: { hideHeaderFooter: true } // Add this line
  },
  {
    path: '/:pathMatch(.*)*', // Catch-all route for 404
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/Appdashboard',
    name: 'AppDashboard',
    component: AppDashboard,
    meta: { hideHeaderFooter: true } // Add this line
  },
  {
    path: '/contacts1',
    name: 'Contacts1',
    component: Contacts1,
    meta: { hideHeaderFooter: true } // Add this line
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;