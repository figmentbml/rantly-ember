import Ember from "ember";

export default Ember.ObjectController.extend({

  isEditing: false,

  needs: ['application'],

  gravatarURL: function(email, size) {
    return 'background-image: url(http://www.gravatar.com/avatar/' + md5(this.user.email) + ')';
  },

  rantMatch: function() {
    var rantUser = this.model._data.user.id;
    var appController = this.get('controllers.application');
    var appUser = appController.currentUser;
    var controller = this;
    if ((appUser>0) && (rantUser>0)) {
      if (rantUser == appUser) {
        return true;
      }
    }
  }.property('rantMatch'),

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

      var input = document.getElementsByClassName("errors")[0];

      if ((title.length === 0) && ((body == null) || (body.length < 143))) {
        var error = document.createTextNode("Your rant must have a title.");
        input.appendChild(error);
        var errorBody = document.createTextNode("Your rant must be at least 144 characters.");
        input.appendChild(errorBody);
      } else if ((body == null) || (body.length < 143)) {
        var error = document.createTextNode("Your rant must be at least 144 characters.");
        input.appendChild(error);
      } else if (title.length === 0) {
        var error = document.createTextNode("Your rant must have a title.");
        input.appendChild(error);
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
      var input = document.getElementsByClassName("rant-box")[0];

      input.addClass("fadeout");
      rant.deleteRecord();
      rant.save().then(function(){
        this.transitionToRoute('rants');
      }.bind(this));
    }
  }
});
