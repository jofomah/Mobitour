'use strict';

angular
    .module('db')
    .service('dbService', function (DBConfig, pouchDB, $window) {

      var _this = this;

      var defaultOpt = {
        /*eslint-disable camelcase */
        /*jshint camelcase:false */
        auto_compaction: true
        /*eslint-enable camelcase */
      };

      function hasWebSQL() {
        return $window.openDatabase;
      }

      function create(dbName, opt) {
        var options = opt || defaultOpt;

        if (hasWebSQL()) {
          options.adapter = 'websql';
        } else {
          options.adapter = 'idb';
        }
        return pouchDB(dbName, options);
      }

      var local = create(DBConfig.DB_NAME);

      _this.addTimeInfo = function (doc) {
        var now = new Date().toJSON();
        if (!doc.createdOn) {
          doc.createdOn = now;
        }
        doc.modifiedOn = now;
        return doc;
      };

      _this.get = function (id) {
        return local.get(id);
      };

      _this.save = function (doc) {
        doc = _this.addTimeInfo(doc);
        if (doc._id) {
          return _this.update(doc)
              .catch(function () {
                var id = doc._id;
                delete doc._id;
                return local.put(doc, id)
                    .then(function (res) {
                      doc._id = res.id;
                      doc._rev = res.rev;
                      return doc;
                    });
              });
        } else {
          return _this.insert(doc);
        }
      };

      _this.save = function (doc) {
        doc = _this.addTimeInfo(doc);
        if (doc._id) {
          return _this.update(doc)
              .catch(function () {
                var id = doc._id;
                delete doc._id;
                return local.put(doc, id)
                    .then(function (res) {
                      doc._id = res.id;
                      doc._rev = res.rev;
                      return doc;
                    });
              });
        } else {
          return _this.insert(doc);
        }
      };

      _this.insert = function (doc) {
        doc = _this.addTimeInfo(doc);
        return local.post(doc)
            .then(function (res) {
              doc._id = res.id;
              doc._rev = res.rev;
              return doc;
            });
      };

      _this.update = function (doc) {
        doc = _this.addTimeInfo(doc);
        return local.get(doc._id)
            .then(function (res) {
              doc._rev = res._rev;
              return local.put(doc, doc._id)
                  .then(function (res) {
                    doc._id = res.id;
                    doc._rev = res.rev;
                    return doc;
                  });
            });
      };

      _this.clear = function () {
        return local.destroy();
      };

      _this.delete = function (doc) {
        return local.get(doc._id)
            .then(local.remove);
      };

    });
