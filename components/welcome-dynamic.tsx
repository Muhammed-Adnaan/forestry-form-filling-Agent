'use client';

import dynamic from 'next/dynamic';

export default dynamic(() => import('./embed-iframe/welcome-view'), { ssr: false });
