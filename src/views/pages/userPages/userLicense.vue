<template>
    <div>
        <div v-if="showUpdateForm" class="container">
    <div class="card mx-auto" style="max-width: 900px;">
      <div class="card-title text-h6 text-center">
        Your License is Expired. Please Renew it and update License Data
      </div>
      <hr>
      <div class="card-actions">
        <router-link to="/user/updateLicense" class="btn btn-primary">Update Your License</router-link>
      </div>
    </div>
  </div>

  <div v-else class="container mt-5 mb-5">
    <div v-if="showLicense" class="container">
          <h1 class="text-center mt-5 mb-5">MY LICENSE</h1>
          <div class="card mx-auto" style="max-width: 600px;">
            <img :src="'http://localhost:8081/api/images/' + myLicense[0].front_pic" class="card-img-top" style="max-height: 600px; max-width: 600px;" alt="License Image">
            <div class="card-title text-h6 text-center">
              {{ formattedName }}
            </div>
            <div class="card-subtitle text-caption text-center">
              <div>My License Number: {{ myLicense[0].license_no }}</div>
              <span class="badge badge-success ml-2">Verified</span>
            </div>
            <hr>
            <div class="card-actions">
              <a href="#" class="btn btn-warning text-light" @click="exploreLicense">Explore</a>
              <div class="spacer"></div>
              <button class="btn btn-link" @click="toggleDescription">
                <i class="mdi-chevron-up" v-if="showDescription"></i>
                <i class="mdi-chevron-down" v-else></i>
              </button>
            </div>
            <transition name="expand-transition">
              <div v-show="show">
                <hr>
                <div class="card-text">
                  <h4>Address: {{ myLicense[0].street }} {{ myLicense[0].baranggay }} {{ myLicense[0].city }} {{ myLicense[0].province }}</h4>
                  <h4>Personal Info: <br><br><small class="ms-5">
                      Birthday: {{ myLicense[0].date_of_birth }} <br>
                      Blood Type: {{ myLicense[0].blood_type }} <br>
                      Eye Color: {{ myLicense[0].eye_color }} <br>
                      Sex: {{ myLicense[0].sex }} <br>
                      Nationality: {{ myLicense[0].nationality }} <br>
                      Weight: {{ myLicense[0].weight }} <br>
                      Height: {{ myLicense[0].height }}
                    </small>
                  </h4>
                  <h4>License Info: <br><br><small class="ms-5">
                      Agency Code: {{ myLicense[0].agency_code }} <br>
                      Conditions: {{ myLicense[0].conditions }} <br>
                      Restrictions: {{ myLicense[0].restrictions }} <br>
                      Expiration Date: {{ myLicense[0].expiration_date }}
                    </small>
                  </h4>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div v-else class="container">
          
            <div class="card mx-auto" style="max-width: 900px;">
              <div class="card-title text-h6 text-center">
                You don't have a License Yet. Please Add Your License
              </div>
              <hr>
              <div class="card-actions">
                <router-link to="/user/addLicense" class="btn btn-primary">Add License</router-link>
              </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script setup>
import { useAuthStore } from '@/store';
import AuthenticationService from '@/services/AuthenticationService';
import { ref } from 'vue';
import { computed,onMounted } from 'vue';
import router from '@/router';


    const myLicense = ref(null)
     const show = ref(true)
     const user = ref('')
     const first_name = ref('')
     const last_name = ref('')
     const middle_name = ref('');
     const showLicense = ref(false)
     const authStore = useAuthStore();

     const showUpdateForm = ref(false);
     const toggleDescription = () => {
  show.value = !show.value;
};

    const id = ref('')
    user.value = localStorage.getItem('user');
    id.value = JSON.parse(user.value);
    
    const getMyLicense = async () => {
      const num = parseInt(id.value.id)
  try {
    const response = await AuthenticationService.getMyLicense({
      user_id:num
    });
    if(response){
      myLicense.value = response.data.myLicense;
      authStore.setMyLicense(myLicense.value)
      if (myLicense.value.length > 0 && myLicense.value[0].is_verified == 2) {
        first_name.value = myLicense.value[0].first_name
        last_name.value = myLicense.value[0].last_name
        middle_name.value = myLicense.value[0].middle_name
        formattedName;
        showLicense.value = true;
      }else if(myLicense.value.length>0 && myLicense.value[0].is_verified == 0){
        router.push('/user/licenseStatus');
      }else{
        showLicense.value = false
      }
    }
  } catch (error) {
    console.error('Error in getMyLicense:', error);
  }
}



const formattedName = computed(() => {
  return `${first_name.value} ${last_name.value} ${middle_name.value.toUpperCase()}`;
});


onMounted(async()=>{
  await getMyLicense();
  checkLicense()
   
 })
 const checkLicense = () => {
  const currentTimestamp = Date.now();
   
  // Create a new Date object using the timestamp
  const currentDate = new Date(currentTimestamp);
   
  // Use Date methods to get individual components (year, month, day, hours, minutes, seconds)
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
  const day = currentDate.getDate().toString().padStart(2, '0');
   
  // Create a formatted date string
  const formattedDate = `${year}-${month}-${day}`;

  if (myLicense.value == null || myLicense.value[0] == null || myLicense.value[0].expiration_date == null) {
    showUpdateForm.value = false;
    console.log('No license registered yet or expiration_date is undefined');
  } else {
    if (formattedDate >= myLicense.value[0].expiration_date) {
      showUpdateForm.value = true;
    }
  }
}
</script>

<style scoped>

</style>