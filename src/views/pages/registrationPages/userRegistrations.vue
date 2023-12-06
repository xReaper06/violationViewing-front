<template>
    <div>
        <div class="authentication">
    <!-- Success Alert -->
    <div v-if="success" class="alert alert-success mt-5" role="alert">
      {{ msg }}
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="alert alert-danger mt-5" role="alert">
      {{ msg }}
    </div>

    <!-- Main Content -->
    <div class="container-fluid mt-3 pa-3">
      <div class="mx-auto mt-5 registration elevation-16 text-center" style="max-width: 344px;">
        <img src="@/assets/logovevs.png" alt="" style="height: 75px; width: 75px;">
        <p style="font-size: 24px; font-weight: bold; text-align: center; color: #007BFF;">SIGN UP ACCOUNT</p>

        <!-- Registration Form -->
        <form @submit.prevent="userRegistration">
          <div class="mb-3">
            <label for="nickname" class="form-label">Nickname</label>
            <input type="text" id="nickname" v-model="nickname" placeholder="Enter your Nickname" class="form-control" required @keyup="checkNickname">
            <div class="text-error" v-if="nicknameHasSpaces">
              <span>{{ nicknameMsg }}</span>
            </div>
            <div class="invalid-feedback">
      Please provide a nickname.
    </div>
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" v-model="email" placeholder="Enter your Email" class="form-control" required>
            <div class="invalid-feedback">
      Please provide a email.
    </div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" v-model="password" class="form-control" placeholder="Enter your password" required @keyup="isStrongPassword">
            <div class="text-error" v-if="passmsgVisible">
              {{ passmsg }}
            </div>
            <div class="invalid-feedback">
      Please provide a password.
    </div>
          </div>

          <div class="mb-3">
            <label for="confirm_password" class="form-label">Confirm Password</label>
            <input type="password" id="confirm_password" v-model="confirm_password" class="form-control" placeholder="Confirm your password" required>
            <div class="invalid-feedback">
      Please provide a confirm password.
    </div>
          </div>

          <div class="form-check mb-3">
      <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
      <label class="form-check-label" for="invalidCheck">
        Agree to terms and conditions
      </label>
      <div class="invalid-feedback">
        You must agree before submitting.
      </div>
    </div>
          <!-- Submit Button -->
          <div class="d-grid">
            <button type="submit" class="btn btn-primary">
              <span v-if="!loading"> <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M16 19h6" /><path d="M19 16v6" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /></svg> Sign up</span>
              <span v-else>Loading...</span>
              <i class="mdi mdi-chevron-right"></i>
            </button>
          </div>
        </form>

        <!-- Divider -->
        <hr class="my-4">

        <!-- Existing Account Link -->
        <div class="pb-3">
          <div class="align-center">
            I already have an
            <router-link to="/main/login" class="text-center btn btn-link" style="color: #198754;">Account</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
</template>

<script setup>
import router from '@/router';
import AuthenticationService from '@/services/AuthenticationService';
import { ref } from 'vue';

    const nickname = ref('');
    const email = ref('')
    const password = ref('');
    const confirm_password = ref('');
    const msg = ref(null);
    const loading = ref(false)
    const passmsg = ref(null)
    const passmsgVisible = ref(false);
    const nicknameHasSpaces = ref(false);
    const nicknameMsg = ref(null);
    const error = ref(false);
    const success = ref(false);

    const checkNickname = () => {
      if(nickname.value.includes(' ')){
        nicknameHasSpaces.value = true;
        nicknameMsg.value = "Please Remove the spaces";
      }else if(nickname.value == ''){
        nicknameHasSpaces.value = false;
      }else{
        nicknameHasSpaces.value = false;
      }
     
    };

    const isStrongPassword = () => {
  // Define your criteria for a strong password
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password.value);
  const hasLowercase = /[a-z]/.test(password.value);
  const hasNumber = /\d/.test(password.value);

  // Check if the password meets the criteria
  if (
    password.value.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber
  ){
    passmsgVisible.value = false;
    passmsg.value = "Password is Strong";
  } else if(password.value == ''){
    passmsgVisible.value = false;
  } else {
    passmsgVisible.value = true;
    passmsg.value = "Password is Weak";
  }
};

    const userRegistration = async ()=>{
      loading.value = true;
      if (password.value !== confirm_password.value) {
        msg.value = "Password doesn't match";
        loading.value = false;
      } else {
        try {
          if(email.value === '' || nickname.value === '' || password.value === '' || confirm_password.value === ''){
            msg.value = 'Empty Inputs';
        loading.value = false;
          }else{
            const response = await AuthenticationService.userRegistration({
              nickname:nickname.value,
              email:email.value,
              password:password.value
            });
            if(response){
              setTimeout(() => {
                email.value= ''
                nickname.value = '';
                password.value = '';
                confirm_password.value = '';
                success.value = true;
                msg.value = response.data.msg; // Set success message
              },2000)
          router.push(`/main/verificationPage/${response.data.Token}`);
            }
          }
        } catch (err) {
          console.error(err);
          error.value = true
          msg.value = err.response.data.msg;
        loading.value = false;
        }
      }
    }

</script>

<style scoped>

</style>