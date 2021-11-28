<template>
<!-- eslint-disable -->
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Survey
        <router-link :to="{ name: 'ShowSurvey', params: { id: survey._id } }">(Show Survey)</router-link>
      </h2>
      <b-form @submit="onSubmit">
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Code secret">
          <b-form-input v-model.trim="survey.number"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Points">
          <b-form-input v-model.trim="survey.point"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Temps">
          <b-form-input v-model.trim="survey.time"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Nom du questionnaire">
          <b-form-input v-model.trim="survey.surveyName"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Catégorie">
          <b-form-select v-model="survey.surveyCategory" size="sm" class="mt-3">
           <option v-for="category in categories"  :key="category._id">{{category.name}}</option>
          </b-form-select>
        </b-form-group>
        <b-form-group v-if="survey.surveyCategory" id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Question">
          <b-form-select  v-model="survey.question" size="sm" class="mt-3" multiple>
           <option v-for="question in questions"  :key="question._id" v-if="survey.surveyCategory === question.questionCategory" >{{question}}</option>
          </b-form-select>
        </b-form-group>
        <b-button type="submit" variant="primary">Update</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
const Address = require('../../config/AddressApi')

export default {
  name: 'ModifySurvey',
  data () {
    return {
      survey: {},
      categories : [],
      questions: []

    }
  },
  created () {
    axios.all(
      axios.get(`http://`+ Address.ip +`/api/survey/` + this.$route.params.id)
    .then(response => {
      this.survey = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.get(`http://`+ Address.ip +`/api/question`)
    .then(response => {
      this.questions = response.data
      
    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.get(`http://`+ Address.ip +`/api/category`)
    .then(response => {
      this.categories = response.data
      console.log(response.data)
    }))
    
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.put(`http://`+ Address.ip +`/api/survey/modify` + this.$route.params.id, this.survey)
      .then(response => { 
        this.$router.push({
          name: 'ShowSurvey',
          params: { id: this.$route.params.id },
        })
        alert("Form was submitted successfully");
        return response
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>