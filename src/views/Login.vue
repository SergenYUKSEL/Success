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
        <p>collaborateur@gmail.com  mdp : collaborateur</p>
          <p>correcteur@gmail.com  mdp : correcteur</p>
        <b-button type="submit" variant="primary">Login</b-button>
        <b-button type="button" variant="success" @click.stop="register()">Register</b-button>
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
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://`+ Address.ip +`/api/auth/login/`, this.user)
      .then(response => {
        sessionStorage.setItem('Token', response.data.token)
        sessionStorage.setItem('User', response.data.userId)
        sessionStorage.setItem('Role', response.data.userRole)
        if ((response.data.userRole =="collaborator")) {
            this.$router.push({
          name: 'Collaborator',
         // (pour l'instant on ne va pas l'utilisé) params: { token: response.data.token }
        })
        } else if ((response.data.userRole == "corrector")) {
          this.$router.push({
            name: 'Corrector',
          })
         // (pour l'instant on ne va pas l'utilisé) params: { token: response.data.token }
      
      }
      })
      .catch(e => {
        console.log(e)
        this.errors.push(e)
      }), {
        
      }
    },
    
     
    register () {
      this.$router.push({
        name: 'Signup'
      })
    }
  }
}
</script>