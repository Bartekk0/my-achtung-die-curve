function ensureVisibleColor(hex) {
  function adjust(c) {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }

  function getLuminance(hex) {
    let r = parseInt(hex.substring(1, 3), 16) / 255;
    let g = parseInt(hex.substring(3, 5), 16) / 255;
    let b = parseInt(hex.substring(5, 7), 16) / 255;

    return 0.2126 * adjust(r) + 0.7152 * adjust(g) + 0.0722 * adjust(b);
  }

  function lightenColor(hex, amount) {
    let r = Math.min(255, parseInt(hex.substring(1, 3), 16) + amount);
    let g = Math.min(255, parseInt(hex.substring(3, 5), 16) + amount);
    let b = Math.min(255, parseInt(hex.substring(5, 7), 16) + amount);

    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }

  let luminance = getLuminance(hex);
  let contrastRatio = (luminance + 0.05) / 0.05;

  while (contrastRatio < 2) {
    hex = lightenColor(hex, 5); // Increase brightness
    luminance = getLuminance(hex);
    contrastRatio = (luminance + 0.05) / 0.05;

    if (hex === "#ffffff") break; // Stop if it reaches white
  }

  return hex;
}

export default ensureVisibleColor;
