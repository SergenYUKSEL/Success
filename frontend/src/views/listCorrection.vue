<template>
<!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
<div>
  <b-row>
    <b-col cols="12">
      <h2>
        Participate in a Survey
        
        <b-link href="/passsurvey">(get started)</b-link>
      </h2><br><br>
      <b><label>Choose your Survey</label></b> <br>
      <select  v-model="pass">
          <option v-for="(surveypass,j) in surveypasses" :key="j" :value="surveypass._id" v-if="surveypasses[j].userId[0]._id === user">{{surveypass.surveyId[0].surveyName}}</option>
      </select>
      <div class="buttoncorrect">
      <router-link class="btn btn-primary" v-if="pass" :to="{name:'ShowSurveyCorrect', params: {id :pass}}">Show the survey</router-link>
      </div>
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
      '_id',
      'actions',
      ],
      surveypasses: [],
      errors: [],
      pass:'',
      user: sessionStorage.getItem('User'),
    }
  },
  created () {
    if(sessionStorage.getItem('Role') === 'corrector') { // if the user are corrector, we move him to home page
        this.$router.push({
          name: 'Corrector',
        })
      }
      else if (sessionStorage.getItem('Logged') != "true") { // if the user is not logged in, we move him to the login page
      this.$router.push({
      name: 'Login'
    })
    }
      
    axios.all(
      axios.defaults.headers.common['Authorization'] =  'Bearer' +' '+  token, // this is the authentication header to make requests from the api
      axios.get(`http://`+ Address.ip +`/api/surveypass`) // we get all the surveys already made from the database
    .then(response => {
      this.surveypasses = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }),
    )
  },
  methods: {
    details (surveypass) { // the details method sends the user to the ShowSurveyCorrect page, with all the information of the selected survey corrected
      this.$router.push({
        name: 'ShowSurveyCorrect',
        params: { id: surveypass._id }
      })
    }
  }
}
</script>
<style>
.buttoncorrect {
  margin-top: 20%;
}
</style>