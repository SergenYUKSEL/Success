<template>
<!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
    <b-container class="bv-example-row">
        <h1>Statistics of the web application on the collaborator side</h1> <br><br>
        <b-row>
            <b-col>Scores obtained :</b-col>
        </b-row>
        
        <hr class="my-4">
        <b-row v-for="(surveycorrect,i) in surveycorrected" :key="i">
            <b-col v-for="survey in surveys" :key="survey._id" v-if="surveycorrect.surveypassId[0].userId[0] === user && surveycorrect.surveypassId[0].surveyId[0] === survey._id">{{surveycorrect.note}}/{{survey.point}} on the {{survey.surveyName}} survey, which in the {{survey.surveyCategory}} category.</b-col>
        </b-row>
    </b-container>
</template>

<script>

import axios from 'axios'
const Address = require('../../config/AddressApi')
const token = sessionStorage.getItem('Token')

export default {
        data() {
            return {
                surveys: [],
                surveycorrected: [],
                user: sessionStorage.getItem('User')
                
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
                    axios.get(`http://`+ Address.ip +`/api/survey`)  // we get all the surveys from the database
                        .then(response => {
                        this.surveys = response.data
                        })
                        .catch(e => {
                        this.errors.push(e)
                        }),
                    axios.get(`http://`+ Address.ip +`/api/surveycorrect`)  // we get all the survey correct from the database
                        .then(response => {
                        this.surveycorrected = response.data
                        })
                        .catch(e => {
                        this.errors.push(e)
                        }),
                        )
        },
        methods: {
            
        },
}
</script>

<style>

</style>