<template>
  <div>
    <div class="card shadow-lg p-3 mb-5 bg-white rounded">
      <div class="mt-2 ms-3">
        <a href="/admin/adminViolatorsList" class="btn btn-primary">Go back</a>
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
        <div v-if="props.is_paid == 0">
                  <button class="btn btn-success" @click="payThisViolation">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-list-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3.5 5.5l1.5 1.5l2.5 -2.5" /><path d="M3.5 11.5l1.5 1.5l2.5 -2.5" /><path d="M3.5 17.5l1.5 1.5l2.5 -2.5" /><path d="M11 6l9 0" /><path d="M11 12l9 0" /><path d="M11 18l9 0" /></svg>
                  </button>
                </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps,onMounted,computed } from "vue";
import AuthenticationService from "@/services/AuthenticationService";
import {useRouter} from 'vue-router'
import Swal from 'sweetalert2';

const props = defineProps({
  id: Number,
  is_paid:Number,
});
const router = useRouter();


const violations = ref([]);
const evidences = ref([]);
const fine = ref(0)

const getUsersViolations = async () => {
  try {
    const response = await AuthenticationService.getUserViolations({
      violations_id: props.id,
    });
    if (response) {
      violations.value = response.data.userViolations;
      evidences.value = response.data.evidences;
      violations.value.forEach((violation)=>{
          fine.value += parseInt(violation.fine)
    })
    }
  } catch (error) {
    console.log(error);
  }
};
onMounted(() => {
  getUsersViolations();
});
const payThisViolation = ()=>{
  Swal.fire({
        title: 'You want to pay This Violation?:',
        text:'Enter the Or Number in the reciept',
        input: 'number',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        showLoaderOnConfirm: true,
        preConfirm: (input) => {
          return input;
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Paid(result.value)
        }
      });
}
const Paid = async(data)=>{
try {
  const response = await AuthenticationService.paidThisViolation({
    violations_id:parseInt(props.id),
    or_no:data,
  })
  if(response){
    setTimeout(() => {
      Swal.fire('Success', response.data.msg, 'success');
      router.push('/admin/adminViolatorsList')
    }, 2000);
  }
} catch (error) {
  console.log(error)
  Swal.fire('Error', error.response.data.msg, 'error');
}
}
const total = computed(()=>{
            return fine.value
        })
</script>

<style scoped></style>
