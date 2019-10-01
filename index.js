const puppeteer = require("puppeteer");
const fs = require("fs");
const dayjs = require("dayjs");
require("dotenv").config();

const login = require("./modules/login");
const getTwitterBookmarks = require("./modules/getTwitterBookmarks");

async function exportBookmarkMain() {
  console.info("**** START EXPORT TWITTER BOOKMARKS");
  const account = process.env.TWITTER_ACCOUNT;
  let loop = 0; // ループ回数

  while (loop < 100) {
    console.info(`**** EXECUTE EXPORT TWITTER BOOKMARKS MAIN[${loop}]`);
    let browser = null;
    let page = null;
    try {
      // ブラウザの起動
      browser = await puppeteer.launch({ headless: false, slowMo: 10 });
      // browser = await puppeteer.launch();

      // ページの作成
      page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 1200 });

      // ログイン: ログインページに移動&認証
      await login(page);

      // ブックマークのエクスポート: ブックマークページに移動&ツイート上の取得
      const bookmarks = await getTwitterBookmarks(browser, page);
      console.log(`bookmarks size is ${bookmarks.length}`);

      // 取得した情報の書き出し
      const timestamp = dayjs().format("YYYYMMDD_HHmmss");
      const outputFile = `twitter_bookmarks_${account}_${timestamp}.json`;
      fs.writeFileSync(`output/${outputFile}`, JSON.stringify(bookmarks));

      // DELETE_MODEが無効の場合は、ループを抜ける(無限ループ抑止)
      if (process.env.DELETE_MODE !== "enable") break;
      // LOOP_MODEが無効の場合は、ループを抜ける
      if (process.env.LOOP_MODE !== "enable") break;

      // 削除がうまく行かず、ブックマークが残っている場合は、再実行する
      const remainArticles = await page.$$("article");
      if (!remainArticles || remainArticles.length < 1) break;
    } catch (error) {
      console.error(`Error: ${error}`, error);
    } finally {
      // ブラウザの停止
      if (!!browser) await browser.close();
    }
    loop += 1;
  }
  console.info("**** END   EXPORT TWITTER BOOKMARKS MAIN");
}

async function main() {
  const startTime = dayjs();

  await exportBookmarkMain();

  const endTime = dayjs();
  const diffTime = dayjs(endTime.diff(startTime)).subtract(9, "hour");
  const fmt = v => v.format("HH:mm:ss");
  console.info(`EXEC: ${fmt(startTime)} - ${fmt(endTime)} = ${fmt(diffTime)}`);
}

main().then();
