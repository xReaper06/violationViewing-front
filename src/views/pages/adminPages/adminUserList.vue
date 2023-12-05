<template>
        <div>
            
<div class="container mb-5 text-center w-50">
  <!-- Bootstrap text field for search -->
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
                Disable User
              </button>
            </div>
          </div>
          <div v-else>
            <!-- Bootstrap button to enable user -->
            <button class="btn btn-success" @click="enableUser(user)">
              Enable User
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