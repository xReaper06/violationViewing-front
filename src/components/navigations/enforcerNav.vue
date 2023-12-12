<template>
    <div>
        <nav class="navbar bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">
            <img
              src="@/assets/vevsLogo.png"
              class="img-fluid rounded float-start ms-5"
              alt="logo"
              height="70" width="70"
            />
        </a>
  </div>
</nav>

<router-view></router-view>

<div>
  <nav class="navbar navbar-expand-lg fixed-bottom navbar-light bg-light">
    <div class="container-fluid">
        <!-- Navbar Brand (Logo) -->

        <!-- Responsive Navbar Content -->
                  <router-link           class="navbar-brand me-5 pe-1 ps-1 pt-1 pb-1 text-end sign-inbutton animate__animated"
       :class="{ 'active-link': isActive('/enforcer/enforcerDashboard') }" to="/enforcer/enforcerDashboard">
       <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M10 12h4v4h-4z" /></svg> Home
        </router-link>
                    <router-link    class="navbar-brand me-5 pe-1 ps-1 pt-1 pb-1 text-end sign-inbutton animate__animated" :class="{ 'active-link': isActive('/enforcer/operationHistory') }" to="/enforcer/operationHistory">
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-history" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 8l0 4l2 2" /><path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" /></svg> Operation History
                    </router-link>
                    <router-link           class="navbar-brand me-5 pe-1 ps-1 pt-1 pb-1 text-end sign-inbutton animate__animated" :class="{ 'active-link': isActive('/enforcer/enforcerSettings') }" to="/enforcer/enforcerSettings">
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg> Menu
                    </router-link>
    </div>
</nav>

</div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import AuthenticationServices from '@/services/AuthenticationService'
import {onMounted} from 'vue'
const users = localStorage.getItem('user');
const user = JSON.parse(users);


const router = useRouter();

const isActive = (route) => router.currentRoute.value.path === route;
const getEnforcerInfo = async()=>{
  try {
    const response = await AuthenticationServices.getEnforcerInfo({
      user_id:parseInt(user.id)
    })
    if(response){
      if(response.data.info.length >0){
        console.log('Info is not null')
      }else{
        router.push('/enforcer/enforcerInfo');
      }
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(()=>{
  getEnforcerInfo();
})

</script>

<style scoped>
.active-link {
    background-color: #312699;
    color: rgb(211, 194, 194);
  }
  .sign-inbutton {
  color: rgb(10, 1, 1);
  cursor: pointer;
}

.sign-inbutton:hover {
  color: rgb(218, 218, 226);
  border: solid 1px rgba(7, 6, 19);
  background-color: rgba(3, 3, 8);
}

</style>