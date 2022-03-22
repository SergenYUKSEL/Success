<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Add Suggestion
      </h2>
      <b-form @submit="onSubmit">
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Category">
          <b-col sm="9">
            <b-form-select v-model="suggestion.questionCategory" size="sm" class="mt-3">
              <option v-for="category in categories"  :key="category.name">{{category.name}}</option>
            </b-form-select>
          </b-col>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Question">
          <b-col sm="9">
            <b-form-input type="text" placeholder="Enter the question name..." v-model.trim="suggestion.questionName"></b-form-input>
          </b-col>
        </b-form-group>
         <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Content">
          <b-col sm="9">
            <b-form-input type="text" placeholder="Enter the question content..." v-model.trim="suggestion.questionContent"></b-form-input>
          </b-col>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Answer">
          <b-col sm="9">
            <b-form-input type="text" placeholder="Enter the question answer..." v-model.trim="suggestion.questionAnswer"></b-form-input>
          </b-col>
        </b-form-group>
         <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Points">
          <b-col sm="9">
            <b-form-input type="number" placeholder="Enter the question points..."  v-model.trim="suggestion.questionPoint"></b-form-input>
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
  name: 'CreateSuggestion',
  data () {
    return {
      suggestion: {},
      categories: [],
      
      
    }
  },
  created() {
    if(sessionStorage.getItem('Role') === 'corrector') {
        this.$router.push({
          name: 'Corrector',
        })
      }
      
    axios.all(
      axios.defaults.headers.common['Authorization'] =  'Bearer' +' '+  token,
      axios.get(`http://`+ Address.ip +`/api/category`)
    .then(response => {
      this.categories = response.data
      
    })
    .catch(e => {
      this.errors.push(e)
    })
    )
  },
  
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://`+ Address.ip +`/api/suggestion/create/`, this.suggestion)
      .then(response => {
        this.$router.push({
          name: 'Collaborator',
          params: { id: response.data.id }
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    
    },
    Returnbehind() {
        this.$router.push({
          name: 'Collaborator',
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