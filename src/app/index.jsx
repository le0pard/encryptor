import React from 'react'
import DocumentTitle from 'react-document-title'
import Main from 'app/containers/main'
import {injectIntl} from 'react-intl'
import messages from 'intl/messages'

const {PropTypes} = React

class MainPage extends React.Component {

  static propTypes = {
    intl: PropTypes.object.isRequired
  }

  render() {
    const {formatMessage} = this.props.intl

    return (
      <DocumentTitle title={formatMessage(messages.title)}>
        <Main />
      </DocumentTitle>
    )
  }
}

export default injectIntl(MainPage)
