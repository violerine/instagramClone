<template>
    
<div class="content">
<Navbar/>

<div class="forminput">
Caption
<div class="field container">
  <div class="control">
    <input v-model="caption" class="input is-link" type="text" placeholder="Caption">
  </div>
</div>

<!--FILE UPLOAD-->
<input class="btn btn-outline-primary" type="file" @change="previewFile" ref="file" accept="image/*">
<button  @click="addNewPost" type="button" class="button is-link">Submit</button>
</div>

</div>
<!--CONTENT END-->



</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { mapState,mapActions } from 'vuex';

export default {
    components:{
        Navbar
    },
    data:function(){
        return{
            formdata : new FormData(),
            caption:'',
            filename:''
        }
    },
    computed:{
      ...mapState([
        
      ])
    },
    methods:{
        
        previewFile(file){
            console.log("TES INI KE pICK Ga",file.target.files[0])
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
          })
          .catch(err=>{
            console.log(err);
          })
        },
    }
}
</script>

<style>

.forminput{
    padding-top: 100px;
}

</style>
