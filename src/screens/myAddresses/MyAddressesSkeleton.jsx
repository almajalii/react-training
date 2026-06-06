import { gfx } from '../../styles/themeColors';

export default function MyAddressesSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {[0, 1, 2].map((i) => (
        <div key={i} className={`${gfx.card} p-5 animate-pulse`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-surface-2" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-surface-2 rounded w-1/2" />
              <div className="h-3 bg-surface-2 rounded w-1/3" />
            </div>
          </div>
          <div className="h-3 bg-surface-2 rounded w-3/4 mb-2" />
          <div className="h-3 bg-surface-2 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}
