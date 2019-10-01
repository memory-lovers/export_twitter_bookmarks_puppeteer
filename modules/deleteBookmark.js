const { innerText, setBackgroundColor, scrollElementTop } = require("./utils");

/**
 * ブックマークの削除処理
 */
module.exports = async (browser, page, article) => {
  const waitTime = 1500; // 待ち時間

  try {
    console.info("** START DELETE BOOKMARK");

    // 削除対象までスクロール
    await scrollElementTop(page, article);

    // 「ツイートを共有」ボタンをクリック
    const button = await article.$("div[aria-label='ツイートを共有']");
    await page.evaluate(v => v.click(), button);
    await page.waitFor(waitTime); // すこし待つ

    // クリックするとメニューが出てくるので、取得
    const menuItems = await page.$$("div[role='menuitem']");

    // 非公開アカウントかどうかにより、メニューの数が変わるの処理を分ける
    if (menuItems.length === 3) {
      // 通常、メニューが3つあり、2つ目が削除ボタン
      const text = await innerText(menuItems[1]);
      console.log(`** click ${text}`);

      await setBackgroundColor(page, menuItems[1], "skyblue");
      await page.waitFor(waitTime);

      await menuItems[1].click();
      await page.waitFor(waitTime);

      console.warn(`* EXECUTE DELETE public BOOKMARK`);
    } else if (menuItems.length === 1) {
      // 非公開の場合は、削除ボタンのみ表示
      const text = await innerText(menuItems[0]);
      console.log(`** click ${text}`);

      await setBackgroundColor(page, menuItems[0], "skyblue");
      await page.waitFor(waitTime);

      await menuItems[0].click();
      await page.waitFor(waitTime);

      console.warn(`* EXECUTE DELETE privete BOOKMARK`);
    } else {
      console.warn(`** WARN in DELETE BOOKMARK: size is ${menuItems.length}`);
    }
    console.info("** END   DELETE BOOKMARK");
  } catch (error) {
    console.warn(`** ERROR in DELETE BOOKMARK: ${error}`, error);
  }
};
