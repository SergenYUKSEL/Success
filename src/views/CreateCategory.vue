<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Add Category
        <b-link href="/category">(Category List)</b-link>
      </h2>
      <b-form @submit="onSubmit">
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Nom">
          <b-form-input v-model.trim="category.name"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Description">
            <b-form-textarea id="description"
                       v-model="category.description"
                       placeholder="La description de la catégorie"
                       :rows="2"
                       :max-rows="6">{{category.description}}</b-form-textarea>
        </b-form-group>
        <b-button type="submit" variant="primary">Save</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'
const Address = require('../../config/AddressApi')
const token = sessionStorage.getItem('Token')
export default {
  name: 'CreateCategory',
  data () {
    return {
      category: {}
    }
  },
  created() {
    axios.defaults.headers.common['Authorization'] =  'Bearer' +' '+  token
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://`+ Address.ip +`/api/category/create/`, this.category)
      .then(response => {
        this.$router.push({
          name: 'ShowCategory',
          params: { id: response.data.id }
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>