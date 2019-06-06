<template>
  <div class="singer-detail"></div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingetDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import Song from 'common/js/song'

export default {
  name: 'SingerDetail',
  data () {
    return {
      song: []
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
            console.log(res)
            data = res.singer.data
          }
        })
    },
    _normalizeSongs (list) {
      let res = []
      list.forEach(item => {
        let 
      })
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
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
