<template>
  <div class="singer">

  </div>
</template>

<script type="text/javascript">
import { getSinger } from 'api/singer'
import { ERR_OK } from 'api/config'
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
        if (res.code === ERR_OK) {
          const data = res.singerList.data
          this.singer = data.singerList
        }
      })
    }
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
