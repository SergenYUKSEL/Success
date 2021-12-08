<template>
<!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
    <form-wizard @onComplete="onComplete">
        <tab-content title="Choix du questionnaire" :selected="true">
            <div class="form-group">
                <label for="fullName">Code</label>
                <select type="text" class="form-control" placeholder="Enter your name" v-model="surveypass.surveyId">
                  <option v-for="survey in surveys" :key="survey._id" :value="survey._id" > {{survey.number}}</option>
                </select>
            </div>
            <div class="form-group">
                <label for=""></label>
                <select class="form-control" v-model="surveypass.userId">
                  <option v-for="user in users" :key="user._id" :value="user._id" > {{user.lastname + ' ' + user.firstname}}</option>
                </select>
            </div>
        </tab-content>
        <tab-content title="Réponse aux questionnaires"> 
            <div class="form-group" v-for="survey in surveys" :key="survey.id" v-if="surveypass.surveyId === survey._id">
              <span v-for="(question, i) in survey.question" :key="i">
                  <label  >{{question.questionContent}}</label>
                  <input type="text" v-model="surveypass.reponse">
                  <!-- il va falloir désynchronisé le v-model pour pouvoir entré des valeurs différents avec plusieurs input en ayant le même v-model -->
              </span>
            </div>
            
        </tab-content>
        <button v-on:click="onComplete"> Envoyer</button>
    </form-wizard>
</template>

<script>
import {FormWizard, TabContent} from 'vue-step-wizard'
import "vue-step-wizard/dist/vue-step-wizard.css";
import axios from 'axios'
const Address = require('../../config/AddressApi')
const token = sessionStorage.getItem('Token')
const userId = sessionStorage.getItem('User')


export default {
    name: 'BasicStepperForm',
    components: {
        FormWizard, TabContent
    },
    data(){
        return {
            surveypass: {},
            surveys: [],
            categories: [],
            users: [],

        }
    },
    created() {
      if(sessionStorage.getItem('Role') === 'corrector') {
        this.$router.push({
          name: 'Corrector',
        })
      }
      
    axios.all(
      axios.defaults.headers.common['Authorization'] =  'Bearer' +' '+  token,
      axios.get(`http://`+ Address.ip +`/api/survey`)
    .then(response => {
      this.surveys = response.data
      
    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.get(`http://`+ Address.ip +`/api/auth/`+ userId)
    .then(response => {
      this.users = response.data
      console.log(response.data)
    })
    )
    
  },
  methods: {
    change(index, val) {
      this.dataArray[0][index] = val;
      console.log(index + ': ' + val);
    },
    onComplete(evt) {
      evt.preventDefault()
      axios.post(`http://`+ Address.ip +`/api/surveypass/create/`, this.surveypass)
      .then(response => {
        console.log(response)
        this.$router.push({
          name: 'Collaborator',
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  },
  
}

</script>