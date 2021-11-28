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
           <option v-for="question in questions"  :key="question._id" v-if="survey.surveyCategory === question.questionCategory">{{question}}</option>
          </b-form-select>
        </b-form-group>
       

        <b-button type="submit" variant="primary">Save</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'
const Address = require('../../config/AddressApi')

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
    axios.all(
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
    }
  },
  
}
</script>
<style lang="fr">

</style>