<template>
        <div>
            
<div class="container-fluid">
  <div class="card mt-3 mb-3">
    <div class="card-header">
      <div class="card-title fs-4 text-center">
        <strong>
          Users List
        </strong>
      </div>
    </div>
    <div class="card-body">
      <input type="text" class="form-control" v-model="searchQuery" placeholder="Search Nickname....">
    </div>
    
    <div class="container">
      <!-- Bootstrap table -->
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
        <tbody v-for="user in filteredUsers" :key="user.id">
          <tr>
            <td>{{ user.id }}</td>
            <td>{{ user.nickname }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.lastloggedin }}</td>
            <td>
              <div v-if="user.flag === 1">
                <div v-show="showBtn">
                  <!-- Bootstrap button to disable user -->
                  <button class="btn btn-danger" @click="disableUser(user)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-accessible-off" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 16.5l2 -3l2 3m-2 -3v-1.5m2.627 -1.376l.373 -.124m-6 0l2.231 .744" /><path d="M20.042 16.045a9 9 0 0 0 -12.087 -12.087m-2.318 1.677a9 9 0 1 0 12.725 12.73" /><path d="M12 8a.5 .5 0 1 0 -.5 -.5" /><path d="M3 3l18 18" /></svg>
                  </button>
                </div>
              </div>
              <div v-else>
                <!-- Bootstrap button to enable user -->
                <button class="btn btn-success" @click="enableUser(user)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M9 12l2 2l4 -4" /></svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  </div>
  <!-- Bootstrap text field for search -->
        </div>
</template>

<script setup>
 import AuthenticationService from '@/services/AuthenticationService';
    import { ref,computed } from 'vue';

    const showBtn = ref(true)

            const users = ref([]);
            const searchQuery = ref('');

            const getAllUsers = async ()=>{
                try{
                    const response = await AuthenticationService.getAllUsers();
                    if(response){
                        users.value = response.data.allUsers
                    }else{
                        throw Error('Empty Users')
                    }

                }catch(err){
                    console.log(err)
                }
            }
            getAllUsers();


            const filteredUsers = computed(() => {
      return users.value.filter(user => {
        return user.nickname.toLowerCase().includes(searchQuery.value.toLowerCase());
      });

    });
    const enableUser = async(user)=>{
        try {
          const response = AuthenticationService.enableUser({
            id:user.id
          })
          if(response){
            getAllUsers();
          }
      } catch (error) {
          console.log(error)
      }
    }
    const disableUser = async (user)=>{
      try {
          const response = AuthenticationService.disableUser({
            id:user.id
          })
          if(response){
            getAllUsers();
          }
      } catch (error) {
          console.log(error)
      }
    }
</script>

<style scoped>


</style>