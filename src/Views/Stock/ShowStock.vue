<template>
  <div class="container pb-15 mb-15">
    <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
    <h1>Consultation des stocks </h1>
    <v-card class="elevation-5-m-3">
      <v-card-title>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Rechercher" single-line hide-details class="ml-15 mr-15"></v-text-field>
      </v-card-title>
      <v-data-table align-center :loading="load" loading-text="Veuillez patienter ..." :headers="headers" :search="search" :items="stocks" :items-per-page="10">
        <template v-slot:[`item.action`]="{item}">
          <router-link :to="{name:'DetailItem', params:{id:item._id,stock:item}}" class="text-decoration-none"><v-btn icon color="#59BD73" text><v-icon small>fa-eye</v-icon></v-btn></router-link>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ShowStock',
  data() {
    return {
      //data breadcrumbs
      breadcrumbs: [
        {text: 'Accueil', to: '/', disabled: false},
        {text: 'Stocks', to: '/stocks', disabled: true},
      ],
      //data axios + table
      stocks: [],
      search: '',
      load: true,
      headers:[
        {text:"Article", value: "item"},
        {text:"Quantité", value:"quantity"},
        {text:"Prix unitaire (€)", value:"unitPrice"},
        {text:"Libellé", value:"designation"},
        {text: "Unite d'usage",value:"usageUnit"},
        {text:"Taux de TVA (%)", value:"vatRate"},
        {text:"Montant TVA (€)", value:"vatAmount"},
        {text:'Actions', value:'action'}
      ]
    }
  },
  methods:{
    index(){
      axios
      .get('http://127.0.0.1:8000/api/stocks')
      .then(Response => this.stocks = Response.data, this.load = false)
      .catch(error => console.log(error));
    },
  },
  created() {
    this.index();
  }
}
</script>