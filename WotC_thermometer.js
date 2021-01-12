class Thermometer {
	constructor (_celcius) {
		this.celcius = _celcius
		this.farenheit = (_celcius * 9) / 5 + 32
		this.thresholdName = null
		this.thresholdTemperature = null
		this.thresholdDirection = null
		this.alertThrown = false
	}

	readTemperature () {
		return `Celcius: ${this.celcius}°, Farenheit: ${this.farenheit}°`
	}

	setThreshold (_thresholdName, _thresholdTemperature, _thresholdDirection) {
		this.thresholdName = _thresholdName
		this.thresholdTemperature = _thresholdTemperature
		this.thresholdDirection = _thresholdDirection
		this.alertThrown = false
	}

	setTemperature (_celcius) {
		let temperatureDirection = ''
		let temperatureChange = this.celcius - _celcius
		if (temperatureChange > 0) {
			temperatureDirection = 'decrease'
		} else if (temperatureChange < 0) {
			temperatureDirection = 'increase'
		} else {
			temperatureDirection = 'no change'
		}
		let previousCelcius = this.celcius
		this.celcius = _celcius
		this.farenheit = (_celcius * 9) / 5 + 32

		let thresholdReachedCheck = this.thresholdReachedCheck(temperatureDirection, previousCelcius)
		if (thresholdReachedCheck === true) {
			this.thresholdAlert()
		}
	}

	thresholdReachedCheck (_temperatureDirection, _previousCelcius) {
		// If temperature is moving in the same direction as threshold requirement
		if (_temperatureDirection === this.thresholdDirection) {
			if (!this.alertThrown) {
				// High threshold with increasing direction
				if (this.celcius >= this.thresholdTemperature && _temperatureDirection === 'increase') {
					return true
				// Low threshold with decreasing direction
				} else if (this.celcius <= this.thresholdTemperature && _temperatureDirection === 'decrease') {
					return true
				}
				return false
			}
		// If temperature did not change, no alert
		} else if (_temperatureDirection === 'no change') {
			console.log('temperature did not change')
			return false
		} else {
		// If temperature goes opposite way of threshold direction
			console.log('temperature direction opposite of threshold direction')
			if (this.thresholdDirection === 'increase' && this.celcius < this.thresholdTemperature - 0.5) {
				this.alertThrown = false
				return false
			} else if (this.thresholdDirection === 'decrease' && this.celcius > this.thresholdTemperature + 0.5) {
				this.alertThrown = false
				return false
			}
			return false
		}
	}

	thresholdAlert () {
		this.alertThrown = true
		console.log(this.thresholdName + ' achieved')
	}
}

let thermostat = new Thermometer(10)
thermostat.setThreshold('boiling', 100, 'increase')
thermostat.setTemperature(50)
thermostat.setTemperature(100)
thermostat.setTemperature(99.4)
thermostat.setTemperature(100)

thermostat.setThreshold('freezing', 0, 'decrease')
thermostat.setTemperature(5)
thermostat.setTemperature(0)
thermostat.setTemperature(0.6)
thermostat.setTemperature(0)

// console.log(thermostat.readTemperature())
// console.log(thermostat)