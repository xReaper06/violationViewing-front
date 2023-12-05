<template>
    <div>
        <div class="d-flex justify-center align-center">
      <div class="items-center ms-16 ml-16 mt-16">
        <div class="alert alert-warning" v-if="sccss" role="alert">
        Your Account is Temporarily Locked due to various reasons
      </div>
        <v-btn class="ms-16" to="/main/login">Go Back</v-btn>
      </div>
    </div>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>