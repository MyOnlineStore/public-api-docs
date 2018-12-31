#!/usr/bin/env node
'use strict';
var Path = require('path');

require('shelljs/global');
set('-e');

var SWAGGER_UI_DIST = Path.dirname(require.resolve('swagger-ui'));
rm('-rf', 'web_deploy/swagger-ui/');
cp('-R', SWAGGER_UI_DIST, 'web_deploy/swagger-ui/');
sed('-i', 'http://petstore.swagger.io/v2/swagger.json', '../openapi.json', 'web_deploy/swagger-ui/index.html');
