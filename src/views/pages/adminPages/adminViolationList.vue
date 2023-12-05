<template>
    <div>
            
<div class="container mt-5">
  <h2 class="ms-5 mt-5">
    <span class="ms-5"></span><span class="ms-5"></span><span class="ms-5"></span><span class="ms-5"></span><span class="ms-5"></span>
    Traffic Ordinance
  </h2>
  
  <div class="mb-5">
    <!-- Bootstrap alerts -->
    <div class="alert alert-success" v-if="sccss" role="alert">
      {{ sccss }}
    </div>
    <div class="alert alert-danger" v-if="err" role="alert">
      {{ err }}
    </div>
    
    <!-- Bootstrap button -->
    <button class="btn btn-primary" @click="InsertionColumnBtn">
      <span v-if="!insertionColumn">Open Violation Form</span><span v-else>Close Violation Form</span>
    </button>

    <!-- Insertion Column -->
    <div v-if="insertionColumn" class="mb-5">
      <div class="container">
        <p class="text-center">Insert Violation</p>

        <!-- Bootstrap form row -->
        <div class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label for="code">Code</label>
              <input type="text" class="form-control" v-model="code" required>
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" class="form-control" v-model="name" required>
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group">
              <label for="fine">Fine</label>
              <input type="number" class="form-control" v-model="fine" required>
            </div>
          </div>
        </div>

        <!-- Submit button -->
        <button class="btn btn-primary" @click="saveViolation">Submit</button>
      </div>
    </div>

    <!-- Table Section -->
    <div class="table-responsive">
      <!-- Bootstrap table -->
      <table class="table table-striped" style="width:100%">
        <thead>
          <tr>
            <th scope="col">
              <button class="btn btn-link" @click="sortBy('code')">Code</button>
            </th>
            <th scope="col">
              <button class="btn btn-link" @click="sortBy('name')">Name</button>
            </th>
            <th scope="col">
              <button class="btn btn-link" @click="sortBy('fine')">Fine</button>
            </th>
            <th scope="col">
              <button class="btn btn-link" @click="sortBy('status')">Status</button>
            </th>
            <th scope="col">
              <button class="btn btn-link" @click="sortBy('date_created')">Date Created</button>
            </th>
            <th scope="col">
              <button class="btn btn-link" @click="sortBy('date_updated')">Date Updated</button>
            </th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Use v-for loop for rendering -->
          <tr v-for="violation in sortedData" :key="violation.id">
            <td>{{ violation.code }}</td>
            <td>{{ violation.name }}</td>
            <td>{{ violation.fine }}</td>
            <td>
              <div v-if="!editStatus[violation.id]">
                <!-- Show the status as plain text when not in edit mode -->
                {{ violation.status }}
              </div>
              <div v-else>
                <!-- Show the status input field when in edit mode -->
                <select v-model="status" class="form-control">
                  <option value="implemented">Implemented</option>
                  <option value="disable">Disable</option>
                </select>
                <button type="button" class="btn btn-primary" @click="updateStatus(violation)">Update</button>
              </div>
            </td>
            <td>{{ violation.date_created }}</td>
            <td>{{ violation.date_updated }}</td>
            <td>
              <button class="btn btn-primary" @click="editingStatus(violation)">Toggle Edit</button>
              <button class="btn btn-danger" @click="removeViolation(violation)">Remove Violation</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

        </div>
   
</template>

<script setup>
import AuthenticationService from '@/services/AuthenticationService';
import { ref,computed } from 'vue';


    const violationLists = ref([])
    const insertionColumn = ref(false);
    const editStatus = ref({});
    const code = ref('');
    const name = ref('');
    const fine = ref('');
    const err = ref('');
    const sccss = ref('');
    const status = ref('');
    const sortKey = ref('');
    const sortOrder = ref(1); 
    
const getAllViolationList = async ()=>{
      try {
        const response = await AuthenticationService.AllViolationsList();
        violationLists.value = response.data.violationList; // Assuming the data is an array of violations
      } catch (error) {
        console.error(error);
      }
    }
    getAllViolationList();
const sortBy = (key) => {
      if (key === sortKey.value) {
        sortOrder.value *= -1; // Toggle between ascending and descending
      } else {
        sortKey.value = key;
        sortOrder.value = 1; // Default to ascending
      }
    };

    const sortedData = computed(() => {
      return violationLists.value.slice().sort((a, b) => {
        const aValue = a[sortKey.value];
        const bValue = b[sortKey.value];
        if (aValue < bValue) return 1 * sortOrder.value;
        if (aValue > bValue) return -1 * sortOrder.value;
        return 0;
      });
    });

const updateStatus = async(violation)=>{
      console.log(violation.id)
      try{
        const response = await AuthenticationService.updateViolationStatus({
          id:violation.id,
          status:status.value
        })
        if(response){
          sccss.value = response.data.msg
          editStatus.value = {}
          getAllViolationList();
        }
      }catch(error){
        err.value = error.response.data.msg
      }
    }
    const removeViolation = async(violation)=>{
      console.log(violation.id)
      try{
        const response = await AuthenticationService.deleteViolationList({
          id:violation.id,
        })
        if(response){
          sccss.value = response.data.msg
          getAllViolationList();
        }
      }catch(error){
        console.log(error)
        err.value = error.response.data.msg
      }
    }
    const InsertionColumnBtn = ()=>{
      insertionColumn.value = !insertionColumn.value
      console.log(insertionColumn.value)
    }
    const editingStatus = (violation)=>{
      if (editStatus.value[violation.id] === undefined) {
        editStatus.value[violation.id] = false;
      }
      editStatus.value[violation.id] = !editStatus.value[violation.id];

    }
    const saveViolation = async()=>{
      try{
        const response = await AuthenticationService.insertViolations({
          code:code.value,
          name:name.value,
          fine:fine.value,
        });
        if(response){
          sccss.value = response.data.msg;
          code.value= '';
          name.value= '';
          fine.value= '';
          getAllViolationList();
        }
      }catch(error){
        console.log(error)
        err.value = error.response.data.msg
      }
    }

</script>

<style scoped>

</style>