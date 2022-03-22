<template>
    <div>
        <h1 class="title-index">Welcome to the Collaborator area</h1><br>
        <router-link class="btn btn-primary" to="passsurvey">Take a Survey</router-link> <br><br>
        <router-link class="btn btn-primary" to="listCorrection">Display the Survey already completed</router-link><br><br>
        <router-link class="btn btn-primary" to="DashboardCollab">Show statistics</router-link> <br><br>
        <router-link class="btn btn-primary" to="CreateSuggestion">Suggest ideas</router-link>
        
    </div>
</template>

<script>
import axios from 'axios'
const token = sessionStorage.getItem('Token');
export default {
    name:"Collaborator",

  created() {
    axios.defaults.headers.common['Authorization'] =  'Bearer' +' '+  token
    if(sessionStorage.getItem('Role') === 'corrector') {
      this.$router.push({
      name: 'Corrector'
    })
    }
    else if (sessionStorage.getItem('Logged') != "true") {
      this.$router.push({
      name: 'Login'
    })
    }
  }
}
</script>

<style>
a {
    text-decoration: none;
    color: black;
}
.title-index {
  font-weight: bold;
}

</style>