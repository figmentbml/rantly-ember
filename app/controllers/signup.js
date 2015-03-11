import Ember from "ember";

export default Ember.ArrayController.extend({

  actions: {

    register: function() {
      var controller = this;
      var firstName = this.get('fnameCopy'),
          lastName  = this.get('lnameCopy'),
          email     = this.get('emailCopy'),
          password  = this.get('password');

      var user = controller.store.createRecord('user',
      { firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        password_confirm: password});
      controller.set('fnameCopy', '');
      controller.set('lnameCopy', '');
      controller.set('emailCopy', '');
      controller.set('passwordCopy', '');
      user.save().then(function(){
        controller.transitionToRoute('rants');
      });
    }
  }
});
