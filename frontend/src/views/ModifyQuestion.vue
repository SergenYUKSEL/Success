<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Question
        <router-link :to="{ name: 'ShowQuestion', params: { id: question._id } }">(Show Question)</router-link>
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
            <b-form-input placeholder="Enter the question category..." v-model.trim="question.questionCategory"></b-form-input>
          </b-col>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Points">
          <b-col sm="9">
            <b-form-input type="number" placeholder="Enter the question point..." v-model.trim="question.questionPoint"></b-form-input>
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
  name: 'ModifyQuestion',
  data () {
    return {
      question: {}
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
      axios.get(`http://`+ Address.ip +`/api/question/` + this.$route.params.id) // we get all the questions from the database
    .then(response => {
      this.question = response.data
      
    })
    .catch(e => {
      this.errors.push(e)
    })
    )
  },

  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.patch(`http://`+ Address.ip +`/api/question/modify` + this.$route.params.id, this.question) // we get the data entered for the modification of a question, then we insert the data in the questions collection
      .then(response => { 
        this.$router.push({
          name: 'ShowQuestion',
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