<template>
    <div>
        <div>
            <div class="container-fluid mt-3">
        <div class="row justify-content-center">
            <div class="col-sm-10 col-md-8">
                <div class="card shadow p-3 mb-5 bg-white rounded">
                    <div class="mb-5">
                        <!-- Your SVG Code -->
                        <router-link class="btn btn-primary" to="/enforcer/enforcerDashboard">
                            <div class="d-flex align-items-center">
                                <span class="me-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-back-up" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 14l-4 -4l4 -4" /><path d="M5 10h11a4 4 0 1 1 0 8h-1" /></svg>
                                </span>
                            </div>
                        </router-link>
                    </div>
                    <div class="text-center">
                        <h1 class="display-4">Impound Citation</h1>
                    </div>
                    <div class="mb-10 text-center">
                        <input placeholder="Type the number of Violation" v-model="violationCount" class="form-control"
                            name="text" type="number" min="0" max="10" />
                        <button type="button" @click="showCitationForm" class="btn btn-primary mt-3">Activate
                            Citation</button>
                        <div v-if="citationForm">
                            <!-- Your Form Fields and Controls -->
                            <!-- Bootstrap form controls -->
                            <!-- Example: -->
                              <div class="mb-3">
                                  <label for="ticket_no" class="form-label">Ticket number</label>
                                  <input v-model="formData.ticket_no" type="number" class="form-control" id="ticket_no"
                                    placeholder="Enter ticket number"  required>
                              </div>
                              <div class="mb-3">
                                  <label for="unit" class="form-label">Unit</label>
                                  <input v-model="formData.unit" type="text" placeholder="Enter the unit" class="form-control" id="unit" required>
                              </div>
                              <div class="mb-3">
                                  <label for="unit" class="form-label">Plate no.</label>
                                  <input v-model="formData.plate_no" type="text" placeholder="Enter the plate Number" class="form-control" id="plate_no" required>
                              </div>
                              <div v-for="i in violationCount" :key="i" class="mb-3">
      <div class="row">
          <div class="col-12 text-center">
              <label for="'violations-' + i" class="form-label">Violations</label>
              <select v-model="specific_violations.violations[i - 1]" class="form-select" required
                  :id="'violations-' + i">
                  <option value="" selected disabled>Select the Violation</option>
                  <option v-for="violation in violationName" :key="violation" :value="violation">{{ violation }}
                  </option>
              </select>
          </div>
          <div class="col-12 text-center">
              <label for="'fines-' + i" class="form-label">Fine</label>
              <input v-model="specific_violations.fines[i - 1]" type="number" class="form-control" required
              placeholder="Enter the fine"
                  :id="'fines-' + i">
          </div>
      </div>
  </div>
                              <div class="mb-3">
                                  <label for="place_of_violation" class="form-label">Place of Violation</label>
                                  <select v-model="formData.place_of_violation" class="form-select"
                                      id="place_of_violation" required>
                                      <option value="" disabled selected>Select Place of Violation</option>
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
                                      <!-- Add more options as needed -->
                                  </select>
                              </div>
                              <div class="mb-3">
                                  <label for="name_of_driver" class="form-label">Name of Driver</label>
                                  <input v-model="formData.name_of_driver" type="text" class="form-control"
                                      id="name_of_driver" placeholder="Enter the name of the Driver/Rider" required>
                              </div>
                              <div class="mb-3">
                                  <label for="unit_empounded" class="form-label">Unit Empounded</label>
                                  <input type="file" class="form-control" id="unit_empounded" placeholder="Choose Pictures"
                                      @change="handleimageChange" accept="image/jpeg, image/jpg, image/png">
                                  <div v-if="showFile">
                                      <img :src="fileView.preview" alt="Selected Image" style="max-width: 100px; max-height: 100px;">
                                  </div>
                              </div>
                              <!-- Add more form fields as needed -->
                              <div class="mb-3">
                                  <button @click="clickSubmit" class="btn btn-primary">Submit</button>
                              </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </div>

    </div>
</template>

<script setup>
import AuthenticationService from '@/services/AuthenticationService';
import { ref,watchEffect,reactive,onMounted } from 'vue'
import Swal from 'sweetalert2';
const fileView = ref({ preview: "" });
const showFile = ref(false);
const file = ref(null);



      let citationForm = ref(false)
      const showCitationForm = ()=>{
        citationForm.value = !citationForm.value
      }
      const formData = ref({
            ticket_no:'',
            unit:'',
            plate_no:'',
            place_of_violation:'',
            name_of_driver:'',

          })
        const violationCount = ref(1);
        const specific_violations = reactive({
          violations:[],
          fines:[],
        });
        const user = ref([])
        const username = ref('')
        const handleimageChange = (event)=>{
          const img = event.target.files;
    if (img.length > 0) {
      file.value = img[0];
  
      const reader = new FileReader();
      reader.onload = (e) => {
        fileView.value = {
          name: img[0].name,
          preview: e.target.result,
        };
        showFile.value = true;
      };
      reader.readAsDataURL(img[0]);
    }
}

        watchEffect(() => {
  if (violationCount.value >= 10) {
    violationCount.value = 10;
  }else if(violationCount.value<=-1){
    violationCount.value = 0
  }
});
const violationName = ref([]);

const getAllViolations = async () => {
  try {
    const response = await AuthenticationService.getAllViolationList();
    if (response) {
      const all = response.data.violationList;
      violationName.value = all.map((violation) => violation.name);
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(()=>{
  getAllViolations();
})

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
          impoundCitation();
        }
      });
}

        const impoundCitation = async()=>{
          user.value = localStorage.getItem('user')
          username.value = JSON.parse(user.value)
          const apend = new FormData();
            apend.append('evidences',file.value)
            
          for (let i = 0; i < specific_violations.violations.length; i++) {
            apend.append('specific_violations',specific_violations.violations[i])
          }
          for (let i = 0; i < specific_violations.fines.length; i++) {
            apend.append('fines',specific_violations.fines[i])
          }
          apend.append('ticket_no',formData.value.ticket_no)
          apend.append('unit',formData.value.unit)
          apend.append('plate_no',formData.value.plate_no)
          apend.append('place_of_violation',formData.value.place_of_violation)
          apend.append('name_of_driver',formData.value.name_of_driver)
          apend.append('apprehending_officer',username.value.nickname)
          try {
            const response = await AuthenticationService.impoundCitation(apend,{
              headers:{
                "Content-Type": "application/json",
              },
            });
            if (response) {
            Swal.fire('Success', response.data.msg, 'success');
            formData.value.ticket_no = ''
            formData.value.unit = ''
            formData.value.plate_no = ''
            formData.value.place_of_violation = ''
            formData.value.name_of_driver = ''
            specific_violations.violations = []
            specific_violations.fines = []

            }
            console.log(response.data.msg)
          } catch (error) {
            Swal.fire('Error', error.response.data.msg, 'error');     

          }
        }

</script>

<style scoped>

</style>