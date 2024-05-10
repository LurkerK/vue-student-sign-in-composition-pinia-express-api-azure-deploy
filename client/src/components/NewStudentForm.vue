<script setup>

import { ref, watch } from 'vue'

import { useStudentStore } from '../stores/StudentStore'
import { storeToRefs } from 'pinia';

const studentStore = useStudentStore() 

const newStudentName = ref('')
const newStarID = ref('')
            
const formErrors = ref([])

const { addNewStudentErrors } = storeToRefs(studentStore)

watch( addNewStudentErrors, () => {
    if (addNewStudentErrors.value && addNewStudentErrors.value.length > 0) {
        alert(addNewStudentErrors.value.join('\n'))
    }
} )

const addStudent = () => {
    formErrors.value = []   // clear errors array

    if (!newStudentName.value) {
        formErrors.value.push('Student name must be entered')
    }

    if (!newStarID.value) {
        formErrors.value.push('StarID must be entered')
    }

    // if there are no errors
    if (formErrors.value.length == 0) {
        let student = { name: newStudentName.value, starID: newStarID.value, present: false }

        studentStore.addNewStudent(student)
        newStudentName.value = ''   // clear form input
        newStarID.value = ''  
    }
}

</script>

<template>

<div id="new-student-form-errors" class="m-2">
    <div class="alert alert-danger" v-if="formErrors.length > 0">
        <li v-for="error in formErrors" v-bind:key="error">
            {{ error }}
        </li>
    </div>
</div>

<div id="new-student-form" class="card add-student m-2 p-2">
    <h4 class="card-title">Add new student</h4>

    <div class="form-group mb-3">
        <label for="name">Name</label>
        <input id="name" class="form-control" v-model.trim="newStudentName">
    </div>
    <div class="form-group mb-3">
        <label for="starID">Star ID</label>
        <input id="starID" class="form-control" v-model.trim="newStarID">
    </div>

    <button class="btn btn-primary" v-on:click="addStudent">Add</button>
</div>


</template>

<style scoped>

</style>