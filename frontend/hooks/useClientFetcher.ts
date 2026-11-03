"use client"
import useSWR from "swr"

interface UseClientFetcherProps<R> {
    fetcherFn: () => Promise<R>;
    fallbackData: R;
    url: string,
}

const useClientFetcher = <R>({
    fetcherFn,
    fallbackData,
    url,

}: UseClientFetcherProps<R>) => {

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
