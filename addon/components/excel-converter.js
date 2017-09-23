import Component from '@ember/component';
import EmberObject from '@ember/object';
import layout from '../templates/components/excel-converter';
import { A } from '@ember/array';
import { camelize } from '@ember/string';

export default Component.extend({
  layout,

  classNames: ['excel-converter'],
  objects: null,

  success() {},
  failure() {},

  processText(text) {
    let lines = text.split(/\n/).filter(item => item.trim().length > 0);

    this.setAttrs(lines[0]);

    let objects = new A();

    for (let i = 1; i < lines.length; i++) {
      let object = new EmberObject();

      let values = lines[i]
        .split(/(\t+)/)
        .filter(item => item.trim().length > 0);

      for (let j = 0; j < values.length; j++) {
        let attr = this.get('attrs')[j];
        let value = values[j];
        object.set(`${attr}`, value);
      }

      objects.pushObject(object);
    }

    this.set('objects', objects);
    this.get('success')(objects);
  },

  setAttrs(headers) {
    let attrs = headers
      .split(/(\t+)/)
      .filter(item => item.trim().length > 0)
      .map(attr => camelize(attr));

    this.set('attrs', new A(attrs));
  },

  actions: {
    onTextChanged(text) {
      this.processText(text);
    }
  }
});
