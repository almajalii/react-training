import { Link as RouterLink } from 'react-router-dom';
import { useLogin } from './useLogin';
import { useTranslation } from 'react-i18next';
import { Button, Card, CardBody } from '@heroui/react';

function Login() {
    const {
        email, setEmail, password, setPassword, loading, handleSubmit,
        resetEmail, setResetEmail, resetLoading, resetSuccess, handleResetSubmit,
        section, goToForgotPassword, goToLogin,
        error
    } = useLogin();

    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";
    const inputClass = [
        "w-full px-4 py-2.5 text-sm rounded-xl",
        "border border-gray-200 dark:border-gray-700",
        "bg-white dark:bg-gray-800",
        "text-gray-900 dark:text-white",
        "placeholder:text-gray-400 dark:placeholder:text-gray-500",
        "outline-none transition-all duration-200",
        "hover:border-indigo-400 dark:hover:border-indigo-500",
        "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10",
        "dark:focus:border-indigo-400",
    ].join(" ");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-10 transition-colors duration-300">
            <Card className="w-full max-w-105 bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-950/50 border-0 rounded-2xl">
                <CardBody className={`px-10 py-10 ${isRTL ? 'text-right' : 'text-left'}`}>

                    {section === 'login' && (
                        <>
                            <h1 className="text-[26px] font-bold text-gray-900 dark:text-white text-center mb-2">
                                {t('welcome_back')}
                            </h1>
                            <p className="text-sm text-gray-400 dark:text-gray-500 text-center mb-7">
                                {t('sign_in_account')}
                            </p>

                            {error && (
                                <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl">
                                    <p className="text-red-500 dark:text-red-400 text-sm text-center">{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div>
                                    <label className={labelClass}>{t('email')}</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className={inputClass}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>{t('password')}</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className={inputClass}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    isLoading={loading}
                                    isDisabled={loading || !email || !password}
                                    className="w-full mt-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold text-[15px] rounded-xl h-11.5 transition-all duration-200"
                                >
                                    {loading ? t('signing_in') : t('sign_in')}
                                </Button>
                            </form>

                            <div className="flex flex-col items-center gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={goToForgotPassword}
                                    className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                                >
                                    {t('forgot_password')}
                                </button>
                                <p className="text-sm text-gray-400 dark:text-gray-500">
                                    {t('no_account')}{' '}
                                    <RouterLink to="/register" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                                        {t('register_here')}
                                    </RouterLink>
                                </p>
                            </div>
                        </>
                    )}

                    {section === 'forgot-password' && (
                        <>
                            <h1 className="text-[26px] font-bold text-gray-900 dark:text-white text-center mb-2">
                                {t('reset_password')}
                            </h1>
                            <p className="text-sm text-gray-400 dark:text-gray-500 text-center mb-7">
                                {t('reset_description')}
                            </p>

                            {error && (
                                <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl">
                                    <p className="text-red-500 dark:text-red-400 text-sm text-center">{error}</p>
                                </div>
                            )}

                            {resetSuccess ? (
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-2">
                                        <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="text-green-600 dark:text-green-400 text-sm text-center">
                                        {t('reset_email_sent')}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={goToLogin}
                                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                                    >
                                        {t('back_to_signin')}
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleResetSubmit} className="flex flex-col gap-4">
                                    <div>
                                        <label className={labelClass}>{t('email')}</label>
                                        <input
                                            type="email"
                                            placeholder="you@example.com"
                                            value={resetEmail}
                                            onChange={(e) => setResetEmail(e.target.value)}
                                            required
                                            className={inputClass}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        isLoading={resetLoading}
                                        isDisabled={resetLoading || !resetEmail}
                                        className="w-full mt-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold text-[15px] rounded-xl h-11.5 transition-all duration-200"
                                    >
                                        {resetLoading ? t('sending') : t('send_reset_email')}
                                    </Button>

                                    <button
                                        type="button"
                                        onClick={goToLogin}
                                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline text-center"
                                    >
                                        {t('back_to_signin')}
                                    </button>
                                </form>
                            )}
                        </>
                    )}

                </CardBody>
            </Card>
        </div>
    );
}

export default Login;