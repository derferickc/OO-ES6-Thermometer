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
			console.log(`The ${this.thresholdName} threshold has been reached!`)
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
		// Current is inside of the insignificant range below threshold
		if (_temperatureDirection === 'increase' && this.celcius > this.thresholdTemperature - 0.6) {
			return true
		// Current is outside of the insignificant range below threshold
		} else if (_temperatureDirection === 'increase' && this.celcius < this.thresholdTemperature - 0.6) {
			return false
		// Current is inside of the insignificant range above threshold
		} else if (_temperatureDirection === 'decrease' && this.celcius < this.thresholdTemperature + 0.6) {
			return true
		// Current is outside of the insignificant range above threshold
		} else if (_temperatureDirection === 'decrease' && this.celcius > this.thresholdTemperature + 0.6) {
			return false
		}
		// return false
	}
}

let thermostat = new Thermometer(10)
////// Test case 1: Temperature hits boiling threshold (100 °C) once and you expect one alert
// thermostat.setThreshold('boiling', 100, 'increase', false)
// thermostat.setTemperature(50)
// thermostat.setTemperature(100)
// console.log(thermostat.readTemperature())

////// Test case 2: Temperature hits boiling threshold (100 °C) twice and you expect two alerts
// thermostat.setThreshold('boiling', 100, 'increase', false)
// thermostat.setTemperature(50)
// thermostat.setTemperature(100)
// thermostat.setTemperature(99)
// thermostat.setTemperature(101)
// console.log(thermostat.readTemperature())

////// Test case 3: Temperature hits boiling threshold (100 °C) twice and you expect one alert because insignificantFilter is toggled to true, however the temperature fluctuation is within the 0.5 °C deemed insignificant
// thermostat.setThreshold('boiling', 100, 'increase', true)
// thermostat.setTemperature(100)
// thermostat.setTemperature(99.5)
// thermostat.setTemperature(101)
// console.log(thermostat.readTemperature())

////// Test case 4: Temperature hits boiling threshold (100 °C) twice and you expect two alerts because insignificantFilter is toggled to true, but the temperature fluctuation is outside of the 0.5 °C deemed insignificant
// thermostat.setThreshold('boiling', 100, 'increase', true)
// thermostat.setTemperature(100)
// thermostat.setTemperature(99.4)
// thermostat.setTemperature(101)
// console.log(thermostat.readTemperature())

////// Test case 5: Temperature hits boiling threshold (100 °C) twice and you expect two alerts because insignificantFilter is toggled to false, temperature is outside the fluctuations of the 0.5 °C insignificance
// thermostat.setThreshold('boiling', 100, 'increase', false)
// thermostat.setTemperature(100)
// thermostat.setTemperature(99.4)
// thermostat.setTemperature(101)
// console.log(thermostat.readTemperature())

////// Test case 6: Temperature hits boiling threshold (100 °C) twice and you expect two alerts because insignificantFilter is toggled to false, temperature is within the temperature fluctuations of 0.5 °C insignificance, but is ignored
// thermostat.setThreshold('boiling', 100, 'increase', false)
// thermostat.setTemperature(100)
// thermostat.setTemperature(99.5)
// thermostat.setTemperature(101)
// console.log(thermostat.readTemperature())

////// Test case 7: Temperature hits freezing threshold (0 °C) once and you expect one alert
// thermostat.setThreshold('freezing', 0, 'decrease', false)
// thermostat.setTemperature(1)
// thermostat.setTemperature(0)
// console.log(thermostat.readTemperature())

////// Test case 8: Temperature hits freezing threshold (0 °C) twice and you expect two alerts
// thermostat.setThreshold('freezing', 0, 'decrease', false)
// thermostat.setTemperature(0)
// thermostat.setTemperature(10)
// thermostat.setTemperature(-1)
// console.log(thermostat.readTemperature())

////// Test case 9: Temperature hits freezing threshold (0 °C) twice and you expect one alert because insignificantFilter is toggled to true, however the temperature fluctuation is within the 0.5 °C deemed insignificant
// thermostat.setThreshold('freezing', 0, 'decrease', true)
// thermostat.setTemperature(0)
// thermostat.setTemperature(0.5)
// thermostat.setTemperature(-1)
// console.log(thermostat.readTemperature())

////// Test case 10: Temperature hits freezing threshold (0 °C) twice and you expect two alerts because insignificantFilter is toggled to true, but the temperature fluctuation is outside of the 0.5 °C deemed insignificant
// thermostat.setThreshold('freezing', 0, 'decrease', true)
// thermostat.setTemperature(0)
// thermostat.setTemperature(0.6)
// thermostat.setTemperature(-1)
// console.log(thermostat.readTemperature())

////// Test case 11: Temperature hits freezing threshold (0 °C) twice and you expect two alerts because insignificantFilter is toggled to false, temperature is outside the fluctuations of the 0.5 °C insignificance
// thermostat.setThreshold('freezing', 0, 'decrease', false)
// thermostat.setTemperature(0)
// thermostat.setTemperature(0.6)
// thermostat.setTemperature(-1)
// console.log(thermostat.readTemperature())

////// Test case 12: Temperature hits freezing threshold (0 °C) twice and you expect two alerts because insignificantFilter is toggled to false, temperature is within the temperature fluctuations of 0.5 °C insignificance, but is ignored
// thermostat.setThreshold('freezing', 0, 'decrease', false)
// thermostat.setTemperature(0)
// thermostat.setTemperature(0.5)
// thermostat.setTemperature(-1)
// console.log(thermostat.readTemperature())

// console.log(thermostat)