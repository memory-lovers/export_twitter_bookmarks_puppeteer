const expandTcoURL = require("./expandTcoURL");
const { innerText, textContent, href } = require("./utils");

module.exports = async (browser, page, article) => {
  console.info("** START toArticleData");

  // 初期化
  const articleData = {
    accountName: "",
    accountId: "",
    accountURL: "",
    tweetText: "",
    tweetURL: "",
    links: []
  };

  // ツイートしたユーザのアカウント名とTwitterIdを取得
  const account =
    "div > div:nth-of-type(2) > div:nth-of-type(2) > div:nth-of-type(1)";
  const accountName = await article.$(
    `${account} a > div:nth-of-type(1) > div:nth-of-type(1)`
  );
  const accountId = await article.$(
    `${account} a > div:nth-of-type(1) > div:nth-of-type(2)`
  );
  articleData.accountName = await innerText(accountName);
  articleData.accountId = await innerText(accountId);

  // ツイートの内容を取得s
  const tweetData = "div > div:nth-of-type(2) > div:nth-of-type(2)";
  const tweet = await article.$(`${tweetData} > div:nth-of-type(2)`);
  const tweetText = await innerText(tweet);
  articleData.tweetText = tweetText;

  // ツイートに含まれるリンク(<a>)をすべて取得
  const aTags = await article.$$(`${tweetData} a`);
  for (let i = 0; i < aTags.length; i++) {
    const aTag = aTags[i];
    const text = await textContent(aTag);
    const link = await href(aTag);
    if (link.indexOf("t.co") === -1) {
      // t.coを含まない場合、そのままのURLを取得
      articleData.links.push({ link: link, text: text });
    } else {
      // t.coを含む場合、短縮URLの遷移先を取得
      const expandedLink = await expandTcoURL(browser, link);
      articleData.links.push({ link: expandedLink, text: text });
    }
  }
  // <a>の1つ目はユーザのURL
  articleData.accountURL = articleData.links[0].link;
  // <a>の2つ目はツイートのURL
  articleData.tweetURL = articleData.links[1].link;
  articleData.links.splice(0, 2);

  console.info("** END   toArticleData");
  return articleData;
};
