import React from 'react'
import DocumentTitle from 'react-document-title'
import Main from 'app/containers/main'

class MainPage extends React.Component {
  render() {
    return (
      <DocumentTitle title='Encryptor'>
        <Main />
      </DocumentTitle>
    )
  }
}

export default MainPage
