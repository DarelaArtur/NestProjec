<template>
  <v-data-table :headers="headers" :items="desserts" sort-by="creation_date" class="elevation-1">
   <template v-slot:item.type="{ item }">
       <v-icon size="35" alt="Transport">{{ item.type }}</v-icon>
      <!--v-chip color="green" dark>{{ item.type }}</v-chip-->
    </template>
    <template v-slot:item.amount="{ item }">
       €<span>{{ item.amount }}</span>
      <!--v-chip color="green" dark>{{ item.type }}</v-chip-->
    </template>
    
    
    <template v-slot:top >
      <v-toolbar flat color="white">
        <v-icon left>gps_fixed</v-icon>
        <v-toolbar-title class="title font-weight-light mb-2" style="color:grey">Fixed Expenses</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-chip class="ma-2" color="primary" label text-color="white">
          <v-icon class="hidden-sm-and-down" left>label</v-icon>
          <span class="hidden-sm-and-down">TOTAL: €1500,00</span> 
          <span class="hidden-md-and-up">€1500,00</span>
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
                    <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
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
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
    
  </v-data-table>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Type',
        align: 'left',
        sortable: true,
        value: 'type'
      },
      { text: 'Description', value: 'description' },
      { text: 'Amount', value: 'amount' },
      { text: 'Payday', value: 'payday' },
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
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          type: "emoji_transportation",
          description: 'Car rent',
          amount: 125.00,
          payday: "25/10/2019",
          creation_date: "30/10/2019"
        },
        { 
          type: "highlight",
          description: 'Water + Light',
          amount: 159.00,
          payday: "30/10/2019",
          creation_date: "30/10/2019"
        },
        {
            
          type: "stay_primary_portrait",
          description: 'Celphone',
          amount: 28.00,
          payday: "15/10/2019",
          creation_date: "30/10/2019"
        },
        {
          type: "account_balance",
          description: 'Seg. Social',
          amount: 241.20,
          payday: "17/10/2019",
          creation_date: "30/10/2019"
        },
        {
          type: "local_hospital",
          description: 'Medical Care',
          amount: 241.20,
          payday: "17/10/2019",
          creation_date: "30/10/2019"
        },
        {
          type: "home",
          description: 'Apartment rent',
          amount: 850.20,
          payday: "01/10/2019",
          creation_date: "30/10/2019"
        },
        {
          type: "fitness_center",
          description: 'Gym Vitor',
          amount: 66.70,
          payday: "05/10/2019",
          creation_date: "30/10/2019"
        },
        {
          type: "fitness_center",
          description: 'Gym gabi',
          amount: 71.70,
          payday: "05/10/2019",
          creation_date: "30/10/2019"
        },
        {
         type: "attach_money",
          description: 'Vodafone',
          amount: 32.38,
          payday: "20/10/2019",
          creation_date: "30/10/2019"
        },
      ]
    },

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
    }
  }
}
</script>
<style>
</style>