import Ember from 'ember';
import { findElement, simpleFindElementWithAssert, buildSelector, getContext } from '../helpers';

/* global wait, click */

const merge = Ember.assign || Ember.merge;
const { run } = Ember;

function childSelector(tree, selector, textToClick, options) {
  // Suppose that we have something like `<form><button>Submit</button></form>`
  // In this case <form> and <button> elements contains "Submit" text, so, we'll
  // want to __always__ click on the __last__ element that contains the text.
  var selectorWithSpace = (selector || '') + ' ';
  var opts = merge({ contains: textToClick, last: true, multiple: true }, options);
  var fullSelector = buildSelector(tree, selectorWithSpace, opts);

  if (findElement(tree, selectorWithSpace, opts).length) {
    return fullSelector;
  }
}

function actualSelector(tree, selector, textToClick, options) {
  var childSel = childSelector(tree, selector, textToClick, options);

  if (childSel) {
    return childSel;
  } else {
    return buildSelector(tree, selector, merge({ contains: textToClick }, options));
  }
}

function clickOnTextInternal(tree, selector, textToClick, options, context) {
  var fullSelector = actualSelector(tree, selector, textToClick, options);

  // Run this to validate if the element exists
  simpleFindElementWithAssert(tree, fullSelector, options);

  if (context) {
    if (options.testContainer) {
      Ember.$(fullSelector, options.testContainer).click();
    } else {
      context.$(fullSelector).click();
    }
  } else {
    click(fullSelector, options.testContainer);
  }
}

/**
 * Clicks on an element containing specified text.
 *
 * The element can either match a specified selector,
 * or be inside an element matching the specified selector.
 *
 * @example
 *
 * // <fieldset>
 * //  <button>Lorem</button>
 * //  <button>Ipsum</button>
 * // </fieldset>
 *
 * const page = PageObject.create({
 *   clickOnFieldset: PageObject.clickOnText('fieldset'),
 *   clickOnButton: PageObject.clickOnText('button')
 * });
 *
 * // queries the DOM with selector 'fieldset :contains("Lorem"):last'
 * page.clickOnFieldset('Lorem');
 *
 * // queries the DOM with selector 'button:contains("Ipsum")'
 * page.clickOnButton('Ipsum');
 *
 * @example
 *
 * // <div class="scope">
 * //   <fieldset>
 * //    <button>Lorem</button>
 * //    <button>Ipsum</button>
 * //   </fieldset>
 * // </div>
 *
 * const page = PageObject.create({
 *   clickOnFieldset: PageObject.clickOnText('fieldset', { scope: '.scope' }),
 *   clickOnButton: PageObject.clickOnText('button', { scope: '.scope' })
 * });
 *
 * // queries the DOM with selector '.scope fieldset :contains("Lorem"):last'
 * page.clickOnFieldset('Lorem');
 *
 * // queries the DOM with selector '.scope button:contains("Ipsum")'
 * page.clickOnButton('Ipsum');
 *
 * @example
 *
 * // <div class="scope">
 * //   <fieldset>
 * //    <button>Lorem</button>
 * //    <button>Ipsum</button>
 * //   </fieldset>
 * // </div>
 *
 * const page = PageObject.create({
 *   scope: '.scope',
 *   clickOnFieldset: PageObject.clickOnText('fieldset'),
 *   clickOnButton: PageObject.clickOnText('button')
 * });
 *
 * // queries the DOM with selector '.scope fieldset :contains("Lorem"):last'
 * page.clickOnFieldset('Lorem');
 *
 * // queries the DOM with selector '.scope button:contains("Ipsum")'
 * page.clickOnButton('Ipsum');
 *
 * @public
 *
 * @param {string} selector - CSS selector of the element in which to look for text
 * @param {Object} options - Additional options
 * @param {string} options.scope - Nests provided scope within parent's scope
 * @param {number} options.at - Reduce the set of matched elements to the one at the specified index
 * @param {boolean} options.visible - Make the action to raise an error if the element is not visible
 * @param {boolean} options.resetScope - Override parent's scope
 * @param {String} options.testContainer - Context where to search elements in the DOM
 * @return {Descriptor}
 */
export function clickOnText(selector, options = {}) {
  return {
    isDescriptor: true,

    get(key) {
      return function(textToClick) {
        var context = getContext(this);

        if (context) {
          run(() => clickOnTextInternal(this, selector, textToClick, { ...options, pageObjectKey: `${key}("${textToClick}")` }, context));
        } else {
          wait().then(() => clickOnTextInternal(this, selector, textToClick, { ...options, pageObjectKey: `${key}("${textToClick}")` }));
        }

        return this;
      };
    }
  };
}
