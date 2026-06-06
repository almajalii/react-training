import { gfx } from '../../styles/themeColors';

export default function BookingCardSkeleton() {
  return (
    <div className={`${gfx.card} p-5 flex items-center gap-4 animate-pulse`}>
      <div className="w-12 h-12 rounded-2xl bg-chip shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-chip rounded w-1/2" />
        <div className="h-3 bg-chip rounded w-1/3" />
        <div className="h-3 bg-chip rounded w-2/3" />
      </div>
      <div className="w-14 h-5 bg-chip rounded-full" />
    </div>
  );
}
