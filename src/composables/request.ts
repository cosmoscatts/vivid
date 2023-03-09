import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type {
  AnyObject,
  DeleteParams,
  GetParams,
  PageData,
  PostParams,
  PutParams,
  Result,
} from '~/types'
import { AXIOS_TIMEOUT } from '~/constants'
import { getCurrentApiUrl } from '~/config'

type GeneratePageResult<T> = Result<PageData<T>>

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
    .filter(([_, value]) => (isArray(value) && !empty(value)) || !!value)
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

  get<T>(url: string, { params }: GetParams = {}, searchPage = false) {
    url += handleUrlParams(params)
    if (searchPage) return this.axios.get<T, GeneratePageResult<T>>(url)
    return this.axios.get<T, Result<T>>(url)
  }

  post<T>(url: string, { params, body = {} }: PostParams = {}, searchPage = false) {
    url += handleUrlParams(params)
    if (searchPage) return this.axios.post<T, GeneratePageResult<T>>(url, body)
    return this.axios.post<T, Result<T>>(url, body)
  }

  put<T>(url: string, { params, body = {} }: PutParams = {}, searchPage = false) {
    url += handleUrlParams(params)
    if (searchPage) return this.axios.put<T, GeneratePageResult<T>>(url, body)
    return this.axios.put<T, Result<T>>(url, body)
  }

  delete<T>(url: string, { params }: DeleteParams = {}, searchPage = false) {
    url += handleUrlParams(params)
    if (searchPage) return this.axios.delete<T, GeneratePageResult<T>>(url)
    return this.axios.delete<T, Result<T>>(url)
  }
}

export const R = BaseRequest.instance()
