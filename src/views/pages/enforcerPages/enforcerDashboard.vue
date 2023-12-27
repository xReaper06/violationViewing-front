<template>
    <div>
        <div>
            <div class="container-fluid mt-3 mb-5" style="height: 100%;">
  <div class="row align-items-center justify-content-center">
    <div class="col-12 col-sm-10 col-md-8">
      <div class="card shadow-lg">
        <p style="font-size: 20px; font-weight: bold; text-align: center; color: #0c0d0e;" class="mt-5">Dashboard</p>
        <div>
          <div class="input-group mt-3 mb-3">
            <span class="input-group-text" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg></span>
            <input type="text" v-model="search" class="form-control" placeholder="Search not Paid violations...." aria-label="Search License Number..." aria-describedby="basic-addon1" @input="performSearch">
          </div>
        </div>
        <div v-if="search !== ''">
          <div class="row">
            <div v-for="violator in searchResults" :key="violator.id" class="col-12 col-md-6 col-lg-4">
                <router-link :to="{name:'viewUserViolation',props:{violations_id:violator.id} ,params:{violations_id:violator.id}}" class="text-decoration-none">
                  <div class="card custom-card license">
                    <div class="card-title headline">{{ violator.name_of_driver }}</div>
                    <div class="card-subtitle">ID: {{ violator.id }}</div>
                    <div class="card-subtitle">Ticket Number: {{ violator.ticket_no }}</div>
                    <div class="card-subtitle">License Number: {{ violator.license_no }}</div>
                    <div class="card-subtitle">Unit: {{ violator.unit }}</div>
                    <div class="card-subtitle">Plate: {{ violator.plate_no }}</div>
                    <div class="card-subtitle">Place of Violation: {{ violator.place_of_violation }}</div>
                    <div class="card-subtitle">Date and Time: {{ violator.date_and_time }}</div>
                    <div class="card-subtitle">Apprehending Officer: {{ violator.apprehending_officer }}</div>
                  </div>
                </router-link>
            </div>
          </div>
        </div>
        <div class="text-center">
          <div>
            <button @click="showButtons" class="btn btn-primary mt-2 mb-3">Add Violators</button>
          </div>
          <div v-if="show">
            <router-link to="/enforcer/normalCitation" class="btn btn-secondary">Normal Citation</router-link>
            <router-link to="/enforcer/impoundCitation" class="btn btn-secondary">Impound Citation</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="input-group mt-3 ms-3 mb-1 w-25">
<span class="input-group-text" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg></span>
<input type="text" class="form-control" id="searchPlateno" v-model="searchPlate_no" placeholder="search...." />
</div>
<div class="container-fluid mb-5 pb-5">
  <div class="card">
    <div class="card-header">
     <div class="card-title fs-4 text-center">
       Recently Added
     </div> 
    </div>
    <div class="card-body overflow-scroll" style="height: 350px;">
      <table class="table table-responsive table-striped">
        <thead>
          <tr>
            <th>Ticket Number</th>
            <th>License No</th>
            <th>Unit</th>
            <th>Plate no.</th>
            <th>Place of Violation</th>
            <th>Date and Time</th>
            <th>Name of the Driver</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="recent">
          <tr v-for="recentAdds in searchPlate" :key="recentAdds.id">
        <td>{{recentAdds.ticket_no}}</td>
        <td>{{recentAdds.license_no}}</td>
        <td>{{recentAdds.unit}}</td>
        <td>{{recentAdds.plate_no}}</td>
        <td>{{recentAdds.place_of_violation}}</td>
        <td>{{recentAdds.date_and_time}}</td>
        <td>{{recentAdds.name_of_driver}}</td>
        <td>{{recentAdds.status}}</td>
        <td>
          <button type="button" class="btn btn-secondary" @click="OpenEditModal(recentAdds)">Edit</button>
        </td>
      </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
<div v-if="editModal">
  <recent-edit-modal @close-modal="closeModal" :edit-value="editValue" :edit-modal="editModal"/>
</div>
        </div>
    </div>
</template>

<script setup>
import recentEditModal from '@/components/modals/recentEditModal.vue';
 import AuthenticationServices from '@/services/AuthenticationService'
  import { ref, onMounted,computed } from 'vue'
  
  const search = ref('');
      const violators = ref([]);
      const show = ref(false);
      const users = localStorage.getItem('user');
      const user = JSON.parse(users)
      const recentAdd = ref([])
      const searchPlate_no = ref('')
      const editModal = ref(false);
      const editValue = ref([])
      const closeModal = ()=>{
        editModal.value = false
        getRecentAdded();
      }
      const OpenEditModal = (recentAdd)=>{
        editModal.value = true
        editValue.value = JSON.stringify(recentAdd)
      }
      const getViolators = async () => {
        try {
          const response = await AuthenticationServices.getAllViolatorsNotPaid();
          if (response) {
            violators.value = response.data.violators;
          }
        } catch (error) {
          console.log(error);
        }
      };
      onMounted(() => {
        getViolators();
        getRecentAdded();
      });
  
      const searchResults = computed(() => {
        if(search.value.toLowerCase() === ''){
          return violators.value
        }
        return violators.value.filter(data =>
        Object.values(data).some(value => String(value).toLowerCase().includes(search.value.toLowerCase()))
        )
      });

      const showButtons = async () => {
        show.value = !show.value;
      };
      const getRecentAdded = async()=>{
        try {
          const response = await AuthenticationServices.enforcerRecentAdded({
            apprehending_officer:user.nickname
          })
          if(response){
            recentAdd.value = response.data.recentAdded
          }
        } catch (error) {
          console.log(error)
        }
      }
      const searchPlate = computed(() => {
        if(searchPlate_no.value.toLowerCase() === ''){
          return recentAdd.value
        }
        return recentAdd.value.filter(data =>
        Object.values(data).some(value => String(value).toLowerCase().includes(searchPlate_no.value.toLowerCase()))
        )
      });

</script>

<style scoped>
.license:hover{
  background-color: rgb(32, 31, 31);
  color: white;
}

</style>