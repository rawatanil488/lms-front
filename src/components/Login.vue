<template>
    <div class="login-page">
      <transition name="fade">
         <div v-if="!registerActive" class="wallpaper-login"></div>
      </transition>
      <div class="wallpaper-register"></div>

      <div class="container">
         <div class="row">
            <v-card class="col-lg-4 col-md-6 col-sm-8 mx-auto">
               <div v-if="!registerActive" class="card login" v-bind:class="{ error: emptyFields }">
                  <h1>Sign In</h1>
                  <form class="form-group">
                     <input v-model="emailLogin" type="email" class="form-control" placeholder="Email" required>
                     <input v-model="passwordLogin" type="password" class="form-control ml-3" placeholder="Password" required>
                     <v-btn variant="flat" color="primary" class="btn btn-primary ml-3" @click="doLogin"> Login</v-btn>
                     <p>Don't have an account? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Sign up here</a>
                     </p>
                  </form>
               </div>

               <div v-else class="card register" v-bind:class="{ error: emptyFields }">
                  <h1>Sign Up</h1>
                  <form class="form-group">
                     <input v-model="emailReg" type="email" class="form-control" placeholder="Email" required>
                     <input v-model="usernameReg" type="text" class="form-control" placeholder="Username" required>
                     <input v-model="passwordReg" type="password" class="form-control" placeholder="Password" required>
                     <v-btn class="btn btn-primary" color="primary" @click="doRegister"> Register </v-btn>
                     <p>Already have an account? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Sign in here</a>
                     </p>
                  </form>
               </div>
            </v-card>
         </div>

      </div>
   </div>
</template>
<script>
import axios from 'axios';
import api from '@/services/api'

export default {
   name:'Login-Page',
   data() {
      return {
         registerActive: false,
         emailLogin: "",
         passwordLogin: "",
         emailReg: "",
         passwordReg: "",
         usernameReg: "",
         emptyFields: false
      }
   },
   methods: {
      doLogin() {
         if (this.emailLogin === "" || this.passwordLogin === "") {
            this.emptyFields = true;
         } else {
            axios.post(api.login, {
               "email": this.emailLogin,
               "password": this.passwordLogin
            }).then(res => {
               console.log(res);
            })
         }
      },
      
      doRegister() {
         if (this.emailReg === "" || this.passwordReg === "" || this.usernameReg === "") {
            this.emptyFields = true;
         } else {
            axios.post(api.register, {
               email: this.emailReg,
               password: this.passwordReg,
               username: this.usernameReg
            }).then(res => {
               if (res.status === 200){
                  this.registerActive = false
               }
            })
         }
      }
   }
}

</script>
<style>
p {
   line-height: 1rem;
}

.card {
   padding: 20px;
}

.form-group {
   input {
      margin-bottom: 20px;
   }
}

.login-page {
   align-items: center;
   display: flex;
   height: 100vh;

   .wallpaper-login {
      background: url(https://images.pexels.com/photos/32237/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)
         no-repeat center center;
      background-size: cover;
      height: 100%;
      position: absolute;
      width: 100%;
      z-index: -10;
   }
   
   .fade-enter-active,
   .fade-leave-active {
  transition: opacity .5s;
}
   .fade-enter,
   .fade-leave-to {
      opacity: 0;
   }
   
   .wallpaper-register {
      background: url(https://images.pexels.com/photos/533671/pexels-photo-533671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)
         no-repeat center center;
      background-size: cover;
      height: 100%;
      position: absolute;
      width: 100%;
      z-index: -100;
   }

   h1 {
      margin-bottom: 1.5rem;
   }
}

.error {
   animation-name: errorShake;
   animation-duration: 0.3s;
}

@keyframes errorShake {
   0% {
      transform: translateX(-25px);
   }
   25% {
      transform: translateX(25px);
   }
   50% {
      transform: translateX(-25px);
   }
   75% {
      transform: translateX(25px);
   }
   100% {
      transform: translateX(0);
   }
}
</style>