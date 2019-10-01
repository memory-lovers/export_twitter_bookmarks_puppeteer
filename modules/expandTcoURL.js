/**
 * t.coの展開処理
 */

const urlCache = {};

module.exports = async (browser, url) => {
  // すでに変換済みのURLの場合は、キャッシュの値を返却
  if (url in urlCache) return urlCache[url];

  // 新しいページを作成
  const page = await browser.newPage();
  try {
    // t.coのURLを開く
    await page.goto(url, { waitUntil: "domcontentloaded" });
    // 現在のページのURLを取得
    const expandedURL = await page.evaluate(_ => location.origin);

    console.log(`expandTcoURL: ${url} => ${expandedURL}`);
    urlCache[url] = expandedURL;
    return expandedURL;
  } catch (error) {
    // エラーが発生した場合は、t.coのURLを返す
    console.error(`Error in expandTcoURL: url=${url}: ${error}`, error);
    return url;
  } finally {
    if (!!page) page.close();
  }
};
