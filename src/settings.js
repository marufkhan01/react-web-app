import axios from 'axios'

axios.defaults.headers.common["x-service"] = 'MyQlocx'

export default {
  // hostname: 'https://d1kfdyvexvp6je.cloudfront.net/api',
  // consumerhostname: 'https://consumer.qlocx.com',
  hostname: 'http://localhost:3001/api',
  consumerhostname: 'http://192.168.100.134:7777'
}
