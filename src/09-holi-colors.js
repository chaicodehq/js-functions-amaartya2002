/**
 * 🎨 Holi Color Mixer - Pure Functions
 *
 * Holi ka festival hai! Rang mix karne hain. Lekin PURE FUNCTIONS use
 * karne hain — matlab:
//   1. Input ko KABHI modify mat karo (no mutation)
 *   2. Same input pe HAMESHA same output aaye
 *   3. Koi side effects nahi (no console.log, no external state changes)
 *
 * Har color object: { name: string, r: number, g: number, b: number }
 *   where r, g, b are 0-255 (RGB values)
 *
 * Functions:
 *
 *   1. mixColors(color1, color2)
 *      - Mix two colors by averaging their RGB values
 *      - New name: `${color1.name}-${color2.name}`
 *      - Round RGB values to integers
 *      - MUST NOT modify color1 or color2
 *      - Agar either color null/invalid, return null
 *
 *   2. adjustBrightness(color, factor)
 *      - Multiply each RGB by factor, clamp to 0-255 range
 *      - Round to integers using Math.round
 *      - Name stays same
 *      - MUST NOT modify original color
 *      - Agar color null or factor not number, return null
 *
 *   3. addToPalette(palette, color)
 *      - Return NEW array with color added at end
 *      - MUST NOT modify original palette array
 *      - Agar palette not array, return [color]
 *      - Agar color null/invalid, return copy of palette
 *
 *   4. removeFromPalette(palette, colorName)
 *      - Return NEW array without the color with that name
 *      - MUST NOT modify original palette
 *      - Agar palette not array, return []
 *
 *   5. mergePalettes(palette1, palette2)
 *      - Merge two palettes into NEW array
 *      - No duplicate names (keep first occurrence)
 *      - MUST NOT modify either original palette
 *      - Agar either not array, treat as empty array
 *
 * Hint: Use spread operator [...arr], Object spread {...obj} to create
 *   copies. NEVER use push, splice, or direct property assignment on inputs.
 *
 * @example
 *   const red = { name: "red", r: 255, g: 0, b: 0 };
 *   const blue = { name: "blue", r: 0, g: 0, b: 255 };
 *   mixColors(red, blue)
 *   // => { name: "red-blue", r: 128, g: 0, b: 128 }
 *   // red and blue objects are UNCHANGED
 */
export function mixColors(color1, color2) {
  // Your code here
  if (!color1 || !color2 || !checkForColors(color1) || !checkForColors(color2)) return null

  const { name: name1, r: r1, g: g1, b: b1 } = color1
  const { name: name2, r: r2, g: g2, b: b2 } = color2

  const name = `${name1}-${name2}`
  const r = Math.round((r1 + r2) / 2)
  const g = Math.round((g1 + g2) / 2)
  const b = Math.round((b1 + b2) / 2)

  return {
    name,
    r,
    g, b
  }


}

function checkForColors(color) {

  if (!color || typeof color !== "object") return false

  const { name, r, g, b } = color

  return (
    typeof name === "string" && [r, g, b].every((c) => (typeof c === "number" && (c >= 0 && c <= 255)))
  )
}

export function adjustBrightness(color, factor) {
  // Your code here
  if (color === null || typeof color !== "object" || typeof factor !== "number") {
    return null
  }

  const { name, r, g, b } = color

  let factoredR = Math.round(r * factor)
  let factoredG = Math.round(g * factor)
  let factoredB = Math.round(b * factor)

  if (factoredR < 0) factoredR = 0
  else if (factoredR > 256) factoredR = 255

  if (factoredG < 0) factoredG = 0
  else if (factoredG > 256) factoredG = 255

  if (factoredB < 0) factoredB = 0
  else if (factoredB > 256) factoredB = 255

  return {
    name,
    r: factoredR,
    g: factoredG,
    b: factoredB
  }


}

export function addToPalette(palette, color) {
  // Your code here
  if (!Array.isArray(palette)) {
    return [color]
  } else if (color === null || typeof color !== "object") {
    return [...palette]
  }

  const paletteCopy = [...palette]

  paletteCopy.push(color)

  return paletteCopy


}

export function removeFromPalette(palette, colorName) {
  // Your code here
  if (!Array.isArray(palette)) return []

  return palette.reduce((acc, curr) => {
    if (curr.name !== colorName) {
      acc.push(curr)
    }
    return acc
  }, [])
}


export function mergePalettes(palette1, palette2) {
  if (!Array.isArray(palette1) || typeof palette1 !== "object") palette1 = []
  if (!Array.isArray(palette2) || typeof palette2 !== "object") palette2 = []


  return [...palette2].reduce((acc, curr) => {

    if (acc.filter((c) => c.name === curr.name).length === 0) {
      acc.push(curr)
    }

    return acc

  }, [...palette1])

}
