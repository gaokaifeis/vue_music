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

export const constructorImageUrl = (id) => {
  return `https://y.gtimg.cn/music/photo_new/T001R150x150M000${id}.jpg?max_age=2592000`
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

export const createSong = (musicdata) => {
  return new Song({
    id: musicdata.id,
    mid: musicdata.mid,
    singer: filterSinger(musicdata.singer),
    name: musicdata.name,
    album: musicdata.album.name,
    duration: musicdata.interval,
    image: constructorImageUrl(musicdata.album.id),
    url: musicdata.url
  })
}
