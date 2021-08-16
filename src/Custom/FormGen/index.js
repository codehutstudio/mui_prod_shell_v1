import React from 'react'
import { Button, TextField } from '@material-ui/core';
import { capitalCase } from 'change-case';
import clsx from 'clsx';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import {Alert} from '@material-ui/lab';
import { dv } from '../../libs';
import { useTheme, withStyles } from '@material-ui/styles';
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    
`
const gen = ({ key, type, validation, name, register, errors, wrapper: WrapEl, showErrors = true }) => {
    if (type === 'input' || type === 'password') {
        return (
            <>
                {WrapEl
                    ? (
                        <WrapEl key={key}>
                            <TextField style={{width: '100%'}}  type={type} label={capitalCase(name)} {...register(name, { required: validation })} />
                            {showErrors && (errors[name]?.type === 'required' && `${capitalCase(name)} is required`)}
                        </WrapEl>
                    )
                    : (
                        <>
                            <TextField color="primary" style={{width: '100%'}} type={type} key={key} label={capitalCase(name)} {...register(name, { required: validation })} />
                            {showErrors && (errors[name]?.type === 'required' && `${capitalCase(name)} is required`)}
                        </>
                    )
                }
            </>
        )
    }
}

export const  FormGen = ({ onSubmit, schema, submitBtnText, logo, showLogo }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const theme = useTheme()
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Wrapper>
                {showLogo && (logo)}
                {!dv.isEmpty(errors) && (<Errors>{Object.entries(errors).map(formatErrors)}</Errors>)}
                {schema.map((el, key) => <React.Fragment key={key}>{gen({ ...el, register, key: `${key}-${key}`, errors, showErrors: false })}</React.Fragment>)}
                <Button style={{background: theme.success, color: '#fff', marginTop: '20px'}} variant="contained" type="submit">{submitBtnText ? submitBtnText : 'Submit'}</Button>
            </Wrapper>
        </form>
    )
}
const StepWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 0 10px 10px;
`
const StepButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`
export const StepElm = styled.div`
  width: 100%;
`
const StepButton = styled(Button)`
    ${({theme}) => `
        background-color: ${theme.palette.primary.main};
    `}
`
const SubmitButton = withStyles({
    root: {
      boxShadow: 'none',
      textTransform: 'none',
      fontSize: 16,
      padding: '6px 12px',
      lineHeight: 1.5,
      backgroundColor: 'green',
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        backgroundColor: '#388e3c',
      },
      '&:active': {
        backgroundColor: '#0069d9',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      },
    },
  })(Button)
const Step = styled.div`
    display: none;
    &.show {
        display: flex;
    }
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

export const FormGenStepper = ({ onSubmit, schema, submitBtnText }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [step, setStep] = useState(0)
    const next = () => setStep(step + 1)
    const prev = () => setStep(step - 1)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <StepWrapper>
                {!dv.isEmpty(errors) && (<Errors>{Object.entries(errors).map(formatErrors)}</Errors>)}
                {schema.map((stepSchema, idx) => (
                    <Step className={clsx({ show: step === idx })} key={idx}>
                     {stepSchema.map((el, elkey) => {
                         const elm = gen({ ...el, register, key: `${idx}-${elkey}`, errors, showErrors: false })
                            return <StepElm key={elkey}>{elm}</StepElm>
                     })}
                    </Step>
                ))}
                <StepButtonsWrapper>
                    {step > 0 && (<StepButton variant="contained" color="primary" onClick={prev}>Previous</StepButton>)}
                    {(step >= 0 && step < schema.length - 1) && (<StepButton variant="contained" color="primary" onClick={next}>Next</StepButton>)}
                    {step === schema.length - 1 && (<SubmitButton color="primary" variant="contained" type="submit">{submitBtnText === 'string' ? submitBtnText : 'Submit'}</SubmitButton>)}
                </StepButtonsWrapper>
            </StepWrapper>
        </form>
    )
}