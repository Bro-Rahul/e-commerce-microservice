import React from 'react'

const offerCards = [
    {
        label: 'Cashback',
        value: 'Upto ₹655.00',
        sub: 'Cashback as Amazon Pay balance',
        accent: 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100',
    },
    {
        label: 'No Cost EMI',
        value: 'Upto ₹759.00',
        sub: 'Interest savings on EMI',
        accent: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-100',
    },
    {
        label: 'Bank Offer',
        value: 'Upto ₹1,000',
        sub: 'on select bank cards',
        accent: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-100',
    },
]

const OffersCard = () => {
    return (
        <div>
            <div className="mb-3 flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M5 12h14M12 5v14" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="9" />
                </svg>
                <span className="text-sm font-bold text-foreground">Offers</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
                {offerCards.map((offer) => (
                    <div key={offer.label} className={`min-w-38 rounded-lg border p-3 shadow-sm ${offer.accent}`}>
                        <div className="mb-2 text-[10px] font-semibold uppercase tracking-wide opacity-80">
                            {offer.label}
                        </div>
                        <div className="text-sm font-bold">{offer.value}</div>
                        <div className="mt-1 text-[11px] opacity-80">{offer.sub}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OffersCard