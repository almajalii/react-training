import { Link as RouterLink } from 'react-router-dom';
import { useRegister } from './useRegister';
import { Button, Card, CardBody } from '@heroui/react';

export default function Register() {
    const {
        email, setEmail,
        username, setUsername,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        bio, setBio,
        loading, error,
        handleSubmit,
        labelClass,     
        inputClass,      
        isRTL,           
        t,              
    } = useRegister();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-10 transition-colors duration-300">
            <Card className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-950/50 border-0 rounded-2xl">
                <CardBody className={`px-10 py-10 ${isRTL ? 'text-right' : 'text-left'}`}>

                    {/* Header */}
                    <h1 className="text-[26px] font-bold text-gray-900 dark:text-white text-center mb-2">
                        {t('create_account')}
                    </h1>
                    <p className="text-sm text-gray-400 dark:text-gray-500 text-center mb-7">
                        {t('join_now')}
                    </p>

                    {/* Error */}
                    {error && (
                        <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl">
                            <p className="text-red-500 dark:text-red-400 text-sm text-center">{error}</p>
                        </div>
                    )}

                    {/* Form */}
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
                            <label className={labelClass}>{t('username')}</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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

                        <div>
                            <label className={labelClass}>{t('confirm_password')}</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>{t('bio')}</label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows={3}
                                className={`${inputClass} resize-none`}
                            />
                        </div>

                        <Button
                            type="submit"
                            isLoading={loading}
                            isDisabled={loading || !email || !username || !password || !confirmPassword}
                            className="w-full mt-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold text-[15px] rounded-xl h-11.5 transition-all duration-200"
                        >
                            {loading ? t('registering') : t('register')}
                        </Button>

                    </form>

                    {/* Footer */}
                    <p className={`text-sm text-gray-400 dark:text-gray-500 mt-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                        {t('already_have_account')}{' '}
                        <RouterLink
                            to="/login"
                            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                        >
                            {t('sign_in')}
                        </RouterLink>
                    </p>

                </CardBody>
            </Card>
        </div>
    );
}