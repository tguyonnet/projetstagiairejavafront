<template>
  <div class="container">
        <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
        <h1>Répartition des documents</h1>
        <div 
          :sections="sections"
          :total="100"
          has-legend legend-placement="bottom">
          <h1 style="margin: 0;">{{ nbDocuments }}</h1> documents
        </div>
  </div>
</template>

<script>
// const axios = require('axios');
  export default {
    name: 'Home',
    data() {
      return {
        nbDocuments: 0,
        documents: [],
        customers: [],
        quotes: [],
        projects: [],
        sections: [],
        breadcrumbs: [{text: 'Accueil', to: '/', disabled: true}],
      }
    },
  }
</script>
