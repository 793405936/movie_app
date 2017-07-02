import Vue from 'vue';
import vueResource from 'vue-resource';
import Router from 'vue-router';
import HottestMovie from '../components/HottestMovie.vue';
import myCollection from '../components/myCollection.vue';
import signin from '../components/signin.vue';
import signup from '../components/signup.vue';
// import loveMovie from '../components/loveMovie.vue';

Vue.use(Router);
Vue.use(vueResource);
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/HottestMovie'
    },
    {
      path: '/signin',
      component: signin
    },
    {
      path: '/signup',
      component: signup,
      name: 'signup'
    },
    // {
    //   path: '/user',
    //   component: user
    // },
    // {
    //   path: '/admin',
    //   component: admin
    // },
    {
      path: '/HottestMovie',
      name: 'HottestMovie',
      component: HottestMovie
    },
    {
      path: '/myCollection',
      component: myCollection
    }
    // {
    //   path: '/loveMovie',
    //   component: loveMovie
    // }
  ]
});
