var config = require('./src/page/index');

const loadingSectionHtml = `<div class="fullPage-loading-wrapper">
  <div class="fullPage-loading-img"></div>
</div>`;

const shareSectionHtml = `<div id="sl-dialog-share" class="sl-dialog" style="display: none;text-align: right;">
  <img src="https://activity-res.imeihao.shop/bath/share_hint.png" style="max-width: 70%;margin-right: 20px;margin-top: 10px" />
</div>`;

module.exports = {
  plugins: {
    "posthtml-include": {
      root: __dirname
    },
    "posthtml-expressions": {
      root: __dirname,
      locals: {
        loadingSection: config.useLoading ? loadingSectionHtml : '',
        shareSection: config.useShare ? shareSectionHtml : ''
      },
    }
  }
}
