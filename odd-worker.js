const isOdd = require('is-odd');

process.on('message', msg => {
  const result = msg.numbers.filter(isOdd);

  if (process.send) process.send({ result });
});
