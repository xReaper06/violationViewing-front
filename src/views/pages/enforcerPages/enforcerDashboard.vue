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
            <input type="text" v-model="search" class="form-control" placeholder="Search License Number..." aria-label="Search License Number..." aria-describedby="basic-addon1" @input="performSearch">
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
            <a href="/enforcer/normalCitation" class="btn btn-secondary">Normal Citation</a>
            <a href="/enforcer/impoundCitation" class="btn btn-secondary">Impound Citation</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        </div>
    </div>
</template>

<script setup>
 import AuthenticationServices from '@/services/AuthenticationService'
  import { ref, onMounted,computed } from 'vue'
  
  const search = ref('');
      const violators = ref([]);
      const show = ref(false);
  
      const getViolators = async () => {
        try {
          const response = await AuthenticationServices.getAllViolators();
          if (response) {
            violators.value = response.data.violators;
          }
        } catch (error) {
          console.log(error);
        }
      };
      onMounted(() => {
        getViolators();
      });
  
      const searchResults = computed(() => {
      return violators.value.filter(item =>{
        if(item.is_paid == 0){
          return item.license_no && item.license_no.toLowerCase().includes(search.value.toLowerCase())
        }
      }
    );
})
      const showButtons = async () => {
        show.value = !show.value;
      };

</script>

<style scoped>
.license:hover{
  background-color: rgb(32, 31, 31);
  color: white;
}

</style>