<template>
    <div>
        <div class="container-fluid">
            <div class="alert alert-success" v-if="succs">{{ succs }}</div>
            <div class="alert alert-danger" v-if="err">{{ err }}</div>
            <div class="mt-3 mb-4"><button type="button" class="btn btn-primary" @click="ClickshowModal"><span v-if="showAddAnnouncement == false">Open Add Reminders</span><span v-else>close Form</span></button></div>
            <div v-if="showAddAnnouncement">
                <div class="form-group">
                <label for="title" class="form-label">Title</label>
                <input type="text" id="title" name="title" v-model="title" placeholder="Enter the Title" class="form-control" required>
                <label for="content" class="form-label">Content</label>
                <textarea
      id="announcementContent"
      v-model="content"
      rows="4"
      cols="50"
      class="form-control"
      placeholder="Enter announcement content"
    ></textarea>
    <div v-if="type == 0">
        <button type="button" class="btn btn-primary mt-2" @click="addAnnouncement">Submit</button>
    </div>
    <div v-else>
        <button type="button" class="btn btn-primary mt-2" @click="updateAnnouncement">Update</button>
    </div>
            </div>
            </div>
            <table class="table table-responsive table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>TITLE</th>
                        <th>CONTENT</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody v-for="announcement in announcements" :key="announcement.id">
                    <tr>
                        <td>{{ announcement.id }}</td>
                        <td>{{ announcement.title }}</td>
                        <td>{{ announcement.content }}</td>
                        <td>
                            <button type="button" class="btn btn-secondary" @click="editAnnounce(announcement)">Edit</button>
                            <button type="button" class="btn btn-danger" @click="removeAnnouncement(announcement)">Remove</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            
        </div>
    </div>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import AuthenticationService from '@/services/AuthenticationService';
const announcements = ref([]);
const succs =ref('');
const err = ref('')
const showAddAnnouncement = ref(false)
const title = ref('');
const content = ref('')
const type = ref(0);
const id = ref()

const editAnnounce = (announcement)=>{
    showAddAnnouncement.value = true
    id.value = announcement.id
    title.value = announcement.title
    content.value = announcement.content
    type.value = 1
}
const addAnnouncement = async()=>{
    if(title.value == '' || content.value == ''){
        err.value = 'Please Fill in Empty Fields'
    }else{
        try {
            const response = await AuthenticationService.createAnnouncement({
                title:title.value,
                content:content.value,
            })
            if(response){
                getAnnouncement();
                showAddAnnouncement.value = false
                succs.value = response.data.msg
            }
        } catch (error) {
            console.log(error)
            err.value = error.response.data.msg
        }
    }
}

const getAnnouncement = async()=>{
    try {
        const response = await AuthenticationService.getAnnouncement();
        if(response){
            announcements.value = response.data.announcement
        }
    } catch (error) {
        console.log(error)
    }
}
const removeAnnouncement=async(announcement)=>{
    try {
        const response = await AuthenticationService.removeAnnouncement({
            id:announcement.id
        })
        if(response){
            getAnnouncement();
        }
    } catch (error) {
        console.log(error)
    }
}
const ClickshowModal = ()=>{
  showAddAnnouncement.value = !showAddAnnouncement.value
  id.value = null
  title.value = ''
  content.value = ''
  type.value = 0
}
const updateAnnouncement = async()=>{
    try {
        const response = await AuthenticationService.updateAnnouncement({
            id:id.value,
            title:title.value,
            content:content.value
        })
        if(response){
            id.value = null
            title.value = ''
            content.value = ''
            showAddAnnouncement.value = false;
            succs.value = response.data.msg
            getAnnouncement();
        }
    } catch (error) {
        console.log(error)
        err.value = error.response.data.msg
    }
}

onMounted(()=>{
    getAnnouncement();
})

</script>

<style scoped>

</style>