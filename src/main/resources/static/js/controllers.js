'use strict';

/* Controllers */

angular.module('springChat.controllers', ['toaster'])
	.controller('ChatController', ['$http', '$scope', '$location', '$interval', 'toaster', 'ChatSocket', function($http, $scope, $location, $interval, toaster, chatSocket) {
		  
		var typing = undefined;
		
		$scope.username     = '';
		$scope.sendTo       = 'everyone';
		$scope.participants = [];
		$scope.messages     = [];
		$scope.newMessage   = '';
		$scope.ads = false;

        $scope.mySplit = function(string) {
            var array = string.split('@');
            return array[0];
        }
		  
		$scope.sendMessage = function() {

            if ($scope.newMessage !== "") {
                var destination = "/app/chat.message";

                if ($scope.sendTo != "everyone") {
                    destination = "/app/chat.private." + $scope.sendTo;
                    $scope.messages.unshift({
                        message: $scope.newMessage,
                        username: 'you',
                        priv: true,
                        to: $scope.sendTo
                    });
                }

                $scope.newMessage = $scope.newMessage.replace(/[\r\n]/g, " <br/> ");

                chatSocket.send(destination, {}, JSON.stringify({message: $scope.newMessage}));
                $scope.newMessage = '';
            }
		};

        $scope.sendMessageRemove = function(id) {
            var destination = "/app/chat.message.remove";

            // if($scope.sendTo != "everyone") {
            //     destination = "/app/chat.private." + $scope.sendTo;
            //     $scope.messages.unshift({message: $scope.newMessage, username: 'you', priv: true, to: $scope.sendTo});
            // }

            chatSocket.send(destination, {}, JSON.stringify({id:id}));
            // $scope.newMessage = '';
        };
        //
        $scope.sendAds = function() {
            var destination = "/app/chat.ads";

            chatSocket.send(destination, {}, JSON.stringify({message: $scope.ads.toString()}));
            // $scope.ads = true;
        };
		
		$scope.startTyping = function() {

			// Don't send notification if we are still typing or we are typing a private message
	        if (angular.isDefined(typing) || $scope.sendTo != "everyone") return;
	        
	        typing = $interval(function() {
	                $scope.stopTyping();
	            }, 500);
	        
	        chatSocket.send("/topic/chat.typing", {}, JSON.stringify({username: $scope.username, typing: true}));
		};
		
		$scope.stopTyping = function() {
			if (angular.isDefined(typing)) {
		        $interval.cancel(typing);
		        typing = undefined;
		        
		        chatSocket.send("/topic/chat.typing", {}, JSON.stringify({username: $scope.username, typing: false}));
			}
		};
		
		$scope.privateSending = function(username) {
				$scope.sendTo = (username != $scope.sendTo) ? username : 'everyone';
		};
			
		var initStompClient = function() {

			// chatSocket.init('/ws');

            connectAndReconnect(successConnect);

            function connectAndReconnect(successCallback) {
                chatSocket.init('/ws');
                chatSocket.connect(function(frame) {
                    successCallback(frame);
            }, function() {
                    setTimeout(function() {
                        toaster.pop('error', 'Error', 'Connection error. Trying to reconnect...');
                        connectAndReconnect(successCallback);
                }, 5000);
                });


            }

		};


		function successConnect(frame) {

                $scope.messages = [];

                $http.get('/chatmessages/?size=2000').success(function(data){
                    var messages = data['_embedded']['chatmessages'];
                    for (var i=0; i < messages.length; i++){
                        $scope.messages.unshift({id: messages[i]['id'], username: messages[i]['username'], message : messages[i]['message'], time: messages[i]['time']});
                    }
                });

                $http.get('/options').success(function(data){

                    var options = data['_embedded']['options'];
                    var lastOptions = options[options.length - 1];
                    // for (var i=0; i < messages.length; i++){
                    //     $scope.messages.unshift({id: messages[i]['id'], username: messages[i]['username'], message : messages[i]['message'], time: messages[i]['time']});
                    // }

                    if (JSON.parse(lastOptions.showAds).message === "true") {
                        $scope.ads = true;
                        console.log("true");
                    }
                    else {
                        $scope.ads=false;
                        console.log("false");
                    }
                });

                $scope.username = frame.headers['user-name'];

                chatSocket.subscribe("/app/chat.participants", function(message) {
                    $scope.participants = JSON.parse(message.body);
                });

                chatSocket.subscribe("/topic/chat.login", function(message) {
                    $scope.participants.unshift({username: JSON.parse(message.body).username, typing : false});
                });

                chatSocket.subscribe("/topic/chat.logout", function(message) {
                    var username = JSON.parse(message.body).username;
                    for(var index in $scope.participants) {
                        if($scope.participants[index].username == username) {
                            $scope.participants.splice(index, 1);
                        }
                    }
                });

                chatSocket.subscribe("/topic/chat.typing", function(message) {
                    var parsed = JSON.parse(message.body);
                    if(parsed.username == $scope.username) return;

                    for(var index in $scope.participants) {
                        var participant = $scope.participants[index];

                        if(participant.username == parsed.username) {
                            $scope.participants[index].typing = parsed.typing;
                        }
                    }
                });

                chatSocket.subscribe("/topic/chat.message", function(message) {
                    $scope.messages.unshift(JSON.parse(message.body));
                });

                chatSocket.subscribe("/topic/chat.message.remove", function(message) {
                    for (var i=0; i<$scope.messages.length;i++) {
                        if ($scope.messages[i]['id'] == JSON.parse(message.body).id) {
                            $scope.messages.splice(i,1); // removes the matched element
                            i = $scope.messages.length;  // break out of the loop. Not strictly necessary
                        }
                    }
                });

                chatSocket.subscribe("/topic/chat.ads", function(message) {
                    if (JSON.parse(message.body).message === "true")
                        $scope.ads=true;
                    else $scope.ads=false;
                });

                chatSocket.subscribe("/user/exchange/amq.direct/chat.message", function(message) {
                    var parsed = JSON.parse(message.body);
                    parsed.priv = true;
                    $scope.messages.unshift(parsed);
                });

                chatSocket.subscribe("/user/exchange/amq.direct/errors", function(message) {
                    toaster.pop('error', "Error", message.body);
                });

        }
		  
		initStompClient();
	}]);
	