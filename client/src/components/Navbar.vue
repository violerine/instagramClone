<template>
<div class="navbarandmodal">
  <div class="navbar is-inline-flex is-transparent">
        <div class="navbar-brand">
            <a class="navbar-item">
                <router-link to="/"><img src="../assets/instagram.png" width="120" height="40" alt="Zomagram"></router-link>
            </a>
        </div>
        <div class="navbar-menu">
            <div class="navbar-item">
            
            </div>
        </div>
        <div class="navbar-item is-flex-touch">
            <a class="navbar-item">
                <p v-show="$route.path!=='/login' && $route.path!=='/register' " v-if="this.currentUser===null" class="control">
                    <button aria-haspopup="true" class="button">
                     <span ><router-link to="/login">Login</router-link></span>
                    </button>
                </p>
            </a>
               <a class="navbar-item" >
                <p v-if="this.currentUser!==null" class="control">
                    <button aria-haspopup="true" class="button" @click="logout">Logout</button>
                </p>
            </a>
            <a  v-show="$route.path==='/'" v-if="this.currentUser===null" class="navbar-item">
              <router-link to="/register"><button aria-haspopup="true" class="button" >Register</button></router-link>
            </a>
            <a  v-show="$route.path!=='/'" class="navbar-item">
               <router-link to="/"> <i class="material-icons">panorama</i></router-link>
            </a>
            <a v-if="this.currentUser!==null" class="navbar-item" >
                <router-link to="/user"><i class="material-icons">face</i></router-link>
            </a>
           
        </div>
    </div>

</div>  
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: 'navbar',
        data:function(){
            return{
                currentUser:localStorage.getItem('userid')
            }
        },
        computed: {
            ...mapState([
                
            ])
        },
        created:function () {
                      
        },
        methods: {
            logout(){
              swal({
                title: "Logout?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        localStorage.clear()
                        this.$router.push('/login')
                    } else {
                        // swal("Your imaginary file is safe!");
                    }
                });
            
        },
        }
    }
</script>



<style>

</style>
