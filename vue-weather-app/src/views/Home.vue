<template>
  <div class="home">
    <div class="row">
      <div class="col-8 offset-2 text-center">
        <div class="card text-white bg-secondary mb-3">
          <div class="card-header">Bangalore</div>
          <div class="card-body">
            <h4 class="card-title">{{forecast.currently.summary}}</h4>
            <div class="card-text temp">
              <span class="emoji">{{emoji}}</span>
              {{getTemperatureInCelsius}} ℃
            </div>
            <div class="card-text">
              {{forecast.currently.precipProbability}}% chance of precipitation
            </div>
          </div>
        </div>
      </div>
    </div>
      <!-- <pre>{{forecast}}</pre> -->
  </div>
</template>

<script>
import API from '@/lib/API';
// @ is an alias to /src


export default {
  name: 'home',
  data() {
    return {
      forecast : {}
    };
  },
  mounted() {
    this.getForecast();
  },
  methods: {
    getForecast() {
      API.getForecast()
      .then(result => {
          this.forecast = result;
      });
    }
  },
  computed: {
    getTemperatureInCelsius() {
      return ((this.forecast.currently.temperature - 32) * 5/9).toFixed(1);
    },
    emoji() { 
      return {
        'Partly Cloudy' : "⛅️"
      }[this.forecast.currently.summary];
    }
  }
};
</script>

<style scoped>
.temp {
  font-size : 3em;
}
.emoji {
  font-size: 2em;
}
</style>