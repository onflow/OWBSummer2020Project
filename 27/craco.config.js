module.exports = {
  babel: {
    plugins: [
      [
        'babel-plugin-root-import',
        {
          rootPathPrefix: '~',
          rootPathSuffix: 'src',
        },
      ],
      '@babel/plugin-proposal-export-default-from',
    ],
  },
};