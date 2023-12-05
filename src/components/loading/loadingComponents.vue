<template>
    <div>
      <div v-if="props.isLoading" class="loading-overlay">
        <div class="loading-content">
          <p class="loading-text">Welcome to Violation Enforced and Viewing System</p>
          <img src="@/assets/logovevs.png" alt="Logo" class="loading-logo">
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import {defineProps} from 'vue'

  const props = defineProps({
    isLoading:Boolean,
  })
  
  </script>
  
  <style scoped>
    /* Custom styles for loading component */
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white background */
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999; /* Ensure the overlay is above other elements */
    }
  
    .loading-content {
      text-align: center;
    }
  
    .loading-text {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
      color: #020303;
    }
  
    .loading-logo {
      height: auto;
      width: 80%;
      max-width: 300px; /* Limit the maximum width of the logo */
      animation: spin 2s linear infinite;
    }
    @keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
  </style>
  