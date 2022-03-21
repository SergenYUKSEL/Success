<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Question
        <router-link :to="{ name: 'ShowQuestion', params: { id: question._id } }">(Show Question)</router-link>
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
          <b-form-input v-model.trim="question.questionCategory"></b-form-input>
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
        <b-button type="submit" variant="primary">Update</b-button>
        <b-button type="button" variant="success" @click="$router.go(-1)">Cancel</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
const Address = require('../../config/AddressApi')
const token = sessionStorage.getItem('Token')

export default {
  name: 'ModifyQuestion',
  data () {
    return {
      question: {}
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
      axios.get(`http://`+ Address.ip +`/api/question/` + this.$route.params.id)
    .then(response => {
      this.question = response.data
      
    })
    .catch(e => {
      this.errors.push(e)
    })
    )
  },

  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.patch(`http://`+ Address.ip +`/api/question/modify` + this.$route.params.id, this.question)
      .then(response => { 
        this.$router.push({
          name: 'ShowQuestion',
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