var express = require('express')
var config = require('./config/index')
var axios = require('axios')

var port = process.env.PORT || config.build.port

var app = express()

app.get('/api/getRecommendList', function(req, res) {
  var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/',
      // host: 'y.qq.com',
      ['Sec-Fetch-Mode']: 'cors',
      ['User-Agent']: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3800.0 Safari/537.36 Edg/76.0.172.0',
      // Accept: 'application/json, text/javascript, */*; q=0.01'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(err => {console.log(err)})
})

app.get('/api/getSingerList', function(req, res) {
  var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/portal/singer_list.html',
      // host: 'y.qq.com',
      origin: 'https://y.qq.com',
      ['User-Agent']: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3800.0 Safari/537.36 Edg/76.0.172.0',
      // Accept: 'application/json, text/javascript, */*; q=0.01'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(err => {console.log(err)})
})

app.get('/api/getSingerDetail', function(req, res) {
  var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/portal/singer_list.html',
      // host: 'y.qq.com',
      origin: 'https://y.qq.com',
      ['User-Agent']: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3800.0 Safari/537.36 Edg/76.0.172.0',
      // Accept: 'application/json, text/javascript, */*; q=0.01'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(err => {console.log(err)})
})

app.get('/api/getMusicDetail', function(req, res) {
  var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/portal/player.html',
      // host: 'y.qq.com',
      origin: 'https://y.qq.com',
      ['User-Agent']: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3800.0 Safari/537.36 Edg/76.0.172.0',
      // Accept: 'application/json, text/javascript, */*; q=0.01'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(err => {console.log(err)})
})

app.get('/api/getLyrics', function(req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/portal/player.html',
      // host: 'y.qq.com',
      // origin: 'https://y.qq.com',
      ['User-Agent']: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3800.0 Safari/537.36 Edg/76.0.172.0',
      // Accept: 'application/json, text/javascript, */*; q=0.01'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(err => {console.log(err)})
})

app.get('/api/getDisc', function(req, res) {
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/portal/player.html',
      // host: 'y.qq.com',
      origin: 'https://y.qq.com',
      ['User-Agent']: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3800.0 Safari/537.36 Edg/76.0.172.0',
      // Accept: 'application/json, text/javascript, */*; q=0.01'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(err => {console.log(err)})
})

app.get('/api/getRankList', function(req, res) {
  var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/m/index.html',
      // host: 'y.qq.com',
      origin: 'https://y.qq.com',
      ['User-Agent']: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
      // Accept: 'application/json, text/javascript, */*; q=0.01'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(err => {console.log(err)})
})

app.get('/api/getHotList', function(req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/m/index.html',
      // host: 'y.qq.com',
      origin: 'https://y.qq.com',
      ['User-Agent']: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
      // Accept: 'application/json, text/javascript, */*; q=0.01'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(err => {console.log(err)})
})

app.get('/api/search', function(req, res) {
  var url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/m/index.html',
      // host: 'y.qq.com',
      origin: 'https://y.qq.com',
      ['User-Agent']: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
      // Accept: 'application/json, text/javascript, */*; q=0.01'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(err => {console.log(err)})
})

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
