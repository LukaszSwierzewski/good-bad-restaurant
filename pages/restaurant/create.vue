<template>
  <v-row justify="center" align="center">
    <v-col cols="8">
      <v-card class="py-4 px-4">
        <add-restaurant>
          <template #header>
            Add new
          </template>
        </add-restaurant>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import AddRestaurant from '@/components/AddRestaurant.vue'
export default {
  name: 'CreateRestaurant',
  components: { AddRestaurant }
}
</script>
<style>
.lamia-logo {
  max-width: 180px;
}

</style>
