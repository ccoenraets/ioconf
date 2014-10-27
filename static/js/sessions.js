angular.module('conference.sessions', ['ngResource', 'conference.config', 'conference.push'])

    // Routes
    .config(function ($stateProvider) {

        $stateProvider

            .state('app.sessions', {
                url: "/sessions",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/sessions.html",
                        controller: "SessionListCtrl"
                    }
                }
            })

            .state('app.session', {
                url: "/sessions/:sessionId",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/session.html",
                        controller: "SessionCtrl"
                    }
                }
            })

    })

    .factory('Session', function ($resource, SERVER_PATH) {
        return $resource(SERVER_PATH + '/sessions/:sessionId');
    })

    .controller('SessionListCtrl', function ($scope, Session, SERVER_PATH) {
        $scope.serverPath = SERVER_PATH;
        $scope.sessions = Session.query();
    })

    .controller('SessionCtrl', function ($scope, $stateParams, Session, SERVER_PATH) {
        $scope.serverPath = SERVER_PATH;
        $scope.session = Session.get({sessionId: $stateParams.sessionId});

        $scope.push = function(event) {
            Notification.push({message: "Check out this session: " + $scope.session.title});
        }

        $scope.share = function(event) {
            openFB.api({
                method: 'POST',
                path: '/me/feed',
                params: {
                    message: "I'll be attending: '" + $scope.session.title + "' by " +
                        $scope.session.speaker
                },
                success: function () {
                    alert('The session was shared on Facebook');
                },
                error: function () {
                    alert('An error occurred while sharing this session on Facebook');
                }
            });
        };

    });