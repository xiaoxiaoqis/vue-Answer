import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Content from '@/components/content'
import Result from '@/components/result'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/content',
      name: 'Content',
      component: Content
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    }
  ]
})
