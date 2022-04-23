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
                  label="Name">
          <b-col sm="9">
            <b-form-input type="text" placeholder="Enter the category name..." v-model.trim="category.name"></b-form-input>
          </b-col>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Description">
            <b-col sm="9">
              <b-form-textarea id="description"
                        v-model="category.description"
                        placeholder="Enter the category description..."
                        :rows="2"
                        :max-rows="6">{{category.description}}</b-form-textarea>
            </b-col>
        </b-form-group>
        <b-button type="submit" variant="primary">Update</b-button>
        <b-button type="button" variant="success" @click="$router.go(-1)">Cancel</b-button>
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
    if(sessionStorage.getItem('Role') === 'collaborator') { // if the user are collaborator, we move him to home page
        this.$router.push({
          name: 'Collaborator',
        })
      }
      else if (sessionStorage.getItem('Logged') != "true") { // if the user is not logged in, we move him to the login page
      this.$router.push({
      name: 'Login'
    })
    }
      
    axios.all(
      axios.defaults.headers.common['Authorization'] =  'Bearer' +' '+  token, // this is the authentication header to make requests from the api
      axios.get(`http://`+ Address.ip +`/api/category/` + this.$route.params.id) // we get all the categories from the database
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
      axios.put(`http://`+ Address.ip +`/api/category/modify` + this.$route.params.id, this.category) // we get the data entered for the modification of a category, then we insert the data in the categories collection
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