<template>
    <div>
        <h1>Espace Collaborateur</h1>
        <a href="passsurvey">Passer un questionnaire</a>
        <br><b-link @click="logout()">(Logout)</b-link>
    </div>
</template>

<script>
export default {
    name:"Collaborator",
    logout () {
    localStorage.removeItem('jwtToken')
    this.$router.push({
      name: 'Login'
    })
    }
}
</script>

<style>
a {
    text-decoration: none;
    color: black;
}

</style>