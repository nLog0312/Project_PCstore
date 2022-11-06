let xValues = [50,60,70,80,90,100,110,120,130,140,150];
let yValues = [7,8,8,9,9,9,10,11,14,14,15];

const revenueChart = document.getElementById('canvas');

const dataRevenue = {
    labels: xValues,
    datasets: [{
        label: 'Revenue',
        data: yValues,
        backgroundColor: 'rgba(255, 99, 132, 1)',
        borderColor: 'rgba(255, 99, 132, .5)',
        color: '#fff',
        borderWidth: 1
    }]
};

const configRevenue = {
    type: 'line',
    data: dataRevenue
};

const myChart = new Chart(revenueChart, configRevenue);