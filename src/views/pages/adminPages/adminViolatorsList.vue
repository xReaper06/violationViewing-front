<template>
            
<div class="container mt-3">
  <div class="card shadow p-3 mb-5 bg-white rounded elevation-4 overflow-scroll">
    <h2 class="ms-5 mt-5">
      <span class="ms-5"></span><span class="ms-5"></span><span class="ms-5"></span><span class="ms-5"></span><span class="ms-5"></span>
      Violations
    </h2>
    <router-link to="/admin/addViolator" class="btn btn-primary  w-25"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg> Violator</router-link>
    <div v-if="err" class="container mt-4">
        <div class="alert alert-danger" role="alert">
          <strong>Error:</strong> {{ err }}
        </div>
      </div>
  
      <div v-if="succs" class="container mt-4">
        <div class="alert alert-success" role="alert">
          <strong>Success:</strong> {{ succs }}
        </div>
      </div>

    <!-- Bootstrap select -->
    <label for="select" class="form-label mt-5">Select Violator Type:</label>
<select class="form-select w-50" v-model="type" @change="changeTypeViolators">
  <option value="" selected disabled>Select Violator Type</option>
  <option value="Normal">Normal</option>
  <option value="Empound">Empound</option>
</select>


    <!-- Normal Violations Section -->
    <div v-if="type === 'Normal' ">
      <h2 class="ms-5 mt-5">
        <span class="ms-5"></span><span class="ms-5"></span><span class="ms-5"></span><span class="ms-5"></span><span class="ms-5"></span>
        Normal
      </h2>

      <!-- Bootstrap text field for search -->
      <div class="d-flex justify-content-end w-25">
        <input type="text" class="form-control" v-model="searchNormal" placeholder="Search....">
      </div>

      <div class="mt-5">
        <!-- Bootstrap table -->
        <select name="is_paid" id="is_paid" class="form-select w-25 mb-2" v-model="is_paid">
          <option value="0">Not Paid</option>
          <option value="1">Paid</option>
        </select>
        <div v-if="is_paid == 0">

          <table class="table table-responsive table-light table-striped" >
            <thead>
              <tr>
                <th>Ticket Number</th>
                <th>License Number</th>
                <th>Unit</th>
                <th>Plate number</th>
                <th>Place of Violation</th>
                <th>Date and Time</th>
                <th>Apprehending Officer</th>
                <th>Name of Driver</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- Use v-for loop for rendering -->
              <tr v-for="violator in filteredViolators" :key="violator.id">
                <td>{{ violator.ticket_no }}</td>
                <td>{{ violator.license_no }}</td>
                <td>{{ violator.unit }}</td>
                <td>{{ violator.plate_no }}</td>
                <td>{{ violator.place_of_violation }}</td>
                <td>{{ violator.date_and_time }}</td>
                <td>{{ violator.apprehending_officer }}</td>
                <td>{{ violator.name_of_driver }}</td>
                <td>
                  <!-- Bootstrap button -->
                  <router-link class="btn btn-primary" :to="{ name: 'viewNormal', props: { id: violator.id,is_paid:violator.is_paid }, params: { id:violator.id, is_paid: violator.is_paid } }">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M11.102 17.957c-3.204 -.307 -5.904 -2.294 -8.102 -5.957c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6a19.5 19.5 0 0 1 -.663 1.032" /><path d="M15 19l2 2l4 -4" /></svg>
                  </router-link>
          <button type="button" class="btn btn-danger" @click="deleteViolation(violator.id)">delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
            <table class="table table-responsive table-light table-striped">
            <thead>
              <tr>
                <th>OR Number</th>
                <th>Ticket Number</th>
                <th>License Number</th>
                <th>Unit</th>
                <th>Place number</th>
                <th>Place of Violation</th>
                <th>Date and Time</th>
                <th>Apprehending Officer</th>
                <th>Name of Driver</th>
                <th>Date Paid</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- Use v-for loop for rendering -->
              <tr v-for="violator in filteredPaidViolators" :key="violator.id">
                <td>{{ violator.or_no }}</td>
                <td>{{ violator.ticket_no }}</td>
                <td>{{ violator.license_no }}</td>
                <td>{{ violator.unit }}</td>
                <td>{{ violator.plate_no }}</td>
                <td>{{ violator.place_of_violation }}</td>
                <td>{{ violator.date_and_time }}</td>
                <td>{{ violator.apprehending_officer }}</td>
                <td>{{ violator.name_of_driver }}</td>
                <td>{{ violator.date_paid }}</td>
                <td>
                  <!-- Bootstrap button -->
                  <router-link class="btn btn-primary" :to="{ name: 'viewNormal', props: { id: violator.id,is_paid:violator.is_paid }, params: { id:violator.id, is_paid: violator.is_paid } }">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M11.102 17.957c-3.204 -.307 -5.904 -2.294 -8.102 -5.957c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6a19.5 19.5 0 0 1 -.663 1.032" /><path d="M15 19l2 2l4 -4" /></svg>
                  </router-link>
          <button type="button" class="btn btn-danger" @click="deleteViolation(violator.id)">delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
      </div>
    </div>

    <!-- Empound Violations Section -->
    <div v-else>
      <h2 class="ms-5 mt-5">
        <span class="ms-5"></span><span class="ms-5"></span><span class="ms-5"></span><span class="ms-5"></span><span class="ms-5"></span>
        Empound
      </h2>

      <!-- Bootstrap text field for search -->
      <div class="w-25">
        <input type="text" class="form-control" v-model="searchPlate_no" placeholder="Search....">
      </div>

      <div class="mt-5">
        <!-- Bootstrap table -->
        <select name="is_paid" id="is_paid" class="form-select w-25 mb-2" v-model="is_paid">
          <option value="0">Not Paid</option>
          <option value="1">Paid</option>
        </select>
        <div  v-if="is_paid == 0">

          <table class="table table-responsive table-light table-striped">
            <thead>
              <tr>
                <th>Ticket Number</th>
                <th>Unit</th>
                <th>plate_no</th>
                <th>Place of Violation</th>
                <th>Date and Time</th>
                <th>Apprehending Officer</th>
                <th>Name of Driver</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- Use v-for loop for rendering -->
              <tr v-for="violator in searchPlate" :key="violator.id">
                <td>{{ violator.ticket_no }}</td>
                <td>{{ violator.unit }}</td>
                <td>{{ violator.plate_no }}</td>
                <td>{{ violator.place_of_violation }}</td>
                <td>{{ violator.date_and_time }}</td>
                <td>{{ violator.apprehending_officer }}</td>
                <td>{{ violator.name_of_driver }}</td>
                <td>
                  <!-- Bootstrap button -->
                  <router-link class="btn btn-primary" :to="{ name: 'viewImpound', props: { id: violator.id, is_paid: violator.is_paid }, params: { id:violator.id, is_paid: violator.is_paid } }">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M11.102 17.957c-3.204 -.307 -5.904 -2.294 -8.102 -5.957c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6a19.5 19.5 0 0 1 -.663 1.032" /><path d="M15 19l2 2l4 -4" /></svg>
                  </router-link>
          <button type="button" class="btn btn-danger" @click="deleteViolation(violator.id)">delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <div>
            <table class="table table-responsive table-light table-striped">
            <thead>
              <tr>
                <th>Ticket Number</th>
                <th>Unit</th>
                <th>Plate_no</th>
                <th>Place of Violation</th>
                <th>Date and Time</th>
                <th>Apprehending Officer</th>
                <th>Name of Driver</th>
                <th>Date Release</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- Use v-for loop for rendering -->
              <tr v-for="violator in searchPlate" :key="violator.id">
                <td>{{ violator.ticket_no }}</td>
                <td>{{ violator.unit }}</td>
                <td>{{ violator.plate_no }}</td>
                <td>{{ violator.place_of_violation }}</td>
                <td>{{ violator.date_and_time }}</td>
                <td>{{ violator.apprehending_officer }}</td>
                <td>{{ violator.name_of_driver }}</td>
                <td>{{ violator.date_release }}</td>
                <td>
                  <!-- Bootstrap button -->
                  <router-link class="btn btn-primary" :to="{ name: 'viewImpound', props: { id: violator.id, is_paid: violator.is_paid }, params: { id:violator.id, is_paid: violator.is_paid } }">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M11.102 17.957c-3.204 -.307 -5.904 -2.294 -8.102 -5.957c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6a19.5 19.5 0 0 1 -.663 1.032" /><path d="M15 19l2 2l4 -4" /></svg>
                  </router-link>
          <button type="button" class="btn btn-danger" @click="deleteViolation(violator.id)">delete</button>

                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- <recent-edit-modal @close-modal="closeModal" :edit-value="editValue" :edit-modal="editModal"/> -->
</template>

<script setup>
// import recentEditModal from '@/components/modals/recentEditModal.vue';
   import AuthenticationService from '@/services/AuthenticationService';
import Swal from 'sweetalert2';
import { onMounted,computed,ref } from 'vue';
    const type = ref('')
    const violators = ref([])
    const impounds = ref([])
    const searchNormal = ref('');
    const searchPlate_no = ref('')
    const is_paid = ref(0)
    const succs = ref('')
    const err = ref('')
    const Paidviolators = ref([])
    // const editModal = ref(false);
      // const editValue = ref([])
      // const closeModal = ()=>{
      //   editModal.value = false
      // }
      const deleteViolation = (data)=>{
  Swal.fire({
        title: 'Are you sure you want to delete This Violation?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, proceed',
        cancelButtonText: 'No, cancel',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          deleteThisViolation(data)
        }
      });
}
      const deleteThisViolation = async(recentAdd)=>{
        try{
          const response = await AuthenticationService.deleteThisViolation({
            id:parseInt(recentAdd)
          });
          if(response){
            Swal.fire('Success','Delete Successfull','success');
            getAllImpounds();
            getAllPaidViolators();
            getAllViolators()
          }
        }catch(error){
          Swal.fire('Error',error.response.data.msg,'error');
        }
      }
      // console.log(editValue.value)
    const getAllViolators = async()=>{
        try {
            const response = await AuthenticationService.getAllViolatorsNormal();
            if(response){
                violators.value = response.data.violators
            }
        } catch (error) {
            console.log(error)
        }
    }
    const filteredViolators = computed(() => {
        if(searchNormal.value.toLowerCase() === ''){
          return violators.value
        }
        return violators.value.filter(data =>
        Object.values(data).some(value => String(value).toLowerCase().includes(searchNormal.value.toLowerCase()))
        )
      });
const getAllPaidViolators = async()=>{
        try {
            const response = await AuthenticationService.getAllPaidViolatorsNormal();
            if(response){
                Paidviolators.value = response.data.violators
            }
        } catch (error) {
            console.log(error)
        }
    }
    const filteredPaidViolators = computed(() => {
        if(searchNormal.value.toLowerCase() === ''){
          return Paidviolators.value
        }
        return Paidviolators.value.filter(data =>
        Object.values(data).some(value => String(value).toLowerCase().includes(searchNormal.value.toLowerCase()))
        )
      });



    const getAllImpounds = async()=>{
        try {
            const response = await AuthenticationService.getAllViolatorsImpound();
            if(response){
                impounds.value = response.data.violators
            }
        } catch (error) {
            console.log(error)
        }
    }
    const searchPlate = computed(() => {
        if(searchPlate_no.value.toLowerCase() === ''){
          return impounds.value
        }
        return impounds.value.filter(data =>
        Object.values(data).some(value => String(value).toLowerCase().includes(searchPlate_no.value.toLowerCase()))
        )
      });



    onMounted(()=>{
        getAllViolators();
        getAllImpounds();
        getAllPaidViolators();
    })
    
</script>

<style scoped>


</style>