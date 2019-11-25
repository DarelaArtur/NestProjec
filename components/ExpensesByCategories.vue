<template>
  <v-container fluid>
    <v-data-iterator
      :items="listExpensesByCategory()"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      hide-default-footer
      no-data-text="No expenses found!"
      no-results-text="No expenses found!"
    >
      <template v-slot:header>
        <v-toolbar color="#fcfcfc26" class="mb-1">
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-select
              clearable
              :items="categories"
              v-model="search"
              :label="$t('type')"
              item-text="name"
              item-value="id"
              hide-details
              prepend-inner-icon="search"
              flat
            >
              <template v-slot:item="{ item }">
                <v-icon size="20" left>{{ item.icon }}</v-icon>
                <span>{{ item.name }}</span>
              </template>
              <template v-slot:selection="{ item }">
                <v-icon left>{{ item.icon }}</v-icon>
                <span>{{ item.name }}</span>
              </template>
            </v-select>

            <v-spacer></v-spacer>

            <v-btn-toggle mandatory small>
              <v-btn small depressed @click="changeList(true)">
                <v-icon size="15" left>gps_not_fixed</v-icon>{{ $t('variable') }}
              </v-btn>
              <v-btn small depressed @click="changeList(false)">
                <v-icon size="15" left>gps_fixed</v-icon>{{ $t('fixed') }}
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="category in props.items"
            :key="category.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card min-height="300px">
              <v-card-title class="subheading font-weight-bold">
                <v-icon size="30" left>{{ category.icon }}</v-icon>
                <span>{{ category.name }}</span>
              </v-card-title>

              <v-divider></v-divider>
              <v-list dense>
                <v-list-item
                  v-for="expense in category.expenses"
                  :key="expense.id"
                >
                  <v-list-item-avatar size="10">
                    <v-icon>trending_down</v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      >{{ infoUser.currencySymbol
                      }}{{ expense.amount }}</v-list-item-title
                    >
                    <v-list-item-subtitle class="overline">{{ expense.payday | date }}</v-list-item-subtitle>
                    <v-list-item-subtitle v-text="expense.description"></v-list-item-subtitle>
              
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
              </v-list>
              <p align="center">
                <v-chip
                  class="ma-2"
                  :color="getColor(category.totalAmount)"
                  label
                  text-color="white"
                >
                  <span
                    >{{ $t('total') }}: {{ infoUser.currencySymbol }}
                    {{ category.totalAmount }}</span
                  >
                </v-chip>
              </p>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text" style="padding-left: 15px;"
            >{{ $t('itens_per_page') }}</span
          >
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn dark text color="primary" class="ml-2" v-on="on">
                {{ itemsPerPage }}
                <v-icon>keyboard_arrow_down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <div style="padding-right: 15px;">
            <span
              class="mr-4
            grey--text"
            >
              {{ $t('page') }} {{ page }} {{ $t('of') }} {{ numberOfPages }}
            </span>
            <v-btn
              small
              fab
              dark
              color="blue darken-3"
              class="mr-2"
              @click="formerPage"
            >
              <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              color="blue darken-3"
              small
              class="ml-1"
              @click="nextPage"
            >
              <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
          </div>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: '',
      page: 1,
      itemsPerPage: 4,
      variable: true,
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.listExpensesByCategory().length / this.itemsPerPage)
    },
   
    ...mapGetters({
      infoUser: 'login/getInfoUser',
      fixedExpenses: 'dashboard/getFixedExpenses',
      categories: 'categories/getCategories',
      currentMonth: 'dashboard/getCurrentMonth',
      variableExpenses: 'dashboard/getVariableExpenses'
    })
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number
    },

    getColor(value) {
      if (value >= 900) return 'red'
      else if (value > 400) return 'orange'
      else return 'green'
    },

    changeList(value) {
      this.variable = value;
      this.listExpensesByCategory()
    },

     listExpensesByCategory() {
      let myList = []
      this.categories.forEach(category => {
        var myExpenseByCategory = category
        myExpenseByCategory.expenses = []
        myExpenseByCategory.totalAmount = 0

        if(this.variable) {
          this.variableExpenses.forEach(expense => {
            if (category.id == expense.categoryId) {
              myExpenseByCategory.expenses.push(expense)
              myExpenseByCategory.totalAmount = parseFloat(
                Number(myExpenseByCategory.totalAmount) + Number(expense.amount)
              ).toFixed(2)
            }
          })
          
        } else {
           this.fixedExpenses.forEach(expense => {
            if (category.id == expense.categoryId) {
              myExpenseByCategory.expenses.push(expense)
              myExpenseByCategory.totalAmount = parseFloat(
                Number(myExpenseByCategory.totalAmount) + Number(expense.amount)
              ).toFixed(2)
            }
          })
        }

        if (myExpenseByCategory.expenses.length > 0) {
          myList.push(myExpenseByCategory)
        }
      })

      return myList
    }
  }
}
</script>
