<template>
    <div class="login">

        <Navbar/>
        <section class="hero is-success is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <!-- <h3 class="title has-text-black">Login</h3> -->
                    <div class="box">
                        <!-- <figure class="avatar"> -->
                            <img src="../assets/instagram.png">
                        <!-- </figure> -->
                        <form>
                            <div class="field">
                                <div class="control">
                                    <input v-model="username" class="input is-large" type="text" placeholder="Your Username" autofocus="">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input v-model="password" class="input is-large" type="password" placeholder="Your Password">
                                </div>
                            </div>
                            <div class="field">
                                <label class="checkbox">
                </label>
                            </div>
                            <button type="button" @click="login" class="button is-block is-link is-large is-fullwidth">Login</button>
                        </form>

                    </div>
                    <p class="has-text-grey">
                        <router-link to="/register"><a href="../">Dont Have an account? Sign Up Here!</a> &nbsp;·&nbsp;</router-link>
                    </p>
                </div>
            </div>
        </div>
    </section>
  
    </div>
</template>



<script>


import Navbar from '@/components/Navbar.vue'
import {mapActions, mapState} from 'vuex'

export default {
    components:{
        Navbar
    },
    created:function(){

    },
    data: function () {
        return {
            username: '',
            password: ''
        }
    }, 
    methods: {
        login(){
                axios.post('http://localhost:7000/login',{
                    username :this.username,
                    password :this.password 
                })
                .then(({data})=>{
                    console.log("USER",data)
                    localStorage.setItem('token',data.token)
                    localStorage.setItem('userid',data._id)
                    localStorage.setItem('username',data.username)
                    console.log("NAMANYA DAPET GA ",data.nama)
                    localStorage.setItem('name',data.nama)
                    this.$router.push('/')
                })
                .catch(err=>{
                    alert('incorrect username/password')
                    console.log(err)
                })
            },
        
    }
}
</script>


<style>

.box {
  margin-top: 4rem;
}

.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 0rem;
}

.hero.is-success {
    background-color: #ffffff; 
    color: #fff;
}

.column.is-offset-4, .column.is-offset-4-tablet {
    margin-left: 33.33333%;
    padding-top: 30px;
}

</style>