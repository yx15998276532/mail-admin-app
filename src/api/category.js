// 所有类接口

import axios from './axios';

export default {
  getList(params) {
    return axios.get('/category/all', { params });
  },
};
