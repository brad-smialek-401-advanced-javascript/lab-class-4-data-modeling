'use strict';

const DataModel = require('./file.js');

class Person extends DataModel {
  constructor() {
    super();
    this.schema = {
      id: { required: true },
      name: { required: true },
    };
  }
}

module.exports = Person;


// function called Categories
console.log(module.exports);