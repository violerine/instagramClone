<template>
    <div class="detail">

        <Navbar/>
        
        <div class="column is-6 is-offset-3">
        <Post  :post="post" ></Post>
        </div>
    </div>
</template>

<script>
import Post from '@/components/Post.vue'
import Navbar from '@/components/Navbar.vue'

export default {
    data:function(){
        return{
            post:''
        }
    },
    created:function(){
        this.detailPhoto()
    },
    components:{    
        Post,
        Navbar

    },
    methods:{
          detailPhoto(){
            var param = this.$route.params.photoid
            console.log('PARAM',param)
            axios.get(`http://localhost:7000/post/one/${param}`)
            .then(({data})=>{
                console.log("PER PHOTO",data)
                this.post=data
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>
