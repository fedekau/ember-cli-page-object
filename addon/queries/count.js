import Ember from 'ember';
import { findElement } from '../helpers';

var $ = Ember.$;

/**
 * Returns the number of elements matched by a selector.
 *
 * @example
 *
 * // <span>1</span>
 * // <span>2</span>
 *
 * const page = PageObject.create({
 *   spanCount: PageObject.count('span')
 * });
 *
 * assert.equal(page.spanCount, 2);
 *
 * @example
 *
 * // <div>Text</div>
 *
 * const page = PageObject.create({
 *   spanCount: PageObject.count('span')
 * });
 *
 * assert.equal(page.spanCount, 0);
 *
 * @example
 *
 * // <div><span></span></div>
 * // <div class="scope"><span></span><span></span></div>
 *
 * const page = PageObject.create({
 *   spanCount: PageObject.count('span', { scope: '.scope' })
 * });
 *
 * assert.equal(page.spanCount, 2)
 *
 * @example
 *
 * // <div><span></span></div>
 * // <div class="scope"><span></span><span></span></div>
 *
 * const page = PageObject.create({
 *   scope: '.scope',
 *   spanCount: PageObject.count('span')
 * });
 *
 * assert.equal(page.spanCount, 2)
 *
 * @example
 *
 * // <div><span></span></div>
 * // <div class="scope"><span></span><span></span></div>
 *
 * const page = PageObject.create({
 *   scope: '.scope',
 *   spanCount: PageObject.count('span', { resetScope: true })
 * });
 *
 * assert.equal(page.spanCount, 1);
 *
 * @public
 *
 * @param {string} selector - CSS selector of the element or elements to check
 * @param {Object} options - Additional options
 * @param {string} options.scope - Add scope
 * @param {boolean} options.resetScope - Ignore parent scope
 * @param {String} options.testContainer - Context where to search elements in the DOM
 * @return {Descriptor}
 */
export function count(selector, options = {}) {
  return {
    isDescriptor: true,

    get() {
      let countOptions = {};

      $.extend(true, countOptions, options, { multiple: true });

      return findElement(this, selector, countOptions).length;
    }
  };
}
