'use client';

import { motion } from 'framer-motion';
import EnquiryForm from '@/components/forms/EnquiryForm';
import {
  Section,
  PageContainer,
  SectionHeaderCenter,
  SectionKicker,
  SectionHeading,
  GoldRule,
} from '@/components/ui/design';

export default function EnquirySection() {
  return (
    <Section id="contact" tone="card">
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SectionHeaderCenter className="mb-10 lg:mb-14">
            <SectionKicker centered>Enquire</SectionKicker>
            <SectionHeading className="mt-3 sm:mt-4">
              Your Dream Home is One Step Away
            </SectionHeading>
            <GoldRule className="mx-auto mt-6" />
          </SectionHeaderCenter>

          <div className="mx-auto max-w-3xl">
            <EnquiryForm source="website_enquiry_form" />
          </div>
        </motion.div>
      </PageContainer>
    </Section>
  );
}
