const parseIdentifier = (text = '') => {
  if (text.indexOf('@')) {
    const [parsedText] = text.split('@');
    return parsedText;
  }
  return text;
};

const humanizeDuration = (duration = 0) => {
  const date = new Date(0);
  date.setSeconds(duration);
  const timeString = date.toISOString().substr(11, 8);
  return timeString;
};

export {
  parseIdentifier,
  humanizeDuration,
};
