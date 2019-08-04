'use strict';

const uuid = require('uuid/v4');
const fs = require('./__mocks__/fs.js');



class Model {

  constructor() {
    this.database = [];
  }

  get(id) {
    let response = id ? this.database.filter((record) => record.id === id) : this.database;
    console.log('response', response);
    return Promise.resolve(response);
  }

  create(entry) {
    console.log('entry :', entry);
    entry.id = uuid();
    console.log('entry.id :',entry.id);
    let record = this.sanitize(entry);//?
    console.log('record :', record);
    if (record.id) { this.database.push(record); }
    return Promise.resolve(record);
  }

  update(id, entry) {
    let record = this.sanitize(entry);
    if (record.id) { this.database = this.database.map((item) => (item.id === id) ? record : item); }
    return Promise.resolve(record);
  }

  delete(id) {
    this.database = this.database.filter((record) => record.id !== id);
    return Promise.resolve();
  }

  sanitize(entry) {

    let valid = true;
    let record = {};

    Object.keys(this.schema).forEach(field => {
      if (this.schema[field].required) {
        console.log('this.schema[field].required : ', this.schema[field].required);
        if (entry[field]) {
          // console.log('record[field] : ', record[field]);
          console.log('entry[field] : ', entry[field]);
          record[field] = entry[field];
        } else {
          console.log('valid',entry[field],valid);
          valid = false;
        }
      }
      else {
        record[field] = entry[field];
      }
    });

    return valid ? record : undefined;
  }

}

module.exports = Model;