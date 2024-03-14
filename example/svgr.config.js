module.exports = {
  svgoConfig: {
    plugins: [
      {
        name: 'convertColors',
        params: {
          currentColor: true,
        },
      },
    ],
  },
};
