<template>
  <div class="container my-5">
    <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
    <FormCustomer title='Ajouter un client' fromPage='add' />
  </div>
</template>

<script>
import FormCustomer from '../../components/Forms/FormCustomer'
export default {
  name: 'AddCustomer',
  data(){
    return{
      id: this.$route.params.id,
      breadcrumbs: [
        {text: 'Accueil', to: '/', exact:true},
        {text: 'Clients', to: "/clients", exact:true},
        {text: 'Ajouter'},
      ],
    }
  },
  components: {
    FormCustomer
  },
}
</script>