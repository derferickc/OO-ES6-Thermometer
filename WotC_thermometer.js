class Thermometer {
	constructor (_celcius) {
		this.celcius = _celcius
		this.farenheit = (_celcius * 9) / 5 + 32
		this.thresholdName = null
		this.thresholdTemperature = null
		this.thresholdDirection = null
		this.significanceFilter = false
	}

	updateTemperature (_celcius) {
		this.celcius = _celcius
		this.farenheit = (_celcius * 9) / 5 + 32
	}

	readTemperature () {
		return `Celcius: ${this.celcius}°, Farenheit: ${this.farenheit}°`
	}

	setThreshold (_thresholdName, _thresholdTemperature, _thresholdDirection, _significanceFilterBoolean) {
		this.thresholdName = _thresholdName
		this.thresholdTemperature = _thresholdTemperature
		this.thresholdDirection = _thresholdDirection
		this.significanceFilter = _significanceFilterBoolean
	}

	getTemperatureDirection (_temperatureChange) {
		if (_temperatureChange > 0) {
			return 'decrease'
		} else if (_temperatureChange < 0) {
			return 'increase'
		} else {
			return 'no change'
		}
	}

	setInsignificantFilter (_boolean) {
		this.significanceFilter = _boolean
	}

	setTemperature (_celcius) {
		const temperatureChange = this.celcius - _celcius
		const temperatureDirection = this.getTemperatureDirection(temperatureChange)
		const nextTemperature = _celcius

		// A function to check if temperature is moving in the same direction as threshold requirement
		if (this.thresholdTemperatureDirectionMatch(temperatureDirection, nextTemperature, temperatureChange)) {
			// If returns true, send user the threshold reached alert
			this.updateTemperature(_celcius)
			return `The ${this.thresholdName} threshold has been reached!`
		}
		this.updateTemperature(_celcius)
	}

	thresholdTemperatureDirectionMatch (_temperatureDirection, _nextTemperature, _temperatureChange) {
		if (_temperatureDirection === this.thresholdDirection) {
			// A function to check whether all criteria for sending thresholds have been met
			return this.areThresholdRequirementsFulfilled(_temperatureDirection, _nextTemperature)
		// If temperature did not change, no alert
		} else if (_temperatureDirection === 'no change') {
			return false
		} else {
		// If temperature goes opposite way of threshold direction
			return false
		}
	}

	areThresholdRequirementsFulfilled (_temperatureDirection, _nextTemperature) {
		// If the temperature direction is increasing
		if (_temperatureDirection === 'increase') {
			if (_nextTemperature > this.celcius && _nextTemperature >= this.thresholdTemperature && this.celcius < this.thresholdTemperature) {
				// If the significance filter is turned on and the previous temperature is within the insignificant range, return false
				if (this.significanceFilter && this.isInsignificantFluctuation(_temperatureDirection)) {
					return false
				}
				return true
			} else {
				return false
			}
		// If the temperature direction is decreasing
		} else {
			if (_nextTemperature < this.celcius && _nextTemperature <= this.thresholdTemperature && this.celcius > this.thresholdTemperature) {
				// If the significance filter is turned on and the previous temperature is within the insignificant range, return false
				if (this.significanceFilter && this.isInsignificantFluctuation(_temperatureDirection)) {
					return false
				}
				return true
			} else {
				return false
			}
		}
	}

	isInsignificantFluctuation (_temperatureDirection) {
		if (_temperatureDirection === 'increase' && this.celcius > this.thresholdTemperature - 0.6) {
			return true
		} else if (_temperatureDirection === 'increase' && this.celcius < this.thresholdTemperature + 0.6) {
			return true
		}
		return false
	}
}

let thermostat = new Thermometer(10)
// thermostat.setThreshold('boiling', 100, 'increase', false)
// thermostat.setTemperature(50)
// thermostat.setTemperature(100)
// thermostat.setTemperature(99.4)
// thermostat.setInsignificantFilter(false)
// thermostat.setTemperature(99.9)
// thermostat.setTemperature(102)

// thermostat.setThreshold('freezing', 0, 'decrease')
// thermostat.setTemperature(5)
// thermostat.setTemperature(0)
// thermostat.setInsignificantFilter(true)
// thermostat.setTemperature(0.6)
// thermostat.setTemperature(0.5)
// thermostat.setTemperature(-1)

// console.log(thermostat.readTemperature())
// console.log(thermostat)