import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import {  AutoForm } from '../../Custom/AutoForm'
import {TextField, Button} from '@material-ui/core'
const schema = [
    { name: 'email', value: '', type: 'email' },
    { name: 'password', value: '', type: 'password' },
]

const Dev = () => {
    const {  control } = useForm()
    const onSubmit = formData => console.log(formData)
    const dvalue = 'keith'
    const [value, setValue] = useState(dvalue)
    const [edit, setedit] = useState(false) 
    const onChange = e => {
        setValue(e.target.value)
    }
    return (
        // <form onSubmit={handleSubmit(onSubmit)}>
        //     <AutoFormGenerator {...{ control, schema }} />
        //     <Button variant="contained" type="submit">Submit</Button>
        // </form>
        <div>
            <Button onClick={() => setedit(!edit)}>{edit ? 'Cancel' : 'Edit' }</Button>
            {edit ?
             <TextField value={value} onChange={onChange}/>
            : value}
        </div>
    )
}

export default Dev
