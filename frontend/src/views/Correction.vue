<template>
<!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
    <form-wizard @onComplete="onComplete">
        <tab-content title="Choose the collaborator" :selected="true">
           <div class="form-group">
                <label for="fullName">Group</label>
                <select type="text" class="form-control" placeholder="" v-model="groupe">
                  <option v-for="group in groups" :key="group._id" :value="group._id" > {{group.groupName}}</option>
                </select>
            </div>
                <div class="form-group" v-if="groupe">    
                    <label for="">Collaborator</label>
                    <select class="form-control" v-model="users.name " >
                        <option v-for="user in users" :key="user._id" :value="user._id" v-if="user.group[0]._id === groupe && user.role == 'collaborator'"> {{user.lastname + ' ' + user.firstname}}</option>
                    </select>
                </div>
        </tab-content>
        <tab-content title="Choose the Survey"> 
            <div class="form-group">    
                    <label for="">Survey</label>
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
        <tab-content title="Enter the note">
            <div class="form-group">
                <label>Collaborator's note</label>
                <input class="m-2" type="number" name="note" v-model="surveycorrect.note">
            </div>
             <button class="btn btn-primary btn-send" v-on:click="onComplete">SEND</button>
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
    components: { // we import the components FormWizard and TabContent
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
    if(sessionStorage.getItem('Role') === 'collaborator') { // if the user are collaborator, we move him to home page
        this.$router.push({
          name: 'Collaborator',
        })
      }
      else if (sessionStorage.getItem('Logged') != "true") { // if the user is not logged in, we move him to the login page
      this.$router.push({
      name: 'Login'
    })
    }
    axios.all(
         axios.defaults.headers.common['Authorization'] =  'Bearer' +' '+  token, // this is the authentication header to make requests from the api
         axios.get(`http://`+ Address.ip +`/api/auth/`) // we get all the users from the database
    .then(response => {
      this.users = response.data
    }),
    axios.get(`http://`+ Address.ip +`/api/group/`) // we get all the groups from the database
    .then(response => {
      this.groups = response.data
    }),
    axios.get(`http://`+ Address.ip +`/api/surveypass/`) // we get all the surveys already done
    .then(response => {
      this.surveypasses = response.data
    }),
    
    )
   
},
methods: {
    onComplete(evt) {
      evt.preventDefault()
      axios.post(`http://`+ Address.ip +`/api/surveycorrect/create/`, this.surveycorrect) // we get the information entered for the correction, then we insert the data in the surveycorrect collection
      .then(response => { // eslint-disable-line no-unused-vars

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
.step-button-submit {
  visibility: hidden;
  /* disable submit button by wizard */
}
.step-button-previous, .step-button-next {
  cursor: pointer;
}
.btn-send {
  cursor: pointer;
  font-weight: bold;
}
</style>