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
    <a-layout-header>
        <ContainerComp> 
            <div class="nav-container">
                <div class="left-content">
                    <RouterLink to="/"> Vinstagram</RouterLink>
                    <a-input-search
                    v-model:value="searchField"
                    placeholder="search username..."
                    style="width: 200px"
                    @search="onSearch"
                    />
                </div>
                
                <div class="content" v-if="!loadingUser">
                    <div class="right-content" v-if="!user">
                    <AuthModal :isLogin="false"/>
                    <AuthModal :isLogin="true"/>
                    </div>
                    <div class="right-content" v-else>
                        <a-button type="primary" @click="goToUsersProfile">Profile</a-button>
                        <a-button @click="handleLogout" type="primary">LogOut</a-button>
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
        margin-right: 10px;
    }

    .right-content{
        display: flex;
        align-items: center;
    }

    .right-content button{
        margin: 5px;
    }
</style>