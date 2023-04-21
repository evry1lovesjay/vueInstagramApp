<script setup>
import ContainerComp from './ContainerComp.vue';
import Cards from "./Cards.vue"
import LogInMessage from "./LogInMessage.vue"
import { useUserStore } from '../stores/usersStore';
import { storeToRefs } from 'pinia';


const userStore = useUserStore()

const {user: loggedInUser, loadingUser} = storeToRefs(userStore)

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


</script>

<template>
    <ContainerComp>
        <div v-if="!loadingUser">
            
            <!-- <div v-if="loggedInUser" class="timeline-container">
                <SingleCard v-for="post in data" :key="post.id" :post="post"/>
            </div> -->

            <Cards v-if="loggedInUser"/>
            <LogInMessage v-else/>
        </div>

        <div v-else class="spinner">
            <a-spin/>
        </div>
    </ContainerComp>
</template>

<style scoped>
.timeline-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
}

.spinner{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90vh;
}
</style>

