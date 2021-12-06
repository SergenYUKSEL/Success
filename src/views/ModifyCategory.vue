<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Category
        <router-link :to="{ name: 'ShowCategory', params: { id: category._id } }">(Show Category)</router-link>
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
        <b-button type="submit" variant="primary">Update</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
const Address = require('../../config/AddressApi')
const token = sessionStorage.getItem('Token')

export default {
  name: 'ModifyCategory',
  data () {
    return {
      category: {}
    }
  },
  created () {
    axios.all(
      axios.defaults.headers.common['Authorization'] =  'Bearer' +' '+  token,
      axios.get(`http://`+ Address.ip +`/api/category/` + this.$route.params.id)
    .then(response => {
      this.category = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    )
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.put(`http://`+ Address.ip +`/api/category/modify` + this.$route.params.id, this.category)
      .then(response => { 
        this.$router.push({
          name: 'ShowCategory',
          params: { id: this.$route.params.id },
        })
        alert("Form was submitted successfully");
        return response
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>