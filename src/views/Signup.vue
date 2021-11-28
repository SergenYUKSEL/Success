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
                  label="Enter Email">
          <b-form-input id="email" v-model.trim="user.email"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Password">
          <b-form-input type="password" id="password" v-model.trim="user.password"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Lastname">
          <b-form-input type="text" id="lastname" v-model.trim="user.lastname"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Firstname">
          <b-form-input type="text" id="firstname" v-model.trim="user.firstname"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Group">
          <b-form-select id="group" v-model.trim="user.group" :options="options" size="sm" class="mt-3"></b-form-select>
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
      errors: []
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://`+ Address.ip +`/api/auth/signup/`, this.user)
      .then(response => {
        alert("Registered successfully")
        this.$router.push({
          name: 'Login'
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