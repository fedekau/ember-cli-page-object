import { findElementWithAssert, map, normalizeText } from '../helpers';

/**
 * Returns text of the element or Array of texts of all matched elements by selector.
 *
 * @example
 *
 * // Hello <span>world!</span>
 *
 * const page = PageObject.create({
 *   text: PageObject.text('span')
 * });
 *
 * assert.equal(page.text, 'world!');
 *
 * @example
 *
 * // <span>lorem</span>
 * // <span> ipsum </span>
 * // <span>dolor</span>
 *
 * const page = PageObject.create({
 *   texts: PageObject.text('span', { multiple: true })
 * });
 *
 * assert.deepEqual(page.texts, ['lorem', 'ipsum', 'dolor']);
 *
 * @example
 *
 * // <div><span>lorem</span></div>
 * // <div class="scope"><span>ipsum</span></div>
 * // <div><span>dolor</span></div>
 *
 * const page = PageObject.create({
 *   text: PageObject.text('span', { scope: '.scope' })
 * });
 *
 * assert.equal(page.text, 'ipsum');
 *
 * @example
 *
 * // <div><span>lorem</span></div>
 * // <div class="scope"><span>ipsum</span></div>
 * // <div><span>dolor</span></div>
 *
 * const page = PageObject.create({
 *   scope: '.scope',
 *   text: PageObject.text('span')
 * });
 *
 * // returns 'ipsum'
 * assert.equal(page.text, 'ipsum');
 *
 * @example
 *
 * // <div><span>lorem</span></div>
 * // <div class="scope">
 * //  ipsum
 * // </div>
 * // <div><span>dolor</span></div>
 *
 * const page = PageObject.create({
 *   scope: '.scope',
 *   text: PageObject.text('span', { normalize: false })
 * });
 *
 * // returns 'ipsum'
 * assert.equal(page.text, '\n ipsum\n');
 *
 * @public
 *
 * @param {string} selector - CSS selector of the element to check
 * @param {Object} options - Additional options
 * @param {string} options.scope - Nests provided scope within parent's scope
 * @param {number} options.at - Reduce the set of matched elements to the one at the specified index
 * @param {boolean} options.resetScope - Override parent's scope
 * @param {boolean} options.multiple - Return an array of values
 * @param {boolean} options.normalize - Set to `false` to avoid text normalization
 * @param {String} options.testContainer - Context where to search elements in the DOM
 * @return {Descriptor}
 *
 * @throws Will throw an error if no element matches selector
 * @throws Will throw an error if multiple elements are matched by selector and multiple option is not set
 */
export function text(selector, options = {}) {
  return {
    isDescriptor: true,

    get(key) {
      const elements = findElementWithAssert(this, selector, { ...options, pageObjectKey: key });
      const avoidNormalization = options.normalize === false;
      const result = map(elements, (element) => avoidNormalization ? element.text() : normalizeText(element.text()));

      return options.multiple ? result : result[0];
    }
  };
}
