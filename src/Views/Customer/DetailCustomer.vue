<template>
  <div v-if="!loading">
    <div class="container pb-16 mb-16">
        <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
        <div id="app">
          <h1>Affichage d'un Client</h1>
          <!-- Bandeau de navigation Client-Projets-Devis -->
          <!-- <v-row class="mt-5 " justify="center">
            <v-bottom-navigation grow  width="20%">
              <v-btn  @click="btnProfile()"> <span>Profil Client</span></v-btn>
              <v-btn  @click="btnProject()"><span>Projets</span></v-btn>
              <v-btn @click="btnQuote()"><span>Devis</span></v-btn>
            </v-bottom-navigation>
          </v-row> -->
        <v-col class="d-flex flex-column align-center">
          <v-card width="60%">
            <v-tabs>
              <v-tab>Profil client</v-tab>
              <v-tab>Projets</v-tab>
              <v-tab>Devis</v-tab>
              <v-tab-item>
                <!-- Affichage Client -->
                <v-card  justify="center" elevation=0 class="m-3">
                  <v-card-title  class="font-weight-black">Informations générales : </v-card-title>
                  <!-- ligne 1 mockup  -->
                  <v-row >
                    <v-col cols="6" >
                      <v-card-text class="d-flex justify-start">N° client: {{ customer._id }}</v-card-text> 
                    </v-col>
                    <v-col cols="6">
                        <v-card-text class="d-flex justify-start">Nom de famille : {{ customer.nom }}</v-card-text>
                    </v-col>
                  </v-row>
                  <!-- ligne 2 mockup  -->
                  <v-row  >
                    <v-col cols="6">
                      <v-card-text class="d-flex justify-start">Sexe : {{ customer.sexe }}</v-card-text> 
                    </v-col>
                    <v-col cols="6">
                      <v-card-text class="d-flex justify-start">Prénom : {{ customer.firstName }}</v-card-text>
                    </v-col>
                  </v-row>
                  <!-- ligne 3 mockup  -->
                  <v-row >
                    <v-col cols="6" >
                      <v-card-text class="d-flex justify-start">Type client : {{ customer.typeCustomer }}</v-card-text>
                    </v-col>
                  </v-row>
                  <!-- Partie Adresse -->
                  <hr>
                  <v-card-title class="font-weight-black">Adresse postale: </v-card-title>
                  <!-- ligne 1 mockup  -->
                  <v-row  >
                    <v-col cols="6" >
                      <v-card-text class="d-flex justify-start"> Adresse : {{ customer.address }}</v-card-text>
                    </v-col>
                    <v-col cols="6" >
                      <v-card-text class="d-flex justify-start" > Code postal : {{ customer.postCode }}</v-card-text>
                    </v-col>
                  </v-row>
                  <!-- ligne 2 mockup  -->
                  <v-row >
                    <v-col cols="6">
                      <v-card-text class="d-flex justify-start"> Ville : {{ customer.city }}</v-card-text>
                    </v-col>
                  </v-row>
                  <!-- Partie Coordonnées -->
                  <hr>
                  <v-card-title class="font-weight-black">Coordonnées : </v-card-title>
                  <!-- ligne 1 mockup  -->
                  <v-row >
                    <v-col cols="6">
                      <v-card-text class="d-flex justify-start" >N° téléphone: {{ customer.phoneNumber }}</v-card-text>
                    </v-col>
                    <v-col cols="6">
                        <v-card-text class="d-flex justify-start">Email : {{ customer.email }}</v-card-text>
                    </v-col>
                  </v-row>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <!-- Affichage Projets -->
                <v-card elevation=0 class="m-3">
                  <v-card-title>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Rechercher" single-line hide-details class="ml-15 mr-15"></v-text-field>
                  </v-card-title>
                  <v-data-table :headers="headersProjects" :items="projectsOneCustomer" item-key="_id" multi-sort loading ="load" :loading-text="textLoad" :search="search">
                    <template v-slot:[`item.dateBeginSite`]="{ item }">{{ moment(item.dateBeginSite).format('DD/MM/YYYY') }}</template>
                    <template v-slot:[`item.actions`]="{ item }">
                      <router-link :to="{name: 'DetailProject', params: {id: item._id, project: item}}" class="text-decoration-none"><v-btn icon color="#59BD73" text><v-icon small>fa-eye</v-icon></v-btn></router-link>
                    </template>
                  </v-data-table>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <!-- Affichage Devis -->
                <v-card elevation=0 class="m-3">
                  <v-card-title>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Rechercher" single-line hide-details class="ml-15 mr-15"></v-text-field>
                  </v-card-title>
                  <v-data-table :headers="headersQuotes" :items="quotesOneCustomer" item-key="_id" multi-sort loading ="load" :loading-text="textLoad" :search="search">
                    <template v-slot:[`item.actions`]="{ item }">
                      <router-link :to="{ name: 'DetailQuote', params: { id: item._id, quote: item } }" class="text-decoration-none"><v-btn icon color="#59BD73" text><v-icon small>fa-eye</v-icon></v-btn></router-link>
                      <v-btn icon color="#59BD73" text><v-icon small>mdi-printer</v-icon></v-btn>
                      <v-btn icon color="#59BD73" text><v-icon small>mdi-download</v-icon></v-btn>
                      <v-btn icon color="#59BD73" text><v-icon small>mdi-checkbox-marked-circle</v-icon></v-btn>
                    </template>
                  </v-data-table>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-col>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');
import moment from 'moment';

export default {
  name: 'DetailCustomer',
  data(){
    return{
      customer: this.$route.params.customer,
      headersProjects: [
        { text: "Date", value: "dateBeginSite" },
        { text: "N°projet", value: "_id" },
        { text: "Libellé", value: "name" },
        { text: "Statut", value: "state" },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      headersQuotes: [
        { text: "Date", value: "dateBeginSite" },
        { text: "N°devis", value: "_id" },
        { text: "Libellé", value: "object" },
        { text: "N°projet", value: "project_id" },
        { text: "Statut", value: "state" },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      loading:true,
      load:false,
      projectsOneCustomer:[],
      quotesOneCustomer:[],
      quotes: [],
      affichage:1,
      search: '',
      textLoad:"Chargement... Veuillez patienter",
      breadcrumbs: [
        {text: 'Accueil', to: '/', exact:true},
        {text: 'Clients', to: "/clients", exact:true},
        {text: 'Détails d\'un client'},
      ],
      listQuote:[],
      listProject:[],
    }
  },

  mounted(){
     console.log(this.customer)
     this.getAllProject()
      this.getAllQuote()

      this.loading = false 
  },
  methods: {

    moment: function (date) {
      return moment(date);
    },

    getAllProject(){

      //retourne la liste des projets d'un client
      var idCustomer
      idCustomer = this.customer._id
       axios.get('http://localhost:8080/api/projects')
        .then(Response => (
          this.quotes = Response.data, 
          console.log(Response.data),
          this.projectsOneCustomer =  this.quotes.filter(function(item) {return item.customer._id == idCustomer ;})
          ))
        .catch(error => console.log(error));
      //change le texte du chargement en cas d'inexsitance de données
      if(this.projectsOneCustomer.length >0){
        this.textLoad = ''
      }else{
        this.textLoad = 'Aucun projet' //'Aucune données'
      }
    },
    getAllQuote(){
      var idCustomer
      idCustomer = this.customer._id
      //retourne la liste des devis d'un client
      axios.get('http://localhost:8080/api/quotes')
        .then(Response => (
          this.quotes = Response.data, 
          console.log(Response.data),
          this.quotesOneCustomer =  this.quotes.filter(function(item) {return item.customer._id == idCustomer;})
          ))
        .catch(error => console.log(error));

      
      //change le texte du chargement en cas d'inexsitance de données
      if(this.quotesOneCustomer.length >0){
        this.textLoad = ''
      }else{
        this.textLoad = 'Aucun devis' //'Aucune données'
      }
    }

      

  },
  props: [
    'fromPage',
  ]
  
}
</script>