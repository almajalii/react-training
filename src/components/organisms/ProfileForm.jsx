import { useTranslation } from 'react-i18next';
import { Button } from '@heroui/react';
import FormField from '../molecules/FormField';
import { gfx } from '../../styles/themeColors';

export default function ProfileForm({ formik, success, user }) {
  const { t } = useTranslation();

  return (
    <div className={`${gfx.cardLg} px-8 py-10`}>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight mb-1">
          {user?.firstName && user?.lastName
            ? `${user.firstName} ${user.lastName}`
            : t('profile')}
        </h1>
        <p className="text-sm text-muted">{t('update_profile_info')}</p>
      </div>

      {/* Success message — kept inline since it's positive feedback */}
      {success && (
        <div className="mb-5 px-4 py-3 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl">
          <p className="text-green-600 dark:text-green-400 text-sm">{t('profile_updated')}</p>
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <FormField
          label={t('email')}
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email}
          touched={formik.touched.email}
        />

        <FormField
          label={t('phone')}
          name="phone"
          type="tel"
          placeholder="+1234567890"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.phone}
          touched={formik.touched.phone}
        />

        <FormField
          label={t('dateOfBirth')}
          name="dateOfBirth"
          type="date"
          value={formik.values.dateOfBirth}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.dateOfBirth}
          touched={formik.touched.dateOfBirth}
        />

        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            {t('gender')}
          </label>
          <select
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2.5 rounded-lg border transition-colors outline-none cursor-pointer
              ${formik.touched.gender && formik.errors.gender
                ? 'border-red-500 dark:border-red-400'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white
              focus:border-brand dark:focus:border-brand focus:ring-1 focus:ring-brand/20
            `}
          >
            <option value="">{t('select_gender')}</option>
            <option value="Male">{t('male')}</option>
            <option value="Female">{t('female')}</option>
          </select>
          {formik.touched.gender && formik.errors.gender && (
            <p className="text-red-500 dark:text-red-400 text-xs mt-1">{formik.errors.gender}</p>
          )}
        </div>

        <Button
          type="submit"
          isLoading={formik.isSubmitting}
          isDisabled={formik.isSubmitting}
          className={`w-full ${gfx.btnPrimary} h-11 rounded-xl cursor-pointer`}
        >
          {formik.isSubmitting ? t('saving') : t('save_changes')}
        </Button>
      </form>
    </div>
  );
}