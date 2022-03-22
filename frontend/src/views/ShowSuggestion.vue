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
          <span class="subtitle-survey">Point : </span>{{suggestion.questionPoint}}
          <span class="subtitle-survey">Answer: </span>{{suggestion.questionAnswer}}<br>
        </template>
        <hr class="my-4">
        <p>
          Updated Date: {{suggestion.updated_date}}
        </p>
       <!-- <b-btn variant="success" @click.stop="editquestion(suggestion._id)">Edit</b-btn> -->
       
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
    if(sessionStorage.getItem('Role') === 'collaborator') {
        this.$router.push({
          name: 'Collaborator',
        })
      }
      
    axios.all(
      axios.defaults.headers.common['Authorization'] =  'Bearer' +' '+  token,
      axios.get(`http://`+ Address.ip +`/api/suggestion/` + this.$route.params.id)
    .then(response => {
      this.suggestion = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }),
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
      axios.post(`http://`+ Address.ip +`/api/question/create/`, this.suggestion)
      .then(response => {
        axios.delete(`http://`+ Address.ip +`/api/suggestion/delete` + this.$route.params.id)
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