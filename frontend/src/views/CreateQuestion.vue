<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Add Question
        <b-link href="/question">(Question List)</b-link>
      </h2>
      <b-form @submit="onSubmit">
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Name">
          <b-col sm="9">
            <b-form-input type="text" placeholder="Enter the question name..." v-model.trim="question.questionName"></b-form-input>
          </b-col>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Content">
          <b-col sm="9">
            <b-form-input type="text" placeholder="Enter the question content..." v-model.trim="question.questionContent"></b-form-input>
          </b-col>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Category">
          <b-col sm="9">
            <b-form-select v-model="question.questionCategory" size="sm" class="mt-3">
              <option v-for="category in categories"  :key="category.name">{{category.name}}</option>
            </b-form-select>
          </b-col>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Points">
          <b-col sm="9">
            <b-form-input type="number" placeholder="Enter the question points..." v-model.trim="question.questionPoint"></b-form-input>
          </b-col>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Answer">
          <b-col sm="9">
            <b-form-input type="text" placeholder="Enter the question answer..." v-model.trim="question.questionAnswer"></b-form-input>
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
  name: 'CreateQuestion',
  data () {
    return {
      question: {},
      categories: [],
      
      
    }
  },
  created() {
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
      axios.get(`http://`+ Address.ip +`/api/category`) // we get all the categories from the database
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
      axios.post(`http://`+ Address.ip +`/api/question/create/`, this.question) // we get the data entered for the creation of a question, then we insert the data in the questions collection
      .then(response => {
        this.$router.push({
          name: 'ShowQuestion',
          params: { id: response.data.id }
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    
    },
     Returnbehind() { // returns to the previous page
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