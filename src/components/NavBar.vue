<script setup>
import {RouterLink, useRouter} from "vue-router"
import ContainerComp from "./ContainerComp.vue"
import {ref} from "vue"
import AuthModal from "./AuthModal.vue";
import {useUserStore} from "../stores/usersStore"
import { storeToRefs } from "pinia";


const userStore = useUserStore()

const {user, loadingUser} = storeToRefs(userStore)

const router = useRouter()

const searchField = ref("")

// const isAuthenticated = ref(false)

const onSearch = () =>{
    if(searchField.value){
        router.push(`/profile/${searchField.value.toLowerCase()}`)
        searchField.value =""
    }
}

const handleLogout= async ()=>{
    await userStore.handleLogout()
}

const goToUsersProfile = ()=>{
    router.push(`/profile/${user.value.username}`)
}
</script>

<template>
    <a-layout-header class="a-layout-header">
        <ContainerComp> 
            <div class="nav-container">
                <div class="left-content">
                    <RouterLink to="/" class="main-title"> Vinstagram</RouterLink>
                    <RouterLink to="/" class="sub-title"> VN</RouterLink>
                    <a-input-search class="a-input-search"
                    v-model:value="searchField"
                    placeholder="search username..."
                    
                    @search="onSearch"
                    />
                </div>
                
                <div class="content" v-if="!loadingUser">
                    <div class="right-content" v-if="!user">
                    <AuthModal :isLogin="false"/>
                    <AuthModal :isLogin="true"/>
                    </div>
                    <div class="right-content" v-else>
                        <a-button class="navbar-btn" type="primary" @click="goToUsersProfile">Profile</a-button>
                        <a-button class="navbar-btn" @click="handleLogout" type="primary">LogOut</a-button>
                    </div>
                </div>
                
            </div>
        </ContainerComp>
    </a-layout-header>
</template>

<style scoped>
    .content{
        display: flex;
        align-items: center;
    }
    .nav-container{
        display: flex;
        justify-content:space-between;
    }

    .left-content{
        display: flex;
        align-items: center;
    }

    .left-content a{
        margin: 0 15px 0 15px ;
    }

    .right-content{
        display: flex;
        align-items: center;
    }

    .right-content button{
        margin: 7px;
        /* padding: 0 8px; */
    }

    .a-input-search{
            width: 200px;
        }

    .main-title, .sub-title{
        font-weight: 700;
    }

    .a-layout-header{
            padding: 0 0;
        }

    @media screen and (max-width: 768px){
        .main-title{
            display: none;
        }

        .a-layout-header{
            padding: 0 0;
        }

        .a-input-search{
            width: 150px;
        }

        .right-content button{
        margin: 7px;
        padding: 0 9px;
        }
    }

    @media screen and (max-width: 480px){
        .main-title{
            display: none;
        }

        .a-layout-header{
            padding: 0 0;
        }

        .a-input-search{
            width: 130px;
        }

        .right-content button{
        margin: 7px;
        padding: 0 9px;
        }
    }

    @media screen and (min-width: 768px){
        .sub-title{
            display: none;
        }

        
    }
</style>