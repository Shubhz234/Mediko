import React from 'react'
import AppHeader from './_components/AppHeader';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <AppHeader />
      <div className='px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 py-6 md:py-10'>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout