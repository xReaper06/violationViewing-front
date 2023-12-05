<template>
    <div>
        <div class="modal" v-if="props.showChangePassModal">
    <div class="modal-content">
      <span class="close" @click="closeChangePassModal">&times;</span>
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Change Password</h1>
      </div>
      <div class="modal-body">
        <div class="container">
      <div class="form-group">
        <label for="newPassword" class="form-label">New Password</label>
        <input type="password" id="newPassword" class="form-control" v-model="newPassword" required @keyup="handleStrongVerification">
      <div v-if="showPassmsg">
        <p class="invalid-password">
          {{ passmsg }}
        </p>
    </div>
        <label for="confirmPassword" class="form-label">Confirm New Password</label>
        <input type="password" id="confirmPassword" class="form-control" v-model="confirmPassword" required @keyup="checkifThesame">
      </div>
      <div v-if="showCheckPass">
        <p :class="texterror">
          {{ checkmsg }}
        </p>
    </div>
    <div v-if="showSubmitButton">
        <button type="button" class="btn btn-primary" @click="submitChangePassword">Change Password</button>
    </div>
  </div>
      </div>
    </div>

  </div>
    </div>
</template>

<script setup>
import {  ref,defineProps, defineEmits,computed } from "vue";
import authenticationService from '@/services/AuthenticationService';
  
  const props = defineProps({
    showChangePassModal: Boolean,       // Whether to show the modal
  });
  
  const emits = defineEmits(["closeChangePassModal"]);
  
  const closeChangePassModal = () => {
    emits("closeChangePassModal");
  };
  const confirmPassword = ref('')
  const newPassword = ref('')
  const showPassmsg = ref(false);
  const passmsg = ref(null)
  const checkmsg = ref(null)
  const showCheckPass = ref(false)
  const showSubmitButton = ref(false);
  const user = ref('');
    const username = ref('');
    const sucss = ref('')
    const err = ref('')

    user.value = localStorage.getItem('user');
      username.value = JSON.parse(user.value);

const handleStrongVerification = ()=>{
    const minLength = 8;
  const hasUppercase = /[A-Z]/.test(newPassword.value);
  const hasLowercase = /[a-z]/.test(newPassword.value);
  const hasNumber = /\d/.test(newPassword.value);

  // Check if the newPassword meets the criteria
  if (
    newPassword.value.length >= minLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber
  ){
    showPassmsg.value = false;
  } else if(newPassword.value == ''){
    showPassmsg.value = false;
  } else {
    showPassmsg.value = true;
    passmsg.value = "newPassword is Weak";
  }
}
const checkifThesame = ()=>{
    if(newPassword.value === confirmPassword.value && confirmPassword.value != ''){
        showCheckPass.value = true
        showSubmitButton.value = true
        checkmsg.value = 'Password is valid'
    }else if(confirmPassword.value == ''){
        showCheckPass.value = false
    }else{
      showSubmitButton.value = false
        showCheckPass.value = true
        checkmsg.value = 'Password is not The Same'
    }
}
const texterror = computed(()=>{
  return{
    'valid-password': newPassword.value === confirmPassword.value && confirmPassword.value != '',
    'invalid-password': confirmPassword.value != '' && newPassword.value != confirmPassword.value
  }
})


const submitChangePassword = async ()=>{
    try {
        const response = await authenticationService.changePassword({
            user_id:username.value.id,
            password:newPassword.value
        })
        if(response){
            newPassword.value=''
            confirmPassword.value = ''
            showCheckPass.value = false
            showPassmsg.value = false
            sucss.value = response.data.msg
        }
    } catch (error) {
        console.log(error)
        err.value = error.response.data.msg
    }
}

</script>

<style scoped>
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  width: 80%;
  max-width: 400px;
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}
.invalid-password{
  color: red;
}
.valid-password{
  color: rgb(10, 206, 10);
}
</style>