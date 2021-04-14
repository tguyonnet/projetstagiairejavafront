<template>
  <div class="container my-5">
      <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
      <FormCustomer title='Modifier un client' fromPage='edit' :customerProps="customer" />
  </div>
</template>

<script>
import FormCustomer from '../../components/Forms/FormCustomer'
export default {
  name: 'EditCustomer',
  data(){
    return{
      customer: this.$route.params.customer,
      breadcrumbs: [
        {text: 'Accueil', to: '/', exact: true},
        {text: 'Clients', to: "/clients", exact: true},
        {text: 'Modifier'},
      ],
    }
  },
  components: {
    FormCustomer
  },

}

</script>