<template>
<div>
  <b-row>
    <b-col cols="12">
      <h2>
        User List
        <b-link href="/Signup">(Add User)</b-link>
      </h2>
      
      <b-table striped hover :items="users" :fields="fields">
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
export default {
  name: 'ListUser',
  data () {
    return {
      fields: [
        'email',
        'lastname',
        'firstname',
        'group',
        'actions'        
      ],
      users: [],
      errors: []
    }
  },
  created () {
    axios.get(`http://`+ Address.ip +`/api/auth`)
    .then(response => {
      this.users = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    details (user) {
      this.$router.push({
        name: 'ShowUser',
        params: { id: user._id }
      })
    }
  }
}
</script>