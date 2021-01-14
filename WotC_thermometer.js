const { isNull } = require("util")

class Thermometer {
	constructor (_celcius) {
		this.celcius = _celcius
		this.farenheit = (_celcius * 9) / 5 + 32
		this.thresholdName = null
		this.thresholdTemperature = null
		this.thresholdDirection = null
		this.significaneFilter = false
	}

	updateTemperature (_celcius) {
		this.celcius = _celcius
		this.farenheit = (_celcius * 9) / 5 + 32
	}

	readTemperature () {
		return `Celcius: ${this.celcius}°, Farenheit: ${this.farenheit}°`
	}

	setThreshold (_thresholdName, _thresholdTemperature, _thresholdDirection) {
		this.thresholdName = _thresholdName
		this.thresholdTemperature = _thresholdTemperature
		this.thresholdDirection = _thresholdDirection
	}

	toggleInsignificantFilter () {
		this.significaneFilter = !this.significaneFilter
	}

	setTemperature (_celcius) {
		let temperatureDirection = ''
		let temperatureChange = this.celcius - _celcius
		let nextTemperature = _celcius

		if (temperatureChange > 0) {
			temperatureDirection = 'decrease'
		} else if (temperatureChange < 0) {
			temperatureDirection = 'increase'
		} else {
			temperatureDirection = 'no change'
		}

		// A function to check whether all citeria for sending thresholds have been met
		if (this.thresholdReachedCheck(temperatureDirection, nextTemperature, temperatureChange)) {
			// If returns true, send user the threshold reached alert
			console.log(`The ${this.thresholdName} threshold has been reached!`)
		}
		// Update temperature once threshold checking is complete
		this.updateTemperature(_celcius)
	}

	thresholdReachedCheck (_temperatureDirection, _nextTemperature, _temperatureChange) {
		// If temperature is moving in the same direction as threshold requirement
		if (_temperatureDirection === this.thresholdDirection) {
			// If the temperature direction is increasing
			if (_temperatureDirection === "increase") {
				if (_nextTemperature > this.celcius && _nextTemperature >= this.thresholdTemperature && this.celcius < this.thresholdTemperature) {
					// If the significance filter is turned on and the previous temperature is within the insignificant range, return false
					if (this.significaneFilter && this.celcius > this.thresholdTemperature - 0.6) {
						return false
					}
					return true
				}
			// If the temperature direction is decreasing
			} else if (_temperatureDirection === "decrease") {
				if (_nextTemperature < this.celcius && _nextTemperature <= this.thresholdTemperature && this.celcius > this.thresholdTemperature) {
					// If the significance filter is turned on and the previous temperature is within the insignificant range, return false
					if (this.significaneFilter && this.celcius < this.thresholdTemperature + 0.6) {
						return false
					}
					return true
				}
			}
			return false
		// If temperature did not change, no alert
		} else if (_temperatureDirection === 'no change') {
			return false
		} else {
		// If temperature goes opposite way of threshold direction
			return false
		}
	}
}

let thermostat = new Thermometer(10)
thermostat.setThreshold('boiling', 100, 'increase')
thermostat.setTemperature(50)
thermostat.setTemperature(100)
thermostat.toggleInsignificantFilter()
thermostat.setTemperature(99.4)
thermostat.setTemperature(99.5)
// thermostat.toggleInsignificantFilter()
// thermostat.setTemperature(101)

// thermostat.setThreshold('freezing', 0, 'decrease')
// thermostat.setTemperature(5)
// thermostat.setTemperature(0)
// thermostat.toggleInsignificantFilter()
// thermostat.setTemperature(0.6)
// thermostat.setTemperature(0.5)
// thermostat.setTemperature(-1)

// console.log(thermostat.readTemperature())
// console.log(thermostat)