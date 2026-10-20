"use client"
import useSWR from "swr"

interface UseFetchDebounceProps<R> {
    fetcherFn: () => Promise<R>;
    fallbackData: R;
    url: string,
}

const useClientFetcher = <R>({
    fetcherFn,
    fallbackData,
    url,

}: UseFetchDebounceProps<R>) => {

    const { data, isLoading, isValidating, error } = useSWR(url, fetcherFn, {
        suspense: true,
        fallbackData,
    })

    return {
        data,
        isLoading,
        isValidating,
        error
    };
};

export default useClientFetcher;
