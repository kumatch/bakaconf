bakaconf
===========

A junky configuration store.


Install
--------

    $ npm install bakaconf


Example
--------

```javascript
var bakaconf = require("bakaconf");

var conf = bakaconf({ namespace: "myapp" });

conf.write("samples", { string: "foobar", number: 42 }, function (err) {
    conf.read("samples", function (err, value) {
        // value = { string: "foobar", number: 42 }
    });
});
```

This case will be written a JSON value to file `$HOME/.config/myapp/samples.json`.


Methods
-------

=== var conf = bakaconf(options)

Create bakaconf instance.

options:

* configDir: a stored configuration directory (default: $HOME/.config)
* namespace: configuration namespace (default: bakaconf)


=== conf.write(name, value, callback)

Write a configuration value by name.


=== conf.read(name, callback)

Read a configuration value by name. The callback will be given two arguments `(err, value)`.

=== conf.remove(name, callback)

Remove a configuration value by name.




License
--------

Licensed under the MIT License.

Copyright (c) 2014 Yosuke Kumakura

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
