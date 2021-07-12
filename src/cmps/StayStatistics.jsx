import React from 'react';
import { Bar} from 'react-chartjs-2';

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
//
export const StayStatistics = () => {

    const data = {
        labels: labels,
        datasets: [{
            label: 'Total Bookings',
            data: [17, 19, 9, 7, 6, 13, 15, 17, 12, 19, 23, 22],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
            ],
            borderWidth: 1
        }]
    };

    return (
        <div>
            <Bar data={data} />
        </div>
    )

};

