import React from 'react'
import ReactDom from 'react-dom'
import {IntlProvider} from 'react-intl'
import MainPage from './app'

const currentLocale = process.env.APP_LOCALE

ReactDom.render((
  <IntlProvider locale={currentLocale}>
    <MainPage />
  </IntlProvider>
), document.getElementById('app'))
