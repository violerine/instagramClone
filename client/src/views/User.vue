<template>
    <div class ="user">
        <Navbar/>
        
<div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-10 is-offset-1">
                    <div class="box">
                        <figure class="avatar">
                            <img src="../assets/pengu.png">
                        </figure>
                        <p>Photos By {{currentUser}}</p>

                        
                   <button  @click="activateModal" class="button">Upload New Photo</button>
                   
                        
                    </div>                  
                    
                    <div class="card">
                        <div class="columns">
                            <div  @click="gridStat(true)" class="column is-half">
                                <i class="material-icons">
                                view_module
                                </i>
                            </div>
                            <div @click="gridStat(false)" class="column is-half">
                                <div class="vl"> <i  class="material-icons">
                                    reorder
                                </i></div>
                            </div>
                        </div>     
                    </div>  <br>


                    <!--TAMPILAN FOTO GEDE-->
                    <div v-if="gridStatus===false" class="column is-10 is-offset-1">
                        <div v-for="(post,index) in postsByUser" :key="index" class="postsbyusername">
                                <Post :post="post" />
                        </div>
                    </div>
                    <!-- END TAMPILAN FOTO GEDE-->


                      

                    <!--TAMPILAN FOTO GRID 3-->
                     <div v-if ="gridStatus===true" class="columns is-multiline">
                       
                        <div  v-for="(post,index) in postsByUser" :key="index" class="column is-one-third">
                             <div class="card cardphoto">
                                <Photo class="column is-one-third" :post="post" ></Photo>
                            <!-- First column -->
                            </div>
                        </div>
                    </div>
                    <!--END TAMPILAN FOTO GRID 3-->

                    
            
                </div>
            </div>
        </div>

<!---MODAL-->

<div class="modal">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Upload New Photo</p>
      <button @click="closeModal" class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <div class="control">
          Content : 
          <textarea v-model="caption" class="textarea" placeholder="e.g. Hello world"></textarea>
        </div>
      </div>
      <div class="file has-name is-fullwidth">
        <label class="file-label">
          <input  @change="previewFile"  class="file-input" type="file" name="resume">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              Choose a file…
            </span>
          </span>
          <span class="file-name">
            {{this.filename}}
          </span>
        </label>
      </div>
      <p>{{pleasewait}}</p>
    </section>
    <footer class="modal-card-foot">
      <button @click="addNewPost" class="button is-link">Upload Photo</button>
      <button @click="closeModal" class="button">Cancel</button>
    </footer>
  </div>
</div>

<!--MODAL END-->


    </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'
import Post from '@/components/Post.vue'
import Photo from '@/components/Photo.vue'
import {mapState, mapActions} from 'vuex'

export default {
    components:{
        Navbar,
        Post,
        Photo
    },
    data:function(){
        return{
          formdata : new FormData(),
          caption:'',
          filename:'',
          pleasewait:'',
          gridStatus:true,
          currentUser:localStorage.getItem('username')
          

        }
    },
    computed:{
        ...mapState([
            'postsByUser'
        ])
    },
    created:function(){
        this.getPostsByUser()
        console.log("Post",this.postsByUser)
        console.log(localStorage.getItem('username'))
        this.checkUser()
    },
    methods:{
       ...mapActions([
             'getPostsByUser'
        ]),
        checkUser(){
            var user = localStorage.getItem('userid')
            if(user===null){
                this.$router.push('/login')
            }
        },
        gridStat(status){
          this.gridStatus=status
        },
         activateModal(){
          $(".modal").addClass("is-active")
        },
        closeModal(){
          $(".modal").removeClass("is-active")
        },
        previewFile(file){
          console.log("TES INI KE PICK Ga",file.target.files[0].name)
          var filedata = file.target.files[0]
          this.filename = filedata.name
          this.formdata.append('image',filedata)
        },
         addNewPost(){
          console.log(this.formdata)
          let self=this
          if (this.formdata) {
            self.formdata.set('userid',localStorage.getItem('userid'))
            self.formdata.set('caption',self.caption)
          } else {
            self.formdata.append('userid',localStorage.getItem('userid'))
            self.formdata.append('caption',self.caption)
          }
          
          self.pleasewait='Please wait...'
          axios.post("http://localhost:7000/post/add",self.formdata)
          .then(article=>{
            console.log("DAPET GA",article);
            self.pleasewait=''
            self.caption=''
            self.formdata.delete('caption')
            self.formdata.delete('image')
            self.filename=''
            
            console.log("FORM DATANYA KEDELETE ga",this.formdata.entries())
            for (var pair of this.formdata.entries()) {
                console.log("MUNCUL Ga",pair[0]+ ', ' + pair[1]); 
            }
            swal('New Post Created')
            self.getPostsByUser()
            self.closeModal()
          })
          .catch(err=>{
            console.log(err);
          })
        },
    }
}
</script>

<style>

.cardphoto {
  height: 245px;
}

.vl {
    border-left: 1px solid grey;
    height: 40px;
}

.material-icons{
    height:40px;
    width:40px;
}
</style>
