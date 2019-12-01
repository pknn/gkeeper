<template>
  <div class="bg-white p-3 m-1 shadow-md w-1/2">
    <h1 class="uppercase text-app-main text-xl">Brightness</h1>
    <h2>Brightness: {{ Math.round(currentValue * 100) / 100 || "No Data" }}</h2>
    <div class="tabs flex justify-center items-center">
      <div
        class="tab rounded-l"
        :class="{ active: tab === 0 }"
        @click="tabChange(0)"
      >
        Minutely
      </div>
      <div class="tab" :class="{ active: tab === 1 }" @click="tabChange(1)">
        Hourly
      </div>
      <div
        class="tab rounded-r"
        :class="{ active: tab === 2 }"
        @click="tabChange(2)"
      >
        Daily
      </div>
    </div>
    <div class="h-64">
      <chart
        v-if="loaded"
        :chart-data="statistics"
        :options="chartOptions"
        :height="256"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.tab {
  @apply border border-app-accent text-sm px-6 py-1 cursor-pointer;
  &.active {
    @apply bg-app-accent;
  }
}
</style>

<script>
import axios from "axios";
import chart from "@/components/chart.vue";
export default {
  name: "brightness",
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  components: { chart },
  data: () => ({
    currentValue: 0,
    statistics: [],
    tab: 0,
    interval: ["minutely", "hourly", "daily"],
    chartOptions: {
      label: "Brightness",
      xAxisID: "dt",
      yAxisID: "average_value",
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "rgba(0,0,0,0.5)",
              fontStyle: "bold",
              fontFamily: "'Montserrat', sans-serif",
              beginAtZero: false,
              maxTicksLimit: 10,
              padding: 20
            },
            gridLines: {
              drawTicks: false,
              display: false
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "rgba(0,0,0,0.5)",
              fontStyle: "bold",
              fontFamily: "'Montserrat', sans-serif"
            }
          }
        ]
      }
    },
    loaded: false
  }),
  mounted() {
    this.fetchData();
  },
  watch: {
    id: function() {
      this.fetchData();
    }
  },
  methods: {
    tabChange(index) {
      this.tab = index;
      this.fetchData();
    },
    fetchData() {
      axios
        .get(`/api/statistics/latest?id=${this.id}&type=brightness`)
        .then(response => {
          this.currentValue = response.data.value;
        });
      axios
        .get(
          `/api/statistics?id=${this.id}&type=brightness&dt=${
            this.interval[this.tab]
          }`
        )
        .then(response => {
          const { data } = response;
          this.statistics = {
            labels: data.map(d => {
              if (this.tab === 2) {
                return new Date(d.dt).toLocaleDateString("en-US");
              } else {
                return new Date(d.dt).toLocaleTimeString("en-US");
              }
            }),
            datasets: [
              {
                label: "Brightness",
                data: data.map(d => d.average_value),
                borderColor: "#80b6f4",
                pointBorderColor: "#80b6f4",
                pointBackgroundColor: "#80b6f4",
                pointHoverBackgroundColor: "#80b6f4",
                pointHoverBorderColor: "#80b6f4",
                pointBorderWidth: 10,
                pointHoverRadius: 10,
                pointHoverBorderWidth: 1,
                pointRadius: 3
              }
            ]
          };
          this.loaded = true;
        });
    }
  }
};
</script>
