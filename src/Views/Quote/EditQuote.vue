<template>
  <div class="container pb-15 mb-15">
    <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
    <h1>Modifier un devis</h1>
    <FormQuote fromPage='EditQuote' :quote="quote" />
  </div>
</template>

<script>
import FormQuote from '../../components/Forms/FormQuote'
export default {
  name: 'EditQuote',
  data() {
    return {
      quote: this.$route.params.quote,
      //data breadcrumbs
      breadcrumbs: [
        { text: 'Accueil', to: '/', exact: true },
        { text: 'Devis', to: '/devis', exact: true },
        { text: 'Modifier' },
      ]
    }
  },
  components: {
    FormQuote
  }
}
</script>