export const en = {
    Api: {
        Codes: {
            USER_REGISTERED: 'User successfully registered.',
            FORGOT_PASSWORD:
                'Instructions as to how to reset your password have been sent to you via email.',
            PASSWORD_RESET: 'Your password has been reset.',
            PROFILE_UPDATED: 'Your profile has been updated.',
            PASSWORD_CHANGED: 'Your password has been changed.',
            ACCOUNT_DELETED: 'Your account has been deleted.',
            ENVIRONMENT_SEEDED: 'Environment seeded.',
            USER_CREATED: 'User successfully created.',
            USER_UPDATED: 'User successfully updated.',
            USER_LOCKED: 'User successfully locked.',
            USER_UNLOCKED: 'User successfully unlocked.',
            USER_DELETED: 'User successfully DELETED.',
            DUPLICATE_USER: 'User name "{{emailAddress}}" is already taken.',
            INVALID_TOKEN: 'Invalid token.',
            USER_NOT_FOUND: 'User not found.',
            INCORRECT_PASSWORD: 'Incorrect password.',
            CREDENTIALS_INVALID: 'The credentials provided were invalid.',
            USER_LOCKED_OUT:
                'This account has been locked out, please try again later.',
            LOCK_CURRENT_USER: 'Cannot lock currently logged in user.',
            DELETE_CURRENT_USER: 'Cannot delete currently logged in user.',
            UNKNOWN_ERROR:
                'An unknown error has occurred whilst communicating with the server.'
        },
        UserRoles: {
            SYSTEM_ADMINISTRATOR: 'System Administrator',
            USER_ADMINISTRATOR: 'User Administrator'
        },
        UserSortExpressions: {
            NAME_ASC: 'Name A-Z',
            NAME_DESC: 'Name Z-A',
            EMAIL_ADDRESS_ASC: 'Email Address A-Z',
            EMAIL_ADDRESS_DESC: 'Email Address Z-A'
        }
    },
    Validation: {
        Required: '${label} is a required field.',
        Email: '${label} must be a valid email.',
        Max: '${label} must be at most ${max} characters.',
        Min: '${label} must be at least ${min} characters.',
        FieldsDoNotMatch: 'The "{{label}}" field does not match.'
    },
    Components: {
        Header: {
            Brand: 'Halcyon',
            Nav: {
                Users: 'Users',
                MyAccount: 'My Account',
                Logout: 'Logout',
                Login: 'Login',
                Register: 'Register'
            }
        },
        Pager: {
            Next: 'Next',
            Previous: 'Previous'
        },
        DateInput: {
            Day: 'Day...',
            Month: 'Month...',
            Year: 'Year...',
            MonthNames: {
                0: 'January',
                1: 'February',
                2: 'March',
                3: 'April',
                4: 'May',
                5: 'June',
                6: 'July',
                7: 'August',
                8: 'September',
                9: 'October',
                10: 'November',
                11: 'December'
            }
        },
        AccessDenied: {
            Title: 'Access Denied',
            Lead: 'Sorry, you do not have access to this resource.',
            HomeButton: 'Home'
        },
        PrivateRoute: {
            Title: 'Access Denied'
        },
        PublicRoute: {
            BaseTitle: 'Halcyon',
            Seperator: '//'
        }
    },
    Pages: {
        Home: {
            Jumbotron: {
                Title: 'Welcome!',
                Lead:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Morbi maximus, leo sit amet vehicula eleifend, nunc dui porta orci, quis semper odio felis ut quam.',
                RegisterButton: 'Get Started'
            },
            Panel: {
                Title: 'Fusce condimentum',
                Text:
                    'In vel tincidunt elit, id pretium massa. Nullam rhoncus orci nisl. Pellentesque in mi et eros porttitor sagittis quis at justo. Sed ac faucibus enim, at tempus enim. Nunc gravida accumsan diam ut maximus. Ut sed tellus odio. N am semper blandit pretium. Suspendisse vitae elit turpis.'
            }
        },
        NotFound: {
            Jumbotron: {
                Title: 'Page Not Found',
                Lead:
                    'Sorry, the Page you were looking for could not be found.',
                HomeButton: 'Home'
            }
        },
        Register: {
            Meta: { Title: 'Register' },
            Title: 'Register',
            Form: {
                EmailAddress: 'Email Address',
                Password: 'Password',
                ConfirmPassword: 'Confirm Password',
                FirstName: 'First Name',
                LastName: 'Last Name',
                DateOfBirth: 'Date Of Birth'
            },
            SubmitButton: 'Submit',
            LoginPrompt: 'Already have an account?',
            LoginLink: 'Log in now'
        },
        Login: {
            Meta: { Title: 'Login' },
            Title: 'Login',
            Form: {
                EmailAddress: 'Email Address',
                Password: 'Password',
                RememberMe: 'Remember my password on this computer'
            },
            SubmitButton: 'Submit',
            RegisterPrompt: 'Not already a member?',
            RegisterLink: 'Register now',
            ForgotPasswordPrompt: 'Forgotten your password?',
            ForgotPasswordLink: 'Request reset'
        },
        ForgotPassword: {
            Meta: { Title: 'Forgot Password' },
            Title: 'Forgotten Password',
            Form: {
                EmailAddress: 'Email Address'
            },
            SubmitButton: 'Submit'
        },
        ResetPassword: {
            Meta: { Title: 'Reset Password' },
            Title: 'Reset Password',
            Form: {
                EmailAddress: 'Email Address',
                NewPassword: 'New Password',
                ConfirmNewPassword: 'Confirm New Password'
            },
            SubmitButton: 'Submit'
        },
        MyAccount: {
            Meta: { Title: 'My Account' },
            Title: 'My Account',
            ProfileNotFound: 'Profile could not be found.',
            ProfileSection: {
                Title: 'Profile',
                UpdateButton: 'Update',
                EmailAddress: 'Email Address',
                Password: 'Password',
                ChangePasswordLink: 'Change your password...',
                Name: 'Name',
                DateOfBirth: 'Date Of Birth'
            },
            SettingsSection: {
                Title: 'Settings',
                DeletePrompt:
                    'Once you delete your account all of your data and settings will be removed. Please be certain.',
                DeleteButton: 'Delete Account'
            },
            DeleteModal: {
                Title: 'Confirm',
                Message: 'Are you sure you want to delete your account?',
                Confirm: 'Ok',
                Cancel: 'Cancel'
            }
        },
        UpdateProfile: {
            Meta: { Title: 'Update Profile' },
            Title: 'Update Profile',
            ProfileNotFound: 'Profile could not be found.',
            Form: {
                EmailAddress: 'Email Address',
                FirstName: 'First Name',
                LastName: 'Last Name',
                DateOfBirth: 'Date Of Birth'
            },
            CancelButton: 'Cancel',
            SubmitButton: 'Submit'
        },
        ChangePassword: {
            Meta: { Title: 'Change Password' },
            Title: 'Change Password',
            Form: {
                CurrentPassword: 'Current Password',
                NewPassword: 'New Password',
                ConfirmNewPassword: 'Confirm New Password'
            },
            CancelButton: 'Cancel',
            SubmitButton: 'Submit',
            ForgotPasswordPrompt: 'Forgotten your password?',
            ForgotPasswordLink: 'Request reset'
        },
        User: {
            Meta: { Title: 'Users' },
            Title: 'Users',
            CreateNewButton: 'Create New',
            UsersNotFound: 'No users could be found.',
            Form: {
                SearchPlaceholder: 'Search...',
                SearchButton: 'Search',
                SortByButton: 'Sort By'
            },
            LockedBadge: 'Locked'
        },
        CreateUser: {
            Meta: { Title: 'Create User' },
            Title: 'User',
            Subtitle: 'Create',
            Form: {
                EmailAddress: 'Email Address',
                Password: 'Password',
                ConfirmPassword: 'Confirm Password',
                FirstName: 'First Name',
                LastName: 'Last Name',
                DateOfBirth: 'Date Of Birth',
                Roles: 'Roles'
            },
            CancelButton: 'Cancel',
            SubmitButton: 'Submit'
        },
        UpdateUser: {
            Meta: { Title: 'Update Update' },
            Title: 'User',
            Subtitle: 'Update',
            UserNotFound: 'User could not be found.',
            Form: {
                EmailAddress: 'Email Address',
                FirstName: 'First Name',
                LastName: 'Last Name',
                DateOfBirth: 'Date Of Birth',
                Roles: 'Roles'
            },
            LockModal: {
                Title: 'Confirm',
                Message:
                    'Are you sure you want to lock <strong>{{firstName}} {{lastName}}</strong>?',
                Confirm: 'Ok',
                Cancel: 'Cancel'
            },
            UnlockModal: {
                Title: 'Confirm',
                Message:
                    'Are you sure you want to unlock <strong>{{firstName}} {{lastName}}</strong>?',
                Confirm: 'Ok',
                Cancel: 'Cancel'
            },
            DeleteModal: {
                Title: 'Confirm',
                Message:
                    'Are you sure you want to delete <strong>{{firstName}} {{lastName}}</strong>?',
                Confirm: 'Ok',
                Cancel: 'Cancel'
            },
            CancelButton: 'Cancel',
            LockButton: 'Lock',
            UnlockButton: 'Unlock',
            DeleteButton: 'Delete',
            SubmitButton: 'Submit'
        }
    }
};
