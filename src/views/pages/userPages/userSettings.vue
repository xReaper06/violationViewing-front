<template>

<div class="container">
  <h2 class="mb-4 text-center">User Settings</h2>
  
  <div class="alert alert-warning text-center" v-if="err" role="alert">
    {{ err }}
  </div>

  <div class="alert alert-success text-center" v-if="sucss" role="alert">
    {{ sucss }}
  </div>

  <img :src="`http://localhost:8084/api/images/${username.profile_pic}`" alt="Profile Picture" class="profile-pic">

  <div class="row">
    <!-- Change Profile Picture Section -->
    <div class="col-md-5">
      <a href="#" class="fs-4 nav-link" @click="clickCollapseChangePic">Change Profile Picture <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-bar-down" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 20l0 -10" /><path d="M12 20l4 -4" /><path d="M12 20l-4 -4" /><path d="M4 4l16 0" /></svg></a>
      <div class="collapse" id="collapseChangePic" :class="{show: showCollapseChangePic}">
        <div class="card card-body">
          <div v-if="showFile" class="image-container mb-3">
            <img :src="fileView.preview" alt="Selected Image" class="preview-image img-fluid">
          </div>
          <div class="file-upload mb-3 form-group">
            <label for="profilePic">Choose a new profile picture:</label>
            <input type="file" id="file" @change="handleImgChange" class="form-control-file" accept="image/png, image/jpeg, image/jpg" />
          </div>
          <button class="btn btn-primary" @click="ChangeProfilePic">Upload Profile Picture</button>
        </div>
      </div>
    </div>

    <!-- Change Password Section -->
    <div class="col-md-5">
      <a class="fs-4 nav-link" href="#" @click="clickCollapseChangePass">Change Password <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-bar-down" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 20l0 -10" /><path d="M12 20l4 -4" /><path d="M12 20l-4 -4" /><path d="M4 4l16 0" /></svg></a>
      <div class="collapse" id="collapseChangePass" :class="{show: showCollapseChangePass}">
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
</template>

<script setup>
import AuthenticationService from "@/services/AuthenticationService";
import {ref,computed} from 'vue'

const file = ref(null);
  const fileView = ref({ preview: "" });
  const showFile = ref(false);
  const showButton = ref(false);
  const showCollapseChangePass = ref(false)
  const showCollapseChangePic = ref(false)
  const profile = ref("");
  const user = ref("");
  const username = ref("");
  const sucss =ref('');
  const err = ref('')
  const confirmPassword = ref('')
  const newPassword = ref('')
  const showPassmsg = ref(false);
  const passmsg = ref(null)
  const checkmsg = ref(null)
  const showCheckPass = ref(false)
  const showSubmitButton = ref(false);

  const clickCollapseChangePass = ()=>{
    showCollapseChangePass.value = !showCollapseChangePass.value
  }
  const clickCollapseChangePic = ()=>{
    showCollapseChangePic.value = !showCollapseChangePic.value
  }
  
  user.value = localStorage.getItem("user");
  username.value = JSON.parse(user.value);
  
  const handleImgChange = (event) => {
    const img = event.target.files;
    if (img.length > 0) {
      file.value = img[0];
  
      const reader = new FileReader();
      reader.onload = (e) => {
        fileView.value = {
          name: img[0].name,
          preview: e.target.result,
        };
        showFile.value = true;
      };
      reader.readAsDataURL(img[0]);
      showButton.value = true;
    }
  };
  
  const ChangeProfilePic = async () => {
    try {
      const data = new FormData();
      data.append("user_id", username.value.id);
      data.append("profile_pic", file.value);
      const response = await AuthenticationService.changeProfilePic(data);
      if (response) {
        profile.value = "";
        showButton.value = false;
        showFile.value = false;
        sucss.value = response.data.msg
      }
    } catch (error) {
      console.log(error);
      err.value = error.response.data.msg
    }
  };
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
        const response = await AuthenticationService.changePassword({
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
    .image-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
    }

    .preview-image {
      border-radius: 50%;
    }

    .invalid-password {
      color: red;
    }

    .texterror {
      color: red;
    }

    .container {
        position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 500px;
      margin-top: 20px;
    }

    .row {
      margin-top: 20px;
      gap: 40px;
    }

    .profile-pic {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 50%;
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 20px;
    }
    .invalid-password{
  color: red;
}
.valid-password{
  color: rgb(10, 206, 10);
}
</style>