import { FETCH_TEAMS, FETCH_EVENTS, FETCH_TESTIMONIALS, FETCH_COUNTRIES } from './commonTypes';

const initialState = {
   user: [],
   teamsList: [],
   eventsList: [],
   testimonialsList: [],
   countriesList: [],
   success: false,
   loading:true,
   registered: false,
   error: false
}

const commonReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_TEAMS:
      return {
         ...state,
         teamsList: action.payload,
         success: true,
         loading:false,
         registered: true
      }
      case FETCH_EVENTS:
      return {
         ...state,
         eventsList: action.payload,
         success: true,
         loading:false,
         registered: true
      }
      case FETCH_TESTIMONIALS:
      return {
         ...state,
         testimonialsList: action.payload,
         success: true,
         loading:false,
         registered: true
      }
      case FETCH_COUNTRIES:
      return {
         ...state,
         countriesList: action.payload,
         success: true,
         loading:false,
         registered: true
      }
      default:
         return state
   }
}

export default commonReducer
