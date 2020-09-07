<template>

  <div id="app">

    <div class="row" v-if="getUserData && getLogin">

      <div class="col-sm-12" id="logout">

        <button class="btn btn-danger m-3" @click="logoutUser">Logout</button>
      </div>
    </div>

      <router-view/>
    </div>
</template>

<script>
    
    import { mapGetters } from 'vuex';

    export default {

      name : 'main-page',

      computed : {

        ...mapGetters(['getUserData', 'getLogin'])
      },

      methods : {

        logoutUser() {

          this.$store.dispatch('deleteUser');

          this.$router.push('/login');
        }
      }
    };
</script>

<style scoped>
  
  #logout{ text-align: end; }
</style>