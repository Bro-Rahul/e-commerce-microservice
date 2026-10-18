"use client"
import { useEffect } from "react";
import useSWR from "swr"

interface UseFetchDebounceProps<A, R> {
    deboundFn: () => Promise<R>;
    fallbackData: R;
    watch: A;
    url: string,
    duration?: number;
}

const useFetchDebounce = <A, R>({
    deboundFn,
    fallbackData,
    watch,
    url,
    duration = 1000,

}: UseFetchDebounceProps<A, R>) => {

    const { data, isLoading, isValidating, error, mutate } = useSWR(url, deboundFn, {
        suspense: true,
        fallbackData,
    })

    useEffect(() => {
        const timeout = setTimeout(() => {
            mutate()
        }, duration)

        return () => {
            clearTimeout(timeout);
        }
    }, [watch, duration, mutate]);

    return {
        data,
        isLoading,
        isValidating,
        error
    };
};

export default useFetchDebounce;
