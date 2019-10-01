# Twitter Bookmark Export Tool using Puppeteer

Twitter Bookmark Export Tool using [Puppeteer](https://github.com/GoogleChrome/puppeteer)

## About

Twitter ブックマークでブックマークしたツイートを JSON ファイルにエクスポートするツール

![DEMO](https://github.com/memory-lovers/export_twitter_bookmarks_puppeteer/blob/master/img/demo_export_bookmarks.gif)

## How to use

### Install

```bash
$ npm install
```

### Setup

`env_sample`を`.env`にコピーし、  
`TWITTER_ACCOUNT`と`TWITTER_PASSWORD`にログイン情報を記載。

```
# Copy this file with file name '.env' and set your login info.
TWITTER_ACCOUNT=YOUR_TWITTER_ACCOUNT
TWITTER_PASSWORD=YOUR_TWITTER_PASSWORD

### DELETE_MODE: "enable" or "disable"
DELETE_MODE=disable

### LOOP_MODE: "enable" or "disable"
LOOP_MODE=disable
```

オプションとして、`DELETE_MODE`と`LOOP_MODE`を用意。

- **DELETE_MODE**
  - ブックマークを削除するかどうかの設定
- **LOOP_MODE**
  - ブックマークが残っている場合に、くり返しブラウザの立ち上げかどうかの設定
  - DELETE_MODE が enable のときにのみ有効
  - 異常終了した場合に、リトライしたい場合に有効にする

### Execute

以下のコマンドで実行できる。

```bash
$ npm run main
```

実行すると、`output/`配下にファイルを出力する。  
また、`log`にログファイルも出力する。

## 確認環境

以下の環境で確認しています。(2019/10/01 時点)

- maxOS: 10.14.6(Mojave)
- Node.js: 11.9.0
- puppeteer: 1.20.0

## 注意事項

- headless で実行しません。（headless の場合、削除できない場合があるため)
- 上記の環境のみでしか確認してません。
- 自動削除は、失敗することがあります(ブラウザ上でも正常に削除されない場合がある)
- Twitter 自体にエラーが発生した場合の対処はしていません。
  - LOOP_MODE を有効にするなど、すべてエクスポートできるまでくり返し実行ください。

## Author

Memory Lovers ([GitHub](https://github.com/memory-lovers) / [WebSite](https://memory-lovers.com/) / [Twitter](https://twitter.com/MemoryLoverz))
kira_puka ([Twitter](https://twitter.com/kira_puka))

## License

[MIT](https://github.com/memory-lovers/export_twitter_bookmarks_puppeteer/blob/master/LICENCE)
