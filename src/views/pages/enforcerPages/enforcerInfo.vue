<template>
    <div>
        <div class="container-fluid mt-3" style="width: 100%;height: 100%;">
            <div class="card d-flex justify-content-center">
                <div class="card-body">
                    <div class="fs-3 text-center">Enforcer Personal Info</div>
                    <div class="form-group">
                        <label for="firstname" class="form-label">First Name:</label>
                        <input type="text" id="firstname" name="firstname" required class="form-control" v-model="firstname" placeholder="Enter Your First name...">
                        <label for="lastname" class="form-label">Last Name:</label>
                        <input type="text" id="lastname" name="lastname" required class="form-control" v-model="lastname" placeholder="Enter Your Last name...">
                        <label for="middlename" class="form-label">Middle Name:</label>
                        <input type="text" id="middlename" name="middlename" required class="form-control" v-model="middlename" placeholder="Enter Your Middle name...">
                        <label for="birthday" class="form-label">Birthday</label>
                        <input type="date" name="birthday" class="form-control" id="birthday" v-model="birthday">
                        <label for="sex" class="form-label">Sex</label>
                        <select name="sex" id="sex" class="form-control" v-model="sex">
                            <option value="" selected disabled>Select your Sex..</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <div class="mt-3">
                            <button type="button" class="btn btn-primary" @click="clickSubmit">Submit</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import AuthenticationServices from '@/services/AuthenticationService'
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';


const users = localStorage.getItem('user');
const user = JSON.parse(users);
const firstname = ref('')
const lastname = ref('')
const middlename = ref('')
const birthday = ref('')
const sex = ref('')
const router = useRouter()

const clickSubmit = ()=>{
    Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, proceed',
        cancelButtonText: 'No, cancel',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          submitInfo();
        }
      });
}

const submitInfo = async()=>{
    try {
        const response = AuthenticationServices.enforcerInfo({
            user_id:parseInt(user.id),
            first_name:firstname.value,
            last_name:lastname.value,
            middle_name:middlename.value,
            birthday:birthday.value,
            sex:sex.value
        })
        if(response){
            Swal.fire('Success', response.data.msg, 'success');
            router.push('/enforcer/enforcerDashboard');
        }
    } catch (error) {
        console.log(error)
        Swal.fire('Error', error.response.msg, 'error');
    }
}


</script>

<style scoped>

</style>