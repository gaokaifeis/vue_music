<template>
  <div class="singer">
    <list-view :list="singer" @select="selectSinger"></list-view>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/javascript">
import { getSinger } from 'api/singer'
import ListView from 'base/listview/listview'
import { mapMutations } from 'vuex'

export default {
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
    selectSinger (singer) {
      this.$router.push({
        path: `/singer/${singer.singer_mid}`
      })
      this.setSinger(singer)
    },
    _getSingerList () {
      getSinger().then(res => {
        this.singer = res
      })
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
