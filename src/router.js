import Vue from 'vue'   
import Router from 'vue-router'
//pages accueil + 404
import Home from './Views/Home/Home.vue'
import NotFound from './Views/NotFound.vue'
//pages client
import AddCustomer from './Views/Customer/AddCustomer.vue'
import EditCustomer from './Views/Customer/EditCustomer.vue'
import ShowCustomer from './Views/Customer/ShowCustomer.vue'
import DetailCustomer from './Views/Customer/DetailCustomer.vue'
//pages devis
import AddQuote from './Views/Quote/AddQuote.vue'
import EditQuote from './Views/Quote/EditQuote.vue'
import DetailQuote from './Views/Quote/DetailQuote.vue'
import ShowQuote from './Views/Quote/ShowQuote.vue'
//pages project
import AddProject from './Views/Project/AddProject.vue'
import EditProject from './Views/Project/EditProject.vue'
import ShowProject from './Views/Project/ShowProject.vue'
import DetailProject from './Views/Project/DetailProject.vue'
//pages stock
import ShowStock from './Views/Stock/ShowStock.vue'
import DetailItem from './Views/Stock/DetailItem.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/clients',
      name: 'ShowCustomer',
      component: ShowCustomer
    },
    {
      path: '/clients/ajouter',
      name: 'AddCustomer',
      component: AddCustomer
    },
    {
      path: '/clients/afficher',
      name: 'DetailCustomer',
      component: DetailCustomer
    },
    {
      path: '/clients/modifier',
      name: 'EditCustomer',
      mode: 'abstract',
      component: EditCustomer
    },
    {
      path: '/devis',
      name: 'ShowQuote',
      component: ShowQuote 
    },
    {
      path: '/devis/:id',
      name: 'DetailQuote',
      component: DetailQuote
    },
    {
      path: '/devis/modifier',
      name: 'EditQuote',
      component: EditQuote
    },
    {
      path: '/devis/ajouter',
      name: 'AddQuote',
      component: AddQuote
    },
    {
      path: '/projets',
      name: 'ShowProject',
      component: ShowProject 
    },
    {
      path: '/projets/modifier',
      name: 'EditProject',
      component: EditProject,
    },
    {
      path: '/projets/ajouter',
      name: 'AddProject',
      component: AddProject
    },
    {
      path: '/projets/details',
      name: 'DetailProject',
      component: DetailProject
    },
    {
      path: '/stocks',
      name: 'ShowStock',
      component: ShowStock 
    },
    {
      path: '/stocks/details',
      name: 'DetailItem',
      component: DetailItem
    },
  ],
  props: {
    default: true,
  }
})