<template>
  <b-row class="justify-content-md-center">
    <b-col cols="6">
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
                  label="Email">
          <b-col sm="9">
            <b-form-input type="email" placeholder="Enter your email address..." id="email" v-model.trim="user.email"></b-form-input>
          </b-col>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Password">
          <b-col sm="9">
            <b-form-input type="password" placeholder="Enter your password..." id="password" v-model.trim="user.password"></b-form-input>
          </b-col>
        </b-form-group>
        <b-button class="btn-cursor" type="submit" variant="primary">Login</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
const Address = require('../../config/AddressApi')

export default {
  name: 'Login',
  data () {
    return {
      user: {},
      errors: []
    }
  },
  created() {
        if (sessionStorage.getItem('Logged') === "true" && sessionStorage.getItem('Role') === 'collaborator') { // if the user are collaborator and is logged, we move him to home page
      this.$router.push({
      name: 'Collaborator'
    })
    }
    else if (sessionStorage.getItem('Logged') === "true" && sessionStorage.getItem('Role') === 'corrector') { // if the user are corrector and is logged, we move him to home page
      this.$router.push({
      name: 'Corrector'
    })
    }
    },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://`+ Address.ip +`/api/auth/login/`, this.user) // we get the data entered for the creation of a user, then we insert the data in the users collection
      .then(response => {
        sessionStorage.setItem('Token', response.data.token)
        sessionStorage.setItem('User', response.data.userId)
        sessionStorage.setItem('Role', response.data.userRole)
        sessionStorage.setItem('Logged', "true")
        if ((response.data.userRole =="collaborator")) {
            this.$router.push({
          name: 'Collaborator',
        })
        this.$router.go() // refreshes the page for the menu 
        } else if ((response.data.userRole == "corrector")) {
          this.$router.push({
            name: 'Corrector',
          })
          this.$router.go()
      
      }
      })
      .catch(e => {
        console.log(e)
        this.errors.push(e)
      }), {
        
      }
    },
  }
}
</script>
<style>
.btn-cursor {
  cursor: pointer;
}
</style>