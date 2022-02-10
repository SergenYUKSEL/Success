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
      fields: [
        'name',
        'description',
        'actions'        
      ],
      categories: [],
      errors: []
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
    details (category) {
      this.$router.push({
        name: 'ShowCategory',
        params: { id: category._id }
      })
    }
  }
}
</script>