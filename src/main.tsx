import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import AppWidthRedux from './AppWidthRedux'
import { store } from './store'

import 'src/assets/styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<AppWidthRedux />
	</Provider>
)
