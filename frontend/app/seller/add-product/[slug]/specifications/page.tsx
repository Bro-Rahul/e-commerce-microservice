
"use client"

import Heading from "@/components/sellers/addProducts/Heading"
import { Button } from "@/components/ui/button"
import { Plus, SlidersHorizontal, X } from "lucide-react"
import { use, useState } from "react"

interface ProductSpecificationsPageProps {
    params: Promise<{
        slug: string
    }>
}

interface SpecificationPair {
    id: string
    key: string
    value: string
}

interface SpecificationTile {
    id: string
    title: string
    description: string
    pairs: SpecificationPair[]
}

const page = ({ params }: ProductSpecificationsPageProps) => {
    const { slug } = use(params)
    const [tiles, setTiles] = useState<SpecificationTile[]>([])
    const [activeTileId, setActiveTileId] = useState<string | null>(null)
    const [draftPairsByTile, setDraftPairsByTile] = useState<Record<string, SpecificationPair[]>>({})
    const [newTileTitle, setNewTileTitle] = useState("")
    const [newTileError, setNewTileError] = useState("")
    const [isAddingTile, setIsAddingTile] = useState(false)

    const activeTile = tiles.find((tile) => tile.id === activeTileId)
    const draftPairs = activeTileId ? draftPairsByTile[activeTileId] ?? [] : []

    const openTile = (tile: SpecificationTile) => {
        setActiveTileId(tile.id)
        setDraftPairsByTile((currentDrafts) => ({
            ...currentDrafts,
            [tile.id]: tile.pairs.length > 0
                ? tile.pairs.map((pair) => ({ ...pair, id: pair.id || crypto.randomUUID() }))
                : [{ id: crypto.randomUUID(), key: "", value: "" }],
        }))
    }

    const updatePair = (pairId: string, field: keyof SpecificationPair, value: string) => {
        if (!activeTileId) return

        setDraftPairsByTile((currentDrafts) => ({
            ...currentDrafts,
            [activeTileId]: (currentDrafts[activeTileId] ?? []).map((pair) => pair.id === pairId ? { ...pair, [field]: value } : pair),
        }))
    }

    const addPair = () => {
        if (!activeTileId) return

        setDraftPairsByTile((currentDrafts) => ({
            ...currentDrafts,
            [activeTileId]: [...(currentDrafts[activeTileId] ?? []), { id: crypto.randomUUID(), key: "", value: "" }],
        }))
    }

    const savePairs = () => {
        if (!activeTileId) return

        const tileId = activeTileId
        const pairsForTile = draftPairsByTile[tileId] ?? []
        setTiles((currentTiles) => currentTiles.map((tile) => tile.id === tileId
            ? { ...tile, pairs: pairsForTile.filter((pair) => pair.key.trim() || pair.value.trim()) }
            : tile
        ))
        setActiveTileId(null)
    }

    const removeDraftPair = (pairId: string) => {
        if (!activeTileId) return

        setDraftPairsByTile((currentDrafts) => ({
            ...currentDrafts,
            [activeTileId]: (currentDrafts[activeTileId] ?? []).filter((pair) => pair.id !== pairId),
        }))
    }

    const removeTile = (tileId: string) => {
        setTiles((currentTiles) => currentTiles.filter((tile) => tile.id !== tileId))
    }

    const removeSavedPair = (tileId: string, pairId: string) => {
        setTiles((currentTiles) => currentTiles.map((tile) => tile.id === tileId
            ? { ...tile, pairs: tile.pairs.filter((pair) => pair.id !== pairId) }
            : tile
        ))
    }

    const addTile = () => {
        const title = newTileTitle.trim()
        if (!title) return

        const alreadyExists = tiles.some((tile) => tile.title.trim().toLowerCase() === title.toLowerCase())
        if (alreadyExists) {
            setNewTileError(`A "${title}" group already exists.`)
            return
        }

        const id = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`
        setTiles((currentTiles) => [...currentTiles, {
            id,
            title,
            description: "Add the technical details customers should know.",
            pairs: [],
        }])
        setNewTileTitle("")
        setNewTileError("")
        setIsAddingTile(false)
    }

    return (
        <main className="mx-auto w-[80%] flex-1 px-4 pb-32 pt-6 sm:px-6 md:px-10 md:pt-10">
            <Heading Icon={SlidersHorizontal}>
                <span>
                    <span className="headline-md block">Product specifications</span>
                    <span className="mt-1 block text-sm font-normal text-on-surface-variant">
                        Add technical details customers can use to compare your product.
                    </span>
                </span>
            </Heading>

            <div className="overflow-hidden rounded-xl border border-outline-variant bg-card shadow-sm">
                <div className="border-b border-outline-variant bg-surface-container-low px-5 py-4 sm:px-8">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined rounded-lg bg-primary p-2 text-xl text-on-primary text-white">
                            tune
                        </span>
                        <div>
                            <h2 className="headline-sm">Technical specifications</h2>
                            <p className="mt-1 text-sm text-on-surface-variant">
                                Organize product information into clear specification groups.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 p-5 sm:p-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h3 className="text-base font-bold text-on-surface">Specification groups</h3>
                            <p className="mt-1 text-sm text-on-surface-variant">
                                Choose a group and add as many key-value details as your product needs.
                            </p>
                        </div>
                        <Button
                            className="w-fit rounded-lg bg-secondary px-3 py-2 text-xs font-bold text-on-secondary hover:bg-secondary/90"
                            onClick={() => {
                                setNewTileError("")
                                setIsAddingTile(true)
                            }}
                            type="button"
                        >
                            <Plus className="size-4" />
                            Add specification group
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {tiles.map((tile) => (
                            <article className="rounded-xl border border-outline-variant bg-surface-container-low p-5" key={tile.id}>
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <h4 className="text-base font-bold text-on-surface">{tile.title}</h4>
                                        <p className="mt-1 text-sm leading-5 text-on-surface-variant">{tile.description}</p>
                                    </div>
                                    <div className="flex shrink-0 items-center gap-1">
                                        <Button
                                            aria-label={`Add details to ${tile.title}`}
                                            className="rounded-lg border border-outline-variant bg-card px-3 py-2 text-xs font-bold text-on-surface hover:border-secondary hover:text-primary"
                                            onClick={() => openTile(tile)}
                                            type="button"
                                            variant="outline"
                                        >
                                            <Plus className="size-4" />
                                            Add details
                                        </Button>
                                        <Button
                                            aria-label={`Remove ${tile.title} group`}
                                            className="text-on-surface-variant hover:bg-error-container hover:text-error"
                                            onClick={() => removeTile(tile.id)}
                                            size="icon-sm"
                                            type="button"
                                            variant="ghost"
                                        >
                                            <X />
                                        </Button>
                                    </div>
                                </div>

                                {tile.pairs.length > 0 ? (
                                    <dl className="mt-5 space-y-2">
                                        {tile.pairs.map((pair, pairIndex) => (
                                            <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-3 rounded-lg border border-outline-variant bg-card px-3 py-2.5 text-sm" key={pair.id || `${pair.key}-${pair.value}-${pairIndex}`}>
                                                <dt className="font-semibold text-on-surface-variant">{pair.key}</dt>
                                                <dd className="wrap-break-word text-on-surface">{pair.value}</dd>
                                                <Button
                                                    aria-label={`Remove ${pair.key || "detail"}`}
                                                    className="text-on-surface-variant hover:bg-error-container hover:text-error"
                                                    onClick={() => removeSavedPair(tile.id, pair.id)}
                                                    size="icon-xs"
                                                    type="button"
                                                    variant="ghost"
                                                >
                                                    <X />
                                                </Button>
                                            </div>
                                        ))}
                                    </dl>
                                ) : (
                                    <p className="mt-5 rounded-lg border border-dashed border-outline-variant px-3 py-4 text-center text-xs text-on-surface-variant">
                                        No details added yet
                                    </p>
                                )}
                            </article>
                        ))}

                        {tiles.length === 0 && (
                            <p className="rounded-xl border border-dashed border-outline-variant bg-surface-container-low px-5 py-12 text-center text-sm text-on-surface-variant md:col-span-2">
                                No specification groups added yet. Use the button above to create one.
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-outline-variant bg-surface-container-low px-5 py-4 sm:flex-row sm:justify-end sm:px-8">
                    <Button
                        className="rounded-lg border border-outline-variant px-5 py-2.5 text-sm font-bold text-on-surface transition hover:bg-surface-container"
                        type="button"
                        variant="outline"
                    >
                        Cancel
                    </Button>
                    <a href={`/seller/add-product/${slug}/media-assets`}>
                        <Button
                            className="w-full rounded-lg bg-secondary px-5 py-2.5 text-sm font-bold text-on-secondary transition hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:ring-offset-2 sm:w-auto"
                            type="button"
                        >
                            Save and continue
                        </Button>
                    </a>
                </div>
            </div>

            {(activeTile || isAddingTile) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" role="presentation" onMouseDown={(event) => {
                    if (event.target === event.currentTarget) {
                        setActiveTileId(null)
                        setIsAddingTile(false)
                    }
                }}>
                    <div aria-labelledby="specification-dialog-title" aria-modal="true" className="w-full max-w-xl rounded-xl border border-outline-variant bg-card shadow-xl" role="dialog">
                        {activeTile ? (
                            <>
                                <div className="flex items-start justify-between border-b border-outline-variant px-5 py-4 sm:px-6">
                                    <div>
                                        <h2 className="headline-sm" id="specification-dialog-title">Add {activeTile.title} details</h2>
                                        <p className="mt-1 text-sm text-on-surface-variant">Add a label and its value for each product detail.</p>
                                    </div>
                                    <Button aria-label="Close dialog" className="-mr-2 -mt-1" onClick={() => setActiveTileId(null)} size="icon-sm" type="button" variant="ghost">
                                        <X />
                                    </Button>
                                </div>

                                <div className="max-h-[55vh] space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
                                    {draftPairs.map((pair, index) => (
                                        <div className="grid grid-cols-[1fr_1fr_auto] items-end gap-2 rounded-lg border border-outline-variant bg-surface-container-low p-3" key={pair.id}>
                                            <label className="space-y-1.5 text-xs font-bold text-on-surface-variant">
                                                Key
                                                <input className="inputfields" onChange={(event) => updatePair(pair.id, "key", event.target.value)} placeholder="e.g. Resolution" value={pair.key} />
                                            </label>
                                            <label className="space-y-1.5 text-xs font-bold text-on-surface-variant">
                                                Value
                                                <input className="inputfields" onChange={(event) => updatePair(pair.id, "value", event.target.value)} placeholder="e.g. 1920 x 1080 px" value={pair.value} />
                                            </label>
                                            <Button aria-label={`Remove row ${index + 1}`} className="mb-0.5 text-on-surface-variant hover:bg-error-container hover:text-error" onClick={() => removeDraftPair(pair.id)} size="icon-sm" type="button" variant="ghost">
                                                <X />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button className="text-sm font-bold text-primary" onClick={addPair} type="button" variant="ghost">
                                        <Plus />
                                        Add another detail
                                    </Button>
                                </div>

                                <div className="flex justify-end gap-3 border-t border-outline-variant bg-surface-container-low px-5 py-4 sm:px-6">
                                    <Button onClick={() => setActiveTileId(null)} type="button" variant="outline">Cancel</Button>
                                    <Button className="bg-secondary text-on-secondary hover:bg-secondary/90" onClick={savePairs} type="button">Save details</Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-start justify-between border-b border-outline-variant px-5 py-4 sm:px-6">
                                    <div>
                                        <h2 className="headline-sm" id="specification-dialog-title">Add specification group</h2>
                                        <p className="mt-1 text-sm text-on-surface-variant">Create a group for another set of product details.</p>
                                    </div>
                                    <Button aria-label="Close dialog" className="-mr-2 -mt-1" onClick={() => setIsAddingTile(false)} size="icon-sm" type="button" variant="ghost"><X /></Button>
                                </div>
                                <div className="space-y-2 px-5 py-5 sm:px-6">
                                    <label className="block text-sm font-bold text-on-surface" htmlFor="new-group-title">Group title</label>
                                    <input autoFocus className="inputfields" id="new-group-title" onChange={(event) => {
                                        setNewTileTitle(event.target.value)
                                        setNewTileError("")
                                    }} onKeyDown={(event) => event.key === "Enter" && addTile()} placeholder="e.g. Battery" value={newTileTitle} />
                                    {newTileError && <p className="text-xs font-semibold text-error">{newTileError}</p>}
                                </div>
                                <div className="flex justify-end gap-3 border-t border-outline-variant bg-surface-container-low px-5 py-4 sm:px-6">
                                    <Button onClick={() => setIsAddingTile(false)} type="button" variant="outline">Cancel</Button>
                                    <Button className="bg-secondary text-on-secondary hover:bg-secondary/90" disabled={!newTileTitle.trim()} onClick={addTile} type="button">Add group</Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </main>
    )
}

export default page