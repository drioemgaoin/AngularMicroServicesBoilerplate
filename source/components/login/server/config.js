module.exports = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/authenticationdb',
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'YOUR_UNIQUE_JWT_TOKEN_SECRET',

  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || '90e228c3078e2f236ece40332212f8c9',
  GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'ANrJc8cAIi5ANcyEEJN_6cLq'
};
