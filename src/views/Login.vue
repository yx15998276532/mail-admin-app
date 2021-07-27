<template>
  <a-form-model ref="ruleForm" :model="ruleForm" :rules="rules" v-bind="layout"
   class="login-container">
    <a-form-model-item has-feedback label="邮箱:" prop="email">
      <a-input v-model="ruleForm.email"  />
    </a-form-model-item>
    <a-form-model-item has-feedback label="密码:" prop="password">
      <a-input v-model="ruleForm.password" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }" class="button">
      <a-button type="primary" @click="submitForm('ruleForm')">
        提交
      </a-button>
      <a-button style="margin-left: 10px" @click="resetForm('ruleForm')">
        重置
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import api from '@/api/user';

export default {
  data() {
    const emailReg = /^[\w-]+@[\w.-]+.com$/;
    const checkEmail = (rule, value, callback) => {
      clearTimeout(emailReg);
      if (!value) {
        return callback(new Error('请输入邮箱地址'));
      }
      if (emailReg.test(value)) {
        return callback();
      }
      return callback(new Error('邮箱格式不正确'));
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: '',
        email: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }],

      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.login(this.ruleForm).then((res) => {
            this.$store.dispatch('setUserInfo', res);
            this.$router.push('/');
          }).catch((error) => {
            this.$message.error(error);
          });
          return true;
        }
        // console.log('error submit!!');
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login-container{
    margin: 0 auto;
    width: 450px;
    border: 1px solid #eee;
    margin-top: 200px;
    padding-top: 50px;
    padding-left: 50px;
    border-radius: 8px;
    .button{
        text-align: center;
    }
}
</style>
