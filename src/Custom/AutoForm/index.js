import React from 'react'
import { Button, useTheme } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import styled from 'styled-components'
import { isEmpty, isNull } from '../../libs/dataVal'


import FormElements from './AutoFormElements'
import { Alert } from '@material-ui/lab'
import { capitalCase } from 'capital-case'
const stz = val => {
    if (isNull(val)) return ''

    return val
}
export const AutoFormGenerator = ({ control, schema }) => {
    return (
        <>
            {schema.map(({ name, value, type, required }) => (
                <Controller
                    key={name}
                    name={name}
                    control={control}
                    defaultValue={stz(value)}
                    render={({ field }) => FormElements[type]({ name, value, control })}
                    rules={{ ...(required && {required})}}
                />
            ))}

        </>
    )
}
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const Errors = styled.div`
    display: flex;
    flex-direction: column;
    color: red;
    margin-top: 10px;
    > div {
        margin-bottom: 5px;
    }
`
const formatErrors = ([name, { type, message }], idx) => (<Alert severity="error" key={idx}>{capitalCase(name)} is {type}</Alert>)


export const AutoForm = ({ onSubmit, schema, submitBtnText}) => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const theme = useTheme()
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Wrapper>
                {!isEmpty(errors) && (<Errors>{Object.entries(errors).map(formatErrors)}</Errors>)}
                <AutoFormGenerator {...{ control, schema }} />
                <Button style={{ background: theme.success, color: '#fff', marginTop: '20px' }} variant="contained" type="submit">{submitBtnText ? submitBtnText : 'Submit'}</Button>
            </Wrapper>
        </form>
    )
}