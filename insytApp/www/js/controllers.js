angular.module('starter.controllers', ["ngCordova"])

.controller('DashCtrl', function($scope,$cordovaCamera, $http) {

    $scope.model = {
      showSpinner: false
    };

    $scope.takePicture = function(){

      var options = {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
      };

      $cordovaCamera.getPicture(options).then(function(imageURI) {
        $scope.model.imageSrc = imageURI;
        $scope.model.showSpinner = true;
        var url = "https://api.havenondemand.com/1/api/sync/recognizebarcodes/v1";
        var formData = {
          apikey: "bfb136fe-ef9f-4193-9c48-c31e652c06c0",
          url: "https://raw.githubusercontent.com/sashi349/insyt/master/insytApp/www/img/kitkat.jpeg",
          barcode_type: "ean-13"
        }
        $http({
          method:"POST",
          url: url,
          data: $.param(formData)
        }).then(function(result){
           console.log(result.data.barcode[0].text);
        });


      }, function(err) {
        console.log(err);
      });


    }




  })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  }
})

  .controller('HistoryCtrl', function($scope) {
    $scope.settings = {
    }
  })

  .controller('ProductCtrl', function($scope) {
    $scope.settings = {
    }
  })

  .controller('DetailCtrl', function($scope) {
    $scope.settings = {
    }
  })



;
