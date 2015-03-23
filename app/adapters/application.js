import DS from "ember-data";

export default DS.ActiveModelAdapter.extend({
  host: 'http://localhost:3000',

  headers: function(){
    return {
      "Authorization": "" + localStorage.getItem('authToken')
    };
  }.property().volatile()
});
