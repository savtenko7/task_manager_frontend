import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Sign_in from '../pages/Sign-in.vue'
import Sign_up from '../pages/Sign-up.vue'
import Tasks from '../pages/Tasks.vue'
import { USER_INFO_URL, SIGN_UP_URL} from '../constants'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: Sign_in,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: Sign_up,
    },
    {
      path: '/tasks/:rid',
      name: 'tasks',
      component: Tasks,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({
        path: '/sign-up',
        query: { redirect: to.fullPath }, 
      });
    } else {
      next(); 
    }
  } else {
    next(); 
  }
});

export default router
