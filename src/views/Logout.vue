<template>
  <h1>Déconnexion</h1>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    created() {
        if (sessionStorage.getItem('Token') != null && sessionStorage.getItem('User') != null && sessionStorage.getItem('Role') != null)   {
            sessionStorage.clear()
            alert('vous avez été deconnecté avec succès !')
            this.$router.push({
                name: 'Login'
            })
        }
        


    }
}
</script>

<style>

</style>