<script setup lang="ts">
import { APP_META } from '~/constants'
import bg from '~/images/login/bg.png'
import illustration from '~/images/login/illustration.svg'
import { Motion, TypeIt } from '~/utils'
import LoginForm from './components/LoginForm.vue'
</script>

<template>
  <div select-none>
    <img :src="bg" class="wave">
    <div absolute right-5 top-3 flex-center>
      <LayoutNavDarkToggle />
    </div>

    <div class="login-container">
      <div class="img">
        <img :src="illustration">
      </div>
      <div class="login-box">
        <div class="login-form">
          <Motion>
            <h2 outline-none>
              <TypeIt :values="[APP_META.name]" :cursor="false" :speed="150" />
            </h2>
          </Motion>
          <LoginForm />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}

.login-container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 18rem;
  padding: 0 2rem;
}

.img {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.img img {
  width: 500px;
}

.login-box {
  display: flex;
  align-items: center;
  text-align: center;
}

.login-form {
  width: 360px;
}
.login-form h2 {
  text-transform: uppercase;
  margin: 15px 0;
  color: #999;
  font: bold 220% Consolas, Monaco, monospace;
}

@media screen and (max-width: 1180px) {
  .login-container {
    grid-gap: 9rem;
  }

  .login-form {
    width: 290px;
  }

  .login-form h2 {
    font-size: 2.4rem;
    margin: 8px 0;
  }

  .img img {
    width: 360px;
  }

}

@media screen and (max-width: 968px) {
  .wave {
    display: none;
  }

  .wave {
    display: none;
  }

  .img {
    display: none;
  }

  .login-container {
    grid-template-columns: 1fr;
  }

  .login-box {
    justify-content: center;
  }
}
</style>
