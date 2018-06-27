import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts:'',
    postsByUser:'',
  },
  mutations: {
    allPost(state,payload){
      state.posts=payload
    },
    postsPerUser(state,payload){      
      state.postsByUser=payload
    },

  },
  
  actions: {
    getAllPosts({commit}){
      axios.get('http://localhost:7000/post/')
      .then(({data})=>{
        commit('allPost',data)
      })
      .catch(err=>{
        console.log("ERRORNYA DI STORE GET ALL Post",err)
      })
    },
    getPostsByUser({commit},payload){
      const user= localStorage.getItem('userid')
      axios.get(`http://localhost:7000/post/${user}`)
      .then(({data})=>{
        console.log("DATA",data)
        commit('postsPerUser',data)
      })
      .catch(err=>{
        console.log("ERROR FROM GET ARTICLES BY USER",err)
      })
    }
  }
})
