<template>
    <div>
        <h1> Passage d'un questionnaire </h1>
     <b-form @submit="onSubmit">
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Catégorie">
          <b-form-select v-model="survey.number" size="sm" class="mt-3">
           <option v-for="survey in surveys"  :key="survey._id">{{survey.number}}</option>
          </b-form-select>
        </b-form-group>
        <b-button v-if="survey.number" type="submit" variant="primary">Save</b-button>
      </b-form>
    </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
const Address = require('../../config/AddressApi')
const token = sessionStorage.getItem('Token')
export default {
  name :"",
  data() {
    return {
     surveys: [],
     survey: {}
    }
  },
  created () {
    axios.all(
      axios.defaults.headers.common['Authorization'] =  'Bearer' +' '+  token,
      axios.get(`http://`+ Address.ip +`/api/survey`)
    .then(response => {
      this.surveys = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    )
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.get(`http://`+ Address.ip +`/api/survey/ ` )
      .then(response => {
        this.$router.push({
          name: 'PassSurveys',
          params: { id: response.data }
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  },
   
        }



</script>

<style>

</style>