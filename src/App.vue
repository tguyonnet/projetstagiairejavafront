<template>
  <div id="app">
    <v-app id="inspire">
      <!-- Sidebar -->
      <v-navigation-drawer v-model="burger" app :color="sidebar">
        <v-sheet class="pa-4" :color="sidebar">
          <v-avatar class="mb-4" size="64">
            <img src="./assets/logo_minimal.png" alt="logo_minimal">
          </v-avatar>
          <div>madera</div>
        </v-sheet>

        <!-- Menu -->
        <v-list class="text-left">
          <!-- Routes menu -->
          <v-list-item class="text-decoration-none" v-for="link in links" :key="link.text" router :to="link.route">
            <!-- Icons Menu -->
            <v-list-item-icon>
              <v-icon class="pl-6" :color="iconMenu">{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <!-- Texts Menu -->
            <v-list-item-content>
              <v-list-item-title class="pl-6">{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>  
        </v-list>
      </v-navigation-drawer>

      <!-- burger dynamique -->
      <v-app-bar app color="#59BD73">
        <v-app-bar-nav-icon @click="burger = !burger"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-btn icon @click="toggle_dark_mode">
          <v-icon>fa-adjust</v-icon>
       </v-btn>
        <v-btn icon>
          <v-icon>fa-sign-out-alt</v-icon>
       </v-btn>
      </v-app-bar>

      <v-main>
        <!-- Appel des vues -->
        <router-view/>
        <!-- Footer -->
        <v-footer padless v-bind="fixed">
          <v-card flat tile width="100%" class="lighten-1 text-center">
            <v-card-text>
              <v-btn v-for="link in links" :key="link.text" router :to="link.route" text class="text-decoration-none"> {{ link.text }} </v-btn>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
              <strong>{{ new Date().getFullYear() }} — CESI Nantes PFR MADERA</strong>
            </v-card-text>
          </v-card>
        </v-footer>
      </v-main>
    </v-app> 
  </div>
</template>


<script>
export default {
  name: 'App',
  data() {
    return {
      burger: null,
      //couleurs theme dark/light
      sidebar: '#D5DED7',
      colorSidebar: ['#D5DED7', '#424242'],
      iconMenu: '#424242',
      colorIconMenu: ['#424242', '#59BD73'],
      //menu
      links: [
        {icon: 'fa-home', text: 'Accueil', route: '/'},
        {icon: 'fa-folder-open', text: 'Projets', route: '/projets'},
        {icon: 'fa-file-signature', text: 'Devis', route: '/devis'},
        {icon: 'fa-user-alt', text: 'Clients', route: '/clients'},
        {icon: 'fa-cubes', text: 'Stocks', route: '/stocks'}
      ],
    }
  },
  methods: {
    //Fonction bouton dark mode
    toggle_dark_mode: function() {
        //theme dark de vuetify
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        this.sidebar = this.colorSidebar[1];
        this.iconMenu = this.colorIconMenu[1];
        if(!this.$vuetify.theme.dark) {
          this.sidebar = this.colorSidebar[0];
          this.iconMenu = this.colorIconMenu[0];
        }
        //Stockage des themes dans localStorage
        localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
        localStorage.setItem("colorSidebar", this.sidebar.toString());
        localStorage.setItem("colorIconMenu", this.iconMenu.toString());
    },
  },
  mounted() {
    //récup le dernier theme choisi
    const theme = localStorage.getItem("dark_theme");
    const colorSidebar = localStorage.getItem("colorSidebar");
    const colorIconMenu = localStorage.getItem("colorIconMenu");
    if (theme) {
        if (theme === "true" && colorSidebar === "#424242" && colorIconMenu === "#59BD73") {
            this.$vuetify.theme.dark = true;
            this.sidebar = "#424242";
            this.iconMenu = "#59BD73";
        } else {
            this.$vuetify.theme.dark = false;
            this.sidebar = "#D5DED7";
            this.iconMenu = "#424242";
        }
    } 
  }
}
</script>

<style>
#app {
  text-align: center; 
}
</style>


