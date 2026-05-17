import ProCard from '../../organisms/proCard/ProCard';
import ProCardSkeleton from '../../organisms/proCard/ProCardSkeleton';
import { useBrowseResults } from './useBrowseResults';

export default function BrowseResults({ professionals, loading }) {
    const { t, SKELETON_COUNT } = useBrowseResults();

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                {/* professional count */}
                <p className="text-sm text-muted">
                    {loading ? (
                        <span className="inline-block w-24 h-4 bg-chip rounded animate-pulse" />
                    ) : (
                        <>
                            <span className="font-semibold text-ink">{professionals.length}</span>{' '}
                            {t('browse_pros_available')}
                        </>
                    )}
                </p>
            </div>
            {/* show skeletons while loading */}
            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                        <ProCardSkeleton key={i} />
                    ))}
                </div>
            )}

            {/* show no results message */}
            {!loading && professionals.length === 0 && (
                <div className="flex items-center justify-center py-20 border border-dashed border-line rounded-2xl text-muted text-sm">
                    {t('browse_no_results')}
                </div>
            )}
            {/*  show results */}
            {!loading && professionals.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {professionals.map((p, i) => (
                        <ProCard key={p.id} pro={p} index={i} />
                    ))}
                </div>
            )}
        </div>
    );
}