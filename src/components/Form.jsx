import React, { useState } from 'react'
import { TextField, FormControl, Select, InputLabel, MenuItem, Button } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { useForm, Controller } from 'react-hook-form';
import { differenceInYears } from 'date-fns';
import { createTheme, ThemeProvider } from '@mui/material/styles' 


const Form = () => {

    const [disabled, setDisabled] = useState(false);
    const [fontSizeMultiply, setFontSizeMultiply] = useState(false)
    const { register, handleSubmit, control, formState: { errors }, getValues } = useForm({
        defaultValues: {
          imie: '',
          nazwisko: '',
          kontynent: '',
          dataUrodzenia: null 
        }
      });

      const chcekAge = () => {
        setFontSizeMultiply(differenceInYears(new Date(), getValues("dataUrodzenia")) >= 60)
      }
      
      
      const onSubmit = (data) => {
        alert('sukces')
      };

      const theme = createTheme({
        typography: {
          fontSize: 14,
        }
      })

      const theme2 = createTheme({
        typography: {
          fontSize: 28,
        }
      })

      

  return (
    <ThemeProvider theme={fontSizeMultiply ? theme2 : theme}>
    <form onSubmit={handleSubmit(onSubmit)} noValidate className='flex items-center justify-center h-full p-2'>
        <FormControl  className=' w-full max-w-[600px] flex gap-2'>
            <InputLabel   id='kontynent-label'>Kontynent</InputLabel>
            <Select  defaultValue=''  labelId='kontynent-label' label={"Kontynent"} {...register("kontynent")} >
                <MenuItem value="Afryka">Afryka</MenuItem>
                <MenuItem value="Ameryka Południowa">Ameryka Południowa</MenuItem>
                <MenuItem value="Ameryka Północna">Ameryka Północna</MenuItem>
                <MenuItem value="Antarktyda">Antarktyda</MenuItem>
                <MenuItem value="Australia">Australia</MenuItem>
                <MenuItem value="Azja">Azja</MenuItem>
                <MenuItem value="Europa">Europa</MenuItem>
            </Select>
            <TextField label="Imie" {...register("imie", { required: "To pole jest wymagane"})} error={!!errors.imie} helperText={errors.imie?.message} />
            <TextField label="Nazwisko" {...register("nazwisko", {
              validate: value => {
                if(getValues("kontynent") === "Europa"){
                  return value.length > 1 || "Nie spełnione kryteria"
                }
                return true
              }
            })}
              error={!!errors.nazwisko} helperText={errors.nazwisko?.message}/>
            <Controller 
                control={control}
                name="dataUrodzenia"
                render={({field}) => (
                    <DatePicker label="Data urodzenia" value={field.value} inputRef={field.ref} onChange={(date) => {
                        field.onChange(date)
                        setDisabled(getValues("dataUrodzenia") > new Date())
                        chcekAge();
                    }}/>
                )}
            />
            <Button type='submit' variant='contained' disabled={disabled} >
                Wyślij
            </Button>
        </FormControl>
    </form>
    </ThemeProvider>
  )
}

export default Form