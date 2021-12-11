<template>
<div>
  <b-row>
    <b-col cols="12">
      <h2>
        Questionnaire effectué List
        <b-link href="/passsurvey">(Add Questionnaire effectué)</b-link>
      </h2>
      
      <b-table striped hover :items="surveypasses" :fields="fields">
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
  name: 'ListSurveyPass',
  data () {
    return {
      fields: [
        'userId[0].lastname',
        'userId[0].firstname',
        'surveyId[0].surveyName',
        'surveyId[0].surveyCategory',
        'actions'        
      ],
      surveypasses: [],
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
      axios.get(`http://`+ Address.ip +`/api/surveypass`)
    .then(response => {
      this.surveypasses = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    )
  },
  methods: {
    details (surveypass) {
      this.$router.push({
        name: 'ShowSurveyPass',
        params: { id: surveypass._id }
      })
    }
  }
}
</script>