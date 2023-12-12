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
      <div class="card mx-auto background-body">
        <div class="d-flex flex-row justify-content-center mt-3">
          <img src="@/assets/phil-flag.jpg" alt="" style="height: 100px; width: 100px; margin-right: 50px;">
          <div class="d-flex flex-column">
            <div class="fs-2 text-center">Republic of the Philippines</div>
            <div class="fs-3 text-center">Department of Transportation</div>
            <div class="fs-3 text-center">Land Transportation Office</div>
            <h1 class="text-center">MY LICENSE</h1>
          </div>
          <img src="@/assets/LTO.jpg" alt="" style="height: 100px; width: 100px; margin-left: 50px;">
        </div>
            <div class="d-flex flex-row justify-content-center">
              <div class="d-flex flex-column me-5 mt-5">
                <img :src="'http://localhost:8081/api/images/' + myLicense[0].front_pic" class="card-img-top" style="max-height: 500px; max-width: 500px; margin-top: 10px; margin-left: 10px; margin-bottom: 10px; margin-right: 50px;" alt="License Image">
              </div>
                <div class="d-flex flex-column ms-4 mt-5">
                      <div class="smalltext">
                        Last Name, First Name, Middle Name,
                      <div class="card-title fs-4">
                        <strong>{{ formattedName }}</strong>
                      </div>
                      </div>
                  <div class="d-flex flex-row">
                    <div class="d-flex flex-column fs-6 me-3">
                      <div class="smalltext">
                        Nationality
                          <div class="fs-6">
                            {{ myLicense[0].nationality }}
                          </div>
                      </div>
                      <span class="me-4"></span>
                    </div>
                    <div class="d-flex flex-column fs-6 me-3">
                      <div class="smalltext">
                        Sex
                       <div class="fs-6">
                         {{ myLicense[0].sex }}
                       </div> 
                      </div>
                      <span class="me-4"></span>
                    </div>
                    <div class="d-flex flex-column fs-6 me-3">
                      <div class="smalltext">        
                        Date of Birth
                        <div class="fs-6">
                        {{ formattedDate }}
                      </div>
                    </div>                
                      <span class="me-4"></span>
                    </div>
                    <div class="d-flex flex-column fs-6 me-3">
                      <div class="smalltext">
                        Weight(kg)
                        <div class="fs-6">
                          {{ myLicense[0].weight }}
                        </div>            
                      </div>
                      <span class="me-4"></span>
                    </div>
                    <div class="d-flex flex-column fs-6 me-3">
                      <div class="smalltext">
                        Height(m)
                        <div class="fs-6">
                          {{ myLicense[0].height }}
                        </div>             
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-row">
                    <div class="d-flex flex-column">
                      <div class="smalltext">
                        Address
                        <div class="fs-6">
                          <strong class="fs-5">{{ myLicense[0].street }} {{ myLicense[0].baranggay }} {{ myLicense[0].city }} {{ myLicense[0].province }}</strong>
                        </div>           
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-row">
                    <div class="d-flex flex-column me-5">
                      <div class="smalltext">
                        License No.
                  <div class="fs-6">{{ myLicense[0].license_no }}</div>
                      </div>
                    </div>
                    <div class="d-flex flex-column">
                      <div class="smalltext">
                        Expiration Date
                        <div class="fs-6">{{ expirationDate }}</div>
                      </div>
                    </div>
                    <div class="d-flex flex-column ms-5">
                      <div class="smalltext">
                        Agency Code
                        <div class="fs-6">{{ myLicense[0].agency_code }}</div>
                      </div>              
                    </div>
                  </div>
                  <div class="d-flex flex-row">
                    <div class="d-flex flex-column me-4">
                      <div class="smalltext">
                        Blood Type
                        <div class="fs-6">
                          {{ myLicense[0].blood_type }}
                        </div>
                      </div>
                    </div>
                    <div class="d-flex flex-column">
                      <div class="smalltext">
                        Eye Color
                        <div class="fs-6">
                          {{ myLicense[0].eye_color }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-row">
                    <div class="d-flex flex-column me-4">
                      <div class="smalltext">
                        Restriction
                        <div class="fs-6">
                          {{ myLicense[0].restrictions }}
                        </div>
                      </div>
                    </div>
                    <div class="d-flex flex-column">
                      <div class="smalltext">
                        Condition
                        <div class="fs-6">
                          {{ myLicense[0].conditions }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
</div>
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
     const user = ref('')
     const first_name = ref('')
     const last_name = ref('')
     const middle_name = ref('');
     const showLicense = ref(false)
     const authStore = useAuthStore();

     const showUpdateForm = ref(false);

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
        birthDate(myLicense.value[0].date_of_birth)
        expiry(myLicense.value[0].expiration_date)
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
  return `${last_name.value}, ${first_name.value} ${middle_name.value.toUpperCase()}`;
});

let formattedDate;

const birthDate = (date)=>{
  try {
  let originalDate = new Date(date);

  if (isNaN(originalDate)) {
    throw new Error("Invalid date string");
  }

  formattedDate = originalDate.toISOString().split('T')[0].replace(/-/g, '/');
  console.log(formattedDate);
} catch (error) {
  console.error("Error:", error.message);
}
}

let expirationDate;
const expiry = (expiration_date)=>{
  try {
  let originalDate = new Date(expiration_date);

  if (isNaN(originalDate)) {
    throw new Error("Invalid date string");
  }

  expirationDate = originalDate.toISOString().split('T')[0].replace(/-/g, '/');
  console.log(formattedDate);
} catch (error) {
  console.error("Error:", error.message);
}
}


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
.smalltext{
  font-size: 10px;
}
.background-body{
  background-image: url('@/assets/background.jpg');
  background-position: auto;
  background-repeat: no-repeat;
  background-size: cover;
}

</style>