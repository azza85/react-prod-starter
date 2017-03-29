import React from 'react';
import reactDom from 'react-dom/server';
import test from 'tape';
import dom from 'cheerio';

import createTitle from '../../../components/Home/Home';

const Title = createTitle(React);
const render = reactDom.renderToStaticMarkup;

test('Home', assert => {
  const titleText = 'Hello!';
  const props = {
    title: titleText,
    titleClass: 'home'
  };
  const re = new RegExp(titleText, 'g');

  const el = <Home { ...props } />;
  const $ = dom.load(render(el));
  const output = $('.home').html();
  const actual = re.test(output);
  const expected = true;

  assert.equal(actual, expected,
    'should output the correct title text');
  assert.end();
});