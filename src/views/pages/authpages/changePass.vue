<template>
    <div>
        <div class="authentication mb-5">
  <!-- Bootstrap container -->
  <div class="container-fluid px-3">
  
    <!-- Bootstrap card -->
    <div class="card mx-auto mt-3 registration shadow-lg text-center" style="max-width: 344px;">
      
      <!-- Image -->
      <img src="@/assets/logovevs.png" alt="" class="mb-3" style="height: 75px; width: 75px; margin-left: 41%; margin-top: 10px;">
      
      <!-- Title -->
      <p style="font-size: 24px; font-weight: bold; text-align: center; color: #007BFF;">NEW PASSWORD</p>

      <!-- Bootstrap form -->
      <form @submit.prevent="handleChangePassword" class="needs-validation" novalidate>

        <!-- Bootstrap container for v-text-field -->
        <div class="container">

          <!-- v-text-field for password -->
          <div class="form-group mb-3">
            <label for="password">New Password</label>
            <input type="password" class="form-control" id="password" v-model="password" placeholder="Enter your password" required @keyup="isStrongPassword">
            <div class="text-error" v-if="passmsgVisible">
              {{ passmsg }}
            </div>
          </div>

          <!-- v-text-field for confirm password -->
          <div class="form-group">
            <label for="confirm_password">Confirm New Password</label>
            <input type="password" class="form-control" id="confirm_password" v-model="confirm_password" placeholder="Enter your password" required>
          </div>

        </div>

        <!-- Error message -->
        <div class="text-danger mb-3">{{ error }}</div>

        <!-- Bootstrap card-actions -->
        <div class="card-actions">
          <!-- v-btn with Bootstrap classes -->
          <button type="submit" class="btn btn-success btn-block" :disabled="loading">
            <span v-if="!loading">Submit New Password</span>
            <span v-else>Loading...</span>
            <i class="mdi mdi-chevron-right"></i>
          </button>
        </div>

      </form> <!-- end form -->

      <!-- v-divider -->
      <hr class="my-4">

    </div> <!-- end card -->

  </div> <!-- end container -->

</div> <!-- end authentication div -->

    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute,useRouter } from "vue-router";

const confirm_password = ref('');
const password = ref('');
const token = ref('')
const msg = ref('')
const route = useRoute();
const router = useRouter();
token.value = route.params.token;

const isStrongPassword = (password) => {
  // Define your criteria for a strong password
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  // Check if the password meets the criteria
  return (
    password.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber
  );
};

const handleChangePassword = async()=>{
    if(confirm_password.value !== password.value){
        msg.value ='Password doesnt Match'
    }else if (!isStrongPassword(password.value)) {
    msg.value = 'Password is not strong enough';
  } else {

    const headers = {
            'Content-Type': 'application/json', // Specifies the content type as JSON
            'Authorization': `Bearer ${token.value}`, // An example of an authorization header
            'X-Custom-Header': 'CustomValue', // A custom header with a custom value
        };
    
        const config = { headers }
        try {
            const response = await axios.post('http://192.168.0.108:8084/api/change-forgot-password',{
                password:password.value
            },config);
            if(response){
                console.log(response.data);
                router.push('/main/login');
            }
            console.log(response.data.msg);
        } catch (error) {
            console.log(error)
        }
    }
}


</script>

<style scoped>

</style>