import Vue from 'vue';
import Router from 'vue-router';

import Main from '@/components/Main';
import Editor from '@/components/Editor';
import Viewer from '@/components/Viewer';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
    },
    {
      path: '/edit/:id',
      name: 'Editor',
      component: Editor,
    },
    {
      path: '/view/:id',
      name: 'View',
      component: Viewer,
    },
  ],
});
