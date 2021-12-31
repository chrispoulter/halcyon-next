import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Container from 'react-bootstrap/Container';
import { TextInput, DateInput, Button } from '../components';
import { setToken } from '../features';
import { useRegisterMutation, useCreateTokenMutation } from '../services';

export const RegisterPage = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [register] = useRegisterMutation();

    const [createToken] = useCreateTokenMutation();

    const onSubmit = async variables => {
        let result = await register(variables);

        if (result.data) {
            result = await createToken(variables);

            if (result.data) {
                dispatch(
                    setToken({
                        accessToken: result.data.data.accessToken
                    })
                );

                navigate('/');
            }
        }
    };

    return (
        <Container>
            <Helmet>
                <title>Register</title>
            </Helmet>

            <h1>Register</h1>
            <hr />

            <Formik
                initialValues={{
                    emailAddress: '',
                    password: '',
                    confirmPassword: '',
                    firstName: '',
                    lastName: '',
                    dateOfBirth: ''
                }}
                validationSchema={Yup.object({
                    emailAddress: Yup.string()
                        .label('Email Address')
                        .max(254)
                        .email()
                        .required(),
                    password: Yup.string()
                        .label('Password')
                        .min(8)
                        .max(50)
                        .required(),
                    confirmPassword: Yup.string()
                        .label('Confirm Password')
                        .required()
                        .oneOf([Yup.ref('password')]),
                    firstName: Yup.string()
                        .label('First Name')
                        .max(50)
                        .required(),
                    lastName: Yup.string()
                        .label('Last Name')
                        .max(50)
                        .required(),
                    dateOfBirth: Yup.string().label('Date Of Birth').required()
                })}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form noValidate>
                        <Field
                            name="emailAddress"
                            type="email"
                            label="Email Address"
                            required
                            maxLength={254}
                            autoComplete="username"
                            component={TextInput}
                        />

                        <Field
                            name="password"
                            type="password"
                            label="Password"
                            required
                            maxLength={50}
                            autoComplete="new-password"
                            component={TextInput}
                        />

                        <Field
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            required
                            maxLength={50}
                            autoComplete="new-password"
                            component={TextInput}
                        />

                        <Field
                            name="firstName"
                            type="text"
                            label="First Name"
                            required
                            maxLength={50}
                            component={TextInput}
                        />

                        <Field
                            name="lastName"
                            type="text"
                            label="Last Name"
                            required
                            maxLength={50}
                            component={TextInput}
                        />

                        <Field
                            name="dateOfBirth"
                            type="date"
                            label="Date Of Birth"
                            required
                            component={DateInput}
                        />

                        <div className="mb-3 text-end">
                            <Button
                                type="submit"
                                variant="primary"
                                loading={isSubmitting}
                            >
                                Submit
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>

            <p>
                Already have an account? <Link to="/login">Log in now</Link>
            </p>
        </Container>
    );
};
