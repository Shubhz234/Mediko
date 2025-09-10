import React from 'react'

const MedikoLogo = () => {
    return (
        <div className='flex items-center gap-1'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="10 20 150 150" width={42} height={42}>
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00897B" />
                        <stop offset="100%" stopColor="#00695C" />
                    </linearGradient>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                        <feOffset dy="4" />
                        <feFlood floodColor="rgba(0,105,92,0.2)" />
                        <feComposite in2="offsetblur" operator="in" />
                        <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>
                <g stroke="url(#grad)" strokeWidth={10} fill="none" strokeLinecap="round" filter="url(#shadow)">
                    <path d="M60,100C60,60 100,60 100,100C100,140 140,140 140,100C140,60 100,60 100,100" />
                    <path d="M140,100C140,140 100,140 100,100C100,60 60,60 60,100C60,140 100,140 100,100" />
                </g>
                <rect x={85} y={70} width={30} height={60} fill="url(#grad)" rx={5} />
                <rect x={70} y={85} width={60} height={30} fill="url(#grad)" rx={5} />
                <circle cx={100} cy={100} r={12} fill="#fff" />
            </svg>
            <span className="text-lg font-extrabold text-slate-800 dark:text-slate-100">
                Mediko
            </span>
        </div>
    )
}

export default MedikoLogo