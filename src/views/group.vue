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
    axios.get(`http://`+ Address.ip +`/api/group`)
    .then(response => {
      this.groups = response.data
      
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    details (group) {
      this.$router.push({
        name: 'ShowGroup',
        params: { id: group._id }
      })
    }
  }
}
</script>