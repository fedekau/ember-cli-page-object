import { test } from 'qunit';
import { fixture, moduleFor } from '../test-helper';
import { create, text } from '../../page-object';
import {
  test_throws_if_not_multiple
} from '../shared';

moduleFor('Unit | Property | .text');

test('returns the inner text of the element', function(assert) {
  fixture('Hello <span>world!</span>');

  let page = create({
    foo: text('span')
  });

  assert.equal(page.foo, 'world!');
});

test('removes white spaces from the beginning and end of the text', function(assert) {
  fixture('<span>  awesome!  </span>');

  let page = create({
    foo: text('span')
  });

  assert.equal(page.foo, 'awesome!');
});

test('normalizes inner text of the element containing newlines', function(assert) {
  fixture(['<span>', 'Hello', 'multi-line', 'world!', '</span>'].join("\n"));

  let page = create({
    foo: text('span')
  });

  assert.equal(page.foo, 'Hello multi-line world!');
});

test('avoid text normalization if normalize:false', function(assert) {
  const denormalizedText = [' \n ', 'Hello', 'multi-line', 'world! ', '\t', '\n'].join('\n');
  fixture(`<span>${denormalizedText}</span>`);

  let page = create({
    foo: text('span', { normalize: false })
  });

  assert.equal(page.foo, denormalizedText);
});

test('converts &nbsp; characters into standard whitespace characters', function(assert) {
  fixture('<span>This&nbsp;is&nbsp;awesome.</span>');

  let page = create({
    foo: text('span')
  });

  assert.equal(page.foo, 'This is awesome.');
});

test('returns empty text when the element doesn\'t have text', function(assert) {
  fixture('<span />');

  let page = create({
    foo: text('span')
  });

  assert.equal(page.foo, '');
});

test("raises an error when the element doesn't exist", function(assert) {
  let page = create({
    foo: {
      bar: {
        baz: {
          qux: text('span')
        }
      }
    }
  });

  assert.throws(() => page.foo.bar.baz.qux, /page\.foo\.bar\.baz\.qux/);
});

test('looks for elements inside the scope', function(assert) {
  fixture(`
    <div><span>lorem</span></div>
    <div class="scope"><span>ipsum</span></div>
    <div><span>dolor</span></div>
  `);

  let page = create({
    foo: text('span', { scope: '.scope' })
  });

  assert.equal(page.foo, 'ipsum');
});

test("looks for elements inside page's scope", function(assert) {
  fixture(`
    <div><span>lorem</span></div>
    <div class="scope"><span>ipsum</span></div>
    <div><span>dolor</span></div>
  `);

  let page = create({
    scope: '.scope',

    foo: text('span')
  });

  assert.equal(page.foo, 'ipsum');
});

test('resets scope', function(assert) {
  fixture(`
    <div><span>lorem</span></div>
    <div class="scope"><span> ipsum </span></div>
    <div><span>dolor</span></div>
  `);

  let page = create({
    scope: '.scope',

    foo: text('span', { at: 0, resetScope: true })
  });

  assert.equal(page.foo, 'lorem');
});

test('finds element by index', function(assert) {
  fixture(`
    <span>lorem</span>
    <span>ipsum</span>
    <span>dolor</span>
  `);

  let page = create({
    foo: text('span', { at: 1 })
  });

  assert.equal(page.foo, 'ipsum');
});

test('finds element without using a selector', function(assert) {
  fixture('<div>Hello <span>world!</span></div>');

  let page = create({
    scope: 'div',

    foo: text(),

    bar: {
      scope: 'span',

      baz: text()
    }
  });

  assert.equal(page.foo, 'Hello world!');
  assert.equal(page.bar.baz, 'world!');
});

test_throws_if_not_multiple(function() {
  fixture(`
    <span>lorem</span>
    <span> ipsum </span>
    <span>dolor</span>
  `);

  let page = create({
    scope: '.scope',

    foo: text('span', { resetScope: true })
  });

  return page.foo;
});

test('returns multiple values', function(assert) {
  fixture(`
    <ul>
      <li>lorem</li>
      <li> ipsum </li>
      <li>dolor</li>
    </ul>
  `);

  var page = create({
    foo: text('li', { multiple: true })
  });

  assert.deepEqual(page.foo, ['lorem', 'ipsum', 'dolor']);
});

test('looks for elements outside the testing container', function(assert) {
  fixture('<h1>lorem ipsum</h1>', { useAlternateContainer: true });

  var page = create({
    foo: text('h1', { testContainer: '#alternate-ember-testing' })
  });

  assert.equal(page.foo, 'lorem ipsum');
});
