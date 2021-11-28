<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Add Question
        <b-link href="/question">(Question List)</b-link>
      </h2>
      <b-form @submit="onSubmit">
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Nom">
          <b-form-input v-model.trim="question.questionName"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Contenue">
          <b-form-input v-model.trim="question.questionContent"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Catégorie">
          <b-form-select v-model="question.questionCategory" size="sm" class="mt-3">
           <option v-for="category in categories"  :key="category.name">{{category.name}}</option>
          </b-form-select>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Points">
          <b-form-input v-model.trim="question.questionPoint"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Réponse">
          <b-form-input v-model.trim="question.questionAnswer"></b-form-input>
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
  name: 'CreateQuestion',
  data () {
    return {
      question: {},
      categories: [],
      
      
    }
  },
  created() {
    axios.get(`http://`+ Address.ip +`/api/category`)
    .then(response => {
      this.categories = response.data
      
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://`+ Address.ip +`/api/question/create/`, this.question)
      .then(response => {
        this.$router.push({
          name: 'ShowQuestion',
          params: { id: response.data.id }
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    
    }
  }
}
</script>