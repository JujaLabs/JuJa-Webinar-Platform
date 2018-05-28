import {Injectable} from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import {Observable} from 'rxjs/Observable';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

@Injectable()
export class SocketService {

  private stompClient;
  private connected = false;

  constructor (){
  }

  init(url: string) {
    // this.stompClient = Stomp.over(new SockJS(url));
    this.stompClient = Stomp.over(new SockJS('/ws'));
    Stomp.
    this.stompClient.debug = null;
  }

  connect(successCallback, errorCallback) {
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.connected = true;
      // $rootScope.$apply(function () {
      //   successCallback(frame);
      // });
      console.log("Connect OK");
    }, function (error) {
      that.connected = false;
      // $rootScope.$apply(function () {
      //   errorCallback(error);
      // });
      console.log("Connect FAIL");
    });
  };

  subscribe(destination, callback) {
    this.stompClient.subscribe(destination, (message) => {
      callback(message);
    });
    // $rootScope.$apply(function () {
    //   callback(message);
    // });
    // });
  };

  send(destination, headers, object) {
    this.stompClient.send(destination, headers, object);
  };


// getLinkById(id: string) {
//   return this.http.get('/api/links/' + id)
//     .map(
//       (response: Response) => {
//         return response.json();
//       }
//     );
// }
}
