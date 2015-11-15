var app = angular.module('lol.controllers', []);

var ticks = 1000;

app.controller('titleCtrl', function ($scope, $timeout, ngAudio) {

    $scope.ambient = ngAudio.load("media/titleambient.mp3");
    $scope.ambient.volume = 0.3;
    $scope.ambient.loop = true;

    $scope.ambient.play();

    $scope.loaded = false;
    $scope.load = function () {
        $scope.loaded = true;
    }

    $scope.bg = {
        main: [
            'media/titlebg.webm',
        ],
        desert: ['media/desertbg.webm',
        ],
        postermain: 'media/titlebg.jpg',
        posterdesert: 'media/desertbg.jpg',
        loop: true,
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
    $scope.options = {};
    $scope.story = {};

    $scope.sfx_click = ngAudio.load("media/click.mp3");
    $scope.sfx_click.volume = 0.2;

    $scope.options = {
        intro_leave: { name: "Go back outside", event: ['intro_gottastay'] },
        intro_lookaround: { name: "Look around", event: ['intro_lookaround']},

        toDesert: { name: "TO DESERT!", event: ['goToDesert']},
    }

    $scope.story = {

        divider: { text: '', type: "divider" },

        intro: {
            text: 'You open the door and stumble into the coffee shop, rain dripping off of your body. Very descriptive setting here. Warmth and stuff.', type: "other-action",
            options: [$scope.options.intro_leave, $scope.options.intro_lookaround]
        },

        intro_gottastay: {
            text: 'As you turn around to leave, you look outside and question why any sane person would go back in the rain. You raise your finger as if to say "oops, I forgot!" and pivot back around to the puzzled looks of people having coffee.', type: "other-action",
            options: [$scope.options.intro_lookaround]
        },

        intro_lookaround: {
            text: "You look around. The atmosphere is really dank. People doing stuff. A line of wet people who were told by a snappish employee to buy something or leave. Some poor guy is standing outside, having left his wallet at home.", type: "other-action",
            options: [ $scope.options.intro_leave, $scope.options.toDesert ]
        },

        goToDesert: {
            text: "I walked around the desert, with my bud and stuff. He was a pro.", type: "your-speech",
            options: [$scope.options.intro_leave, $scope.options.toDesert]
        },

        //you're out of bus tickets/rekt but you feel alright

    };



    $scope.userOptions = [
        { name: "Enter the coffee shop", event: ['intro', 'divider'] },
    ];

    var addEvent = function (event) {
        for (i = 0; i < event.length; i++) {
            $scope.events.push($scope.story[event[i]]);
        }
    }

    $scope.advance = function (option) {
        $scope.sfx_click.play();
        addEvent(option.event);
        $scope.userOptions = {};

        if (option.event[0] == 'goToDesert') {
            $scope.$parent.desertScene = true;
            $scope.$parent.ambient.stop();

            $scope.desertambient = ngAudio.load("media/desertambient.mp3");
            $scope.desertambient.volume = 0.5;
            $scope.desertambient.loop = true;

            $scope.desertambient.play();

            $scope.$parent.loaded = false;

            $timeout(function () {
                $scope.$parent.loaded = true;
                $scope.userOptions = $scope.story[option.event[0]].options;
            }, 3 * ticks);

        } else {
            $timeout(function () {
                $scope.userOptions = $scope.story[option.event[0]].options;
            }, 2 * ticks);
        }

    }

    $scope.getContentHeight = function () {
        return $("#content").height();
    }

});