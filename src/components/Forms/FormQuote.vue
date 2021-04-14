<template>
    <div>
        <!-- <p>Origine : {{ fromPage }}</p> -->
        <!-- <p>Quote : {{ quote }}</p> -->
        <v-form ref="FormQuote" v-model="valid" lazy-validation ml="10" mr="10">
            <v-card ref="form">
                <v-card-title>
                    <h2 class="text-sm-left">Entête du devis</h2>
                </v-card-title>
                <v-card-text>
                    <v-row justify="center">
                        <v-col cols="1" sm="5">
                            <v-text-field ref="object" v-model="quote.object" :rules="fieldRules('name')"  label="Objet" placeholder="Objet" required></v-text-field> 
                        </v-col>
                        <v-col cols="1" sm="2">
                            <v-text-field ref="created_at" v-model="quote.created_at" label="Date de création" placeholder="Date de création" required></v-text-field> 
                        </v-col>
                        <v-col cols="1" sm="2">
                            <v-combobox v-model="quote.state" :items="statesItems" label="Status"></v-combobox>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols="1" sm="3">
                            <v-text-field ref="totalCost" v-model="quote.totalCost" readonly label="Coût" placeholder="Coût" required></v-text-field> 
                        </v-col>
                        <v-col cols="1" sm="3">
                            <v-text-field ref="totalPrice" v-model="quote.totalPrice" readonly label="Prix" placeholder="Prix" required></v-text-field> 
                        </v-col>
                        <v-col cols="1" sm="3">
                            <v-text-field ref="vatAmount" v-model="quote.vatAmount" readonly label="Montant TVA" placeholder="Montant TVA" required></v-text-field> 
                        </v-col>
                        <v-col cols="1" sm="3">
                            <v-text-field ref="customer" v-model="quote.customer" label="Client" placeholder="Client" required></v-text-field> 
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-text v-if="this.fromPage == 'EditQuote'">
                    <v-divider />
                    <v-card-subtitle>
                        <h3 class="text-sm-left">Étapes de paiement :</h3>
                    </v-card-subtitle>
                    <v-data-table align-center :headers="paymentStatesHeader" :items="quote.paymentStates" :items-per-page="10">
                    </v-data-table>
                </v-card-text>
                <v-divider class="mt-10"></v-divider>
                <v-card-actions>
                    <v-btn color="error" text  @click="reset()"><v-icon >mdi-cached</v-icon>Réinitialiser</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn  v-if="fromPage == 'EditQuote'"  color="primary" text @click="update()"><v-icon color="#59BD73" > mdi-checkbox-marked-circle</v-icon>Valider</v-btn>
                    <v-btn  v-if="fromPage == 'AddQuote'"  color="primary" text @click="validate()"><v-icon color="#59BD73" > mdi-checkbox-marked-circle</v-icon>Ajouter</v-btn>
                </v-card-actions>
            </v-card>
        </v-form> 
    </div>
</template>

<script>
const axios = require('axios');
export default {
    name: 'FormQuote',
    data() {
        return { 
            valid: true,
            originQuote: null,
            statesItems: [
                'En attente',
                'Validé',
                'Terminé',
            ],
            paymentStatesHeader: [
                { text: "Nom", value: "name" },
                { text: "Pourcentage de paiement", value: "percentageState" },
                { text: "Paiement", value: "payment" },
            ],
        }
    },
    created() {
        if (this.fromPage == 'EditQuote') 
        {
            this.originQuote = this.quote;
        }
    },
    methods: {
        fieldRules(field) {
            let rules = []
            rules.push(v => !!v || 'Le champ ' + field + ' est obligatoire')
            return rules
        },
        update() {
            axios.post('http://127.0.0.1:8000/api/quote/update/' + this.quote._id, this.quote)
            .then((Response) => {console.log(Response.data.data), alert("Succès")})
            .catch(error => console.log(error));
        },
    },
    props: [
        'fromPage',
        'quote',
    ]
}
</script>