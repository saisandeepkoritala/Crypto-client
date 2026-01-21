import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const LineChart = ({ historicalData }) => {
    const [data, setData] = useState([["Date", "Prices"]])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let dataCopy = [["Date", "Prices"]];
        setLoading(true);

        if (historicalData && Array.isArray(historicalData.prices) && historicalData.prices.length > 0) {
            historicalData.prices.forEach((item) => {
                dataCopy.push([new Date(item[0]).toLocaleDateString(), item[1]])
            })
            setData(dataCopy);
        }
        
        setLoading(false);
    }, [historicalData])

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px' }}>
                <div className="spin" style={{ width: '40px', height: '40px' }}></div>
            </div>
        );
    }

    return (
        <Chart
            chartType='LineChart'
            data={data}
            height="100%"
            width="100%"
            options={{
                backgroundColor: 'transparent',
                chartArea: { width: '85%', height: '75%' },
                hAxis: {
                    textStyle: { color: '#ffffff' },
                    gridlines: { color: '#444444' }
                },
                vAxis: {
                    textStyle: { color: '#ffffff' },
                    gridlines: { color: '#444444' }
                },
                legend: { 
                    textStyle: { color: '#ffffff' },
                    position: 'top'
                },
                colors: ['#4500c6'],
                lineWidth: 3,
                pointSize: 5,
                curveType: 'function'
            }}
        />
    )
}

export default LineChart