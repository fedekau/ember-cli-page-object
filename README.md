# Ember Page Objects

[![Build Status](https://travis-ci.org/san650/ember-cli-page-object.svg?branch=master)](https://travis-ci.org/san650/ember-cli-page-object)
![Latest version](https://img.shields.io/npm/v/ember-cli-page-object.svg)

Represent the screens of your web app as a series of objects. This ember-cli
addon eases the construction of these objects for your acceptance and
integration tests.

http://ember-cli-page-object.js.org/

## What is a Page Object?

An excerpt from the Selenium Wiki
> Within your web app's UI there are areas that your tests interact with. A Page
> Object simply models these as objects within the test code. This reduces the
> amount of duplicated code and means that if the UI changes, the fix need only
> be applied in one place.

The pattern was first introduced by the Selenium

You can find more information about this design pattern here:
* [Page Objects - Selenium wiki](https://seleniumhq.github.io/docs/best.html#page_object_models)
* [PageObject - Martin Fowler](http://martinfowler.com/bliki/PageObject.html)

## Community

Let's work together to improve this addon!

You can find us on the [official Slack](https://ember-community-slackin.herokuapp.com/), join the `ec-page-object` channel or [open an issue on Github](https://github.com/san650/ember-cli-page-object/issues) to request features, report bugs or just to ask any question.

## Installation

```sh
$ ember install ember-cli-page-object
```

Or you can install the NPM package directly.

```sh
$ npm install --save-dev ember-cli-page-object@1.1.0
```

## Documentation

Check the [site](http://ember-cli-page-object.js.org/) for full documentation.

## Blueprints

The addon includes the following blueprints

* `page-object` Creates a new page object
* `page-object-component` Creates a new component to be used in a page object
* `page-object-helper` Creates a new helper to be used in a page object

You can create a new page object called `users` using the `generate` command

```sh
$ ember generate page-object users

installing
  create tests/pages/users.js
```


## Development

### Installation

```sh
$ git clone https://github.com/san650/ember-cli-page-object.git
$ cd $_
$ npm install
$ bower install
```

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Project's health

[![Build Status](https://travis-ci.org/san650/ember-cli-page-object.svg?branch=master)](https://travis-ci.org/san650/ember-cli-page-object)
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-page-object.svg)](http://emberobserver.com/addons/ember-cli-page-object)
[![Dependency Status](https://david-dm.org/san650/ember-cli-page-object.svg)](https://david-dm.org/san650/ember-cli-page-object)
[![devDependency Status](https://david-dm.org/san650/ember-cli-page-object/dev-status.svg)](https://david-dm.org/san650/ember-cli-page-object#info=devDependencies)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/35545e8e8ade48dfa999a3f5e1aa4b3b)](https://www.codacy.com/app/san650/ember-cli-page-object)
[![Code Climate](https://codeclimate.com/github/san650/ember-cli-page-object/badges/gpa.svg)](https://codeclimate.com/github/san650/ember-cli-page-object)

### Maintainers

- Santiago Ferreira (@san650)
- Juan Manuel Azambuja (@juanazam)
- Jerad Gallinger (@jeradg)

## License

ember-cli-page-object is licensed under the MIT license.

See [LICENSE](./LICENSE) for the full license text.
