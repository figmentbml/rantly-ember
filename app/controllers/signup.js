import Ember from "ember";

export default Ember.ArrayController.extend({

  needs: ['application'],

  actions: {

    register: function() {
      var controller = this;
      var firstName = this.get('fnameCopy'),
          lastName  = this.get('lnameCopy'),
          email     = this.get('emailCopy'),
          password  = this.get('passwordCopy'),
          passwordConfirm  = this.get('passwordConfirm');

      if (
          ((firstName == null) || (firstName.length < 0)) ||
          ((lastName == null) || (lastName.length < 0)) ||
          ((email == null) || (email.length < 0)) ||
          ((password == null) || (password.length < 0)) ||
          ((passwordConfirm == null) || (passwordConfirm.length < 0)) ||
          (password !== passwordConfirm)
        ) {
        var input = document.getElementsByClassName("errors")[0];
        var error = document.createTextNode("All fields are required!");
        input.appendChild(error);
      } else {
        var user = controller.store.createRecord('user',
        { firstName: firstName,
          lastName: lastName,
          email: email.trim(),
          password: password,
          password_confirmation: passwordConfirm
        });
          user.save().then(function(){
            controller.set('fnameCopy', '');
            controller.set('lnameCopy', '');
            controller.set('emailCopy', '');
            controller.set('passwordCopy', '');
            controller.set('passwordConfirm', '');
            controller.transitionToRoute('rants');
          });
    }
  },
  }

});
