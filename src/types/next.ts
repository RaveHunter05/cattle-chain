import type { NextPage } from 'next';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: React.FC<React.PropsWithChildren>;
};
