<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <h1><slot name="header" /></h1>
    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="Restaurant name"
      required
    />
    <template v-if="restaurant.length > 0">
      <v-alert
        dense
        border="left"
        type="info"
      >
        make sure the restaurant is not already on the list <br>
        Possible matches:
        <ul>
          <li class="warning--text" v-for="(item, index) in restaurant" :key='index'>{{ item.name }}</li>
        </ul>
      <v-switch
        v-model="noDuplicate"
        :rules="noDuplicateRules"
        :label="`I'm sure this restaurant is not duplicate`"
      ></v-switch>
      </v-alert>
    </template>
    <v-text-field
      v-model="link"
      :rules="linkRules"
      label="Restaurant website url"
      required
    />
    <v-radio-group v-model="isGood">
      <template #label>
        <div><h3>do you recommend <strong>{{ name }}?</strong></h3></div>
      </template>
      <v-radio :value="true">
        <template #label>
          <div><span class="success--text">recommended</span></div>
        </template>
      </v-radio>
      <v-radio :value="false">
        <template #label>
          <div><span class="error--text">not recommended</span></div>
        </template>
      </v-radio>
    </v-radio-group>
    <v-textarea
      v-model="description"
      label="Why?"
      class="mb-4"
      :rules="descriptionRules"
      hint="at least one sentence"
    />
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Add new restaurant
    </v-btn>
  </v-form>
</template>
<script>
import { linkRegex, debounce } from '@/helpers/util'
import firebaseAPI from '@/api/firebase'
export default {
  data: () => {
    return {
      valid: true,
      name: '',
      noDuplicate: true,
      noDuplicateRules: [v => !!v || 'You must be sure :)'],
      searchTextDebounced: '',
      isGood: true,
      restaurant: [],
      nameRules: [
        v => !!v || 'Name is required'
      ],
      link: '',
      collectionName: 'restaurant',
      linkRules: [
        v => !!v || 'URL is required',
        v => linkRegex().test(v) || 'Invalid URL'
      ],
      description: '',
      descriptionRules: [
        v => !!v || 'Description is required',
        v => v.length > 5 || 'At least one sentence',
        v => v.length < 150 || 'Description is to long'
      ]
    }
  },
  methods: {
    confirmNoDuplicate () {

    },
    validate () {
      if (this.$refs.form.validate()) {
        const payload = {
          name: this.name.toUpperCase(),
          link: this.link,
          description: this.description,
          isGood: this.isGood
        }
        firebaseAPI.create(this.$fire.firestore, this.collectionName, payload)
      }
    },
    async searchRestaurant (query) {
      if (query.length > 3) {
        const fetchedRestaurant = await firebaseAPI.search(this.$fire.firestore, this.collectionName, 'name', query)
        if (fetchedRestaurant.length > 0) {
          this.noDuplicate = false
        }
        this.restaurant = fetchedRestaurant
      } else {
        this.restaurant = []
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  },
  watch: {
    name: debounce(function (newVal) {
      this.searchTextDebounced = newVal.toUpperCase()
    }, 1000),
    searchTextDebounced (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.searchRestaurant(this.searchTextDebounced)
      }
    }
  }
}
</script>
<style>
.lamia-logo {
  max-width: 180px;
}

</style>
