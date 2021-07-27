import axios from './axios';

export default { // 商品列表表格渲染
  getList(params) {
    return axios.get('/products/all', { params });
  },
  remove(params) {
    return axios.delete(`/products/${params.id}`);
  },
  add(params) {
    return axios.post('/products/add', params);
  },
  edit(params) {
    return axios.put('/products/edit', params);
  },
  detail(id) {
    return axios.get(`/products/${id}`);
  },
};
