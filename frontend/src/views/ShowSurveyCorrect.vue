<template>
<!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
    <b-row>
    <b-col cols="12">
      <h2>
        La correction de votre questionnaire
      </h2>
      <b-jumbotron>
        <template slot="header">
        </template>
        <template slot="lead">
      <div v-for="surveypass in surveypasses" :key="surveypass._id" v-if="surveypass._id === thesurveyid">
          Nom du questionnaire : {{surveypass.surveyId[0].surveyName}}<br> <br>
          Nombre de questions : {{surveypass.surveyId[0].question.length}} <br>
          <hr class="my-4">
          <div v-for="(question,q) in surveypass.surveyId[0].question" :key="q">
            Question n°{{q+1}} ({{question.questionPoint}}pts) : {{question.questionContent}} <br>
            Résultat de l'élève : {{surveypass.reponse[q]}} <br>
            Resultat Attendu : {{question.questionAnswer}} <br>
            <hr class="my-4">
          </div>
          <div v-for="(surveycorrect, s) in surveycorrected" v-if="surveycorrect.surveypassId[0]._id === thesurveyid" :key="s._id">
            Note : {{surveycorrect.note}} / {{surveypass.surveyId[0].point}}
            
          </div>
          Si votre note n'apparait pas, alors elle n'est pas encore corrigé. <br>
          <br>
          
          <a type="button" v-on:click="Returnbehind()" class="btn btn-primary cold">Go back</a>
      </div>
        </template>
        
      </b-jumbotron>
    </b-col>
  </b-row>
    
</template>

<script>
    import axios from 'axios'
    const Address = require('../../config/AddressApi')
    const token = sessionStorage.getItem('Token')
    export default {
    name: 'ShowSurvey',
    data () {
        return {
        thesurveyid:  this.$route.params.id,
        surveypasses:[],
        surveycorrected: [],
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
        axios.get(`http://`+ Address.ip +`/api/surveypass/` + this.$route.params.id)
    .then(response => {
      this.surveypasses = response.data
      console.log(response.data)
    }),
    axios.get(`http://`+ Address.ip +`/api/surveycorrect/`)
    .then(response => {
      this.surveycorrected = response.data
      console.log(response.data)
    }),
        )
    },
    methods: {
      Returnbehind() {
        this.$router.push({
          name: 'listCorrection',
        })
      }
    },
}
</script>
<style >
  .cold {
    color:white !important
  }
  a {
    color: black;
  }
  a:hover{
    color: gray;
  }
</style>