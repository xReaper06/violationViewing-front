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

<div class="container mb-5 text-center w-50">
  <!-- Bootstrap text field for search -->
  <input type="text" class="form-control mb-2" v-model="searchQuery" placeholder="Search Username....">
  <br>
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
          <button class="btn btn-danger" @click="removeEnforcer(enforcer)">Remove Enforcer</button>
          <div v-if="enforcer.flag === 1">
            <div v-show="showBtn">
              <!-- Bootstrap button to disable enforcer -->
              <button class="btn btn-warning" @click="disableUser(enforcer)">
                Disable Enforcer
              </button>
            </div>
          </div>
          <div v-else>
            <!-- Bootstrap button to enable enforcer -->
            <button class="btn btn-success" @click="enableUser(enforcer)">
              Enable Enforcer
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
        </div>
</template>

<script setup>
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

            const send_registration = async()=>{
    try {
        const response = await axios.post('http://192.168.0.108:8084/api/send-registration-form',{
            email:email.value
        })
        if(response){
          registrationForm.value = false
            email.value = null;
            success.value = response.data.msg;
        }
    } catch (error) {
        console.log(error)
        err.value = error.response.data.msg
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
          const response = AuthenticationService.disableUser({
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