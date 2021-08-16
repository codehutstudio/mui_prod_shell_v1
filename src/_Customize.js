import {capitalCase} from 'change-case'
import { SignUpFacebook, SignUpGoogle, SignUpTwitter } from "./_DbAccessFunctions"
export const APP_NAME = 'SHELL APP'
export const PROFILE_TABLE_NAME = 'users'
export const theme = {
    success: 'green'
}
export const AccessLevels = ['user', 'employee', 'admin', 'dev']
export const NAV_LINKS = [
    { name: 'home', type: 'scroll'},
    { name: 'about', type: 'scroll'},
    { name: 'services', type: 'scroll'},
    { name: 'contact', type: 'scroll'},
    { name: 'account', type: 'route', isProtected: true},
    { name: 'login', type: 'route'},
]
export const DASHBAORD_LINKS = [
    {name: 'account'},
    {name: 'projects'},
    {name: 'invoices'},
    {name: 'messages'},
    {name: 'links'},
    {name: 'documents'},
    {name: 'admin', isProtected: true}, 
]
export const PROFILE_MODEL = {
    lastUpdated: {
        type: 'number',
        editable: false,
        defaultValue: () => Date.now()
    },
    id: {
        type: 'string',
        editable: false,
        defaultValue: '',
    },
    accessToken: {
        type: 'string',
        editable: false,
        defaultValue: '',
    },
    idToken: {
        type: 'string',
        editable: false,
        defaultValue: '',
    },
    providerId: {
        type: 'string',
        editable: false,
        defaultValue: '',
    },
    refreshToken: {
        type: 'string',
        editable: false,
        defaultValue: '',
    },
    signInMethod: {
        type: 'string',
        editable: false,
        defaultValue: '',
    },
    firstName: {
        type: 'string',
        editable: true,
        defaultValue: '',
    },
    lastName: {
        type: 'string',
        editable: true,
        defaultValue: '',
    },
    email: {
        type: 'string',
        editable: true,
        defaultValue: '',
    },
    uid: {
        type: 'string',
        editable: false,
        defaultValue: '',
    },
    displayName: {
        type: 'string',
        editable: true,
        defaultValue: '',
        defaultFn: ({firstName, lastName}) => `${capitalCase(firstName.charAt(0))}${capitalCase(lastName.charAt(0))}`
    },
    level: {
        type: 'range',
        editable: true,
        protected: true,
        limit: 3,
        defaultValue: 0,
    },
    phoneNumber: {
        type: 'tel',
        editable: true,
        defaultValue: '',
    },
    photoURL: {
        type: 'string',
        editable: true,
        defaultValue: '',
    },
    isAdmin: {
        type: 'boolean',
        editable: true,
        protected: true,
        level: 2,
        defaultValue: false,
    }
    
}
export const PROFILE_MODEL_SECTIONS = [
    {name: 'Contact Info', minEditLevel: 1, items: ['First Name', 'Last Name', 'Display Name', 'Email', 'Phone Number']},
    {name: 'Access Info', minEditLevel: 2, items: ['Is Admin', 'Level']},
    {name: 'User Id Info', minEditLevel: false, items: ['ID', 'UID', 'Provider ID']}
]
export const FormSchemas = {
    loginForm: [
        { type: 'email', name: 'email', required: true, wrapper: false },
        { type: 'password', name: 'password', required: true, wrapper: false },
    ], 
    loginFormStepper: [
        [{ type: 'email', name: 'email', required: true, wrapper: false }],
        [{ type: 'password', name: 'password', required: true, wrapper: false }]
    ]
}
export const SOCIAL_LOGINS = {
    facebook: SignUpFacebook,
    google: SignUpGoogle,
    twitter: SignUpTwitter,
}

export const SIGNUP_ERROR_CODES = {
    "auth/email-already-in-use": "Email already used. Please sign in."
}

export const PROJECT_DOC = {
    style: [
        {
            name: '',
            description: '',
            scope: '',
            items: [],

        }
    ],
    functionality: [
        {
            name: 'User Management',
            description: '',
            scope: '',
            items: [{
                name: 'Account',
                items: [
                    {name: 'Profile', description: '', items: [{name: 'Medications List'}]},
                    {name: 'Payments', description: '', items: [{name: 'Subscription vs Single Payments'}]},
                ]
            }],
        }
    ],
    features: [
        {
            name: '',
            description: '',
            scope: '',
            items: [],

        }
    ]
}