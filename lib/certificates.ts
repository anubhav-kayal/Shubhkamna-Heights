export type ProjectCertificate = {
  id: string;
  label: string;
  pdfUrl: string;
};

export const PROJECT_CERTIFICATES: ProjectCertificate[] = [
  { id: 'vda-commencement', label: 'VDA-Commencement Certificate', pdfUrl: '/certificates/vda-commencement-certificate.pdf' },
  { id: 'vda-approval', label: 'VDA-Approval', pdfUrl: '/certificates/vda-approval.pdf' },
  { id: 'uprera', label: 'UPRERA Certificate', pdfUrl: '/certificates/uprera-certificate.pdf' },
  { id: 'rera-waste-disposal', label: 'RERA-Waste Disposal Plan', pdfUrl: '/certificates/rera-waste-disposal-plan.pdf' },
  { id: 'rera-sale-deed', label: 'RERA-Sale Deed', pdfUrl: '/certificates/rera-sale-deed.pdf' },
  { id: 'rera-sajara-plan', label: 'RERA-Sajara Plan', pdfUrl: '/certificates/rera-sajara-plan.pdf' },
  { id: 'rera-project-specs', label: 'RERA-Project Specifications', pdfUrl: '/certificates/rera-project-specifications.pdf' },
  { id: 'rera-fire-noc', label: 'RERA-Fire NOC', pdfUrl: '/certificates/rera-fire-noc.pdf' },
  { id: 'rera-engineer', label: 'RERA-Engineer Certificate', pdfUrl: '/certificates/rera-engineer-certificate.pdf' },
  { id: 'rera-ca', label: 'RERA-CA Certificate', pdfUrl: '/certificates/rera-ca-certificate.pdf' },
  { id: 'rera-booking', label: 'RERA-Booking Application', pdfUrl: '/certificates/rera-booking-application.pdf' },
  { id: 'rera-architect', label: 'RERA-Architect Certificate', pdfUrl: '/certificates/rera-architect-certificate.pdf' },
  { id: 'labour-regn', label: 'Labour Regn Certificate', pdfUrl: '/certificates/labour-regn-certificate.pdf' },
  { id: 'floor-plan', label: 'Floor Plan', pdfUrl: '/fullplan.pdf' },
  { id: 'approved-layout', label: 'Approved Layout', pdfUrl: '/certificates/approved-layout.pdf' },
];
