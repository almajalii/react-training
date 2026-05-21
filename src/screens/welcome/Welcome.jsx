import { Link } from 'react-router-dom';
import { useWelcome } from './useWelcome';
import { Button, Card, CardBody } from '@heroui/react';

function Welcome() {
  const { user, error, t } = useWelcome();

  return (
    /*  the background */
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-10 transition-colors duration-300">
      {/* the card */}
      <Card className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-950/50 border-0 rounded-2xl">
        <CardBody className="px-10 py-10 flex flex-col items-center">
          {user ? (
            <div>
              <h1 className="text-[26px] font-bold text-gray-900 dark:text-white mb-2">
                {t('welcome_back')}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-semibold mb-8 text-center">
                {user.username}
              </p>

              {error && (
                <div className="px-4 py-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl">
                  <p className="text-red-500 dark:text-red-400 text-sm text-center">{error}</p>
                </div>
              )}
            </div>
          ) : (
            <>
              <h1 className="text-[26px] font-bold text-gray-900 dark:text-white mb-2 justify-center flex">
                {t('welcome')}
              </h1>
              <p className="text-sm text-gray-400 dark:text-gray-500 text-center mb-8">
                {t('sign_in_account')}
              </p>

              {error && (
                <div className="mb-6 px-4 py-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl">
                  <p className="text-red-500 dark:text-red-400 text-sm text-center">{error}</p>
                </div>
              )}

              <Button
                as={Link}
                to="/login"
                className="flex justify-center w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold text-[15px] rounded-xl h-11.5 transition-all duration-200"
              >
                {t('go_to_login')}
              </Button>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default Welcome;
