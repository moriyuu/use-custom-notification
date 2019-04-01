export const genId = () => {
  return (
    new Date().getTime().toString(16) +
    Math.floor(Math.random() * 1000).toString(16)
  );
};
