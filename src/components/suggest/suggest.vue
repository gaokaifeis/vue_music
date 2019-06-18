<template>
  <scroll class="suggest" :data="result" :pullup="pullup" @scrollToEnd="searchMore" ref="suggest">
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" :key="index" v-for="(item, index) in result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { search } from 'api/search'
import { ERR_OK } from 'api/config'
import { createSongForSearch } from 'common/js/song'
import { getMusicDeTail } from 'api/singer'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import NoResult from 'base/no-result/no-result'

const TYPE_SINGER = 'singer'
const perpage = 20
export default {
  name: 'Suggest',
  data () {
    return {
      page: 1,
      result: [],
      pullup: true,
      hasMore: true
    }
  },
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    query () {
      this.search()
    }
  },
  methods: {
    search () {
      this.page = 1
      this.hasMore = true
      this.result = []
      this.$refs.suggest.scrollTo(0, 0)
      search(this.query, this.page, this.showSinger, perpage)
        .then(res => {
          if (res.code === ERR_OK) {
            this._genResult(res.data)
            this._checkMore(res.data)
          }
        })
    },
    _checkMore (data) {
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
        this.hasMore = false
      }
    },
    _genResult (data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
      }
      if (data.song) {
        // ret = ret.concat(data.song.list)
        this._normalizeSongs(data.song.list).then(res => {
          const result = this.result
          result.concat([...ret, ...res])
          this.result = this.result.concat([...ret, ...res])
        })
      }
    },
    async _normalizeSongs (list) {
      let res = []
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        let response = await getMusicDeTail(item.songmid)
        if (response.req_0.code === ERR_OK) {
          const purl = response.req_0.data.midurlinfo[0].purl
          res.push(createSongForSearch(item, purl))
        }
      }
      return res
    },
    getIconCls (item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisplayName (item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name}-${item.singer}`
      }
    },
    searchMore () {
      if (!this.hasMore) {
        return
      }
      this.page++
      search(this.query, this.page, this.showSinger, perpage)
        .then(res => {
          if (res.code === ERR_OK) {
            this._genResult(res.data)
            this._checkMore(res.data)
          }
        })
    },
    selectItem (item) {
      if (item.type === TYPE_SINGER) {
        const singer = {
          singer_id: item.singerid,
          singer_mid: item.singermid,
          singer_name: item.singername,
          avatar: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.singermid}.jpg?max_age=2592000`
        }
        this.$router.push({
          path: `/search/${singer.singer_mid}`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  components: {
    Scroll,
    Loading,
    NoResult
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
