<template>
<!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
    <b-row>
    <b-col cols="12">
      <h2 class="title-correct">
        The correction of your survey
      </h2>
      <b-jumbotron>
        <template slot="header">
        </template>
        <template slot="lead">
      <div v-for="surveypass in surveypasses" :key="surveypass._id" v-if="surveypass._id === thesurveyid">
          <span class="subtitle-survey">Name : </span>{{surveypass.surveyId[0].surveyName}}<br> <br>
          <span class="subtitle-survey">Number of questions : </span>{{surveypass.surveyId[0].question.length}} <br>
          <hr class="my-4">
          <div v-for="(question,q) in surveypass.surveyId[0].question" :key="q">
             <span class="subtitle-survey">Question n°{{q+1}} ({{question.questionPoint}}pts) : </span>{{question.questionContent}} <br>
             <span class="subtitle-survey">Collaborator's response : </span>{{surveypass.reponse[q]}} <br>
             <span class="subtitle-survey">Answer expected : </span>{{question.questionAnswer}} <br>
            <hr class="my-4">
          </div>
          <div v-for="(surveycorrect, s) in surveycorrected" v-if="surveycorrect.surveypassId[0]._id === thesurveyid" :key="s._id">
             <span class="subtitle-survey">Note : </span>{{surveycorrect.note}} / {{surveypass.surveyId[0].point}}
            
          </div>
           <span class="subtitle-survey">If your note does not appear, then it is not yet corrected.</span> <br>
          <br>
          
          <a type="button" v-on:click="Returnbehind()" class="btn btn-primary cold btn-cursor">Go back</a>
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
        axios.get(`http://`+ Address.ip +`/api/surveypass/` + this.$route.params.id) // we get all the surveypasses from the database
    .then(response => {
      this.surveypasses = response.data
      console.log(response.data)
    }),
    axios.get(`http://`+ Address.ip +`/api/surveycorrect/`) // we get all the surveycorrects from the database
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
  .subtitle-survey {
    font-weight: bold;
    font-size: 22px;
  }
  .title-correct {
    font-weight: bold;
  }
  .btn-cursor {
  cursor: pointer;
}
</style>