<script setup>
import SingleCard from './SingleCard.vue';
import Observer from "./Observer.vue"
import { useUserStore } from '../stores/usersStore';
import { storeToRefs } from 'pinia';
import { supabase } from '../supabase';
import { onMounted, ref } from 'vue';


const userStore = useUserStore()

const {user: loggedInUser} = storeToRefs(userStore)

const followings_posts = ref([])

const lastPostIndex = ref(20)

const owner_ids = ref([])

const reachEnd = ref(false)


// const data = [
//     {
//         id:1,
//         username:"Nacho",
//         url:"https://cdns-images.dzcdn.net/images/artist/1d13e590f0ed6d4e021c338809fe0d34/500x500.jpg",
//         caption: "",
//     },
//     {
//         id:2,
//         username:"Baby",
//         url:"https://images.prismic.io/aliciakeys/9e8251ce-9d86-478e-a4ef-e1c2cdd02284_ak_lala4.jpg?auto=compress,format&rect=0,0,3000,2386&w=2500&h=1988",
//         caption: "hello Guys",
//     },
//     {
//         id:3,
//         username:"Swizz",
//         url:"https://hips.hearstapps.com/hmg-prod/images/alicia_keys_michael_muller_nbc_nbcu_getty_images_592222308_profile.jpg?resize=1200:*",
//         caption: "Its getting hot in here.",
//     },
//     {
//         id:4,
//         username:"Snoopy",
//         url:"https://img-3.journaldesfemmes.fr/gKlPpvk6Cuw6byGSvuZkeHd5mwI=/2874x/smart/14edad96da374381ab8dde9c4ddcb05b/ccmcms-jdf/10323876.jpg",
//         caption: "happy easter",
//     },
// ]


const fetchData = async ()=>{
    const {data: followings} = await supabase.from("followers_following").select("following_id").eq("follower_id", loggedInUser.value.id)

    owner_ids.value = followings?.map(f => f.following_id)

    const {data} = await supabase.from("posts").select().in("post_owner_id", owner_ids.value).range(0,lastPostIndex.value).order("created_at", {ascending: false})

    followings_posts.value = data
}

const fetchNextSetOfTimelinePost = async () =>{
    if(!reachEnd.value){
        const {data} = await supabase.from("posts").select().in("post_owner_id", owner_ids.value).range(lastPostIndex.value + 1, lastPostIndex.value + 20).order("created_at", {ascending: false})
    
    followings_posts.value = [
        ...followings_posts.value,
        ...data
    ]
    

    lastPostIndex.value = lastPostIndex.value + 20
    
    if(!data.length){
        reachEnd.value = true
    }
}
}

onMounted(()=>{
    fetchData()
})

</script>

<template>
            <div v-if="loggedInUser" class="timeline-container">
                <SingleCard v-for="post in followings_posts" :key="post.id" :post="post"/>
            </div>
            <Observer v-if="followings_posts.length"  @intersecting="fetchNextSetOfTimelinePost"/>
            <!-- <div v-else class="timeline-container">
                <h3>Kindly login to see your timeline</h3>
            </div>        -->
</template>

<style scoped>
.timeline-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
}
</style>