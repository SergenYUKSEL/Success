<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Question
        <b-link href="/question">(Question List)</b-link>
      </h2>
      <b-jumbotron>
        <template slot="header">
          {{question.questionName}}
        </template>
        <template slot="lead">
          Nom de la question: {{question.questionName}}<br>
          Contenue: {{question.questionContent}}<br>
          Catégorie: {{question.questionCategory}}<br>
          Points: {{question.questionPoint}}<br>
          Réponse: {{question.questionAnswer}}<br>

        </template>
        <hr class="my-4">
        <p>
          Updated Date: {{question.updated_date}}
        </p>
        <b-btn variant="success" @click.stop="editquestion(question._id)">Edit</b-btn>
        <b-btn variant="danger" @click.stop="deletequestion(question._id)">Delete</b-btn>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'
const Address = require('../../config/AddressApi')
const token = sessionStorage.getItem('Token')

export default {
  name: 'ShowQuestion',
  data () {
    return {
      question: []
    }
  },
  created () {
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
    editquestion (questionid) {
      this.$router.push({
        name: 'ModifyQuestion',
        params: { id: questionid }
      })
    },
    deletequestion (questionid) {
      axios.delete(`http://`+ Address.ip +`/api/question/delete` + questionid)
      .then((result) => {
        this.$router.push({
          name: 'question'
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
</style>