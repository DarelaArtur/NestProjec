<template>
  <v-layout column justify-right align-right>
    <v-flex>
      <br />
      <v-container fluid>
        <v-row dense>
          <v-col class="hidden-sm-and-down" :cols="6">
            <salary-dashboard-md />
          </v-col>
          <v-col class="hidden-sm-and-down" :cols="6">
            <expanses-dashboard-md />
          </v-col>
          <v-col class="hidden-md-and-up" :cols="12">
            <expanses-dashboard-sm />
          </v-col>
          <v-col class="hidden-md-and-up" :cols="12">
            <salary-dashboard-sm />
            <br />
          </v-col>
        </v-row>
        <v-row dense>
          <v-col class="hidden-sm-and-down" :cols="6">
            <fixed-expenses />
          </v-col>
          <v-col class="hidden-sm-and-down" :cols="6">
            <variable-expenses />
          </v-col>
          <v-col class="hidden-md-and-up" :cols="12">
            <fixed-expenses />
          </v-col>
          <v-col class="hidden-md-and-up" :cols="12">
            <variable-expenses />
          </v-col>
        </v-row>
      </v-container>

      <v-btn bottom color="pink" dark fab fixed right @click="openDialog()">
        <v-icon>create</v-icon>
      </v-btn>
   
      <expense-modal :newExpense="newExpense" :dialog="dialog" :isUpdate="isUpdateExpense" />
   
    </v-flex>
    <v-snackbar v-model="snackbar" color="success" :timeout="2800" top>
      {{ successMessage }}
    </v-snackbar>
  </v-layout>
</template>

<script>
import FixedExpenses from '~/components/FixedExpenses.vue'
import VariableExpenses from '~/components/VariableExpenses.vue'
import SalaryDashboardMd from '~/components/SalaryDashboardMd.vue'
import ExpansesDashboardMd from '~/components/ExpansesDashboardMd.vue'
import SalaryDashboardSm from '~/components/SalaryDashboardSm.vue'
import ExpansesDashboardSm from '~/components/ExpansesDashboardSm.vue'
import ExpenseModal from '~/components/ExpenseModal.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
    FixedExpenses,
    VariableExpenses,
    SalaryDashboardMd,
    ExpansesDashboardMd,
    SalaryDashboardSm,
    ExpansesDashboardSm,
    ExpenseModal
  },

  data: () => ({
    snackbar: false,
    dialog: false,
    isUpdateExpense: false,
    newExpense: {
      categoryId: '',
      amount: '',
      payday: '',
      expenseType: '',
      description: ''
    }
  }),

  computed: {
    ...mapGetters({
      currentMonth: 'dashboard/getCurrentMonth'
    }),
    successMessage() {
      return this.$t('expense_success_message')
    }
  },
  mounted() {
    this.$nuxt.$on('SNACKBAR', data => {
      this.snackbar = true
    })
    this.$nuxt.$on('CLOSE_DIALOG', data => {
      this.resetExpense()
      this.dialog = false
    })
    this.$nuxt.$on('OPEN_EDIT_DIALOG', data => {
      this.dialog = true
      this.isUpdateExpense = true
      this.newExpense = data;
    })
  },

  beforeMount() {
    this.$store.dispatch('dashboard/loadDashboard', this.currentMonth)
    this.$store.dispatch('categories/loadAllCategories')

  },
  methods: {
    openDialog() {
      this.dialog = true
      this.isUpdateExpense = false
    },

    resetExpense() {
      this.newExpense = {
        categoryId: '',
        amount: '',
        payday: '',
        expenseType: '',
        description: ''
      }
    }
  }
}
</script>
<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
