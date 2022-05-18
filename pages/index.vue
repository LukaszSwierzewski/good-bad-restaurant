<template>
  <v-row justify="center" align="center">
    <v-col md="8" sm="12">
      <v-card class="py-4 d-flex justify-center">
        <LamiaLogo />
      </v-card>
      <v-card>
        <v-row justify="center" class="px-3">
          <v-col cols="12" md="6">
            <h2 class="error--text">
              Not recommended:
            </h2>
            <v-list v-if="badRestaurantList.length > 0">
              <v-list-item-group
                v-for="(restaurant, index) in badRestaurantList"
                :key="index"
                class="my-4"
              >
                <h3 class="font-weight-bold">
                  <a target="_blank" :href="restaurant.link">{{ restaurant.name }} </a>
                </h3>
                <span class="caption">{{ restaurant.description }}</span>
                <v-divider />
              </v-list-item-group>
            </v-list>
          </v-col>
          <v-col cols="12" md="6">
            <h2 class="success--text">
              Recommended:
            </h2>
            <v-list>
              <v-list-item-group
                v-for="(restaurant, index) in goodRestaurantList"
                :key="index"
                class="my-4"
              >
                <h3 class="font-weight-bold">
                  <a target="_blank" :href="restaurant.link">{{ restaurant.name }} </a>
                </h3>
                <span class="caption">{{ restaurant.description }}</span>
                <v-divider />
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import LamiaLogo from '@/components/LamiaLogo.vue'
import firebaseAPI from '@/api/firebase'
export default {
  name: 'IndexPage',
  components: { LamiaLogo },
  data () {
    return {
      restaurantList: []
    }
  },
  async created () {
    const db = this.$fire.firestore
    let restaurantList = null
    try {
      this.restaurantList = await firebaseAPI.getAll(db, 'restaurant')
    } catch (e) {
      throw new Error(e)
    }
  },
  computed: {
    goodRestaurantList () {
      return this.restaurantList.filter(item => item.isGood)
    },
    badRestaurantList () {
      return this.restaurantList.filter(item => !item.isGood)
    }
  }
}
</script>
