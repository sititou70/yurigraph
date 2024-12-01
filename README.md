# yurigraph

いろいろな作品のカップリングを可視化します

![グラフのデモ画像。アイドルマスターシンデレラガールズのもの](https://user-images.githubusercontent.com/18525488/80941278-0e19f780-8e1d-11ea-915b-838ed7db5ff9.png)

## 対応作品

- [アイドルマスター](https://sititou70.github.io/imasgraph/)
- [アイドルマスターシンデレラガールズ](https://sititou70.github.io/deregraph/)
- [東方 Project](https://sititou70.github.io/touhoumap/)
- [艦隊これくしょん](https://sititou70.github.io/kancollegraph/)
- [ラブライブ！シリーズ](https://sititou70.github.io/lovelivemap/)
- [VOCALOID・VOICEROID](https://sititou70.github.io/vocalomap/)
- [Axis Powers ヘタリア](https://sititou70.github.io/hetagraph/)
- [BanG Dream!](https://sititou70.github.io/bangdreamgraph/)
- [東京卍リベンジャーズ](https://sititou70.github.io/revengersmgraph/)
- [ぼっち・ざ・ろっく！](https://sititou70.github.io/btrmap/)
- [ウマ娘 プリティーダービー](https://sititou70.github.io/umamusumegraph/)

## 開発

### 依存

- Node.js v18.12.1
- npm v8.19.2

### セットアップ

```javascript
cd yurigraph
npm i
```

### 開発用サーバーを起動

```javascript
cd yurigraph
npm start [revengers | touhou | bangdream | lovelive | vocalo | kancolle | deremas | imas | hetalia | btr | umamusume]
```

### 対応作品を追加する

1. 作品のカップリングのリストを追加する必要があります．`yurigraph/scraping/target_couplings/[作品名]/index.json`にカップリングのリストを配置します．json の型やリストの作成方法に関しては，既存の作品のディレクトリを参照してください．
1. アプリの環境変数を設定する必要があります．`yurigraph/envs/`内に新しい作品の変数を設定するスクリプトを追加してください．詳しくは，`yurigraph/envs/`内にある他の作品のスクリプトを参照してください．

## 情報元

本アプリのカップリング情報は，[pixiv](https://www.pixiv.net/)のタグをもとに生成されています．

## ポリシー

本アプリに，他作品のコンテンツイメージを損なわせるような意図はありません．

本アプリは，[pixiv ガイドライン](https://www.pixiv.net/terms/?page=guideline)に準拠し，作品の収集等を行っていません．

pixiv からタグ情報を取得する際には，リクエストごとに10秒以上のインターバルを設定しています．これにより，pixiv のサーバーへの極端な負荷を防止しています．

本アプリに問題がある場合は，本リポジトリの[issue](https://github.com/sititou70/yurigraph/issues)へご一報ください．

## Contributors ✨

<table>
  <tr>
    <td align="center"><a href="https://github.com/defaultcf"><img src="https://avatars.githubusercontent.com/u/15726229?v=3?s=100" width="100px;" alt=""/><br /><sub><b>defaultcf</b></sub>
    <td align="center"><a href="https://github.com/KobayashiTakaki"><img src="https://avatars.githubusercontent.com/u/18331592?v=3?s=100" width="100px;" alt=""/><br /><sub><b>KobayashiTakaki</b></sub>
  </tr>
</table>

## License

MIT

## さらに読む

本アプリを開発した経緯等に関しては以下の記事もご覧ください

[百合オタクの脳内を可視化する，その名も yurigraph](https://sititou70.github.io/%E7%99%BE%E5%90%88%E3%82%AA%E3%82%BF%E3%82%AF%E3%81%AE%E8%84%B3%E5%86%85%E3%82%92%E5%8F%AF%E8%A6%96%E5%8C%96%E3%81%99%E3%82%8B%EF%BC%8C%E3%81%9D%E3%81%AE%E5%90%8D%E3%82%82yurigraph/)
