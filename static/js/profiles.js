angular.module('conference.profiles', ['conference.config'])

    .config(function ($stateProvider, FB_APP_ID) {

        openFB.init({appId: FB_APP_ID});

        $stateProvider

            .state('app.profile', {
                url: "/profile",
                views: {
                    'menuContent': {
                        templateUrl: "templates/profile.html",
                        controller: "ProfileCtrl"
                    }
                }
            });
    })

    .controller('ProfileCtrl', function ($scope) {
        openFB.api({
            path: '/me',
            params: {fields: 'id,name'},
            success: function (user) {
                $scope.$apply(function () {
                    $scope.user = user;
                });
            },
            error: function (error) {
                alert('Facebook error: ' + error.error_description);
            }
        });
    });