import Ember from "ember";

export default Ember.ArrayController.extend({

  actions: {
    newRant: function(){
      var controller = this;
      var title = this.get('titleCopy');
      var body = this.get('bodyCopy');

      var rant = controller.store.createRecord('rant', { title: title, body: body });
      controller.set('titleCopy', '');
      controller.set('bodyCopy', '');
      rant.save().then(function(){
        controller.transitionToRoute('rants');
      });
    },
    cancelRant: function() {
      this.transitionToRoute('rants');
    }

  }

});
