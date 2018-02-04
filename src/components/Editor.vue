<template lang="pug">
.mdl-layout.mdl-js-layout.mdl-layout--fixed-header
  header.mdl-layout__header(:class="{'deleting': deleteConfirmation, 'editing': !deleteConfirmation}")
    .mdl-layout__header-row
      button.mdl-layout__drawer-button(@click="$router.go(-1)")
        i.material-icons arrow_back
      span.mdl-layout-title.brand
        span.b-lyrics L
        span.b-dot .
        span.b-base B
        span.b-sub /EDITOR
      .mdl-layout-spacer
      nav.mdl-navigation
        template(v-if="!deleteConfirmation")
          a.mdl-navigation__link(v-if="$route.params.id !== 'new'", href="#", @click.prevent="deleteConfirmation = true")
            i.material-icons delete
          a.mdl-navigation__link(href="#", @click.prevent="$router.go(-1)")
            i.material-icons cancel
          a.mdl-navigation__link(v-if="title !== ''", href="#", @click.prevent="save()")
            i.material-icons save
        template(v-else)
          a.mdl-navigation__link(href="#", @click.prevent="") Delete?
          a.mdl-navigation__link(href="#", @click.prevent="deleteConfirmation = false")
            i.material-icons undo
          a.mdl-navigation__link(href="#", @click.prevent="deleteLyrics()")
            i.material-icons delete_forever
  main.mdl-layout__content
    .mdl-grid
      .mdl-cell.mdl-cell--12-col
        i.lyrics-icon.material-icons queue_music
        input.title.no-border(v-model="title", placeholder="Song title...")
        input-tag(:tags.sync="tags", placeholder="Tags...", limit=10)
    .mdl-grid
      .mdl-cell.mdl-cell--12-col.tools
        i.lyrics-icon.material-icons build
        button.mdl-button(@click="viewingTools = !viewingTools")
          template(v-if="!viewingTools") view tools
          template(v-else) hide tools
        template(v-if="viewingTools")
          button.mdl-button.mdl-button--raised(@click="generateFurigana()", :disabled="generating")
            template(v-if="!generating") generate furigana
            template(v-else) generating...
    .mdl-grid
      .mdl-cell.mdl-cell--6-col
        i.lyrics-icon.material-icons library_books
        textarea.lyrics.no-border#textarealyrics(v-show="editingLyrics", @blur="focusOut()", v-autosize="lyrics[0].lyrics", v-model="lyrics[0].lyrics", placeholder="Original lyrics...")
        pre.lyrics.no-border#prelyrics(v-show="!editingLyrics", @click="focusIn()", v-html="$parseRuby(lyrics[0].lyrics)")
      .mdl-cell.mdl-cell--6-col
        i.lyrics-icon.material-icons translate
        textarea.lyrics.no-border(v-autosize="lyrics[1].lyrics", v-model="lyrics[1].lyrics", placeholder="Translated lyrics...")
</template>

<script>
import * as kuroshiro from 'kuroshiro';

export default {
  data: () => ({
    viewingTools: false,
    generating: false,
    editingLyrics: false,
    deleteConfirmation: false,
    title: '',
    tags: [],
    lyrics: [
      {
        lang: 'original',
        lyrics: '',
      },
      {
        lang: 'translate',
        lyrics: '',
      },
    ],
  }),
  created() {
    if (this.$route.params.id !== 'new') {
      this.$rs['multi-language-lyrics'].get(this.$route.params.id).then((obj) => {
        this.title = obj.title;
        this.tags = obj.tags;
        this.lyrics = obj.lyrics;
      });
    } else {
      this.editingLyrics = true;
    }
  },
  methods: {
    focusIn() {
      this.editingLyrics = true;
    },
    focusOut() {
      if (this.lyrics[0].lyrics !== '') this.editingLyrics = false;
    },
    generateFurigana() {
      this.generating = true;
      kuroshiro.init({ dicPath: '/static/dict/' }, () => {
        const strippedLyrics = this.lyrics[0].lyrics.replace(/{{1}([^{}()]+)}{1}\({1}([^{}()]+)\){1}/gm, '$1');
        let result = kuroshiro.convert(strippedLyrics, {
          mode: 'furigana',
          to: 'hiragana',
        });
        result = result.replace(/<ruby>/gm, '{')
          .replace(/<rp>\(<\/rp><rt>/gm, '}(')
          .replace(/<\/rt><rp>\)<\/rp><\/ruby>/gm, ')');
        this.lyrics[0].lyrics = result;
        this.generating = false;
      });
    },
    deleteLyrics() {
      this.$rs['multi-language-lyrics'].deleteLyrics(this.$route.params.id)
        .then(() => {
          this.$router.push('/');
        });
    },
    save() {
      const lyrics = {
        title: this.title,
        tags: this.tags,
        lyrics: this.lyrics,
      };
      // console.log(lyrics);
      if (this.$route.params.id === 'new') {
        this.$rs['multi-language-lyrics'].add(lyrics)
          .then(() => {
            // console.log('stored successfully');
            this.$router.go(-1);
          });
      } else {
        this.$rs['multi-language-lyrics'].update(this.$route.params.id, lyrics)
          .then(() => {
            // console.log('update successfully');
            this.$router.go(-1);
          });
      }
    },
  },
  components: {
  },
};
</script>

<style lang="scss" scoped>
.tools {
  display: flex;
  align-items: center;
  .lyrics-icon, .mdl-button {
    margin-right: 12px;
  }
}

.lyrics-icon {
  color: rgba(#03A9F4, 0.6);
}
</style>
