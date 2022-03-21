<template>
<div class="corrector">
    
    <h1>Welcome to the Corrector area</h1><br><br>

    <router-link class="btn btn-primary" to="survey"> List of Quizz</router-link> <br> <br>
    <router-link class="btn btn-primary" to="CreateSurvey"> Create a Quizz</router-link> <br> <br>
    <router-link class="btn btn-primary" to="question"> List of Questions</router-link> <br> <br>
    <router-link class="btn btn-primary" to="CreateQuestion"> Create a Question</router-link> <br> <br>
    <router-link class="btn btn-primary" to="category"> List of Categories</router-link> <br> <br>
    <router-link class="btn btn-primary" to="CreateCategory"> Create a Category</router-link> <br> <br>
    <router-link class="btn btn-primary" to="user"> List of Users</router-link> <br> <br>
    <router-link class="btn btn-primary" to="Signup"> Create a User account</router-link> <br> <br>
    <router-link class="btn btn-primary" to="group"> List of Groups</router-link> <br> <br>
    <router-link class="btn btn-primary" to="CreateGroup"> Create a Group</router-link> <br> <br>
    <router-link class="btn btn-primary" to="Correction"> Correcting a Quizz</router-link> <br> <br>
    <router-link class="btn btn-primary" to="Dashboard">Statistics</router-link> <br> <br>
     <router-link class="btn btn-primary" to="surveypass">List of Quizz completed by employees</router-link> <br> <br>
    <router-link class="btn btn-primary" to="suggestion">Ideas box</router-link> <br> <br>



</div>
</template>
<script>
import axios from 'axios';
const token = sessionStorage.getItem('Token')
export default {
  name: 'Corrector',
  data() {
      return {
        
      }
  },
created() {
    if(sessionStorage.getItem('Role') === 'collaborator') {
        this.$router.push({
          name: 'Collaborator',
        })
      }
      else if (sessionStorage.getItem('Logged') != "true") {
      this.$router.push({
      name: 'Login'
    })
    }
    axios.defaults.headers.common['Authorization'] =  'Bearer' +' '+  token
},
}

</script>


<style>
a {
    color: black;
    text-decoration: none;
}
</style>