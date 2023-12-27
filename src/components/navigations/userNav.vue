<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="@/assets/vevsLogo.png" alt="" class="img-fluid rounded float-start sm-5 ms-5" height="70" width="70"/>
        </a>
        <button
          class="navbar-toggler btn btn-dark bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="clickshowCollapse"
        >
          <span class="navbar-toggler-icon text-light"></span>
        </button>
        <div class="collapse navbar-collapse" :class="{ show:showCollapse }" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item" :class="{ 'active-link': isActive('/user/userDashboard') }">
              <router-link to="/user/userDashboard" class="nav-link text-white"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg> Home</router-link>
            </li>
            <li class="nav-item" :class="{ 'active-link': isActive('/user/myLicense') }">
              <router-link to="/user/myLicense" class="nav-link text-white"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-id-badge-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 12h3v4h-3z" /><path d="M10 6h-6a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1 -1v-12a1 1 0 0 0 -1 -1h-6" /><path d="M10 3m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /><path d="M14 16h2" /><path d="M14 12h4" /></svg> My License</router-link>
            </li>
            <li class="nav-item" :class="{ 'active-link': isActive('/user/violations') }">
              <router-link to="/user/violations" class="nav-link text-white"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-alert-triangle-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 1.67c.955 0 1.845 .467 2.39 1.247l.105 .16l8.114 13.548a2.914 2.914 0 0 1 -2.307 4.363l-.195 .008h-16.225a2.914 2.914 0 0 1 -2.582 -4.2l.099 -.185l8.11 -13.538a2.914 2.914 0 0 1 2.491 -1.403zm.01 13.33l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -7a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z" stroke-width="0" fill="currentColor" /></svg> Violations</router-link>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto me-5 pe-3">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle text-white"
                @click="clickShowNav"
                href="#"
                role="button"
                aria-expanded="false"
              >
                <img :src="`http://localhost:8084/api/images/${name.profile_pic}`" alt="" class="img-fluid" style="height: 50px; width: 50px; border-radius: 50%;" >
                {{ name.nickname }}
              </a>
              <ul class="dropdown-menu" :class="{ show: showNav }">
                <li><router-link class="dropdown-item" to="/user/userSettings"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg> Settings</router-link></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" @click="logout"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-power" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 6a7.75 7.75 0 1 0 10 0" /><path d="M12 4l0 8" /></svg>Log Out</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <div class="h-auto m-5 margin">
    <router-view></router-view>
  </div>

  <hr class="my-4 mt-5 text-dark">
      <footer class="app-footer text-dark">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h4>Contact Us</h4>
            <p>Email: info@vevs-app.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
          <div class="col-md-6">
            <h4>Follow Us</h4>
            <!-- Add your social media icons or links here -->
            <div class="social-icons">
              <a href="#" target="_blank" class="icon-link"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-facebook" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg></a>
              <a href="#" target="_blank" class="icon-link"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-twitter" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" /></svg></a>
              <a href="#" target="_blank" class="icon-link"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-instagram" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16.5 7.5l0 .01" /></svg></a>
            </div>
          </div>
        </div>
        <hr class="my-4">
        <div class="text-center pb-4">
          <p>&copy; 2023 VEVS-APP. All rights reserved.</p>
        </div>
      </div>
    </footer>
</template>

<script setup>
// eslint-disabled
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store';
import AuthenticationService from '@/services/AuthenticationService';

    const router = useRouter();
    const user = ref('');
    const name = ref('');
    const username = ref('');
    
    
    const showNav = ref(false);
    const showCollapse = ref(false);
    
      user.value = localStorage.getItem('user');
      username.value = JSON.parse(user.value);
      name.value = username.value;
      
    const id = ref()

const logout = async ()=>{
try{  
    const authStore = useAuthStore();
    id.value = JSON.parse(user.value)
    const response = await AuthenticationService.logout({id:id.value.id});
    if(!response){
      console.log('Cannot Logout');
    }
    authStore.logOut()
    router.push('/')
}catch(err){
    console.error('Error Logout')
}
}


const clickshowCollapse = ()=>{
  showCollapse.value = !showCollapse.value
}


const clickShowNav = () => {
  showNav.value = !showNav.value;
};
const isActive = (route) => router.currentRoute.value.path === route;

</script>

<style scoped>
/* You can add custom styles here if needed */
.active-link {
  background-color: #341442;
}
.nav-link:hover{
  background-color: rgb(22, 21, 21);
}
.dropdown-item:hover{
  background-color: rgb(22, 21, 21);
  color: white;
}
.margin{
  padding-bottom: 50px;
}
</style>
