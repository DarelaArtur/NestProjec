<template>
  <v-data-table
    :headers="headers"
    :items="fixedExpenses"
    sort-by="creation_date"
    class="elevation-1"
    :loading="loading"
    loading-text="Loading... Please wait"
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
      <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
                    <v-chip :color="getColor(item.amount)" dark
        >{{ infoUser.currencySymbol }}{{ item.amount }}</v-chip>
            </v-btn>
          </template>
          <span v-if="item.description">{{ item.description }}</span>
        </v-tooltip>
    </template>

    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
      <v-icon small @click="deleteItem(item)">delete</v-icon>
    </template>

    <template v-slot:no-data>
      <span v-if="!lastFixedExpenses">No expenses yet =(</span>
     <v-btn v-else class="ma-2" outlined color="primary" @click="copyLastMonth">
      <v-icon left>file_copy</v-icon> Copy Last Month Expenses
    </v-btn>
    </template>

    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-icon left>gps_fixed</v-icon>
        <v-toolbar-title
          class="title font-weight-light mb-2"
          style="color:grey"
          >{{ $t('fixed_expenses') }}</v-toolbar-title
        >
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-chip class="ma-2" color="primary" label text-color="white">
          <v-icon class="hidden-sm-and-down" left size="20"
            >trending_down</v-icon
          >
          <span class="hidden-sm-and-down"
            >{{ $t('total') }}: {{ infoUser.currencySymbol
            }}{{ fixedTotalAmount }}</span
          >
          <span class="hidden-md-and-up"
            >{{ infoUser.currencySymbol }}{{ fixedTotalAmount }}</span
          >
        </v-chip>
      </v-toolbar>
    </template>
  </v-data-table>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    loading: false,
    headers: [
      {
        text: 'Category',
        align: 'left',
        sortable: true,
        value: 'categoryId'
      },
      { text: 'Amount', value: 'amount' },
      { text: 'Pay day', value: 'payday' },
      { text: 'Actions', value: 'action', sortable: false }
    ],
  }),

  computed: {
    ...mapGetters({
      infoUser: 'login/getInfoUser',
      fixedExpenses: 'dashboard/getFixedExpenses',
      categories: 'categories/getCategories',
      fixedTotalAmount: 'dashboard/getFixedTotalAmount',
      currentMonth: 'dashboard/getCurrentMonth',
      lastFixedExpenses: 'dashboard/getLastFixedExpenses'
    })
  },

  watch: {
    loading(val) {
      val &&
        setTimeout(() => {
          this.loading = false
        }, 2000)
    }
  },

  created() {
    this.checkExpensesLastMonth()
    this.loading = true
  },

  methods: {
    editItem(item) {
      this.editedItem = Object.assign({}, item)
      this.$nuxt.$emit('OPEN_EDIT_DIALOG', this.editedItem)
    },

    deleteItem(item) {
      confirm('Are you sure you want to delete this item?') &&
        this.$store.dispatch('dashboard/removeExpense', {
          expense: item,
          currentMonth: this.currentMonth
        })
    },

    getColor(value) {
      if (value > 400) return 'red'
      else if (value > 200) return 'orange'
      else return 'green'
    },

    checkExpensesLastMonth() {
      this.$store.dispatch('dashboard/checkLastExpenses')
    },

    copyLastMonth() {
      console.log("copying...")
      this.$store.dispatch('dashboard/copyLastExpenses')
    }

  }
}
</script>
<style></style>
