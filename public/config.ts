// 这里是生产环境的 URL
// 如果不为空，覆盖 .env.production 中的
const MUTABLE_PRODUCTION_URL = 'http://127.0.0.1:8083'

window.g = {
  url: MUTABLE_PRODUCTION_URL,
}
