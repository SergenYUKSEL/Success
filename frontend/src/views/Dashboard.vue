<template>
    <b-container class="bv-example-row">
        <h1>Statistics of the web application on the Corrector side</h1> <br><br>
        <b-row>
            <b-col>Surveys</b-col>
            <b-col>Questions</b-col>
            <b-col>Categories</b-col>
            <b-col>Survey already completed</b-col>
            <b-col>Users</b-col>
            <b-col>Groups</b-col>

        </b-row>
        <hr class="my-4">
        <b-row>
            <b-col>{{surveys.length}}</b-col>
            <b-col>{{questions.length}}</b-col>
            <b-col>{{categories.length}}</b-col>
            <b-col>{{surveypasses.length}}</b-col>
            <b-col>{{users.length}}</b-col>
            <b-col>{{groups.length}}</b-col>
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
                questions: [],
                categories: [],
                groups: [],
                users: [],
                surveypasses: [],
                
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
                    axios.get(`http://`+ Address.ip +`/api/survey`) // we get all the surveys from the database
                        .then(response => {
                        this.surveys = response.data
                        })
                        .catch(e => {
                        this.errors.push(e)
                        }),
                    axios.get(`http://`+ Address.ip +`/api/question`) // we get all the questions from the database
                        .then(response => {
                        this.questions = response.data
                        })
                        .catch(e => {
                        this.errors.push(e)
                        }),
                    axios.get(`http://`+ Address.ip +`/api/category`) // we get all the categories from the database
                        .then(response => {
                        this.categories = response.data
                        })
                        .catch(e => {
                        this.errors.push(e)
                        }),
                    axios.get(`http://`+ Address.ip +`/api/group`) // we get all the groups from the database
                        .then(response => {
                        this.groups = response.data
                        })
                        .catch(e => {
                        this.errors.push(e)
                        }),
                    axios.get(`http://`+ Address.ip +`/api/auth`) // we get all the users from the database
                        .then(response => {
                        this.users = response.data
                        })
                        .catch(e => {
                        this.errors.push(e)
                        }),
                    axios.get(`http://`+ Address.ip +`/api/surveypass`) // we get all the surveys already made from the database
                        .then(response => {
                        this.surveypasses = response.data
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