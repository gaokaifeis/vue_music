import axios from 'axios'
import { commonParams } from './config'

export const getRecommend = () => {
  const url = '/api/getRecommendList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq.json',
    hostUin: 0,
    loginUin: 0,
    needNewCode: 0,
    format: 'json',
    data: {
      'comm': {'ct': 24},
      'category': {'method': 'get_hot_category', 'param': {'qq': ''}, 'module': 'music.web_category_svr'},
      'recomPlaylist': {'method': 'get_hot_recommend', 'param': {'async': 1, 'cmd': 2}, 'module': 'playlist.HotRecommendServer'},
      'playlist': {'method': 'get_playlist_by_category', 'param': {'id': 8, 'curPage': 1, 'size': 40, 'order': 5, 'titleid': 8}, 'module': 'playlist.PlayListPlazaServer'},
      'new_song': {'module': 'newsong.NewSongServer', 'method': 'get_new_song_info', 'param': {'type': 5}},
      'new_album': {'module': 'newalbum.NewAlbumServer', 'method': 'get_new_album_info', 'param': {'area': 1, 'sin': 0, 'num': 10}},
      'new_album_tag': {'module': 'newalbum.NewAlbumServer', 'method': 'get_new_album_area', 'param': {}},
      'toplist': {'module': 'musicToplist.ToplistInfoServer', 'method': 'GetAll', 'param': {}},
      'focus': {'module': 'QQMusic.MusichallServer', 'method': 'GetFocus', 'param': {}}
    }
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export const getSongList = (disstid) => {
  const url = '/api/getDisc'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq.json',
    hostUin: 0,
    loginUin: 0,
    needNewCode: 0,
    format: 'json',
    disstid: disstid,
    inCharset: 'utf8',
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    new_format: 1,
    g_tk: 448150391
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
