import Ember from "ember";

export default Ember.ArrayController.extend({

  isEditing: false,

  actions: {

    editRant: function(rant) {
      this.set('isEditing', true);
    }
  }
});
