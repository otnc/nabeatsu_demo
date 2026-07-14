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

export interface NabeatsuOptions {
  divisible: number;
  includes: string;
}

export interface Nabeatsu {
  divisible: boolean;
  includes: boolean;
}

export function isNabeatsu(
  n: number,
  options: NabeatsuOptions = { divisible: div, includes: inc }
): Nabeatsu {
  const result: Nabeatsu = {
    divisible: n % options.divisible == 0,
    includes: n.toString().includes(options.includes),
  };

  return result;
}

export async function convertIdiot(
  n: number,
  s: Nabeatsu = { divisible: false, includes: false }
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
    .replace(/ハチヒャク/g, "ハッピャク");

  result = result
    .replace(/サンセン/g, "サンゼン")
    .replace(/ハチセン/g, "ハッセン");

  result = result.replace(/サン/g, "サァン");

  result += "www";

  if (s.divisible && s.includes) {
    result += "!?";
  }

  return jaconv.toHanKana(result);
}
