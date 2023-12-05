import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store";
import landingPage from "../views/landingPage.vue";
import loginPage from "../views/pages/loginPage.vue";
import userRegistration from "../views/pages/registrationPages/userRegistrations.vue"
import enforcerRegistration from "../views/pages/registrationPages/enforcerRegistration.vue"
import userDashboard from '../views/pages/userPages/userDashboard.vue'
import userLicense from '../views/pages/userPages/userLicense.vue'
import viewViolation from '../views/pages/userPages/viewViolation.vue'
import addLicense from '../views/pages/userPages/userAddlicense.vue'
import userViolation from '../views/pages/userPages/userViolations.vue'
import userSettings from '../views/pages/userPages/userSettings.vue'
import licenseStatus from '../views/pages/userPages/licenseStatus.vue'
import updateLicense from '../views/pages/userPages/updateLicense.vue'
import enforcerDashboard from '../views/pages/enforcerPages/enforcerDashboard.vue'
import operationHistory from '../views/pages/enforcerPages/operationHistory.vue'
import enforcerSettings from '../views/pages/enforcerPages/enforcerSettings.vue'
import viewUserViolation from '../views/pages/enforcerPages/viewUserViolation.vue'
import normalCitation from '../views/pages/enforcerPages/NormalCitation.vue'
import impoundCitation from '../views/pages/enforcerPages/ImpoundCitation.vue'
import changePass from '../views/pages/authpages/changePass.vue'
import forgotPass from '../views/pages/authpages/forgotPassword.vue'
import verificationPage from '../views/pages/authpages/verificationPage.vue'
import verifyAccount from '../views/pages/authpages/verifyAccount.vue'
import adminDashboard from '../views/pages/adminPages/adminDashboard.vue'
import mainNav from '../components/navigations/mainNav.vue'
import userNav from '../components/navigations/userNav.vue'
import enforcerNav from '../components/navigations/enforcerNav.vue'
import adminNav from '../components/navigations/adminNav.vue'
import unAuthorized from '../views/pages/NotFoundPages/unauthorizedPage.vue'
import temporaryLock from '../views/pages/NotFoundPages/temporaryLocked.vue'
import accountDeleted from '../views/pages/NotFoundPages/accountDeleted.vue'
import adminEnforcerList from '../views/pages/adminPages/adminEnforcerList.vue'
import adminUserList from '../views/pages/adminPages/adminUserList.vue'
import adminLicenseNotVerified from '../views/pages/adminPages/adminLicenseNotVerified.vue'
import adminLicenseVerified from '../views/pages/adminPages/adminLicenseVerified.vue'
import adminViewLicense from '../views/pages/adminPages/adminViewLicense.vue'
import addViolator from '../views/pages/adminPages/adminAddViolation.vue'
import adminViolationList from '../views/pages/adminPages/adminViolationList.vue'
import adminViolatorsList from '../views/pages/adminPages/adminViolatorsList.vue'
import viewImpound from '../views/pages/adminPages/viewImpound.vue'
import viewNormal from '../views/pages/adminPages/viewNormal.vue'








const routes = [
  {
    path: "/",
    name: "landingPage",
    component: landingPage,
  },
  {
    path: "/main/",
    name: "mainNav",
    component: mainNav,
    children:[
      {
        path: "login",
        name: "loginPage",
        component: loginPage,
      },
      {
        path: "registration",
        name: "userRegistration",
        component: userRegistration,
      },
      {
        path: "changePass/:token",
        name: "changePass",
        component: changePass,
        params:true,
      },
      {
        path: "forgotPass",
        name: "forgotPass",
        component: forgotPass,
      },
      {
        path: "verificationPage/:token",
        name: "verificationPage",
        component: verificationPage,
        params:true,
      },
      {
        path: "verifyAccount/:token",
        name: "verifyAccount",
        component: verifyAccount,
        params:true,
      },
      {
        path: "enforcerRegistration/:token",
        name: "enforcerRegistration",
        component: enforcerRegistration,
        params:true,
      },
    ]
  },
  {
    path: "/user/",
    name: "userNav",
    component: userNav,
    meta: { requiresAuth: true,requiredRoles: ['user'] }, 
    children:[
      {
        path: "userDashboard",
        name: "userDashboard",
        component: userDashboard,
      },
      {
        path: "myLicense",
        name: "userLicense",
        component: userLicense,
      },
      {
        path: "addlicense",
        name: "addLicense",
        component: addLicense,
      },
      {
        path: "violations",
        name: "userViolation",
        component: userViolation,
      },
      {
        path: "updateLicense",
        name: "updateLicense",
        component: updateLicense,
      },
      {
        path: "userSettings",
        name: "userSettings",
        component: userSettings,
      },
      {
        path: "viewViolation/:violations_id",
        name: "viewViolation",
        component: viewViolation,
        props:true,
        params:true,
      },
      {
        path: "licenseStatus",
        name: "licenseStatus",
        component: licenseStatus,
      },
    ]
  },
  {
    path: "/enforcer/",
    name: "enforcerNav",
    component: enforcerNav,
    meta: { requiresAuth: true,requiredRoles: ['enforcer'] }, 
    children:[
      {
        path: "enforcerDashboard",
        name: "enforcerDashboard",
        component: enforcerDashboard,
      },
      {
        path: "operationHistory",
        name: "operationHistory",
        component: operationHistory,
      },
      {
        path: "enforcerSettings",
        name: "enforcerSettings",
        component: enforcerSettings,
      },
      {
        path: "normalCitation",
        name: "normalCitation",
        component: normalCitation,
      },
      {
        path: "impoundCitation",
        name: "impoundCitation",
        component: impoundCitation,
      },
      {
        path: "viewUserViolation/:violations_id",
        name: "viewUserViolation",
        component: viewUserViolation,
      },
    ]
  },
  {
    path: "/admin/",
    name: "adminNav",
    component: adminNav,
    meta: { requiresAuth: true,requiredRoles: ['admin'] }, 
    children:[
      {
        path: "adminDashboard",
        name: "adminDashboard",
        component: adminDashboard,
      },
      {
        path: "adminEnforcerList",
        name: "adminEnforcerList",
        component: adminEnforcerList,
      },
      {
        path: "adminUserList",
        name: "adminUserList",
        component: adminUserList,
      },
      {
        path: "adminLicenseNotVerified",
        name: "adminLicenseNotVerified",
        component: adminLicenseNotVerified,
      },
      {
        path: "adminLicenseVerified",
        name: "adminLicenseVerified",
        component: adminLicenseVerified,
      },
      {
        path: "adminViewLicense/:id",
        name: "adminViewLicense",
        component: adminViewLicense,
        props:true,
        params:true
      },
      {
        path: "adminViolationList",
        name: "adminViolationList",
        component: adminViolationList,
      },
      {
        path: "adminViolatorsList",
        name: "adminViolatorsList",
        component: adminViolatorsList,
      },
      {
        path: "addViolator",
        name: "addViolator",
        component: addViolator,
      },
      {
        path: "viewImpound/:id,:is_paid",
        name: "viewImpound",
        component: viewImpound,
        params:true,
        props:true,
      },
      {
        path: "viewNormal/:id,:is_paid",
        name: "viewNormal",
        component: viewNormal,
        params:true,
        props:true,
      },
    ]
  },
  {
    path: "/unauthorized",
    name: "unAuthorized",
    component: unAuthorized,
  },
  {
    path: "/temporaryLock",
    name: "temporaryLock",
    component: temporaryLock,
  },
  {
    path: "/accountDeleted",
    name: "accountDeleted",
    component: accountDeleted,
  },
  
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active', // Class applied to active links
  linkExactActiveClass: 'exact-active',
})


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiredRoles = to.meta.requiredRoles;
  const user = localStorage.getItem('user');
  
  // Check if the user is authenticated
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to the login page or an unauthorized page
    next('/user/login'); // Adjust the destination route as needed
  } else if (requiredRoles && requiredRoles.length > 0) {
    // Check if the user has the required role
    const parseUser = JSON.parse(user);
    const userRoles = parseUser.user_role;

    if (!userRoles || !requiredRoles.some(role => userRoles.includes(role))) {
      // Redirect to an unauthorized page or an appropriate action
      next('/unauthorized'); // Adjust the destination route as needed
    } else {
      // User meets the authentication and role requirements, proceed
      next();
    }
  } else {
    // No specific role or authentication requirement, proceed
    next();
  }
});


export default router;
