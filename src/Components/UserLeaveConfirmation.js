import React from 'react'
import ReactDOM from 'react-dom'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'

const UserLeaveConfirmation = (message, callback, open, setOpen) => {
    const {title, message: promptMessage, okButtonText, cancelButtonText} = JSON.parse(message)
    const container = document.createElement('div')
    container.setAttribute('custom-confirm-view', '')
    const handleConfirm = (callbackState) => {
        ReactDOM.unmountComponentAtNode(container)
        callback(callbackState)

        setOpen(false)
    }
    const handleCancel = (callbackState) => {
        ReactDOM.unmountComponentAtNode(container)
        callback()
        setOpen(false)
    }

    document.body.appendChild(container)
    ReactDOM.render(
        <Dialog open={open} onClose={handleCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>
                {promptMessage}
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" autoFocus onClick={handleCancel}>{okButtonText}</Button>
                <Button variant="contained" color="secondary" onClick={handleConfirm}>{cancelButtonText}</Button>
            </DialogActions>
        </Dialog>, container
    )
}

export default UserLeaveConfirmation
