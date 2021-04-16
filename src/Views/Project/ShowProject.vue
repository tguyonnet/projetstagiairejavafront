<template>
  <div class="container pb-15 mb-15">
    <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
    <h1>Consultation des projets
      <router-link :to="{name: 'AddProject', params: {id: ''}}" class="text-decoration-none"><v-btn icon color="#59BD73" text><v-icon x-large >mdi-plus-circle</v-icon></v-btn></router-link>
    </h1>
    <v-card class=" elevation-5 m-3">
        <v-card-title width="250px">
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Rechercher" single-line hide-details class="ml-15 mr-15" ></v-text-field>
      </v-card-title>
      <!-- Liste récup des données MongoDB + searchBar + Pagination + Loading Bar -->
      <v-data-table align-center :loading="load" loading-text="Veuillez patienter ..." :headers="headers" :search="search" :items="projects" :items-per-page="10" :footer-props="{'items-per-page-text':'lignes par page'}">       
        <!-- Ajout champ Actions -->
                <template v-slot:[`item.created_at`]="{ item }">{{ moment(item.created_at).format('DD/MM/YYYY') }}</template>
                <template v-slot:[`item.dateBeginSite`]="{ item }">{{ moment(item.dateBeginSite).format('DD/MM/YYYY') }}</template>

        <template v-slot:[`item.actions`]="{ item }">
           <!-- <v-btn icon v-model="item.actions" color="#59BD73" v-for="link in links" :key="link.icon" router :to="link.route /*+ projects[0]._id*/" text class="my-1 text-decoration-none"><v-icon small>{{ link.icon }}</v-icon></v-btn> -->
            <router-link :to="{name: 'DetailProject', params: {id: item._id, project: item}}" class="text-decoration-none"><v-btn icon color="#59BD73" text><v-icon small>fa-eye</v-icon></v-btn></router-link>
            <router-link :to="{name: 'EditProject', params: {id: item._id, project: item}}" class="text-decoration-none"><v-btn icon color="#59BD73" text><v-icon small>fa-pencil-alt</v-icon></v-btn></router-link>
            <v-btn icon color="#59BD73" @click="showDialog(item)" text><v-icon small>fa-trash-alt</v-icon> </v-btn>
        </template>
      </v-data-table>
      <v-dialog v-model="dialog" max-width="600">
          <v-card>
            <v-card-title class="headline"> Suppression d'un projet </v-card-title>
            <v-card-text> Voulez-vous vraiment supprimer ce projet ? Si oui, vous ne pourrez plus avoir accès aux informations le concernant </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="dialog = false"> Annuler </v-btn>
              <v-btn color="green darken-1" text @click="deleteItem()"> Valider </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> 
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'ShowProject',

  data() {
    return {
      //data breadcrumbs
      breadcrumbs: [
        {text: 'Accueil', to: '/', exact: true},
        {text: 'Projets', to: '/projets', exact: true},
      ],
      dialog : false,
      //data axios + table
      projects: [],
      itemToDelete: {},
      search: '',
      load: true,
      headers: [
        { text: "Date création", value: "created_at" },
        { text: "Nom", value: "name" },
        { text: "Adresse chantier", value: "address" },
        { text: "CP", value: "postCode" },
        { text: "Ville", value: "city" },
        { text: "Date du chantier", value: "dateBeginSite" },
        { text: "Statut", value: "state" },
        { text: "Actions", value: "actions" },
      ],
    }
  },

  methods: {
    //affiche tous les projets en recuperant dans local Storage
    indexProject() {
        axios.get('http://127.0.0.1:8080/api/projects')
        .then(Response => (this.projects = Response.data, /*this.$store.commit('saveListProject', Response.data.data),*/localStorage.setItem('projectList', JSON.stringify(Response.data)), console.log('Liste des projects : ', Response.data)))
        .catch(error => console.log("err =" + error));
      this.load = false
   },

    moment: function (date) {
      return moment(date);
    },

    //affichage de la fenetre suppression
    showDialog(item) {
      this.itemToDelete = item
      this.dialog = !this.dialog
    },

    //suppression du projet choisi
   deleteItem() {
      //recupere un seul projet
      const index = this.projects.indexOf(this.itemToDelete).toString() 
      //supprime la ligne sur le front   
      this.projects.splice(index, 1)
      //charge la liste des projets dans le localStorage
      localStorage.setItem('projectList', JSON.stringify(this.projects))
      this.dialog = false
      //supprime le projet par le back dans la bdd
      axios.delete('http://127.0.0.1:8080/api/project/delete/' + this.itemToDelete._id)
      .then(localStorage.setItem('projectList', JSON.stringify(this.projects)))
      .catch(error => console.log("ERREUR : ", error));
      console.log(this.itemToDelete._id)
    },
  },

  created() {
    this.indexProject();
    console.log('projets page projects :', this.projects)
    console.log(this.moment(this.projects.created_at).format('DD/MM/YYYY'))
  },
}

</script>