<template>
  <b-row class="justify-content-md-center">
    <b-col cols="6">
      <h2>Please Sign up</h2>
      <b-form @submit="onSubmit">
    <div v-for="users in user" :key="users._id">
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Group">
          <b-col sm="9">
            <b-form-select v-model="users.group" size="sm" class="mt-3">
              <option v-for="group in groups" :key="group._id" :value="group._id" > {{group.groupName}}</option>
            </b-form-select>
          </b-col>
        </b-form-group>
        <b-form-group  id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Role">
          <b-col sm="9">
            <b-form-select v-model.trim="users.role" :options="options" size="sm" class="mt-3">
            </b-form-select>
          </b-col>
        </b-form-group>
        <b-form-group  id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Email">
          <b-col sm="9">
            <b-form-input type="email" id="email" placeholder="Enter your email address ..."  v-model.trim="users.email"></b-form-input>
          </b-col>
        </b-form-group>
        <b-form-group  id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Password">
          <b-col sm="9">
            <b-form-input type="password" placeholder="Enter your password ..." id="password" v-model.trim="users.password"></b-form-input>
          </b-col>
        </b-form-group>
        <b-form-group  id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Lastname">
          <b-col sm="9">
            <b-form-input type="text" placeholder="Enter your lastname ..." id="lastname" v-model.trim="users.lastname"></b-form-input>
          </b-col>
        </b-form-group>
        <b-form-group  id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Firstname">
          <b-col sm="9">
            <b-form-input  type="text" placeholder="Enter your firstname ..." id="firstname" v-model.trim="users.firstname"></b-form-input>
          </b-col>
        </b-form-group>
        <b-button type="submit" variant="primary"> Update</b-button>
        <b-button type="button" variant="success" @click="$router.go(-1)">Cancel</b-button>
    </div>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
const Address = require('../../config/AddressApi')
const token = sessionStorage.getItem('Token')

export default {
  name: 'ModifyUser',
  data () {
    return {
      options: [
          { value: null, text: 'Please select an option' },
          { value: 'collaborator', text: 'Collaborateur' },
          { value: 'corrector', text: 'Correcteur' },
        ],
      user: {},
      groups: [],
    }
  },
  created () {
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
      axios.get(`http://`+ Address.ip +`/api/auth/` + this.$route.params.id)  // we get all the users from the database
    .then(response => {
      this.user = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.get(`http://`+ Address.ip +`/api/group`)  // we get all the groups from the database
    .then(response => {
      this.groups = response.data
      
    })
    .catch(e => {
      this.errors.push(e)
    }))
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.patch(`http://`+ Address.ip +`/api/auth/modify` + this.$route.params.id, this.user, { params: { // we get the data entered for the modification of a user, then we insert the data in the users collection
        firstname
      }})
      .then(response => { 
        this.$router.push({
          name: 'ShowUser',
          params: { id: this.$route.params.id },
        })
        alert("Form was submitted successfully");
        return response
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>