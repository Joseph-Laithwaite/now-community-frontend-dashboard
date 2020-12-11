<template>
  <div>
  </div>
</template>

<script>

export default {
  created(){
    this.$store.dispatch("logout")
    .then(response=>{
        this.$router.push({name : 'Login'})
    })
  }
};
</script>
<style scoped>
.login-fix-page {
  padding-bottom: 7em;
  padding-top: 4em;
}
</style>

