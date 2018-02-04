<template lang="pug">
div.lyrics-card.mdl-card.mdl-shadow--2dp(@click="navigate()")
  .mdl-card__title(:style="'background-color: ' + $colorHash(lyricsObj.title) + ';'")
    h2.lyrics-card-title.mdl-card__title-text {{lyricsObj.title}}
    p.lyrics-preview(v-html="$parseRuby(lyricsObj.lyrics[0].lyrics.substr(0, 100)) + '...'")
  .mdl-card__supporting-text
    input-tag(v-if="lyricsObj.tags.length > 0", :tags.sync="lyricsObj.tags", read-only=true)
</template>

<script>
export default {
  data: () => ({
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
    navigate() {
      this.$router.push(`/view/${this.id}`);
    },
  },
  created() {
    this.$rs['multi-language-lyrics'].get(this.id).then((obj) => {
      this.lyricsObj = obj;
    });
  },
  props: {
    id: {
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.lyrics-card {
  width: 100%;
  cursor: pointer;
  position: relative;
  transition: all 0.1s;
  &:hover {
    transform: scale(1.02);
    z-index: 2;
  }
  .vue-input-tag-wrapper {
    cursor: pointer;
  }
  .mdl-card__title {
    height: 140px;
    position: relative;
    .mdl-card__title-text {
      font-size: 22px;
      font-family: "Rounded Mplus 1c", "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 500;
      filter: invert(1);
    }
    .lyrics-preview {
      position: absolute;
      filter: invert(1);
      opacity: 0.3;
      width: 50%;
      font-size: 14px;
      line-height: 1;
      right: 0;
      user-select: none;
    }
  }
}
</style>
