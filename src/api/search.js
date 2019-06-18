import axios from 'axios'
import { commonParams } from './config'

export const getHotKey = () => {
  const url = '/api/getHotList'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 0,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export const search = (query, page, zhida, perpage) => {
  const url = '/api/search'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
    format: 'json',
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: perpage,
    n: perpage,
    zhidaqu: 1,
    remoteplace: 'txt.mqq.all',
    w: query,
    p: page,
    catZhida: zhida ? 1 : 0
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
