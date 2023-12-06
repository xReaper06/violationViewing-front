<template>
            
<div class="container mt-3">
  <div class="card shadow p-3 mb-5 bg-white rounded elevation-6">
    <div v-if="license.is_verified == 0">
      <router-link to="/admin/adminLicenseNotVerified" class="btn btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-back-up" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 14l-4 -4l4 -4" /><path d="M5 10h11a4 4 0 1 1 0 8h-1" /></svg>
      </router-link>
    </div>
    <div v-if="license.is_verified == 2">
      <router-link to="/admin/adminLicenseVerified" class="btn btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-back-up" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 14l-4 -4l4 -4" /><path d="M5 10h11a4 4 0 1 1 0 8h-1" /></svg>
      </router-link>
    </div>
    <!-- Bootstrap row -->
    <div class="row">
      <!-- Bootstrap column for images -->
      <div class="col-4">
        <div class="row">
          <!-- Front Pic -->
          <div class="col-6">
            <p>Front Pic</p>
            <img :src="`http://localhost:8081/api/images/${license.front_pic}`" alt="Front Pic" class="img-fluid">
          </div>
          <!-- Back Pic -->
          <div class="col-6">
            <p>Back Pic</p>
            <img :src="`http://localhost:8081/api/images/${license.back_pic}`" alt="Back Pic" class="img-fluid">
          </div>
        </div>
      </div>

      <!-- Bootstrap column for details -->
      <div class="col-7 mt-5">
        <div class="row">
          <div class="col-12">
            <!-- Bootstrap card for license details -->
            <div class="card shadow p-3 mb-5 bg-white rounded elevation-4">
              <div class="ms-3 mt-5">
                <p>License Number: {{ license.license_no }}</p>
                <p>Expiration Date: {{ license.expiration_date }}</p>
                <p>Full name: {{ license.first_name }} {{ license.middle_name }} {{ license.last_name }}</p>
                <p>Address: {{ license.street }} {{ license.baranggay }} {{ license.city }} {{ license.province }}</p>
                <p>Birthday: {{ license.date_of_birth }}</p>
                <p>Blood Type: {{ license.blood_type }}</p>
                <p>Eye Color: {{ license.eye_color }}</p>
                <p>Nationality: {{ license.nationality }}</p>
                <p>Sex: {{ license.sex }}</p>
                <p>Agency Code: {{ license.agency_code }}</p>
                <p>Conditions: {{ license.conditions }}</p>
                <p>Weight(kg): {{ license.weight }}kg</p>
                <p>Height(m): {{ license.height }}m</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Bootstrap row for verification buttons -->
        <div class="row mt-5 mb-5 text-center" v-if="license.is_verified === 2 ? checkLicense : !checkLicense">
          <div class="col-12">
            <div>
              <!-- Bootstrap buttons for verification -->
              <button class="btn btn-primary mr-3" @click="verifyingLicense(license)">Verify License</button>
              <button class="btn btn-danger" @click="denyingLicense(license)">Deny Verification</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

</template>

<script setup>
import {ref,defineProps} from 'vue'
import AuthenticationService from '@/services/AuthenticationService'
import {useRouter} from 'vue-router'
const props = defineProps({
  id:Number
})

const router = useRouter();
        const license = ref('');
        const checkLicense = ref(false);
        const routes = router;
        console.log(props.id)
        const getlicensebyID = async()=>{
            try {
                const response = await AuthenticationService.getAllLicensebyID(props.id)
                console.log(response.data)
                if(response){
                    license.value = response.data.license;
                    console.log(license.value)
                }else{
                    console.log('Error Fetching')
                }
            } catch (error) {
                console.log(error);
            }
        }
        
        const verifyingLicense = async(license)=>{
            try{
                const response = await AuthenticationService.verifyLicense({
                    id:license.id,
                    user_id:license.user_id
                })
                if(response){
                    routes.push('/admin/adminLicenseNotVerified')
                }else{
                    console.log(response.data.msg);
                }
            }catch(err){
                console.log(err)
            }
        }
        const denyingLicense = async(license)=>{
            try{
                const response = await AuthenticationService.denyVerification({
                    id:license.id,
                    user_id:license.user_id
                })
                if(response){
                    routes.push('/admin/adminLicenseNotVerified')
                }else{
                    console.log(response.data.msg);
                }
            }catch(err){
                console.log(err)
            }
        }
        getlicensebyID();


</script>

<style scoped>

</style>