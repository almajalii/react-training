import { useTranslation } from 'react-i18next';
import { Button } from '@heroui/react';
import { Link } from 'react-router-dom';
import FormField from '../molecules/FormField';
import { gfx } from '../../styles/themeColors';

export default function LoginForm({ formik }) {
  const { t } = useTranslation();

  return (
    <div className={`${gfx.cardLg} px-8 py-10`}>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-ink tracking-tight mb-1">{t('welcome_back')}</h1>
        <p className="text-sm text-muted">{t('sign_in_account')}</p>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <FormField label={t('email')} name="email" type="email" placeholder="you@example.com"
          value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
          error={formik.errors.email} touched={formik.touched.email} />

        <FormField label={t('password')} name="password" type="password" placeholder="••••••••"
          value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
          error={formik.errors.password} touched={formik.touched.password} />

        <Button type="submit" isLoading={formik.isSubmitting} isDisabled={formik.isSubmitting}
          className={`w-full ${gfx.btnPrimary} h-11 rounded-xl`}>
          {t('sign_in')}
        </Button>
      </form>

      <p className="text-center text-sm text-muted mt-6">
        {t('no_account')}{' '}
        <Link to="/register" className="text-ink font-semibold hover:underline">{t('register_here')}</Link>
      </p>
    </div>
  );
}