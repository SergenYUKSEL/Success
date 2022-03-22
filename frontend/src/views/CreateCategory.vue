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
        <b-button class="btn-cursor" type="submit" variant="primary">Save</b-button>
        <a style="color : #fff;margin-left: 5vh" type="button" v-on:click="Returnbehind()" class="btn btn-primary cold btn-cursor">Go back</a>
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
    if(sessionStorage.getItem('Role') === 'collaborator') {
        this.$router.push({
          name: 'Collaborator',
        })
      }
      
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
    },
     Returnbehind() {
        this.$router.push({
          name: 'Corrector',
        })
      }
  }
}
</script>
<style>
.btn-cursor {
  cursor: pointer;
}
</style>