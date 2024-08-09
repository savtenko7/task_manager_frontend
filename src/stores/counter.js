import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { USER_INFO_URL, SIGN_UP_URL, SIGN_IN_URL} from '../constants'

export const useRootStore = defineStore('root', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async registerUser(userData) {
      const response = await axios.post(
        SIGN_UP_URL, 
        userData,
        {headers: {
          "Content-Type": "application/json",
        }}
      );
      if (response.data) {
        this.user = response.data.user
        this.token = `${response.data.token_type} ${response.data.access_token}`;
        localStorage.setItem('token', `${response.data.token_type} ${response.data.access_token}`);
        axios.defaults.headers.common['Authorization'] = `${this.token}`;
      };
    },
    async getUser() {
      console.log('Делаем запрос')
      const response = await axios.get(USER_INFO_URL, 
        {headers: {
          Authorization :`${this.token}`,
        }}
      )
      this.users = response.data;
    },
    async loginUser(userData) {
      const response = await axios.post(
        SIGN_IN_URL,
        userData,
        {headers: {
          "Content-Type": "application/json",
        }}
      );
      if (response.data) {
        this.token = `${response.data.token_type} ${response.data.access_token}`;
        localStorage.setItem('token', `${response.data.token_type} ${response.data.access_token}`);
        axios.defaults.headers.common['Authorization'] = `${this.token}`;
      };
    },
      
    }
  }
);