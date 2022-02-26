<template>
    <div>
        <h1>Espace Collaborateur </h1><br>
        <router-link class="btn btn-primary" to="passsurvey">Passer un questionnaire</router-link> <br><br>
        <router-link class="btn btn-primary" to="listCorrection">Afficher les questionnaires dèja réalisé</router-link><br><br>
        <router-link class="btn btn-primary" to="DashboardCollab">Afficher les statistiques</router-link>
        
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