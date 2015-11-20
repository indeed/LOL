var app = angular.module('lol', ['ui.router', 'ngVidBg', 'ngAudio', 'ngAnimate', 'lol.directives']);

var ticks = 10;

//TO ADD
// joke enter
// intro text fading
// fade out to black
// play again

app.controller('titleCtrl', function ($scope, $timeout, $window, ngAudio) {

    $scope.ambient = ngAudio.load("media/titleambient.mp3");
    $scope.ambient.volume = 0.3;
    $scope.ambient.loop = true;

    $scope.lavieenrose = ngAudio.load("media/lavieenrose.mp3");
    $scope.lavieenrose.volume = 0.5;
    $scope.lavieenrose.loop = false;

    $scope.ambient.play();

    $scope.loaded = false;
    $scope.load = function () {
        $timeout(function () {
            $scope.noStartText = true;
            $timeout(function () {
                $scope.loaded = true;
            }, 0.5 * ticks);
        }, 2.4 * ticks);
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

    $scope.reload = function () {
        $window.location.reload();
    }

    $scope.endScreen = function () {
        $timeout(function () { $scope.endMessage = 1; $scope.lavieenrose.play(); }, 2 * ticks)
        .then(function () { return $timeout(function () { $scope.endMessage = 0; }, 6 * ticks) })
        .then(function () { return $timeout(function () { $scope.endMessage = 2; }, 4 * ticks) })
        .then(function () { return $timeout(function () { $scope.endMessage = 0; }, 6 * ticks) })
        .then(function () { return $timeout(function () { $scope.endMessage = 3; }, 4 * ticks) })
        .then(function () { return $timeout(function () { $scope.endMessage = 0; }, 6 * ticks) })
        .then(function () { return $timeout(function () { $scope.endMessage = 4; }, 4 * ticks) })
        .then(function () { return $timeout(function () { $scope.endMessage = 0; }, 8 * ticks) })
        .then(function () { return $timeout(function () { $scope.endMessage = 5; }, 4 * ticks) })
        .then(function () { return $timeout(function () { $scope.endMessage = 0; }, 10 * ticks) })
        .then(function () { return $timeout(function () { $scope.endMessage = 6; }, 4 * ticks) });
    }

});

app.controller('mainCtrl', function ($scope, $timeout, ngAudio) {

    $scope.events = [{
        text: "It seems the rain won't stop for a while. Better get indoors.", type: "other-action",
    }];
    $scope.options = {};
    $scope.story = {};

    $scope.sfx_click = ngAudio.load("media/click.mp3");
    $scope.sfx_click.volume = 0.25;

    $scope.desertambient = ngAudio.load("media/desertambient.mp3");
    $scope.desertambient.volume = 0.5;
    $scope.desertambient.loop = true;

    $scope.rain = ngAudio.load("media/rain.mp3");
    $scope.rain.volume = 0.1;
    $scope.rain.loop = true;

    $scope.sfx_door = ngAudio.load("media/door.mp3");
    $scope.sfx_door.volume = 0.5;
    $scope.sfx_door.loop = false;

    $scope.options = {
        intro_leave: { name: "Go back outside", event: ['intro_gottastay'] },
        intro_lookaround: { name: "Look around", event: ['intro_lookaround'] },

        intro_buycoffee: { name: "Buy coffee", event: ['meet_buycoffee', 'meet_friendcall', 'meet_friendcall2'] },
        intro_stand: { name: "Stay where you are", event: ['meet_stand', 'meet_friendcall', 'meet_friendcall2'] },

        meet_ignorecall: { name: "Ignore him", event: ['meet_ignorecall', 'meet_ignorecall2'] },
        meet_walkover: { name: "Talk to him", event: ['meet_walkover'] },

        meet_asklife: { name: "Ask him about his life", event: ['meet_asklife', 'meet_asklife2'] },
        meet_askgrad: { name: "Ask what he did after graduating", event: ['meet_askgrad', 'meet_askgrad2'] },

        // Desert
        toDesert: { name: "Listen to his long story", event: ['goToDesert'] },
        desert_keepgoing: { name: "Keep going", event: ['desert_keepgoing', 'desert_start_walk'] },
        desert_turnback: { name: "Turn back", event: ['desert_turnback', 'desert_start_walk', 'divider'] },
        desert_walk: { name: "Get out and start walking", event: ['desert_walk'] },

        desert_walk_investigate: { name: "Turn around", event: ['desert_walk_investigate'] },
        desert_walk_ignore: { name: "Ignore it", event: ['desert_walk_ignore'] },

        desert_helpfriend: { name: "Investigate", event: ['desert_helpfriend', 'desert_gotbit'] },
        desert_freakout: { name: "Freak out", event: ['desert_freakout', 'desert_gotbit'] },
        desert_closerlook: { name: "Take a closer look", event: ['desert_closerlook'] },




        desert_telljoke: { name: "Tell Joke", event: ['desert_telljoke', 'desert_telljoke2', 'desert_telljoke3', 'divider'] },

        desert_end: { name: "Finish story", event: ['backToCafe'] },

        // Back to Cafe
        end_ask: { name: "Ask about what happened to José", event: ['end_ask', 'end_rip1', 'end_rip2','end_rip3'] },
        end_condolences: { name: "Offer your condolences", event: ['end_condolences', 'end_itsok1', 'end_itsok2', 'end_itsok3'] },
        end_silent: { name: "Stay silent", event: ['end_silent', 'end_itsok1', 'end_itsok2', 'end_itsok3'] },

        end_reflect: { name: "Reflect on Tobi's career choice", event: ['end_reflect', 'end_reflect2'] },

        end_dankmeme: { name: "Joke about med school", event: ['end_dankmeme', 'end_dankmeme2', 'end_dankmeme3'] },
          
        end_stay: { name: "Stay a little longer", event: ['end_stay'] },

        end_saybye: { name: "Say goodbye", event: ['end_saybye'] },

        end_leave: { name: "Leave coffee shop", event: ['end'] },

    }

    $scope.treatments = {
        desert_treat1: { name: "Wrap the wound", event: ['desert_treat1'], id: "desert_treat1" },
        desert_treat2: { name: "Suck out the venom", event: ['desert_treat2'], id: "desert_treat2" },
        desert_treat3: { name: "Tie a tourniquet", event: ['desert_treat3'], id: "desert_treat3" },
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
            text: "You look around. It's quite crowded. To the right, you see a line of wet people who were told by a snappish employee to buy something or leave. Some unfortunate soul is standing outside the window, having left his wallet at home.", type: "other-action",
            options: [$scope.options.intro_buycoffee, $scope.options.intro_stand]
        },

        meet_buycoffee: {
            text: "You get bored of pretending to check your phone and decide to get in line for a cup of coffee.", type: "other-action",
            options: [$scope.options.meet_ignorecall, $scope.options.meet_walkover]
        },

        meet_stand: {
            text: "You stay near the entrance, occasionally pretending to check your phone.", type: "other-action",
            options: [$scope.options.meet_ignorecall, $scope.options.meet_walkover]
        },

        meet_friendcall: {
            text: "Suddenly, you hear your name being called.", type: "other-action",
        },

        meet_friendcall2: {
            text: "Hey! Remember me? It's Tobi from high school!", type: "other-speech",
        },

        meet_ignorecall: {
            text: "Hello? I'm over here!", type: "other-speech",
            options: [$scope.options.meet_walkover]
        },

        meet_ignorecall2: {
            text: "It would be rude to just ignore someone calling to you.", type: "your-action",
        },

        meet_walkover: {
            text: "You walk over and meet the man. Tobi doesn't look like he's changed much from high school. Though it's been ten years, you could recognize that beaming smile anywhere.", type: "other-action",
            options: [$scope.options.meet_asklife, $scope.options.meet_askgrad]
        },

        meet_walkover2: {
            text: "You catch up on each other's lives and reminisce about all of the great—and not-so-great—times you had in high school.", type: "other-action",
        },

        meet_asklife: {
            text: "What are you up to nowadays?", type: "other-action",
            options: [$scope.options.toDesert]
        },

        meet_asklife2: {
            text: "Actually, I'm a comedian. An aspiring one, at least—it's been pretty hard to find a decent gig lately, I try to make youtube videos too. I wanted to be a doctor, but that didn't work out—I don't know, maybe I'm glad it didn't. You know, there's a pretty long story behind all of that.", type: "other-speech",
        },

        meet_askgrad: {
            text: "What did you do after graduation?", type: "your-speech",
            options: [$scope.options.toDesert]
        },

        meet_askgrad2: {
            text: "I went travelling a lot. You know, while I tried to figure out what I wanted to do with my life. I'm getting into comedy. I love it, but it's hard to make a living out of small shows and some youtube uploads. Actually, it's a pretty long story. ", type: "other-speech",
        },

        //tell story

        // Desert
        goToDesert: {
            text: "Back then, I still didn't know what to do with my life. This one summer, I planned a desert road trip with José—he's a guy I knew from Muay Thai. So we're on an empty backroad somewhere in Arizona, and I realise that I didn't bring enough water.", type: "other-action",
            options: [$scope.options.desert_keepgoing, $scope.options.desert_turnback]
        },

        desert_keepgoing: {
            text: "I think we can keep going, we can buy what we need at the next gas station.", type: "other-speech",
            options: [$scope.options.desert_walk]
        },

        desert_turnback: {
            text: "We should probably go back, we didn't bring any snacks either, and I'm kind of hungry.", type: "other-speech",
            options: [$scope.options.desert_walk]
        },

        desert_start_walk: {
            text: "José and I disagree on what to do, so we end up flipping a coin to determine whether or not we go back. The coin doesn't matter in the end, the damn car engine fails. There's no reception out here either. Time to walk.", type: "other-action",
        },

        desert_walk: {
            text: "The sun is pretty high up now, and my mouth is slightly parched. I try not to focus on the shimmering air above the road; it reminds me of water. A shout comes from behind me.", type: "other-action",
            options: [$scope.options.desert_walk_ignore, $scope.options.desert_walk_investigate]
        },

        desert_walk_ignore: {
            text: "It might not be a good idea to completely ignore my friend yelling ten feet behind me.", type: "other-action",
            options: [$scope.options.desert_walk_investigate]
        },

        desert_walk_investigate: {
            text: "I turn around and see José clutching his leg. He slouches down on the sandy ground, paler than usual. A dark shape slithers off into the brush.", type: "other-action",
            options: [$scope.options.desert_helpfriend, $scope.options.desert_freakout]
        },

        desert_freakout: {
            text: "I am about to completely freak out and panic—however, it occurs to me that I didn't even know what was wrong. I calmly walk over to help José out.", type: "other-action",
            options: [$scope.options.desert_closerlook]
        },

        desert_helpfriend: {
            text: "I walk over to figure out the problem. If my intuition is right, another sharp pebble has found its way into José's shoe.", type: "other-action",
            options: [$scope.options.desert_closerlook]
        },

        desert_gotbit: {
            text: "A snake! A snake bit me!", type: "other-speech",
        },

        desert_closerlook: {
            text: "It's worse than I expected. He's pale and sweating buckets. Man, if only I got accepted into med school, I would know what to do.", type: "other-action",
            options: $scope.treatments
        },

        desert_treat1: {
            text: "I tear off a piece of my t-shirt and quickly wrap it around his ankle. I realise that wrapping it doesn't help with the venom at all. Now I have to deal with a friend with a snakebite AND I look like a dolt wearing half a t-shirt.", type: "treatment",
            options: [$scope.options.desert_telljoke]
        },

        desert_treat2: {
            text: "I don't think sucking out snake venom with my mouth is a good idea.", type: "treatment",
            options: [$scope.options.desert_telljoke]
        },

        desert_treat3: {
            text: "I use my bandana to tie a makeshift tourniquet above the puncure wounds. It looks stylish, but it doesn't seem to be helping the spread of the venom.", type: "treatment",
            options: [$scope.options.desert_telljoke]
        },

        desert_desperate: {
            text: "I'm running out of ideas. I remember reading something about the healing ability of laughter; people say 'laughter is the best medicine,' or something. It's not like I have anything to lose.", type: "other-action",
        },

        desert_telljoke: {
            text: "José looks at me quite puzzledly. I take a deep breath.", type: "other-action",
            options: [$scope.options.desert_end]
        },

        desert_telljoke2: {
            text: "I thought I was hilarious at the time. I don't remember what I said anymore—maybe it's better that way. Well, for a few seconds, José just stares at me—", type: "other-action",
        },

        desert_telljoke3: {
            text: "You know how two friends will sometimes just stare at each other for a while and start laughing for no reason? I guess that's what happened: he raises an eyebrow at me, I raise both of mine, we both burst out laughing as if my stupid joke was the funniest thing in the world.", type: "other-action",
        },

        backToCafe: {
            text: 'It felt pretty surreal to say the least, seeing him genuinely laugh like that.', type: "other-speech",
            options: [$scope.options.end_ask]
        },

        end_ask: {
            text: 'So what happened to him in the end?', type: "your-speech",
            options: [$scope.options.end_condolences, $scope.options.end_silent]
        },

        end_rip1: {
            text: "He blinks at you as if you've just said the dumbest thing he's heard all day.", type: "other-action",
        },

        end_rip2: {
            text: "What do you think? He died, of course.", type: "other-speech",
        },

        end_rip3: {
            text: "Oh.", type: "other-action",
        },

        end_condolences: {
            text: "You offer Tobi your genuine condolences for the loss of his friend.", type: "other-action",
            options: [$scope.options.end_reflect]
        },

        end_silent: {
            text: "You say nothing, looking down as you do so. You fiddle with a beverage stirrer, but you don't have any coffee to stir.", type: "other-action",
            options: [$scope.options.end_reflect]
        },

        end_itsok1: {
            text: "It's alright; it's all in the past. You know, there's this quote from a book I read when I was a kid—", type: "other-speech",
        },

        end_itsok2: {
            text: "Remember me with smiles and laughter, for that is how I will remember you all. If you can only remember me with tears, then don't remember me at all.", type: "quote",
        },

        end_itsok3: {
            text: "—I'm sure José would have agreed.", type: "other-speech",
        },

        end_reflect: {
            text: "You wonder out loud if he does comedy for the same reason he made his last words to his friend a joke. Tobi grins.", type: "other-action",
            options: [$scope.options.end_dankmeme]
        },

        end_reflect2: {
            text: "Well, that and the fact that I got rejected from med school.", type: "other-speech",
        },

        end_dankmeme: {
            text: "I know I wouldn't want my doctor trying to treat a flu with a stand-up routine.", type: "your-speech",
            options: [$scope.options.end_saybye, $scope.options.end_stay]
        },

        end_dankmeme2: {
            text: "Fair enough", type: "other-speech",
            options: [$scope.options.end_saybye, $scope.options.end_stay]
        },

        end_dankmeme3: {
            text: "You both immediately crack up. You're laughing so hard, you almost fail to notice the bus that's arrived outside of the coffee shop.", type: "other-action",
        },

        end_saybye: {
            text: "Tobi smiles and agrees to talk again some other time. You wave goodbye as you run to the door.", type: "other-action",
            options: [$scope.options.end_leave]
        },

        end_stay: {
            text: "Missing the bus again isn't a very good idea, especially considering how busy you are.", type: "other-action",
            options: [$scope.options.end_saybye]
        },

        // Explores both the simplicity and the effectiveness/greatness of laughter - how it is so universal - gr8 for a dying guy as much as someone who missed their bus.
        // contrasting two interactiosn between friends - and how they both share laughter

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

        } else if (option.event.indexOf('desert_treat1') > -1 | option.event.indexOf('desert_treat2') > -1 | option.event.indexOf('desert_treat3') > -1) {
            $timeout(function () {
                delete $scope.treatments[option.id];
                if (jQuery.isEmptyObject($scope.treatments)) {
                    addEvent(['desert_desperate']);
                    $scope.userOptions = $scope.story[option.event[0]].options;
                } else {
                    $scope.userOptions = $scope.treatments;
                }
                //console.log($scope.treatments);
            }, 2 * ticks);
        } else if (option.event.indexOf('end') > -1) {

            $scope.$parent.storyTime = false;
            $scope.$parent.ambient.stop();
            $scope.sfx_door.play()
            $scope.rain.play();
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