import {FETCH_ABOUT_US } from './aboutTypes';

const initialState = {
   user: [],
   aboutsList: [],
   success: false,
   loading:true,
   registered: false,
   error: false
}

const aboutReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_ABOUT_US:
      return {
         ...state,
         aboutsList: action.payload,
         success: true,
         loading:false,
         registered: true
      }
      default:
         return state
   }
}

export default aboutReducer
