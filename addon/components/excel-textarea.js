import TextArea from '@ember/component/text-area';
import { isEmpty } from '@ember/utils';
import { observer } from '@ember/object';

export default TextArea.extend({
  classNames: ['excel-textarea'],

  attrs: null,
  modelName: null,
  withHeaders: true,

  onTextChanged() {},

  valueObs: observer('value', function() {
    if (!isEmpty(this.get('value'))) {
      this.get('onTextChanged')(this.get('value'));
    }
  })
});
