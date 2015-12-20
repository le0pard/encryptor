import React from 'react'
import ReactDom from 'react-dom'
import {IntlProvider} from 'react-intl'
import MainPage from './app'
import {currentLocale, messages} from './intl/index'

if (window.File && window.FileReader && window.FileList && window.Blob) {
  // all API available
} else {
  alert('The File APIs are not fully supported in this browser.')
}

ReactDom.render((
  <IntlProvider locale={currentLocale} messages={messages}>
    <MainPage />
  </IntlProvider>
), document.getElementById('app'))
