import { configureStore } from '@reduxjs/toolkit'

import ticketsReducer from './ticketsReducer'

export default configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
})
