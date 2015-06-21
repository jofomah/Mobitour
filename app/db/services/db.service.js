'use strict';

angular
    .module('db')
    .service('dbService', function (DBConfig, pouchDB, $window) {

      var _this = this;
      var DB_URL = DBConfig.DB_URL;

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
      
      var remote = pouchDB(DB_URL);

      _this.addTimeInfo = function (doc) {
        var now = new Date().toJSON();
        if (!doc.createdOn) {
          doc.createdOn = now;
        }
        doc.modifiedOn = now;
        return doc;
      };

      _this.get = function (id) {
        return remote.get(id);
      };

      _this.save = function (doc) {
        doc = _this.addTimeInfo(doc);
        if (doc._id) {
          return _this.update(doc)
              .catch(function () {
                var id = doc._id;
                delete doc._id;
                return remote.put(doc, id)
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
                return remote.put(doc, id)
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
        return remote.post(doc)
            .then(function (res) {
              doc._id = res.id;
              doc._rev = res.rev;
              return doc;
            });
      };

      _this.update = function (doc) {
        doc = _this.addTimeInfo(doc);
        return remote.get(doc._id)
            .then(function (res) {
              doc._rev = res._rev;
              return remote.put(doc, doc._id)
                  .then(function (res) {
                    doc._id = res.id;
                    doc._rev = res.rev;
                    return doc;
                  });
            });
      };

      _this.clear = function () {
        return remote.destroy();
      };

      _this.delete = function (doc) {
        return remote.get(doc._id)
            .then(remote.remove);
      };

      _this.batchCreate = function(docs){
        return remote.bulkDocs(docs);
      };

      _this.getView = function(view, options){
        return remote.query(view, options);

      };

      function pluck(response, property) {
        function get(row) {
          return row[property];
        }
        return response.rows.map(get);
      }

      _this.key = function(key) {
        return {
          startkey: key,
          endkey: key + '\ufff0'
        };
      };

      _this.pluckIDs = function(response) {
        return pluck(response, 'id');
      };

      _this.pluckValues = function(response) {
        return pluck(response, 'value');
      };

      _this.pluckDocs = function(response) {
        return pluck(response, 'doc');
      };

      _this.rejectIfEmpty = function(docs) {
        if (docs.length === 0) {
          return $q.reject({
            code: 404,
            msg: 'No document found'
          });
        }
        return docs;
      };


    });
