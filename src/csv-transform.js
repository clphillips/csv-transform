;(function() {
  'use strict';

  var fs = require('fs');
  var csvParse = require('csv-parse');
  var util = require('util');
  var EventEmitter = require('events').EventEmitter;

  /**
   * Constructor
   *
   * @param options {object}
   * - csv {object}
   * -- delimiter {char}
   * -- rowDelimiter {char}
   * -- quote {char}
   * -- escape {char}
   * - input {string} Input file
   * - output {string} Output file
   * - template {string} Template to transform input into output
   * - openTag {string} The open tag for replacement
   * - closeTag {string} The close tag for replacement
   */
  function CsvTransform(options) {
    options = options || {};

    this.options = options.csv || {};
    this.input = options.input || null;
    this.output = options.output || null;
    this.template = options.template || null;
    this.openTag = options.openTag || '{{';
    this.closeTag = options.closeTag || '}}';

    EventEmitter.call(this);
  };

  util.inherits(CsvTransform, EventEmitter);

  /**
   * Set input file path
   *
   * @param input {string} The path to the input file
   */
  CsvTransform.prototype.setInput = function setInput(input) {
    this.input = input;
  };

  /**
   * Set output file path
   *
   * @param output {string} The path to the output file
   */
  CsvTransform.prototype.setOutput = function setOutput(output) {
    this.output = output;
  };

  /**
   * Set template string
   *
   * @param output {string} The template string
   */
  CsvTransform.prototype.setTemplate = function setTemplate(template) {
    this.template = template;
  };

  /**
   * Process the CSV transformation
   *
   * @param cb {function} The callback executed after each line is parsed. Deprecated since 1.1
   */
  CsvTransform.prototype.run = function run(cb) {
    var options = this.options;
    options.columns = true;

    var inputStream;
    var outputStream;

    if (this.input === null) {
      inputStream = process.stdin;
    } else {
      inputStream = fs.createReadStream(this.input);
    }

    if (this.output === null) {
      outputStream = process.stdout;
    } else {
      outputStream = fs.createWriteStream(this.output);
    }

    var _this = this;

    var parser = csvParse(options);
    var recordsRead = 0;
    parser.on('readable', function readable() {
      var record;
      while((record = parser.read())) {
        var result = _this.replace(_this.template, record);

        outputStream.write(result + '\n');

        if (typeof cb === 'function') {
          cb(null, result);
        }

        _this.emit('read', result, record);

        recordsRead++;
      };
    });
    parser.on('finish', function finishedReading() {
      _this.emit('finish', recordsRead);
    });
    parser.on('error', function error(err) {
      if (typeof cb === 'function') {
        cb(err);
      }
    });
    inputStream.pipe(parser);
  };

  /**
   * Replace place holders in template with the given data
   *
   * @param template {string} The template
   * @param data {object} The data to replace
   * @returns {string} The template with replacements made
   */
  CsvTransform.prototype.replace = function replace(template, data) {
    for (var field in data) {
      template = template.replace(this.openTag + field + this.closeTag, data[field]);
    }
    return template;
  };

  module.exports = CsvTransform;
})();
