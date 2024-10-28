import { FETCH_SLIDERS, FETCH_COURSE_CATEGORES } from './homeTypes';

const initialState = {
   user: [],
   slidersList: [],
   categoriesList: [],
   success: false,
   loading:true,
   registered: false,
   error: false
}

const homeReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_SLIDERS:
         return {
            ...state,
            slidersList: action.payload,
            success: true,
            loading:false,
            registered: true
         }
      case FETCH_COURSE_CATEGORES:
         return {
            ...state,
            categoriesList: action.payload,
            success: true,
            loading:false,
            registered: true
      }
      default:
         return state
   }
}

export default homeReducer
