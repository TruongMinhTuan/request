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
      user : 'pi',
      host : '10.93.98.2',
      ref  : 'origin/master',
      repo : 'https://github.com/TruongMinhTuan/request.git',
      path : '/home/pi/request',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
   
  }
};
