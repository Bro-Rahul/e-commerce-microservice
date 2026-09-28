import React from 'react'

interface AboutItemsProps {
    aboutItem: {
        [k: string]: string
    }
}



const AboutItems = ({ aboutItem }: AboutItemsProps) => {
    return (
        <div className="mt-6 border-t border-border pt-6">
            <h3 className="mb-3 text-sm font-bold text-foreground">About this item</h3>
            <ul className="list-inside list-disc space-y-1 text-xs text-foreground/90">
                {Object.entries(aboutItem).map(([key, val], index) =>
                    <li key={index}><span className="font-bold">{key}:</span> {val}</li>
                )}
            </ul>
            <a href="#" className="mt-3 inline-block text-xs text-primary hover:underline">
                See more product details
            </a>
            <div className="mt-6 flex cursor-pointer items-center gap-2 text-muted-foreground hover:text-primary">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 8v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-xs font-medium">Report an issue with this product</span>
            </div>
        </div>
    )
}

export default AboutItems