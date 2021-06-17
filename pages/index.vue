<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >

    <template>
  <div class="text-center">
    <v-overlay :value="overlay">
      <v-progress-circular  color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
    
    </v-flex>
  </v-layout>
</template>

<script>
export default {
    data: () => ({
      overlay: false,
    }),

    watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 5000)
      },
    },
  }
</script>
