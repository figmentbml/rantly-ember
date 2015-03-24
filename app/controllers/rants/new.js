import Ember from "ember";

export default Ember.ArrayController.extend({

  needs: ['application'],

  actions: {
    newRant: function(){
      var controller = this;
      var title = this.get('titleCopy');
      var body = this.get('bodyCopy');
      var app = this.get('controllers.application');

      var input = document.getElementsByClassName("errors")[0];

      if ((title.length === 0) && ((body == null) || (body.length < 143))) {
        var error = document.createTextNode("Your rant must have a title. \n");
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
          var rant = controller.store.createRecord('rant', { title: title, body: body });
          controller.set('titleCopy', '');
          controller.set('bodyCopy', '');
          rant.save().then(function(){
            controller.transitionToRoute('rants.index');
          });
        }
      }
    }

});
