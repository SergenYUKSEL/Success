<template>
    <div>
        <h1>Espace Collaborateur </h1>
        <a href="passsurvey">Passer un questionnaire</a>
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

</style>