import React from 'react';

export interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ChartData {
  time: string;
  value: number;
  value2: number;
}

export enum TabType {
  INFRA = 'INFRA',
  APM = 'APM',
  LOGS = 'LOGS',
  RUM = 'RUM'
}