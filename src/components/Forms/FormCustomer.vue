<template>
    <div v-if="!loading">
        <div id="app">
            <v-row >
                <v-col cols="1">
                    <v-btn  text  @click="cancel(1)"><v-icon x-large>mdi-undo-variant</v-icon></v-btn>
                </v-col>
                <v-col cols="9">
                    <h1>{{ title }}</h1> 
                </v-col>
            </v-row>
            <v-form  ref="formCustomer" v-model="valid" lazy-validation ml="10" mr="10">
                <v-card ref="form">
                    <v-card-text >
                        <v-row justify="center" >
                            <v-col cols="1" sm="3">
                                <v-text-field ref="name" v-model="customer.nom" :rules="fieldRules('name')"  label="Nom" placeholder="Nom" required ></v-text-field> 
                            </v-col>
                            <v-col cols="1" sm="3">
                                <v-text-field ref="firstName" v-model="customer.firstName" :rules="fieldRules('firstName')"  label="Prénom" placeholder="Prénom" required ></v-text-field> 
                            </v-col>
                            <v-col cols="1" sm="3">
                                <v-combobox v-model="customer.sexe" :items="itemsSexe" :rules="fieldRules('sexe')" label="Sexe"></v-combobox>
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="1" sm="3">
                                <v-text-field ref="address" v-model="customer.address" :rules="fieldRules('address')" label="Adresse(rue,avenue..)" placeholder="55 Rue du Faubourg Saint-Honoré"  required>{{customer.address.address}}</v-text-field>
                            </v-col>
                            <v-col cols="1" sm="3">
                                <v-text-field ref="postcode" v-model="customer.postCode" :rules="fieldRules('postalCode')" label="Code Postal" require placeholder="75008 "></v-text-field>
                                <v-text-field ref="email" v-model="customer.email" :rules="fieldRules('e-mail')"  label="Email" placeholder="XXXX@XXX.fr" required ></v-text-field> 
                            </v-col>
                            <v-col cols="1" sm="3">
                                <v-text-field ref="ville" v-model="customer.city" :rules="fieldRules('city')" label="Ville" placeholder="Paris" required></v-text-field>
                                <v-text-field ref="phone" v-model="customer.phoneNumber" :rules="fieldRules('phone')"  label="Téléphone" placeholder="0380454536" required ></v-text-field> 
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="1" sm="3">
                                <v-combobox   v-model="customer.typeCustomer" :rules="fieldRules('typeCustomer')" :items="itemsContacts" label="Type"></v-combobox>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider class="mt-10"></v-divider>
                    <v-card-actions>
                        <v-btn color="error" text  @click="reset()"><v-icon >mdi-cached</v-icon>Réinitialiser</v-btn>
                        <v-spacer></v-spacer>
                        <v-slide-x-reverse-transition>
                            <v-tooltip v-if="formHasErrors" left>
                                <span>Refresh form</span>
                            </v-tooltip>
                        </v-slide-x-reverse-transition>
                        
                        <v-btn  v-if="fromPage == 'edit'"  color="primary" text @click="validate()"><v-icon color="#59BD73" > mdi-checkbox-marked-circle</v-icon>Valider</v-btn>
                        <v-btn  v-if="fromPage == 'add'"  color="primary" text @click="validate()"><v-icon color="#59BD73" > mdi-checkbox-marked-circle</v-icon>Ajouter</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form> 
        </div>
    </div>
</template>

<script>
const axios = require('axios');


export default {
  name: 'FormCustomer',
  data() {
    return { 
        valid:true,
        loading: true,
        formHasErrors: false,
        leCustomer:{
            name: '',
            firstName: '',
            email:'',
            phoneNumber:'',
            sexe:'',
            typeCustomer:'',
            address:{
                address:'',
                postCode:'',
                city:''
            }
        },
        customer:{
            name: '',
            firstName: '',
            email:'',
            phoneNumber:'',
            sexe:'',
            typeCustomer:'',
            address:'',
            postCode:'',
            city:'',
            _v:"1",
            isDeleted:false,
        },
        name: '',
        firstName: '',
        email:'',
        phoneNumber:'',
        sexe:'',
        typeCustomer:'',
        listCustomer:[],
        address:{
            address:'',
            postCode:'',
            city:''
        },
        itemsSexe: [
            'Mr',
            'Mme',
            'Non-Binaire',
        ],
        itemsContacts: [
            'Client',
            'Prospect',
            'Fournisseur',
        ],
    }
  },mounted(){
    if (this.fromPage == 'edit') {
        //copie de la varibale props a la premiere connexion (sinon erreur vue interdis la modif d'une props)
        //ne fonctionne plus avec vueX en attente d'amélioration avec F5
        // let variableCustomerProps = this.customerProps
        // //si  undefined
        // if(variableCustomerProps == null){
        //     //cas F5
        //     //on récupere le dernier objet stockée dans le local storage
        //     variableCustomerProps  = this.oneCustomer //this.$store.state.oneCustomer
        // }else{
        //     //on sauvegarde l'objet  dans le local storage (permet de le retrouver si on fait un F5)
        //     this.$store.commit('saveOneCustomer',this.customerProps)
        // }
        this.customer =  this.customerProps //variableCustomerProps
        //stockages des valeures originales
        this.name= this.customer.name,
        this.firstName= this.customer.firstName,
        this.email= this.customer.email,
        this.phoneNumber= this.customer.phoneNumber,
        this.address.address = this.customer.address.address,
        this.address.postCode = this.customer.address.postCode,
        this.address.city = this.customer.address.city,
        this.sexe = this.customer.sexe,
        this.typeCustomer = this.customer.typeCustomer
        //fin du chargement affichage du formulaire
        this.loading = false
    }else{
        this.loading = false
    }
  },
    methods: {
        // les règles de tous les champs, fait en fonction pour que ce soit générique
        fieldRules(field) {
            let rules = []
            rules.push(v => !!v || 'Le champ ' + field + ' est obligatoire')
            if (field == 'postalCode') {
                rules.push(v => (v && v.length == 5) || "Le code postal doit contenir 5 chiffres")
                rules.push(v => (v && !isNaN(v)) || "Vous ne pouvez renseigner que des chiffres")
            }
            if(field == 'phone'){
                rules.push(v => (v && !isNaN(v)) || "Vous ne pouvez renseigner que des chiffres")
            }
            if (field == 'e-mail') {
                rules.push(v => /.+@.+\..+/.test(v) || "L' e-mail n'est pas valide")
            }
            return rules
        },
        //remet le formulaire vierge
        reset(){
            this.customer.name= this.name,
            this.customer.firstName= this.firstName,
            this.customer.email= this.email,
            this.customer.phoneNumber= this.phoneNumber,
            this.customer.address.address = this.address.address,
            this.customer.address.postCode = this.address.postCode,
            this.customer.address.city = this.address.city,
            this.customer.sexe = this.sexe,
            this.customer.typeCustomer = this.typeCustomer 
        },
        ///annule la page et renvoie a la liste des clients
        cancel (back){
            if(back == 0){
                this.reset()
            }
            this.$router.push({name: 'ShowCustomer'})
        },
        //fonction permmettant de valider le formulaire
         validate () {
            //si le formualire est valdie
            if (this.valid) {
                //valid le formulaire
                this.$refs.formCustomer.validate()
                //si on ajoute un client
                if (this.fromPage == 'add') {
                    //rendre l'"appel asynchrone et récup l'id envoyer en base"
                    //ajoute le client en base de données
                     this.addCustomer(this.customer);
                    // console.log("euhhh")
                    // listeCustomer.push(this.customer)
                    // console.log(listeCustomer)
                    //ramène à l'affichage courant des clients
                    //this.cancel(1)
                }
                //si on modifie un client
                if (this.fromPage == 'edit') {
                    //modifie le client dans la base de données
                    this.editCustomer(this.customer);
                    //this.$store.commit('updateListCustomer',this.customer)
                    //ramène à l'affichage courant des clients
                    //this.cancel(1)
                }
            }
        },
        //Function permettant de modifier le client en base de données
        editCustomer($customer){
            console.log("ID "+$customer._id)

           axios.put('http://localhost:8080/api/customer/update/'+$customer._id,$customer)
            .then()//modifie la liste des clients en local
            .catch(error => console.log(error));
        },
        //Function permettant d'ajouter le client en base de données
        async addCustomer($customer){
        axios.post('http://localhost:8080/api/customer/create/',$customer)
            .then(response =>console.log(response))//
            .catch(error => console.log(error));
        }, 
       
    }, 
    created() {
       // this.listCustomer = this.$store.state.listCustomer
    },  
    //variable globales de l'app FormCustomer
    props: {
        title: String,
        fromPage: String,
        customerProps: Object
    }
}
</script>