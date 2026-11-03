"use client"
import CustomerNavBar from '@/components/common/CustomerNavBar';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode
}

const layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <CustomerNavBar />
      {children}
    </div>
  )
}

export default layout