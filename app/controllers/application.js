import Ember from "ember";

export default Ember.ArrayController.extend({

  loggedIn: false,

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
      var data = { email: this.get('emailHere'), password: this.get('passwordHere')};

      controller.set('errorMessage', null);
      var session = controller.store.createRecord('session', data);
      session.save().then(function(){
        controller.set('loggedIn', true);
        controller.set('emailHere', '');
        controller.set('passwordHere', '');
        controller.set('errorMessage', '');
        localStorage.setItem('authToken', session._data.token);
        controller.transitionToRoute('rants');
      });
    },

    signOut: function() {
      localStorage.clear();
      this.set('loggedIn', false);
      this.transitionToRoute('rants');
    },

    }
});
