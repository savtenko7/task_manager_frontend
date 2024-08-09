<script setup>
import { USER_INFO_URL } from '@/constants';
import { useRootStore } from '@/stores/counter';
import axios from 'axios';
import { onMounted } from 'vue';
const props = defineProps({
    imgUrl: {
        type: String,
        required: true,
    }
})
const root = useRootStore()

onMounted(async () => {

  if (root.token) {
    try {
      root.getUser(); 
    } 
    catch (error) {
        console.error('Error fetching user data:', error);
    }
  }
});
</script>
<template>
    <div class="root">
    <el-container class="app-layout">
        <el-header>
            <div class="header-content">
                <div class="logo">
                    <img src="../assets/icons/logo.png">
                </div>
            <el-menu mode="horizontal" class ="menu" router>
                <el-menu-item index="/">Главная</el-menu-item>
                <el-menu-item index="/tasks">Мое расписание</el-menu-item>
                <el-menu-item index="/contact">Мои проекты</el-menu-item>
            </el-menu>
            </div>
        </el-header>
    <el-main>
      <slot></slot>
    </el-main>
  </el-container>
</div>
</template>
<style lang="sass" scoped>
@import '../assets/styles/main'

.root
  display: flex
  flex-direction: column
  min-height: 100vh
  //background-color: $background

.app-layout
  width: 100%
  height: 100% // Полная высота контейнера

.header
  width: 100%
  background-color: #409EFF 

.header-content
  display: flex
  justify-content: space-between
  align-items: center
  width: 100%
  padding: 0 20px  

.menu
  margin-left: auto

.logo img
  max-width: 100%
  height: auto

</style>