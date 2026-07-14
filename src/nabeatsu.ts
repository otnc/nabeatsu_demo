import { div, inc } from "./config.js";
import { number2kanji } from "@geolonia/japanese-numeral";
import KuroshiroPkg from "kuroshiro";
import KuromojiAnalyzerPkg from "kuroshiro-analyzer-kuromoji";
import jaconv from "jaconv";

const Kuroshiro = (KuroshiroPkg as any).default || KuroshiroPkg;
const KuromojiAnalyzer =
  (KuromojiAnalyzerPkg as any).default || KuromojiAnalyzerPkg;

const kuroshiro = new Kuroshiro();
let isInitialized = false;

async function initKuroshiro() {
  if (!isInitialized) {
    await kuroshiro.init(new KuromojiAnalyzer());
    isInitialized = true;
  }
}

export interface Nabeatsu {
  divisibleBy: boolean;
  includes: boolean;
}

export function isNabeatsu(n: number): Nabeatsu {
  const result: Nabeatsu = {
    divisibleBy: false,
    includes: false,
  };

  if (n % div === 0) {
    result.divisibleBy = true;
  }

  if (n.toString().includes(inc)) {
    result.includes = true;
  }

  return result;
}

export async function convertIdiot(
  n: number,
  options: Nabeatsu
): Promise<string> {
  await initKuroshiro();

  const kanji = number2kanji(n);

  let result = await kuroshiro.convert(kanji, {
    mode: "normal",
    to: "katakana",
  });

  result = result.replace(/ュウ/g, "ュー");

  result = result
    .replace(/サンヒャク/g, "サンビャク")
    .replace(/ロクヒャク/g, "ロッピャク")
    .replace(/ハチヒャク/g, "ハッピャク")

  result = result
    .replace(/サンセン/g, "サンゼン")
    .replace(/ハチセン/g, "ハッセン")

  result = result.replace(/サン$/, "サァン");

  result += "www";

  if (options.divisibleBy && options.includes) {
    result += "!?";
  }

  return jaconv.toHanKana(result);
}
