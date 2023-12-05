<template>
    <div>
        <div class="container mt-5">
  <div class="card">
    <div class="card-header">
      Update License Form
    </div>
    <div class="row ms-2 me-2 mt-2">
      <div v-if="showFront" class="col-md-6 col-lg-4">
        <img :src="frontView.preview" alt="Selected Image" class="img-fluid" style="max-width: 150px; max-height: 150px;">
      </div>
      <!-- Front Picture Input -->
      <div class="col-md-6 col-lg-4">
        <label for="frontPicture" class="form-label">Front Picture</label>
        <input type="file" class="form-control" id="frontPicture" accept="image/jpeg, image/jpg, image/png" @change="handleFrontPicChange">
      </div>
      <div v-if="showBack" class="col-md-6 col-lg-4">
        <img :src="backView.preview" alt="Selected Image" class="img-fluid" style="max-width: 150px; max-height: 150px;">
      </div>
      <!-- Back Picture Input -->
      <div class="col-md-6 col-lg-4">
        <label for="backPicture" class="form-label">Back Picture</label>
        <input type="file" class="form-control" id="backPicture" accept="image/jpeg, image/jpg, image/png" @change="handleBackPicChange">
      </div>
      <!-- License Number Input -->
      <div class="col-md-12 col-lg-4">
        <label for="expirationDate" class="form-label">Expiration Date</label>
        <input type="date" class="form-control" v-model="expiration_date" required>
      </div>
    </div>
    <hr class="my-4">
    <div class="card-footer">
      <button class="btn btn-dark" @click="updateLicense">Update My License</button>
    </div>
  </div>
</div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import AuthenticationService from '@/services/AuthenticationService'
import { useRouter } from "vue-router";
const front_pic = ref(null)
     const back_pic = ref(null)
     const expiration_date = ref('')
     const showFront = ref(false);
     const showBack = ref(false);
const frontView = ref({ preview: "" });
const backView = ref({ preview: "" });

const user = ref('')
    const id = ref('')
    user.value = localStorage.getItem('user');
    id.value = JSON.parse(user.value);


const handleFrontPicChange = (event)=>{
      const img = event.target.files;

    // Store it in your component's data
    if (img.length > 0) {
      front_pic.value = img[0];
  
      const reader = new FileReader();
      reader.onload = (e) => {
        frontView.value = {
          name: img[0].name,
          preview: e.target.result,
        };
        showFront.value = true;
      };
      reader.readAsDataURL(img[0]);
    }
     }

     const handleBackPicChange = (event)=>{
      const img = event.target.files;

// Store it in your component's data
if (img.length > 0) {
  back_pic.value = img[0];

  const reader = new FileReader();
  reader.onload = (e) => {
    backView.value = {
      name: img[0].name,
      preview: e.target.result,
    };
    showBack.value = true;
  };
  reader.readAsDataURL(img[0]);
}
     }

     let router = useRouter()
     const updateLicense = async()=>{
        try {
            let formdata = new FormData();
            formdata.append('user_id',id.value.id)
           formdata.append('front_pic',front_pic.value)
           formdata.append('back_pic',back_pic.value)
           formdata.append('expiration_date',expiration_date.value)
           const response = await AuthenticationService.updateLicense(formdata)
           if(response){
            router.push('/user/myLicense');
           }else{
            console.log(response.data.msg)
           }
        } catch (error) {
            console.log(error)
        }
     }
</script>

<style scoped>

</style>