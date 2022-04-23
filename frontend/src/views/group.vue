<template>
<div>
  <b-row>
    <b-col cols="12">
      <h2>
        Group List
        <b-link href="/CreateGroup">(Add Group)</b-link>
      </h2>
      
      <b-table striped hover :items="groups" :fields="fields">
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
  name: 'ListGroup',
  data () {
    return {
      fields: [
        'groupName',
        'actions'        
      ],
      groups: [],
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
      axios.get(`http://`+ Address.ip +`/api/group`) // we get all the groups from the database
    .then(response => {
      this.groups = response.data
      
    })
    .catch(e => {
      this.errors.push(e)
    })
    )
  },
  methods: {
    details (group) {  // the details method sends the user to the ShowGroup page, with all the information of the selected group
      this.$router.push({
        name: 'ShowGroup',
        params: { id: group._id }
      })
    }
  }
}
</script>