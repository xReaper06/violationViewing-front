<template>
  <div class="modal" v-if="props.showModal">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Notifications</h1>
        </div>
        <div class="modal-body">
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="card mb-3 ms-2 me-2"
          >
            <div
              class="card-body notification elevation-3"
              :class="{ 'unread': notification.isRead === 0 }"
            >
              <p class="card-text text-h6 text-center">{{ notification.message }}</p>
            </div>
            <div class="card-footer">
              <button
                @click="markNotificationAsRead(notification)"
                v-if="notification.isRead === 0"
                class="btn btn-primary ms-2"
              >
                Mark as Read
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import AuthenticationService from "@/services/AuthenticationService";
import { watchEffect } from "vue";

const props = defineProps({
  showModal: Boolean,
  notifications: Array,
});
const emits = defineEmits(["closeModal", "getnotifications"]);

const closeModal = () => {
  emits("closeModal");
};
const getMyNotifications = () => {
  emits("getnotifications");
};
const markNotificationAsRead = (notification) => {
  try {
    const response = AuthenticationService.markNotificationAsRead({
      id: notification.id,
    });
    if (response) {
      getMyNotifications();
      closeModal();
      location.reload();
    }
  } catch (error) {
    console.log(error);
  }
};
watchEffect(() => {
  markNotificationAsRead();
});
</script>

<style scoped>
.modal-body {
  overflow-y: scroll;
}
.modal {
  display: none;
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
