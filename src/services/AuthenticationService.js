import Api from './Api'
import Auth from './Auth'

export default{
    //auth
    userRegistration(credentials){
        return Auth().post('/userRegistration',credentials)
    },
    login(credentials){
        return Auth().post('/login',credentials)
    },
    logout(id){
        return Auth().post(`/logout`,id);
    },
    verifyEmail(credentials){
        return Api().post('/verifyEmail',credentials);
    },
    sendEmailtoVerify(){
        return Auth().post('/sendEmailtoVerify');
    },
    //main
    insertLicense(credentials){
        return Api().post('/verifyLicense',credentials)
    },
    verifyLicense(credentials){
        return Api().post('/verifiedLicense/',credentials)
    },
    denyVerification(credentials){
        return Api().post('/denyVerification',credentials)
    },
    getMyLicense(user_id){
        return Api().post('/getMyLicense/',user_id)
    },
    getMyViolation(credentials){
        console.log(credentials)
        return Api().post('/getMyViolation',credentials)
    },
    
    notifications(user_id){
        return Api().post('/notifications/',user_id)
    },
    getAllLicenseVerified(){
        return Api().get('/getAllLicenseVerified')
    },
    getAllLicenseNotYetVerified(){
        return Api().get('/getAllLicenseNotYetVerified')
    },
    getAllViolationList(){
        return Api().get('/getAllViolationList')
    },
    insertViolations(credentials){
        return Api().post('/insertViolations',credentials)
    },
    updateViolationStatus(credentials){
        return Api().post('/updateViolationStatus',credentials)
    },
    deleteViolationList(credentials){
        return Api().post('/deleteViolationList',credentials)
    },
    enforcerRegistration(credentials){
        return Api().post('/enforcerRegistration',credentials)
    },
    removeEnforcer(credentials){
        return Api().post('/removeEnforcer',credentials)
    },
    getAllUsers(){
        return Api().get('/getAllUsers')
    },
    getAllEnforcer(){
        return Api().get('/getAllEnforcers')
    },
    getAllLicensebyID(id){
        return Api().get(`/getAllLicensebyID/${id}`)
    },
    getAllViolators(){
        return Api().get('/getAllViolators')
    },
    getAllViolatorsNotPaid(){
        return Api().get('/getAllViolatorsNotPaid')
    },
    getAllViolatorsImpound(){
        return Api().get('/getAllViolatorsImpound')
    },
    getAllViolatorsNormal(){
        return Api().get('/getAllViolatorsNormal')
    },
    getAllPaidViolatorsNormal(){
        return Api().get('/getAllPaidViolatorsNormal')
    },
    normalCitation(credentials){
        return Api().post('/normalCitation',credentials)
    },
    impoundCitation(credentials){
        return Api().post('/impoundCitation',credentials)
    },
    getUserViolations(credentials){
        return Api().post('/getUserViolations',credentials)
    },
    enableUser(credentials){
        return Api().post('/enableUser',credentials);
    },
    disableUser(credentials){
        return Api().post('/disableUser',credentials)
    },
    updateLicense(credentials){
        return Api().post('/updateLicense',credentials)
    },
    //auth
    changeProfilePic(credentials){
        return Api().post('/changeProfile',credentials)
    },
    changePassword(credentials){
        return Api().post('/changePassword',credentials)
    },
    markNotificationAsRead(credentials){
        return Api().post('/markNotificationAsRead',credentials)
    },
    AllViolationsList(){
        return Api().get('/AllViolationsList');
    },
    getAllViolationsByYear(credentials){
        return Api().post('/getAllViolationsByYear',credentials);
    },
    paidThisViolation(credentials){
        return Api().post('/paid-this',credentials);
    },
    adminNormalCitation(credentials){
        return Api().post('/adminNormalCitation',credentials)
    },
    adminImpoundCitation(credentials){
        return Api().post('/adminImpoundCitation',credentials)
    },
    createAnnouncement(credentials){
        return Api().post('/createAnnouncement',credentials);
    },
    updateAnnouncement(credentials){
        return Api().post('/updateAnnouncement',credentials);
    },
    getAnnouncement(){
        return Api().get('/getAnnouncement');
    },
    enforcerRecentAdded(credentials){
        return Api().post('/enforcerRecentAdded',credentials);
    },
    removeAnnouncement(credentials){
        return Api().post('/removeAnnouncement',credentials)
    },
    enforcerInfo(credentials){
        return Api().post('/enforcerInfo',credentials)
    },
    getEnforcerInfo(credentials){
        return Api().post('/getEnforcerInfo',credentials);
    },
    updateRecent(credentials){
        return Api().post('/updateRecent',credentials);
    },
    getSpecificViolations(){
        return Api().get('/getSpecificViolations');
    },
    deleteThisViolation($id){
        return Api().post('/deleteThisViolation',$id);
    }
}