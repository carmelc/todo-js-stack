module.exports = context => {
  const config = context.config.load('carmel-ben-todo');
  return {
    config
  };
};
