<template>
  <v-row dense>
    <v-col :cols="12">
      <v-data-table :headers="headers" :items="categories" sort-by="name" class="elevation-1">
        <template v-slot:item.icon="{ item }">
          <v-icon size="35" alt="Transport">{{ item.icon }}</v-icon>
          <!--v-chip color="green" dark>{{ item.type }}</v-chip-->
        </template>
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>{{ $t('categories') }}</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-on="on"
                  @click="e6 = 1"
                >{{ $t('new_item') }}</v-btn>
              </template>
              <v-card>
                 <v-card-title class="primary darken-1" style="color:white">{{ formTitle }}</v-card-title>
                
                <v-stepper v-model="e6" vertical>
                  <v-stepper-step
                    :complete="e6 > 1"
                    step="1"
                    @click="e6 = 1"
                    style="cursor: pointer;"
                  >
                    {{ $t('select_icon') }}
                    <small>{{ $t('please_select_icon') }}</small>
                  </v-stepper-step>

                  <v-stepper-content step="1">
                    <v-card color="grey lighten-5" class="mb-12" height="100%">
                      <v-row>
                        <v-col v-for="icon in icons" :key="icon.name">
                          <v-icon class="mr-2" @click="selectIcon(icon)">{{ icon }}</v-icon>
                        </v-col>
                      </v-row>
                      <small v-if="editedItem.icon">{{ $t('selected') }}:</small>
                      <v-icon
                        class="mr-2"
                        color="primary"
                        v-if="editedItem.icon"
                      >{{ editedItem.icon }}</v-icon>
                    </v-card>
                    <v-btn
                      color="primary"
                      :disabled="!editedItem.icon"
                      @click="e6 = 2"
                    >{{ $t('continue') }}</v-btn>
                    <v-btn text @click="editedItem.icon = ''">{{ $t('cancel') }}</v-btn>
                  </v-stepper-content>

                  <v-stepper-step :complete="e6 > 2" step="2">{{ $t('name') }}</v-stepper-step>
                  <v-stepper-content step="2">
                    <v-row>
                      <v-col cols="12" sm="6" md="12">
                        <v-text-field v-model="editedItem.name" :label="$t('name')"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-stepper-content>
                </v-stepper>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">{{ $t('cancel') }}</v-btn>
                  <v-btn
                    color="blue darken-1"
                    :disabled="!editedItem.name"
                    text
                    @click="save"
                  >{{ $t('save') }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
          <v-icon small @click="deleteItem(item)">delete</v-icon>
        </template>
        <template v-slot:no-data>
          <span>No data available =(</span>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? this.$t('new_item')
        : this.$t('edit_item')
    },
    ...mapGetters({
      categories: 'categories/getCategories'
    })
  },

  data: () => ({
    dialog: false,
    e6: 1,
    headers: [
      {
        text: 'Icons',
        align: 'left',
        sortable: false,
        value: 'icon'
      },
      { text: 'Name', value: 'name' },
      { text: 'Actions', value: 'action', sortable: false }
    ],
    desserts: [],
    icons: [],
    editedIndex: -1,
    editedItem: {
      icon: '',
      name: ''
    },
    defaultItem: {
      icon: '',
      name: ''
    }
  }),

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  beforeMount() {
    //this.$store.dispatch('type/loadAllTypes')
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.icons = [
        'emoji_transportation',
        'highlight',
        'phone_iphone',
        'account_balance',
        'local_hospital',
        'home',
        'fitness_center',
        'attach_money',
        'toys',
        'videogame_asset',
        'watch',
        'speaker',
        'laptop_mac',
        'tag_faces',
        'local_airport',
        'directions_subway',
        'directions_boat',
        'directions_bus',
        'directions_car',
        'local_dining',
        'local_gas_station',
        'local_grocery_store',
        'local_hotel',
        'local_laundry_service',
        'local_pharmacy',
        'local_pizza',
        'transfer_within_a_station',
        'restaurant',
        'local_offer',
        'store_mall_directory',
        'local_mall',
        'local_movies',
        'local_shipping',
        'local_parking',
        'home_work',
        'live_tv',
        'wifi',
        'beach_access',
        'child_care',
        'child_friendly',
        'smoking_rooms',
        'golf_course',
        'casino',
        'business_center',
        'school',
        'sports_football',
        'sports_soccer',
        'emoji_objects'
      ]
    },

    editItem(item) {
      this.editedIndex = this.categories.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.e6 = 1
    },

    deleteItem(item) {
      confirm('Are you sure you want to delete this item?') &&
        this.$store.dispatch('categories/removeCategory', item)
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      if (this.editedItem.id) {
        this.$store.dispatch('categories/editCategory', this.editedItem)
      } else {
        this.$store.dispatch('categories/insertCategory', this.editedItem)
      }
      this.close()
    },

    selectIcon(icon) {
      this.editedItem.icon = icon
    }
  }
}
</script>