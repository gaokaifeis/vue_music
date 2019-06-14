import { getLyric } from 'api/Lyrics'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'

const filterSinger = (list) => {
  const ret = []
  if (!list) {
    return ''
  }
  list.forEach(s => {
    ret.push(s.name)
  })
  return ret.join('/')
}

export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then(res => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject(res.retcode)
        }
      })
    })
  }
}

export const createSong = (musicdata, purl) => {
  return new Song({
    id: musicdata.id,
    mid: musicdata.mid,
    singer: filterSinger(musicdata.singer),
    name: musicdata.name,
    album: musicdata.album.name,
    duration: musicdata.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicdata.album.mid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/${purl}`
  })
}
