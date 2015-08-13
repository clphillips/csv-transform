;(function() {
  'use strict';

  var cli = require('cli');
  var CsvTransform = require('./csv-transform');
  var thisPackage = require('../package.json');

  cli.parse({
    template: [
      't',
      'The string to use to transform the input file (i.e. \'The {{col1}} brown {{col2}} jumped over the {{col3}} dog.\')',
      'string'
    ],
    input: [
      'i',
      'Path to the CSV input file.',
      'path'
    ],
    output: [
      'o',
      'Path to the output file.',
      'path'
    ],
    delimiter: [
      'd',
      'The column delimiter of the CSV input file.',
      'string'
    ],
    rowDelimiter: [
      'r',
      'The row delimiter of the CSV input file.',
      'string'
    ],
    quote: [
      'q',
      'The column quote character.',
      'char'
    ],
    escape: [
      'e',
      'The quote escape character.',
      'char'
    ],
    openTag: [
      'ot',
      'The open tag used in the template.',
      'string'
    ],
    closeTag: [
      'ct',
      'The close tag used in the template.',
      'string'
    ],
    version: [
      'v',
      'This version of csv-transform.'
    ]
  });

  cli.main(function(args, options) {
    if (options.version) {
      console.log(thisPackage.version);
      return;
    }

    var requiredOptions = {'template':'t'};
    for (var opt in requiredOptions) {
      if (!options[opt]) {
        cli.error('Expected -' + requiredOptions[opt] + ' or --' + opt + '. See --help for more info.');
        return;
      }
    };

    var csvOptions = ['delimiter', 'rowDelimiter', 'quote', 'escape'];
    options.csv = {};
    for (var opt in options) {
      if (csvOptions.indexOf(opt) >= 0) {
        options.csv.opt = options.opt;
      }
    }

    var transform = new CsvTransform(options);

    transform.run();
  });
})();
