import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EmailVerificationState {
    userId: number | null;
    setUserId: (id: number) => void;
    clearUserId: () => void;
}

const useEmailVerification = create<EmailVerificationState>()(
    persist(
        (set) => ({
            userId: null,
            setUserId: (id) => set({ userId: id }),
            clearUserId: () => set({ userId: null }),
        }),
        {
            name: "email-varification-id",
        }
    )
);

export default useEmailVerification;