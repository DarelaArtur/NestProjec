<template>
  <v-row dense>
    <v-col :cols="12">
      <v-data-table :headers="headers" :items="types" sort-by="name" class="elevation-1">
        <template v-slot:item.icon="{ item }">
          <v-icon size="35" alt="Transport">{{ item.icon }}</v-icon>
          <!--v-chip color="green" dark>{{ item.type }}</v-chip-->
        </template>
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>My Types</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on" @click="e6 = 1">New Item</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-stepper v-model="e6" vertical>
                  <v-stepper-step
                    :complete="e6 > 1"
                    step="1"
                    @click="e6 = 1"
                    style="cursor: pointer;"
                  >
                    Select an icon
                    <small>Please select an icon to define your types</small>
                  </v-stepper-step>

                  <v-stepper-content step="1">
                    <v-card color="grey lighten-5" class="mb-12" height="100%">
                      <v-row>
                        <v-col v-for="icon in icons" :key="icon.name">
                          <v-icon class="mr-2" @click="selectIcon(icon)">{{ icon.name }}</v-icon>
                        </v-col>
                      </v-row>
                    <small v-if="editedItem.icon">Selected:</small>
                    <v-icon class="mr-2" color="primary" v-if="editedItem.icon">{{ editedItem.icon }}</v-icon>
                    </v-card>
                    <v-btn color="primary" :disabled="!editedItem.icon" @click="e6 = 2">Continue</v-btn>
                    <v-btn text  @click="editedItem.icon = ''">Cancel</v-btn>
                  </v-stepper-content>

                  <v-stepper-step :complete="e6 > 2" step="2">Name and Description</v-stepper-step>
                  <v-stepper-content step="2">
                    <v-row>
                      <v-col cols="12" sm="6" md="12">
                        <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-stepper-content>
                </v-stepper>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" :disabled="!editedItem.name" text @click="save">Save</v-btn>
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
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    ...mapGetters({
      types: 'type/getTypes'
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
    this.$store.dispatch('type/loadAllTypes')
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.icons = [
        {
          name: 'emoji_transportation'
        },
        {
          name: 'highlight'
        },
        {
          name: 'stay_primary_portrait'
        },
        {
          name: 'account_balance'
        },
        {
          name: 'local_hospital'
        },
        {
          name: 'home'
        },
        {
          name: 'fitness_center'
        },
        {
          name: 'attach_money'
        }
      ]
    },

    editItem(item) {
      this.editedIndex = this.types.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.e6 = 1
    },

    deleteItem(item) {
      confirm('Are you sure you want to delete this item?') &&
        this.$store.dispatch('type/removeType', item)
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      if(this.editedItem.id) {
        this.$store.dispatch('type/editType', this.editedItem)
        
      } else {
        this.$store.dispatch('type/insertType', this.editedItem)

      }
      this.close()
    },

    selectIcon(icon) {
      this.editedItem.icon = icon.name
    }
  }
}
</script>