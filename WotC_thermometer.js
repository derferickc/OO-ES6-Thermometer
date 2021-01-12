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
			// High threshold with increasing direction
			if (!this.alertThrown) {
				console.log('alert not thrown yet')
				if (this.celcius >= this.thresholdTemperature && _temperatureDirection === 'increase') {
					console.log('increasing temp and reache the temp')
					return true
				} else if (this.celcius <= this.thresholdTemperature && _temperatureDirection === 'decrease') {
					console.log('decreasing temp and reache the temp')
					return true
				}
			} else {
				console.log('alert already thrown')
				if (this.alertThrown && _temperatureDirection === 'increase') {
					console.log('secret inner increasing')
					if (this.celcius < this.thresholdTemperature + 0.6 && this.celcius > this.thresholdTemperature - 0.6) {
						console.log('within insignificant range')
						return false
					}
					return true
				}
				if (this.alertThrown && _temperatureDirection === 'decrease') {
					console.log('secret inner decrease')
					if (this.celcius < this.thresholdTemperature + 0.6 && this.celcius > this.thresholdTemperature - 0.6) {
						console.log('within insignificant range')
						return false
					}
					return true
				}
			}
			// if (this.celcius >= this.thresholdTemperature && _temperatureDirection === 'increase') {
			// 	if (this.alertThrown && this.celcius < this.thresholdTemperature - 0.5 && this.celcius < this.thresholdTemperature + 0.5) {
			// 		// console.log(this.celcius)
			// 		console.log(this.thresholdTemperature + 0.5)
			// 		return false
			// 	} else if (this.alertThrown) {
			// 		console.log('other do nothing')
			// 		return true
			// 	}
			// 	return true
			// 	// if (this.alertThrown === true)
			// 	// 	console.log('increase boil inner')
			// 	// if (_previousCelcius > (this.thresholdTemperature - 0.5)) {
			// 	// 	return false
			// 	// }
			// 	// console.log('inner boil achieved')
			// 	// return true
			// } else if (this.celcius <= this.thresholdTemperature && _temperatureDirection === 'decrease') {
			// // Low threshold with decreasing direction
			// 	// if (_previousCelcius < (this.thresholdTemperature + 0.5)) {
			// 	// 	return false
			// 	// }
			// 	// console.log('inner freeze achieved')
			// 	// return true
			// }

		// If temperature did not change, no alert
		} else if (_temperatureDirection === 'no change') {
			console.log('temperature did not change')
			return false
		} else {
		// If temperature goes opposite way of threshold direction
			console.log('temperature direction opposite of threshold direction')
			return false
		}
	}

	thresholdAlert () {
		this.alertThrown = true
		console.log(this.thresholdName + ' achieved')
	}
}

let thermostat = new Thermometer(0)
thermostat.setThreshold('boiling', 100, 'increase')
thermostat.setTemperature(50)
thermostat.setTemperature(100)
// thermostat.setTemperature(99.6)
// thermostat.setTemperature(100.6)

thermostat.setThreshold('freezing', 0, 'decrease')
thermostat.setTemperature(-1)
// thermostat.setTemperature(0.3)
// thermostat.setTemperature(-.5)
// thermostat.setTemperature(-1)

// console.log(thermostat.readTemperature())

// console.log(thermostat)