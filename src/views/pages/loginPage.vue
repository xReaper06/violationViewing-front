<!-- eslint-desabled -->
<template>
  <div>
    <div class=" authentication">
     
        <!-- Error Alert -->
        <div v-if="error" class="alert alert-danger" role="alert">
          {{ error }}
        </div>

        <!-- Main Content -->
        <div class="container-fluid pa-3">
          <div
            class="mx-auto mt-5 registration elevation-16 text-center"
            style="max-width: 344px"
          >
            <img
              src="@/assets/logovevs.png"
              alt=""
              style="height: 75px; width: 75px"
            />
            <p
              style="
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                color: #007bff;
              "
            >
              SIGN IN YOUR ACCOUNT
            </p>

            <!-- Login Form -->
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  v-model="email"
                  placeholder="Enter your email"
                  class="form-control"
                  id="email"
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  placeholder="Enter your password"
                />
              </div>

              <!-- Submit Button -->
              <div class="d-grid">
                <button type="submit" class="btn btn-primary">
                  <span v-if="!loginloading"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-login-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" /><path d="M3 12h13l-3 -3" /><path d="M13 15l3 -3" /></svg> Sign in</span>
                  <span v-else>Loading...</span>
                  <i class="mdi mdi-chevron-right"></i>
                </button>
              </div>
            </form>

            <!-- Divider -->
            <hr class="my-4" />

            <!-- Create Account Link -->
            <div class="text-center">
              Create an Account
              <router-link to="/main/registration" class="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M16 19h6" /><path d="M19 16v6" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /></svg> Sign Up</router-link>
            </div>

            <!-- Forgot Password Button -->
            <div class="pt-3">
              <button class="btn btn-link">
                <router-link
                  to="/main/forgotPass"
                  class="button3"
                  style="text-decoration: none"
                  >Forgot Password</router-link
                >
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import AuthenticationService from '@/services/AuthenticationService';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/index.js';
import { ref } from 'vue';
import { onMounted } from 'vue';

    const email = ref('')
    const password = ref('')
    const error = ref('')
    const loginloading = ref(false)
    const routes = useRouter();
    const user = ref('')

    const getUser = localStorage.getItem('user');
    user.value = JSON.parse(getUser)

    const handleLogin = async () => {
      if (email.value === '' || password.value === '') {
        error.value = 'Fill in Empty Inputs'
      } else {
        // Simulate an asynchronous login operation (replace this with your actual login logic)
        let response;
        try {
           response = await AuthenticationService.login({
            email: email.value,
            password: password.value,
          });
          loginloading.value = true;
          error.value = '';
          setTimeout(() => {
      
              if (response.data.user.flag == 2) {
                routes.push('/accountDeleted');
              }else if(response.data.user.flag == 0){
                routes.push('/temporaryLock');
              }else if(response.data.user.email_verified == null){
                routes.push(`/main/verifyAccount/${response.data.accessToken}`)
              }else{
                const authStore = useAuthStore()
                // Set the user and token
                authStore.setUser(response.data.user); // Assuming the user data is in response.data.user
                authStore.setTokens(response.data.accessToken, response.data.refreshToken)
                if (response.data.user.user_role == 'user') {
                  routes.push('/user/userDashboard');
                } else if (response.data.user.user_role == 'enforcer') {
                  routes.push('/enforcer/enforcerDashboard');
                } else if (response.data.user.user_role == 'admin') {
                  routes.push('/admin/adminDashboard')
                } else {
                  loginloading.value = false; // Reset loading to false
                }
              }
  
        }, 1000);
        } catch (err) {
          loginloading.value = true; // Reset loading to false
          setTimeout(() => {    
            error.value = err.response.data.msg
            loginloading.value = false; // Reset loading to false
          }, 1000);
        }
      }
    }

    const backtoDashboard = () => {
      try {
        if (user.value !== '') {
          if (user.value.user_role === 'user') {
            routes.push('/user/userDashboard');
          } else if (user.value.user_role == 'enforcer') {
            routes.push('/enforcer/enforcerDashboard');
          } else if (user.value.user_role == 'admin') {
            routes.push('/admin/adminDashboard')
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    onMounted(() => {
      backtoDashboard();
    })
</script>

<style scoped></style>
