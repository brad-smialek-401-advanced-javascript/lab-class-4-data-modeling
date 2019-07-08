const Products = require('../person.js');

describe('Person Model', () => {

  let person;

  beforeEach(() => {
    person = new Person();
  });

  // How might we repeat this to check on types?
  it('sanitize() returns undefined with missing requirements', () => {
    const schema = person.schema;
    var testRecord = {};
    for (var field in schema) {
      if (schema[field].required) {
        testRecord[field] = null;
      }
    }
    expect(person.sanitize(testRecord)).toBeUndefined();
  });

  it('can post() a new product', () => {
    let obj = { name: 'Test Product' };
    return person.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('can get() a product', () => {
    let obj = { name: 'Test Product' };
    return person.create(obj)
      .then(record => {
        return person.get(record._id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(category[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

});