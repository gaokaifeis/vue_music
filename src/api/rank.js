import axios from 'axios'
import { commonParams } from './config'
import { customFormatPadStart } from 'common/js/util'

const decludeIds = [4, 27, 201]

const formatDate = (id) => {
  const date = new Date()
  const year = date.getFullYear()
  if (!decludeIds.includes(id)) {
    const week = customFormatPadStart(formatWeek2(), 2, '0')
    return `${year}_${week}`
  } else {
    if (date.getHours() < 10) {
      date.setDate(date.getDate() - 1)
    }
    const month = customFormatPadStart(date.getMonth() + 1, 2, '0')
    const day = customFormatPadStart(date.getDate(), 2, '0')
    return `${year}-${month}-${day}`
  }
}

let formatWeek2 = () => {
  const week = 7
  const currentdate = new Date()
  let startDate = new Date()
  startDate.setDate(1)
  startDate.setMonth(0)
  startDate.setDate(startDate.getDate() + (week - startDate.getDay() + 1) % week)
  currentdate.setDate(currentdate.getDate() - (startDate.getDay() + week - 1) % week)
  return (currentdate - startDate) / 3600 / 24 / 7 / 1000
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
          'num': 100,
          'period': formatDate(id)
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
