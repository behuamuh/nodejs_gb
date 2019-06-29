const isEven = require('is-even');

process.on('message', msg => {
  const result = msg.numbers.filter(isEven);

  if (process.send) process.send({ result });
});
