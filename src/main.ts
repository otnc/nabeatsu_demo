import { interval } from "./config.js";
import { isNabeatsu, convertIdiot, type Nabeatsu } from "./nabeatsu.js";

let i: number = 1;

function sleep(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

while (true) {
  const result: Nabeatsu = isNabeatsu(i);

  if (result.divisible || result.includesCount > 0) {
    const idiotText = await convertIdiot(i, result);
    console.log(`${idiotText} (${i})`);
  } else {
    console.log(i);
  }

  i++;
  await sleep(interval);
}
