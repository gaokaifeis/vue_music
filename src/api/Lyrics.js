import axios from 'axios'
import { commonParams } from './config'

export const getLyric = (mid) => {
  const url = '/api/getLyrics'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq.json',
    g_tk: '2070850189',
    pcachetime: +new Date(),
    hostUin: 0,
    // loginUin: '1148117077',
    needNewCode: 0,
    inCharset: 'utf8',
    format: 'json',
    songmid: mid
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
