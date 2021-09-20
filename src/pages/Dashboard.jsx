import {Bar} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';


const DashboardUm = () => {
  const data = {
    labels: ['Zapelino', 'Oi', 'Icatu', 'Dr Zap', 'BRB', 'BRB Nação'],
    datasets: [
      {
        label: 'Quantidade de contas abertas',
        data: [2400, 1300, 520, 1000,1789,500],
        backgroundColor: ['blue','green','red','yellow','pink','purple'],
        borderWidth: 2,
      },
    ],
  };
  const options = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Contas abertas',
      },
    },
  };

  return (
    <>
      <div style={{backgroundColor:'white'}}>
        <Bar
          data={data}
          height={300}
          options={options}
        />
      </div>
    </>
  )
}
const DashboardDois = () => {
  const data = {
    labels: [1,2,3,4,5,6,7,8,9,10],
    datasets: [
      {
        label: 'Quantidade de transações PIX',
        data: [
          33, 3000, 520, 1070,
          3400, 5, 10, 900,
          4400, 45, 0, 700,
          33, 500, 7520, 33
        ],
        fill: false,
        backgroundColor: [
          'red',
        ],
        
        borderWidth: 1,
      },
    ],
  };
  const options = {
    indexAxis: 'x',
    maintainAspectRatio: false,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <>
      <div style={{backgroundColor: 'white'}}>
        <Line
          data={data}
          height={300}
          options={options}
        />
      </div>
    </>
  )
}

const Dashboard = () => {
  
  return (
    <>
      <div>
        <DashboardUm />
        <hr />
        <DashboardDois />
      </div>
    </>
  )
}

export default Dashboard;