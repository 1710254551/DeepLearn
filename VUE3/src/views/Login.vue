<template>
  <div class="login">
    <div class="content">
      <div
        :style="{
          width: '100%',
        }"
      >
        <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-item label="用户名" v-bind="validateInfos.name">
            <a-input size="large" v-model:value="modelRef.name">
              <template #prefix>
                <user-outlined type="user" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item label="密码" v-bind="validateInfos.passward">
            <a-input size="large" v-model:value="modelRef.passward" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click.prevent="onSubmit">登录</a-button>
            <a-button style="margin-left: 10px" @click="reset">重置</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRaw, ref } from "vue";
import { Form } from "ant-design-vue";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons-vue";
import router from "@/router";

const useForm = Form.useForm;
export default defineComponent({
  components: {
    UserOutlined,
  },
  setup() {
    const modelRef = reactive({
      name: "",
      passward: "",
    });

    const { resetFields, validate, validateInfos } = useForm(
      modelRef,
      reactive({
        name: [
          {
            required: true,
            message: "请输入用户名",
          },
        ],
        passward: [
          {
            required: true,
            message: "请输入密码",
          },
        ],
      })
    );
    const onSubmit = () => {
      validate()
        .then((res) => {
          localStorage.setItem("userInfo", JSON.stringify(res));
          setTimeout(() => {
            router.push({ path: "/" });
          }, 1000);
          // console.log(res, toRaw(modelRef));
        })
        .catch((err) => {
          console.log("error", err);
        });
    };
    const reset = () => {
      resetFields();
    };
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
      validateInfos,
      reset,
      modelRef,
      onSubmit,
    };
  },
});
</script>

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
  display: flex;
  align-items: center;
  justify-content: center;
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
  box-shadow: -5px 4px 15px #00000055;
}
.ant-form-item-explain-error {
  text-align: left;
}
</style>
