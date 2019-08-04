'use strict';

const DataModel = require('./memory.js');

class Categories extends DataModel {
  constructor() {
    super();
    this.schema = {
      id: { required: true },
      name: { required: true },
      field: {required: false},
    };
  }
}

module.exports = Categories;
