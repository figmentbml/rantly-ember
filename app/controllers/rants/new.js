import Ember from "ember";

export default Ember.ArrayController.extend({

  actions: {
    newRant: function(){
      var controller = this;
      var title = this.get('titleCopy');
      var body = this.get('bodyCopy');

      if (title == null) {
        // controller.flashMessage({
        //   content: 'You cannot have an empty title.',
        //   duration: 1000,
        //   type: 'fail',
        // });
      } else if ((body == null) || (body.length > 143)) {
        // controller.flashMessage({
        //   content: 'Your cannot rant must be at least 144 characters.',
        //   duration: 1000,
        //   type: 'fail',
        // });
      } else {
        var rant = controller.store.createRecord('rant', { title: title, body: body });
        controller.set('titleCopy', '');
        controller.set('bodyCopy', '');
        rant.save().then(function(){
          controller.transitionToRoute('rants');
        });
      }

    },
    cancelRant: function() {
      this.transitionToRoute('rants');
    }

  }

});
