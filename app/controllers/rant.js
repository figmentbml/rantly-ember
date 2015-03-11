import Ember from "ember";

export default Ember.ObjectController.extend({

  isEditing: false,

  actions: {

    editRant: function(rant) {
      this.set('isEditing', true);
    },
    cancelRant: function(rant) {
      this.set('isEditing', false);
      this.transitionToRoute('rant', rant.id);
    },
    saveRant: function(rant){
      var controller = this;
      var title = this.get('title');
      var body = this.get('body');

      rant.set('title', title);
      rant.set('body', body);
      rant.save().then(function(){
        this.set('isEditing', false);
        this.transitionToRoute('rants');
      }.bind(this));
    },

    deleteRant: function(rant) {
      rant.deleteRecord();
      rant.save().then(function(){
        this.transitionToRoute('rants');
      }.bind(this));
    }
  }
});
