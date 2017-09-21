import Ember from 'ember';

const { Controller, inject: { service } } = Ember;

export default Controller.extend({
  store: service(),

  actions: {
    success(objects) {
      Ember.Logger.info(objects);

      for (var i = 0; i < objects.length; i++) {
        let object = objects[i];
        let record = this.get('store').createRecord('test');

        record.setProperties({
          a: object.get('a'),
          b: object.get('b'),
          c: object.get('c')
        });
      }
    }
  }
});
