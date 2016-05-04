import Ember from 'ember';
import { simpleFindElementWithAssert, buildSelector, getContext } from '../helpers';

function fillableInternal(tree, selector, text, options, context) {
  var fullSelector = buildSelector(tree, selector, options);

  // Run this to validate if the element exists
  simpleFindElementWithAssert(tree, fullSelector, options);

  if (context) {
    var $el;

    if (options.testContainer) {
      $el = Ember.$(fullSelector, options.testContainer);
    } else {
      $el = context.$(fullSelector);
    }

    $el.val(text);
    $el.trigger('input');
    $el.change();
  } else {
    /* global fillIn */
    if (options.testContainer) {
      fillIn(fullSelector, options.testContainer, text);
    } else {
      fillIn(fullSelector, text);
    }
  }
}

/**
 * Alias for `fillable`, which works for inputs and HTML select menus.
 *
 * [See `fillable` for usage examples.](#fillable)
 *
 * @name selectable
 * @function
 *
 * @public
 *
 * @param {string} selector - CSS selector of the element to look for text
 * @param {Object} options - Additional options
 * @param {string} options.scope - Nests provided scope within parent's scope
 * @param {number} options.at - Reduce the set of matched elements to the one at the specified index
 * @param {boolean} options.resetScope - Override parent's scope
 * @param {String} options.testContainer - Context where to search elements in the DOM
 * @return {Descriptor}
 */

/**
 * Fills in an input matched by a selector.
 *
 * @example
 *
 * // <input value="">
 *
 * const page = PageObject.create({
 *   fillIn: PageObject.fillable('input')
 * });
 *
 * // result: <input value="John Doe">
 * page.fillIn('John Doe');
 *
 * @example
 *
 * // <div class="name">
 * //   <input value="">
 * // </div>
 * // <div class="last-name">
 * //   <input value= "">
 * // </div>
 *
 * const page = PageObject.create({
 *   fillInName: PageObject.fillable('input', { scope: '.name' })
 * });
 *
 * page.fillInName('John Doe');
 *
 * // result
 * // <div class="name">
 * //   <input value="John Doe">
 * // </div>
 *
 * @example
 *
 * // <div class="name">
 * //   <input value="">
 * // </div>
 * // <div class="last-name">
 * //   <input value= "">
 * // </div>
 *
 * const page = PageObject.create({
 *   scope: 'name',
 *   fillInName: PageObject.fillable('input')
 * });
 *
 * page.fillInName('John Doe');
 *
 * // result
 * // <div class="name">
 * //   <input value="John Doe">
 * // </div>
 *
 * @public
 *
 * @param {string} selector - CSS selector of the element to look for text
 * @param {Object} options - Additional options
 * @param {string} options.scope - Nests provided scope within parent's scope
 * @param {number} options.at - Reduce the set of matched elements to the one at the specified index
 * @param {boolean} options.resetScope - Override parent's scope
 * @param {String} options.testContainer - Context where to search elements in the DOM
 * @return {Descriptor}
 */
export function fillable(selector, options = {}) {
  return {
    isDescriptor: true,

    get(key) {
      return function(text) {
        var context = getContext(this);

        if (context) {
          Ember.run(() => fillableInternal(this, selector, text, { ...options, pageObjectKey: `${key}("${text}")` }, context));
        } else {
          wait().then(() => fillableInternal(this, selector, text, { ...options, pageObjectKey: `${key}("${text}")` }, context));
        }

        return this;
      };
    }
  };
}
