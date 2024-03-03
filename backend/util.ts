import * as fs from 'fs';

export const generateRandomString = (length: number = 4): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
};

function* sequentialColorGenerator(): Generator<string, void, void> {
  // Function to generate a random number within a range
  function getRandomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Function to adjust the hue to ensure colors are not too similar
  function adjustHue(previousHue: number, minDifference: number): number {
    let newHue: number;
    do {
      newHue =
        (previousHue + getRandomInRange(minDifference, 360 - minDifference)) %
        360;
    } while (Math.abs(newHue - previousHue) < minDifference);
    return newHue;
  }

  // Convert HSL to HEX
  function hslToHex(h: number, s: number, l: number): string {
    h /= 360;
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
    const m = l - c / 2;

    let r, g, b;

    if (h < 1 / 6) {
      [r, g, b] = [c, x, 0];
    } else if (h < 2 / 6) {
      [r, g, b] = [x, c, 0];
    } else if (h < 3 / 6) {
      [r, g, b] = [0, c, x];
    } else if (h < 4 / 6) {
      [r, g, b] = [0, x, c];
    } else if (h < 5 / 6) {
      [r, g, b] = [x, 0, c];
    } else {
      [r, g, b] = [c, 0, x];
    }

    const red = Math.round((r + m) * 255);
    const green = Math.round((g + m) * 255);
    const blue = Math.round((b + m) * 255);

    // Convert RGB to HEX
    const hex = ((1 << 24) | (red << 16) | (green << 8) | blue)
      .toString(16)
      .slice(1);

    return `#${hex.toUpperCase()}`;
  }

  // Set a minimum hue difference between consecutive colors
  const minHueDifference = 30;

  let previousColor: { hue: number } | undefined;

  while (true) {
    // Generate random hue, saturation, and lightness values
    let hue: number;
    if (previousColor) {
      // Adjust the hue to ensure it's not too similar to the previous color
      hue = adjustHue(previousColor.hue, minHueDifference);
    } else {
      // Generate a random hue if there's no previous color
      hue = getRandomInRange(0, 360);
    }
    const saturation = getRandomInRange(40, 60); // Adjust as needed
    const lightness = getRandomInRange(40, 60); // Adjust as needed

    // Convert HSL to HEX
    const hexColor = hslToHex(hue, saturation, lightness);

    // Yield the generated color along with its hue for future reference
    yield hexColor;
    previousColor = { hue: hue };
  }
}

export const colorGenerator = sequentialColorGenerator();

const filePath = "words.txt";
const words = fs.readFileSync(filePath, 'utf8').split('\n');

export const getRandomWords = (n : number): string => {
  const indices: number[] = []

  for(let i = 0; i < n; i++){
    indices.push(Math.floor(Math.random() * words.length));
  }

  return indices.map(ind => words[ind]).join(" ");
}