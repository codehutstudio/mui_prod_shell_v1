import { createElement } from 'react'
import {
    Switch,
    TextField,
    Select,
    MenuItem
} from '@material-ui/core'
import { isEmpty, isUndefined, range } from '../../libs/dataVal'
import MaterialUiPhoneNumber from 'material-ui-phone-number'

const inputDic = {
    string: TextField,
    number: TextField,
    range: Select,
    boolean: Switch
}

const formatValue = (value, type) => {
    console.log(value, type)
    if (isUndefined(value) && type === 'string') return ""
    if (isUndefined(value) && type === 'number') return ""
    if (isUndefined(value)) return ""
    return value
}
const getInput = ({ schema, value, onChange }) => {
    const { type, editable, limit } = schema
    if (!editable) {
        return createElement('input', { readOnly: true, value: formatValue(value, type) })
    }
    if (type === 'boolean') {
        return <Switch checked={Boolean(value)} onChange={onChange} />
    }
    if (type === 'string' && editable) {
        return <TextField value={value} onChange={onChange} style={{ width: isEmpty(value) ? '200px' : value.length * 10 }}/>
    }
    if (type === 'tel' && editable) {
        // return <MaterialUiPhoneNumber defaultCountry={'us'} value={value} onChange={onChange}  style={{ width: isEmpty(value) ? '200px' : value.length * 10 ?? value.toString().length * 10}}/>
        return <TextField type="tel" value={value} onChange={onChange} style={{ width: isEmpty(value) ? '200px' : value.length * 10 ?? value.toString().length * 10}}/>
    }
    if (type === 'range' && editable) {
        const options = range(limit)
        return <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            onChange={onChange}
            >
                {options.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
            
        </Select>
    }
    return (null)
}
const FormInputs = (props) => {
    return getInput(props)
}
export default FormInputs