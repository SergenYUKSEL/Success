<template>
<!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
    <form-wizard @onComplete="onComplete">
        <tab-content title="Choice of Survey" :selected="true">
            <div class="form-group">
                <label for="fullName">Code</label>
                <select type="text" class="form-control" placeholder="Enter your name" v-model="surveypass.surveyId">
                  <option v-for="survey in surveys" :key="survey._id" :value="survey._id" > {{survey.number}}</option>
                </select>
            </div>
            <div class="form-group">
                <input class="form-control " type="hidden" v-model="surveypass.userId" >
            </div>
        </tab-content>
        <tab-content title="Answer to the Survey"> 
            <div class="form-group" v-for="survey in surveys" :key="survey.id" v-if="surveypass.surveyId === survey._id">
              <Questions :questions="survey.question" :reponse="survey.reponse"  v-on="surveypass.reponse = survey.reponse" v-model="surveypass.reponse"></Questions>
            </div>
            <button class="btn btn-primary btn-send" v-on:click="onComplete">SEND</button>
        </tab-content>
    </form-wizard>
</template>

<script>
import {FormWizard, TabContent} from 'vue-step-wizard'
import "vue-step-wizard/dist/vue-step-wizard.css";
import Questions from '../components/Questions.vue'
import axios from 'axios'
const Address = require('../../config/AddressApi')
const token = sessionStorage.getItem('Token')
const userId = sessionStorage.getItem('User')


export default {
  /* eslint-disable */
    
    name: 'BasicStepperForm',
    components: {
        FormWizard, TabContent, Questions
    },
    data(){
        return {
            surveypass: {
              userId: userId,
            },
            surveys: [],
            categories: [],
            users: [],
            reponse: [],

            

        }
    },
    created() {
      if(sessionStorage.getItem('Role') === 'corrector') { // if the user are corrector, we move him to home page
        this.$router.push({
          name: 'Corrector',
        })
      }
      else if (sessionStorage.getItem('Logged') != "true") { // if the user is not logged in, we move him to the login page
      this.$router.push({
      name: 'Login'
    })
    }
      
    axios.all(
      axios.defaults.headers.common['Authorization'] =  'Bearer' +' '+  token, // this is the authentication header to make requests from the api
      axios.get(`http://`+ Address.ip +`/api/survey`) // we get all the surveys from the database
    .then(response => {
      this.surveys = response.data
      
    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.get(`http://`+ Address.ip +`/api/auth/`+ userId) // we get all the users from the database
    .then(response => {
      this.users = response.data
      console.log(response.data)
    })
    )
    
  },
  methods: {
    onComplete(evt) {
      evt.preventDefault()
      axios.post(`http://`+ Address.ip +`/api/surveypass/create/`, this.surveypass) // we get the data entered for the creation of a surveypass, then we insert the data in the surveypasses collection
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

<style>
.step-button-submit {
  visibility: hidden;
}
.step-button-previous, .step-button-next {
  cursor: pointer;
}
.btn-send {
  cursor: pointer;
  font-weight: bold;
}
.no-visible {
  visibility: hidden;
}
</style>