<template>
  <div class="container pb-15 mb-15">
    <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
    <h1>Détail d'un composant</h1>
  </div>
</template>

<script>
export default {
    name:'DetailItem',
    data(){
        return{
            breadcrumbs:[
                {text:'Accueil', to: '/' ,exact: true },
                {text:'Stocks', to: '/stocks', exact: true},
                {text: 'Detail' },
            ]
        }
    },
    methods: {
        index() {
            
        },
    },
    created(){
        this.index();
    },
}
</script>