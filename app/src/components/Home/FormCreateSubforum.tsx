import * as React from 'react';
import { Field, reduxForm } from 'redux-form';

const required = (value: {}) => value ? null : 'Required'

const renderField = ({
    input, label, type,
    placeholder,
    meta: {
        touched,
        error,
        warning
    }
}: any) => (
        <div>
            <label>{label}</label>
            <div>
                <input {...input} placeholder={placeholder} type={type} />
                {
                    touched &&
                    (
                        (error && <span>{error}</span>) ||
                        (warning && <span>{warning}</span>)
                    )
                }
            </div>
        </div>
    )

export const FormCreateSubforum = reduxForm({
    form: 'form-create-sub',
})((props: any) => {
    const {
        submitting,
        handleSubmit,
        // handleChange
    } = props

    return (
        <form onSubmit={handleSubmit}>
            <Field
                name='name'
                component={renderField}
                type='text'
                validate={required}
                placeholder='Give it a name'
                // onChange={handleChange}
                label='Subforum Name'
            />
            <br />
            <Field
                name='description'
                component={renderField}
                type='text'
                label='Description'
                placeholder='Description goes here...'
                // onChange={handleChange}
                validate={required}
            />
            <br />
            <button disabled={submitting} type='submit'>
                Create
            </button>
        </form>
    );
})