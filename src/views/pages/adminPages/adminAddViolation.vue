<template>
    <div>
        <div class="container">
            <div class="form-group">
                <select name="violationType" id="violationType" v-model="violationType">
                    <option value="Normal">Normal</option>
                    <option value="Empound">Empound</option>
                </select>
            </div>
            <div class="container-fluid" v-if="violationType == 'Normal'">
                <div class="text-center">
                <h1 class="display-4">Normal Citation</h1>
              </div>
              <div class="mb-10 text-center">
                <input
                  placeholder="Type the number of Violation"
                  v-model="violationCount"
                  class="form-control"
                  name="text"
                  type="number"
                  min="0"
                  max="10"
                />
                <button
                  type="button"
                  @click="showCitationForm"
                  class="btn btn-primary mt-3"
                >
                  Activate Citation
                </button>
                <div v-if="citationForm">
                  <!-- Your Form Fields and Controls -->
                  <!-- Bootstrap form controls -->
                  <!-- Example: -->
                  <div class="mb-3">
                    <label for="ticket_no" class="form-label"
                      >Ticket number</label
                    >
                    <input
                      v-model="formData.ticket_no"
                      type="number"
                      class="form-control"
                      id="ticket_no"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="license_no" class="form-label"
                      >License No.</label
                    >
                    <input
                      v-model="formData.license_no"
                      type="text"
                      class="form-control"
                      id="license_no"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label for="unit" class="form-label">Unit</label>
                    <input
                      v-model="formData.unit"
                      type="text"
                      class="form-control"
                      id="unit"
                      required
                    />
                  </div>
                  <div v-for="i in violationCount" :key="i" class="mb-3">
                    <div class="row">
                      <div class="col-12 text-center">
                        <label for="'violations-' + i" class="form-label"
                          >Violations</label
                        >
                        <select
                          v-model="specific_violations.violations[i - 1]"
                          class="form-select"
                          required
                          :id="'violations-' + i"
                        >
                          <option
                            v-for="violation in violationName"
                            :key="violation"
                            :value="violation"
                          >
                            {{ violation }}
                          </option>
                        </select>
                      </div>
                      <div class="col-12 text-center">
                        <label for="'fines-' + i" class="form-label"
                          >Fine</label
                        >
                        <input
                          v-model="specific_violations.fines[i - 1]"
                          type="number"
                          class="form-control"
                          required
                          :id="'fines-' + i"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="place_of_violation" class="form-label"
                      >Place of Violation</label
                    >
                    <select
                      v-model="formData.place_of_violation"
                      class="form-select"
                      id="place_of_violation"
                      required
                    >
                      <option value="" disabled>
                        Select Place of Violation
                      </option>
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
                    <label for="name_of_driver" class="form-label"
                      >Name of Driver</label
                    >
                    <input
                      v-model="formData.name_of_driver"
                      type="text"
                      class="form-control"
                      id="name_of_driver"
                      required
                    />
                  </div>
                  <!-- Add more form fields as needed -->
                  <div class="mb-3">
                    <button @click="normalCitation" class="btn btn-primary">
                      Submit
                    </button>
                  </div>
            </div>
            </div>
            </div>
            <div class="container-fluid" v-if="violationType == 'Empound'">
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
                                    required>
                            </div>
                            <div class="mb-3">
                                <label for="unit" class="form-label">Unit</label>
                                <input v-model="formData.unit" type="text" class="form-control" id="unit" required>
                            </div>
                            <div v-for="i in violationCount" :key="i" class="mb-3">
    <div class="row">
        <div class="col-12 text-center">
            <label for="'violations-' + i" class="form-label">Violations</label>
            <select v-model="specific_violations.violations[i - 1]" class="form-select" required
                :id="'violations-' + i">
                <option v-for="violation in violationName" :key="violation" :value="violation">{{ violation }}
                </option>
            </select>
        </div>
        <div class="col-12 text-center">
            <label for="'fines-' + i" class="form-label">Fine</label>
            <input v-model="specific_violations.fines[i - 1]" type="number" class="form-control" required
                :id="'fines-' + i">
        </div>
    </div>
</div>
                            <div class="mb-3">
                                <label for="place_of_violation" class="form-label">Place of Violation</label>
                                <select v-model="formData.place_of_violation" class="form-select"
                                    id="place_of_violation" required>
                                    <option value="" disabled>Select Place of Violation</option>
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
                                    id="name_of_driver" required>
                            </div>
                            <!-- Add more form fields as needed -->
                            <div class="mb-3">
                                <button @click="impoundCitation" class="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import AuthenticationService from "@/services/AuthenticationService";
import { ref, reactive, watchEffect } from "vue";
import { onMounted } from "vue";
const violationType = ref('Normal')

const err = ref("");

let citationForm = ref(false);
const showCitationForm = () => {
  citationForm.value = !citationForm.value;
};
const formData = ref({
  ticket_no: "",
  license_no: "",
  unit: "",
  place_of_violation: "",
  name_of_driver: "",
});
const violationCount = ref(1);
const specific_violations = reactive({
  violations: [],
  fines: [],
});
watchEffect(() => {
  if (violationCount.value >= 10) {
    violationCount.value = 10;
  } else if (violationCount.value <= -1) {
    violationCount.value = 0;
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

onMounted(() => {
  getAllViolations();
});

const user = ref([]);
const username = ref("");

//handle citation request
const normalCitation = async () => {
  user.value = localStorage.getItem("user");
  username.value = JSON.parse(user.value);
  try {
    const response = await AuthenticationService.adminNormalCitation({
        ticket_no:formData.value.ticket_no,
        license_no:formData.value.license_no,
        unit:formData.value.unit,
        specific_violations:specific_violations.violations,
        fines:specific_violations.fines,
        place_of_violation:formData.value.place_of_violation,
        name_of_driver:formData.value.name_of_driver,
        apprehending_officer:username.value.nickname
    });
    if (response) {
      location.reload();
    }
  } catch (error) {
    err.value = error.response.data.msg;
  }
};
const impoundCitation = async () => {
  user.value = localStorage.getItem("user");
  username.value = JSON.parse(user.value);
  try {
    const response = await AuthenticationService.adminImpoundCitation({
        ticket_no:formData.value.ticket_no,
        unit:formData.value.unit,
        specific_violations:specific_violations.violations,
        fines:specific_violations.fines,
        place_of_violation:formData.value.place_of_violation,
        name_of_driver:formData.value.name_of_driver,
        apprehending_officer:username.value.nickname
    });
    if (response) {
      location.reload();
    }
  } catch (error) {
    err.value = error.response.data.msg;
  }
};


</script>

<style scoped>

</style>