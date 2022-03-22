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
                axios.all(
                    axios.defaults.headers.common['Authorization'] =  'Bearer' +' '+  token,
                    axios.get(`http://`+ Address.ip +`/api/survey`)
                        .then(response => {
                        this.surveys = response.data
                        })
                        .catch(e => {
                        this.errors.push(e)
                        }),
                    axios.get(`http://`+ Address.ip +`/api/surveycorrect`)
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