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
      <v-dialog v-model="dialog" width="450px">
        <v-card>
          <v-card-title class="primary darken-1" style="color:white">{{
            $t('new_expense')
          }}</v-card-title>
          <v-container>
            <v-form ref="form" v-model="formValid">
              <v-row>
                <v-col cols="12">
                  <v-select
                    :items="categories"
                    v-model="newExpense.categoryId"
                    :label="$t('type')"
                    item-text="name"
                    item-value="id"
                    hide-details
                    :rules="[rules.required]"
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
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    :label="$t('amount')"
                    v-money="maskAmount"
                    v-model="newExpense.amount"
                    :prefix="infoUser.currencySymbol"
                    :rules="[rules.required, rules.minAmount]"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-menu
                    v-model="calendarMenu"
                    :close-on-content-click="true"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="newExpense.payday"
                        :label="$t('payday')"
                        :rules="[rules.required]"
                        persistent-hint
                        prepend-inner-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="newExpense.payday"
                      no-title
                      @input="calendarMenu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-radio-group
                    v-model="newExpense.expenseType"
                    :rules="[rules.required]"
                    color="primary"
                  >
                    <template v-slot:label>
                      <div>{{ $t('kind_expanse') }}</div>
                    </template>
                    <v-radio color="primary" value="fixed">
                      <template v-slot:label>
                        <div>
                          <strong class="red--text">{{ $t('fixed') }}</strong
                          >.
                          <small>{{ $t('same_amount') }}</small>
                        </div>
                      </template>
                    </v-radio>
                    <v-radio color="primary" value="variable">
                      <template v-slot:label>
                        <div>
                          <strong class="orange--text">{{
                            $t('variable')
                          }}</strong
                          >.
                          <small>{{ $t('changes_amount') }}</small>
                        </div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    prepend-inner-icon="notes"
                    v-model="newExpense.description"
                    :label="$t('description')"
                    :placeholder="$t('some_description')"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="cancel()">{{
              $t('cancel')
            }}</v-btn>
            <v-btn text @click="save(newExpense)" :disabled="!formValid">{{
              $t('save')
            }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import FixedExpenses from '~/components/FixedExpenses.vue'
import VariableExpenses from '~/components/VariableExpenses.vue'
import SalaryDashboardMd from '~/components/SalaryDashboardMd.vue'
import ExpansesDashboardMd from '~/components/ExpansesDashboardMd.vue'
import SalaryDashboardSm from '~/components/SalaryDashboardSm.vue'
import ExpansesDashboardSm from '~/components/ExpansesDashboardSm.vue'

import moment from 'moment'
import momentTimezone from 'moment-timezone'
import { VMoney } from 'v-money'

import { mapGetters } from 'vuex'

export default {
  directives: {
    money: VMoney
  },

  computed: mapGetters({
    infoUser: 'login/getInfoUser',
    categories: 'categories/getCategories'
  }),

  components: {
    FixedExpenses,
    VariableExpenses,
    SalaryDashboardMd,
    ExpansesDashboardMd,
    SalaryDashboardSm,
    ExpansesDashboardSm
  },
  props: {
    source: String
  },

  data: () => ({
    maskAmount: {
      decimal: '.',
      thousands: '',
      precision: 2,
      masked: false
    },
    calendarMenu: false,
    formValid: true,
    selectedType: '',
    newExpense: {
      categoryId: '',
      amount: '',
      payday: '',
      expenseType: '',
      description: ''
    },
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      minAmount: v => v > 0.0 || 'Please include a valid amount'
    },

    dialog: false
  }),
  beforeMount() {
    this.$store.dispatch('categories/loadAllCategories')

    console.log(moment().date())
    console.log(moment().month())
    console.log(moment().year())

    //Convert the month number to String.
    const number = 0
    console.log(
      moment()
        .month(number)
        .format('MMMM')
    )

    //Current Month Format eg: January, February
    console.log(
      moment()
        .month(moment().month())
        .format('MMMM')
    )
  },
  methods: {
    cancel() {
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
      this.dialog = false
      this.maskAmount = null
    },

    save(newExpense) {
      this.$store.dispatch('dashboard/createExpanse', {
        expense: newExpense,
        currentMonth: moment().month()
      })
      this.dialog = false
      this.maskAmount = null
    },
 
    openDialog() {
      if (this.newExpense.categoryId) {
        this.$refs.form.reset()
        this.$refs.form.resetValidation()
      }

      this.dialog = true
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
