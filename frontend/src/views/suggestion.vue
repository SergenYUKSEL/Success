<template>
<div>
  <b-row>
    <b-col cols="12">
      <h2>
        Suggestion List
      </h2>
      
      <b-table striped hover :items="suggestions" :fields="fields">
        <template  slot="cell(actions)" slot-scope="row">
           <b-btn size="sm" @click.stop="details(row.item)">Details</b-btn>  
        </template>
        
      </b-table>
      
      <ul v-if="errors && errors.length">
        <li v-for="error of errors" v-bind:key="error.id">
          {{error.message}}
        </li>
      </ul>
    </b-col>
  </b-row>
</div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
const Address = require('../../config/AddressApi')
const token = sessionStorage.getItem('Token')
export default {
  name: 'ListSuggestion',
  data () {
    return {
      fields: [
        'questionName',
        'questionCategory',
        'actions'        
      ],
      suggestions: [],
      errors: []
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
      axios.get(`http://`+ Address.ip +`/api/suggestion`) // we get all the suggestions from the database
    .then(response => {
      this.suggestions = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    )
  },
  methods: {
    details (suggestion) {
      this.$router.push({
        name: 'ShowSuggestion',
        params: { id: suggestion._id }
      })
    }
  }
}
</script>