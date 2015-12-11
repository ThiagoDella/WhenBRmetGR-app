// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var blog = angular.module('blog', ['ionic']);

blog.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

blog.controller("blogController", function ($scope, postsService ,$sce){
  
  $scope.model = {
    'posts':[]
    
  }
  postsService.loadPosts().then(function success(data){
    $scope.model.posts = postsService.postList;
  
    console.log(data);
    
  },function error(data){
    console.log(data);
  });

});

blog.service("postsService",function($http,$q, $sce){




  var posts = {
    'postList':[],
    'loadPosts': function(){
      var d = $q.defer();
      $http.get("https://public-api.wordpress.com/rest/v1.1/sites/www.whenbrazilmetgreece.wordpress.com/posts/","context=display","pretty=true").
      success(function success(data){
        console.log(data.posts);
        posts.postList = data.posts;

          //converting content to html
          angular.forEach(posts.postList,function(value,key){
            this[key].title = $sce.trustAsHtml(value.title);
            this[key].content = $sce.trustAsHtml(value.content);
          },posts.postList);

        d.resolve("Posts recieved!");
      }).error(function error(msg){
        console.log(msg);
        d.reject("Error while recieving Posts!");
      });
      return d.promise;
    }
  };
return posts;
});