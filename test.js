/**
 * @license
 * VueLocale <https://www.sebastian-software.de/oss>
 * Copyright 2015-2016 Sebastian Software GmbH
 * Released under Apache 2.0 <http://www.apache.org/licenses/LICENSE-2.0>
 * Authors: Sebastian Werner <s.werner@sebastian-software.de>
 */

import test from "ava"
import "babel-register"

import VueLocale from "./src/VueLocale"

// Exports the later used global IntlPolyfill
import "intl"

/* eslint camelcase: 0 */
/* global IntlPolyfill */
// Import three common locales for testing
import intl_en from "intl/locale-data/json/en.json"
import intl_de from "intl/locale-data/json/de.json"
import intl_fr from "intl/locale-data/json/fr.json"
import intl_es from "intl/locale-data/json/es.json"

IntlPolyfill.__addLocaleData(intl_en)
IntlPolyfill.__addLocaleData(intl_de)
IntlPolyfill.__addLocaleData(intl_fr)
IntlPolyfill.__addLocaleData(intl_es)


// The formatting for relative dates uses custom data
import IntlRelativeFormat from "intl-relativeformat"

import relative_en from "./data/en.json"
import relative_de from "./data/de.json"
import relative_fr from "./data/fr.json"
import relative_es from "./data/es.json"

IntlRelativeFormat.__addLocaleData(relative_en)
IntlRelativeFormat.__addLocaleData(relative_de)
IntlRelativeFormat.__addLocaleData(relative_fr)
IntlRelativeFormat.__addLocaleData(relative_es)


function getFakeVue() {
  function FakeVue() {
    // nothing to do
  }

  FakeVue.filters = {}
  FakeVue.directives = {}

  FakeVue.filter = function(name, callback) {
    FakeVue.filters[name] = callback
  }

  FakeVue.directive = function(name, callback) {
    FakeVue.directives[name] = callback
  }

  return FakeVue
}

test("VueLocale Plugin is valid", (api) => {
  api.same(typeof VueLocale, "object")
  api.same(typeof VueLocale.install, "function")
})

test("Installation works", (api) => {
  var FakeVue = getFakeVue()

  api.notThrows(() => {
    VueLocale.install(FakeVue, {
      language: "de-DE",
      currency: "EUR",
      messages: {}
    })
  })
})

test("Check Prototype Methods Exists", (api) => {
  var FakeVue = getFakeVue()

  VueLocale.install(FakeVue, {
    language: "de-DE",
    currency: "EUR",
    messages: {}
  })

  api.same(typeof FakeVue.prototype.$formatMessage, "function")
  api.same(typeof FakeVue.prototype.$formatDate, "function")
  api.same(typeof FakeVue.prototype.$formatTime, "function")
  api.same(typeof FakeVue.prototype.$formatNumber, "function")
  api.same(typeof FakeVue.prototype.$formatRelative, "function")
})
