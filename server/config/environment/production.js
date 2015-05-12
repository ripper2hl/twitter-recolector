'use strict';

var urlMongoRemota = process.env.OPENSHIFT_MONGODB_DB_URL;

module.exports = {
  ip: process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_INTERNAL_IP || undefined,
  mongo: {
    uri: urlMongoRemota
  }
};
