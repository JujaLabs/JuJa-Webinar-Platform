import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Message} from '@stomp/stompjs';

import {Subscription} from 'rxjs/Subscription';
import {StompService, StompState} from '@stomp/ng2-stompjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  private typing: any = undefined;
  private username: string = '';
  private sendTo: string = 'everyone';
  private participants: any[] = [];
  // private messages: any[] = [];
  private newMessage: string = '';

  public state: Observable<string>;

  // Stream of messages
  private subscription: Subscription;
  public messages: Observable<Message>;

  // Subscription status
  public subscribed: boolean;

  // Array of historic message (bodies)
  public mq: Array<string> = [];

  // A count of messages received
  public count = 0;

  private _counter = 1;

  /** Constructor */
  constructor(private _stompService: StompService) {
  }

  ngOnInit() {
    this.subscribed = false;

    // Store local reference to Observable
    // for use with template ( | async )
    this.subscribe();
    console.log('Status init');
    this.state = this._stompService.state
      .map((state: number) => StompState[state]);
  }

  public subscribe() {
    if (this.subscribed) {
      return;
    }

    // Stream of messages
    this.messages = this._stompService.subscribe('/topic/chat.message');

    // Subscribe a function to be run on_next message
    // this.subscription = this.messages.subscribe(this.on_next);

    this.subscribed = true;
  }

  public unsubscribe() {
    if (!this.subscribed) {
      return;
    }

    // This will internally unsubscribe from Stomp Broker
    // There are two subscriptions - one created explicitly, the other created in the template by use of 'async'
    this.subscription.unsubscribe();
    this.subscription = null;
    this.messages = null;

    this.subscribed = false;
  }

  ngOnDestroy() {
    this.unsubscribe();
  }


  // mySplit = function (string) {
  //   let array = string.split('@');
  //   return array[0];
  // };
  //
  // sendMessage() {
  //
  //   if (this.newMessage !== "") {
  //     let destination = "/app/chat.message";
  //
  //     if (this.sendTo != "everyone") {
  //       destination = "/app/chat.private." + this.sendTo;
  //       this.messages.unshift({
  //         message: this.newMessage,
  //         username: 'you',
  //         priv: true,
  //         to: this.sendTo
  //       });
  //     }
  //
  //     this.newMessage = this.newMessage.replace(/[\r\n]/g, " <br/> ");
  //
  //     this.socketService.send(destination, {}, JSON.stringify({message: this.newMessage}));
  //     this.newMessage = '';
  //   }
  // };

  // sendMessageRemove(id) {
  //   let destination = "/app/chat.message.remove";
  //
  //   // if(this.sendTo != "everyone") {
  //   //     destination = "/app/chat.private." + this.sendTo;
  //   //     this.messages.unshift({message: this.newMessage, username: 'you', priv: true, to: this.sendTo});
  //   // }
  //
  //   chatSocket.send(destination, {}, JSON.stringify({id:id}));
  //   // this.newMessage = '';
  // };
  // //
  // sendAds = function() {
  //   var destination = "/app/chat.ads";
  //
  //   chatSocket.send(destination, {}, JSON.stringify({message: this.ads.toString()}));
  //   // this.ads = true;
  // };
  //
  // startTyping(){
  //
  //   // Don't send notification if we are still typing or we are typing a private message
  //   if (angular.isDefined(typing) || this.sendTo != "everyone") return;
  //
  //   typing = $interval(function() {
  //     this.stopTyping();
  //   }, 500);
  //
  //   chatSocket.send("/topic/chat.typing", {}, JSON.stringify({username: this.username, typing: true}));
  // };
  //
  // stopTyping = function() {
  //   if (angular.isDefined(typing)) {
  //     $interval.cancel(typing);
  //     typing = undefined;
  //
  //     chatSocket.send("/topic/chat.typing", {}, JSON.stringify({username: this.username, typing: false}));
  //   }
  // };
  //
  // privateSending(username) {
  //   this.sendTo = (username != this.sendTo) ? username : 'everyone';
  // };
  //
  // initStompClient() {
  //
  //   // chatSocket.init('/ws');
  //
  //   connectAndReconnect(successConnect);
  //
  //   function connectAndReconnect(successCallback) {
  //     chatSocket.init('/ws');
  //     chatSocket.connect(function(frame) {
  //       successCallback(frame);
  //     }, function() {
  //       setTimeout(function() {
  //         toaster.pop('error', 'Error', 'Connection error. Trying to reconnect...');
  //         connectAndReconnect(successCallback);
  //       }, 5000);
  //     });
  //
  //
  //   }
  //
  // };


  // successConnect(frame) {
  //
  //   this.messages = [];
  //
  //   $http.get('/chatmessages/?size=2000').success(function(data){
  //     var messages = data['_embedded']['chatmessages'];
  //     for (var i=0; i < messages.length; i++){
  //       this.messages.unshift({id: messages[i]['id'], username: messages[i]['username'], message : messages[i]['message'], time: messages[i]['time']});
  //     }
  //   });
  //
  //   $http.get('/options').success(function(data){
  //
  //     var options = data['_embedded']['options'];
  //     var lastOptions = options[options.length - 1];
  //     // for (var i=0; i < messages.length; i++){
  //     //     this.messages.unshift({id: messages[i]['id'], username: messages[i]['username'], message : messages[i]['message'], time: messages[i]['time']});
  //     // }
  //
  //     if (JSON.parse(lastOptions.showAds).message === "true") {
  //       this.ads = true;
  //       console.log("true");
  //     }
  //     else {
  //       this.ads=false;
  //       console.log("false");
  //     }
  //   });
  //
  //   this.username = frame.headers['user-name'];
  //
  //   chatSocket.subscribe("/app/chat.participants", function(message) {
  //     this.participants = JSON.parse(message.body);
  //   });
  //
  //   chatSocket.subscribe("/topic/chat.login", function(message) {
  //     this.participants.unshift({username: JSON.parse(message.body).username, typing : false});
  //   });
  //
  //   chatSocket.subscribe("/topic/chat.logout", function(message) {
  //     var username = JSON.parse(message.body).username;
  //     for(var index in this.participants) {
  //       if(this.participants[index].username == username) {
  //         this.participants.splice(index, 1);
  //       }
  //     }
  //   });
  //
  //   chatSocket.subscribe("/topic/chat.typing", function(message) {
  //     var parsed = JSON.parse(message.body);
  //     if(parsed.username == this.username) return;
  //
  //     for(var index in this.participants) {
  //       var participant = this.participants[index];
  //
  //       if(participant.username == parsed.username) {
  //         this.participants[index].typing = parsed.typing;
  //       }
  //     }
  //   });
  //
  //   chatSocket.subscribe("/topic/chat.message", function(message) {
  //     this.messages.unshift(JSON.parse(message.body));
  //   });
  //
  //   chatSocket.subscribe("/topic/chat.message.remove", function(message) {
  //     for (var i=0; i<this.messages.length;i++) {
  //       if (this.messages[i]['id'] == JSON.parse(message.body).id) {
  //         this.messages.splice(i,1); // removes the matched element
  //         i = this.messages.length;  // break out of the loop. Not strictly necessary
  //       }
  //     }
  //   });
  //
  //   chatSocket.subscribe("/topic/chat.ads", function(message) {
  //     if (JSON.parse(message.body).message === "true")
  //       this.ads=true;
  //     else this.ads=false;
  //   });
  //
  //   chatSocket.subscribe("/user/exchange/amq.direct/chat.message", function(message) {
  //     var parsed = JSON.parse(message.body);
  //     parsed.priv = true;
  //     this.messages.unshift(parsed);
  //   });
  //
  //   chatSocket.subscribe("/user/exchange/amq.direct/errors", function(message) {
  //     toaster.pop('error', "Error", message.body);
  //   });
  //
  // }

  // initStompClient();

}
