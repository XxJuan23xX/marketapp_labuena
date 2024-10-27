import React, { useEffect, useState } from 'react';
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import './SalesChart.css';

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const SalesChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/monthly-sales');
        setSalesData(response.data || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos de ventas mensuales:", error);
        setIsLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  if (isLoading) {
    return <div className="chart-container">Cargando datos de ventas...</div>;
  }

  const data = {
    labels: salesData && salesData.length > 0 ? salesData.map(item => item.month) : ["Sin datos"],
    datasets: [
      {
        label: 'Ventas Mensuales',
        data: salesData && salesData.length > 0 ? salesData.map(item => item.totalSales) : [0],
        fill: false,
        borderColor: '#3B82F6',
        tension: 0.1,
        pointRadius: 3, // Tamaño ajustado de los puntos en el gráfico
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 10,
          font: {
            size: 10
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Meses',
          font: {
            size: 12
          }
        },
        ticks: {
          maxRotation: 0, // Evita que las etiquetas se inclinen
          font: {
            size: 10
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Total de Ventas ($)',
          font: {
            size: 12
          }
        },
        ticks: {
          font: {
            size: 10
          }
        }
      }
    }
  };

  return (
    <div className="chart-container">
      <h2>Ventas Mensuales</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesChart;
