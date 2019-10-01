const { setBackgroundColor, scrollElementTop } = require("./utils");
const toArticleData = require("./toArticleData");
const deleteBookmark = require("./deleteBookmark");

const tweetList = [];

module.exports = async (browser, page) => {
  console.info("**** START EXPORT TWITTER BOOKMARKS");
  const bookmarks = [];

  try {
    // ブックマークに移動
    const bookmarksURL = "https://twitter.com/i/bookmarks";
    await page.goto(bookmarksURL, { waitUntil: "networkidle2" });

    let index = 0; // ログに表示するようのただカウンタ

    while (true) {
      // ブックマークしたツイートのHTML要素の取得
      const articles = await page.$$("article");

      let addCount = 0;
      for (let i = 0; i < articles.length; i++) {
        const article = articles[i];
        console.info(`** EXECUTE toArticleData[${index}]`);

        // ツイートまでスクロール
        await scrollElementTop(page, article);
        await setBackgroundColor(page, article, "lemonchiffon");

        // articleから情報を取得
        const data = await toArticleData(browser, page, article);

        // 削除が失敗する場合もあるため、すでに処理済みかどうかを判定
        if (tweetList.indexOf(data.tweetURL) === -1) {
          bookmarks.push(data);
          tweetList.push(data.tweetURL);
          addCount += 1;
        } else {
          console.log(`already tweet; ${JSON.stringify(data.tweetURL)}`);
        }

        // DELETE_MODEが有効の場合は、ブックマークの削除処理を実行
        if (process.env.DELETE_MODE === "enable") {
          await deleteBookmark(browser, page, article);
        }
        index += 1;
      }

      // 新しく追加したブックマークが0の場合は、ループを抜ける
      if (addCount < 1) break;
    }
  } catch (error) {
    console.error(`** Error occuerred: ${error}`, error);
  }

  console.info("**** END   EXPORT TWITTER BOOKMARKS");
  return bookmarks;
};
