<template>
  <music-list></music-list>
</template>

<script>
import { mapGetters } from 'vuex'
import MusicList from 'components/music-list/music-list'
import { getSingetDetail, getMusicDeTail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'

export default {
  name: 'SingerDetail',
  data () {
    return {
      songs: []
    }
  },
  created () {
    // console.log(this.singer)
    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail () {
      let query = !this.singer.singer_mid ? this.$router.currentRoute.params.id : this.singer.singer_mid
      getSingetDetail(query)
        .then(res => {
          if (res.code === ERR_OK) {
            const data = res.singer.data
            this.songs = this._normalizeSongs(data.songlist)
          }
        })
    },
    async _normalizeSongs (list) {
      let res = []
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        let response = await getMusicDeTail(item.mid)
        if (response.req_0.code === ERR_OK) {
          const purl = response.req_0.data.midurlinfo[0].purl
          // console.log(createSong(item, purl))
          res.push(createSong(item, purl))
        }
      }
      return res
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .singer-detail
    position fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background $color-background
</style>
