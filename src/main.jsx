import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    // removing React.StrictMode prevents alert messages from rendering more than once because StrictMode renders components twice on development mode to detect errors in code
    <App />
  // </React.StrictMode>,
)
