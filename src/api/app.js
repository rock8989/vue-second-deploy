import axios from 'axios'

const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 5000
})

export const registration = (data) => {
  return service.post('/registration', data)
}

export const userLogin = (data) => {
  return service.post('/login', data)
}

export const popupRegister = (data) => {
  return service.post(`/popup`, data)
}

export const noticeList = (params) => {
  return service.get('/notice', { params })
}

export const noticeDetail = (data) => {   
  return service.get(`/notice/${data}`)
}

export const noticeModify = (data) => {   
  return service.post(`/notice/${data}`)
}

export const noticeRegister = (data) => {   
  return service.post('/notice', data)
}

export const noticeDelete = (data) => {
  return service.post(`/notice/${data}`)
}

export const setAuthHeader = token => {
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
  return service.get('/userInfo')
}

export const autoComplete = (params) => {
  return service.get('/notice/autoComplete', {params})
}