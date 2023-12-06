<template>
    <div>
        <div class="card shadow-lg p-3 mb-5 bg-white rounded">
      <div class="mt-2 ms-3">
        <router-link to="/user/violations" class="btn btn-primary">Go back</router-link>
      </div>

      <div>
        <p
          class="font-weight-bold mt-4 mb-4 text-center text-dark"
          style="font-size: 24px"
        >
          Violations
        </p>
        <div class="card shadow p-3 mb-5 bg-light rounded">
          <table class="table table-responsive table-light table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Fine</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <!-- Assume 'violations' is an array of objects -->
              <!-- Use v-for loop for rendering -->
              <tr v-for="violator in violations" :key="violator.id">
                <td>{{ violator.id }}</td>
                <td>{{ violator.name }}</td>
                <td>{{ violator.fine }}</td>
                <td>{{ violator.status }}</td>
              </tr>
            </tbody>
          </table>
          <p class="fs-6">Total : P{{ total }}</p>
        </div>

        <p
          class="font-weight-bold mt-4 mb-4 text-center text-dark"
          style="font-size: 24px"
        >
          Evidences
        </p>
        <div class="card shadow p-3 mb-5 bg-light rounded mt-5 mb-5">
          <div class="evidence-list mb-3 mt-2">
            <!-- Assume 'evidences' is an array of objects -->
            <!-- Use v-for loop for rendering -->
            <div
              v-for="evidence in evidences"
              :key="evidence.id"
              class="evidence-item"
            >
              <img
                :src="'http://localhost:8081/api/images/' + evidence.images"
                alt="User Avatar"
                style="max-width: 300px; max-height: 300px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref,defineProps,onMounted,computed} from 'vue'
import AuthenticationService from '@/services/AuthenticationService';

const props = defineProps({
  violations_id:Number,
});
console.log(props.violations_id)

    const violations = ref([])
        const evidences = ref([])
        const fine = ref(0)

        const getUsersViolations = async()=>{
            try {
                const response = await AuthenticationService.getUserViolations({
                    violations_id:props.violations_id
                });
                if(response){
                    violations.value = response.data.userViolations
                    evidences.value = response.data.evidences
                    violations.value.forEach((violation)=>{
                        fine.value += parseInt(violation.fine)
                    })
                    console.log(fine)
                }
            } catch (error) {
                console.log(error)
            }
        }
        onMounted(()=>{
            getUsersViolations();
        })

        const total = computed(()=>{
            return fine.value
        })


</script>

<style scoped>

</style>