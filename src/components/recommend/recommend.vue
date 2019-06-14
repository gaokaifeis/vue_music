<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="recommendList">
      <div>
        <div v-if="recommendList.length" class="slider-wrapper">
          <slider>
            <div v-for="item in recommendList" :key="'slider-' + item.id">
              <a :href="item.jump_info.url">
                <img @load="loadImg" :src="item.pic_info.url" />
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="item1 in recomPlaylist" :key="'scroll-' + item1.content_id">
              <div class="icon">
                <img width="60" height="60" v-lazy="item1.cover" />
              </div>
              <div class="text">
                <h2 class="name">{{item1.title}}</h2>
                <p class="desc">{{item1.title}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!recomPlaylist.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import { getRecommend } from 'api/recommend'
import { ERR_OK } from 'api/config'
import { playlistMixin } from 'common/js/mixin'

export default {
  mixins: [playlistMixin],
  name: 'Recommend',
  data () {
    return {
      recommendList: [],
      recomPlaylist: [],
      checkLoaded: false
    }
  },
  created () {
    this._getRecommend()
  },
  components: {
    Slider,
    Scroll,
    Loading
  },
  methods: {
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    _getRecommend () {
      getRecommend()
        .then(res => {
          if (res.code === ERR_OK) {
            this.recommendList = res.focus.data.content
            this.recomPlaylist = res.recomPlaylist.data.v_hot
          }
        })
    },
    loadImg () {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
