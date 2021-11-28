<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit User
        <b-link href="/user">(User List)</b-link>
      </h2>
      <b-jumbotron>
        <template slot="header">
          {{user.lastname && user.firstname}}
        </template>
        <template slot="lead">
          Adresse email: {{user.email}}<br>
          Nom: {{user.lastname}}<br>
          Prénom: {{user.firstname}}<br>
          Group: {{user.group}}<br>
        </template>
        <hr class="my-4">

       <!-- <b-btn variant="success" @click.stop="edituser(user._id)">Edit</b-btn> -->
        <b-btn variant="danger" @click.stop="deleteuser(user._id)">Delete</b-btn>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'
const Address = require('../../config/AddressApi')

export default {
  name: 'ShowUser',
  data () {
    return {
      user: []
    }
  },
  created () {
    axios.get(`http://`+ Address.ip +`/api/auth/` + this.$route.params.id)
    .then(response => {
      this.user = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    edituser (userid) {
      this.$router.push({
        name: 'ModifyUser',
        params: { id: userid }
      })
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
    }
  }
}
</script>

<style>
  .jumbotron {
    padding: 2rem;
  }
</style>