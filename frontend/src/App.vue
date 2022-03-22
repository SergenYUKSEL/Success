<template>
  <div id="app">
    <div>
  <b-navbar  type="dark" variant="dark">
    <b-navbar-nav>
      <b-nav-item href="#" v-if="Log != 'true'" class="m-4 log-btn">Login</b-nav-item>
      <b-nav-item v-else class="m-2">           </b-nav-item>

      <b-nav-item-dropdown v-if="Log === 'true' && Role === 'collaborator'" text="Collaborator" class="m-4" right>
        <b-dropdown-item>
          <router-link  to="collaborator">
            {{user[0].lastname + ' ' + user[0].firstname}}
          </router-link>
        </b-dropdown-item>
        <b-dropdown-item>
          <router-link to="passsurvey">Pass a Survey</router-link>
        </b-dropdown-item>
        <b-dropdown-item>
          <router-link to="listCorrection">Display the Quizzes already made</router-link>
        </b-dropdown-item>
        <b-dropdown-item>
          <router-link to="DashboardCollab">Statistics</router-link>
        </b-dropdown-item>
      </b-nav-item-dropdown>


  <b-nav-item-dropdown v-if="Log === 'true' && Role === 'corrector'" text="Corrector" id="dropdown-grouped"  class="m-4" right>
      <b-dropdown-item-button>
        <router-link to="corrector">
          {{user[0].lastname + ' ' + user[0].firstname}}
        </router-link>
      </b-dropdown-item-button>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-group id="dropdown-group-1" header="Category">
        <b-dropdown-item-button>
          <router-link to="createcategory" >Create a Category</router-link>
        </b-dropdown-item-button>
        <b-dropdown-item-button>
          <router-link to="category">List of Categories</router-link>
        </b-dropdown-item-button>
      </b-dropdown-group>
      <b-dropdown-group id="dropdown-group-2" header="Question">
        <b-dropdown-item-button>
          <router-link to="createquestion">Create a Question</router-link>
        </b-dropdown-item-button>
        <b-dropdown-item-button>
          <router-link to="question">List of Questions</router-link>
        </b-dropdown-item-button>
      </b-dropdown-group>
      <b-dropdown-group id="dropdown-group-3" header="Quizzes">
        <b-dropdown-item-button>
          <router-link to="createsurvey" >Create a Survey</router-link>
        </b-dropdown-item-button>
        <b-dropdown-item-button>
          <router-link to="survey">List of Surveys</router-link>
        </b-dropdown-item-button>
      </b-dropdown-group>
      <b-dropdown-group id="dropdown-group-4" header="Groups">
        <b-dropdown-item-button>
          <router-link to="creategroup">Create a Group</router-link>
        </b-dropdown-item-button>
        <b-dropdown-item-button>
          <router-link to="group">List of Groups</router-link>
        </b-dropdown-item-button>
      </b-dropdown-group>
      <b-dropdown-group id="dropdown-group-5" header="Users">
        <b-dropdown-item-button>
          <router-link to="signup" >Create a User account</router-link>
        </b-dropdown-item-button>
        <b-dropdown-item-button>
          <router-link to="user">List of Users account</router-link>
        </b-dropdown-item-button>
      </b-dropdown-group>
      <b-dropdown-group id="dropdown-group-6" header="Correction">
        <b-dropdown-item-button>
          <router-link to="Correction">Correction des questionnaires</router-link>
        </b-dropdown-item-button>
      </b-dropdown-group>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item-button>
        <router-link to="Dashboard">Statistics</router-link>
      </b-dropdown-item-button>
        <b-dropdown-item-button>
        <router-link to="surveypass">List of Survey completed by employees</router-link>
      </b-dropdown-item-button>
        <b-dropdown-item-button>
        <router-link to="suggestion">Ideas box</router-link>
      </b-dropdown-item-button>
  </b-nav-item-dropdown>
    <b-nav-item v-if="Log === 'true'" class="m-4">
      <router-link class="log-btn" to="logout">Logout</router-link>
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
  text-decoration: none;
  color: #2c3e50;
}
.nav-item a {
  color: #2c3e50;
}
.log-btn {
  color: #fff !important;
}
.logout-btn {
  color: white;
}
</style>
