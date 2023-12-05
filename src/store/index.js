import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  id:'auth',
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    user: localStorage.getItem('user') || '',
    myLicense:[],
    notifications:null,
    licenseVerified:[],
    licenseNotYetVerified:[],
    unreadCounts:null,

  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
  actions: {
    async getUser() {
       this.user;
    },
    async setMyLicense(myLicense){
      this.myLicense = myLicense
    },
    async setLicenseVerified(licenseVerified){
      this.licenseVerified = licenseVerified
    },
    async setLicenseNotYetVerified(licenseNotYetVerified){
      this.licenseNotYetVerified = licenseNotYetVerified
    },
    async setNotifications(notifications){
      this.notifications = notifications
    },
    setTokens( accessToken, refreshToken ) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    },
    clearTokens() {
      this.accessToken = '';
      this.refreshToken = '';
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    updateAccessToken(accessToken){
      this.accessToken = accessToken
      localStorage.setItem('accessToken',accessToken);
    },
    setUser(user) {
      this.user = user
      localStorage.setItem('user',JSON.stringify(user));
    },
    updateLocalUser(user){
      this.user = user
      localStorage.setItem('user',JSON.stringify(user));
    },
    setUnreadNotificationCount(unreadCount){
      this.unreadCounts= unreadCount;
    },
    async logOut(){
      this.clearTokens();
      this.user = ''
      localStorage.removeItem('user');
    },
    
  },
});
