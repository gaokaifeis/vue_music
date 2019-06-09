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
