import { Categories } from '@/constants/data'
import { ArrowRight, Plus } from 'lucide-react'

const CategoryList = () => {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">

            {Categories.map(({ name, icon: Icon, description, href }) =>
                <a
                    key={name}
                    href={href}
                    className="group retail-card-interactive flex min-h-36 items-center gap-4 p-5 no-underline hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-container text-primary-container-foreground transition-transform duration-200 group-hover:scale-105">
                        <Icon className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="headline-sm text-foreground">{name}</h3>
                        <p className="body-md mt-1 text-muted-foreground">{description}</p>
                    </div>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-foreground" />
                </a>
            )}
            <a
                href="#"
                className="group flex min-h-36 items-center gap-4 rounded-lg border border-dashed border-outline bg-surface-container-low p-5 text-foreground no-underline transition-colors hover:border-primary hover:bg-primary-container/20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface-container-high text-muted-foreground">
                    <Plus className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="headline-sm">Something else</h3>
                    <p className="body-md mt-1 text-muted-foreground">Browse every category</p>
                </div>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" />
            </a>
        </div>
    )
}

export default CategoryList