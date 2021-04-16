<template>
    <div class="container">
        <v-card>
            <v-card-title width="100%">
                <v-row>
                    <v-col class="text-left">
                        <img src="../../assets/logo_complet.png" alt="logo_complet" width="100%">
                    </v-col>
                    <v-col class="text-right">
                        <v-list>
                            <v-list-item>
                                <v-list-item-content>
                                    <div v-for="item in header" :key="item.text">
                                        <v-list-item-title>{{ item.text + item.variable }}</v-list-item-title>
                                    </div>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="text-left">
                        <v-list>
                            <v-list-item>
                                <v-list-item-content>
                                    <div v-for="item in madera" :key="item.text">
                                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                                    </div>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <v-col class="text-right">
                        <v-list>
                            <v-list-item>
                                <v-list-item-content>
                                    <div v-for="item in customer" :key="item.text">
                                        <v-list-item-title>{{ item.text + item.variable }}</v-list-item-title>
                                    </div>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-divider />
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="#59BD73">Valider</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'DialogQuote',
    data() {
        return {
            header: [
                { text: "DEVIS N° ", variable: this.quote._id },
                { text: "DATE : ", variable: moment(this.quote.created_at).format('DD/MM/YYYY') },
                { text: "CLIENT N° ", variable: this.quote.customer._id },
                { text: "PROJET N° ", variable: this.quote.project._id },
                { text: "PROJET : ", variable: this.quote.project.name },
            ],
            madera: [
                { text: "MADERA" },
                { text: "Rue Enzo Ferrari," },
                { text: "85000 La Roche-sur-Yon" },
                { text: "Tel : 02 51 98 18 32" },
                { text: "Email : contact@madera-construction.com" },
            ],
            customer: [
                { text: "Mr ", variable: [this.quote.customer.firstName + this.quote.customer.name] },
                { text: "", variable: [this.quote.customer.address['address']] },
                { text: " ", variable: [this.quote.customer.address['postCode'] + this.quote.customer.address['city']] },
                { text: "Tel : ", variable: [this.quote.customer.phoneNumber] },
                { text: "Email : ", variable: [this.quote.customer.email] },
            ],
            search: '',
            load: true,
            headers: [
                { text: "Ref", value: "" },
                { text: "Désignation", value: "" },
                { text: "Unité", value: "" },
                { text: "Qté", value: "" },
                { text: "P.U.", value: "" },
                { text: "Total HT", value: "" },
            ],
            collection: [],
        }
    },
    methods: {
        moment: function (date) {
           return moment(date);
        },

    },
    mounted() {
        this.load = false
    },
    props: [
        'quote',
    ],
}
</script>