<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Edit Category
        <b-link href="/category">(Category List)</b-link>
      </h2>
      <b-jumbotron>
        <template slot="header">
          {{category.name}}
        </template>
        <template slot="lead">
          <span class="subtitle-survey">Name: </span>{{category.name}}<br>
          <span class="subtitle-survey">Description: </span>{{category.description}}<br>
        </template>
        <hr class="my-4">
        <p>
          Updated Date: {{category.updated_date}}
        </p>
        <b-btn variant="success" @click.stop="editcategory(category._id)">Edit</b-btn>
        <b-btn variant="danger" style="margin-left: 5vh;" @click.stop="deletecategory(category._id)">Delete</b-btn>
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
  name: 'ShowCategory',
  data () {
    return {
      category: []
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
      axios.get(`http://`+ Address.ip +`/api/category/` + this.$route.params.id) // we get all the categories from the database
    .then(response => {
      this.category = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
    )
    
  },
  methods: {
    editcategory (categoryid) {
      this.$router.push({
        name: 'ModifyCategory',
        params: { id: categoryid }
      })
    },
    deletecategory (categoryid) {
      axios.delete(`http://`+ Address.ip +`/api/category/delete` + categoryid)
      .then((result) => {
        this.$router.push({
          name: 'category'
        })
        return result;
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
     Returnbehind() {
        this.$router.push({
          name: 'category',
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