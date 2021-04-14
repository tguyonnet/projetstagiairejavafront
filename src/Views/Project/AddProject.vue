<template>
  <div class="container pb-15 mb-15">
    <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
    <FormProject title='Créer un projet' fromPage='add'/>
  </div>
</template>

<script>
import FormProject from '../../components/Forms/FormProject'
export default {
  name: 'AddProject',
  data(){
    return{
      id: this.$route.params.id,
      breadcrumbs: [
        {text: 'Accueil', to: '/', exact: true},
        {text: 'Projets', to: "/projets", exact: true},
        {text: 'Créer', exact: false, disabled: true},
      ],
    }
  },
  components: {
    FormProject
  },
}
</script>