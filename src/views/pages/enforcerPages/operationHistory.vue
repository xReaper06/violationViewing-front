<template>
    <div>
        <div>
            <div class="container-fluid mt-3" style="height: 100%;">
  <div class="row align-items-center justify-content-center">
    <div class="col-12 col-sm-10 col-md-8">
      <div class="card shadow-lg">
        <p style="font-size: 20px; font-weight: bold; text-align: center; color: #0c0d0e;">Operation History</p>
        <div>
          <select v-model="FilterPlace" class="form-select mb-3" aria-label="Select Locations">
            <option value="" selected disabled>Select Locations</option>
            <option value="Poblacion">Poblacion</option>
            <option value="Catarman">Catarman</option>
            <option value="Ibabao">Ibabao</option>
            <option value="Alegria">Alegria</option>
            <option value="Gabi">Gabi</option>
            <option value="Gilutungan">Gilutungan</option>
            <option value="Pilipog">Pilipog</option>
            <option value="Dapitan">Dapitan</option>
            <option value="Buagsong">Buagsong</option>
            <option value="Day-as">Day-as</option>
            <option value="Bangbang">Bangbang</option>
            <option value="Cogon">Cogon</option>
          </select>
        </div>
        <div class="container">
          <table class="table table-responsive table-light table-striped me-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Place Of Operation</th>
                <th>Officers Assigned</th>
                <th>Date And Time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="violator in searchResults" :key="violator.id">
                <td>{{ violator.id }}</td>
                <td>{{ violator.place_of_violation }}</td>
                <td>{{ violator.apprehending_officer }}</td>
                <td>{{ violator.date_and_time }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

        </div>

    </div>
</template>

<script setup>
 import { computed } from 'vue';
    import AuthenticationServices from '@/services/AuthenticationService'
    import { ref, onMounted } from 'vue'
    
   
        const violatorsValue = ref([]);
        const FilterPlace = ref('');
        const getViolators = async () => {
          try {
            const response = await AuthenticationServices.getAllViolators();
            if (response) {
              violatorsValue.value = response.data.violators;
              searchResults;
            }
          } catch (error) {
            console.log(error);
          }
        };
        
        onMounted(() => {
          getViolators();
        });
        const searchResults = computed(()=>{
          return violatorsValue.value.filter(
        (item) =>
      item.place_of_violation &&
      item.place_of_violation.toLowerCase().includes(FilterPlace.value.toLowerCase())
  );
        })
</script>

<style scoped>

</style>