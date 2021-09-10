function importContext(r) {
  r.keys().forEach(r);
}

function importHeaderFooter() {
  importContext(require.context('@components/footer', true, /\.(js|sass)$/));
  importContext(require.context('@components/header', true, /\.(js|sass)$/));
}

function importCommon() {
  importContext(require.context('normalize.css', true, /normalize.css$/));
  importContext(require.context('@styles', true, /(main.sass|fonts.sass)$/));
  importContext(require.context('@pages', true, /page-template.sass$/));
  importContext(require.context('@/assets/fonts', true, /\.(otf|ttf|svg|woff|woff2|eot)$/));
  importContext(require.context('@/assets/favicons', true, /\.*$/));
}

export { importCommon, importContext, importHeaderFooter };
