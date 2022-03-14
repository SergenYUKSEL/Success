<template>
<div class="corrector">
    
    <h1>Bienvenue dans l'espace Correcteur  </h1><br><br>

    <router-link class="btn btn-primary" to="survey"> Liste des Quizz</router-link> <br> <br>
    <router-link class="btn btn-primary" to="CreateSurvey"> Créer un Quizz</router-link> <br> <br>
    <router-link class="btn btn-primary" to="question"> Liste des Questions</router-link> <br> <br>
    <router-link class="btn btn-primary" to="CreateQuestion"> Créer un Question</router-link> <br> <br>
    <router-link class="btn btn-primary" to="category"> Liste des Catégories</router-link> <br> <br>
    <router-link class="btn btn-primary" to="CreateCategory"> Créer une Catégorie</router-link> <br> <br>
    <router-link class="btn btn-primary" to="user"> Liste des Utilisateurs</router-link> <br> <br>
    <router-link class="btn btn-primary" to="Signup"> Créer un compte Utilisateur</router-link> <br> <br>
    <router-link class="btn btn-primary" to="group"> Liste des Groupes</router-link> <br> <br>
    <router-link class="btn btn-primary" to="CreateGroup"> Créer un Groupe</router-link> <br> <br>
    <router-link class="btn btn-primary" to="Correction"> Corriger un questionnaire</router-link> <br> <br>
    <router-link class="btn btn-primary" to="Dashboard">Statistique</router-link> <br> <br>
    <router-link class="btn btn-primary" to="suggestion">Boîte à idées</router-link> <br> <br>



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