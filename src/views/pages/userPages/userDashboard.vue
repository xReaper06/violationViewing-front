<template>
    <div>
        <div class="container mt-5">
    <h1 class="text-center mt-5 mb-5">Home</h1>

    <div class="card shadow-lg p-3 mb-5 bg-white rounded">
        <div class="ms-md-5">
            <button type="button" @click="OpenModal" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bell-ringing-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17.451 2.344a1 1 0 0 1 1.41 -.099a12.05 12.05 0 0 1 3.048 4.064a1 1 0 1 1 -1.818 .836a10.05 10.05 0 0 0 -2.54 -3.39a1 1 0 0 1 -.1 -1.41z" stroke-width="0" fill="currentColor" /><path d="M5.136 2.245a1 1 0 0 1 1.312 1.51a10.05 10.05 0 0 0 -2.54 3.39a1 1 0 1 1 -1.817 -.835a12.05 12.05 0 0 1 3.045 -4.065z" stroke-width="0" fill="currentColor" /><path d="M14.235 19c.865 0 1.322 1.024 .745 1.668a3.992 3.992 0 0 1 -2.98 1.332a3.992 3.992 0 0 1 -2.98 -1.332c-.552 -.616 -.158 -1.579 .634 -1.661l.11 -.006h4.471z" stroke-width="0" fill="currentColor" /><path d="M12 2c1.358 0 2.506 .903 2.875 2.141l.046 .171l.008 .043a8.013 8.013 0 0 1 4.024 6.069l.028 .287l.019 .289v2.931l.021 .136a3 3 0 0 0 1.143 1.847l.167 .117l.162 .099c.86 .487 .56 1.766 -.377 1.864l-.116 .006h-16c-1.028 0 -1.387 -1.364 -.493 -1.87a3 3 0 0 0 1.472 -2.063l.021 -.143l.001 -2.97a8 8 0 0 1 3.821 -6.454l.248 -.146l.01 -.043a3.003 3.003 0 0 1 2.562 -2.29l.182 -.017l.176 -.004z" stroke-width="0" fill="currentColor" /></svg><span class="badge text-bg-secondary">{{ unreadCounts}}</span></button>
            <p class="h4 text-center mt-3">Reminders!!!</p>
            <div class="row">
              <div class="col-md-8">
                <ul class="list-unstyled" v-for="announcement in announcements" :key="announcement.id">
                    <li>
                        <p class="fs-6">{{ announcement.title }}</p>
                        <p class="text-muted">{{ announcement.content }}</p>
                    </li>
                </ul>
              </div>
            </div>
            <p class="fs-6">If you have an issue you can call our Hotlines: </p>
            <ul>
                <li>LTFRB: Mobile No. 0917-704-6862</li>
                <li>Cordova Police: #(032) 496 8164</li>
                <li>Cordova Rural Health Unit: #(032)496‐8031/520‐6132</li>
            </ul>
        </div>
    </div>
</div>

  <div class="container bg-white mb-5">
    <div class="container">
      <h4 class="text-center">Implemented Municipal Traffic Ordinance</h4>
      <table class="table table-striped table-bordered table-responsive">
        <thead class="thead-dark">
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Fine</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody v-for="violations in violationsList" :key="violations.id">
          <tr>
            <td>{{ violations.code }}</td>
            <td>{{ violations.name }}</td>
            <td>{{ violations.fine }}</td>
            <td>{{ violations.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <notificationModal :notifications="notifications" :getnotifications="getnotifications" :show-modal="showModal" @close-modal="closeModal"/>
</div>
</template>

<script setup>
import notificationModal from '@/components/modals/notificationModal.vue';
import { ref,onMounted } from 'vue';
import AuthenticationService from '@/services/AuthenticationService'
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store';


const showModal = ref(false);
const user = ref('')
const email_verified = ref('')
user.value = localStorage.getItem('user');
email_verified.value = JSON.parse(user.value)
const router = useRouter();
const unreadCounts = ref();
const notifications = ref([]); // Initialize as an empty array
const id = ref('');
const announcements = ref([])

const getEmailVerify = ()=>{
  try {
    if (email_verified.value.email_verified === null) {
      router.push('/accountVerify')
    }else{
      return true
    }
  } catch (error) {
    console.log(error)
  }
}
const getAnnouncement = async()=>{
  try {
    const response = await AuthenticationService.getAnnouncement()
    if(response){
      announcements.value = response.data.announcement
    }
  } catch (error) {
    console.log(error)
  }
}

const violationsList = ref([]);
  const getAllViolationsList = async()=>{
    try {
      const response = await AuthenticationService.getAllViolationList();
if (response) {
  const violationList = response.data.violationList; // Check the structure of the response
  violationsList.value = violationList
}

    } catch (error) {
      console.log(error)
    }
  }
  
  
    const getnotifications = async () => {
  try {
    const authStore = useAuthStore();
    id.value = JSON.parse(user.value);
    const response = await AuthenticationService.notifications({ user_id: id.value.id });
    if (response) {
      notifications.value = response.data.notifications; // Populate the notifications array
      const unreadCount = unreadNotificationCounts(notifications.value);
      authStore.setNotifications(notifications.value); // Update the store if necessary
      authStore.setUnreadNotificationCount(unreadCount); // Assuming you have a method to set the unread count in your store
    }
  } catch (error) {
    console.error('Error in getMyNotifications:', error);
  }
};

const unreadNotificationCounts = (notifications) => {
  if (notifications) {
    unreadCounts.value = notifications.filter((notification) => notification.isRead === 0).length;
  } else {
    return 0;
  }
}

const OpenModal = ()=>{
  showModal.value = true
}
const closeModal = () => {
    showModal.value = false;
  };
  
onMounted(()=>{
  getAnnouncement();
  getEmailVerify();
  getAllViolationsList();
  getnotifications();
})
</script>

<style scoped>

</style>