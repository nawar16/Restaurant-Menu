/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';
import '../sass/app.scss'
import Router from '@/router'
import store from '@/store'
import { createApp, h } from 'vue';
import App from '@/components/App.vue'


const app = createApp(App);
app.use(Router)
app.use(store)
app.mount('#app');
