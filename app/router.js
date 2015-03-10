import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("rants", {path: '/'} );
  this.route("users");
  this.route("signup");
  this.route("user");
});

export default Router;
