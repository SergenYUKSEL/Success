<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Suggestion
        <b-link href="/suggestion">(Suggestion List)</b-link>
      </h2>
      <b-jumbotron>
        <template slot="lead">
          Nom de la question: {{suggestion.question}}<br>
          Catégorie: {{suggestion.questionCategory}}<br>
          Réponse: {{suggestion.questionAnswer}}<br>
        </template>
        <hr class="my-4">
        <p>
          Updated Date: {{suggestion.updated_date}}
        </p>
       <!-- <b-btn variant="success" @click.stop="editquestion(suggestion._id)">Edit</b-btn> -->
        <b-btn variant="danger" @click.stop="deletequestion(suggestion._id)">Delete</b-btn>
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
      suggestion: []
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
    })
    )
  },
  methods: {
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
    }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>