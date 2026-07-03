'use client'

import dynamic from 'next/dynamic'

const ResumeCanvasClient = dynamic(
  () => import('./ResumeCanvasClient'),
  {
    ssr: false,
    loading: () => (
      <div style={{
        width: '820px',
        height: '1160px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 0 250px 26px rgba(232, 52, 42, 0.15)',
      }} />
    ),
  }
)

export default ResumeCanvasClient
