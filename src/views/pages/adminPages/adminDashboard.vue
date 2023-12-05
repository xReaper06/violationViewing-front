        <template>
  <div class="container-fluid mt-5">
    <!-- Heading for the page -->
    <h2 class="ms-5 mt-5">Home</h2>

    <!-- Bootstrap row for layout -->
    <div class="row mt-4">

      <!-- Column for Verified Users -->
      <div class="col-md-3 mb-4" style="height: 50px; width: 400px;">
        <div class="card">
          <div class="card-title">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user-check text-success" width="50" height="50" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /><path d="M15 19l2 2l4 -4" /></svg>
                        Verified Users
            <span class="badge badge-primary bg-dark text-white fs-6 mt-2 me-3">{{ countVerifiedusers }}</span>
          </div>
          <!-- Add content for Verified Users here -->
        </div>
      </div>

      <!-- Column for Verified License -->
      <div class="col-md-3 mb-4" style="height: 50px; width: 400px;">
        <div class="card">
          <div class="card-title">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-id-badge-2" width="50" height="50" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 12h3v4h-3z" /><path d="M10 6h-6a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1 -1v-12a1 1 0 0 0 -1 -1h-6" /><path d="M10 3m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /><path d="M14 16h2" /><path d="M14 12h4" /></svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check text-success" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
            Verified License
            <span class="badge badge-primary bg-dark text-white fs-6 mt-2 me-3">{{ License.length }}</span>
          </div>
          <!-- Add content for Verified License here -->
        </div>
      </div>

      <!-- Column for License Need To Verify -->
      <div class="col-md-3 mb-5" style="height: 50px; width: 400px;">
        <div class="card">
          <div class="card-title">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-id-badge-2" width="50" height="50" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 12h3v4h-3z" /><path d="M10 6h-6a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1 -1v-12a1 1 0 0 0 -1 -1h-6" /><path d="M10 3m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /><path d="M14 16h2" /><path d="M14 12h4" /></svg>
            License Need To Verify
            <span class="badge badge-primary bg-dark text-white fs-6 mt-2 me-3">{{ NotVerified.length }}</span>
            <router-link to="/admin/adminLicenseNotVerified" class="btn btn-primary mt-2">View</router-link>
          </div>
          <!-- Add content for License Need To Verify here -->
        </div>
      </div>

      <!-- Column for Violators or Users (based on showViolations) -->
      <!-- Column for Violations (if showViolations is true) -->
      <div class="col-md-8 mb-4">
        <div class="card">
          <h6 class="text-center">Violations</h6>
          <canvas id="lineChart" height="50" width="150"></canvas>
        </div>
      </div>

      <!-- Column for Users (if showUsers is true) -->
      <div class="col-md-4 mb-4">
        <div class="card">
          <h6 class="text-center">Users</h6>
          <canvas id="pieChart" style="height: 100px; width: 100px;"></canvas>
        </div>
      </div>
      <div class="col-md-8 mb-4">
        <div class="card">
          <h6 class="text-center">violations By Year</h6>
          <select name="year" id="year" v-model="year" @change="getAllViolationsByYear">
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
          </select>
          <canvas id="barChart" style=" width: 100px;"></canvas>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>

import AuthenticationService from '@/services/AuthenticationService';
import { onMounted,ref,computed, watchEffect } from 'vue';
import Chart from 'chart.js/auto';

const users = ref([]);
const violators = ref([])
const License = ref([])
const NotVerified = ref([]);
const violationsByYear = ref([]);
const year = ref('2023')
let countImpoundValueByYear = ref('');
let countNormalValueByYear = ref('')
let countImpoundValue = ref('');
let countNormalValue = ref('')
let countOnlineValue = ref('')
let countOfflineValue = ref('')

const getAllViolationsByYear = onMounted(async()=>{
  try {
    const response = await AuthenticationService.getAllViolationsByYear({
      year:year.value
    })
    if(response){
      violationsByYear.value = response.data.dateViolators;
      countImpoundValueByYear.value = countImpoundByYear.value
      countNormalValueByYear.value = countNormalByYear.value
    }
  } catch (error) {
    console.log(error)
  }
})


const getAllViolations = async ()=>{
  try {
    const response = await AuthenticationService.getAllViolators();
    if(response){
      violators.value = response.data.violators
      countImpoundValue.value = countImpound.value
      countNormalValue.value = countNormal.value
    }
  } catch (error) {
    console.log(error)
  }
}

const getAllUsers = async()=>{
  try {
    const response = await AuthenticationService.getAllUsers();
    if(response){
      users.value =response.data.allUsers
      console.log('Online Users:', countOnlineUsers.value);
      countOnlineValue.value = countOnlineUsers.value
      console.log('Offline Users:', countOfflineUsers.value);
      countOfflineValue.value = countOfflineUsers.value

console.log('Verified Users:', countVerifiedusers.value);
    }
  } catch (error) {
    console.log(error)
  }
}
const getAllNotVerified = async()=>{
  try{
    const response = await AuthenticationService.getAllLicenseNotYetVerified();
    if(response){
      NotVerified.value = response.data.licenses
    }
  }catch(error){
    console.log(error)
  }
}
const getAllLicense = async()=>{
  try {
    const response = await AuthenticationService.getAllLicenseVerified()
    if(response){
      License.value = response.data.licenses

    }
  } catch (error) {
    console.log(error)
  }
}
const countOnlineUsers = computed(()=>{
  return users.value.filter((user)=>user.status === 'online' && user.user_role === 'user').length
})
const countOfflineUsers = computed(()=>{
  return users.value.filter((user)=>user.status === 'offline' && user.user_role === 'user').length
})
const countVerifiedusers = computed(()=>{
  return users.value.filter((user)=>user.email_verified != null).length
})
const countImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound').length;
})
const countNormal =computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal').length;
})
const countImpoundByYear = computed(()=>{
  return violationsByYear.value.filter((violator) =>violator.status === 'impound').length;
})
const countNormalByYear =computed(()=>{
  return violationsByYear.value.filter((violator) =>violator.status === 'normal').length;
})
const PoblacionImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Poblacion').length;
})
const PoblacionNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Poblacion').length;
})
const CatarmanImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Catarman').length;
})
const CatarmanNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Catarman').length;
})
const IbabaoImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Ibabao').length;
})
const IbabaoNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Ibabao').length;
})
const AlegriaImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Alegria').length;
})
const AlegriaNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Alegria').length;
})
const GabiImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Gabi').length;
})
const GabiNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Gabi').length;
})
const GilutunganImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Gilutungan').length;
})
const GilutunganNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Gilutungan').length;
})
const PilipogImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Pilipog').length;
})
const PilipogNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Pilipog').length;
})
const DapitanImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Dapitan').length;
})
const DapitanNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Dapitan').length;
})
const BuagsongImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Buagsong').length;
})
const BuagsongNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Buagsong').length;
})
const DayasImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Day-as').length;
})
const DayasNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Day-as').length;
})
const BangbangImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Bangbang').length;
})
const BangbangNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Bangbang').length;
})
const CogonImpound = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'impound' && violator.place_of_violation ==='Cogon').length;
})
const CogonNormal = computed(()=>{
  return violators.value.filter((violator) =>violator.status === 'normal' && violator.place_of_violation ==='Cogon').length;
})
const JanuaryImpound = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'impound' && monthInDate === '01';
  }).length;
});
const JanuaryNormal = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'normal' && monthInDate === '01';
  }).length;
});
const februaryImpound = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'impound' && monthInDate === '02';
  }).length;
});
const februaryNormal = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'normal' && monthInDate === '02';
  }).length;
});
const marchImpound = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'impound' && monthInDate === '03';
  }).length;
});
const marchNormal = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'normal' && monthInDate === '03';
  }).length;
});
const aprilImpound = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'impound' && monthInDate === '04';
  }).length;
});
const aprilNormal = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'normal' && monthInDate === '04';
  }).length;
});
const mayImpound = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'impound' && monthInDate === '05';
  }).length;
});
const mayNormal = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'normal' && monthInDate === '05';
  }).length;
});
const JuneImpound = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'impound' && monthInDate === '06';
  }).length;
});
const JuneNormal = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'normal' && monthInDate === '06';
  }).length;
});
const julyImpound = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'impound' && monthInDate === '07';
  }).length;
});
const julyNormal = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'normal' && monthInDate === '07';
  }).length;
});
const augustImpound = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'impound' && monthInDate === '08';
  }).length;
});
const augustNormal = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'normal' && monthInDate === '08';
  }).length;
});
const septemberImpound = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'impound' && monthInDate === '09';
  }).length;
});
const septemberNormal = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'normal' && monthInDate === '09';
  }).length;
});
const OctoberImpound = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'impound' && monthInDate === '10';
  }).length;
});
const OctoberNormal = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'normal' && monthInDate === '10';
  }).length;
});
const novemberImpound = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'impound' && monthInDate === '11';
  }).length;
});
const novemberNormal = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'normal' && monthInDate === '11';
  }).length;
});
const decemberImpound = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'impound' && monthInDate === '12';
  }).length;
});
const decemberNormal = computed(() => {
  return violationsByYear.value.filter((violator) => {
    // Assuming violator.date_and_time is a date string with the format "YYYY-MM-DD"
    const monthInDate = new Date(violator.date_and_time).toISOString().split('-')[1]; // Extracting the month part
    
    // Check if the status is 'normal' and the month is "01" for January
    return violator.status === 'normal' && monthInDate === '12';
  }).length;
});


// Define the data for the chart


onMounted(async()=>{
  getAllViolationsByYear
  await getAllLicense();
 await getAllNotVerified();
  await getAllViolations();
  const linebardata = {
  labels: ['Poblacion', 'Catarman', 'Ibabao', 'Alegria', 'Gabi', 'Gilutungan', 'Pilipog', 'Dapitan', 'Buagsong', 'Day-as', 'Bangbang', 'Cogon'],
  datasets: [
    {
      label: 'Impound (' + countImpound.value + ')',
      data: [PoblacionImpound.value, CatarmanImpound.value, IbabaoImpound.value, AlegriaImpound.value, GabiImpound.value, GilutunganImpound.value, PilipogImpound.value, DapitanImpound.value, BuagsongImpound.value, DayasImpound.value, BangbangImpound.value, CogonImpound.value],
      borderColor: 'blue',
      fill: false,
    },
    {
      label: 'Normal (' + countNormal.value + ')',
      data: [PoblacionNormal.value, CatarmanNormal.value, IbabaoNormal.value, AlegriaNormal.value, GabiNormal.value, GilutunganNormal.value, PilipogNormal.value, DapitanNormal.value, BuagsongNormal.value, DayasNormal.value, BangbangNormal.value, CogonNormal.value],
      borderColor: 'red',
      fill: false,
    },
  ],
};



const linebarconfig = {
  type: 'line',
  data: linebardata,
  options: {},
};

  const linebar = document.getElementById('lineChart');
  new Chart(linebar, linebarconfig); // Create a new chart instance

  await getAllUsers();
  const violatorData = [{
  label: 'Users',
  data: [
    countOfflineValue.value,
    countOnlineValue.value
  ],
  backgroundColor: [
    'rgba(7, 0, 7, 0.69)',
    'rgba(7, 222, 7, 0.8)'
  ],
  hoverOffset: 4
}];

const piedata = {
  labels: ['Offline ( '+countOfflineValue.value+' )', 'Online ( '+countOnlineValue.value+' )'],
  datasets: violatorData
};
const pieconfig = {
  type: 'pie',
  data: piedata,
};
  const pie = document.getElementById('pieChart');
  new Chart(pie, pieconfig); 
})
watchEffect(() => {
  const barchartdata = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Impound (' + countImpoundValueByYear.value + ')',
        data: [
          JanuaryImpound.value, februaryImpound.value, marchImpound.value,
          aprilImpound.value, mayImpound.value, JuneImpound.value,
          julyImpound.value, augustImpound.value, septemberImpound.value,
          OctoberImpound.value, novemberImpound.value, decemberImpound.value
        ],
        borderColor: 'black',
        backgroundColor:'black',
        fill: false,
      },
      {
        label: 'Normal (' + countNormalValueByYear.value + ')',
        data: [
          JanuaryNormal.value, februaryNormal.value, marchNormal.value,
          aprilNormal.value, mayNormal.value, JuneNormal.value,
          julyNormal.value, augustNormal.value, septemberNormal.value,
          OctoberNormal.value, novemberNormal.value, decemberNormal.value
        ],
        borderColor: 'red',
        backgroundColor:'red',
        fill: false,
      },
    ]
  };

  const barChartConfig = {
    type: 'bar',
    data: barchartdata,
    options: {},
  };

  const barChartElement = document.getElementById('barChart');

// Check if the canvas element exists
if (barChartElement) {
  // Get the existing chart instance
  let existingChart = Chart.getChart(barChartElement);

  // If the chart instance exists, destroy it
  if (existingChart) {
    existingChart.destroy();
  }

  // Create a new chart and assign it to the 'chart' property
  let chart = new Chart(barChartElement, barChartConfig);
  console.log(chart);
} else {
  console.error("Canvas element with id 'barChart' not found.");
}


});



</script>

<style scoped>

</style>