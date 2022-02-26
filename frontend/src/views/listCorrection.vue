<template>
<!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
<div>
  <b-row>
    <b-col cols="12">
      <h2>
        Participer à un questionnaire
        
        <b-link href="/passsurvey">(commencer)</b-link>
      </h2><br><br>
      <b><label>Choisir votre questionnaire : </label></b> <br>
      <select  v-model="pass">
          <option v-for="(surveypass,j) in surveypasses" :key="j" :value="surveypass._id" v-if="surveypasses[j].userId[0]._id === user">{{surveypass.surveyId[0].surveyName}}</option>
      </select>
      <div class="buttoncorrect">
      <router-link class="btn btn-primary" v-if="pass" :to="{name:'ShowSurveyCorrect', params: {id :pass}}">Afficher le questionnaire</router-link>
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
    if(sessionStorage.getItem('Role') === 'corrector') {
        this.$router.push({
          name: 'Corrector',
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
    }),
    )
  },
  methods: {
    details (surveypass) {
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