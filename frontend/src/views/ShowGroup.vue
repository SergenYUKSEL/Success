<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Group
        <b-link href="/group">(Group List)</b-link>
      </h2>
      <b-jumbotron>
        <template slot="header">
          {{group.groupName}}
        </template>
        <template slot="lead">
          <span class="subtitle-survey">Name: </span>{{group.groupName}}<br>
        </template>
        <hr class="my-4">
        <p>
          Updated Date: {{group.updated_date}}
        </p>
        <b-btn variant="success" @click.stop="editgroup(group._id)">Edit</b-btn>
        <b-btn variant="danger" style="margin-left: 5vh;" @click.stop="deletegroup(group._id)">Delete</b-btn>
        <a style="color : #fff;margin-left: 5vh" type="button" v-on:click="Returnbehind()" class="btn btn-primary cold btn-cursor">Go back</a>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'
const Address = require('../../config/AddressApi')
const token = sessionStorage.getItem('Token')

export default {
  name: 'ShowGroup',
  data () {
    return {
      group: []
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
      axios.get(`http://`+ Address.ip +`/api/group/` + this.$route.params.id)  // we get all the groups from the database
    .then(response => {
      this.group = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    )
  },
  methods: {
    editgroup (groupid) {
      this.$router.push({
        name: 'ModifyGroup',
        params: { id: groupid }
      })
    },
    deletecategory (groupid) {
      axios.delete(`http://`+ Address.ip +`/api/group/delete` + groupid)
      .then((result) => {
        this.$router.push({
          name: 'group'
        })
        return result;
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
     Returnbehind() {
        this.$router.push({
          name: 'group',
        })
      }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
  .btn-cursor {
  cursor: pointer;
}
</style>