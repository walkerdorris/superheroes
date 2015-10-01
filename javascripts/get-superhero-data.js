//firebase for superhero-data https://walker-superheroes.firebaseio.com/
define(function(require) {
 
  var Q = require("q");
  
  return {
    getSuperheroes: function() {
      
      var deferred = Q.defer();
        
        $.ajax({url: "https://walker-superheroes.firebaseio.com"})
          .done(function(json_data) {
            deferred.resolve(json_data);
          })
          
          .fail(function(xhr, status, error) {
            deferred.reject(error);
          });
        
        return deferred.promise;
    }
  }
});