import DS from "ember-data";
// import ENV from '../config/environment';

export default DS.ActiveModelAdapter.extend({
  host: 'http://localhost:3000',

  headers: function() {
    var token = localStorage.getItem('authToken');
    if (token) {
      return {
        "Authorization": "" + token
      };
    }
  }.property('signin.authToken'),

});
