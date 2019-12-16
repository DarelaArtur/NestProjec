<template>
  <v-dialog v-model="dialog" width="450px">
    <v-card>
      <v-card-title class="primary darken-1" style="color:white">{{
        formTitle
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
                v-model="newExpense.amount"
                :prefix="infoUser.currencySymbol"
                :rules="[rules.required, rules.minAmount]"
                placeholder="0.00"
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
                :disabled="isUpdate"
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
                      <strong class="orange--text">{{ $t('variable') }}</strong
                      >.
                      <small>{{ $t('changes_amount') }}</small>
                    </div>
                  </template>
                </v-radio>
              </v-radio-group>
              <v-checkbox
                v-if="newExpense.expenseType == 'fixed'"
                v-model="newExpense.paid"
                color="primary"
              >
                <template v-slot:label>
                  <div>
                    <strong>{{ $t('already_paid') }}</strong>
                    <small>{{ $t('already_paid_desc') }}</small>
                  </div>
                </template>
              </v-checkbox>
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
        <v-btn text color="primary" @click="cancel()">{{ $t('cancel') }}</v-btn>
        <v-btn text @click="save(newExpense)" :disabled="!formValid">{{
          $t('save')
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
import momentTimezone from 'moment-timezone'

import { mapGetters } from 'vuex'

export default {
  computed: {
    formTitle() {
      return this.isUpdate ? this.$t('edit_expense') : this.$t('new_expense')
    },
    ...mapGetters({
      infoUser: 'login/getInfoUser',
      categories: 'categories/getCategories',
      currentMonth: 'dashboard/getCurrentMonth'
    })
  },

  props: {
    newExpense: {
      required: true
    },
    dialog: {
      required: true
    },
    isUpdate: {
      required: false
    }
  },

  data: () => ({
    calendarMenu: false,
    formValid: true,
    selectedType: '',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      minAmount: v => v > 0.0 || 'Please include a valid amount'
    }
  }),

  methods: {
    cancel() {
      //this.resetExpense()
      //this.$refs.form.reset()
      this.$refs.form.resetValidation()
      this.$nuxt.$emit('CLOSE_DIALOG', {})
      //this.maskAmount = null
    },

    save(newExpense) {
      if (this.isUpdate) {
        this.$store.dispatch('dashboard/editExpense', {
          expense: newExpense,
          currentMonth: this.currentMonth
        })
      } else {
        this.$store.dispatch('dashboard/createExpense', {
          expense: newExpense,
          currentMonth: this.currentMonth
        })
        this.$nuxt.$emit('SNACKBAR', {})
      }
      this.$refs.form.resetValidation()
      this.$nuxt.$emit('CLOSE_DIALOG', {})
    }
  }
}
</script>
