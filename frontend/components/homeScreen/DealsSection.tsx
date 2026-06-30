// components/home/DealsSection.tsx

import { DealCard } from "./DealCard";

export function DealsSection() {
    return (
        <section className="commerce-section">
            <div className="rounded-lg border bg-card p-5">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                        Today's Deals
                    </h2>

                    <button className="text-link">
                        See all deals
                    </button>
                </div>

                <div className="flex gap-3 overflow-x-auto">
                    {/* map deal cards */}
                </div>
            </div>
        </section>
    );
}