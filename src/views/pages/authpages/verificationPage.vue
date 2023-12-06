<template>
    <div>
        <div class="container">
  <div class="row justify-content-center">
    <div class="col-md-6 mt-5">
      <!-- Add 'card-deck' class for responsive card layout -->
      <div class="card-deck mt-5">
        <div class="card">
          <div class="card-body">
            <img
              src="@/assets/logovevs.png"
              alt=""
              style="height: 75px; width: 75px"
            />
            <h2 class="text-center">Account Verification</h2>
            <form @submit.prevent="handleVerificationEmail">
              <div class="otp-input-container d-flex justify-content-center">
                <input v-model="otp[0]" class="otp-input form-control" type="number" maxlength="1" pattern="\d" required>
                <input v-model="otp[1]" class="otp-input form-control" type="number" maxlength="1" pattern="\d" required>
                <input v-model="otp[2]" class="otp-input form-control" type="number" maxlength="1" pattern="\d" required>
                <input v-model="otp[3]" class="otp-input form-control" type="number" maxlength="1" pattern="\d" required>
              </div>
              <button type="submit" class="btn btn-primary btn-block mt-3">Verify Account</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios'
const otp = ref(['','','','']);
const token = ref('')
const route = useRoute();
const router = useRouter();
token.value = route.params.token;
const handleVerificationEmail = async () => {
    const headers = {
            'Content-Type': 'application/json', // Specifies the content type as JSON
            'Authorization': `Bearer ${token.value}`, // An example of an authorization header
            'X-Custom-Header': 'CustomValue', // A custom header with a custom value
        };
    
        const config = { headers }
    try {
      const endteredOTP = otp.value.join('')
      console.log(parseInt(endteredOTP))
        const response = await axios.post('http://localhost:8081/api/verifyEmail',
        {verification_code: parseInt(endteredOTP)},config)
            
        if (response) {
            router.push('/main/login');
        }
    } catch (error) {
        console.log(error);
    }
}

</script>

<style scoped>

</style>