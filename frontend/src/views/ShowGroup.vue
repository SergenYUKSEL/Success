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
          Nom du groupe: {{group.groupName}}<br>
        </template>
        <hr class="my-4">
        <p>
          Updated Date: {{group.updated_date}}
        </p>
        <b-btn variant="success" @click.stop="editgroup(group._id)">Edit</b-btn>
        <b-btn variant="danger" @click.stop="deletegroup(group._id)">Delete</b-btn>
        <a style="color : #fff;margin-left: 5vh" type="button" v-on:click="Returnbehind()" class="btn btn-primary cold">Revenir en arrière</a>
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
    if(sessionStorage.getItem('Role') === 'collaborator') {
        this.$router.push({
          name: 'Collaborator',
        })
      }
      
    axios.all(
      axios.defaults.headers.common['Authorization'] =  'Bearer' +' '+  token,
      axios.get(`http://`+ Address.ip +`/api/group/` + this.$route.params.id)
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
</style>