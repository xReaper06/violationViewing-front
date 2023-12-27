<template>
    <div>
      <div v-if="error" class="container mt-4">
        <div class="alert alert-danger" role="alert">
          <strong>Error:</strong> {{ msg }}
        </div>
      </div>
  
      <div v-if="success" class="container mt-4">
        <div class="alert alert-success" role="alert">
          <strong>Success:</strong> {{ msg }}
        </div>
      </div>

      <div class="container mt-4">
        <div class="text-center">
          <h1>License Verification</h1>
        </div>
  
        <div class="container mt-4">
          <!-- ... (Previous code) ... -->
          <div v-if="showFront" class="mt-3">
        <img :src="frontView.preview" alt="Selected Image" class="img-fluid" style="max-width: 150px; max-height: 150px;">
      </div>

      <!-- Front Picture Input -->
      <div class="row mt-3">
        <div class="col-md-4 col-lg-4 offset-md-4">
          <label for="frontPicture" class="form-label">Front Picture</label>
          <input type="file" class="form-control" id="frontPicture" accept="image/jpeg, image/jpg, image/png" @change="handleFrontPicChange">
        </div>
      </div>

      <div v-if="showBack" class="mt-3">
        <img :src="backView.preview" alt="Selected Image" class="img-fluid" style="max-width: 150px; max-height: 150px;">
      </div>

      <!-- Back Picture Input -->
      <div class="row mt-3">
        <div class="col-md-4 col-lg-4 offset-md-4">
          <label for="backPicture" class="form-label">Back Picture</label>
          <input type="file" class="form-control" id="backPicture" accept="image/jpeg, image/jpg, image/png" @change="handleBackPicChange">
        </div>
      </div>

      <!-- License Number Input -->
      <div class="row mt-3">
        <div class="col-md-4 col-lg-4 offset-md-4">
          <label for="licenseNumber" class="form-label">License Number</label>
          <input type="text" class="form-control" placeholder="Enter your License number" v-model="license_no" required>
        </div>
          <!-- Expiration Date Input -->
  <div class="row mt-3">
    <div class="col-md-4 col-lg-4 offset-md-4">
      <label for="expirationDate" class="form-label">Expiration Date</label>
      <input type="date" class="form-control" placeholder="Enter The expiration Date" v-model="expiration_date" required>
    </div>
  </div>

  <!-- Agency Code Input -->
  <div class="row mt-3">
    <div class="col-md-4 col-lg-4 offset-md-4">
      <label for="agencyCode" class="form-label">Agency Code</label>
      <input type="text" class="form-control" placeholder="Enter The Agency Code" v-model="agency_code" required>
    </div>
  </div>

  <!-- Blood Type Input -->
  <div class="row mt-3">
    <div class="col-md-4 col-lg-4 offset-md-4">
      <label for="bloodType" class="form-label">Blood Type</label>
      <select class="form-control" v-model="blood_type">
        <option value="" selected disabled>Select Your Blood Type</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
      </select>
    </div>
  </div>

  <!-- Eye Color Input -->
  <div class="row mt-3">
    <div class="col-md-4 col-lg-4 offset-md-4">
      <label for="eyeColor" class="form-label">Eye Color</label>
      <input type="text" class="form-control" placeholder="Enter Eye Color" v-model="eye_color" required>
    </div>
  </div>

  <!-- Restriction Input -->
  <div class="row mt-3">
    <div class="col-md-4 col-lg-4 offset-md-4">
      <label for="restriction" class="form-label">Restriction</label>
      <select class="form-control" v-model="restrictions">
        <option value="" selected disabled>Select the Restriction</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
  </div>

  <!-- Conditions Input -->
  <div class="row mt-3">
    <div class="col-md-4 col-lg-4 offset-md-4">
      <label for="conditions" class="form-label">Conditions</label>
      <input type="text" class="form-control" placeholder="Enter the Condition you have" v-model="conditions" required>
    </div>
  </div>

  <!-- First Name Input -->
  <div class="row mt-3">
    <div class="col-md-4 col-lg-4 offset-md-4">
      <label for="firstName" class="form-label">First Name</label>
      <input type="text" class="form-control" placeholder="Enter your First name" v-model="first_name" required>
    </div>
  </div>

  <!-- Last Name Input -->
  <div class="row mt-3">
    <div class="col-md-4 col-lg-4 offset-md-4">
      <label for="lastName" class="form-label">Last Name</label>
      <input type="text" class="form-control" placeholder="Enter your Last name" v-model="last_name" required>
    </div>
  </div>

  <!-- Middle Name Input -->
  <div class="row mt-3">
    <div class="col-md-4 col-lg-4 offset-md-4">
      <label for="middleName" class="form-label">Middle Name</label>
      <input type="text" class="form-control" placeholder="Enter Your Middle name also add a Space then put your extension name like Jr/Sr." v-model="middle_name" required>
    </div>
  </div>

  <!-- Nationality Input -->
  <div class="row mt-3">
    <div class="col-md-4 col-lg-4 offset-md-4">
      <label for="nationality" class="form-label">Nationality</label>
      <input type="text" class="form-control" placeholder="Enter your Nationality" v-model="nationality" required>
    </div>
  </div>

  <!-- Sex Input -->
  <div class="row mt-3">
    <div class="col-md-4 col-lg-4 offset-md-4">
      <label for="sex" class="form-label">Sex</label>
      <select class="form-control" v-model="sex">
        <option value="" selected disabled>Select your Sex</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>
  </div>

  <!-- Date of Birth Input -->
  <div class="row mt-3">
    <div class="col-md-4 col-lg-4 offset-md-4">
      <label for="dateOfBirth" class="form-label">Date of Birth</label>
      <input type="date" class="form-control" v-model="date_of_birth" required>
    </div>
  </div>

  <!-- Weight Input -->
  <div class="row mt-3">
    <div class="col-md-4 col-lg-4 offset-md-4">
      <label for="weight" class="form-label">Weight in Kg</label>
      <input type="number" class="form-control" placeholder="Enter your Weight in Kg" v-model="weight" required>
    </div>
  </div>

  <!-- Height Input -->
  <div class="row mt-3">
    <div class="col-md-4 col-lg-4 offset-md-4">
      <label for="height" class="form-label">Height in Meter</label>
      <input type="number" class="form-control" placeholder="Enter your heigh in meter" v-model="height" required>
    </div>
  </div>

  <!-- Street/Sitio Input -->
  <div class="row mt-3">
    <div class="col-md-4 col-lg-4 offset-md-4">
      <label for="street" class="form-label">Street/Sitio</label>
      <input type="text" class="form-control" placeholder="Enter the Street/Sitio you live" v-model="street" required>
    </div>
  </div>

  <!-- Baranggay Input -->
  <div class="row mt-3">
    <div class="col-md-4 col-lg-4 offset-md-4">
      <label for="baranggay" class="form-label">Baranggay</label>
      <input type="text" class="form-control" placeholder="Enter the baranggay" v-model="baranggay" required>
    </div>
  </div>

  <!-- City Input -->
  <div class="row mt-3">
    <div class="col-md-4 col-lg-4 offset-md-4">
      <label for="city" class="form-label">City</label>
      <input type="text" class="form-control" placeholder="Enter the city" v-model="city" required>
    </div>
  </div>
          <!-- Province Input -->
          <div class="row mt-3">
            <div class="col-md-4 col-lg-4 offset-md-4">
              <label for="province" class="form-label">Province</label>
              <input type="text" class="form-control" placeholder="Enter the province" v-model="province" required />
            </div>
          </div>
  
          <!-- Submit Button -->
          <div class="row mt-3">
            <div class="col-md-12 text-center">
              <button class="btn btn-success" @click="verifyLicense">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </template>
  

<script setup>
import { ref } from 'vue';
import AuthenticationService from '@/services/AuthenticationService'
import { useRouter } from "vue-router";
        const front_pic = ref(null)
     const back_pic = ref(null)
     const license_no = ref('')
     const expiration_date = ref('')
     const agency_code = ref('')
     const blood_type = ref('')
     const eye_color = ref('')
     const restrictions = ref('')
     const conditions = ref('')
     const first_name = ref('')
     const last_name = ref('')
     const middle_name = ref('')
     const nationality = ref('')
     const sex = ref('')
     const date_of_birth = ref('')
     const weight = ref('')
     const height = ref('')
     const street = ref('')
     const baranggay = ref('')
     const city = ref('')
     const province = ref('')
     const success = ref(null)
     const error = ref(null)
     const showBack = ref(false);
     const showFront = ref(false);
const frontView = ref({ preview: "" });
const backView = ref({ preview: "" });


     const user = ref('')
    const id = ref('')
    user.value = localStorage.getItem('user');
    id.value = JSON.parse(user.value);


    
    


     const handleFrontPicChange = (event)=>{
      const img = event.target.files;

    // Store it in your component's data
    if (img.length > 0) {
      front_pic.value = img[0];
  
      const reader = new FileReader();
      reader.onload = (e) => {
        frontView.value = {
          name: img[0].name,
          preview: e.target.result,
        };
        showFront.value = true;
      };
      reader.readAsDataURL(img[0]);
    }
     }

     const handleBackPicChange = (event)=>{
      const img = event.target.files;

// Store it in your component's data
if (img.length > 0) {
  back_pic.value = img[0];

  const reader = new FileReader();
  reader.onload = (e) => {
    backView.value = {
      name: img[0].name,
      preview: e.target.result,
    };
    showBack.value = true;
  };
  reader.readAsDataURL(img[0]);
}
     }

     let router = useRouter()
     const verifyLicense = async()=>{
      try {
           
           let formdata = new FormData();
           formdata.append('user_id',id.value.id)
           formdata.append('front_pic',front_pic.value)
           formdata.append('back_pic',back_pic.value)
           formdata.append('license_no',license_no.value)
           formdata.append('expiration_date',expiration_date.value)
           formdata.append('agency_code',agency_code.value)
           formdata.append('blood_type',blood_type.value)
           formdata.append('eye_color',eye_color.value)
           formdata.append('restrictions',restrictions.value)
           formdata.append('conditions',conditions.value)
           formdata.append('first_name',first_name.value)
           formdata.append('last_name',last_name.value)
           formdata.append('middle_name',middle_name.value)
           formdata.append('nationality',nationality.value)
           formdata.append('sex',sex.value)
           formdata.append('date_of_birth',date_of_birth.value)
           formdata.append('weight',weight.value)
           formdata.append('height',height.value)
           formdata.append('street',street.value)
           formdata.append('baranggay',baranggay.value)
           formdata.append('city',city.value)
           formdata.append('province',province.value)
        const response = await AuthenticationService.insertLicense(formdata)
        success.value = response.data.msg
        router.push('/user/myLicense')
    } catch (err) {
        error.value = err.response.data.msg
    }
  }


</script>

<style scoped>

</style>