const Products = require('../products.js');

describe('Products Model', () => {

  let products;

  beforeEach(() => {
    products = new Products();
    console.log('products :',products);
  });

  // How might we repeat this to check on types?
  it('sanitize() returns undefined with missing requirements', () => {
    const schema = products.schema;
    console.log('schema = products.schema :', schema);
    var testRecord = {};
    for (var field in schema) {
      console.log('field :', field);
      if (schema[field].required) {
        console.log('schema[field].required :', schema[field].required);
        testRecord[field] = null;
        console.log('testRecord :', testRecord);
      }
    }
    console.log('products.sanitize(testRecord) :',products.sanitize(testRecord));
    expect(products.sanitize(testRecord)).toBeUndefined();
  });

  it('can post() a new product', () => {
    let obj = { name: 'Test Product', category_id: 'cars', price: 30, weight:50, quantity_in_stock: 90};
    return products.create(obj)
      .then(record => {
        console.log('record :', record);
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('can get() a product', () => {
    let obj = { name: 'Test Product', category_id: 'cars', price: 30, weight:50, quantity_in_stock: 90};
    return products.create(obj)
      .then(record => {
        return products.get(record._id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(category[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can delete() a product', () => {
    let obj = { name: 'Test Product', category_id: 'cars', price: 30, weight:50, quantity_in_stock: 90};
    products.create(obj)
      .then(record => {
        return products.delete(record._id)
          .then(products => {
            expect(products.get(record._id).name).toBeFalsy();
          });
      })
      .catch(err => console.error);
  });

  it('can update a product', () => {
    let obj = { name: 'Test Product', zoo: true };
    products.create(obj)
      .then(record => {
        products.update(record.id, { name: 'New Test Product', id: 55 })
          .then(products => {
            products.get(55)
              .then(zz => {
                expect(zz.name).toEqual('New Test Product');
              }).catch(err => console.error);
          });
      })
      .catch(err => console.error);
  });

  it('rejects bad type checks', () => {
    let obj = { name: 555 };
    products.create(obj)
      .then(record => {
        expect(record.id).toBeUndefined();
      })
      .catch(err => console.error);
  });

});