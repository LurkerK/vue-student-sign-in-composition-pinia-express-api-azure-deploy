<script setup>

import { useStudentStore } from '../stores/StudentStore.js'
import { storeToRefs } from 'pinia'

const studentStore = useStudentStore()

const { mostRecentStudent } = storeToRefs(studentStore)

</script>

<template>

<div id="welcome-or-goodbye-message" class="m-2">
    <div v-if="mostRecentStudent.name">

        <div v-if="mostRecentStudent.present" class="alert alert-success">
            Welcome, {{ mostRecentStudent.name }}!
        </div>
        <div v-else class="alert alert-info">
            Goodbye, {{ mostRecentStudent.name }}. See you later!
        </div>     
    </div>  
</div>

</template>

<style scoped>

</style>