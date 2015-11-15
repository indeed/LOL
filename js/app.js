$(document).ready(function () {
    $("body").queryLoader2({
        barColor: "#fff",
        backgroundColor: "#111",
        barHeight: 2,
        fadeOutTime: 1000
    });
});

$(window).load(function () {
    $("body").removeClass("preload");
});

var app = angular.module('lol', ['ui.router', 'ngVidBg', 'ngAudio', 'ngAnimate', 'lol.services', 'lol.directives']);

var ticks = 1000;

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/title");

    $stateProvider
      .state('title', {
          url: "/title",
          templateUrl: "views/title.html",
          controller: 'titleCtrl'
      })
});

app.controller('titleCtrl', function ($scope, $timeout, ngAudio) {

    $scope.ambient = ngAudio.load("media/titleambient.mp3");
    $scope.ambient.volume = 0.3;
    $scope.ambient.loop = true;
    $scope.ambient.play();

    $scope.bg = {
        resources: [
            'media/titlebg.webm',
        ],
        poster: 'http://placehold.it/2000&text=you%20may%20want%20to%20have%20a%20poster',
        fullScreen: true,
        muted: true,
        zIndex: '-100',
        pausePlay: false
    }

    $scope.start = function () {
        $scope.started = true;
        $timeout(function () {
            $scope.blur = true;
            $timeout(function () {
                $scope.storyTime = true;
            }, 2 * ticks);
        }, 1 * ticks);
    }

});

app.controller('mainCtrl', function ($scope, $timeout, ngAudio) {

    $scope.events = [];

    $scope.options = [
        { name: "Tell him to eat a dog", text: "Eat a dog!", isAction: false },
        { name: "Jerk it", text: "You jerk it really hard", isAction: true },
        { name: "Leave and never come back", text: "I AM LEAVING ", isAction: false }
    ];

    var addEvent = function (text, fromUser, isAction) {
        $scope.events.push({
            text: text, fromUser: fromUser, isAction: isAction
        });
    }

    $scope.advance = function (option) {
        addEvent(option.text, true, option.isAction);
        $scope.options = [];
        $timeout(function () {
            $scope.options = [
                { name: "Tasdasdog", text: "Eaasdadsd", isAction: false },
                { name: "Jasdasdt", text: "Yasdasdasdy hard", isAction: true },
                { name: "Leaasdde back", text: "I AMasdasdasdasdNG ", isAction: false }
            ];
        }, 1.5 * ticks);
    }

    $scope.getContentHeight = function () {
        return $("#content").height();
    }

});