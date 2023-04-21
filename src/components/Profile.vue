<script setup>
import { ref , onMounted, watch, reactive} from 'vue';
import ContainerComp from './ContainerComp.vue';
import ImageGallery from './ImageGallery.vue';
import Userbar from './Userbar.vue';
import { supabase } from '../supabase';
import { useRoute } from 'vue-router';
import { useUserStore } from '../stores/usersStore';
import { storeToRefs } from 'pinia';


const userStore = useUserStore()

const {user: loggedInUser} = storeToRefs(userStore)

const route = useRoute()

const user = ref(null)

const isFollowing = ref(false)

const {username} = route.params

const posts = ref([])

const loading = ref(false)

const userInfo = reactive({ posts: null, followers: null, following: null,})

const addNewPost = (post) =>{
    posts.value.unshift(post)
}

const updateIsFollowing = (follow) =>{
    isFollowing.value = follow
}

const fetchUserData = async ()=>{
    loading.value = true
    const {data: userData} = await supabase.from("users").select().eq("username", username).single()

    if(!userData){
        loading.value = false
        user.value = null
    }

    user.value = userData

    const {data: postsData} = await supabase.from("posts").select().eq("post_owner_id", user.value.id)

    posts.value = postsData

    await fetchIsFollowing()

    const followerCount = await fetchFollowersCount()

    const followingCount = await fetchFollowingCount()

    userInfo.followers = followerCount
    userInfo.following = followingCount
    userInfo.posts = posts.value.length

    loading.value = false
}

const fetchFollowersCount = async () =>{
    const {count} = await supabase.from("followers_following").select("*", {count: "exact"}).eq("following_id", user.value.id)

    return count
}

const fetchFollowingCount = async () =>{
    const {count} = await supabase.from("followers_following").select("*", {count: "exact"}).eq("follower_id", user.value.id)

    return count
}

const fetchIsFollowing = async () =>{
    if(loggedInUser.value && loggedInUser.value.id !== user.value.id){
        const {data} = await supabase.from("followers_following")
        .select()
        .eq("follower_id", loggedInUser.value.id)
        .eq("following_id", user.value.id)
        .single()
        
        if(data) {
            isFollowing.value = true
        }
    }
}

watch(loggedInUser, ()=>{
    fetchIsFollowing()
})

onMounted(()=>{
    fetchUserData()
})


</script>

<template>
    <ContainerComp>
        <div class="profile-container" v-if="!loading">
            <Userbar :user="user" :key="$route.params.username" :userInfo="userInfo" :addNewPost="addNewPost" :isFollowing="isFollowing" :updateIsFollowing="updateIsFollowing"/>
            <ImageGallery :posts="posts"/>

            <!-- [
                {id: 1, image:'https://i2-prod.mirror.co.uk/incoming/article24665034.ece/ALTERNATES/s615b/1_MAIN_CHP_010821SLUG_6322.jpg',},
                {id: 2, image:'https://i2-prod.mirror.co.uk/incoming/article24665034.ece/ALTERNATES/s615b/1_MAIN_CHP_010821SLUG_6322.jpg',},
                {id: 3, image:'https://i2-prod.mirror.co.uk/incoming/article24665034.ece/ALTERNATES/s615b/1_MAIN_CHP_010821SLUG_6322.jpg',},
                {id: 4, image:'https://i2-prod.mirror.co.uk/incoming/article24665034.ece/ALTERNATES/s615b/1_MAIN_CHP_010821SLUG_6322.jpg',},
                {id: 5, image:'https://i2-prod.mirror.co.uk/incoming/article24665034.ece/ALTERNATES/s615b/1_MAIN_CHP_010821SLUG_6322.jpg',},
                {id: 6, image:'https://i2-prod.mirror.co.uk/incoming/article24665034.ece/ALTERNATES/s615b/1_MAIN_CHP_010821SLUG_6322.jpg',},
                ]"/> -->
        </div>
        <div class="spinner" v-else>
            <a-spin />
        </div>
    </ContainerComp>
</template>

<style scoped>
.profile-container{
    display: flex;
    flex-direction: column;
    padding: 20px 0;
}

.spinner{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 85vh;
}
</style>

