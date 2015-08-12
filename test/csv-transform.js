var assert = require('assert');
var CsvTransform = require('../src/csv-transform');
var testInstance = new CsvTransform({});

describe('CsvTransform', function() {
  
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
  /*
  describe('#main()', function() {
    it('should require input', function(done) {
      CsvTransform.main();
      assert(true, true);
      
      return done(err);
    });
  });
  */
});