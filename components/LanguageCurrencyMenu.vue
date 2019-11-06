<template>
  <v-menu
    :close-on-content-click="false"
    offset-y
    v-model="menu"
    bottom
    origin="center center"
    transition="scale-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon large v-on="on">
        <v-icon size="23">language</v-icon>
      </v-btn>
    </template>
    <v-card class="mx-auto" max-width="344">
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>language</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Language and Currency</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action></v-list-item-action>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item>
          <v-col cols="12">
            <v-list-item-action>
              <v-combobox
                v-model="selectLanguage"
                :items="languages"
                chips
                hide-selected
                label="Language"
              >
                <template v-slot:selection="data">
                  <v-icon left>translate</v-icon>
                  <span>{{ data.item }}</span>
                </template>
              </v-combobox>
            </v-list-item-action>
          </v-col>
        </v-list-item>

        <v-list-item>
          <v-col cols="12">
            <v-list-item-action>
              <v-combobox
                v-model="selectCurrency"
                :items="currencys"
                chips
                hide-selected
                label="Currency"
              >
                <template v-slot:selection="data">
                  <v-icon left>local_atm</v-icon>
                  <span>{{ data.item }}</span>
                </template>
              </v-combobox>
            </v-list-item-action>
          </v-col>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text @click="menu = false">Cancel</v-btn>
        <v-btn color="primary" text @click="menu = false">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      menu: false,
      languages: ['PT', 'ENG', 'ES'],
      currencys: ['€', '$', 'R$']
    }
  },
  computed: {
    selectLanguage: {
      get() {
        return this.infoUser.language
      },
      set(value) {
        console.log(value)
      }
    },
    selectCurrency: {
      get() {
        return this.infoUser.currencySymbol
      },
      set(value) {
        this.$store.dispatch('login/updateUserCurrency', value)
      }
    },
    ...mapGetters({
      infoUser: 'login/getInfoUser'
    })
  }
}
</script>