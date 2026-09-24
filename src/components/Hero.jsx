import React from 'react';
import ScrollCitySequence from './ScrollCitySequence';

export default function Hero({ onOpenReportModal }) {
  return (
    <section className="relative w-full">
      <ScrollCitySequence onOpenReportModal={onOpenReportModal} />
    </section>
  );
}
