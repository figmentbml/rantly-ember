import Ember from 'ember';

export default Ember.Route.extend({

  setupController: function(controller, model) {
    controller.set('model', model);
  },

  aftermodel: function(params) {
    return this.store.find('rant', params.rant_id);
  }

});
