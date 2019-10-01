const fs = require("fs");

// innerTextの取得
exports.innerText = async elm => {
  return await elm.evaluate(node => node.innerText);
};

// textContentの取得
exports.textContent = async elm => {
  return await elm.evaluate(node => node.textContent);
};

// href属性値の取得
exports.href = async elm => {
  return await elm.evaluate(node => node.href);
};

// 背景色の設定
exports.setBackgroundColor = async (page, elm, color) => {
  await elm.evaluate((v, color) => (v.style.backgroundColor = color), color);
};

// スクロール: 1画面分
exports.scrollByPage = async page => {
  await page.evaluate(_ => window.scrollBy(0, window.innerHeight));
  await page.waitFor(1000);
};

// スクロール: 指定要素まで
exports.scrollElementTop = async (page, elm) => {
  await page.evaluate(
    elm => window.scrollBy(0, elm.getBoundingClientRect().top),
    elm
  );
  await page.waitFor(1000);
};

// スクリーンショットの書き出し: ページ全体
exports.screenshotFullPage = async (page, path) => {
  await page.screenshot({ path: path, fullPage: true });
};

// スクリーンショットの書き出し: 指定要素
exports.screenshotElement = async (elm, path) => {
  await elm.screenshot({ path: path });
};

// HTMLの書き出し: ページ全体
exports.writeHTML = async (page, path) => {
  const html = await page.content();
  fs.writeFileSync(path, html);
};

// HTMLの書き出し: 指定要素
exports.writeInnerHTML = async (page, elm, path) => {
  const html = await page.evaluate(elm => elm.innerHTML, elm);
  fs.writeFileSync(path, html);
};
