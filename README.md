# yurigraph

![demo ss](https://user-images.githubusercontent.com/18525488/80941278-0e19f780-8e1d-11ea-915b-838ed7db5ff9.png)

いろいろな作品のカップリングを可視化します

- [ImasGraph | アイドルマスターのカップリングを可視化](https://sititou70.github.io/imasgraph/)
- [DereGraph | アイドルマスターシンデレラガールズのカップリングを可視化](https://sititou70.github.io/deregraph/)
- [TouhouMap | 東方 Project のカップリングを可視化](https://sititou70.github.io/touhoumap/)
- [KancolleGraph | 艦隊これくしょんのカップリングを可視化](https://sititou70.github.io/kancollegraph/)
- [LoveliveMap | ラブライブ！シリーズのカップリングを可視化](https://sititou70.github.io/lovelivemap/)
- [VocaloMap | VOCALOID・VOICEROID のカップリングを可視化](https://sititou70.github.io/vocalomap/)
- [HetaGraph | Axis Powers ヘタリアのカップリングを可視化](https://sititou70.github.io/hetagraph/)

## 開発

### 依存

- Node.js v15.x.x
- npm v7.x.x

### セットアップ

```javascript
cd yurigraph
npm i
```

### 開発用サーバーを起動

```javascript
cd yurigraph
npm start [bangdream | deremas | hetaria | imas | vocalo | touhou | kancolle | lovelive]
```

### 対応作品を追加する

1. 作品のカップリングのリストを追加する必要があります．`yurigraph/scraping/target_couplings/[作品名]/index.json`にカップリングのリストを配置します．json の型やリストの作成方法に関しては，既存の作品のディレクトリを参照してください．
1. アプリの環境変数を設定する必要があります．`yurigraph/envs/`内に新しい作品の変数を設定するスクリプトを追加してください．詳しくは，`yurigraph/envs/`内にある他の作品のスクリプトを参照してください．

## 情報元

本アプリのカップリング情報は，[pixiv](https://www.pixiv.net/)のタグをもとに生成されています．

## ポリシー

本アプリに，他作品のコンテンツイメージを損なわせるような意図はありません．

本アプリは，[pixiv ガイドライン](https://www.pixiv.net/terms/?page=guideline)に準拠し，作品の収集等を行っていません．

pixiv からタグ情報を取得する際には，リクエストごとに 3000ms 以上のインターバルを設定しています．これにより，pixiv のサーバーへの極端な負荷を防止しています．

本アプリに問題がある場合は，本リポジトリの[issue](https://github.com/sititou70/yurigraph/issues)へご一報ください．

## License

MIT
