<template>
  <v-data-table
    :headers="headers"
    :items="variableExpenses"
    sort-by="creation_date"
    class="elevation-1"
  >
    <template v-slot:item.categoryId="{ item }">
      <span v-for="category in categories" :key="category.id">
        <v-tooltip top v-if="category.id == item.categoryId">
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
             <v-icon size="35">{{ category.icon }}</v-icon>
            </v-btn>
          </template>
          <span>{{ category.name }}</span>
        </v-tooltip> 
      </span>
    </template>

    <template v-slot:item.payday="{ item }">
      {{ item.payday | date }}
    </template>
    
      <template v-slot:item.amount="{ item }">
       <v-chip :color="getColor(item.amount)" dark>{{ infoUser.currencySymbol }}{{ item.amount }}</v-chip>
    </template>

    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-icon left>gps_not_fixed</v-icon>
        <v-toolbar-title class="title font-weight-light mb-2" style="color:grey">{{ $t('variable_expenses') }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-chip class="ma-2" color="primary" label text-color="white">
          <v-icon class="hidden-sm-and-down" left>label</v-icon>
          <span class="hidden-sm-and-down"
            >{{ $t('total') }}: {{ infoUser.currencySymbol }}{{ variableTotalAmount }}</span
          >
          <span class="hidden-md-and-up"
            >{{ infoUser.currencySymbol }} {{ variableTotalAmount }}</span
          >
        </v-chip>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <!--v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn-->
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.calories"
                      label="Calories"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.fat"
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
      <!--v-icon small @click="deleteItem(item)">delete</v-icon-->
    </template>
    <template v-slot:no-data>
      <span>You have no expenses yet =(</span>
    </template>
  </v-data-table>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    dialog: false,
   headers: [
      {
        text: 'Category',
        align: 'left',
        sortable: true,
        value: 'categoryId'
      },
      { text: 'Amount', value: 'amount' },
      { text: 'Pay day', value: 'payday' },
      { text: 'Description', value: 'description' },
      { text: 'Actions', value: 'action', sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    ...mapGetters({
      infoUser: 'login/getInfoUser',
      fixedExpenses: 'dashboard/getFixedExpenses',
      variableExpenses: 'dashboard/getVariableExpenses',
      categories: 'categories/getCategories',
      variableTotalAmount: 'dashboard/getVariableTotalAmount'
    })
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  created() {
  
  },

  methods: {

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.desserts.splice(index, 1)
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
     getColor(value) {
        if (value > 400) return 'red'
        else if (value > 200) return 'orange'
        else return 'green'
      }
  }
}
</script>
<style>
</style>