<template>
  <music-list :title="title" :bg-image="bgImage" :songs="songs" :rank="rank"></music-list>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { getMusicList } from 'api/rank'
import { getMusicDeTail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
import { mapGetters } from 'vuex'

export default {
  name: 'TopList',
  data () {
    return {
      songs: [],
      rank: true
    }
  },
  components: {
    MusicList
  },
  created () {
    this._getTopList()
  },
  methods: {
    _getTopList () {
      if (!this.topList.id) {
        this.$router.push('/rank')
      }
      getMusicList(this.topList.id).then(res => {
        if (res.code === ERR_OK) {
          this._normalizeSongs(res.detail.data.songInfoList)
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
  },
  computed: {
    title () {
      return this.topList.topTitle
    },
    bgImage () {
      // if (this.songs.length) {
      //   return this.songs[0].image
      // }
      return this.topList.picUrl
    },
    ...mapGetters([
      'topList'
    ])
  }
}
</script>
