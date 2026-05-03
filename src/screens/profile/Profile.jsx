import { useProfile } from "./useProfile";
import { Button, Card, CardBody } from '@heroui/react';

function Profile() {
    const {
        user, error,
        username, handleUsernameChange,
        bio, handleBioChange,
        loading, success,
        handleSubmit,t,isRTL,inputClass,labelClass
    } = useProfile();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-10 transition-colors duration-300">
            <Card className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-950/50 border-0 rounded-2xl">
                <CardBody className={`px-10 py-10 ${isRTL ? 'text-right' : 'text-left'}`}>

                    {/* Header */}
                    <h1 className="text-[26px] font-bold text-gray-900 dark:text-white mb-1">
                        {t('profile')}
                    </h1>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mb-7">
                        {user?.email}
                    </p>

                    {/* Success Message */}
                    {success && (
                        <div className="mb-4 px-4 py-3 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-xl">
                            <p className="text-green-600 dark:text-green-400 text-sm text-center">
                                {t('profile_updated')}
                            </p>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 px-4 py-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl">
                            <p className="text-red-500 dark:text-red-400 text-sm text-center">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        <div>
                            <label className={labelClass}>{t('username')}</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => handleUsernameChange(e.target.value)}
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>{t('bio')}</label>
                            <textarea
                                value={bio}
                                onChange={(e) => handleBioChange(e.target.value)}
                                rows={3}
                                className={`${inputClass} resize-none`}
                            />
                        </div>

                        <Button
                            type="submit"
                            isLoading={loading}
                            isDisabled={loading}
                            className="w-full mt-1 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold text-[15px] rounded-xl h-11.5 transition-all duration-200"
                        >
                            {loading ? t('saving') : t('save_changes')}
                        </Button>

                    </form>

                </CardBody>
            </Card>
        </div>
    );
}

export default Profile;