import React from 'react'
import ReactDom from 'react-dom'
import {IntlProvider} from 'react-intl'
import MainPage from './app'
import {currentLocale, messages} from './intl/index'

ReactDom.render((
  <IntlProvider locale={currentLocale} messages={messages}>
    <MainPage />
  </IntlProvider>
), document.getElementById('app'))
