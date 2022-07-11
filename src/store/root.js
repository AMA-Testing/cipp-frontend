import { combineReducers } from '@reduxjs/toolkit'
import appReducer, { appSlice } from 'src/store/features/app'
import authReducer, { authSlice } from 'src/store/features/auth'
import { toastsSlice } from 'src/store/features/toasts'
import { switcherSlice } from 'src/store/features/switcher'
import { baseApi } from 'src/store/api/baseApi'
import { RESET_STATE_ACTION_TYPE } from 'src/store/actions/resetState'
import { RESET_AUTH_ACTION_TYPE } from 'src/store/actions/resetAuth'
import ticketFormReducer from 'src/Relion/store/features/ticketFormSlice'
import ticketListReducer from 'src/Relion/store/features/ticketListSlice'
import ticketConfirmReducer from 'src/Relion/store/features/ticketConfirmSlice'
import userAdminReducer from 'src/Relion/store/features/userAdminSlice'

export const root = {
  // slices
  [appSlice.name]: appReducer,
  [authSlice.name]: authReducer,
  [switcherSlice.name]: switcherSlice.reducer,
  [toastsSlice.name]: toastsSlice.reducer,

  // api
  [baseApi.reducerPath]: baseApi.reducer,

  // Relion
  ticketForm: ticketFormReducer,
  ticketList: ticketListReducer,
  ticketConfirm: ticketConfirmReducer,
  userAdmin: userAdminReducer,
}

export const apiMiddleware = [baseApi.middleware]

const combinedReducer = combineReducers(root)

// global reducer
export const rootReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case RESET_STATE_ACTION_TYPE:
      state = {}
      break
    case RESET_AUTH_ACTION_TYPE:
      state = { ...state, auth: {} }
      break
    default:
      break
  }

  // noinspection JSCheckFunctionSignatures
  return combinedReducer(state, action)
}
