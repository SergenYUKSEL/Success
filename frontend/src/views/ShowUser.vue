<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit User
        <b-link href="/user">(User List)</b-link>
      </h2>
      <b-jumbotron>
        <template slot="header">
        </template>
        <template slot="lead">
      <div v-for="users in user" :key="users._id">
          Adresse email: {{users.email}}<br>
          Nom: {{users.lastname}}<br>
          Prénom: {{users.firstname}}<br>
          <div v-for="usergroup in users.group" :key="usergroup._id">
           Groupe {{usergroup.groupName}}
          </div>
      </div>
        </template>
        
        <hr class="my-4">
        <div v-for="users in user" :key="users._id">
        <b-btn variant="success" @click.stop="edituser(users._id)">Edit</b-btn>
        <b-btn variant="danger" style="margin-left: 5vh;" @click.stop="deleteuser(users._id)">Delete</b-btn>
        <a style="color : #fff;margin-left: 5vh" type="button" v-on:click="Returnbehind()" class="btn btn-primary cold">Go back</a>
       
        </div>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'
const Address = require('../../config/AddressApi')
const token = sessionStorage.getItem('Token')

export default {
  name: 'ShowUser',
  data () {
    return {
      user: [],
    }
  },
  created () {
    if(sessionStorage.getItem('Role') === 'collaborator') {
        this.$router.push({
          name: 'Collaborator',
        })
      }
      
    axios.all(
      axios.defaults.headers.common['Authorization'] =  'Bearer' +' '+  token,
      axios.get(`http://`+ Address.ip +`/api/auth/` + this.$route.params.id)
    .then(response => {
      this.user = response.data
      
    })
    .catch(e => {
      this.errors.push(e)
    })
    )
  },
  
  methods: {
    edituser (userid) {
      this.$router.push({
        name: 'ModifyUser',
        params: { id: userid }
      })
    },
    headers: { 
    'Authorization': 'Bearer ', 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
    deleteuser (userid) {
      axios.delete(`http://`+ Address.ip +`/api/auth/delete` + userid)
      .then((result) => {
        this.$router.push({
          name: 'user'
        })
        return result;
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
     Returnbehind() {
        this.$router.push({
          name: 'user',
        })
      }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>