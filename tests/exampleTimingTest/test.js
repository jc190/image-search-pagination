const test = require('tape'); // Required for every test file

test('Timing test', (t) => { // First argument is the test name, second the test fuction with (t)ape passed to it
  // Set number of expected assertations
  t.plan(2);

  // Expect ===
  t.equal(typeof Date.now, 'function'); // First argument is value, second is expected value

  // Current time
  const time = Date.now();

  setTimeout(() => {
    // Expect !==
    t.notEqual(Date.now() - time, 1000);
  }, 100);
});
