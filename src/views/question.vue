<template>
<div>
  <b-row>
    <b-col cols="12">
      <h2>
        Question List
        <b-link href="/CreateQuestion">(Add Question)</b-link>
      </h2>
      
      <b-table striped hover :items="questions" :fields="fields">
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
  name: 'ListQuestion',
  data () {
    return {
      fields: [
        'questionName',
        'questionCategory',
        'questionPoint',
        'actions'        
      ],
      questions: [],
      errors: []
    }
  },
  created () {
    axios.get(`http://`+ Address.ip +`/api/question`)
    .then(response => {
      this.questions = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    details (question) {
      this.$router.push({
        name: 'ShowQuestion',
        params: { id: question._id }
      })
    }
  }
}
</script>