import { SETTINGS } from './settingTypes';

const initialState = {
   settingsData: [],
   success: false,
   loading: true,
   registered: false,
   error: false
}

const settingReducer = (state = initialState, action) => {

   switch (action.type) {
      case SETTINGS:
         return {
            ...state,
            settingsData: action.payload,
            success: true,
            loading: false,
            registered: true
         }

      default:
         return state
   }
}

export default settingReducer
