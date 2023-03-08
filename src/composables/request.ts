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

const AXIOS_TIMEOUT = 5000
type GeneratePageResult<T> = Result<PageData<T>>

function createAxios(mergeConfig?: () => AxiosRequestConfig) {
  const _axios = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL as string,
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
  // if (!params) return ''
  // if (!G.isArray(params)) params = [params]
  const paramStr = ''
  // for (const [k, v] of params.flatMap((i: AnyObject) => Object.entries(i))) {
  //   if (!v || (G.isArray(v) && G.emptyArray(v))) continue
  //   const values = G.isArray(v) ? [...v] : [v]
  //   values.forEach(i => paramStr += `&${encodeURIComponent(k)}=${encodeURIComponent(i as string)}`)
  // }
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

  get<T>(url: string, { params }: GetParams) {
    url += handleUrlParams(params)
    return this.axios.get<T, Result<T>>(url)
  }

  post<T>(url: string, { params, body = {} }: PostParams) {
    url += handleUrlParams(params)
    return this.axios.post<T, Result<T>>(url, body)
  }

  put<T>(url: string, { params, body = {} }: PutParams) {
    url += handleUrlParams(params)
    return this.axios.put<T, Result<T>>(url, body)
  }

  delete<T>(url: string, { params }: DeleteParams) {
    url += handleUrlParams(params)
    return this.axios.delete<T, Result<T>>(url)
  }
}

export const R = BaseRequest.instance()
