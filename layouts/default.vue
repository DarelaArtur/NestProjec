<template>
  <v-app>
    <v-navigation-drawer
      v-if="authUser"
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              @click="$router.push(localePath({ path: child.to }))"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" @click="$router.push(localePath({ path: item.to }))">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-4" dark>
      <v-toolbar-title class="ml-0 pl-4">
        <v-app-bar-nav-icon v-if="authUser" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Patrimonial Manager</span>
      </v-toolbar-title>

      <!--v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field-->
      <v-spacer></v-spacer>

      <language-currency-menu v-if="authUser"/>

      <v-btn icon v-if="authUser">
        <v-icon>notification_important</v-icon>
      </v-btn>

      <div class="text-center">
        <user-card-menu />
      </div>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCardMenu from '~/components/UserCardMenu.vue'
import LanguageCurrencyMenu from '~/components/LanguageCurrencyMenu.vue'

export default {
  components: {
    UserCardMenu,
    LanguageCurrencyMenu
  },

  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      menu: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      drawer: null,
     
    }
  },
  computed: {
    items() {
      return [
        { icon: 'dashboard', text: this.$t('dashboard'), to: '/dashboard' },
        //{ icon: 'history', text: 'Login', to: '/login' },
        { icon: 'category', text: this.$t('categories'), to: '/categories' },
        /**  {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Another',
          model: true,
          children: [{ icon: 'add', text: 'Add Type', to: '/type/add' }]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'More',
          model: false,
          children: [
            { text: 'Import', to: '/inspire' },
            { text: 'Export', to: '/inspire' },
            { text: 'Print', to: '/inspire' },
            { text: 'Undo changes', to: '/inspire' },
            { text: 'Other contacts', to: '/inspire' }
          ]
        },
        { icon: 'settings', text: 'Settings', to: '/inspire' },*/
        { icon: 'chat_bubble', text: this.$t('send_feedback'), to: '/inspire' },
        { icon: 'help', text: this.$t('help'), to: '/inspire' },
       //{ icon: 'phonelink', text: 'App downloads', to: '/inspire' },
       //{ icon: 'keyboard', text: 'Go to the old version', to: '/inspire' }
      ]
    },
    ...mapGetters({
       authUser: 'login/getAuthUser',
       infoUser: 'login/getInfoUser'
    })
  },
  beforeMount() {
    this.$store.dispatch('login/loginVerify')
      
  }
}
</script>