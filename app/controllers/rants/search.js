import Ember from "ember";

export default Ember.ArrayController.extend({

  queryParams: ['term'],
  term: null,

  results: function() {
    return this.store.find('rant', { find: this.get('term') });
  }.property('term'),

  isEditing: false,


  actions: {

    editRant: function(rant) {
      this.set('isEditing', true);
    },
    cancelRant: function(rant) {
      this.set('isEditing', false);
      this.transitionToRoute('rants.index');
    },
    saveRant: function(rant){
      var title = this.get('title');
      var body = this.get('body');

      var input = document.getElementsByClassName("errors")[0];

      if ((title.length === 0) && ((body == null) || (body.length < 143))) {
        var error = document.createTextNode("Your rant must have a title.");
        input.appendChild(error);
        var errorBody = document.createTextNode("Your rant must be at least 144 characters.");
        input.appendChild(errorBody);
      } else if ((body == null) || (body.length < 143)) {
        var error2 = document.createTextNode("Your rant must be at least 144 characters.");
        input.appendChild(error2);
      } else if (title.length === 0) {
        var error3 = document.createTextNode("Your rant must have a title.");
        input.appendChild(error3);
      } else {
      rant.set('title', title);
      rant.set('body', body);
      rant.save().then(function(){
        this.set('isEditing', false);
        this.transitionToRoute('rants.index');
      }.bind(this));
    }
    },

    deleteRant: function(rant) {
      var control = this;
      Ember.$('.button-warning').parents('header').addClass('fade-out');
      Ember.run.later(function(){
        rant.destroyRecord();
        control.transitionToRoute('rants.index');
      }, 400);
    }
  }

});
