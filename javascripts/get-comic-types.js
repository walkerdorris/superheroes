// firebase for comic-types https://walker-comic-types.firebaseio.com/
define(function(require) {
  var Q = require("q");
  return {
    getComicsTypes: function() {
      var deferred = Q.defer();
        $.ajax({url: "https://walker-comic-types.firebaseio.com/"})
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
