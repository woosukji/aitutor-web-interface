import Vue from 'vue';
import VueRouter from 'vue-router';
import Landing from '../views/Landing.vue';
import SignUp from '../views/SignUp.vue';
import ChangeInfo from '../views/ChangeInfo.vue';
import KatexTest from '../views/KatexTest.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/change-info',
    name: 'ChangeInfo',
    component: ChangeInfo,
  },
  {
    path: '/main',
    name: 'Main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "main" */ '../views/Main.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
  },
  {
    path: '/daily-problems',
    name: 'DailyProblems',
    component: () => import('../views/DailyProblems.vue'),
  },
  {
    path: '/chapter-test',
    name: 'ChapterTest',
    component: () => import('../views/ChapterTest.vue'),
  },
  {
    path: '/katex-test',
    name: 'KatexTest',
    component: KatexTest,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
