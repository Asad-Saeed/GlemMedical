import homeReducer from "./home/homeReducer";
import commonReducer from "./common/commonReducer";
import courseReducer from "./courses/courseReducer";
import aboutReducer from "./aboutUs/aboutReducer";
import contactUsReducer from "./contactUs/contactUsReducer";
import settingReducer from "./settings/settingReducer";
import profileReducer from "./profile/profileReducer";
import authReducer from "./auth/authReducer";
import { applyMiddleware, combineReducers, createStore, compose } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import cartReducer from "./cart/cartReducer";
import paymentReducer from "./payment/paymentReducer";

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;
// middleware
const middleware = [thunk];

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "profile", "courses", "cart"],
};

const appReducer = combineReducers({
  home: homeReducer,
  common: commonReducer,
  courses: courseReducer,
  abouts: aboutReducer,
  contactUs: contactUsReducer,
  settings:settingReducer, 
  profile: profileReducer,
  auth: authReducer,
  cart: cartReducer,
  payment: paymentReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_ALL_STATE") {
    state = undefined;
  }
  return appReducer(state, action);
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
export default store;
