<script setup>
import {RouterLink, useRouter} from "vue-router"
import ContainerComp from "./ContainerComp.vue"
import {ref, computed, onMounted} from "vue"
import AuthModal from "./AuthModal.vue";
import {useUserStore} from "../stores/usersStore"
import { storeToRefs } from "pinia";
import { supabase } from '../supabase';

// -------------------------------------------

    const countries = ref([])


    const fetchUsers = async ()=>{

      const {data: usernames} = await supabase.from("users").select("username")

      countries.value = usernames
    }

    onMounted(() => {

    fetchUsers()

    })

// -------------------------------------------
  
//   let searchTerm = ref('')
  
  const searchCountries = computed(() => {
    if (searchField.value === '') {
      return []
    }
  
    let matches = 0
  
    return countries.value.filter(country => {
      if (country.username.toLowerCase().includes(searchField.value.toLowerCase()) && matches < 10) {
        matches++
        return country
      }
    })
  });

//   const selectCountry = (country) => {
//     selectedCountry.value = country
//     searchTerm.value = ''
//   }

  const addToInput = (item) => {
      searchField.value = item;
    };




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

    <!-- <ul
          v-if="searchCountries.length"
          class="w-full rounded bg-white border border-gray-300 px-4 py-2 space-y-1 absolute z-10"
        > -->
        
        <div v-if="searchCountries.length" class="dropdown-menu">
            <ul
            
            >
            <!-- <li class="px-1 pt-1 pb-2 font-bold border-b border-gray-200">
                Showing {{ searchCountries.length }} of {{ countries.length }} results
            </li> -->
            <!-- <li
                v-for="country in searchCountries"
                :key="country.name"
                @click="selectCountry(country.username)"
                class="cursor-pointer hover:bg-gray-100 p-1 list-none"
                > -->
                <!-- <li
                    v-for="country in searchCountries"
                    :key="country.name"
                    class="cursor-pointer hover:bg-gray-100 p-1 list-none"
                    > -->
                    <li
                    v-for="country in searchCountries"
                    :key="country.name"
                    @click="addToInput(country.username)"
                    >
                    {{ country.username }}
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