<template>
  <div class="container pb-15 mb-15">
    <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
    <h1 class="mb-7">Details du projet </h1>
    <v-col class="d-flex flex-column align-center">
      <v-card width="70%" class="m-5" elevation="0" :project="project">

        <v-card-title class="font-weight-black">Informations générales : </v-card-title>
        <v-card-actions>Référence projet: {{ project._id }}</v-card-actions>
        <v-card-actions>Libellé projet : {{ project.name }}</v-card-actions>
        <v-card-actions>Initiateur du projet : {{ project.customer.name }} {{ project.customer.firstName }}</v-card-actions>
        <v-card-actions>Adresse du chantier : {{ project.address }} {{ project.postCode }}, {{ project.city }}</v-card-actions>
        <v-card-actions>Date de début de chantier : {{ project.dateBeginSite }}</v-card-actions>

        <hr>
        <v-card-title class="font-weight-black">Composition du projet : </v-card-title>
        <v-card-actions> Nombre de devis : </v-card-actions>
        <!-- <v-card-actions v-for="quote in project.quotes" :key="quote">Référence devis : {{ quote }} <v-btn icon color="#59BD73" text><v-icon small>fa-eye</v-icon></v-btn></v-card-actions> -->
        <v-card-actions> Référence devis : </v-card-actions> 

        <hr>
        <v-card-title class="font-weight-black">Informations complémentaires : </v-card-title>
        <v-card-actions>Statut du projet : {{ project.state }}</v-card-actions>
        <v-card-actions>Version : {{ project._v }}</v-card-actions>
        <v-card-actions>Dernière mise à jour : {{ project.updated_at }}</v-card-actions>
      </v-card>
    </v-col>
  </div>
</template>

<script>
export default {
  name: 'DetailProject',

  data() {
    return {
      //data breadcrumbs
      breadcrumbs: [
        {text: 'Accueil', to: '/', disabled: false, exact: true},
        {text: 'Projets', to: '/projets', disabled: false, exact: true},
        {text: 'Details', to: "'/projets/details/", disabled: true},
      ],
      //objets projects
      project: this.$route.params.project,
      aProject: this.project,
    }
  },

   mounted() {
    if(this.project == null){
            //Recupération du dernier object project (cas F5) 
            // this.project = this.$store.state.oneProject
            this.project  = JSON.parse(localStorage.getItem('a_project'));
    } 
    else{
            //Stockage de l'objet project dans le localStorage
            // this.$store.commit('saveOneProject', this.project)
            localStorage.setItem('a_project', JSON.stringify(this.project));
    }
    //lors du F5 --> récupération du dernier objet projet stocké précédemment
    this.aProject = this.project;
  },
}
</script>
