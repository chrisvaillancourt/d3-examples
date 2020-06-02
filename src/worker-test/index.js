// main.js
import { PWBHost } from 'promise-worker-bi';

var worker = new Worker('worker.js');
var promiseWorker = new PWBHost(worker);

// Only needed if you send messages from the worker to the host
promiseWorker.register(function (message) {
  return 'pong2';
});

promiseWorker
  .postMessage('ping')
  .then(function (response) {
    // handle response 'pong'
  })
  .catch(function (error) {
    // handle error
  });
