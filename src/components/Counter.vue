<template>
  <section class="countdown" v-if="isStarted">
    <div class="countdown__body" v-if="isShowCongratulations">
      <div class="countdown__congratulations">
        {{$t('happy_new_year')}}
      </div>
    </div>
    <div class="countdown__body" v-else>
      <template v-if="!hideDays">
        <div class="countdown__item">
          <div class="countdown__description">{{$t('days')}}</div>
          <div class="countdown__value">{{days}}</div>
        </div>
        <div class="countdown__divider">:</div>
      </template>
      <template v-if="!hideHours">
        <div class="countdown__item">
          <div class="countdown__description">{{$t('hours')}}</div>
          <div class="countdown__value">{{addZero(hours)}}</div>
        </div>
        <div class="countdown__divider">:</div>
      </template>
      <template v-if="!hideMinutes">
        <div class="countdown__item">
          <div class="countdown__description">{{$t('minutes')}}</div>
          <div class="countdown__value">{{addZero(minutes)}}</div>
        </div>
        <div class="countdown__divider">:</div>
      </template>
      <div class="countdown__item">
        <div class="countdown__description">{{$t('seconds')}}</div>
        <div class="countdown__value" :class="{ 'pulse': isShowPulse }">{{isShowPulse ? seconds : addZero(seconds)}}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Counter',
  components: {},
  data() {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isStarted: false,
      isShowCongratulations: false,
      currentYear: ''
    }
  },
  computed: {
    nextNewYear() {
      return this.$moment(`${this.currentYear + 1}-01-01T00:00:00`)
    },
    hideDays() {
      return this.days === 0
    },
    hideHours() {
      return this.hideDays && this.hours === 0
    },
    hideMinutes() {
      return this.hideHours && this.minutes === 0
    },
    isHappyNewYear() {
      return this.hideDays && this.hideHours && this.hideMinutes && this.seconds === 0
    },
    isShowPulse() {
      return this.hideMinutes && this.seconds <= 10
    }
  },
  mounted() {
    this.currentYear = this.$moment().year()
    setInterval( () => {
      this.tick()
    }, 1000 )
  },
  watch: {
    isHappyNewYear: function(value) {
      if(value) {
        this.startCongratulations()
        setTimeout(() => {
          this.currentYear = this.$moment().year()
        }, 1000)
      }
    }
  },
  methods: {
    tick() {
      const diff = this.nextNewYear.diff(this.$moment(), 'milliseconds')
      const duration = this.$moment.duration( diff )
      this.days = this.prepareToZero(Math.floor(duration.as('days')))
      this.hours = this.prepareToZero(duration.hours())
      this.minutes = this.prepareToZero(duration.minutes())
      this.seconds = this.prepareToZero(duration.seconds())
      this.isStarted = true
    },
    addZero(value) {
      return value > 9 ? value : `0${value}`
    },
    prepareToZero(value) {
      return value >= 0 ? value : 0
    },
    startCongratulations() {
      this.isShowCongratulations = true
      setTimeout(() => {
        this.isShowCongratulations = false
      }, 20000000)
    }
  }
}
</script>

<style lang="scss">

@mixin responsive-font($responsive, $min, $max: false, $fallback: false) {
  $responsive-unitless: $responsive / ($responsive - $responsive + 1);
  $dimension: if(unit($responsive) == 'vh', 'height', 'width');
  $min-breakpoint: $min / $responsive-unitless * 100;

  @media (max-#{$dimension}: #{$min-breakpoint}) {
    font-size: $min;
  }

  @if $max {
    $max-breakpoint: $max / $responsive-unitless * 100;

    @media (min-#{$dimension}: #{$max-breakpoint}) {
      font-size: $max;
    }
  }

  @if $fallback {
    font-size: $fallback;
  }

  font-size: $responsive;
}

.countdown {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  &__item {
    text-align: center;
  }
  &__body {
    display: flex;
    align-items: center;
  }
  &__value {
    font-size: 12vw;
    font-weight: 200;
    line-height: 100%;
    color: #222222;
  }
  &__divider {
    font-size: 6vw;
    font-weight: 200;
    height: 100%;
    display: flex;
    align-items: center;
  }
  &__description {
    text-transform: uppercase;
    font-size: 1vw;
    color: #676767;
    letter-spacing: 0.04em;
  }
  &__congratulations {
    font-size: 8vw;
    text-align: center;
  }
}

.pulse {
  animation: pulsate 1s ease-out;
  animation-iteration-count: infinite;
  opacity: 0;
}

@-webkit-keyframes pulsate {
    0% {-webkit-transform: scale(0.1, 0.1); opacity: 0.0;}
    50% {opacity: 1.0;}
    100% {-webkit-transform: scale(1.2, 1.2); opacity: 0.0;}
}
</style>