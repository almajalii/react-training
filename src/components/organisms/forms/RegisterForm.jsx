import { useTranslation } from 'react-i18next';
import { Button } from '@heroui/react';
import { Link } from 'react-router-dom';
import FormField from '../../molecules/formField/FormField';
import { gfx } from '../../../styles/themeColors';
import FormRow from '../../molecules/formRow/FormRow';

export default function RegisterForm({ formik }) {
  const { t } = useTranslation();

  return (
    <div className={`${gfx.cardLg} px-8 py-10`}>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-ink tracking-tight mb-1">
          {t('create_account')}
        </h1>
        <p className="text-sm text-muted">{t('join_now')}</p>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <FormRow>
          <FormField
            label={t('firstName')}
            name="firstName"
            placeholder="Ahmad"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.firstName}
            touched={formik.touched.firstName}
          />
          <FormField
            label={t('lastName')}
            name="lastName"
            placeholder="Khalil"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.lastName}
            touched={formik.touched.lastName}
          />
        </FormRow>

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
          placeholder="+962791234567"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.phone}
          touched={formik.touched.phone}
        />

        <FormRow>
          <FormField
            label={t('password')}
            name="password"
            type="password"
            placeholder="••••••••"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password}
            touched={formik.touched.password}
          />
          <FormField
            label={t('confirm_password')}
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.confirmPassword}
            touched={formik.touched.confirmPassword}
          />
        </FormRow>

        <Button
          type="submit"
          isLoading={formik.isSubmitting}
          isDisabled={formik.isSubmitting}
          className={`w-full ${gfx.btnPrimary} h-11 rounded-xl`}
        >
          {t('register')}
        </Button>
      </form>

      <p className="text-center text-sm text-muted mt-6">
        {t('already_have_account')}{' '}
        <Link to="/login" className="text-ink font-semibold hover:underline">
          {t('sign_in')}
        </Link>
      </p>
    </div>
  );
}
