<template>
    <div v-if="!loading">
        <div id="app">
            <v-btn left absolute icon @click="back()"><v-icon large>mdi-undo-variant</v-icon></v-btn>
            <h1>{{ title }}</h1>
             <v-card flat ma-5>
                <v-form ref="formProject" v-model="valid" lazy-validation @submit.prevent="submit">
                    <v-container fluid>
                        <v-card-text>Nouveau client
                            <router-link :to="{name: 'AddCustomer', params: {id: ''}}" class="text-decoration-none"><v-btn icon color="#59BD73" text><v-icon medium >mdi-plus-circle</v-icon></v-btn></router-link>
                        </v-card-text>

                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-autocomplete v-model="project.customer._id" :rules="customerRules" :items="customerList" :item-text="itemText" item-value="_id" label="Sélection du client" required></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="project.name" :rules="nameRules" label="Libellé du projet" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-menu v-model="datePicker" :close-on-content-click="false" offset-y max-width="300px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field label="Date de chantier" :value="project.dateBeginSite" :rules="dateBeginSiteRules" readonly v-on="on" placeholder="AAAA-MM-JJ" required></v-text-field>
                                    </template>
                                    <v-date-picker locale="fr" v-model="project.dateBeginSite" no-title :min="currentDate" @input="datePicker = false"></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="10" sm="6">
                                <v-text-field v-model="project.created_at" label="Date de création" disabled required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="project.address" :rules="addressRules" label="Adresse de chantier" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="3">
                                <v-text-field v-model="project.postCode" :rules="postCodeRules" label="Code postal" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="3">
                                <v-text-field v-model="project.city" :rules="cityRules" label="Ville" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-card-actions>
                        <v-btn text @click="reset"><v-icon >mdi-cached</v-icon>Réinitialiser</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn v-if="fromPage == 'add'" :disabled="!valid" @click="validate()" text color="#59BD73" type="submit"><v-icon color="#59BD73"> mdi-checkbox-marked-circle</v-icon>Créer</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
            <v-snackbar justify-center v-model="snackbar" absolute top right color="#59BD73">
                <span>Nouveau projet créé </span>
                <v-icon dark> mdi-checkbox-marked-circle</v-icon>
            </v-snackbar>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'FormProject',
    data() {
        return { 
            //champs du formulaire remplissent project
            project:  {  
                _id: '',     
                name: '',
                    address: '',
                    postCode: '',
                    city: '',
                dateBeginSite: '',
                customer: {
                    _id: null,
                },
                created_at: new Date().toISOString().substr(0, 10)
            },

            snackbar: false,
            valid:true,
            loading: true,

            //rules formulaire
            nameRules: [v => !!v || 'Ce champ est obligatoire'],
            customerRules: [v => !!v || 'Ce champ est obligatoire'],
            addressRules: [v => !!v || 'Ce champ est obligatoire'],
            postCodeRules: [v => !!v || 'Ce champ est obligatoire', 
                            v => (v && v.length == 5) || 'Ce champ doit contenir 5 chiffres', 
                            v => !isNaN(v) || 'Ce champ ne doit contenir que des chiffres'],
            cityRules: [v => !!v || 'Ce champ est obligatoire', 
                        v => isNaN(v) || 'Ce champ ne doit contenir que des lettres'],
            dateBeginSiteRules : [v => !!v || 'Ce champ est obligatoire'],

            //liste des clients dans le localStorage
            customerList: '',
            projectList: JSON.parse(localStorage.getItem('projectList')),

            //varaibles date
            currentDate: new Date().toISOString().substr(0, 10),
            datePicker: false,
        }
    },
  
    mounted(){
            this.loading = false
    },

    methods: {
        //reinitialise l'ensemble des données du formulaire
        reset() {
            this.$refs.formProject.reset()
            this.project.created_at = new Date().toISOString()
        },
      
        //bouton valider pour activer la snackbar
        submit() {
            this.snackbar = true
            this.reset()
        },
        
        //Affiche les valaurs d'un champ/s au lieu de l'objet dans la liste déroulante
        itemText(item) {
            let syntax = null;
            syntax = `${item.nom} ${item.firstName}`.toUpperCase() + `, ${item.email} `;
            return syntax;
        },

        //annule la page et renvoie a la liste des projets
        back() {
            this.$router.push({name: 'ShowProject'})
        },

        //fonction permmettant de valider le formulaire
        validate() {
             this.$refs.formProject.validate()
                    if(this.fromPage == 'add') {
                         if(this.$refs.formProject.validate()){
                             console.log(this.project)
                            this.createProject()
                         }
                    }
                   // console.log(this.$refs.formProject.validate())
        },

        // ATTENTION : ajoute le nouveau projet dans local Sotrage mais sans l'_id => F5 pour update via le back
        createProject() {
            this.projectList.push(this.project)
            axios.post('http://127.0.0.1:8080/api/project/create', this.project)
            .then((Response) => {console.log(Response)})
        },

        indexCustomers() {
            axios.get('http://127.0.0.1:8080/api/customers')
            .then((Response) => this.customerList = Response.data)
        },
    },
    
    created() {
        this.indexCustomers()
        console.log(this.customerList)
    },

    //variable globales de l'app FormProject
    props: {
        title: String,
        fromPage: String,
        projectProps: Object
    }
}
</script>