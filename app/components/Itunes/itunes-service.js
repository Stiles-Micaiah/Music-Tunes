import Song from "../../models/Song.js";


let _state = {
  songs: []
}

let _subscribers = {
  songs: []
}

function setState(propName, data) {
  _state[propName] = data
  _subscribers[propName].forEach(fn => fn())
}

//DO NOT MODIFY
class ItunesService {
  get Songs() {
    return _state.songs
  }

  getMusicByArtist(artist) {
    var url = 'https://itunes.apple.com/search?callback=?&term=' + artist;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        let results = res.results.map(s => new Song(s))
        setState('songs', results)
      })
      .catch(err => console.log(err))
  }

  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  }
  audioStop() {
    let sound = document.getElementById('audio-tag')
    sound.pause()
  }
  playAudio(url) {
    url == 'stop' ? this.audioStop() : document.getElementById('audio-tag').setAttribute('src', url)

  }
}



export default ItunesService