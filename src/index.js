import React from 'react'
import { render } from 'react-dom'
import AppProvider from './AppProvider'
import moment from 'moment'
import seLocale from 'moment/locale/sv'

import './index.css'

render(<AppProvider />, document.getElementById('root'))
