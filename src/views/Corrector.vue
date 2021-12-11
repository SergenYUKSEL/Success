<template>
<div class="corrector">
    
    <h1>Bienvenue sur le site </h1>
    <h1> Listes des questionnaires à corriger </h1>
    <a href="survey"> Liste des questionnaires</a> <br>
    <a href="CreateSurvey"> Créer un questionnaire </a> <br>
    <br>
    <a href="question"> Liste des questions</a> <br>
    <a href="CreateQuestion"> Créer une question </a> <br>
    <br>
    <a href="category"> Liste des catégories</a> <br>
    <a href="CreateCategory"> Créer une catégorie </a> <br>

    <br>
    <a href="user"> Liste des user</a> <br>
    <a href="Signup"> Créer un user </a> <br>
    <br>
    <a href="group"> Liste des groupes</a> <br>
    <a href="CreateGroup"> Créer un groupe</a>
    <!-- <Tabled test="bonjour!"/> -->


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