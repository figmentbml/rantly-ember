import Ember from "ember";

export default Ember.ArrayController.extend({

  needs: ['application', 'rant'],

  sortProperties : ['createdAt'],
  sortAscending  : false,

  itemController: 'rant'


});
