<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Suggestion
        <b-link href="/suggestion">(Suggestion List)</b-link>
      </h2>
      <b-jumbotron>
        <template slot="lead">
          <span class="subtitle-survey">Name: </span>{{suggestion.questionName}}<br>
          <span class="subtitle-survey">Category: </span>{{suggestion.questionCategory}}<br>
          <span class="subtitle-survey">Content : </span>{{suggestion.questionContent}} <br>
          <span class="subtitle-survey">Point : </span>{{suggestion.questionPoint}}<br>
          <span class="subtitle-survey">Answer: </span>{{suggestion.questionAnswer}}<br>
        </template>
        <hr class="my-4">
        <p>
          Updated Date: {{suggestion.updated_date}}
        </p>
       <!-- <b-btn variant="success" @click.stop="editquestion(suggestion._id)">Edit</b-btn> -->
       <!-- we can edit the suggestion if we want but for now the collaborator can't see his suggestion, that why its not useful to add edit option -->
       
         <b-form @submit="onSubmit">
       
        <b-button  type="submit" variant="primary">Valid</b-button>
         <b-btn variant="danger" style="margin-left: 5vh;" @click.stop="deletequestion(suggestion._id)">Delete</b-btn>
         <a style="color : #fff;margin-left: 5vh" type="button" v-on:click="Returnbehind()" class="btn btn-primary cold btn-cursor">Go back</a>
      </b-form>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'
const Address = require('../../config/AddressApi')
const token = sessionStorage.getItem('Token')

export default {
  name: 'ShowSuggestion',
  data () {
    return {
      suggestion: [],
      question: {},
      categories: [],
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
      axios.get(`http://`+ Address.ip +`/api/suggestion/` + this.$route.params.id) // we get all the suggestions from the database
    .then(response => {
      this.suggestion = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }),
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
      axios.post(`http://`+ Address.ip +`/api/question/create/`, this.suggestion) 
      // we take the suggestion info by id, and on the question create request we give suggestion data,
      // and add the data by name because the two table have the same attributes.
      .then(response => {
        axios.delete(`http://`+ Address.ip +`/api/suggestion/delete` + this.$route.params.id)
        // after add the suggestion to question table, we delete the suggestion.
        this.$router.push({
          name: 'ShowQuestion',
          params: { id: response.data.id }
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    
    },
    editquestion (suggestionid) {
      this.$router.push({
        name: 'ModifySuggestion',
        params: { id: suggestionid }
      })
    },
    
    deletequestion (suggestionid) {
      axios.delete(`http://`+ Address.ip +`/api/suggestion/delete` + suggestionid)
      .then((result) => {
        this.$router.push({
          name: 'suggestion'
        })
        return result;
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    Returnbehind() {
        this.$router.push({
          name: 'suggestion',
        })
      }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
  .btn-cursor {
  cursor: pointer;
}
</style>