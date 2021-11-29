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
                  label="Nom">
          <b-form-input v-model.trim="group.groupName"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Update</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
/* eslint-disable */

import axios from 'axios'
const Address = require('../../config/AddressApi')

export default {
  name: 'ModifyGroup',
  data () {
    return {
      group: {}
    }
  },
  created () {
    axios.get(`http://`+ Address.ip +`/api/group/` + this.$route.params.id)
    .then(response => {
      this.group = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.put(`http://`+ Address.ip +`/api/group/modify` + this.$route.params.id, this.group)
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