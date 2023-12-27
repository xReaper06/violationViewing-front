<template>
    <div>
     
<div class="authentication mb-4">
  <!-- Bootstrap container -->
  <div class="container-fluid">

    <!-- Bootstrap card -->
    <div class="card mx-auto mt-5 registration shadow-lg text-center" style="max-width: 22rem;">

      <!-- Image -->
      <img src="@/assets/logovevs.png" alt="" class="mb-3" style="height: 75px; width: 75px; margin-left: 41%; margin-top: 10px;">
      <p style="font-size: 24px; font-weight: bold; text-align: center; color: #007BFF;">Forgot Password</p>

      <!-- Bootstrap form -->
      <form class="needs-validation" novalidate>

        <!-- Bootstrap container for v-text-field -->
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control pe-3 ps-3 ms-5" style="width: 75%;" id="email" v-model="email" placeholder="Enter Your Email...." required>
          <div class="invalid-feedback">
            Please provide a valid email.
          </div>
        </div>

        <!-- Error message -->
        <div class="text-danger mb-3">{{ error }}</div>

        <!-- Bootstrap card-actions -->
        <div class="card-actions">
          <!-- v-btn with Bootstrap classes -->
          <button type="submit" class="btn btn-success btn-block" :disabled="loading" @click="sendForgotPassword">
            <span v-if="!loading">Send Through Email</span>
            <span v-else>Loading...</span>
            <i class="mdi mdi-chevron-right"></i>
          </button>
        </div>

      </form> <!-- end form -->

      <!-- v-divider -->
      <hr class="my-4">

      <!-- Additional content -->
      <div class="pb-3">
        <!-- v-card-actions -->
        <div class="card-actions text-center">
          <!-- router-link with Bootstrap classes -->
          <router-link to="/main/login" class="btn btn-primary">Sign in Account</router-link>
        </div>
      </div>

    </div> <!-- end card -->

  </div> <!-- end container -->

</div> <!-- end authentication div -->

    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'

const email = ref('');
const msg = ref('')

const sendForgotPassword = async()=>{
    try {
        const response = await axios.post('http://localhost:8084/api/forgot-password',{
            email:email.value
        })
        if(response){
            email.value = null;
            msg.value = response.data.msg;
        }else{
            msg.value = response.data.msg;
        }
    } catch (error) {
        console.log(error)
    }
}

</script>

<style scoped>

</style>