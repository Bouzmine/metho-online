angular.module('metho.controllers.references', [])

// Ref Tab view
.controller('RefCtrl', function($scope, Articles, Settings) {
    $scope.articles = Articles.all();
    $scope.isAdvanced = Settings.get("advanced");

    $scope.$on("$ionicView.beforeEnter", function() {
        $scope.isAdvanced = Settings.get("advanced");
    });
})


// Ref detail view
.controller('RefDetailCtrl', function($scope, $stateParams, Articles, $ionicNavBarDelegate) {
    $scope.article = Articles.get($stateParams.articleId);

    $scope.share = function() {
        text = document.querySelectorAll("ion-content#sub-content")[0].innerText;
        window.plugins.socialsharing.share(text, $scope.article.name);
    }
})


// Ref sub detail view
.controller('RefSubDetailCtrl', function($scope, $stateParams, Articles) {
    $scope.article = Articles.get($stateParams.articleId).subPages[$stateParams.subId];

    $scope.shareSub = function() {
        text = document.querySelectorAll("ion-content#sub-detail-content")[0].innerText;
        window.plugins.socialsharing.share(text, $scope.article.name);
    }
});
