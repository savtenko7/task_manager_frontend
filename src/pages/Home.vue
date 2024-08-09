<script setup>
import AppLayout from "../components/AppLayout.vue"
</script>

<template>
    <AppLayout>
        <div class="wrapper">
            <div class="info">
                <div class="title">MoniControl</div>
                <div class="line"></div>
            </div>
        </div> 
    </AppLayout>
</template>

<style lang="sass" scoped>
@import '../assets/styles/main'

.wrapper
    display: flex
    justify-content: center
    align-items: center
.info
    padding: 80px 0
    text-align: center
</style>