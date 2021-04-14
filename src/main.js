import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router.js'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  
  state: {
    listCustomer:[],
    listQuote:[],
    listProject:[],
    listStock:[],
    oneCustomer:[],
    oneProject:[],
    oneQuote:[],
    oneStock:[]
  },
  getters: {
    customers: state => {
      return state.listCustomer
    },
    projects: state => {
      return state.listProject
    },
    quotes: state => {
      return state.listQuote
    },
    stocks: state => {
      return state.listStock
    },
    oneCustomer: state => {
      return state.oneCustomer
      // return (value)=>{
      //   return state.listCustomer.filter(function(item) {return item._id == value;});
      // }
    },
    projectsOfOneCustomer(state){
      return (value)=>{
        return state.listProject.filter(function(item) {return item.customer == value;});
      }
    },
    quoteOfOneCustomer(state){
      return (value)=>{
        return state.listQuote.filter(function(item) {return item.customer_id == value;});
      }
    }
  },
  mutations: {
    //Mutateurs des listes
    saveListCustomer(state,customersList){
      state.listCustomer =customersList
    },
    saveListQuote(state,quoteList){
      state.listQuote = quoteList
    },
    saveListProject(state,projectList){
      state.listProject = projectList
    },
    saveListStock(state,stockList){
      state.listStock = stockList
    },
    //Mutateurs pour save un type lors des phase de Edit et show
    saveOneCustomer(state,customerOne){
      state.oneCustomer = customerOne
    },
    saveOneProject(state,projectOne){
      state.oneProject = projectOne
    },
    saveOneQuote(state,quoteOne){
      state.oneQuote = quoteOne
    },
    saveOneStock(state,stockOne){
      state.oneStock = stockOne
    },
    //Mutateurs pour update les listes
    updateListCustomer(state,customer){
      var indexCustomer = state.listCustomer.map(function(e) { return e._id; }).indexOf(customer._id)
      state.listCustomer[indexCustomer] = customer
      state.listCustomer[indexCustomer].v_deleted = false
    }
  },
 
})

new Vue({
  router,
  vuetify,
  store: store,
  render: h => h(App)
}).$mount('#app')
