var sass = require('sass');

function render(data) {
  return new Promise(function(resolve, reject) {
    sass.render({ data, includePaths: ['./'], precision: 5 }, function(err, data) {
      if (err !== null) reject(err);
      else resolve(data.css.toString());
    });
  });
}

async function run(input, output, config = `@use "." as em;`) {
  const a = await render(config.concat(input));
  const b = await render(output);
  expect(a).toEqual(b);
};

it('Simple', () => run(
  '.simple { font-size: em.convert(24px, 16px); }',
  '.simple { font-size: 1.5em; }'
));

it('Multiple values', () => run(
  '.multiple { padding: em.convert(5px 10px, 16px); }',
  '.multiple { padding: 0.3125em 0.625em; }'
));

it('Multiple mixed values', () => run(
  '.mixed { border-bottom: em.convert(1px solid black, 16px); }',
  '.mixed { border-bottom: 0.0625em solid black; }'
));

it('Comma-separated values', () => run(
  '.comma { box-shadow: em.convert(0 0 2px #ccc, inset 0 0 5px #eee, 16px); }',
  '.comma { box-shadow: 0 0 0.125em #ccc, inset 0 0 0.3125em #eee; }'
));

it('Alternate use', () => run(
  '.alternate { text-shadow: em.convert(1px 1px, 16px) #eee, em.convert(-1px, 16px) 0 #eee; }',
  '.alternate { text-shadow: 0.0625em 0.0625em #eee, -0.0625em 0 #eee; }',
));

it('Multiple properties', () => run(
  '.multiple-properties { @include em.convert((font-size: 24px, margin: 10px 1.5em), 16px); }',
  '.multiple-properties { font-size: 1.5em; margin: 0.625em 1.5em; }',
));

it('Changing namespace', () => run(
  '.changing-namespace { font-size: to.em(24px, 16px); }',
  '.changing-namespace { font-size: 1.5em; }',
  '@use "." as to;',
));

it('Global namespace', () => run(
  '.global-namespace { font-size: em(24px, 16px); }',
  '.global-namespace { font-size: 1.5em; }',
  '@use "." as *;',
));

it('Legacy import', () => run(
  '.legacy-import { @include em((font-size: 24px), 16px); margin: em(10px 1.5em, 16px); }',
  '.legacy-import { font-size: 1.5em; margin: 0.625em 1.5em; }',
  '@import ".";',
));

it('Demo', () => run(`$base-font-size: 16px;
$h1-font-size: 24px;

.demo {
  font-size: em.convert($h1-font-size, $base-font-size); // Simple
  border-bottom: em.convert(1px solid black, $h1-font-size); // Shorthand
  box-shadow: em.convert(0 0 2px #ccc, inset 0 0 5px #eee, $h1-font-size); // Multiple values
  // Multiple properties
  @include em.convert((
    margin: 20px 5%,
    padding: 10px
  ), $h1-font-size);
}`,`.demo {
  font-size: 1.5em;
  border-bottom: 0.0416666667em solid black;
  box-shadow: 0 0 0.0833333333em #ccc, inset 0 0 0.2083333333em #eee;
  margin: 0.8333333333em 5%;
  padding: 0.4166666667em;
}`
));
