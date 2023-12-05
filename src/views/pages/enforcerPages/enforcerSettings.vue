<template>
    <div>
        <div>
            <div class="container-fluid mt-3 menu-container bg-light p-4 rounded">
    <h1 class="menu-title fs-2 fs-md-3">Profile</h1>
    <div class="d-flex align-items-center menu-user">
        <img :src="'http://192.168.0.108:8084/api/images/' + name.profile_pic" alt="User Avatar" style="max-width: 50px; max-height: 50px; border-radius: 50%;" />
        <span class="text-black ms-2 me-3">{{ name.nickname }}</span>
    </div>
    <hr class="my-3">
    <ul class="list-unstyled menu-list">
        <li class="menu-item">
            <a to="/enforcer/enforcerSettings" @click="openCollapse" class="text-decoration-none hover-btn fs-4 fs-md-5 nav-link cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg> Settings
            </a>
            <div class="collapse" id="collapseExample" :class="{show:showCollapse}">
                <button class="btn btn-primary nav-button fs-5 fs-md-6" @click="openModal">Change Profile</button>
                <button class="btn btn-primary nav-button fs-5 fs-md-6" @click="changepassModal">Change Password</button>
            </div>
        </li>
        <li class="menu-item">
            <a href="#" @click="logout" class="text-decoration-none nav-link fs-4 fs-md-5 hover-btn cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-power" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 6a7.75 7.75 0 1 0 10 0" /><path d="M12 4l0 8" /></svg> Log Out
            </a>
        </li>
    </ul>
</div>

        <!-- Assuming enforcerChangePicVue and enforcerChangePass are components that you want to render conditionally -->
    </div>
    <div v-if="showModal">
      <enforcerChangePicVue :show-modal="showModal" @close-modal="closeModal"/>
    </div>
    <div v-if="showChangePassModal">
      <enforcerChangePass :show-change-pass-modal="showChangePassModal" @close-change-pass-modal="closeChangePassModal"/>
    </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import enforcerChangePass from '@/components/modals/changePassModal.vue'
import enforcerChangePicVue from '@/components/modals/changeProfilePic.vue'
import AuthenticationService from '@/services/AuthenticationService';
import { useAuthStore } from '@/store';
import { useRouter } from 'vue-router';

const router = useRouter();


const users = localStorage.getItem('user');
const user = JSON.parse(users);
const name = ref('')
name.value = user

const showCollapse = ref(false)
const openCollapse = ()=>{
    showCollapse.value = !showCollapse.value
}
  
  const showModal = ref(false);
  const showChangePassModal = ref(false)

  const changepassModal = ()=>{
    showChangePassModal.value = true
  }
  const closeChangePassModal =()=>{
    showChangePassModal.value = false
  }
  const openModal = () => {
    showModal.value = true;
  };
  
  const closeModal = () => {
    showModal.value = false;
  };
  const logout = async ()=>{
try{  
    const authStore = useAuthStore();
    const response = await AuthenticationService.logout({id:name.value.id});
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
.cursor-pointer{
    cursor: pointer;
}
.hover-btn:hover{
  background-color: rgb(39, 41, 112);
  color: white;
}

</style>