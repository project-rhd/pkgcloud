/*
 * index.js: Openstack cinder (blockstorage) client
 *
 * (C) 2014 Rackspace
 *      Ken Perkins
 * MIT LICENSE
 *
 */

var util = require('util'),
    urlJoin = require('url-join'),
    openstack = require('../../client'),
    _ = require('underscore');

var Client = exports.Client = function (options) {
  openstack.Client.call(this, options);

  _.extend(this, require('./volumetypes'));
  _.extend(this, require('./snapshots'));
  _.extend(this, require('./volumes'));

  this.serviceType = 'volume';
};

util.inherits(Client, openstack.Client);

Client.prototype._getUrl = function (options) {
  options = options || {};
  let serviceUrl_v2 = this._serviceUrl.replace('v1/', 'v2/');
  return urlJoin(serviceUrl_v2,
    typeof options === 'string'
      ? options
      : options.path);

};
