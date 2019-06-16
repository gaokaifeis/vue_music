import axios from 'axios'
import { commonParams } from './config'
import { customFormatPadStart } from 'common/js/util'

const formatDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = customFormatPadStart(date.getMonth() + 1, 2, '0')
  const day = customFormatPadStart(date.getDate(), 2, '0')
  return `${year}-${month}-${day}`
}

export const getTopList = (disstid) => {
  const url = '/api/getRankList'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    format: 'json',
    uin: 0,
    needNewCode: 1
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export const getMusicList = (id) => {
  const url = '/api/getMusicDetail'

  const data = Object.assign({}, commonParams, {
    g_tk: 448150391,
    platform: 'yqq.json',
    format: 'json',
    hostUin: 0,
    needNewCode: 0,
    inCharset: 'utf8',
    data: {
      'detail': {
        'module': 'musicToplist.ToplistInfoServer',
        'method': 'GetDetail',
        'param': {
          'topId': id,
          'offset': 0,
          'num': 20,
          'period': formatDate()
        }
      },
      'comm': {'ct': 24, 'cv': 0}}
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
