import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const AXIOS_TIMEOUT = 5000

function createAxios(mergeConfig?: () => AxiosRequestConfig) {
  const _axios = axios.create({
    baseURL: getCurrentApiUrl(),
    timeout: AXIOS_TIMEOUT,
  })
  _axios.interceptors.request.use(
    (config: AxiosRequestConfig) => ({
      ...config,
      ...mergeConfig?.(),
    } as InternalAxiosRequestConfig<any>),
    (e: any) => Promise.reject(e),
  )
  _axios.interceptors.response.use(
    async (response: AxiosResponse) => {
      const {
        data: { code, data, message },
      } = response
      return Promise.resolve({ code, data, message }) as unknown as AxiosResponse<any, any>
    },
    (error: any) => Promise.reject(error),
  )
  return _axios
}

function handleUrlParams(params?: AnyObject | AnyObject[]) {
  if (!params) return ''
  if (!isArray(params)) params = [params]
  let paramStr = ''
  params
    .flatMap((i: AnyObject) => Object.entries(i))
    .filter(([_, value]) => (isArray(value) && !isEmpty(value)) || isBoolean(value) || !!value)
    .forEach(([key, value]) => {
      const values = isArray(value) ? [...value] : [value]
      values.forEach(i => paramStr += `&${encodeURIComponent(key)}=${encodeURIComponent(i as string)}`)
    })
  return `?${paramStr.slice(1)}`
}

export class BaseRequest {
  axios: AxiosInstance
  constructor(config?: () => AxiosRequestConfig) {
    this.axios = createAxios(config)
  }

  static instance(config?: () => AxiosRequestConfig): BaseRequest {
    return new BaseRequest(config)
  }

  get<T>(url: string, { params }: GetParams = {}, config?: AxiosRequestConfig) {
    url += handleUrlParams(params)
    return this.axios.get<T, Result<T>>(url, config)
  }

  getPageData<T>(url: string, { params }: GetParams = {}, config?: AxiosRequestConfig) {
    url += handleUrlParams(params)
    return this.axios.get<T, GeneratePageResult<T>>(url, config)
  }

  post<T>(url: string, { params, body = {} }: PostParams = {}, config?: AxiosRequestConfig) {
    url += handleUrlParams(params)
    return this.axios.post<T, Result<T>>(url, body, config)
  }

  put<T>(url: string, { params, body = {} }: PutParams = {}, config?: AxiosRequestConfig) {
    url += handleUrlParams(params)
    return this.axios.put<T, Result<T>>(url, body, config)
  }

  delete<T>(url: string, { params }: DeleteParams = {}, config?: AxiosRequestConfig) {
    url += handleUrlParams(params)
    return this.axios.delete<T, Result<T>>(url, config)
  }
}

export const R = BaseRequest.instance()
