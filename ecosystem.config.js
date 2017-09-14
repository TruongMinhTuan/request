module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'server',
      script    : 'server.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      watch       : 'true',
      env_production : {
        NODE_ENV: 'production'
      }
    },

    // Second application
    // {
    //   name      : 'WEB',
    //   script    : 'web.js'
    // }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'server',
      host : 'http://12d3b3f3.ngrok.io',
      ref  : 'origin/master',
      repo : 'git@github.com:TruongMinhTuan/request.git',
      path : 'C:/Users/Phuong/Desktop/request',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
   
  }
};
