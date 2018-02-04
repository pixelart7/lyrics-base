<template lang="pug">
  #app
    router-view
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="scss">
@import 'node_modules/normalize-scss/sass/normalize'; @include normalize();
@import 'node_modules/material-design-lite/src/material-design-lite';
@import url('https://fonts.googleapis.com/css?family=Material+Icons|Roboto+Mono|Roboto:400,700');
@import url('https://fonts.googleapis.com/earlyaccess/roundedmplus1c.css');

html, body {
  font-family: "Rounded Mplus 1c", "Roboto", "Helvetica", "Arial", sans-serif;
}

body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#fab-connect {
  margin-bottom: 16px;
}

#remotestorage-widget .rs-widget {
  margin: 0;
}

.mdl-layout--fixed-header {
  padding-top: 64px;
}

.mdl-layout__header {
  position: fixed;
  top: 0;
}

.brand {
  font-family: "Roboto Mono", monospace;
  font-size: 20px;
  .b-lyrics { color: saturate(#03A9F4, 20); }
  .b-dot { color: #fff; }
  .b-base { color: #ddd ; }
  .b-sub { color: rgba(#fff, 0.4); }
}

.vue-input-tag-wrapper {
  border: none !important;
  padding: 0px !important;
  font-size: 20px !important;
  &.read-only {
    .input-tag {
      padding: 0 12px !important;
    }
  }
  .input-tag {
    border-radius: 24px !important;
    background-color: #DEDEDE !important;
    padding: 0 8px 0 10px !important;
    height: 32px !important;
    display: inline-flex !important;
    justify-content: center;
    align-items: center;
    border: none !important;
  }
  .input-tag .remove {
    font-size: 14px !important;
    margin-left: 8px !important;
    width: 18px;
    height: 18px;
    font-weight: 100;
    background-color: #767676 !important;
    border-radius: 24px !important;
    color: #DEDEDE !important;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    &:before {
      content: "×" !important;
      font-family: "Roboto Mono";
    }
  }
  .input-tag span {
    font-size: 13px !important;
    color: #111;
  }
  .new-tag {
    font-size: 20px !important;
    color: #000 !important;
  }
}

.mdl-layout__header {
  background-color: #212121;
  &.deleting {
    background-color: #f44336;
    .brand {
      .b-lyrics { color: #fff; }
      .b-dot { color: #fff; }
      .b-base { color: #fff; }
      .b-sub { color: rgba(#fff, 0.4); }
    }
  }
  &.editing {
    background-color: #03A9F4;
    .brand {
      .b-lyrics { color: #fff; }
      .b-dot { color: #fff; }
      .b-base { color: #fff; }
      .b-sub { color: rgba(#fff, 0.4); }
    }
  }
}

.title {
  font-size: 24px;
  width: 100%;
  padding-top: 6px;
  padding-bottom: 12px;
  font-family: "Rounded Mplus 1c", "Roboto", "Helvetica", "Arial", sans-serif;
}

.lyrics {
  width: 100%;
  min-height: 400px;
  padding-top: 6px;
  padding-bottom: 12px;
  font-size: 20px;
  line-height: 42px;
  margin-top: 8px;
  font-family: "Rounded Mplus 1c", "Roboto", "Helvetica", "Arial", sans-serif;
}

::placeholder {
  font-style: italic;
  color: #ccc;
}

input, textarea, [contenteditable=true] { outline: none; resize: none; }

.no-border {
  border: none;
}

.lyrics-icon {
  color: #999;
}
</style>
