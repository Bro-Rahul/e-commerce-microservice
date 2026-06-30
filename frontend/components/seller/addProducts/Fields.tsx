const Field = ({ label, children }: { label: string; children: React.ReactNode }) => {
    return <div className="grid gap-1">
        <label className="text-sm font-bold">{label}</label>
        {children}
    </div>;
}

export default Field;