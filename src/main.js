import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from '@/App'
import Posts from '@/modules/Posts'
import Settings from '@/modules/Settings'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/',
    name: 'home',
    component: resolve => {
      require(['@/components/Blog.vue'], resolve);
    }
  }, {
    path: '/post/:id',
    name: 'view-post',
    component: resolve => {
      require(['@/components/ViewPost.vue'], resolve);
    },
    beforeEnter(to, from, next) {
      if (to.name === 'view-post') {
        const id = to.params.id
        const post = store.getters.GET_POSTS.filter(item => {
          return item.id === Number(id)
        })
        if (post.length > 0) {
          next()
        } else { // Запрет на открытие несуществующих страниц
          next({ name: 'not-found' })
        }
      }
    }
  }, {
    path: '/404',
    name: 'not-found',
    component: resolve => {
      require(['@/components/NotFound.vue'], resolve);
    }
  }, {
    path: '*',
    redirect: '404'
  }]
})

const store = new Vuex.Store({
  modules: {
    Posts,
    Settings
  }
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
