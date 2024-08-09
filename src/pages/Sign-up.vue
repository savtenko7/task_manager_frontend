<script setup>
import { ref } from 'vue';
import { useRootStore } from '@/stores/counter';
import router from '@/router';

const rootStore = useRootStore();

const formReg = ref({
  email: '',
  password: '',
});

const isPwd = ref(true);
const emailError = ref('');

const redirectToSignIn = () =>{
  router.push("/sign-in")
}

const registerUser = async () => {
    try {
      await rootStore.registerUser({
      email: formReg.value.email,
      password: formReg.value.password,
    });
      router.push('/')   
  } catch (error) {
    console.error('Registration failed:', error);
  }
};

const checkEmail = () => {
  if (!validateEmail(formReg.value.email)) {
    emailError.value = 'Неверный формат email';
  } else {
    emailError.value = '';
  }
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const togglePasswordVisibility = () => {
  isPwd.value = !isPwd.value;
};
</script>

<template>
    <el-container>
      <el-header>
        <h2>MoniControl</h2>
      </el-header>
      <el-main>
        <el-card class="registration-card">
          <h3>Регистрация</h3>
          <el-form :model="formReg" @submit.prevent="registerUser" label-width="120px">
            <el-form-item label="Адрес эл.почты" :error="emailError">
              <el-input v-model="formReg.email" type="email" @blur="checkEmail"></el-input>
            </el-form-item>
            <el-form-item label="Введите пароль">
              <el-input v-model="formReg.password" :type="isPwd ? 'password' : 'text'">
                <template #append>
                    <img
                  :src="isPwd ? '/src/assets/icons/eye.off.png' : '/src/assets/icons/eye.on.png'"
                  alt="Toggle Password"
                  class="toggle-password"
                  @click="togglePasswordVisibility"
                />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="Повторите пароль">
              <el-input v-model="formReg.confirmPassword" :type="isPwd ? 'password' : 'text'">
                <template #append>
                    <img
                  :src="isPwd ? '/src/assets/icons/eye.off.png' : '/src/assets/icons/eye.on.png'"
                  alt="Toggle Password"
                  class="toggle-password"
                  @click="togglePasswordVisibility"
                />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" native-type="submit">Сохранить</el-button>
              <el-button type="primary" @click="redirectToSignIn">Уже есть аккаунт</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>
    </el-container>
  </template>


<style lang="sass" scoped>
@import '../assets/styles/main'

.registration-card 
  max-width: 500px
  margin: 50px auto
  padding: 20px
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1)
  color: $accent

.toggle-password 
  cursor: pointer
  width: 24px
  height: 24px

</style>