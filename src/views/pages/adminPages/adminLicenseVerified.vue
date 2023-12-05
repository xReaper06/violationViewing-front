<template>
        <div>
            
    <div class="container mt-5">
        <!-- Bootstrap card for styling -->
        <div class="card elevation-6">
            <!-- Heading for the card -->
            <h2 class="card-title text-center font-weight-bold mt-4" style="color: #090a0a;">Verified Licenses</h2>

            <!-- Table to display verified licenses -->
            <div class="table-responsive mt-4">
                <table id="myDataTable" class="table table-light">
                    <thead>
                        <tr>
                            <th scope="col">USER ID</th>
                            <th scope="col">License Number</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Middle Name</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody v-for="license in licenses" :key="license.id">
                        <tr>
                            <td>{{ license.user_id }}</td>
                            <td>{{ license.license_no }}</td>
                            <td>{{ license.first_name }}</td>
                            <td>{{ license.last_name }}</td>
                            <td>{{ license.middle_name }}</td>
                            <!-- View button with router link -->
                            <td>
                                <router-link :to="{ name: 'adminViewLicense', props: { id: license.id }, params: { id: license.id } }">
                                    <button class="btn btn-success">
                                        VIEW
                                    </button>
                                </router-link>
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
import { useAuthStore } from "@/store/index";
import AuthenticationService from '@/services/AuthenticationService';
import { ref} from "vue";

        const licenses = ref([])

        const Verified = async () => {
            const authStore = useAuthStore();
            try {
                const response = await AuthenticationService.getAllLicenseVerified();
                licenses.value = response.data.licenses;
                // Assuming allLicense is an array of licenses, you can loop through them
                // and push each license individually into the licenses array
                authStore.setLicenseVerified(licenses.value);
            } catch (err) {
                console.error(err);
            }
        };
        Verified();

</script>

<style scoped>


</style>