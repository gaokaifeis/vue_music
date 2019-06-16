<template>
  <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { getSongList } from 'api/recommend'
import { mapGetters } from 'vuex'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
import { getMusicDeTail } from 'api/singer'

export default {
  data () {
    return {
      songs: []
    }
  },
  components: {
    MusicList
  },
  computed: {
    title () {
      return this.disc.title
    },
    bgImage () {
      return this.disc.cover
    },
    ...mapGetters([
      'disc'
    ])
  },
  created () {
    this._getSongList()
  },
  methods: {
    _getSongList () {
      if (!this.disc.content_id) {
        this.$router.push('/recommend')
      }
      getSongList(this.disc.content_id)
        .then(res => {
          if (res.code === ERR_OK) {
            this._normalizeSongs(res.cdlist[0].songlist)
            // console.log(res.cdlist[0].songlist)
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
      this.songs = res
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
