var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

var home = process.env.HOME || process.env.USERPROFILE;

module.exports = function (options) {
    if (!options) options = {};

    var namespace = options.namespace || "bakaconf";
    var configDir = options.configDir || path.join(home, '.config');
    var storeDir = path.join(configDir, namespace);

    function createPath (name) {
        return path.join(storeDir, name + ".json");
    }

    return {
        write: function (name, value, callback) {
            var filename = createPath(name);

            mkdirp(path.dirname(filename), function (err) {
                if (err) {
                    callback(err);
                } else {
                    fs.writeFile(filename, JSON.stringify(value), callback);
                }
            });
        },

        read: function (name, callback) {
            fs.readFile(createPath(name), function (err, data) {
                if (err) return callback(err);

                try {
                    var value = JSON.parse(data + "");
                    return callback(null, value);
                } catch (e) {
                    return callback(e);
                }
            });
        },

        remove: function (name, callback) {
            fs.unlink(createPath(name), callback);
        }
    };
};
