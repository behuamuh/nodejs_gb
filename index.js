const cp = require('child_process');
const ansi = require('ansi');

const cursor = ansi(process.stdout);
const oddWorker = cp.fork('./odd-worker.js');
const evenWorker = cp.fork('./even-worker.js');
const workers = [oddWorker, evenWorker];
const numbers = Array.from(new Array(20), (_, i) => i + 1);
let done = 0;

workers.forEach(worker => {
  worker.send({ numbers });

  worker.on('message', msg => {
    const isOddWorker = worker.pid === oddWorker.pid;
    const title = isOddWorker ? 'ODDS: ' : 'EVENS: ';
    
    isOddWorker ? cursor.fg.red() : cursor.fg.blue();

    cursor.bg.white()
      .write(title)
      .write(msg.result.join(' '))
      .reset()
      .write('\n');

    if (++done === workers.length) process.exit(0);
  });
});

setTimeout(() => process.exit(1), 5000);
