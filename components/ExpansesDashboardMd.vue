<template>
  <v-card style>
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="#0063B1"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline
        :value="item.value"
        color="rgba(255, 255, 255, .7)"
        padding="10"
        smooth
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        gradient-direction="top"
        auto-draw
      >
        <template v-slot:label="item">${{ item.value }}</template>
      </v-sparkline>
      <!--v-sparkline
                  :labels="labels"
                  :value="value"
                  padding="16"
                  :gradient="['#f72047', '#ffd200', '#1feaea']"
                  gradient-direction="top"
                  auto-draw
      ></v-sparkline-->
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">Last Months Expenses</div>
      <div class="subheading font-weight-light grey--text">Last Campaign Performance</div>
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small>clock</v-icon>
      <span class="caption grey--text font-weight-light">last registration 26 minutes ago</span>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    item: {
      value: [423, 446, 675, 510, 590, 610, 760]
    }
  })
}
</script>
<style>


</style>