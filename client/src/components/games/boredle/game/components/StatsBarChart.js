import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { useBoredleContext } from '../../../../../context/boredle-context/boredleContext'

const StatsBarChart = () => {
  const { stats } = useBoredleContext()

  const data = Object.keys(stats.guessStats).map((key, i) => {
    return { name: `${i + 1}`, value: stats.guessStats[key] }
  })

  const barChartEl = (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 10 }}>
        <XAxis
          dataKey="name"
          tickLine={false}
          tick={{ fill: '#00000090' }}
          axisLine={false}
        />
        <Tooltip
          separator=""
          label={false}
          formatter={(value, name, props) => [`${value}`, '']}
          labelFormatter={(value, name, props) => ''}
          contentStyle={{
            background: '#F9F2ED',
            border: 'none',
            borderRadius: '5px',
            color: '#151515'
          }}
        />
        <Bar dataKey="value" fill="#00000090" barSize={25} />
      </BarChart>
    </ResponsiveContainer>
  )

  // return <div className='boredle__stats-chart'>{barChartEl}</div>
  return (
    <div className="boredle__stats-chart">
      <h3 className="boredle__stats-chart-title subtitle">Guess Stats</h3>
      {barChartEl}
    </div>
  )
}

export default StatsBarChart
