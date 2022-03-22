<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Survey
        <b-link href="/survey">(Survey List)</b-link>
      </h2>
      <b-jumbotron>
        <template slot="header">
          
        </template>
        <template slot="lead">
          
            <span class="subtitle-survey">Name : </span>{{passsurvey}} <br>
            <span class="subtitle-survey">Code : </span>{{survey.number}} <br>
            <span class="subtitle-survey">Point : </span>{{survey.point}} <br>
            <span class="subtitle-survey">Time : </span>{{survey.time}} <br>
            <span class="subtitle-survey">Category : </span>{{survey.surveyCategory}} <br><br>
            <div v-for="questions in survey.question" :key="questions._id"> 
              
              <span class="subtitle-survey">Question  : </span>{{ questions.questionContent }} = {{questions.questionAnswer}} <br>
            </div>
    
        </template>
        <hr class="my-4">
        <b-btn variant="success" @click.stop="editsurvey(survey._id)">Edit</b-btn>
        <b-btn variant="danger" style="margin-left: 5vh;" @click.stop="deletesurvey(survey._id)">Delete</b-btn>
        <a style="color : #fff;margin-left: 5vh" type="button" v-on:click="Returnbehind()" class="btn btn-primary cold btn-cursor">Go back</a>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
const Address = require('../../config/AddressApi')
const token = sessionStorage.getItem('Token')
export default {
  name: 'ShowSurvey',
  data () {
    return {
      surveypass: []
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
      axios.get(`http://`+ Address.ip +`/api/survey/` + this.$route.params.id)
    .then(response => {
      this.survey = response.data
      console.log(response.data.question)
    })
    .catch(e => {
      this.errors.push(e)
    })
    )
  },
  methods: {
    editsurvey (surveyid) {
      this.$router.push({
        name: 'ModifySurvey',
        params: { id: surveyid }
      })
    },
    deletesurvey (surveyid) {
      axios.delete(`http://`+ Address.ip +`/api/survey/delete` + surveyid)
      .then((result) => {
        this.$router.push({
          name: 'survey'
        })
        return result;
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
  .btn-cursor {
  cursor: pointer;
}
</style>