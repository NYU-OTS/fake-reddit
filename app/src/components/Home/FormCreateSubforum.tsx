import * as React from 'react';
import { Field, reduxForm } from 'redux-form';

export const FormCreateSubforum = reduxForm({
    form: 'form-create-sub'
})((props: any) => {
    const {
        error,
        name,
        description,
        handleSubmit,
        handleChange
    } = props

    const isInvalid = name === '' || description === '';

    return (
        <form onSubmit={handleSubmit}>
            <Field
                name='name'
                component='input'
                type='text'
                placeholder='Give it a name'
                onChange={handleChange}
            />
            <br />
            <Field
                name='description'
                component='textarea'
                rows={4}
                placeholder='Enter your description here...'
                onChange={handleChange}
            />
            <button disabled={isInvalid} type='submit'>
                Create
            </button>
            {error && <p>{error.message}</p>}
        </form>
    );
})