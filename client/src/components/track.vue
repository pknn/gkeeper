<template>
  <div class="bg-white p-3 m-1 shadow-md w-1/3">
    <h1 class="uppercase text-app-main text-xl">Tracking</h1>
    <div class="tracking flex mb-4">
      <div class="t-input-section">
        <label class="t-input-label" for="growth">Growth (cm)</label>
        <input class="t-input-field" type="number" v-model="growth" />
      </div>
      <button
        class="uppercase font-bold text-sm py-3 px-8 bg-app-main shadow-xl hover:bg-app-accent"
        @click="track"
      >
        Track
      </button>
    </div>
    <div>
      <chart
        v-if="loaded"
        :chart-data="statistics"
        :options="chartOptions"
        :height="200"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.t-input-section {
  @apply flex flex-wrap p-2 mt-2 items-center shadow-xl flex-1 flex-grow;
  &.invalid {
    @apply border-red-400;
  }
  &.no-focus {
    &:focus-within {
      @apply shadow-none;
    }
  }
  &:focus-within {
    @apply shadow-xl border-transparent;
  }
  .t-input-label {
    @apply text-xs uppercase font-bold text-gray-700;
    flex-basis: 100%;
  }
  .t-input-warn {
    @apply text-xs text-red-400 ml-12;
    flex-basis: 100%;
  }

  .t-input-field {
    @apply p-2 outline-none flex-grow bg-transparent;
  }
}
</style>

<script>
import axios from "axios";
import chart from "@/components/chart.vue";
export default {
  name: "tracking",
  components: { chart },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    currentValue: 0,
    growth: 0,
    statistics: [],
    tab: 0,
    chartOptions: {
      label: "Growth",
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
  methods: {
    async track() {
      if (this.growth < 0) {
        this.growth = 0;
      } else {
        await axios
          .post("/statistics", {
            type: "growth",
            value: this.growth,
            greenhouseID: this.id
          })
          .then(() => {
            this.fetchData();
          })
          .catch(() => {});
      }
    },
    fetchData() {
      axios
        .get(`/statistics?id=${this.id}&type=growth&dt=daily`)
        .then(response => {
          const { data } = response;

          this.statistics = {
            labels: data.map(d => new Date(d.dt).toLocaleDateString("en-US")),
            datasets: [
              {
                label: "Growth",
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
