<template>
  <div class="singer" ref="singer">
    <list-view :list="singer" @select="selectSinger" ref="list"></list-view>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/javascript">
import { getSinger } from 'api/singer'
import ListView from 'base/listview/listview'
import { mapMutations } from 'vuex'
import { playlistMixin } from 'common/js/mixin'
// import Singer from 'common/js/singer'

export default {
  mixins: [playlistMixin],
  name: 'Singer',
  data () {
    return {
      singer: []
    }
  },
  created () {
    this._getSingerList()
  },
  methods: {
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    selectSinger (singer) {
      this.$router.push({
        path: `/singer/${singer.singer_mid}`
      })
      this.setSinger(singer)
    },
    _getSingerList () {
      getSinger().then(res => {
        // console.log(this._normalizeSongs(res))
        this.singer = this._normalizeSongs(res)
      })
    },
    _normalizeSongs (list) {
      const res = list.map(tilteItem => {
        return {
          title: tilteItem.title,
          items: tilteItem.items.map(singer => {
            singer.avatar = `https://y.gtimg.cn/music/photo_new/T001R150x150M000${singer.singer_mid}.jpg?max_age=2592000`
            return singer
          })
        }
      })
      return res
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    ListView
  }
}
</script>

<style lang="stylus" scoped>
  .singer
    position fixed
    top 88px
    bottom 0
    width 100%
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
