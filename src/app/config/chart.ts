const RadarOptions = {
  title: {
    text: 'top of chart',
  },
  legend: {
    display: false,
  },
  scale: {
    ticks: {
      min: 0,
      max: 10,
      stepSize: 2,
      showLabelBackdrop: false,
      backdropColor: 'rgba(203, 197, 11, 1)',
      display: false,
    },
    angleLines: {
      color: 'rgba(28, 50, 70, 0.1)',
      lineWidth: 1,
    },
    gridLines: {
      color: '#CCCCCC',
      circular: false,
    },
    pointLabels: {
      fontColor: ['#FF5766', '#FFC406', '#514F4F', '#2FB24B', '#127CCC'],
      fontSize: 18,
      fontStyle: 600,
    },
  },
};

const RadarData = (data: Array<any>) => {
  return {
    labels: ['사랑', '정신', '책임', '순수', '지혜'],
    datasets: [
      {
        backgroundColor: 'rgba(28, 50, 70, 0.1)',
        borderColor: 'rgba(28, 50, 70, 0.1)',
        pointRadius: 5,
        pointBackgroundColor: [
          '#FF5766',
          '#FFC406',
          '#514F4F',
          '#2FB24B',
          '#127CCC',
        ],
        pointBorderColor: 'rgba(28, 50, 70, 0.1)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(34, 202, 236, 1)',
        data: data,
      },
    ],
  };
};

export { RadarOptions, RadarData };
