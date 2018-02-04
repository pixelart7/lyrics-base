<template lang="pug">
.mdl-layout.mdl-js-layout.mdl-layout--fixed-header
  header.mdl-layout__header
    .mdl-layout__header-row
      button.mdl-layout__drawer-button(@click="fetch()")
        i.material-icons refresh
      span.mdl-layout-title.brand
        span.b-lyrics LYRICS
        span.b-dot .
        span.b-base BASE
      .mdl-layout-spacer
      nav.mdl-navigation
        router-link.mdl-navigation__link(to="/edit/new")
          i.material-icons add
  main.mdl-layout__content
    //- .search-container
      input.search(placeholder="search...")
    .page-content
      #fab-connect
      div(v-if="Object.keys(lyricsList).length > 0")
        stack.lyrics-list-stack(:column-min-width="320" :gutter-width="12" :gutter-height="12")
          template(v-for="id in Object.keys(lyricsList)")
            stack-item(:key="id"): lyrics-card(:id="id")
</template>

<script>
import { Stack, StackItem } from 'vue-stack-grid';
import Widget from 'remotestorage-widget';
import LyricsCard from './LyricsCard';

export default {
  data: () => ({
    lyricsList: {},
    searchList: {},
  }),
  methods: {
    fetch() {
      this.$rs['multi-language-lyrics'].list().then((list) => {
        this.lyricsList = list;
      });
    },
  },
  created() {
    this.fetch();
  },
  mounted() {
    const widget = new Widget(this.$rs);
    widget.attach('fab-connect');
  },
  components: {
    'lyrics-card': LyricsCard,
    stack: Stack,
    'stack-item': StackItem,
  },
};
</script>

<style lang="scss" scoped>
.page-content {
  padding: 24px;
}

.search-container {
  height: 36px;
  input {
    height: 100%;
    width: 100%;
    text-align: center;
    border: none;
    border-bottom: 1px solid #ddd;
  }
}
</style>
