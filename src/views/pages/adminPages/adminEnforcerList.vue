<template>
    <div>
            
<div class="container mt-5 mb-3">
  <!-- Bootstrap alerts for success and error -->
  <div class="alert alert-success" v-if="success">
    <strong>Success:</strong> {{ success }}
  </div>
  <div class="alert alert-danger" v-if="err">
    <strong>Error:</strong> {{ err }}
  </div>
</div>

<div class="container-fluid mb-5 text-center">
  <div class="card">
    <div class="card-header">
      <div class="card-title fs-4 text-center">
        <strong>
          Enforcers List
        </strong>
      </div>
    </div>
    <div class="card-body">

      <!-- Bootstrap button for showing/hiding registration form -->
      <button class="btn btn-primary mb-2" @click="showRegistration">
        <span v-if="!registrationForm">Open Enforcer Send Email Form</span>
        <span v-else>Close Enforcer Send Email Form</span>
      </button>
      <!-- Bootstrap form for registration -->
      <div v-if="registrationForm" class="subscribe">
        <p>Sending Registration Form</p>
        <input placeholder="Your e-mail" class="subscribe-input form-control" name="email" type="email" required v-model="email">
        <br>
        <div class="submit-btn btn btn-primary" @click="send_registration">SEND</div>
      </div>
    </div>
    <div class="input-group mb-2 w-25 ms-3">
      <div class="input-group-prepend">
        <span class="input-group-text">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>    </span>
      </div>
      <input
        type="text"
        class="form-control"
        v-model="searchQuery"
        placeholder="Search Username...."
      />
    </div>
    <div class="container">
      <!-- Bootstrap table for enforcers -->
      <table class="table table-light table-striped table-responsive">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nickname</th>
            <th scope="col">Email</th>
            <th scope="col">Last Logged-in</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody v-for="enforcer in filteredEnforcers" :key="enforcer.id">
          <tr>
            <td>{{ enforcer.id }}</td>
            <td>{{ enforcer.nickname }}</td>
            <td>{{ enforcer.email }}</td>
            <td>{{ enforcer.lastloggedin }}</td>
            <td>
              <!-- Bootstrap button for removing enforcer -->
              <div class="d-flex flex-row">
                <button class="btn btn-primary" @click="ViewInfo(enforcer)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="view Info"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg></button>
                <button class="btn btn-danger" @click="removeEnforcer(enforcer)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="remove Account"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7h16" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /><path d="M10 12l4 4m0 -4l-4 4" /></svg></button>
                <div v-if="enforcer.flag === 1">
                  <div v-show="showBtn">
                    <!-- Bootstrap button to disable enforcer -->
                    <button class="btn btn-warning" @click="disableUser(enforcer)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="disable Account">
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-accessible-off" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 16.5l2 -3l2 3m-2 -3v-1.5m2.627 -1.376l.373 -.124m-6 0l2.231 .744" /><path d="M20.042 16.045a9 9 0 0 0 -12.087 -12.087m-2.318 1.677a9 9 0 1 0 12.725 12.73" /><path d="M12 8a.5 .5 0 1 0 -.5 -.5" /><path d="M3 3l18 18" /></svg>
                    </button>
                  </div>
                </div>
                <div v-else>
                  <!-- Bootstrap button to enable enforcer -->
                  <button class="btn btn-success" @click="enableUser(enforcer)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="enable Account">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M9 12l2 2l4 -4" /></svg>
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  </div>
<div v-if="showModal">
  <enforcer-info-modal @close-modal="closeModal" :user_id="user_id" :show-modal="showModal" />
</div>
        </div>
</template>

<script setup>
import enforcerInfoModal from '@/components/modals/enforcerInfoModal.vue';
 import AuthenticationService from '@/services/AuthenticationService';
    import { ref,computed } from 'vue';
    import axios from 'axios';
    
    const showBtn = ref(true)
   
            const enforcers = ref([]);
            const searchQuery = ref('');
            const registrationForm = ref(false);
            const email = ref('');
            const err = ref('');
            const success = ref('');
            const user_id = ref('')
            const showModal = ref(false);
            const closeModal = ()=>{
              showModal.value = false
            }
            const ViewInfo = (enforcer)=>{
              showModal.value = true;
              user_id.value = enforcer.id
            }
            const send_registration = async()=>{
    try {
        const response = await axios.post('http://localhost:8084/api/send-registration-form',{
            email:email.value
        })
        if(response){
          registrationForm.value = false
            email.value = null;
            success.value = response.data.msg;
            err.value = '';
        }
    } catch (error) {
        console.log(error)
        err.value = error.response.data.msg
        success.value = ''
    }
}

            const getAllEnforcers = async ()=>{
                try{
                    const response = await AuthenticationService.getAllEnforcer();
                    if(response){
                        enforcers.value = response.data.allEnforcers
                    }else{
                        throw Error('Empty Users')
                    }

                }catch(err){
                    console.log(err)
                }
            }
            getAllEnforcers();


        
    const removeEnforcer = async (enforcer) =>{
        try{
            const response = await AuthenticationService.removeEnforcer({
                id:enforcer.id
            });
            if(response){
                success.value =response.data.msg;
            getAllEnforcers();

            }
        }catch(error){
            console.log(error)
            err.value = error.response.data.msg;

        }
    }
    const showRegistration = async ()=>{
        registrationForm.value = !registrationForm.value;
    }
  
    const filteredEnforcers = computed(() => {
    // Ensure users.value is defined before filtering
    if (enforcers.value) {
      return enforcers.value.filter(enforcer => {
        return enforcer.nickname.toLowerCase().includes(searchQuery.value.toLowerCase());
      });
    } else {
      return []; // Return an empty array if users.value is undefined
    }
  });
  const enableUser = async(enforcer)=>{
        try {
          const response = await AuthenticationService.enableUser({
            id:enforcer.id
          })
          if(response){
            success.value = response.data.msg
        getAllEnforcers()
          }
      } catch (error) {
          console.log(error)
          err.value = error.response.data.msg;
      }
    }
    const disableUser = async (enforcer)=>{
      try {
          const response = await AuthenticationService.disableUser({
            id:enforcer.id
          })
          if(response){
            success.value = response.data.msg
        getAllEnforcers()
          }
      } catch (error) {
          console.log(error)
          err.value = error.response.data.msg;
      }
    }

</script>

<style scoped>


</style>