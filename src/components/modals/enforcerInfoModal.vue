<template>
    <div>
        <div class="modal mb-5 pb-5" :class="{show:showModal}">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-header">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Enforcer Info</h1>
                  <span class="close" @click="closeModal">&times;</span>
              </div>
              <div class="modal-body">
                <div>
                   <div class="card mt-2">
                    <div class="card-body" v-for="infos in info" :key="infos.id">
                        <div class="d-flex flex-row">
                            <div class="d-flex flex-column">
                                <div class="smalltext">
                                    Last Name, 
                                    <div class="fs-6 me-3"><strong>{{ infos.last_name }}</strong></div>
                                </div>
                            </div>
                            <div class="d-flex flex-column">
                                <div class="smalltext">
                                   First Name
                                    <div class="fs-6 me-3"><strong>{{ infos.first_name }}</strong></div>
                                </div>
                            </div>
                            <div class="d-flex flex-column">
                                <div class="smalltext">
                                    Middle Name
                                    <div class="fs-6"><strong>{{ infos.middle_name }}</strong></div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-row mt-5">
                            <div class="d-flex flex-column">
                                <div class="smalltext">
                                    Birthday
                                    <div class="fs-6 me-5"><strong>{{ formattedDate }}</strong></div>
                                </div>
                            </div>
                            <div class="d-flex flex-column">
                                <div class="smalltext">
                                    Sex
                                    <div class="fs-6"><strong>{{ infos.sex }}</strong></div>
                                </div>
                            </div>
                        </div>
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
import { ref, defineProps, defineEmits,onMounted } from "vue";
  import AuthenticationService from "@/services/AuthenticationService";
  
  const props = defineProps({
    showModal: Boolean,
    user_id:Number,
  });
  
  const emit = defineEmits(["closeModal"]);

  const showModal = ref(false)
  const info =ref([])  
  const closeModal = () => {
    emit("closeModal");
    showModal.value = false
  };

  onMounted(()=>{

    showModal.value = props.showModal
    getEnforcerInfo();
  })
  const getEnforcerInfo = async()=>{
    try {
        const response = await AuthenticationService.getEnforcerInfo({
            user_id:props.user_id
        })
        if(response){
            info.value = response.data.info
            dateFormat(info.value[0].birthday)
        }
    } catch (error) {
        console.log(error)
    }
  }

  let formattedDate;

const dateFormat = (dateString)=>{
    try {
  let originalDate = new Date(dateString);

  if (isNaN(originalDate)) {
    throw new Error("Invalid date string");
  }

  formattedDate = originalDate.toISOString().split('T')[0].replace(/-/g, '/');
  console.log(formattedDate);
} catch (error) {
  console.error("Error:", error.message);
}
}
</script>

<style scoped>
.modal-body {
  overflow-y: scroll;
  height: 250px;
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
.smalltext{
    font-size: 15px;
}
</style>