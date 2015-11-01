import {Dispatcher} from 'flux'
import assign from 'lodash/object/assign'
import Logger from '../utils/Logger'

const AppDispatcher = assign(new Dispatcher(), {

  handleViewAction(type, action = {}) {
    Logger.debug('view action', type, action)

    if (!type)
      throw new Error('Empty type: you likely mistyped the action.')

    this.dispatch({
      type,
      action
    })

  }
})

export default AppDispatcher
