import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function MembersCharts() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'Adherant' },
            { id: 1, value: 15, label: 'Public' },
            { id: 2, value: 20, label: 'Visiteur' },
          ],
        },
      ]}
    />
  );
}
