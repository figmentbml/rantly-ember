import Ember from "ember";

export default Ember.ArrayController.extend({

  actions: {

    queryRants: function() {
      var query = this.get('search');
      this.store.find('rant', {find: query}).then(function(result) {
        this.set('model', result);
      }.bind(this));
      this.transitionToRoute('rants.search', { queryParams: {term: query} });
    }
  }
});
