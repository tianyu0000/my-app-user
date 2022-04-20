import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'

const request = axios.create({
  timeout: 5000,
  withCredentials: true,
  transformRequest: (data) => {
    return qs.stringify(data)
  }
})

request.interceptors.request.use((config) => {
  config.url = '/api' + config.url;
  return config
}, (error) => Promise.reject(error))

request.interceptors.response.use((response) => {
  return response
}, err => {
  console.log(err);
}
)

export function get<P = any, R = any>(path: string, params?: P, config?: AxiosRequestConfig):
  Promise<R> {
  return request.get<R>(path, { params, ...(config || {}) }).then((res) => res.data);
}

export function put<P = any, R = any>(path: string, params?: P, config?: AxiosRequestConfig):
  Promise<R> {
  return request.put<R>(path, params, config).then((res) => res.data);
}

export function post<P = any, R = any>(path: string, params?: P, config?: AxiosRequestConfig):
  Promise<R> {
  return request.post<R>(path, params, config).then((res) => res.data);
}

export function del<P = any, R = any>(path: string, params?: P, config?: AxiosRequestConfig):
  Promise<R> {
  return request.delete<R>(path, { data: params, ...(config || {}) }).then((res) => res.data);
}
