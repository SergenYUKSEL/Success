<template>
<div>
  <b-row>
    <b-col cols="12">
      <h2>
        Category List
        <b-link href="/CreateCategory">(Add Category)</b-link>
      </h2>
      
      <b-table striped hover :items="categories" :fields="fields">
        <template  slot="cell(actions)" slot-scope="row">
           <b-btn size="sm" @click.stop="details(row.item)">Details</b-btn>  
        </template>
      </b-table>
      <ul v-if="errors && errors.length">
        <li v-for="error of errors" v-bind:key="error._id">
          {{error.message}}
        </li>
      </ul>
    </b-col>
  </b-row>
</div>
</template>

<script>
/* eslint-disable */
const Address = require('../../config/AddressApi')
import axios from 'axios'
const token = sessionStorage.getItem('Token')
export default {
  name: 'ListCategory',
  data () {
    return {
      fields: [  // the fields allows to display the different data we select in our table from the collection
        'name',
        'description',
        'actions'        
      ],
      categories: [],
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
    details (category) { // the details method sends the user to the ShowCategory page, with all the information of the selected category
      this.$router.push({
        name: 'ShowCategory',
        params: { id: category._id }
      })
    }
  }
}
</script>