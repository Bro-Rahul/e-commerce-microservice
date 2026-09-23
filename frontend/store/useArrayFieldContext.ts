import React from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'


interface UseArrayFieldStoreType {
    data: {
        [k: string]: any[]
    },
    setArrayField: (key: string, payload: any[]) => void,
}

const useArrayFieldStore = create<UseArrayFieldStoreType>()(
    persist((set) => ({
        data: {},
        setArrayField: (key, payload) =>
            set((state) => ({
                ...state,
                data: {
                    ...state.data,
                    [key]: payload
                }
            })),
    }), {
        name: "arrayField-Data"
    })
)
export default useArrayFieldStore