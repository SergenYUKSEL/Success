<template>
  <div id="app">
    <div>
  <b-navbar  type="dark" variant="dark">
    <b-navbar-nav>
      <b-nav-item href="#" v-if="Log != 'true'" class="m-2">Connexion</b-nav-item>
      <b-nav-item v-else class="m-2">           </b-nav-item>

      <b-nav-item-dropdown v-if="Log === 'true' && Role === 'collaborator'" text="Collaborateur" class="m-2" right>
        <b-dropdown-item>
          <router-link  to="collaborator">
            {{user[0].lastname + ' ' + user[0].firstname}}
          </router-link>
        </b-dropdown-item>
        <b-dropdown-item>
          <router-link to="passsurvey">Passer un questionnaire</router-link>
        </b-dropdown-item>
        <b-dropdown-item>
          <router-link to="listCorrection">Afficher les quizz dèja réalisé</router-link>
        </b-dropdown-item>
        <b-dropdown-item>
          <router-link to="DashboardCollab">Statistique</router-link>
        </b-dropdown-item>
      </b-nav-item-dropdown>


  <b-nav-item-dropdown v-if="Log === 'true' && Role === 'corrector'" text="Correcteur" id="dropdown-grouped"  class="m-2" right>
      <b-dropdown-item-button>
        <router-link to="corrector">
          {{user[0].lastname + ' ' + user[0].firstname}}
        </router-link>
      </b-dropdown-item-button>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-group id="dropdown-group-1" header="Categorie">
        <b-dropdown-item-button>
          <router-link to="createcategory" >Création d'une catégorie</router-link>
        </b-dropdown-item-button>
        <b-dropdown-item-button>
          <router-link to="category">Liste des catégories</router-link>
        </b-dropdown-item-button>
      </b-dropdown-group>
      <b-dropdown-group id="dropdown-group-2" header="Question">
        <b-dropdown-item-button>
          <router-link to="createquestion">Création d'une question</router-link>
        </b-dropdown-item-button>
        <b-dropdown-item-button>
          <router-link to="question">Liste des questions</router-link>
        </b-dropdown-item-button>
      </b-dropdown-group>
      <b-dropdown-group id="dropdown-group-3" header="Questionnaire">
        <b-dropdown-item-button>
          <router-link to="createsurvey" >Création d'un questionnaire</router-link>
        </b-dropdown-item-button>
        <b-dropdown-item-button>
          <router-link to="survey">Liste des questionnaires</router-link>
        </b-dropdown-item-button>
      </b-dropdown-group>
      <b-dropdown-group id="dropdown-group-4" header="Groupe">
        <b-dropdown-item-button>
          <router-link to="creategroup">Création d'un groupe</router-link>
        </b-dropdown-item-button>
        <b-dropdown-item-button>
          <router-link to="group">Liste des groupes</router-link>
        </b-dropdown-item-button>
      </b-dropdown-group>
      <b-dropdown-group id="dropdown-group-5" header="Utilisateur">
        <b-dropdown-item-button>
          <router-link to="signup" >Création d'une compte</router-link>
        </b-dropdown-item-button>
        <b-dropdown-item-button>
          <router-link to="user">Liste des utilisateurs</router-link>
        </b-dropdown-item-button>
      </b-dropdown-group>
      <b-dropdown-group id="dropdown-group-6" header="Correction">
        <b-dropdown-item-button>
          <router-link to="Correction">Correction des questionnaires</router-link>
        </b-dropdown-item-button>
      </b-dropdown-group>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item-button>
        <router-link to="Dashboard">Statistique</router-link>
      </b-dropdown-item-button>
        <b-dropdown-item-button>
        <router-link to="surveypass">Liste des questionnaires réalisé</router-link>
      </b-dropdown-item-button>
        <b-dropdown-item-button>
        <router-link to="suggestion">Boîte à idées</router-link>
      </b-dropdown-item-button>
  </b-nav-item-dropdown>
    <b-nav-item v-if="Log === 'true'" class="m-2">
      <router-link class="logout-btn" to="logout">Déconnexion</router-link>
</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</div>
    <router-view/>
  </div>
</template>
<script>
import axios from 'axios'
const Address = require('../config/AddressApi')
export default {
  data() {
    return {
        Log : sessionStorage.getItem('Logged'),
        Role : sessionStorage.getItem('Role'),
        user: [],
    }
  },
  created() {
    axios.get(`http://`+ Address.ip +`/api/auth/` + sessionStorage.getItem('User'))
    .then(response => {
      this.user = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
  

}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar {
  padding: 0.5rem 10rem !important;
  margin-bottom: 5rem;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
/*.nav-item a {

}
*/
.nav-item a:hover {

  text-decoration: none
}
.logout-btn {
  color: white;
}
</style>
