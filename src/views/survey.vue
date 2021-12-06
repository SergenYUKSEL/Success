<template>
<div>
  <b-row>
    <b-col cols="12">
      <h2>
        Survey List
        <b-link href="/CreateSurvey">(Add Survey)</b-link>
      </h2>
      
      <b-table striped hover :items="surveys" :fields="fields">
        <template  slot="cell(actions)" slot-scope="row">
           <b-btn size="sm" @click.stop="details(row.item)">Details</b-btn>  
        </template>
      </b-table>
      <ul v-if="errors && errors.length">
        <li v-for="error of errors" v-bind:key="error">
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
  name: 'ListSurvey',
  data () {
    return {
      fields: [
        'number',
        'surveyCategory',
        'point',
        'time',
        'surveyName',
        'actions'        
      ],
      surveys: [],
      errors: []
    }
  },
  created () {
    axios.all(
      axios.defaults.headers.common['Authorization'] =  'Bearer' +' '+  token,
      axios.get(`http://`+ Address.ip +`/api/survey`)
    .then(response => {
      this.surveys = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    )
  },
  methods: {
    details (survey) {
      this.$router.push({
        name: 'ShowSurvey',
        params: { id: survey._id }
      })
    }
  }
}
</script>