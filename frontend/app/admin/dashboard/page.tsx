import Image from 'next/image'
import Link from 'next/link'
import {
    Activity,
    ArrowRight,
    ArrowUp,
    BookOpen,
    Boxes,
    Check,
    CircleAlert,
    ClipboardCheck,
    ClipboardList,
    Package,
    Plus,
    Shapes,
    SlidersHorizontal,
    Store,
    UserRoundCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const stats: {
    label: string
    value: string
    detail: string
    icon: LucideIcon
    tone: 'neutral' | 'info' | 'warning'
}[] = [
        { label: 'Total Products', value: '142,850', detail: '+1,240 added this month', icon: Package, tone: 'neutral' },
        { label: 'Active Categories', value: '6', detail: '37 subcategories across catalog hierarchy', icon: Shapes, tone: 'info' },
        { label: 'Pending Reviews', value: '18', detail: 'Seller verification & spec audits', icon: CircleAlert, tone: 'warning' },
        { label: 'Active Merchants', value: '1,240', detail: '99.8% health score · verified', icon: Store, tone: 'neutral' },
    ]

const gateways: { title: string; description: string; icon: LucideIcon; href: string; count?: string }[] = [
    { title: 'Category Taxonomy', description: 'Reorder, nest, or map catalog tree', icon: Boxes, href: '#category-taxonomy' },
    { title: 'Product Management', description: 'Audit live catalog & price locks', icon: ClipboardCheck, href: '#product-management' },
    { title: 'Pending Approvals', description: 'Review merchant listing requests', icon: ClipboardList, href: '#pending-submissions', count: '18' },
    { title: 'Store Ops Settings', description: 'SLA tiers, tax rules, and channels', icon: SlidersHorizontal, href: '#store-ops-settings' },
]

const submissions = [
    {
        title: 'Samsung Galaxy S25 5G 256GB Navy',
        merchant: 'Global Stores LLC',
        submitted: '42 mins ago',
        category: 'Electronics',
        image: '/admin/dashboard/samsung-galaxy-s25.jpg',
        action: 'Approve',
    },
    {
        title: 'Poco M8 5G Frost Silver',
        merchant: 'TechVardhman Tele',
        submitted: '1h 10m ago',
        category: 'Mobiles',
        image: '/admin/dashboard/poco-m8.jpg',
        action: 'Approve',
    },
    {
        title: 'Ultra-Slim MagSafe Power Bank',
        merchant: 'VoltTech Accessories',
        submitted: 'Safety Doc pending',
        category: 'UN 38.3 Req',
        image: '/admin/dashboard/magsafe-power-bank.jpg',
        action: 'Request Doc',
        secondaryAction: 'Audit Cert',
    },
    {
        title: "The Asura's Curse by Anu Kay",
        merchant: 'Srishti Publishers',
        submitted: '1h 45m ago',
        category: 'Literature',
        action: 'Approve',
    },
]

const distribution = [
    { name: 'Books & Media', count: '88,400', percent: 40.8, color: 'bg-primary' },
    { name: 'Fashion & Apparel', count: '54,120', percent: 25, color: 'bg-secondary' },
    { name: 'Electronics', count: '42,850', percent: 19.8, color: 'bg-tertiary' },
    { name: 'Home & Kitchen', count: '31,200', percent: 14.4, color: 'bg-muted-foreground' },
]

const activities: { icon: LucideIcon; tone: string; children: React.ReactNode; time: string }[] = [
    {
        icon: Plus,
        tone: 'bg-secondary/15 text-secondary',
        children: <>Category <strong className="font-semibold text-foreground">&quot;Smart Wearables&quot;</strong> created by Admin Ops</>,
        time: '8 mins ago',
    },
    {
        icon: Activity,
        tone: 'bg-muted text-foreground',
        children: <><strong className="font-semibold text-foreground">50 SKUs activated</strong> for merchant TechVardhman</>,
        time: '24 mins ago',
    },
    {
        icon: UserRoundCheck,
        tone: 'bg-tertiary-container/15 text-tertiary-container',
        children: <>New merchant <strong className="font-semibold text-foreground">Aura Home Decor</strong> onboarded & KYC approved</>,
        time: '1 hour ago',
    },
]


function MetricCard({ label, value, detail, icon: Icon, tone }: (typeof stats)[number]) {
    return (
        <article className="rounded-xl border border-outline-variant/60 bg-card p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-3">
                <h2 className={`text-xs font-bold uppercase tracking-wider ${tone === 'warning' ? 'text-secondary' : 'text-muted-foreground'}`}>
                    {label}
                </h2>
                <span className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${tone === 'warning' ? 'bg-secondary/15 text-secondary' : tone === 'info' ? 'bg-tertiary-container/15 text-tertiary-container' : 'bg-muted text-foreground'
                    }`}>
                    <Icon className="size-5" />
                </span>
            </div>
            <p className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{value}</p>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                {label === 'Total Products' && <ArrowUp className="size-4 text-secondary" />}
                {label === 'Pending Reviews' && <span className="rounded-full bg-secondary/15 px-2 py-0.5 text-xs font-semibold text-secondary">Action Req</span>}
                {label === 'Active Merchants' && <span className="size-2 rounded-full bg-secondary" />}
                {detail}
            </p>
        </article>
    )
}

export default function AdminDashboardPage() {
    return (
        <main className="mx-auto w-full min-h-0 min-w-0 max-w-[1900px] flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="flex flex-col gap-8">
                <section className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Store Operations
                            <span className="size-1 rounded-full bg-outline" />
                            <span className="font-medium normal-case tracking-normal text-secondary">Live Environment</span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Admin Dashboard</h1>
                        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                            Overview of platform operations, catalog metrics, and pending actions.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <a
                            href="#catalog-distribution"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-outline-variant bg-muted px-4 py-2.5 text-sm font-semibold text-foreground no-underline transition-colors hover:bg-surface-container-high"
                        >
                            <Package className="size-5" />
                            Manage Catalog
                        </a>
                        <a
                            href="#category-taxonomy"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-on-secondary no-underline transition-opacity hover:opacity-90"
                        >
                            <Plus className="size-5" />
                            Create Category
                        </a>
                    </div>
                </section>

                <section aria-label="Platform metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
                    {stats.map((stat) => <MetricCard key={stat.label} {...stat} />)}
                </section>

                <section aria-labelledby="gateways-title">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                        <h2 id="gateways-title" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Operational Gateways</h2>
                        <p className="text-sm text-muted-foreground">Catalog &amp; Seller Control</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
                        {gateways.map(({ title, description, icon: Icon, href, count }) => (
                            <Link
                                key={title}
                                id={title === 'Category Taxonomy' ? 'category-taxonomy' : title === 'Product Management' ? 'product-management' : title === 'Pending Approvals' ? 'pending-approvals' : 'store-ops-settings'}
                                href={href}
                                className="group flex min-h-28 items-center gap-4 rounded-xl border border-outline-variant/60 bg-card p-4 text-foreground no-underline shadow-sm transition-colors hover:bg-muted"
                            >
                                <span className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${title === 'Pending Approvals' ? 'bg-secondary/15 text-secondary' : 'bg-muted text-foreground'
                                    }`}>
                                    <Icon className="size-6" />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="flex items-center justify-between gap-2">
                                        <span className="font-semibold">{title}</span>
                                        {count
                                            ? <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-bold text-on-secondary">{count}</span>
                                            : <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />}
                                    </span>
                                    <span className="mt-1 block truncate text-sm text-muted-foreground">{description}</span>
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-1 items-start gap-5 2xl:grid-cols-[minmax(0,1.35fr)_minmax(380px,1fr)]">
                    <section id="pending-submissions" aria-labelledby="pending-title" className="min-w-0 rounded-xl border border-outline-variant/60 bg-card p-4 shadow-sm sm:p-6">
                        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <ClipboardCheck className="size-6 text-secondary" />
                                <h2 id="pending-title" className="text-lg font-bold text-foreground">Pending Submissions Needing Action</h2>
                            </div>
                            <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">18 In Queue</span>
                        </div>
                        <div className="space-y-3">
                            {submissions.map((submission) => (
                                <article key={submission.title} className="flex flex-col gap-4 rounded-lg bg-muted/70 p-3 sm:flex-row sm:items-center sm:p-4">
                                    {submission.image
                                        ? <Image
                                            src={submission.image}
                                            alt=""
                                            width={64}
                                            height={64}
                                            className="size-16 shrink-0 rounded-lg bg-surface-container-high object-cover"
                                        />
                                        : <span className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-tertiary text-tertiary-fixed">
                                            <BookOpen className="size-7" />
                                        </span>}
                                    <div className="min-w-0 flex-1">
                                        <h3 className="truncate font-semibold text-foreground">{submission.title}</h3>
                                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                                            <span className="text-foreground">{submission.merchant}</span>
                                            <span aria-hidden="true">·</span>
                                            <span>{submission.submitted}</span>
                                            <span aria-hidden="true">·</span>
                                            <span className="text-secondary">{submission.category}</span>
                                        </div>
                                    </div>
                                    <div className="flex shrink-0 flex-wrap gap-2 sm:justify-end">
                                        {submission.action === 'Approve' ? (
                                            <>
                                                <button type="button" className="rounded-md bg-muted px-3 py-2 text-xs font-semibold text-foreground hover:bg-surface-container-high">
                                                    Review
                                                </button>
                                                <button type="button" className="rounded-md bg-secondary px-3 py-2 text-xs font-semibold text-on-secondary transition-opacity hover:opacity-90">
                                                    Approve
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button type="button" className="rounded-md bg-muted px-3 py-2 text-xs font-semibold text-foreground hover:bg-surface-container-high">
                                                    {submission.secondaryAction}
                                                </button>
                                                <button type="button" className="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-on-primary hover:opacity-90">
                                                    {submission.action}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                            <a href="#pending-approvals" className="inline-flex items-center gap-2 text-sm font-semibold text-secondary no-underline hover:underline">
                                View all 18 pending reviews <ArrowRight className="size-4" />
                            </a>
                            <p className="text-xs text-muted-foreground">Next auto-sync in 4m 12s</p>
                        </div>
                    </section>

                    <div className="space-y-5">
                        <section id="catalog-distribution" aria-labelledby="distribution-title" className="rounded-xl border border-outline-variant/60 bg-card p-5 shadow-sm sm:p-6">
                            <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl leading-none text-primary">◉</span>
                                    <h2 id="distribution-title" className="text-lg font-bold text-foreground">Catalog Distribution</h2>
                                </div>
                                <span className="text-sm text-muted-foreground">216,570 Total SKUs</span>
                            </div>
                            <div className="space-y-5">
                                {distribution.map(({ name, count, percent, color }) => (
                                    <div key={name}>
                                        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                                            <span className="flex min-w-0 items-center gap-2 text-foreground">
                                                <span className={`size-3 shrink-0 rounded-sm ${color}`} />
                                                <span className="truncate">{name}</span>
                                            </span>
                                            <span className="shrink-0 text-muted-foreground"><strong className="font-semibold text-foreground">{count}</strong> ({percent}%)</span>
                                        </div>
                                        <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                                            <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-muted px-4 py-3 text-sm">
                                <span className="flex items-center gap-2 text-muted-foreground"><Check className="size-5" /> Indexing Health</span>
                                <strong className="text-foreground">100% Synced to Algolia</strong>
                            </div>
                        </section>

                        <section aria-labelledby="activity-title" className="rounded-xl border border-outline-variant/60 bg-card p-5 shadow-sm sm:p-6">
                            <div className="mb-6 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <ClipboardList className="size-6 text-primary" />
                                    <h2 id="activity-title" className="text-lg font-bold text-foreground">Platform Activity Log</h2>
                                </div>
                                <span className="text-xs font-semibold text-secondary">Real-time</span>
                            </div>
                            <ol className="space-y-5">
                                {activities.map(({ icon: Icon, tone, children, time }) => (
                                    <li key={time} className="flex gap-3">
                                        <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${tone}`}>
                                            <Icon className="size-5" />
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-sm leading-6 text-foreground">{children}</p>
                                            <p className="mt-1 text-xs text-muted-foreground">{time}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    )
}
