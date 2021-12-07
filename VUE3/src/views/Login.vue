<template>
  <div class="login">
    <div class="content">登录21312312</div>
  </div>
</template>

<style>
.login {
  height: 100vh;
  background: url("../assets/loginBackground2.jpg") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.content,
.content:after {
  width: 600px;
  height: 800px;
  border-radius: 30px;
}
.content {
  z-index: 1;
  position: relative;
  margin: 0 auto;
  color: #fff;
}
.content:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  filter: blur(1px);
  background-color: rgba(255, 255, 255, 0.8);
  z-index: -1;
  box-shadow: 0px 1px 5px #00000086;
}
</style>
