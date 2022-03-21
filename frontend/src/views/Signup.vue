<template>
  <b-row class="justify-content-md-center">
    <b-col cols="6">
      <h2>Please Sign up</h2>
      <div v-if="errors && errors.length">
        <div v-for="error of errors" v-bind:key="error.id">
          <b-alert show>{{error.message}}</b-alert>
        </div>
      </div>
      <b-form @submit="onSubmit">
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Group">
          <b-col sm="9">
            <b-form-select v-model="user.group" size="sm" class="mt-3">
              <option v-for="group in groups" :key="group._id" :value="group._id" > {{group.groupName}}</option>
            </b-form-select>
          </b-col>
        </b-form-group>
        <b-form-group v-if="user.group" id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Role">
          <b-col sm="9">
            <b-form-select v-model.trim="user.role" :options="options" size="sm" class="mt-3">
            </b-form-select>
          </b-col>
        </b-form-group>
        <b-form-group v-if="user.group" id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Email">
          <b-col sm="9">
            <b-form-input id="email" placeholder="Enter your email address..." v-model.trim="user.email"></b-form-input>
          </b-col>
        </b-form-group>
        <b-form-group v-if="user.group" id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Password">
          <b-col sm="9">
            <b-form-input type="password" placeholder="Enter your password..." id="password" v-model.trim="user.password"></b-form-input>
          </b-col>
        </b-form-group>
        <b-form-group v-if="user.group" id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Lastname">
          <b-col sm="9">
            <b-form-input type="text" placeholder="Enter your lastname ..." id="lastname" v-model.trim="user.lastname"></b-form-input>
          </b-col>
        </b-form-group>
        <b-form-group v-if="user.group" id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Firstname">
          <b-col sm="9">
            <b-form-input  type="text" placeholder="Enter your firstname ..." id="firstname" v-model.trim="user.firstname"></b-form-input>
          </b-col>
        </b-form-group>
        <b-button type="submit" variant="primary">Sign Up</b-button>
        <b-button type="button" variant="success" @click="$router.go(-1)">Cancel</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'
const Address = require('../../config/AddressApi')
const token = sessionStorage.getItem('Token')
/* eslint-disable */
export default {
  name: 'Signup',
  data () {
    return {
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'collaborator', text: 'Collaborateur' },
          { value: 'corrector', text: 'Correcteur' },
        ],
      user: {},
      groups: [],
      errors: []
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
      axios.get(`http://`+ Address.ip +`/api/group/`)
    .then(response => {
      this.groups = response.data
      console.log(this.groups)
      
    })
    .catch(e => {
      this.errors.push(e)
    })
    )
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      
        axios.post(`http://`+ Address.ip +`/api/auth/signup/`, this.user)
      .then(response => {
        alert("Registered successfully")
        this.$router.push({
          name: 'Corrector'
        })
        return response
      })
      .catch(e => {
        console.log(e)
        this.errors.push(e)
      })
      
    },
  }
}
</script>