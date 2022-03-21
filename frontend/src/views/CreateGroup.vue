<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Add Group
        <b-link href="/group">(Group List)</b-link>
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
        <b-button type="submit" variant="primary">Save</b-button>
        <a style="color : #fff;margin-left: 5vh" type="button" v-on:click="Returnbehind()" class="btn btn-primary cold">Go back</a>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'
const Address = require('../../config/AddressApi')
const token = sessionStorage.getItem('Token')
export default {
  name: 'CreateGroup',
  data () {
    return {
      group: {}
    }
  },
  created() {
    if(sessionStorage.getItem('Role') === 'collaborator') {
        this.$router.push({
          name: 'Collaborator',
        })
      }
      
    axios.defaults.headers.common['Authorization'] =  'Bearer' +' '+  token
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://`+ Address.ip +`/api/group/create/`, this.group)
      .then(response => {
        this.$router.push({
          name: 'ShowGroup',
          params: { id: response.data.id }
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
     Returnbehind() {
        this.$router.push({
          name: 'Corrector',
        })
      }
  }
}
</script>