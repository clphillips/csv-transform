var assert = require('assert');
var CsvTransform = require('../src/csv-transform');
var testInstance;

describe('CsvTransform', function() {

  beforeEach(function() {
    testInstance = new CsvTransform();
  });

  describe('#CsvTransform()', function() {
    it('should accept options and return an instance', function(done) {
      assert(true, new CsvTransform({}) instanceof CsvTransform);
      done();
    });
  });

  describe('#setInput()', function() {
    it('should accept a string as input', function(done) {
      testInstance.setInput('./path/to/file');
      done();
    });
  });

  describe('#setOutput()', function() {
    it('should accept a string as input', function(done) {
      testInstance.setOutput('./path/to/file');
      done();
    });
  });

  describe('#setTemplate()', function() {
    it('should accept a string as input', function(done) {
      testInstance.setTemplate('{{col1}} {{col2}}');
      done();
    });
  });

  describe('#run()', function() {
    var expected = ['1 A', '1 B', '2 A', '2 B'];
    var inputFile = './test/fixtures/input.csv';
    var template = '{{Column 2}} {{Column 1}}';

    it('should invoke callback with expected data', function(done) {
      var line = 0;
      testInstance.setInput(inputFile);
      testInstance.setTemplate(template);

      testInstance.run(function(err, data) {
        if (err) {
          return done(err);
        }
        assert.equal(expected[line], data);
        line++;

        if (line === expected.length) {
          return done();
        }
        return null;
      });
    });

    it('should trigger event with records read when completed', function(done) {
      testInstance.setInput(inputFile);
      testInstance.setTemplate(template);
      testInstance.on('finish', function(records) {
        assert.equal(expected.length, records);
        return done();
      });
      testInstance.run();

    });
  });
});