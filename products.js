'use strict';

const DataModel = require('./memory.js');

class Products extends DataModel {
  constructor() {
    super();
    this.schema = {
      id: { required: true },
      name: { required: true },
      category_id: { required: false },
      price: { required: false, type: 'integer' },
      weight: { required: false, type: 'integer' },
      quantity_in_stock: { required: false, type: 'integer' },
    };
  }
}

module.exports = Products;


