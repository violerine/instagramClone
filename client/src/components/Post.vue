<template>
          <div class="card" >
                <div class="header">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                                <img src="https://source.unsplash.com/random/96x96" alt="Placeholder image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">{{post.userId.username}}</p>
                            <p class="subtitle is-6"></p>
                        </div>
                    </div>
                </div>
                <div class="card-image">
                    <figure class="image is-4by3">
                        <img :src=post.pic_url alt="Placeholder image">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="level is-mobile">
                        <div class="level-left">
                            <div class="level-item has-text-centered">
                            </div>
                             <div class="level-item has-text-centered">
                                
                            </div>
                        </div>
                    </div>

                    <div class="content">
                        <p>
                            <i>@{{post.userId.username}}  </i> says: {{post.caption}}
                        </p>
                        
                        <br>
                        <time datetime="2018-1-1">Created at : {{post.createdAt}}</time>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="columns is-mobile">
                        <div class="column is-11">
                            <div class="field">
                                
                                <div v-if="this.currentUser==post.userId._id" v-show="$route.path==='/user'" style="margin-left:270px;" class="control"><br>
                                   <button @click="deletePost(post._id)" class="button">
                                    <i class="material-icons">delete</i>
                                </button>
                                </div>
                            </div>
                        </div>
                        <div class="column has-text-centered">
                            
                        </div>
                    </div>
                </div>
                 <br><br>

                

    </div>
</template>


<script>
import { mapActions, mapState} from 'vuex'

export default {
    props:['post'],
    data:function(){
        return{
            currentUser:localStorage.getItem('userid')
        }
    },
    methods:{
        ...mapActions([
           'getPostsByUser'
        ]),
        deletePost(photoid){
        function deleteOne(photoid){
             axios.delete(`http://localhost:7000/post/delete/${photoid}`)
                .then(photo=>{
                    console.log("PHOTO DELETE",photo)
                    // this.getPostsByUser()
                })
                .catch(err=>{
                    console.log(err)
                })
          }
             swal({
              title: "Are you sure?",
              text: "Once deleted, you will not be able to recover this Article!",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
            .then((willDelete) => {
              if (willDelete) {
                $('#message-panel').addClass('is-hidden');
                deleteOne(photoid)
                window.location.reload()
                // swal("Article Deleted", {
                //   icon: "success",
                // });
            } else {
              
            }
          });
           
        }
    }
}
</script>


<style scoped>
.card {
    margin-top: 5rem;
}
.card .header {
    padding: 5px 10px;
}
.card-footer .columns {
    width: 100%;
}
.card-footer .columns input {
    border: none;
    border-radius: 0;
    box-shadow: none;
}
.card-footer .columns .column:last-child {
    display: flex;
    align-items: center;
}
.card-footer .columns .column:last-child button {
    border: none;
}

.content{
    text-align: left;
}
</style>
