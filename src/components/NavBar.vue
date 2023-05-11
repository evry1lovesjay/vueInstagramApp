<script setup>
import {RouterLink, useRouter} from "vue-router"
import ContainerComp from "./ContainerComp.vue"
import {ref, computed, onMounted} from "vue"
import AuthModal from "./AuthModal.vue";
import {useUserStore} from "../stores/usersStore"
import { storeToRefs } from "pinia";
import { supabase } from '../supabase';

// -------------------------------------------

    const users = ref([])

    const userStore = useUserStore()

    const {user, loadingUser} = storeToRefs(userStore)

    const router = useRouter()

    const searchField = ref("")

    // const isAuthenticated = ref(false)


    const fetchUsers = async ()=>{

      const {data: usernames} = await supabase.from("users").select("username").limit(100)

      users.value = usernames
    }

    onMounted(() => {

    fetchUsers()

    })

// -------------------------------------------
  
//   let searchTerm = ref('')
  
  const searchUsers = computed(() => {
    if (searchField.value === '') {
      return []
    }
  
    let matches = 0
  
    return users.value.filter(user => {
      if (user.username.toLowerCase().includes(searchField.value.toLowerCase()) && matches < 10) {
        matches++
        return user
      }
    })
  });

  const addToInput = (item) => {
      searchField.value = item;
      router.push(`/profile/${searchField.value.toLowerCase()}`)
      searchField.value =""
    };


const onSearch = (event) =>{

    if(searchField.value){
        router.push(`/profile/${searchField.value.toLowerCase()}`)
        searchField.value =""
    }
}

// const handleSearchField = (event) => {
//       searchField.value = event.target.value;
//     };

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
                <!-- <div class="left-content">
                    <RouterLink to="/" class="main-title"> Vinstagram</RouterLink>
                    <RouterLink to="/" class="sub-title"> VN</RouterLink>
                    <a-input-search class="a-input-search"
                    placeholder="search username..."
                    v-if="user"
                    @input="handleSearchField"
                    :value="searchField"
                    />
                </div> -->

                <div class="left-content">
                    <RouterLink to="/" class="main-title"> Vinstagram</RouterLink>
                    <RouterLink to="/" class="sub-title"> VN</RouterLink>
                    <a-input-search class="a-input-search"
                    v-model:value="searchField"
                    placeholder="search username..."
                    v-if="user"
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

        
        <div v-if="searchUsers.length" class="dropdown-menu">
            <ul>
                    <li
                    v-for="user in searchUsers"
                    :key="user.name"
                    @click="addToInput(user.username)"
                    >
                    {{ user.username }}
                </li>
            </ul>
        </div>


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


    /* Style the user list */

    .dropdown-menu {
  position: absolute; /* or position: fixed; */
  top: 64px;
  left: 20%;
  z-index: 9999; /* set a high z-index to ensure the dropdown is displayed above other content */
  min-width: 60%; /* set a minimum width for the dropdown */
  padding: 8px;
  background-color: #fff;
  border: 1px solid #0b79e0;
  border-radius: 0px 0px 10px 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  /* list-style: none; */
  padding: 8px;
  border-bottom: 1px solid #eee;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #f9f9f9;
}


</style>