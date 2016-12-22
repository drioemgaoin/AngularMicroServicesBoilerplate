'use strict';

var through = require('through2');
var esprima = require('esprima');
var fs = require('fs');
var _ = require('lodash');

module.exports = function() {
  var angularConfigs = [];

  function compareTokens(a, b) {
    return a.type === b.type && (a.value ? a.value === b.value : true);
  }

  function find(ast, pathToFind) {
    var startIndex, endIndex, line;
    var values = [];

    _.each(ast.tokens, function(token, index) {
      if (!startIndex) {
          var matched = true;
          for (var j = 0; j < pathToFind.length; j++) {
              if (ast.tokens.length <= index + j || !compareTokens(pathToFind[j], ast.tokens[index + j])) {
                  matched = false;
                  break;
              }
          }

          if (matched) {
              line = index;
              startIndex = ast.tokens[index + pathToFind.length -1].range[1];
          }
      }

      if (startIndex && !endIndex && token.type === 'Punctuator' && token.value === ')') {
          endIndex = token.range[0];
      }

      if (startIndex && !endIndex && token.range[0] >= startIndex) {
          if (token.type === 'String') {
            values.push(token.value.substring(1, token.value.length -1));
          } else if (token.type === 'Identifier') {
            values.push(token.value);
          }
      }
    });

    return {
      line: line,
      values: values,
      startIndex: startIndex,
      endIndex: endIndex
    }
  }

  function parse(file, enc, cb) {

    var content = fs.readFileSync(file.path, 'utf8');
    var ast = esprima.parse(content, { tokens: true, range: true });

    var moduleResult = find(ast, [
      {type:'Identifier',value:'angular'},
      {type:'Punctuator',value:'.'},
      {type:'Identifier',value:'module'},
      {type:'Punctuator',value:'('},
      {type:'String'},
      {type:'Punctuator',value:','}
    ]);

    var configResult = find(ast, [
      {type:'Punctuator',value:'.'},
      {type:'Identifier',value:'config'},
      {type:'Punctuator',value:'('},
      {type:'Keyword',value:'function'},
      {type:'Punctuator',value:'('}
    ]);

    var item = {
      file: file,
      module: moduleResult,
      config: configResult,
      content: content
    };

    angularConfigs.push(item);
    cb();
  }

  function merge(cb) {

    var result = {};
    _.each(angularConfigs, function(content) {

      result.module = result.module || [];
      result.config = result.config || [];

      _.each(content.module.values, function(module) {
        if (result.module.indexOf(module) === -1) {
          result.module.push(module);
        }
      });

      _.each(content.config.values, function(config) {
        if (result.config.indexOf(config) === -1) {
          result.config.push(config);
        }
      });
    });

    if (result.config && result.module) {
      var source = angularConfigs[0];
      var result = source.content.substring(0, source.module.startIndex)
        + ' [' + result.module.map(function(x) { return "'" + x + "'" }).join(', ') + ']'
        + source.content.substring(source.module.endIndex, source.config.startIndex)
        + result.config.join(', ')
        + source.content.substring(source.config.endIndex) ;

      source.file.contents = new Buffer(result);
      this.push(source.file);
    }

    cb();
  }

  return through.obj(parse, merge);
};
