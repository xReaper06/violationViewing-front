<template>
    <div>
        <div class="modal" v-if="props.showModal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Change Profile Picture</h1>
      </div>
      <div class="modal-body">
        <div class="content-container">
          <div v-if="showFile" class="image-container mb-3">
            <img :src="fileView.preview" alt="Selected Image" class="preview-image img-fluid" style="width: 150px; height: 150px; border-radius: 50%; align-items: center;">
          </div>
          <div class="file-upload mb-3">
            <input type="file" id="file" @change="handleImgChange" accept="image/png, image/jpeg, image/jpg" />
          </div>
  
          <div v-if="showButton" class="button-container">
            <button class="change-profile-button btn btn-primary" type="button" @click="ChangeProfilePic">Change Profile Picture</button>
          </div>
        </div>
      </div>
    </div>

  </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
  import AuthenticationService from "@/services/AuthenticationService";
  
  const props = defineProps({
    showModal: Boolean,
  });
  
  const emits = defineEmits(["closeModal"]);
  
  const closeModal = () => {
    emits("closeModal");
  };
  
  const file = ref(null);
  const fileView = ref({ preview: "" });
  const showFile = ref(false);
  const showButton = ref(false);
  const profile = ref("");
  const user = ref("");
  const username = ref("");
  const sucss =ref('');
  const err = ref('')
  
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
</style>