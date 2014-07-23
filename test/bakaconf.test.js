var assert = require('power-assert');
var bakaconf = require("../");

var path = require('path');
var fs = require('fs');

var value = { ok: true, number: 42 };
var data  = JSON.stringify(value);
var home = process.env.HOME || process.env.USERPROFILE;


describe('Bakaconf', function() {
    var name = "example1";

    describe('default', function () {
        var filename = path.join(home, ".config/bakaconf", name + ".json");
        var conf;

        before(function(done) {
            conf = bakaconf();
            conf.write(name, value, done);
        });

        after(function () {
            if (fs.existsSync(filename)) {
                fs.unlinkSync(filename);
            }
            fs.rmdirSync(path.dirname(filename));
        });

        it('should write a value to ' + filename, function(){
            assert.ok(fs.existsSync(filename));
        });

        it('should read a value from ' + filename, function(done){
            conf.read(name, function (err, result) {
                assert(result.ok === value.ok);
                assert(result.number === value.number);
                done(err);
            });
        });

        it('should remove a config and unlink ' + filename, function(done){
            conf.remove(name, function (err) {
                assert(fs.existsSync(filename) === false);
                done(err);
            });
        });
    });


    describe('with namespace', function () {
        var namespace = "my_namespace";
        var filename = path.join(home, ".config", namespace, name + ".json");
        var conf;

        before(function(done) {
            conf = bakaconf({ namespace: namespace });
            conf.write(name, value, done);
        });

        after(function () {
            if (fs.existsSync(filename)) {
                fs.unlinkSync(filename);
            }
            fs.rmdirSync(path.dirname(filename));
        });

        it('should write a value to ' + filename, function(){
            assert.ok(fs.existsSync(filename));
        });

        it('should read a value from ' + filename, function(done){
            conf.read(name, function (err, result) {
                assert(result.ok === value.ok);
                assert(result.number === value.number);
                done(err);
            });
        });

        it('should remove a config and unlink ' + filename, function(done){
            conf.remove(name, function (err) {
                assert(fs.existsSync(filename) === false);
                done(err);
            });
        });
    });


    describe('with configDir', function () {
        var configDir = path.join(__dirname, "configDir1");
        var filename = path.join(configDir, "bakaconf", name + ".json");
        var conf;

        before(function(done) {
            conf = bakaconf({ configDir: configDir });
            conf.write(name, value, done);
        });

        after(function () {
            if (fs.existsSync(filename)) {
                fs.unlinkSync(filename);
            }
            fs.rmdirSync(path.dirname(filename));
            fs.rmdirSync(configDir);
        });

        it('should write a value to ' + filename, function(){
            assert.ok(fs.existsSync(filename));
        });

        it('should read a value from ' + filename, function(done){
            conf.read(name, function (err, result) {
                assert(result.ok === value.ok);
                assert(result.number === value.number);
                done(err);
            });
        });

        it('should remove a config and unlink ' + filename, function(done){
            conf.remove(name, function (err) {
                assert(fs.existsSync(filename) === false);
                done(err);
            });
        });
    });

    describe('with configDir and namespace', function () {
        var configDir = path.join(__dirname, "configDir2");
        var namespace = "my_namespace2";
        var filename = path.join(configDir, namespace, name + ".json");
        var conf;

        before(function(done) {
            conf = bakaconf({ configDir: configDir, namespace: namespace });
            conf.write(name, value, done);
        });

        after(function () {
            if (fs.existsSync(filename)) {
                fs.unlinkSync(filename);
            }
            fs.rmdirSync(path.dirname(filename));
            fs.rmdirSync(configDir);
        });

        it('should write a value to ' + filename, function(){
            assert.ok(fs.existsSync(filename));
        });

        it('should read a value from ' + filename, function(done){
            conf.read(name, function (err, result) {
                assert(result.ok === value.ok);
                assert(result.number === value.number);
                done(err);
            });
        });

        it('should remove a config and unlink ' + filename, function(done){
            conf.remove(name, function (err) {
                assert(fs.existsSync(filename) === false);
                done(err);
            });
        });
    });
});