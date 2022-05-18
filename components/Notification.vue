<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
  >
    {{ text }}

    <template #action="{ attrs }">
      <v-btn
        color="blue"
        text
        v-bind="attrs"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  name: 'NotificationBar',
  data () {
    return {
      snackbar: false,
      text: 'My timeout is set to 2000.',
      timeout: 2000
    }
  }
}
</script>
