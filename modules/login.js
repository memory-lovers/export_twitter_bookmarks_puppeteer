/**
 * ログイン処理
 */
async function login(page) {
  console.info("**** START LOGIN");

  // dotenvからアカウント情報の取得
  const account = process.env.TWITTER_ACCOUNT;
  const password = process.env.TWITTER_PASSWORD;

  // 指定したURLへ移動: waitを設定
  await page.goto("https://twitter.com/", { waitUntil: "networkidle2" });
  await page.waitForSelector(`.LoginForm > .LoginForm-username > .text-input`);

  // アカウントとパスワード入力
  await page.type(`.LoginForm > .LoginForm-username > .text-input`, account);
  await page.type(`.LoginForm > .LoginForm-password > .text-input`, password);

  // ログインボタンを押して、ページ遷移するまで待つ
  const navigationPromise = page.waitForNavigation();
  await page.click(` .LoginForm > .EdgeButton`);
  await navigationPromise;

  console.info("**** END   LOGIN");
}

module.exports = login;
