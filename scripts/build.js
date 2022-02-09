#!/usr/bin/env node
'use strict';
var Path = require('path');

require('shelljs/global');
set('-e');

cp('-R', 'spec/openapi.yaml', 'web_deploy/openapi.yaml');

rm('-rf', 'web_deploy/swagger-ui-dist/');
cp('-R', Path.dirname(require.resolve('swagger-ui-dist')), 'web_deploy/swagger-ui-dist/');
cp('-R', Path.dirname(require.resolve('jquery'))+'/jquery.slim.js', 'web_deploy/swagger-ui-dist/jquery.slim.js');
cp('-R', Path.dirname(require.resolve('zero-md'))+'/index.js', 'web_deploy/swagger-ui-dist/zero-md.min.js');
