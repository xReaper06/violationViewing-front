<template>
    <div>
        <div class="container-fluid">
  <div class="card shadow p-3 mb-5 mt-2 bg-white rounded">
      <div v-if="notVerified">
        <div class="alert alert-warning mt-5" role="alert">
          <strong>Not Verified</strong> Your License is not verified. Please wait for a moment for the admin to verify your account.
        </div>
      </div>
      <div v-if="noLicense">
        <div class="alert alert-danger mt-5" role="alert">
          <strong>No License</strong> You don't have any license inserted.
        </div>
      </div>
      <div class="card shadow p-3 mb-5 bg-white rounded" v-if="showViolation">
        <div class="card-title">
          <h1 class="display-4">My Violations</h1>
        <div class="card-text">
          <ul class="list-group">
            <li v-for="violator in filterViolation" :key="violator.id" class="list-group-item">
              <div class="d-flex justify-content-between">
                <h4 class="mb-1">Ticket Number: {{ violator.ticket_no }}</h4>
                <div class="d-flex flex-column">
                  <small class="text-muted">Unit: {{ violator.unit }}</small>
                  <small class="text-muted">plate no.: {{ violator.plate_no }}</small>
                </div>
              </div>
              <p class="mb-1">Place of Violation: {{ violator.place_of_violation }}</p>
              <p class="mb-1">Date and Time: {{ violator.date_and_time }}</p>
              <p class="mb-1">Apprehending Officer: {{ violator.apprehending_officer }}</p>
              <p class="mb-1">Name of The Driver: {{ violator.name_of_driver }}</p>
              <div class="d-flex justify-content-end mt-3">
                <router-link class="btn btn-primary" :to="{name:'viewViolation',props:{violations_id:violator.id} ,params:{violations_id:violator.id}}">View Violation</router-link>
              </div>
              <div v-if="violator == ''">
            <div class="text-center">
              <h2>No Violations Yet</h2>
            </div>
          </div>
            </li>
          </ul>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AuthenticationService from '@/services/AuthenticationService';
import { ref } from 'vue';
import { onMounted,computed } from 'vue';


    const notVerified = ref(true)
    const myLicense = ref([])
     const user = ref('')
     const msg = ref('');
     const license_no = ref('')
     const Violations = ref([]);
     const showViolation = ref(false);
     const noLicense = ref(false)
     const noViolations = ref(false)
    const id = ref('')
    user.value = localStorage.getItem('user');
    id.value = JSON.parse(user.value);
    const num = ref('')
  



    const getMyLicense = async () => {
      num.value = id.value.id
      console.log(num)
  try {
    const response = await AuthenticationService.getMyLicense({
      user_id:num.value
    });
    if(response){
      myLicense.value = response.data.myLicense;
      license_no.value = myLicense.value[0].license_no;
      if (myLicense.value[0].is_verified == 0) {
        console.log('License Number:', license_no.value);
      }else{
        getMyViolation();
      }
    }
  } catch (error) {
    console.error('Error in getMyLicense:', error);
    noLicense.value = true
    notVerified.value = false;
    showViolation.value = false
  }
}

const getMyViolation = async()=>{
  try {
        const response = await AuthenticationService.getMyViolation({
          license_no:license_no.value
        })
        if(response){
          Violations.value = response.data.myViolation;
          notVerified.value=false;
         
            if(response.data.myLicense == null){
              showViolation.value = true
            }else{
              msg.value = response.data.msg
              showViolation.value = false
              noViolations.value =true
            }
        }
    } catch (error) {
        console.log(error)
    }
}
const checkLicense =computed(()=>{
  return myLicense.value.filter((license)=>{
    if(license.is_verified == 0 && license){
      notVerified.value = true;
    }else if(license == null){
      noLicense.value = true
    }else{
      showViolation.value = true
    }
  })
})

const filterViolation = computed(()=>{
  return Violations.value.filter((violator)=>{
    if(violator.is_paid == 0){
      return violator
    }
  })
})
onMounted(()=>{
  getMyLicense()
    getMyViolation();
    checkLicense
})

</script>

<style scoped>

</style>