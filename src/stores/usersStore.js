import { ref } from 'vue'
import { defineStore } from 'pinia'
import {supabase} from "../supabase"

export const useUserStore = defineStore('users', () => {
  
  const user = ref(null)

  const errorMessage = ref("")

  const loading = ref(false)

  const loadingUser = ref(false)

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async (credentials)=>{

    const {email, password} = credentials

    if(!validateEmail(email)){
      return errorMessage.value = "Email is invalid!"
    }

    if(!password.length){
      return errorMessage.value="Password cannot be empty!."
    }

    loading.value = true

    const {error, data} = await supabase.auth.signInWithPassword({
      email, password
    })

    if(error){
      loading.value = false
      return errorMessage.value = error.message
    }


    const {data: loggedInUser} = await supabase
    .from("users")
    .select()
    .eq("email", email)
    .single() 

    user.value={ 
      email: loggedInUser.email,
      username: loggedInUser.username,
      id: loggedInUser.id
    }

    loading.value = false

    errorMessage.value=""
  }
 
  const handleSignup = async (userCredentials)=>{
    const {email, password, username} = userCredentials
    
    if(username.length < 4){
      return errorMessage.value = "Username should be more than 4 characters!"
    }
    
    if(!validateEmail(email)){
      return errorMessage.value = "Email is invalid!"
    }

    if(password.length < 6){
      return errorMessage.value = "Password should be more than 6 characters!"
    }

    
    loading.value = true

    //step 1.......... VALIDATE IF USER EXISTS first to prevent dual registration
    const {data: usernameAlreadyExists} = await supabase
    .from("users")
    .select()
    .eq("username", username)
    .single()

    if(usernameAlreadyExists){
      loading.value = false
      return errorMessage.value="User already regsitered!"
    }

    //clear error message in modal
    errorMessage.value=""

    //step 2.......... create user authentication in supabase authetication
    const {data, error} = await supabase.auth.signUp({email,password})
    if(error){
      loading.value = false
      return errorMessage.value = error.message
    }

    //step 3.......... take data from user authentication response and create/push user into database in supabase
    await supabase.from("users").insert({
      username,
      email
    })

    const {data: newUser} = await supabase
    .from("users")
    .select()
    .eq("email", email)
    .single()

    user.value = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username
    }

    loading.value = false
  }

  const handleLogout = async ()=>{
    await supabase.auth.signOut()
    user.value=null
  }

  const getUser = async ()=>{ 
    loadingUser.value = true
    const {data} = await supabase.auth.getUser()

    if(!data.user){
      loadingUser.value = false
      return user.value= null 
    } 

    const {data: getUserWithEmail} = await supabase
    .from("users")
    .select()
    .eq("email", data.user.email)
    .single()

    user.value={
      username: getUserWithEmail.username,
      email: getUserWithEmail.email,
      id: getUserWithEmail.id
    }

    loadingUser.value = false
  }

  const clearErrorMessage =()=>{
    errorMessage.value=""
  }

  return { user, loading, loadingUser, errorMessage, handleLogin, handleSignup, handleLogout, getUser , clearErrorMessage}
})
