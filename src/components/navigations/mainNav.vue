<template>
    <div>
        <nav
      class="navbar navbar-expand-xl"
      style="background-color: rgb(18, 13, 51)"
    >
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
            <img
              src="@/assets/vevsLogo.png"
              class="img-fluid rounded float-start ms-5"
              alt="logo"
              height="70" width="70"
            />
        </router-link>
        <router-link
          class="navbar-brand me-5 pe-1 ps-1 pt-1 pb-1 text-end sign-inbutton animate__animated" to="/"
        ><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
          Home
        </router-link>
      </div>
    </nav>
    <router-view></router-view>

    <hr class="my-4 mt-5 text-dark">
      <footer class="app-footer text-dark">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h4>Contact Us</h4>
            <p>Email: info@vevs-app.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
          <div class="col-md-6">
            <h4>Follow Us</h4>
            <!-- Add your social media icons or links here -->
            <div class="social-icons">
              <a href="#" target="_blank" class="icon-link"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-facebook" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg></a>
              <a href="#" target="_blank" class="icon-link"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-twitter" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" /></svg></a>
              <a href="#" target="_blank" class="icon-link"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-instagram" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16.5 7.5l0 .01" /></svg></a>
            </div>
          </div>
        </div>
        <hr class="my-4">
        <div class="text-center pb-4">
          <p>&copy; 2023 VEVS-APP. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
</template>

<script setup>

</script>

<style scoped>
.sign-inbutton {
  color: white;
  cursor: pointer;
}

.sign-inbutton:hover {
  color: rgba(22, 10, 197, 0.5);
  border: solid 1px rgba(17, 15, 46, 0.5);
  background-color: rgba(13, 12, 37, 0.5);
}


</style>