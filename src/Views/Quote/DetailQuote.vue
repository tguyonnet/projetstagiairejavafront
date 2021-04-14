<template>
  <div class="container pb-15 mb-15">
    <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
    <h1>Voir le devis {{ id }}</h1>
    {{ quote }}
    <DialogQuote :quote="quote"/>
  </div>
</template>

<script>
import axios from 'axios';
import DialogQuote from '../../components/Dialog/DialogQuote'

export default {
  name: 'DetailQuote',
  data() {
    return {
      //data breadcrumbs
      breadcrumbs: [
        { text: 'Accueil', to: '/', exact: true },
        { text: 'Devis', to: '/devis', exact: true },
        { text: 'Détail' },
      ],
      id: this.$route.params.id,
      quote: '',
    }
  },
  methods : {
    index() {
      console.log(this.id),
      axios.get('http://127.0.0.1:8000/api/quote/'+ this.id)
      .then(Response => (this.quote = Response.data.data))
      .catch(error => console.log(error));
    },
  },
  created() {
    this.index();
  },
  components: {
    DialogQuote
  },
}
</script>