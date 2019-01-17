#!/usr/bin/env node
'use strict';
var Path = require('path');

require('shelljs/global');
set('-e');

rm('-rf', 'web_deploy/swagger-ui-dist/');
cp('-R', Path.dirname(require.resolve('swagger-ui-dist')), 'web_deploy/swagger-ui-dist/');
cp('-R', Path.dirname(require.resolve('jquery'))+'/jquery.slim.js', 'web_deploy/swagger-ui-dist/jquery.slim.js');
