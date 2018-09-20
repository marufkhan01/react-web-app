import { combineReducers } from 'redux'
import authReducer from './components/Auth/redux/authReducer'
import { collectionData } from './common/redux/CollectionReducer'
import { submit } from './common/redux/SubmitFieldReducer'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  collectionData,
  submit,
  authReducer,
  form: formReducer
})
