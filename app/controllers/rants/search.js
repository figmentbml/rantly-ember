import Ember from "ember";

export default Ember.ArrayController.extend({

  queryParams: ['term'],
  term: null,

  results: function() {
    return this.store.find('rant', { find: this.get('term') });
  }.property('term')

});
