import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  a: attr(),
  b: attr(),
  c: attr()
});
