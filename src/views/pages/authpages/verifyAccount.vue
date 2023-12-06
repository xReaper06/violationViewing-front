<template>
    <div>
        <div>
            
<div class="authentication">

<!-- v-alert -->
<div v-if="error" class="alert alert-danger">
  {{ error }}
</div>

<!-- v-container -->
<div class="container-fluid mt-3 pt-5 px-3">

  <!-- v-card -->
  <div class="card mx-auto pt-5 mt-5 registration shadow-lg text-center" style="max-width: 344px;">

    <!-- Image -->
    <img src="@/assets/logovevs.png" alt="" class="mb-3" style="height: 75px; width: 75px; margin-left: 41%; margin-top: 10px;">

    <!-- Title -->
    <p class="font-weight-bold" style="font-size: 24px; color: #007BFF;">Account is Not verified</p>

    <!-- v-container for button -->
    <div class="container">
      <button class="btn btn-primary btn-block" @click="sendEmailtoVerify">Send to your Email</button>
    </div>

    <!-- v-divider -->
    <hr class="my-4">

    <!-- v-container for logout button -->
    <div class="container">
      <!-- v-card-actions -->
      <div class="card-actions mb-3">
        <!-- v-btn with Bootstrap classes -->
        <router-link to="/main/login">
        <button class="btn btn-danger btn-block">
            Sign in
          </button>
        </router-link>
        </div>
      </div>

  </div> <!-- end v-card -->

</div> <!-- end v-container -->

</div> <!-- end authentication div -->
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import {ref} from 'vue'
import axios from 'axios';

const token = ref('')

const router = useRouter();
const routes = useRoute();
token.value = routes.params.token;

const sendEmailtoVerify = async()=>{
  const headers = {
            'Content-Type': 'application/json', // Specifies the content type as JSON
            'Authorization': `Bearer ${token.value}`, // An example of an authorization header
            'X-Custom-Header': 'CustomValue', // A custom header with a custom value
        };
        const config = { headers }

    try {
        const response = await axios.post('http://localhost:8084/api/sendEmailtoVerify',{},config)
        if(response){
            console.log(response.data.msg)
            router.push('/main/login')
        }
    } catch (error) {
        console.log(error)
    }
}



</script>

<style  scoped>

</style>