import axios from 'axios'
import { commonParams, ERR_OK } from './config'

const formatData = (param) => {
  param = param || {}
  return Object.assign({}, commonParams, {
    platform: 'yqq.json',
    hostUin: 0,
    format: 'json',
    data: {
      'comm': {'ct': 24, 'cv': 0},
      'singerList': {
        'module': 'Music.SingerListServer',
        'method': 'get_singer_list',
        'param': {
          'area': -100,
          'sex': -100,
          'genre': -100,
          'index': -100,
          'sin': 0,
          'cur_page': 1,
          ...param
        }
      }
    }
  })
}

const getSingerTitle = (index, tags) => {
  const res = tags.filter(item => item.id === index)
  return res.length && res[0].name
}

export const getSinger = async () => {
  const url = '/api/getSingerList'

  const data = formatData()
  let res = await axios.get(url, {
    params: data
  })
  if (res.data.code === ERR_OK) {
    res = res.data
    const tags = res.singerList.data.tags
    let index = [...tags.index]
    index.shift()
    const promises = index.map(item => {
      return axios.get(url, {
        params: formatData({'index': item.id, area: 200})
      })
    })
    let results = await Promise.all(promises)
    results = results.map(item => item.data.singerList.data)
    results.unshift(res.singerList.data)
    return results.map(item => ({
      title: getSingerTitle(item.index, tags.index),
      items: item.singerlist
    }))
    // return results
  }

  // return axios.get(url, {
  //   params: data
  // }).then((res) => {
  //   return Promise.resolve(res.data)
  // })
}

export const getSingetDetail = async (id) => {
  const url = '/api/getSingerDetail'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq.json',
    hostUin: 0,
    loginUin: 0,
    needNewCode: 0,
    format: 'json',
    data: {
      'comm': {'ct': 24},
      'singer': {
        'method': 'get_singer_detail_info',
        'param': {
          'sort': 5,
          'singermid': id,
          'sin': 0,
          'num': 10
        },
        'module': 'music.web_singer_info_svr'
      }
    }
  })
  const res = await axios.get(url, {
    params: data
  })
  return Promise.resolve(res.data)
}
