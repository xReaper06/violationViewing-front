<template>        
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <a class="navbar-brand" href="#"><img
              src="@/assets/vevsLogo.png"
              class="img-fluid rounded float-start ms-5"
              alt="logo"
              height="70" width="70"
            /></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
    <!-- Add your navbar items here -->
    <ul class="navbar-nav ml-auto">
      <li class="nav-item me-5">
        <a class="nav-link" href="#" @click="logout"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-power" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 6a7.75 7.75 0 1 0 10 0" /><path d="M12 4l0 8" /></svg> Logout</a>
      </li>
    </ul>
  </div>
</nav>

<div class="container-fluid">
  <div class="row">
    <!-- Sidebar -->
    <nav class="col-md-2 d-none d-md-block sidebar">
      <div class="sidebar-sticky">
        <ul class="nav flex-column">
          <!-- Add your sidebar items here -->
          <li class="nav-item">
            <a class="nav-link active" href="#">
              <img :src="`http://192.168.0.108:8084/api/images/${name.profile_pic}`" class="img-fluid" style="width: 40px; height: 40px; border-radius: 50%;" alt="">
              {{ name.nickname }}
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" :class="{ 'active-link': isActive('/admin/adminDashboard') }" href="/admin/adminDashboard">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-report-analytics" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M9 17v-5" /><path d="M12 17v-1" /><path d="M15 17v-3" /></svg> Admin Panel
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="clickUsers" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>   Users
            </a>
            <div class="collapse" :class="{show:showUsers}" id="collapseExample">
                <a class="nav-link fs-6" :class="{ 'active-link': isActive('/admin/adminEnforcerList') }" href="/admin/adminEnforcerList">
              enforcer
            </a>
            <a class="nav-link fs-6" :class="{ 'active-link': isActive('/admin/adminUserList') }" href="/admin/adminUserList">
              user
            </a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="clickLicenseNav" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-id-badge-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 12h3v4h-3z" /><path d="M10 6h-6a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1 -1v-12a1 1 0 0 0 -1 -1h-6" /><path d="M10 3m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /><path d="M14 16h2" /><path d="M14 12h4" /></svg> License
            </a>
            <div class="collapse" :class="{show:showLicenseNav}" id="collapseExample">
                <a class="nav-link fs-6" :class="{ 'active-link': isActive('/admin/adminLicenseVerified') }" href="/admin/adminLicenseVerified">
              verified
            </a>
            <a class="nav-link fs-6" :class="{ 'active-link': isActive('/admin/adminLicenseNotVerified') }" href="/admin/adminLicenseNotVerified">
              not Verified
            </a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="clickViolationNav" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-alert-triangle-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 1.67c.955 0 1.845 .467 2.39 1.247l.105 .16l8.114 13.548a2.914 2.914 0 0 1 -2.307 4.363l-.195 .008h-16.225a2.914 2.914 0 0 1 -2.582 -4.2l.099 -.185l8.11 -13.538a2.914 2.914 0 0 1 2.491 -1.403zm.01 13.33l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -7a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z" stroke-width="0" fill="currentColor" /></svg>  Violations
            </a>
            <div class="collapse" :class="{show:showViolationNav}" id="collapseExample">
                <a class="nav-link fs-6" :class="{ 'active-link': isActive('/admin/adminViolationList') }" href="/admin/adminViolationList">
              Violation List
            </a>
            <a class="nav-link fs-6" :class="{ 'active-link': isActive('/admin/adminViolatorsList') }" href="/admin/adminViolatorsList">
              Violators List
            </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    </div>
    </div>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
      <div class="content">
        <router-view></router-view>
        </div>
      </main>
</template>

<script setup>
import {useAuthStore} from '@/store'
import AuthenticationService from '@/services/AuthenticationService'
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const users = localStorage.getItem('user')
const user = JSON.parse(users)
const name = ref('');
name.value = user
const showUsers = ref(false);
const showLicenseNav = ref(false);

const showViolationNav = ref(false);

const clickViolationNav = ()=>{
    showViolationNav.value = !showViolationNav.value
}

const clickLicenseNav = ()=>{
    showLicenseNav.value = !showLicenseNav.value
}

const clickUsers = ()=>{
    showUsers.value = !showUsers.value
}
  const router = useRouter();
  
  const isActive = (route) => router.currentRoute.value.path === route;

  const logout = async ()=>{
try{  
    const authStore = useAuthStore();
    const response = await AuthenticationService.logout({id:user.id});
    if(!response){
      console.log('Cannot Logout');
    }
    authStore.logOut()
    router.push('/')
}catch(err){
    console.error('Error Logout')
}
}

</script>

<style scoped>
.active-link {
    background-color: #312699;
    color: rgb(211, 194, 194);
  }
  template {
      padding-top: 56px; /* Adjust based on your navbar height */
    }

    .sidebar {
      position: fixed;
      top: 80px; /* Adjust based on your navbar height */
      left: 0;
      width: 250px;
      height: 100%;
      background-color: #343a40; /* Sidebar background color */
      padding-top: 20px;
    }

    .sidebar a {
      padding: 10px 15px;
      text-decoration: none;
      font-size: 18px;
      color: #fff; /* Sidebar text color */
      display: block;
    }

    .sidebar a:hover {
      background-color: #007bff; /* Sidebar hover color */
      color: #fff;
    }   
    .content {
      margin-left: 250px;
      padding-top: 100px;
      padding-right: 50px;
      width: 100%;
    }

    

</style>