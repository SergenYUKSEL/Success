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
    axios.defaults.headers.common['Authorization'] =  'Bearer' +' '+  token  // this is the authentication header to make requests from the api
    if(sessionStorage.getItem('Role') === 'corrector') { // if the user are corrector, we move him to home page
      this.$router.push({
      name: 'Corrector'
    })
    }
    else if (sessionStorage.getItem('Logged') != "true") { // if the user is not logged in, we move him to the login page
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