import { useSelector } from 'react-redux';
import { useState } from 'react';
import Footer from '../../components/organisms/footer/Footer';
import Header from '../../components/organisms/header/Header';
import TabBar from '../../components/molecules/tabBar/TabBar';
import BookingCard from '../../components/organisms/myBookings/bookingCard/BookingCard';
import BookingDrawer from '../../components/organisms/myBookings/bookingDrawer/BookingDrawer';
import BookingCardSkeleton from './BookingCardSkeleton';
import BookingEmptyState from './BookingEmptyState';
import { useMyBookings } from './useMyBookings';

export default function MyBookings() {
  const {
    t,
    upcoming,
    past,
    upcomingLoading,
    pastLoading,
    openBooking,
    openDrawer,
    closeDrawer,
    cancel,
    reschedule,
    canReschedule,
    canCancel,
    handleMessagePro,
    user,
    tab,
    setTab,
  } = useMyBookings();

  // Decide which list to show based on the active tab
  const list = tab === 'upcoming' ? upcoming : past;
  const loading = tab === 'upcoming' ? upcomingLoading : pastLoading;

  return (
    <div className="min-h-screen bg-page flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-10">
        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-ink tracking-tight mb-3">
            {t('bk_page_title', { name: user?.firstName })}
          </h1>
          <p className="text-muted text-[16px] max-w-lg">{t('bk_page_subtitle')}</p>
        </div>

        {/* Tabs */}
        <TabBar
          tabs={[
            { key: 'upcoming', label: t('bk_tab_upcoming') },
            { key: 'past', label: t('bk_tab_past') },
          ]}
          active={tab}
          onChange={setTab}
          className="mb-8"
        />

        {/* Loading skeletons */}
        {loading && (
          <div className="flex flex-col gap-3">
            {[0, 1, 2].map((i) => (
              <BookingCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && list.length === 0 && <BookingEmptyState tab={tab} t={t} />}

        {/* Booking list */}
        {!loading && list.length > 0 && (
          <div className="flex flex-col gap-3">
            {list.map((booking, i) => (
              <BookingCard key={booking.id} booking={booking} index={i} onClick={() => openDrawer(booking.id)} />
            ))}
          </div>
        )}
      </main>

      <Footer />

      {openBooking && (
        <BookingDrawer
          booking={openBooking}
          onClose={closeDrawer}
          onCancel={cancel}
          onReschedule={reschedule}
          canReschedule={canReschedule}
          canCancel={canCancel}
          onMessagePro={handleMessagePro}
        />
      )}
    </div>
  );
}
