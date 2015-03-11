import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return this.store.find('rant');
  },

  // afterModel: function(model) {
  //   model.reload();
  // }

  // aftermodel: function(params) {
  //   return this.store.find('rant', params.rant_id);
  // }

});
