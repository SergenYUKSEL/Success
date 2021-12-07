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
          <b-form-select v-model="users.group" size="sm" class="mt-3">
           <option v-for="group in groups" :key="group._id" :value="group._id" > {{group.groupName}}</option>
          </b-form-select>
        </b-form-group>
        <b-form-group  id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Rôle">
          <b-form-select v-model.trim="users.role" :options="options" size="sm" class="mt-3">
          </b-form-select>
        </b-form-group>
        <b-form-group  id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Email">
          <b-form-input id="email" v-model.trim="users.email"></b-form-input>
        </b-form-group>
        <b-form-group  id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Password">
          <b-form-input type="password" id="password" v-model.trim="users.password"></b-form-input>
        </b-form-group>
        <b-form-group  id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Lastname">
          <b-form-input type="text" id="lastname" v-model.trim="users.lastname"></b-form-input>
        </b-form-group>
        <b-form-group  id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Enter Firstname">
          <b-form-input  type="text" id="firstname" v-model.trim="users.firstname"></b-form-input>
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
    axios.all(
      axios.defaults.headers.common['Authorization'] =  'Bearer' +' '+  token,
      axios.get(`http://`+ Address.ip +`/api/auth/` + this.$route.params.id)
    .then(response => {
      this.user = response.data
    })
    .catch(e => {
      this.errors.push(e)
    }),
    axios.get(`http://`+ Address.ip +`/api/group`)
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
      axios.patch(`http://`+ Address.ip +`/api/auth/modify` + this.$route.params.id, this.user, { params: {
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