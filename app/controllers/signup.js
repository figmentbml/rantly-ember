import Ember from "ember";

export default Ember.ArrayController.extend({

  actions: {

    register: function() {
      var controller = this;
      var firstName = this.get('fnameCopy'),
          lastName  = this.get('lnameCopy'),
          email     = this.get('emailCopy').trim(),
          password  = this.get('password'),
          passwordConfirm  = this.get('passwordConfirm');


      var user = controller.store.createRecord('user',
      { firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        password_confirm: passwordConfirm});
      controller.set('fnameCopy', '');
      controller.set('lnameCopy', '');
      controller.set('emailCopy', '');
      controller.set('passwordCopy', '');
      controller.set('passwordConfirm', '');
      user.save().then(function(){
        controller.transitionToRoute('rants');
      });
    }
  }
});
