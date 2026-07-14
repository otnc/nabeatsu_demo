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

## API

### `isNabeatsu(n, options?)`

数値がナベアツ的に「アホになる」対象かどうかを判定します。

| 引数      | 型                | 必須 | 説明                                                                  |
| --------- | ----------------- | ---- | --------------------------------------------------------------------- |
| `n`       | `number`          | ✅   | 判定対象の数値                                                        |
| `options` | `NabeatsuOptions` | –    | 判定基準(割り切れる/含む)。省略時は `{ divisible: 3, includes: 3 }` |

`NabeatsuOptions`:

| プロパティ  | 型       | デフォルト | 説明                                                             |
| ----------- | -------- | ---------- | ---------------------------------------------------------------- |
| `divisible` | `number` | `3`        | この数値で割り切れる場合にアホになる                              |
| `includes`  | `number` | `3`        | 数値の文字列表現にこの数値の文字列表現が含まれる場合にアホになる  |

戻り値 `Nabeatsu`:

| プロパティ  | 型        | 説明                                                 |
| ----------- | --------- | ---------------------------------------------------- |
| `divisible` | `boolean` | `n % options.divisible === 0`                        |
| `includes`  | `boolean` | `n.toString().includes(options.includes.toString())` |

```ts
isNabeatsu(3); // { divisible: true, includes: true }
isNabeatsu(13); // { divisible: false, includes: true }
isNabeatsu(9, { divisible: 5, includes: 9 }); // { divisible: false, includes: true }
```

### `convertIdiot(n, s)`

数値を「アホになったときの読み方」(カタカナ)に変換します。内部で [kuroshiro](https://www.npmjs.com/package/kuroshiro) と [kuroshiro-analyzer-kuromoji](https://www.npmjs.com/package/kuroshiro-analyzer-kuromoji) を使って漢数字→カタカナ変換しているため、初回呼び出し時に辞書の読み込みが発生し多少時間がかかります(2回目以降は初期化済みのインスタンスを再利用します)。

| 引数 | 型         | 必須 | 説明                        |
| ---- | ---------- | ---- | --------------------------- |
| `n`  | `number`   | ✅   | 変換対象の数値              |
| `s`  | `Nabeatsu` | ✅   | `isNabeatsu()` の結果       |

戻り値: `Promise<string>` — 変換後の文字列(半角カナ)

`s.divisible` と `s.includes` が両方 `false` の場合は変換を行わず `n.toString()` をそのまま返します。どちらか一方でも `true` の場合のみ、以下の変換ルールが適用されます:

1. 数値を漢数字に変換し、カタカナ読みに変換
2. 「ュウ」→「ュー」
3. 「サンヒャク」→「サンビャク」、「ロクヒャク」→「ロッピャク」、「ハチヒャク」→「ハッピャク」
4. 「サンセン」→「サンゼン」、「ハチセン」→「ハッセン」
5. 「サン」→「サァン」(文字列中のすべての「サン」が対象)
6. 末尾に `www` を追加
7. `s.divisible && s.includes` が両方 `true` の場合、さらに `!?` を追加
8. 半角カナに変換して返す

```ts
await convertIdiot(3, isNabeatsu(3)); // "ｻｧﾝwww!?"
await convertIdiot(13, isNabeatsu(13)); // "ｼﾞｭｰｻｧﾝwww"
await convertIdiot(4, isNabeatsu(4)); // "4" (divisible/includesがどちらもfalseなので変換されない)
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
