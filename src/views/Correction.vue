<template>
<!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
    <form-wizard @onComplete="onComplete">
        <tab-content title="Choisir le collaborateur" :selected="true">
           <div class="form-group">
                <label for="fullName">Groupe</label>
                <select type="text" class="form-control" placeholder="" v-model="groupe">
                  <option v-for="group in groups" :key="group._id" :value="group._id" > {{group.groupName}}</option>
                </select>
            </div>
                <div class="form-group" v-if="groupe">    
                    <label for="">Collaborateur</label>
                    <select class="form-control" v-model="users.name " >
                        <option v-for="user in users" :key="user._id" :value="user._id" v-if="user.group[0]._id === groupe && user.role == 'collaborator'"> {{user.lastname + ' ' + user.firstname}}</option>
                    </select>
                </div>
        </tab-content>
        <tab-content title="Choisir le questionnaire"> 
            <div class="form-group">    
                    <label for="">Questionnaire</label>
                    <select class="form-control" v-model="surveycorrect.surveypassId " >
                        <option v-for="surveypass in surveypasses" :key="surveypass._id" :value="surveypass._id" v-if="surveypass.userId[0]._id === users.name">{{surveypass.surveyId[0].surveyName}}</option>
                    </select>
                </div>
            <div class="form-group" v-for="surveypass in surveypasses" :key="surveypass._id" v-if="surveypass._id === surveycorrect.surveypassId">
                <span v-for="(listquestion, i) in surveypass.surveyId[0].question" :key="i.id">    
                    <b><label for="">Question n°{{i+1}} ({{listquestion.questionPoint}}pts) : </label></b> <br>
                    <label for=""><b>{{listquestion.questionContent}}</b> = {{surveypass.reponse[i]}}</label> <br><br>
                </span><br>
                <b>Total points :</b> {{surveypass.surveyId[0].point}} pts
            </div>
        </tab-content>
        <tab-content title="Saisir la note">
            <div class="form-group">
                <label>Note de l'élève</label>
                <input type="number" name="note" v-model="surveycorrect.note">
            </div>
             <button v-on:click="onComplete"> Envoyer</button>
        </tab-content>
       
    </form-wizard>
</template>

<script>
import {FormWizard, TabContent} from 'vue-step-wizard'
import "vue-step-wizard/dist/vue-step-wizard.css";
import axios from 'axios';
import Address from '../../config/AddressApi'
const token = sessionStorage.getItem('Token')
export default {
    components: {
        FormWizard, TabContent
    },
    data() {
        return {
            surveycorrect: {},
            users:[],
            groups:[],
            surveypasses:[],
            surveys: [],
            groupe:''
        }
    },
    created() {
    if(sessionStorage.getItem('Role') === 'collaborator') {
        this.$router.push({
          name: 'Collaborator',
        })
      }
      else if (sessionStorage.getItem('Logged') != "true") {
      this.$router.push({
      name: 'Login'
    })
    }
    axios.all(
         axios.defaults.headers.common['Authorization'] =  'Bearer' +' '+  token,
         axios.get(`http://`+ Address.ip +`/api/auth/`)
    .then(response => {
      this.users = response.data
      console.log(response.data)
    }),
    axios.get(`http://`+ Address.ip +`/api/group/`)
    .then(response => {
      this.groups = response.data
      console.log(response.data)
    }),
    axios.get(`http://`+ Address.ip +`/api/surveypass/`)
    .then(response => {
      this.surveypasses = response.data
      console.log(response.data)
    }),
    
    )
   
},
methods: {
    onComplete(evt) {
      evt.preventDefault()
      axios.post(`http://`+ Address.ip +`/api/surveycorrect/create/`, this.surveycorrect)
      .then(response => {
        console.log(response)
        this.$router.push({
          name: 'Corrector',
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