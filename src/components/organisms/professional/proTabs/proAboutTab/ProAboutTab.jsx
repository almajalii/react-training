import AboutSection from './AboutSection';
import CertificationsSection from './CertificationsSection';
import ServiceAreasSection from './ServiceAreasSection';
import WorkingHoursSection from './WorkingHoursSection';

export default function ProAboutTab({ pro }) {
  return (
    <div className="flex flex-col gap-12">
      <AboutSection bio={pro.bio} />
      <ServiceAreasSection serviceAreas={pro.serviceAreas} />
      <WorkingHoursSection workingHours={pro.workingHours} />
      <CertificationsSection certifications={pro.certifications} />
    </div>
  );
}
