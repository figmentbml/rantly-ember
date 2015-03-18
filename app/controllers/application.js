import Ember from "ember";

export default Ember.ArrayController.extend({

  loggedIn: false,

  currentUserEmail: null,
  currentUser: null,

  needs: ['rant'],

  actions: {

    queryRants: function() {
      var query = this.get('search');
      var controller = this;
      var input = document.getElementsByClassName("rant-search-field")[0];

      if ((typeof(query) === 'undefined') || (query === '')) {
        input.placeholder = "This can't be blank!";
      } else {
        controller.store.find('rant', {find: query}).then(function(result) {
          controller.set('model', result);
        });
        input.placeholder = "Search";
        controller.set('search', '');
        controller.transitionToRoute('rants.search', { queryParams: {term: query} });
      }
    },

    signIn: function() {
      var controller = this;
      var email = this.get('emailHere');
      var password = this.get('passwordHere');

      controller.set('errorMessage', null);
      var session = controller.store.createRecord('session', { email: email, password: password});
      session.save().then(function(){
        console.log(session);
        localStorage.setItem('authToken', session._data.token);
        controller.set('currentUser', session._data.user._data.id);

        controller.set('loggedIn', true);
        controller.set('currentUserEmail', email);
        var foo = controller.get('currentUser');
        console.log(foo);
        controller.set('isEditable', true);
        controller.set('emailHere', '');
        controller.set('passwordHere', '');
        controller.set('errorMessage', '');
        controller.transitionToRoute('rants');
      });
    },

    signOut: function() {
      localStorage.clear();
      this.set('loggedIn', false);
      this.set('isEditable', false);
      this.set('currentUserEmail', null);
      this.set('currentUser', null);
      this.transitionToRoute('rants');
    },

    }
});
