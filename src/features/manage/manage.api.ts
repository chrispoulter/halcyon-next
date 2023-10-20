import { api } from '@/redux/api';
import { UpdatedResponse } from '../base.types';
import {
    GetProfileResponse,
    UpdateProfileRequest,
    ChangePasswordRequest,
    DeleteAccountRequst
} from './manage.types';

export const manageApi = api
    .enhanceEndpoints({ addTagTypes: ['User'] })
    .injectEndpoints({
        endpoints: builder => ({
            getProfile: builder.query<GetProfileResponse, void>({
                query: () => '/manage',
                providesTags: result => [{ type: 'User', id: result?.id }]
            }),
            updateProfile: builder.mutation<
                UpdatedResponse,
                UpdateProfileRequest
            >({
                query: body => ({
                    url: '/manage',
                    method: 'PUT',
                    body
                }),
                invalidatesTags: (result, error) =>
                    error ? [] : [{ type: 'User', id: result?.id }]
            }),
            changePassword: builder.mutation<
                UpdatedResponse,
                ChangePasswordRequest
            >({
                query: body => ({
                    url: '/manage/change-password',
                    method: 'PUT',
                    body
                }),
                invalidatesTags: (result, error) =>
                    error ? [] : [{ type: 'User', id: result?.id }]
            }),
            deleteAccount: builder.mutation<
                UpdatedResponse,
                DeleteAccountRequst
            >({
                query: body => ({
                    url: '/manage',
                    method: 'DELETE',
                    body
                }),
                invalidatesTags: (_, error) =>
                    error ? [] : [{ type: 'User', id: 'PARTIAL-LIST' }]
            })
        }),
        overrideExisting: false
    });

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useChangePasswordMutation,
    useDeleteAccountMutation
} = manageApi;

export const { getProfile } = manageApi.endpoints;
