import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Input } from '@/components/Input/Input';
import { DatePicker } from '@/components/DatePicker/DatePicker';
import { ToggleGroup } from '@/components/ToggleGroup/ToggleGroup';
import { Button } from '@/components/Button/Button';
import { ButtonGroup } from '@/components/ButtonGroup/ButtonGroup';
import { Role, roleOptions } from '@/utils/auth';

const schema = Yup.object({
    emailAddress: Yup.string()
        .label('Email Address')
        .max(254)
        .email()
        .required(),
    password: Yup.string().label('Password').min(8).max(50).required(),
    confirmPassword: Yup.string()
        .label('Confirm Password')

        .required()
        .oneOf([Yup.ref('password')], 'Passwords do not match'),
    firstName: Yup.string().label('First Name').max(50).required(),
    lastName: Yup.string().label('Last Name').max(50).required(),
    dateOfBirth: Yup.date().label('Date Of Birth').required(),
    roles: Yup.array()
        .of(
            Yup.string<Role>()
                .label('Role')
                .oneOf(Object.values(Role))
                .required()
        )
        .label('Roles')
        .default([])
});

export type CreateUserFormValues = Yup.InferType<typeof schema>;

const initialValues = schema.getDefault() as any;

type CreateUserFormProps = {
    options?: JSX.Element;
    onSubmit: (values: CreateUserFormValues) => void;
};

export const CreateUserForm = ({ onSubmit, options }: CreateUserFormProps) => (
    <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
    >
        {({ isSubmitting }) => (
            <Form noValidate>
                <Input
                    label="Email Address"
                    name="emailAddress"
                    type="email"
                    maxLength={254}
                    autoComplete="username"
                    required
                    disabled={isSubmitting}
                    className="mb-3"
                />
                <div className="sm:flex sm:gap-3">
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        maxLength={50}
                        autoComplete="new-password"
                        required
                        disabled={isSubmitting}
                        className="mb-3 sm:flex-1"
                    />
                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        maxLength={50}
                        autoComplete="new-password"
                        required
                        disabled={isSubmitting}
                        className="mb-3 sm:flex-1"
                    />
                </div>
                <div className="sm:flex sm:gap-3">
                    <Input
                        label="First Name"
                        name="firstName"
                        type="text"
                        maxLength={50}
                        autoComplete="given-name"
                        required
                        disabled={isSubmitting}
                        className="mb-3 sm:flex-1"
                    />
                    <Input
                        label="Last Name"
                        name="lastName"
                        type="text"
                        maxLength={50}
                        autoComplete="family-name"
                        required
                        disabled={isSubmitting}
                        className="mb-3 sm:flex-1"
                    />
                </div>
                <DatePicker
                    label="Date Of Birth"
                    name="dateOfBirth"
                    required
                    autoComplete={['bday-day', 'bday-month', 'bday-year']}
                    disabled={isSubmitting}
                    className="mb-3"
                />
                <div className="mb-5">
                    <span className="mb-2 block text-sm font-medium text-gray-800">
                        Roles
                    </span>
                    <ToggleGroup
                        name="roles"
                        options={roleOptions}
                        disabled={isSubmitting}
                    />
                </div>
                <ButtonGroup>
                    {options}
                    <Button type="submit" loading={isSubmitting}>
                        Submit
                    </Button>
                </ButtonGroup>
            </Form>
        )}
    </Formik>
);
