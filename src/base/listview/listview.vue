<template>
  <scroll class="listview" @scroll="scrollE" :data="list" :listenScroll="listenScroll" :probeType="probeType" ref="listView">
    <ul>
      <li v-for="group in list" :key="group.title" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="item in group.items" :key="item.singer_id">
            <img class="avatar" v-lazy="constructorImageUrl(item.singer_mid)" />
            <span class="name">{{item.singer_name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutStart" @touchmove.stop.prevent="onShortcutMove">
      <ul>
        <li class="item" v-for="(item, index) in shotcutList" :key="item" :data-index="index" :class="{'current': currentIndex === index}">
          {{item}}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import { getData } from 'common/js/dom'

const ANCHOR_HEIGHT = 18

export default {
  name: 'ListView',
  created () {
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  data () {
    return {
      scrollY: -1,
      currentIndex: 0
    }
  },
  props: {
    list: {
      type: Array,
      default: null
    }
  },
  components: {
    Scroll
  },
  methods: {
    constructorImageUrl (id) {
      return `https://y.gtimg.cn/music/photo_new/T001R150x150M000${id}.jpg?max_age=2592000`
    },
    onShortcutStart (e) {
      let anchorIndex = getData(e.target, 'index')
      let firstToch = e.touches[0]
      this.touch.y1 = firstToch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutMove (e) {
      let firstToch = e.touches[0]
      this.touch.y2 = firstToch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = Number(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    scrollE (pos) {
      this.scrollY = pos.y
    },
    _scrollTo (index) {
      this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _caculateHeight () {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  computed: {
    shotcutList () {
      return this.list.map(item => item.title.substr(0, 1))
    }
  },
  watch: {
    list () {
      setTimeout(() => {
        this._caculateHeight()
      }, 20)
    },
    scrollY (newY) {
      const listHeight = this.listHeight
      // 当滚动到顶部
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 在中间部分
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          return
        }
      }

      // 当滚动到底部，且-newY大于最后一个元素的上限

      this.currentIndex = listHeight.length - 2
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
