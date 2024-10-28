import { CONTACT_US } from './contactUsTypes';

const initialState = {
   message: [],
   success: false,
   loading: true,
   successMsg:"",
   registered: false,
   error: false
}

const contactUsReducer = (state = initialState, action) => {
    
   switch (action.type) {
      case CONTACT_US:
         return {
            ...state,
            message: action.payload,
            success: true,
            loading: false,
            registered: true
         }

      default:
         return state
   }
}

export default contactUsReducer
