<template>
  <v-container class="container pb-15 mb-10" >
      <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
      
        <v-row>
          <v-col cols="5" class="d-flex justify-start mt-2">
            <v-btn  text  @click="cancel()"><v-icon  x-large >mdi-undo-variant</v-icon></v-btn>
          </v-col>
          <v-col cols="2" class="d-flex justify-center" >
            <h1>Clients</h1> 
          </v-col>
          <v-col cols="2" class="d-flex justify-start mt-2" justify="center">
            <router-link :to="{name: 'AddCustomer', params: {id: ''}}" class="text-decoration-none"><v-btn icon color="#59BD73" text><v-icon x-large >mdi-plus-circle</v-icon></v-btn></router-link>
            <!-- <v-btn  color="primary" :to="{name:'AddCustomer', params:{id: ''}}">Ajouter</v-btn> -->
          </v-col>
        </v-row>
        <v-card class="elevation-20-m-3">
          <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Rechercher" single-line hide-details class="ml-15 mr-15"></v-text-field>
          </v-card-title>
        
          <v-data-table :headers="headers" :items="customers" item-key="_id" multi-sort loading ="load" loading-text="Chargement... Veuillez patienter " :search="search">

          <template v-slot:[`item.actions`]="{ item }">
                <router-link :to="{name: 'DetailCustomer', params: {customer:item}}" class="text-decoration-none"><v-btn icon color="#59BD73" text><v-icon small>fa-eye</v-icon></v-btn></router-link>
                <router-link :to="{name: 'EditCustomer', params: {customer:item}}" class="text-decoration-none"  ><v-btn icon color="#59BD73" text><v-icon small>fa-pencil-alt</v-icon></v-btn></router-link>
                <v-btn icon color="#59BD73" @click="deleteDialog(item)" text><v-icon small>fa-trash-alt</v-icon> </v-btn>
          </template>
          </v-data-table>
        </v-card>
  </v-container>
</template>

<script>
const axios = require('axios');

export default {
  name: 'ShowCustomer',
  data() {
    return {
      search: '',
      load: true,
      breadcrumbs: [
        {text: 'Accueil', to: '/', exact: true},
        {text: 'Clients', to: "/clients"},
      ],
      headers: [
        { text: "ID", value: "_id" },
        { text: "Nom", value: "nom" },
        { text: "Prénom", value: "firstName" },
        { text: "Adresse", value: "address" },
        { text: "Code Postal", value: "postCode" },
        { text: "Ville", value: "city"},
        { text: "Téléphone", value: "phoneNumber" },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      customerItem: {
        name: '',
        firstName: 0,
        phone: '',
        email: '',
        address: ['','',''],
      },
      defaultCustomerItem: {
        name: '',
        firstName: 0,
        phone: '',
        email: '',
        address: ['','',''],
      },
      customers: [],
    }
  },
  methods : {
    cancel (){
      this.$router.push({name: 'Home'})
    },
    index() {
      axios.get('http://localhost:8080/api/customers')
      .then(response => (this.customers = response.data, console.log(this.customers), this.load = false))
      .catch(error => console.log(error));
    },
    //affichage de la fenetre suppression
   deleteDialog(item) {
     //recupere un seul projet
      const index = this.customers.indexOf(item).toString() 
      //supprime la ligne sur le front   
      this.customers.splice(index, 1)
      this.dialog = false
      //supprime le projet par le back dans la bdd
      axios.delete('http://localhost:8080/api/customer/delete/' + item._id)
        .then()
        .catch(error => console.log("ERREUR : ", error));
        console.log(item._id)
    },
  },
  remove(){
     /*axios
      .get('http://127.0.0.1:8000/customer/d/'+$id)
      .then(response => (console.log(response)))
      .catch(error => console.log(error));*/
    //this.$router.push({name: 'ShowCustomer'})
  },
  created() {
    this.index();
  },    

}
</script>


