import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import { UnapprovedMembersProvider } from '../src/Contexts/UnapprovedMembersContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter >
   <SnackbarProvider>
   <UnapprovedMembersProvider>
      <App />
      </UnapprovedMembersProvider>
   </SnackbarProvider>
    
  </BrowserRouter>
)
