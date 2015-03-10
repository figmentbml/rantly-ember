import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("rants", { path: '/' }, function() {
    this.route("new", { path: 'new'})
  });
  this.route("users", function() {
    this.resource("user", { path: '/:user_id' });
  });
  this.route("signup");
});

export default Router;
