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
          <span class="subtitle-survey">Name: </span>{{question.questionName}}<br>
          <span class="subtitle-survey">Content: </span>{{question.questionContent}}<br>
          <span class="subtitle-survey">Category: </span>{{question.questionCategory}}<br>
          <span class="subtitle-survey">Point: </span>{{question.questionPoint}}<br>
          <span class="subtitle-survey">Answer: </span>{{question.questionAnswer}}<br>

        </template>
        <hr class="my-4">
        <p>
          Updated Date: {{question.updated_date}}
        </p>
        <b-btn variant="success" @click.stop="editquestion(question._id)">Edit</b-btn>
        <b-btn variant="danger" style="margin-left: 5vh;" @click.stop="deletequestion(question._id)">Delete</b-btn>
        <a style="color : #fff;margin-left: 5vh" type="button" v-on:click="Returnbehind()" class="btn btn-primary cold">Go back</a>
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
    },
     Returnbehind() {
        this.$router.push({
          name: 'question',
        })
      }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
  .subtitle-survey {
    font-weight: bold;
  }
</style>