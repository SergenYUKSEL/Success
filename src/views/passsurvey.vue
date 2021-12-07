<template>
<!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
  <b-row>
    <b-col cols="12">
      <h3>
        <br>
        Bonjour  {{users[0].lastname}} {{users[0].firstname}} <br> <br>
        
        Veuillez choisir votre code pour participé au questionnaire
      </h3>
      <b-form @submit="onSubmit">
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Code">
          <b-form-select v-model="surveypass.surveyId" size="sm" class="mt-3">
            <option v-for="survey in surveys" :key="survey._id" :value="survey._id" > {{survey.number}}</option>
          </b-form-select>
        </b-form-group>
        <b-form-group v-if="surveypass.surveyId" id="fieldsetHorizontal"
                  horizontal
                  
                  :label-cols="4"
                  breakpoint="md"
                  label="Utilisateur">
          <b-form-select  v-model="surveypass.userId" size="sm" class="mt-3">
           <option v-for="user in users" :key="user._id" :value="user._id" > {{user.lastname + ' ' + user.firstname}}</option>
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
const token = sessionStorage.getItem('Token')
const userId = sessionStorage.getItem('User')

export default {
  
  name: 'CreateSurvey',
  data () {
    return {
      surveypass: {},
      surveys: [],
      categories: [],
      users: [],
    }
  },
  
  created() {
    axios.all(
      axios.defaults.headers.common['Authorization'] =  'Bearer' +' '+  token,
      axios.get(`http://`+ Address.ip +`/api/survey`)
    .then(response => {
      this.surveys = response.data
      
    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.get(`http://`+ Address.ip +`/api/auth/`, userId)
    .then(response => {
      this.users = response.data
      console.log(response.data)
    })
    )
    
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://`+ Address.ip +`/api/surveypass/create/`, this.surveypass)
      .then(response => {
        this.$router.push({
          name: 'ShowSurveyPass',
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