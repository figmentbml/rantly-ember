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

      if ((body == null) || (body.length < 143)) {
      } else {
        rant.set('title', title);
        rant.set('body', body);
        rant.save().then(function(){
          controller.set('isEditing', false);
          controller.transitionToRoute('rants');
        });
      }
    },

    deleteRant: function(rant) {
      rant.deleteRecord();
      rant.save().then(function(){
        this.transitionToRoute('rants');
      }.bind(this));
    }
  }
});
