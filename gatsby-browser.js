const React = require('react')
const { Provider } = require('react-redux')
const { persistedReducer } = require('./src/redux/store')
const { PersistGate } = require('redux-persist/integration/react')
const { configureStore } = require('@reduxjs/toolkit')
const { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } = require('redux-persist')

// define store and persistor OUTSIDE of the wrapRootElement function
// this is so that the store is not re-created on every page change
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

const persistor = persistStore(store)

export const wrapRootElement = ({ element }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {element}
    </PersistGate>
  </Provider>
)