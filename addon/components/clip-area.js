import Ember from 'ember';
import layout from '../templates/components/clip-area';

const { Component, observer, A, String: { camelize }, isEmpty } = Ember;

export default Component.extend({
  layout,

  tagName: '',

  attrs: null,
  modelName: null,
  withHeaders: true,

  onProcessSuccess() {},
  onProcessFailure() {},

  processText() {
    let withHeaders = this.get('withHeaders');

    let lines = this.get('text')
      .split(/\n/)
      .filter(item => item.trim().length > 0);

    if (withHeaders) {
      this.setAttrs(lines[0]);

      let objects = new A();

      for (let i = 1; i < lines.length; i++) {
        let object = new Ember.Object();

        let values = lines[i]
          .split(/(\s+)/)
          .filter(item => item.trim().length > 0);

        for (let j = 0; j < values.length; j++) {
          let attr = this.get('attrs')[j];
          let value = values[j];
          object.set(`${attr}`, value);
        }

        objects.pushObject(object);
      }

      this.get('onProcessSuccess')(objects);
    }
  },

  setAttrs(headers) {
    let attrs = headers
      .split(/(\s+)/)
      .filter(item => item.trim().length > 0)
      .map(attr => camelize(attr));

    this.set('attrs', new A(attrs));
  },

  textObserver: observer('text', function() {
    let text = this.get('text');
    if (!isEmpty(text)) {
      this.processText();
    }
  })
});
