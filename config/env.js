const environments = {
  dev: {
    WebUrl: 'https://hesap.com'
  }
};

const currentEnv = process.env.ENV || 'dev';

module.exports = environments[currentEnv];