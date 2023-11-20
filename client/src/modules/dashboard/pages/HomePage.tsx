import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import CardStatistic from '../components/CardStatistics';
import '../css/HomePage.css'
import AppButton from '../../../shared/components/Buttons/AppButton';
import AppIcon from '../../../shared/components/AppIcon';
import AppCard from '../../../shared/components/AppCard/AppCard';
import { useBreadcrumbs } from '../../../shared/contexts/BreadCrumbsContext';

const HomePage = () => {
  const { updateBreadcrumbs } = useBreadcrumbs();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const charRefBar = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = chartRef.current;
    let myChart: any;
    if (canvas) {
      const ctx = canvas.getContext('2d');

      if(ctx) {
        if (myChart) {
          myChart.destroy();
        }
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(102, 53, 242, 0.3)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)'); 
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); 

        let chartHeight = 75;

        if (screen.width <= 768) {
          chartHeight = 250;
        }
        canvas.height = chartHeight;

        myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
            datasets: [{
              data: [50, 40, 300, 220, 500, 250, 400, 230, 500, 410, 760, 620],
              borderColor: 'rgb(102, 53, 242)',
              borderWidth: 2.5,
              tension: 0.35,
              backgroundColor: gradient,
              fill: 'start',
              pointRadius: 3,
              label: 'Ventas ultimo semestre'
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                border:{dash: [5,5]},     
              },
            x: {
              grid: {
                color: 'rgba(0,0,0,0)',
              }  
            }
             
            },
            plugins: {
              tooltip: {
                mode: 'index',
                intersect: false,
              },
              legend: {
                display: false,
              }
            },
          },
        })
      }
    }
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const canvasBar = charRefBar.current;
    let charBar: any;
    if (canvasBar) {
      const ctx = canvasBar.getContext('2d');

      if(ctx) {
        if (charBar) {
          charBar.destroy();
        }

        canvasBar.height = 250;
        charBar = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep' ],
            datasets: [{
              data: [230, 400, 350, 200, 570, 250, 480, 230, 590],
              backgroundColor : 'rgb(102, 53, 242)',
              borderWidth: 2.5,
              label: 'Ventas',
              barPercentage :0.4,
            }]
          },
          options: {
            scales: {
              y: {
                grid: {
                  color: 'rgba(0,0,0,0)',
                },
              },
              x : {
                border:{dash: [5,5]},
              }           
            },
            plugins: {
              tooltip: {
                mode: 'index',
                
              },
              legend: {
                display: false,
              }
            },
            elements: {
              bar: {
                borderRadius: 15,
              }
            }
          },
        })
      }
    }
    return () => {
      if (charBar) {
        charBar.destroy();
      }
    };
  }, []);
  useEffect(() => {
    updateBreadcrumbs((prevBreadcrumbs) => [
      ...prevBreadcrumbs,
      { name: 'Home', route: '/dasboard/home', level: 1 },
      { name: 'Productos', route: '/dasboard/products', level: 1 },
    ]);
    
    return () => {
      updateBreadcrumbs((prevBreadcrumbs) => prevBreadcrumbs.slice(0, -2));
    };
  }, [updateBreadcrumbs]);

  return (
      <>
        <div className="vs-general-statistics">
          <CardStatistic label="Clientes" icon="users" value="8"></CardStatistic>
          <CardStatistic label="Productos" icon="shopping-bag" value="20"></CardStatistic>
          <CardStatistic label="Balance" icon="pie-chart" value="2.950.299"></CardStatistic>
          <CardStatistic label="Ventas" icon="coins" value="2.341.300"></CardStatistic>
        </div>
        <div className='vs-chart-line'>
          <div className="vs-chart-info">
            <div className="d-sm-flex mb-3 align-items-center">
              <div>
                <h5 className="vs-header-balance">Saldo general</h5>
                <p className="vs-header-description">Monto total de ventas realizadas hasta la fecha actual.</p>
              </div>
              <div className='ms-auto'>
                <AppButton label="Vista del informe"></AppButton>
              </div>
            </div>
            <div className='d-flex align-items-center mb-3'>
              <h3 className='vs-info-value mb-0'>$12.350.030</h3>
              <span className='badge text-bg-success px-3 ms-3'>
                <AppIcon icon="angle-up"></AppIcon>
                12.3%
                </span>
            </div>
          </div>
          <canvas ref={chartRef} />
        </div>
        <div className='d-flex flex-column flex-lg-row gap-4 mt-4'>
          <div className='vs-chart-bar'>
            <div className="mb-3">
                <h5 className="fw-bold">Saldos en el tiempo</h5>
                <p className="text-secondary">Detalles sobre el saldo.</p>
            </div>
            <canvas ref={charRefBar}/>
            <div className='mt-3'>
                <AppButton label="Vista del informe"></AppButton>
            </div>
          </div>
          <AppCard
            header= {
              <h5 className="fw-bold">Ultimas ventas</h5>
            }
            children={
              <table className='vs-dataTable'>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Fecha</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Computador Asus ryzen 7</td>
                      <td>1</td>
                      <td>03/11/2023</td>
                      <td>2.300.000</td>
                    </tr>
                    <tr>
                      <td>Computador Asus ryzen 7</td>
                      <td>1</td>
                      <td>03/11/2023</td>
                      <td>2.300.000</td>
                    </tr>
                  </tbody>
              </table>
            }
          />
        </div>
      </>
  );
};

export default HomePage;