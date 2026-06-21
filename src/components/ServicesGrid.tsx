import {services} from '@/data/services';
import ServiceCard from './ServiceCard';

export default function ServicesGrid({
  showCapabilities = false
}: {
  showCapabilities?: boolean;
}) {
  return (
    <div className="flex flex-col">
      {services.map((service, i) => (
        <ServiceCard
          key={service.id}
          service={service}
          index={i}
          showCapabilities={showCapabilities}
        />
      ))}
    </div>
  );
}
