<template>
  <div class="container pb-15 mb-15">
    <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
    <v-row>
      <v-col cols="5" class="d-flex">
        <v-btn text @click="cancel()"><v-icon x-large >mdi-undo-variant</v-icon></v-btn>
      </v-col>
      <h1 class="justify-center">Devis</h1>
    </v-row>
    <v-card class="elevation-5 m-3">
      <!-- recherche -->
      <v-card-title width="250px">
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Rechercher" single-line hide-details class="ml-15 mr-15" ></v-text-field>
      </v-card-title>
      <!-- Liste récup des données MongoDB + searchBar + Pagination + Loading Bar -->
      <v-data-table 
        align-center 
        :loading="load" 
        loading-text="Veuillez patienter ..." 
        :headers="headers" 
        :search="search" 
        :items="quotes" 
        :items-per-page="10"
        :footer-props="{
          'items-per-page-text': 'Devis par page :',    
          pageText: '{0}-{1} sur {2}',
        }"
      >  
        <!-- client -->
        <template v-slot:[`item.customer_name`]="{ item }">{{ item.customer.firstName }} {{ item.customer.name }}</template>
        <!-- Ajout champ Actions -->
        <template v-slot:[`item.actions`]="{ item }">
            <!-- <router-link :to="{ name: 'DetailQuote', params: { id: item._id, quote: item } }" class="text-decoration-none"><v-btn icon color="#59BD73"><v-icon>mdi-eye</v-icon></v-btn></router-link> -->
            <!-- <router-link :to="{ name: 'EditQuote', params: { id: item._id, quote: item  } }" class="text-decoration-none"><v-btn icon color="#59BD73" text><v-icon small>fa-pencil-alt</v-icon></v-btn></router-link> -->
            <v-btn icon color="#59BD73" @click.stop="showQuote(item)" ><v-icon>mdi-eye</v-icon></v-btn>
            <v-btn icon color="#59BD73" @click="download()"><v-icon>mdi-download</v-icon></v-btn>
            <v-btn icon color="#59BD73" v-if="item.state != 'Validé'"><v-icon>mdi-check-circle</v-icon></v-btn>
            <v-btn icon v-else disabled><v-icon>mdi-check-circle</v-icon></v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog width="80%" v-if="this.dialog" v-model="quote" @click:outside="dialog = false" @keydown.esc="dialog = false">
      <v-card class="pa-4">
        <div class='text-right'>
          <v-btn icon @click="close()"><v-icon x-large>mdi-close-thick</v-icon></v-btn>
        </div>
        <DialogQuote :quote="quote"/>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import DialogQuote from '../../components/Dialog/DialogQuote'

export default {
  name: 'ShowQuote',
  data() {
    return {
      //data breadcrumbs
      breadcrumbs: [
        { text: 'Accueil', to: '/' },
        { text: 'Devis', to: '/devis' },
      ],
      dialog: false,
      //data axios + table
      quotes: [],
      search: '',
      load: true,
      headers: [
        // { text: "ID", value: "_id" },
        { text: "Projet", value: "project.name" },
        { text: "Client", value: "customer_name" },
        { text: "Objet", value: "object" },
        { text: "Date", value: "created_at" },
        { text: "Etat", value: "state" },
        { text: "Cout Total (€)", value: "totalCost" },
        { text: "Prix Total (€)", value: "totalPrice" },
        { text: "Actions", value: "actions" },
      ],
    }
  },
  methods : {
    index() {
      axios.get(this.$api + 'quotes')
      .then(Response => (this.quotes = Response.data, this.load = false))
      .catch(error => console.log(error));
    },
    cancel (){
        this.$router.push({name: 'Home'})
    },
    download() {
    },
    showQuote(item) {
      this.dialog = true;
      this.quote = Object.assign({}, item);
    },
    close() {
      this.dialog = false
    },
  },
  created() {
    this.index();
  },
  components: {
    DialogQuote
  }
}
</script>