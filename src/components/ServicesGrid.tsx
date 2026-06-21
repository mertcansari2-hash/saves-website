import type {CmsService} from '@/sanity/content';
import ServiceCard from './ServiceCard';

export default function ServicesGrid({
  services,
  showCapabilities = false
}: {
  services: CmsService[];
  showCapabilities?: boolean;
}) {
  return (
    <div className="flex flex-col">
      {services.map((service, i) => (
        <ServiceCard
          key={service._id}
          service={service}
          index={i}
          showCapabilities={showCapabilities}
        />
      ))}
    </div>
  );
}
