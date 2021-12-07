<template>
    <div>
        <h1>Espace Collaborateur</h1>
        <a href="passsurvey">Passer un questionnaire</a>
        <br><b-link @click="logout()">(Logout)</b-link>
    </div>
</template>

<script>
import axios from 'axios'
const token = sessionStorage.getItem('Token');
export default {
    name:"Collaborator",
    logout () {
    localStorage.removeItem('jwtToken')
    this.$router.push({
      name: 'Login'
    })
    },
  created() {
    axios.defaults.headers.common['Authorization'] =  'Bearer' +' '+  token
    if(sessionStorage.getItem('Role') === 'corrector') {
      this.$router.push({
      name: 'Corrector'
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