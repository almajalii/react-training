import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { buildProTabs } from '../../../../../screens/professionalProfile/proProfileConstants';
import TabBar from '../../../../molecules/tabBar/TabBar';

export default function ProProfileTabs({ activeTab, setActiveTab }) {
  const { t, i18n } = useTranslation();
  const tabs = useMemo(() => buildProTabs(t), [i18n.language]);

  return (
    <div className="bg-page px-6">
      <div className="max-w-5xl mx-auto">
        <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  );
}
