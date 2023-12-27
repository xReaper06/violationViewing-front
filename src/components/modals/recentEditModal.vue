<template>
    <div>
        <div class="modal mb-5 pb-5" :class="{show:editModal}">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-header">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Recent Violation</h1>
                  <span class="close" @click="closeModal">&times;</span>
              </div>
              <div class="modal-body">
                <div>
                    <form id="resetForm">

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
                          <div v-if="newArray.status == 'normal'">
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
                          <div class="mb-3">
                            <label for="unit" class="form-label">Plate no</label>
                            <input
                              v-model="formData.plate_no"
                              type="text"
                              class="form-control"
                              id="plate_no"
                              required
                            />
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
                        <div class="button-container mb-5">
                          <button class="change-profile-button btn btn-primary" type="button" @click="sumbitEdit" @touchstart="sumbitEdit" @touchend="sumbitEdit">
                            Update
                          </button>
                        </div>
                    </form>
                </div>
              </div>
            </div>
            </div>
          </div>

  </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits,onMounted } from "vue";
  import AuthenticationService from "@/services/AuthenticationService";
  import Swal from "sweetalert2";
  
  const props = defineProps({
    editModal: Boolean,
    editValue:Array,
  });
  
  const emit = defineEmits(["closeModal"]);

  const editModal = ref(false)
  
  const closeModal = () => {
    emit("closeModal");
    editModal.value = false
  };
  const newArray = ref([])
  newArray.value = JSON.parse(props.editValue);
  const id = ref()
  const formData = ref({
  ticket_no: "",
  license_no: "",
  unit: "",
  plate_no: "",
  place_of_violation: "",
  name_of_driver: "",
});
onMounted(()=>{
    editModal.value = props.editModal
    id.value = newArray.value.id
    formData.value.ticket_no = newArray.value.ticket_no
    formData.value.license_no = newArray.value.license_no
    formData.value.unit = newArray.value.unit
    formData.value.plate_no = newArray.value.plate_no
    formData.value.place_of_violation = newArray.value.place_of_violation
    formData.value.name_of_driver = newArray.value.name_of_driver
})

const sumbitEdit = ()=>{
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
            updateThis();
        }
      });
}
const updateThis = async()=>{
    try {
        const response = await AuthenticationService.updateRecent({
            id:id.value,
            ticket_no:formData.value.ticket_no,
            license_no:formData.value.license_no,
            unit:formData.value.unit,
            plate_no:formData.value.plate_no,
            place_of_violation:formData.value.place_of_violation,
            name_of_driver:formData.value.name_of_driver,
            status:newArray.value.status
        })
        if(response){
            setTimeout(() => {                
                Swal.fire('Success', response.data.msg, 'success');
                closeModal();
            }, 2000);
        }
    } catch (error) {
        console.log(error)
        Swal.fire('Error', error.response.data.msg, 'error');
    }
}

</script>

<style scoped>
.modal-body {
  overflow-y: scroll;
  height: 400px;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.unread {
  background-color: #f7f7f7;
  border-left: 4px solid #2196f3;
}
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
}

.close {
    position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}
</style>