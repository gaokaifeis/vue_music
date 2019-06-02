import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export const getRecommend = () => {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/p.fcg'
  const data = {
    ...commonParams,
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  }

  return jsonp(url, data, options)
}
