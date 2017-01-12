import test from 'ava'
import React from 'react'
import { shallow, mount } from 'enzyme';

import Foo from '../../../app/containers/Foo/Foo'

test('shallow', t => {
  const wrapper = shallow(<Foo />)
  t.is(wrapper.contains(<span>Foo</span>), true)
})

test(t => {
    t.deepEqual([1, 2], [1, 2]);
});

test('my passing test', t => {
    t.pass();
});

test.todo('will think about writing this later');

test.failing('demonstrate some bug', t => {
    t.fail(); // test will count as passed
});
