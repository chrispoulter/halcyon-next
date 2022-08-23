import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Container from 'react-bootstrap/Container';
import { TextInput, Button, Meta } from '../../components';
import { useResetPasswordMutation, showToast } from '../../redux';

const ResetPasswordPage = ({ params }) => {
    const { token } = params;

    const router = useRouter();

    const dispatch = useDispatch();

    const [resetPassword] = useResetPasswordMutation();

    const onSubmit = async variables => {
        const { data: result } = await resetPassword({
            token,
            ...variables
        });

        if (result) {
            dispatch(
                showToast({
                    variant: 'success',
                    message: result.message
                })
            );

            router.push('/login');
        }
    };

    return (
        <Container>
            <Meta title="Reset Password" />

            <h1>Reset Password</h1>
            <hr />

            <Formik
                initialValues={{
                    emailAddress: '',
                    newPassword: '',
                    confirmNewPassword: ''
                }}
                validationSchema={Yup.object({
                    emailAddress: Yup.string()
                        .label('Email Address')
                        .email()
                        .required(),
                    newPassword: Yup.string()
                        .label('New Password')
                        .min(8)
                        .max(50)
                        .required(),
                    confirmNewPassword: Yup.string()
                        .label('Confirm New Password')
                        .required()
                        .oneOf([Yup.ref('newPassword')])
                })}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form noValidate>
                        <TextInput
                            name="emailAddress"
                            type="email"
                            label="Email Address"
                            required
                            maxLength={254}
                            autoComplete="username"
                        />
                        <TextInput
                            name="newPassword"
                            type="password"
                            label="New Password"
                            required
                            maxLength={50}
                            autoComplete="new-password"
                        />
                        <TextInput
                            name="confirmNewPassword"
                            type="password"
                            label="Confirm New Password"
                            required
                            maxLength={50}
                            autoComplete="new-password"
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
        </Container>
    );
};

export const getServerSideProps = async context => ({
    props: { params: context.params }
});

export default ResetPasswordPage;
