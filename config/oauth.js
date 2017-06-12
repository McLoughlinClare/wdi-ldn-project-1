const fitbit = {
  loginUrl: 'https://www.fitbit.com/oauth2/authorize',
  accessTokenUrl: 'https://api.fitbit.com/oauth2/token',
  profileUrl: 'https://api.fitbit.com/1/user/-/profile.json',
  clientId: process.env.FITBIT_CLIENT_ID,
  clientSecret: process.env.FITBIT_CLIENT_SECRET,
  scope: 'activity heartrate location nutrition profile settings sleep social weight',
  getLoginUrl() {
    return `${this.loginUrl}?client_id=${this.clientId}&response_type=code&scope=${this.scope}`;
  },
  getAuthToken() {
    return new Buffer(`${this.clientId}:${this.clientSecret}`).toString('base64');
  }
};

module.exports = { fitbit };
