import { gfx } from '../../../styles/themeColors';

export default function ProCardSkeleton() {
    return (
        <div className={`${gfx.card} p-5 flex flex-col gap-4 animate-pulse`}>
            <div className="flex gap-3.5 items-start">
                <div className="w-14 h-14 rounded-2xl bg-chip shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                    <div className="h-4 bg-chip rounded w-2/3" />
                    <div className="h-3 bg-chip rounded w-1/2" />
                    <div className="h-3 bg-chip rounded w-1/3" />
                </div>
            </div>
            <div className="pt-3.5 border-t border-line flex gap-4">
                <div className="h-3 bg-chip rounded w-16" />
                <div className="h-3 bg-chip rounded w-16 ml-auto" />
            </div>
        </div>
    );
}