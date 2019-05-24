<template>
    <div>
        <Header></Header>
        <Nav></Nav>
        <div class="chart-container">
            <canvas id="chart" ref="chart"></canvas>
        </div>     
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '../components/Header'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Chart from 'chart.js';
import axios from 'axios'
export default {
    components:{
        Header,
        Nav,
        Footer
    },
    created() {
        this.$nextTick(() =>
            this.init()
        )
    },
    destroyed() {
        console.log(this.$store.state.userName)
    },
    methods:{
        async init() {
            let pro = []
            await axios.get('/products/report').then((result) => {
                let res = result.data
                if(res.code == 0) {
                    pro = this._format(res.result)
                }
            })
            
            var ctx = this.$refs.chart
            var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: pro.labels,
                datasets: [{
                    label: '过去七天成交金额',
                    data: pro.data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(106, 184, 134, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(106, 184, 134, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        },
                        scaleLabel: {
                            display:true,
                            labelString:'成交金额 / 千'
                        }
                    }],
                    xAxes:[{
                        scaleLabel: {
                            display:true,
                            labelString:'天数 / 天'
                        },
                        ticks: {
                            callback: function (value) {
                                return `第${value}天`
                            }
                        }
                    }]
                }
            }
        });
        },
        _format(datas) {
            let labels = []
            let data = []
            for(let val of datas) {
                labels = labels.concat(val.day)
                data = data.concat(val.money/1000)
            }
            return {
                labels:labels,
                data:data
            }
        }
    }
}
</script>

<style>
.chart-container {
    position: relative; 
    width:60vw;
    margin: 0 auto;
    display: block;
}
#chart {
    display: block;
}
@media screen and (max-width: 400px){
    .chart-container {
        width:100vw;
    }
}
</style>