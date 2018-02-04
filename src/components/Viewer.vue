<template lang="pug">
.mdl-layout.mdl-js-layout.mdl-layout--fixed-header
  header.mdl-layout__header
    .mdl-layout__header-row
      button.mdl-layout__drawer-button(@click="$router.go(-1)")
        i.material-icons arrow_back
      span.mdl-layout-title.brand
        span.b-lyrics L
        span.b-dot .
        span.b-base B
        span.b-sub /VIEWER
      .mdl-layout-spacer
      nav.mdl-navigation
        template(v-if="!hiding")
          a.mdl-navigation__link(href="#", @click.prevent="hiding = true")
            i.material-icons visibility
        template(v-else)
          a.mdl-navigation__link(href="#", @click.prevent="hiding = false")
            i.material-icons visibility_off
        a.mdl-navigation__link(href="#", @click.prevent="$router.push('/edit/' + $route.params.id)")
          i.material-icons mode_edit
  main.mdl-layout__content
    .mdl-grid
      .mdl-cell.mdl-cell--12-col
        i.lyrics-icon.material-icons queue_music
        .title.no-border {{lyricsObj.title}}
        input-tag(:tags.sync="lyricsObj.tags", read-only=true)
    .mdl-grid
      .mdl-cell.mdl-cell--6-col
        i.lyrics-icon.material-icons library_books
      .mdl-cell.mdl-cell--6-col(:class="{'hiding': hiding}")
        i.lyrics-icon.material-icons translate
    .mdl-grid.lyrics-grid(v-for="(text, i) in splitLines($parseRuby(lyricsObj.lyrics[0].lyrics))")
      .mdl-cell.mdl-cell--6-col
        .lyrics.no-border
          p.blank(v-if="text === ''")
          p(v-else, v-html="text")
      .mdl-cell.mdl-cell--6-col(:class="{'hiding': hiding}")
        .lyrics.no-border
          p.blank(v-if="text === ''")
          p.translated(v-else, v-html="splitLines($parseRuby(lyricsObj.lyrics[1].lyrics))[i]")
</template>

<script>
export default {
  data: () => ({
    hiding: false,
    lyricsObj: {
      title: 'Loading...',
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
    },
  }),
  methods: {
    splitLines(text) {
      return text.split(/\n/);
    },
  },
  created() {
    this.$rs['multi-language-lyrics'].get(this.$route.params.id).then((obj) => {
      this.lyricsObj = obj;
    });
  },
  components: {
  },
};
</script>

<style lang="scss" scoped>
.hiding {
  display: none;
}
.mdl-layout__content {
  .mdl-grid {
    margin: 0;
  }
}
.lyrics-grid {
  padding-top: 0;
  padding-bottom: 0;
}
.mdl-layout__content .lyrics {
  min-height: 0;
  padding: 0;
  margin: 0;
  display: flex;
  position: relative;
  p {
    margin: 0;
    font-size: 18px;
    &.translated {
      color: #ccc;
      font-style: italic;
    }
  }
}
</style>
