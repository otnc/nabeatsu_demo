# nabeatsu.js

数え続ける世界のナベアツbot ([@3_aho_bot](https://twitter.com/3_aho_bot)) に感化されたナベアツ判定・変換ライブラリです。

`npm install` で判定用・変換用の関数を利用可能になり、リポジトリをクローンすることでCLIを利用できます。

`./src/nabeatsu.ts` に判定関数 (`isNabeatsu`) と変換関数 (`convertIdiot`) があり、`./src/main.ts` はローカルで動かすためのデモです。

作者の実行環境: Windows 11 + Node.js v24.16.0 (nvm-windows)

デモ動画: https://twitter.com/rin_montblank/status/2076739400122466485

## Install

```bash
npm install nabeatsu.js
```

CommonJS / ESM のどちらからも利用できます。

```ts
import { isNabeatsu, convertIdiot } from "nabeatsu.js";

const n = 3;
const result = isNabeatsu(n); // { divisible: true, includes: true }

if (result.divisible || result.includes) {
  console.log(await convertIdiot(n, result)); // "ｻｧﾝwww!?"
}
```

```js
const { isNabeatsu, convertIdiot } = require("nabeatsu.js");
```

## Development

```bash
npm install
npm start          # デモを実行 (src/main.ts)
npm run build      # dist/ にライブラリをビルド (tsdown, cjs/esm)
npm run typecheck
npm run format
```

## License

本プロジェクトは [MIT License](./LICENSE) です。
