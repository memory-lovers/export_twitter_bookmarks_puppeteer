const dayjs = require("dayjs");
const {
  screenshotFullPage,
  screenshotElement,
  writeHTML,
  writeInnerHTML
} = require("./utils");

const ACC = process.env.TWITTER_ACCOUNT;

async function dump(page) {
  const timestamp = dayjs().format("YYYYMMDD_HHmmss");

  // ページのスクリーンショットを取得
  const screen = `output/twitter_bookmarks_${ACC}_${timestamp}.png`;
  await screenshotFullPage(page, screen);

  // ページのHTMLを取得
  const outputFile = `output/twitter_bookmarks_${ACC}_${timestamp}.html`;
  await writeHTML(page, outputFile);
}

async function dumpElm(page, elm) {
  const timestamp = dayjs().format("YYYYMMDD_HHmmss");

  // 要素のスクリーンショットを取得
  const screen = `output/twitter_bookmarks_${ACC}_elm_${timestamp}.png`;
  await screenshotElement(elm, screen);

  // 要素のHTMLを取得
  const outputFile = `output/twitter_bookmarks_${ACC}_elm_${timestamp}.html`;
  await writeInnerHTML(page, elm, outputFile);
}

module.exports = {
  dump: dump,
  dumpElm: dumpElm
};
