var app = angular.module('lol', ['ui.router', 'ngVidBg', 'ngAudio', 'ngAnimate', 'lol.directives']);

var ticks = 1000;

app.controller('titleCtrl', function ($scope, $timeout, ngAudio) {

    $scope.ambient = ngAudio.load("media/titleambient.mp3");
    $scope.ambient.volume = 0.3;
    $scope.ambient.loop = true;

    $scope.lavieenrose = ngAudio.load("media/lavieenrose.mp3");
    $scope.lavieenrose.volume = 0.5;
    $scope.lavieenrose.loop = false;

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

    $scope.endScreen = function () {
        $timeout(function () { $scope.endMessage = 1; $scope.lavieenrose.play(); }, 2 * ticks)
        .then(function () { return $timeout(function () { $scope.endMessage = 0; }, 6 * ticks) })
        .then(function () { return $timeout(function () { $scope.endMessage = 2; }, 4 * ticks) })
        .then(function () { return $timeout(function () { $scope.endMessage = 0; }, 6 * ticks) })
        .then(function () { return $timeout(function () { $scope.endMessage = 3; }, 4 * ticks) })
        .then(function () { return $timeout(function () { $scope.endMessage = 0; }, 10 * ticks) });
    }

});

app.controller('mainCtrl', function ($scope, $timeout, ngAudio) {

    $scope.events = [{
        text: "It seems the rain won't stop for a while. Better get indoors.", type: "other-action",
    }];
    $scope.options = {};
    $scope.story = {};

    $scope.sfx_click = ngAudio.load("media/click.mp3");
    $scope.sfx_click.volume = 0.2;

    $scope.desertambient = ngAudio.load("media/desertambient.mp3");
    $scope.desertambient.volume = 0.5;
    $scope.desertambient.loop = true;

    $scope.options = {
        intro_leave: { name: "Go back outside", event: ['intro_gottastay'] },
        intro_lookaround: { name: "Look around", event: ['intro_lookaround'] },

        // Desert
        toDesert: { name: "TO DESERT!", event: ['goToDesert'] },
        desert_keepgoing: { name: "Keep going", event: ['desert_keepgoing', 'desert_start_walk'] },
        desert_turnback: { name: "Turn back", event: ['desert_turnback', 'desert_start_walk', 'divider'] },
        desert_walk: { name: "Get out and start walking", event: ['desert_walk'] },

        desert_walk_investigate: { name: "Turn around", event: ['desert_walk_investigate'] },
        desert_walk_ignore: { name: "Ignore it", event: ['desert_walk_ignore'] },

        desert_helpfriend: { name: "Investigate", event: ['desert_helpfriend'] },
        desert_freakout: { name: "Freak out", event: ['desert_freakout'] },

        desert_telljoke: { name: "Tell Joke", event: ['desert_telljoke', 'divider'] },

        desert_end: { name: "End", event: ['backToCafe'] },

        // Back to Cafe
        end_ask: { name: "Ask about what happened to José", event: ['end_ask', 'end_rip1', 'end_rip2', 'end_rip3'] },

        end_leave: { name: "Go home", event: ['end'] },

    }

    $scope.story = {

        divider: { text: '', type: "divider" },

        intro: {
            text: 'You open the door and stumble into the coffee shop, rain dripping off of your body. You are greeted by the sound of smooth jazz and the familiar aroma of coffee.', type: "other-action",
            options: [$scope.options.intro_leave, $scope.options.intro_lookaround]
        },

        intro_gottastay: {
            text: 'As you turn around to leave, you look outside and question why any sane person would go back in the rain. You raise your finger as if to say "oops, I forgot!" and pivot back around to a few puzzled looks.', type: "other-action",
            options: [$scope.options.intro_lookaround]
        },

        intro_lookaround: {
            text: "You look around. It's quite crowded. To the right, a line of wet people who were told by a snappish employee to buy something or leave. Some unfortunate man is standing outside the window, having left his wallet at home.", type: "other-action",
            options: [$scope.options.intro_buycoffee, $scope.options.toDesert]
        },

        meet_buycoffee: {
            text: "You get bored of pretending to check your phone and decide to get to line . Plus, you're feeling a little tired anyway.", type: "other-action",
            options: [$scope.options.intro_ignorecall, $scope.options.intro_walkover]
        },

        meet_stand: {
            text: "You stay near the entrance, occasionally pretending to check your phone.", type: "other-action",
            options: [$scope.options.intro_ignorecall, $scope.options.intro_walkover]
        },

        meet_friendcall: {
            text: "Suddenly, you hear your name being called.", type: "other-action",
        },

        meet_ignorecall_talk: {
            text: "Hey! Over here! It's Tobi from high school!", type: "other-speech",
        },

        meet_walkover: {
            text: "You ", type: "other-action",
            options: [$scope.options.intro_walkover]
        },

        meet_ignorecall: {
            text: "Hey! Over here!", type: "other-speech",
            options: [$scope.options.intro_walkover]
        },

        //talk about teachers

        //says hes an aspiring comedian, writing jokes for his next show

        //ask why

        //tell story

        // Desert
        goToDesert: {
            text: "I walked around the desert, with my bud and stuff. He was a pro. Forgot to refill. Do I go back, or keep going?", type: "other-action",
            options: [$scope.options.desert_keepgoing, $scope.options.desert_turnback]
        },

        desert_keepgoing: {
            text: "I think we can keep going, it's not very far.", type: "other-speech",
            options: [$scope.options.desert_walk]
        },

        desert_turnback: {
            text: "We should probably go back, we didn't bring any snacks either, and I'm kind of hungry.", type: "other-speech",
            options: [$scope.options.desert_walk]
        },

        desert_start_walk: {
            text: "I flip a coin to determine whether or not we go back. Once decided on our course of action, we hear the unpleasant sounds of an engine breaking down. There's no reception out here, we'll have to walk.", type: "other-action",
        },

        desert_walk: {
            text: "The sun glares down on me, and my mouth is slightly parched. The shimmering air above the road reminds me of water. A shout comes from behind me.", type: "other-action",
            options: [$scope.options.desert_walk_ignore, $scope.options.desert_walk_investigate]
        },

        desert_walk_ignore: {
            text: "Okay, let me just completely ignore my friend yelling literally ten feet behind me.", type: "other-action",
            options: [$scope.options.desert_walk_investigate]
        },

        desert_walk_investigate: {
            text: "I turn around and see José clutching his leg. He slouches down on the sandy ground, paler than usual. A dark shape slithers off into the brush.", type: "other-action",
            options: [$scope.options.desert_helpfriend, $scope.options.desert_freakout]
        },

        desert_freakout: {
            text: "I am about to completely freak out and panic—however, it occurs to me that I didn't even know what was wrong. I calmly walk over to help José out.", type: "other-action",
            options: [$scope.options.desert_telljoke]
        },

        desert_helpfriend: {
            text: "I walk over to see what's wrong. If my intuition is right, another big rock has found its way into José's shoe.", type: "other-action",
            options: [$scope.options.desert_telljoke]
        },

        // he says he got bit

        // medical school didn't prepare me for this

        // ok let's see if i can remember what to do

        // suck wound, wrap, look for antivenom

        // laughter is the best medicine, what do i have to lose

        desert_telljoke: {
            text: "I tell him the dankest joke ever. I don't remember it anymore, but I thought it was hilarious. He looks at me. We stand there like idiots in the desert, him dying there and both of us laughing our asses off.", type: "other-action",
            options: [$scope.options.desert_end]
        },


        backToCafe: {
            text: '- and he laughed really hard after a pause, descriptive stuff here.', type: "other-speech",
            options: [$scope.options.end_ask]
        },

        end_ask: {
            text: 'So what happened to him in the end?', type: "your-speech",
            options: [$scope.options.end_condolences, $scope.options.end_leave]
        },

        end_rip1: {
            text: "He blinks at you as if you've said the dumbest thing he's heard all day.", type: "other-action",
        },

        end_rip2: {
            text: "What do you think? He died, of course.", type: "other-speech",
        },

        end_rip3: {
            text: "I'll never forget how geniunely amused he was. He laughs.", type: "other-action",
        },

        // condolences or ask about career

        // no no, Remember me with smiles and laughter, for that is how I will remember you all. If you can only remember me with tears, then don't remember me at all. its what jose would have wanted

        // so is that why you want to be a comedian?

        // That, and the fact that I got rejected from med school

        // well, my bus is here, time to go

        // say goodbye




        // no matter how shitty your life is, there's always room for laughter - it's free
        // Laughter heals all wounds, and that's one thing that everybody shares. No matter what you're going through, it makes you forget about your problems. I think the world should keep laughing.

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

        if (option.event.indexOf('goToDesert') > -1) {

            $scope.$parent.desertScene = true;
            $scope.$parent.ambient.stop();

            $scope.desertambient.play();

            $scope.events = [$scope.events[$scope.events.length - 1]];
            $scope.$parent.loaded = false;

            $timeout(function () {
                $scope.$parent.loaded = true;
                $scope.$parent.desertBlur = true;
                $scope.userOptions = $scope.story[option.event[0]].options;
            }, 4 * ticks);

        } else if (option.event.indexOf('backToCafe') > -1) {

            $scope.$parent.desertScene = false;
            $scope.$parent.blur = false;

            $scope.$parent.ambient.play();
            $scope.desertambient.stop();

            $scope.events = [$scope.events[$scope.events.length - 1], $scope.events[$scope.events.length - 2]];
            $scope.$parent.loaded = false;

            $timeout(function () {
                $scope.$parent.blur = true;
                $scope.$parent.loaded = true;
                $scope.userOptions = $scope.story[option.event[0]].options;
            }, 3 * ticks);

        } else if (option.event.indexOf('end') > -1) {

            $scope.$parent.storyTime = false;
            $scope.$parent.ambient.stop();
            $scope.$parent.end = true;

            $timeout(function () {
                $scope.$parent.endScreen();
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