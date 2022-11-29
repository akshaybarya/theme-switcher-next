export const toggleTheme = (primaryClr, secondaryClr, bgClr) => {
  const html = document.querySelector('html');

  if (primaryClr) {
    html.style.setProperty('--primaryClr', primaryClr);
  }

  if (secondaryClr) {
    html.style.setProperty('--secondaryClr', secondaryClr);
  }

  if (bgClr) {
    html.style.setProperty('--primaryBg', bgClr);
  }
};
