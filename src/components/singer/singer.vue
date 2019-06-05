<template>
  <div class="singer">
    <list-view :list="singer"></list-view>
  </div>
</template>

<script type="text/javascript">
import { getSinger } from 'api/singer'
import ListView from 'base/listview/listview'
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
    _getSingerList () {
      getSinger().then(res => {
        this.singer = res
      })
    }
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
</style>
