<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Group
        <router-link :to="{ name: 'ShowGroup', params: { id: group._id } }">(Show Group)</router-link>
      </h2>
      <b-form @submit="onSubmit">
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Name">
          <b-col sm="9">
            <b-form-input type="text" placeholder="Enter the group name..." v-model.trim="group.groupName"></b-form-input>
          </b-col>
        </b-form-group>
        <b-button type="submit" variant="primary">Update</b-button>
        <b-button type="button" variant="success" @click="$router.go(-1)">Cancel</b-button>
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
  name: 'ModifyGroup',
  data () {
    return {
      group: {}
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
      axios.get(`http://`+ Address.ip +`/api/group/` + this.$route.params.id) // we get all the groups from the database
    .then(response => {
      this.group = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    )
    
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.put(`http://`+ Address.ip +`/api/group/modify` + this.$route.params.id, this.group) // we get the data entered for the modification of a group, then we insert the data in the groups collection
      .then(response => { 
        this.$router.push({
          name: 'ShowGroup',
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