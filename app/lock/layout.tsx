import React from 'react'

const LockLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default LockLayout