import React from 'react'
import Form from './components/Form'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'


const App = () => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Form />
      </LocalizationProvider>
    </>
  )
}

export default App