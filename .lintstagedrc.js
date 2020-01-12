module.exports = {
  '*.js': ['eslint --quiet --fix', 'prettier --write --plugin-search-dir=.', 'git add'],
};
