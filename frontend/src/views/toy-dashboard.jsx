import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { toyService } from '../services/toy.service.js';
import { loadToys } from '../store/toy.action.js';


ChartJS.register(ArcElement, Tooltip, Legend);

export function ToyDashboard() {
    const toys = useSelector(state => state.toyModule.toys)
    const labels = useSelector(state => state.toyModule.labels)

    useEffect(() => {
        loadToys()
    }, [])

    const data = {
        labels: labels,
        datasets: [
            {
                label: '# of Toys',
                data: toyService.countToysPerLabel(toys, labels),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(200, 159, 64, 0.2)',
                    'rgba(100, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(200, 159, 64, 0.2)',
                    'rgba(100, 159, 64, 0.2)',
                ],
                borderWidth: 1,
            },
        ],
    }


    return (
        <section className="toy-dashboard">
            <h1>Toys In Stock (Per Label): </h1>
            <section className="canvas-container">
                <Doughnut
                    data={data}
                    options={{ maintainAspectRatio: false }} />
            </section>
        </section>
    )
}