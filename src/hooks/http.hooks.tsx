import { useState, useCallback } from "react";

type HttpRequestMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE'
export type loadingStatusOptions = 'idle' | 'loading' | 'error';
interface HttpHeaders {
    [key: string]: string
}
interface HttpRequestProps {
    url: string,
    method?: HttpRequestMethods,
    body?: string | null,
    headers?: HttpHeaders
}

export const useHttp = () => {
    const [loadingStatus, setLoadingStatus] = useState<loadingStatusOptions>('idle');
    // const [error, setError] = useState<string | null>(null);

    const request = useCallback(async (
    {
        url, 
        method = 'GET', 
        body = null, 
        headers = {'Content-type': 'application/json'}
    }: HttpRequestProps
    ) => {
        setLoadingStatus('loading');
        try {

            const response = await fetch(url, {method, body, headers})

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`)
            }

            const data = await response.json();
            setLoadingStatus('idle');

            return data

        } catch(e) {
            setLoadingStatus('error')
            throw e
        }
    }, [])
    return {loadingStatus, request}
}