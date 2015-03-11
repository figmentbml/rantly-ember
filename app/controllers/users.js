import Ember from "ember";

export default Ember.ArrayController.extend({

  actions: {

    logIn: function() {
      var email     = this.get('emailHere'),
          password  = this.get('passwordHere');
    }
  }
});
