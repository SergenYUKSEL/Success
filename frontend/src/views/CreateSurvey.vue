<template>
<!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
  <b-row>
    <b-col cols="12">
      <h2>
        Add Survey
        <b-link href="/survey">(Survey List)</b-link>
      </h2>
      <b-form @submit="onSubmit">
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Secret Code">
          <b-col sm="9">
            <b-form-input type="text" placeholder="Enter the survey code" v-model.trim="survey.number"></b-form-input>
          </b-col>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Points">
          <b-col sm="9">
            <b-form-input type="number" placeholder="Enter the survey points..." v-model.trim="survey.point"></b-form-input>
          </b-col>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Time">
          <b-col sm="9">
            <b-form-input type="number" placeholder="Enter the survey time..." v-model.trim="survey.time"></b-form-input>
          </b-col>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Name">
          <b-col sm="9">
            <b-form-input type="text" placeholder="Enter the survey name..." v-model.trim="survey.surveyName"></b-form-input>
          </b-col>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Category">
          <b-col sm="9">
            <b-form-select v-model="survey.surveyCategory" size="sm" class="mt-3">
              <option v-for="category in categories"  :key="category._id">{{category.name}}</option>
            </b-form-select>
          </b-col>
        </b-form-group>
        <b-form-group v-if="survey.surveyCategory" id="fieldsetHorizontal"
                  horizontal
                  
                  :label-cols="4"
                  breakpoint="md"
                  label="Question">
          <b-col sm="9">
            <b-form-select  v-model="survey.question" size="sm" class="mt-3" multiple>
              <option v-for="question in questions"  :key="question._id" v-if="survey.surveyCategory === question.questionCategory">{{question}}</option>
            </b-form-select>
          </b-col>
        </b-form-group>
       

        <b-button type="submit" variant="primary">Save</b-button>
        <a style="color : #fff;margin-left: 5vh" type="button" v-on:click="Returnbehind()" class="btn btn-primary cold">Go back</a>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'
const Address = require('../../config/AddressApi')
const token = sessionStorage.getItem('Token')

export default {
  
  name: 'CreateSurvey',
  data () {
    return {
      survey: {},
      questions: [],
      categories: []
    }
  },
  
  created() {
    if(sessionStorage.getItem('Role') === 'collaborator') {
        this.$router.push({
          name: 'Collaborator',
        })
      }
      
    axios.all(
      axios.defaults.headers.common['Authorization'] =  'Bearer' +' '+  token,
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
    })
    )
    
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://`+ Address.ip +`/api/survey/create/`, this.survey)
      .then(response => {
        this.$router.push({
          name: 'ShowSurvey',
          params: { id: response.data.id }
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    Returnbehind() {
        this.$router.push({
          name: 'Corrector',
        })
      }
  },
  
}
</script>
<style lang="fr">

</style>