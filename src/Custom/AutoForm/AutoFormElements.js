import { MenuItem, Switch, TextField } from "@material-ui/core"
import { Controller } from "react-hook-form"
import { capitalCase } from "capital-case"

export const sanitizeValue = value => {
    if(typeof value === 'boolean') return value.toString() === 'false' ? 'No' : 'Yes'
    if(value === null || value === undefined) return ''
    return value
}

const boolean = ({ name, control, value }) => <Controller
    name={name}
    control={control}
    defaultValue={sanitizeValue(value)}
    render={({ field }) => <Switch {...field} />}
/>

const string = ({ name, control, value }) => <Controller
    name={name}
    control={control}
    defaultValue={sanitizeValue(value)}
    render={({ field }) => <TextField fullwidth label={capitalCase(name)} {...field} />}
/>
const password = ({ name, control, value }) => <Controller
    name={name}
    control={control}
    defaultValue={sanitizeValue(value)}
    render={({ field }) => <TextField fullwidth inputProps={{ autoComplete: '  '}} label={capitalCase(name)} type="password"  {...field} />}
/>
const email = ({ name, control, value }) => <Controller
    name={name}
    control={control}
    defaultValue={sanitizeValue(value)}
    render={({ field }) => <TextField fullwidth label={capitalCase(name)} type="email"  {...field} />}
/>

const select = ({ name, control, value }) => <Controller
    name={name}
    control={control}
    defaultValue={sanitizeValue(value)}
    render={({ field }) => <TextField fullwidth select {...field} style={{ width: '40px', marginLeft: '10px' }}>
        {[0, 1, 2].map(option => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
    </TextField>}
/>

const readOnly = ({ name, control, value }) => <Controller
    name={name}
    control={control}
    defaultValue={sanitizeValue(value)}
    render={({ field }) => <TextField fullwidth label={capitalCase(name)} InputProps={{ readOnly: true }} {...field}  />}
/>
const FormElements = {
    boolean,
    string,
    select,
    readOnly,
    password,
    email,
}
export default FormElements