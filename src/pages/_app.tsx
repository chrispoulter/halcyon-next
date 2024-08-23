import { useState } from 'react';
import type { AppProps } from 'next/app';
import { Open_Sans } from 'next/font/google';
import router from 'next/router';
import { SessionProvider, signOut } from 'next-auth/react';
import {
    HydrationBoundary,
    MutationCache,
    QueryCache,
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import toast from 'react-hot-toast';
import { Meta } from '@/components/Meta/Meta';
import { Header } from '@/components/Header/Header';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { Footer } from '@/components/Footer/Footer';
import { Toaster } from '@/components/Toast/Toast';
import { FetchError } from '@/utils/fetch';

import '@/styles/globals.css';

const font = Open_Sans({
    subsets: ['latin'],
    display: 'swap'
});

const App = ({
    Component,
    pageProps: { session, dehydratedState = {}, ...pageProps }
}: AppProps) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60 * 5,
                        retry: false
                    }
                },
                queryCache: new QueryCache({
                    onError: (error: Error) => {
                        if (error instanceof FetchError) {
                            switch (error.status) {
                                case 401:
                                    return signOut({ callbackUrl: '/' });

                                case 403:
                                    return router.push('/403', router.asPath);

                                case 404:
                                    return router.push('/404', router.asPath);

                                default:
                                    return router.push('/500', router.asPath);
                            }
                        }

                        return router.push('/500', router.asPath);
                    }
                }),
                mutationCache: new MutationCache({
                    onError: (error: Error) => {
                        if (error instanceof FetchError) {
                            const message = error?.response?.title;

                            switch (error.status) {
                                case 401:
                                    return signOut({ callbackUrl: '/' });

                                case 403:
                                    return toast.error(
                                        'Sorry, you do not have access to this resource.'
                                    );

                                case 404:
                                    return toast.error(
                                        'Sorry, the resource you were looking for could not be found.'
                                    );

                                default:
                                    return toast.error(message);
                            }
                        }

                        return toast.error(
                            error.message ||
                                'Sorry, something went wrong. Please try again later.'
                        );
                    }
                })
            })
    );

    return (
        <>
            <Meta />

            <style jsx global>{`
                :root {
                    --base-font: ${font.style.fontFamily};
                }
            `}</style>

            <SessionProvider session={session}>
                <QueryClientProvider client={queryClient}>
                    <HydrationBoundary state={dehydratedState}>
                        <Header />
                        <main>
                            <ErrorBoundary>
                                <Component {...pageProps} />
                            </ErrorBoundary>
                        </main>
                        <Footer />
                    </HydrationBoundary>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </SessionProvider>
            <Toaster />
        </>
    );
};

export default App;
