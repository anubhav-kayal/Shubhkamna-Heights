'use client';

import { motion } from 'framer-motion';
import EnquiryForm from '@/components/forms/EnquiryForm';
import { useTranslation } from '@/context/LocaleContext';
import {
  Section,
  PageContainer,
  SectionHeaderCenter,
  SectionKicker,
  SectionHeading,
  GoldRule,
} from '@/components/ui/design';

export default function EnquirySection() {
  const { t } = useTranslation();

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
            <SectionKicker centered>{t('enquiry.kicker')}</SectionKicker>
            <SectionHeading className="mt-3 sm:mt-4">{t('enquiry.title')}</SectionHeading>
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
