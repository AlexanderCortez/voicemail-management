export const getAction = (type, payload) => ({
  type,
  payload,
});

export const goTo = (history, route) => {
  if (history && history.push) {
    history.push(route);
  }
};
