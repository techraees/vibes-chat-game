import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store'
import Theme from '@/components/template/Theme'
import Layout from '@/components/layouts'
import './locales'
import { GameContextProvider } from './context/gameContext'

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <GameContextProvider>
                        <Theme>
                            <Layout />
                        </Theme>
                    </GameContextProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}

export default App
