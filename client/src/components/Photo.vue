<template>
    <div class="image">
        <router-link :to="{ name: 'Detail', params: { photoid: post._id }}">
        <figure  class="image is-square grid3">
            <img v-bind:src=post.pic_url>
        </figure>
        </router-link>

    </div>
</template>

<script>
export default {
    props:['post'],
    created:function(){
        // this.detailPhoto()
    },
    methods:{
      
    }
}
</script>

<style>

.grid3{
    width: 220px;
    height: 220px;
}
</style>
