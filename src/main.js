// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueAutosize from 'vue-autosize';
import RemoteStorage from 'remotestoragejs';
import InputTag from 'vue-input-tag';

import App from './App';
import router from './router';

const GOOGLE_DRIVE_ID = '';

const uuidv4 = (a) => a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, uuidv4); // eslint-disable-line

const MultiLanguageLyrics = {
  name: 'multi-language-lyrics',
  builder(privateClient) {
    // console.log(publicClient);
    privateClient.declareType('lyrics', {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
        tags: {
          type: 'array',
          default: [],
        },
        lyrics: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              lang: {
                type: 'string',
              },
              lyrics: {
                type: 'string',
              },
            },
          },
        },
      },
    });
    return {
      exports: {
        get(id) {
          return privateClient.getObject(`lyrics/${id}`);
        },
        list() {
          return privateClient.getListing('lyrics/');
        },
        deleteLyrics(id) {
          return privateClient.remove(`lyrics/${id}`);
        },
        update(id, lyrics) {
          const lyricsWithId = lyrics;
          lyricsWithId.id = id;
          const path = `lyrics/${lyricsWithId.id}`;
          return privateClient.storeObject('lyrics', path, lyricsWithId).then(() => lyricsWithId);
        },
        add(lyrics) {
          const lyricsWithId = lyrics;
          lyricsWithId.id = uuidv4();
          const path = `lyrics/${lyricsWithId.id}`;
          return privateClient.storeObject('lyrics', path, lyricsWithId).then(() => lyricsWithId);
        },
      },
    };
  },
};

const remoteStorage = new RemoteStorage({
  modules: [MultiLanguageLyrics],
});
remoteStorage.access.claim('multi-language-lyrics', 'rw');
remoteStorage.caching.enable('/multi-language-lyrics/');
remoteStorage.setApiKeys({
  googledrive: GOOGLE_DRIVE_ID,
});

Vue.config.productionTip = false;

Vue.use(VueAutosize);
Vue.use({
  install(V) { /* eslint-disable no-param-reassign */
    V.prototype.$parseRuby = (text) => {
      const ruby = text.replace(/{{1}([^{}()]+)}{1}\({1}([^{}()]+)\){1}/gm, '<ruby>$1<rt>$2</rt></ruby>');
      return ruby;
    };
    V.prototype.$rs = remoteStorage;
    V.prototype.$colorHash = (inputString) => { /* eslint-disable */
      let sum = 0;
      for (let i in inputString) {
        sum += inputString.charCodeAt(i);
      }

      const r = ~~(('0.' + Math.sin(sum + 1).toString().substr(6)) * 256);
      const g = ~~(('0.' + Math.sin(sum + 2).toString().substr(6)) * 256);
      const b = ~~(('0.' + Math.sin(sum + 3).toString().substr(6)) * 256);

      let hex = "#";

      hex += ("00" + r.toString(16)).substr(-2, 2).toUpperCase();
      hex += ("00" + g.toString(18)).substr(-2, 2).toUpperCase();
      hex += ("00" + b.toString(20)).substr(-2, 2).toUpperCase();

      return hex;
    };
  },
});
Vue.component('input-tag', InputTag);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
