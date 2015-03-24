import Ember from "ember";

export default Ember.ArrayController.extend({

  loggedIn: function() {
    var token = localStorage.authToken;
    if (token) {
      return true;
    } else {
      return false;
    }
  }.property().volatile(),

  currentUserEmail: function() {
    var email = localStorage.email;
    if (email) {
      return email;
    } else {
      return null;
    }
  }.property().volatile(),

  currentUser: function() {
    var user = localStorage.user;
    if (user) {
      return user;
    } else {
      return null;
    }
  }.property().volatile(),

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
      var email = controller.get('emailHere');
      var password = controller.get('passwordHere');
      var input = document.getElementsByClassName("errors")[0];

      if (
        ((email == null) || (email.length < 0)) ||
        ((password == null) || (password.length < 0))
      ) {
        var error = document.createTextNode("All fields are required!");
        input.appendChild(error);
      } else {
        var session = controller.store.createRecord('session', { email: email, password: password });
        session.save().then(function(){
          if (session._data.success === true) {
            localStorage.setItem('authToken', session._data.token);
            localStorage.setItem('email', email);
            localStorage.setItem('user', session._data.user);
            controller.set('currentUser', session._data.user);
            controller.set('loggedIn', true);
            controller.set('currentUserEmail', email);
            controller.set('emailHere', '');
            controller.set('passwordHere', '');
            controller.get('target').send('refresh');
            controller.transitionToRoute('rants.index');
          } else {
            var error = document.createTextNode("Invalid email / password!");
            input.appendChild(error);
          }
        });
      }
    },

    signOut: function() {
      localStorage.clear();
      this.set('loggedIn', false);
      this.set('currentUser', null);
      this.transitionToRoute('rants.index');
      location.reload();
    },

    }
});
