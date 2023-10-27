export const stringToColor = (str: string): string => {
  let hash = 0

  if (str.length === 0) return 'transparent'
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
    hash &= hash
  }
  const rgb = [0, 0, 0]

  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 255

    rgb[i] = value
  }

  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
}
