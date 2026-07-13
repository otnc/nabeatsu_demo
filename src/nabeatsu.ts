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
  divisibleBy3: boolean;
  includes3: boolean;
}

export function isNabeatsu(n: number): Nabeatsu {
  const result: Nabeatsu = {
    divisibleBy3: false,
    includes3: false,
  };

  if (n % 3 === 0) {
    result.divisibleBy3 = true;
  }

  if (n.toString().includes("3")) {
    result.includes3 = true;
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

  result = result.replace(/サン$/, "サァン");

  result += "www";

  if (options.divisibleBy3 && options.includes3) {
    result += "!?";
  }

  return jaconv.toHanKana(result);
}
