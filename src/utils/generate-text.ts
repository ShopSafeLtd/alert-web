function processText(text: string) {
  const result = {
    text1: '',
    text2: '',
    noPages: 2,
  };

  if (text.length <= 4644) {
    result.text1 = text;
    result.noPages = 2;
  } else {
    result.text1 = text.slice(0, 4644);
    result.text2 = text.slice(4644);
    result.noPages = 3;
  }

  return result;
}

export default processText;
