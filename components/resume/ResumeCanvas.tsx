'use client'

import dynamic from 'next/dynamic'

const ResumeCanvasClient = dynamic(
  () => import('./ResumeCanvasClient'),
  {
    ssr: false,
    loading: () => (
      <div style={{
        width: '100%',
        height: '600px',
        background: '#f7f7f7',
        borderRadius: '16px',
      }} />
    ),
  }
)

export default ResumeCanvasClient
