import { Component } from '@angular/core';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private stompClient;
  private connected = false;
  private serverUrl = 'http://localhost:8080/socket';

  constructor(){
    // this.initializeWebSocketConnection();
  }

  // private wrappedSocket = {
  //   init: function(url) {
  //     this.stompClient = Stomp.over(new SockJS(url));
  //     this.stompClient.debug = null;
  //   },
  //   connect: function(successCallback, errorCallback) {
  //     this.stompClient.connect({}, function(frame) {
  //       this.connected = true;
  //       $rootScope.$apply(function () {
  //         successCallback(frame);
  //       });
  //     }, function(error) {
  //       $rootScope.$apply(function(){
  //         errorCallback(error);
  //       });
  //     });
  //   },
  //
  //   subscribe : function(destination, callback) {
  //     stompClient.subscribe(destination, function(message) {
  //       $rootScope.$apply(function(){
  //         callback(message);
  //       });
  //     });
  //   },
  //   send: function(destination, headers, object) {
  //     stompClient.send(destination, headers, object);
  //   }
  // }
  //
  // return wrappedSocket;



  // initializeWebSocketConnection(){
  //   let ws = new SockJS(this.serverUrl);
  //   this.stompClient = Stomp.over(ws);
  //   let that = this;
  //   this.stompClient.connect({}, function(frame) {
  //     that.stompClient.subscribe("/chat", (message) => {
  //       if(message.body) {
  //         $(".chat").append("<div class='message'>"+message.body+"</div>")
  //         console.log(message.body);
  //       }
  //     });
  //   });
  // }
  //
  // sendMessage(message){
  //   this.stompClient.send("/app/chat.message" , {}, message);
  //   $('#input').val('');
  // }


}



