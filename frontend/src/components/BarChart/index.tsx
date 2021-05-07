import axios from "axios"
import { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { SaleSucces } from "types/sale"
import { round } from "utils/format"
import { BASE_URL } from "utils/request"

type SeriesData = {
    name: string;
    data: number[]
}

type ChartData = {
    labels: {
        categories: string[];
    };
    series: SeriesData[];
}

const BarChart = () => {

    const [chartData, setChartData] = useState<ChartData>({
        labels: {
            categories: []
        },
        series: [
            {
                name: "",
                data: []
            }
        ]
    });


    useEffect(() => {
        //função a qual vai ser executada
        axios.get(`${BASE_URL}/sales/success-by-seller`)
            .then(response => {
                const data = response.data as SaleSucces[];
                const myLabels = data.map(x => x.sellerName);
                const mySeries = data.map(x => round(100 * x.deals / x.visited, 1));

                setChartData({
                    labels: {
                        categories: myLabels
                    },
                    series: [
                        {
                            name: "% Sucess",
                            data: mySeries
                        }
                    ]
                });
            });
    }   //Lista de objeto vai observar ... (quando alterado o useEffect vai executar a função)
        , []);

    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };

    return (
        <Chart
            options={{ ...options, xaxis: chartData.labels }}
            series={chartData.series}
            type="bar"
            height="240"
        />
    );
}

export default BarChart;