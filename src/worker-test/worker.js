import { PWBWorker } from 'promise-worker-bi';

var promiseWorker = new PWBWorker();

// Only needed if you send messages from the host to the worker
promiseWorker.register(function (message) {
  return 'pong';
});

promiseWorker
  .postMessage('ping2')
  .then(function (response) {
    // handle response 'pong2'
  })
  .catch(function (error) {
    // handle error
  });
