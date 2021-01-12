class Thermometer {
	constructor (_celcius) {
		this.celcius = _celcius
		this.farenheit = (_celcius * 9) / 5 + 32
		this.freezing = 0
		this.boiling = 100
		this.threshold = null
		this.alertThrown = false
	}

	readTemperature () {
		return `Celcius: ${this.celcius}°, Farenheit: ${this.farenheit}°`
	}

	setThreshold (_threshold) {
		const lowercaseThreshold = _threshold.toLowerCase()
		if (this.threshold !== _threshold) {
			this.alertThrown = false
			if (_threshold === 'boiling') {
				this.threshold = _threshold
			} else if (_threshold === 'freezing') {
				this.threshold = _threshold
			} else {
				return 'this threshold is not accounted for!'
			}
		}
	}

	setTemperature (_celcius) {
		this.celcius = _celcius
		this.farenheit = (_celcius * 9) / 5 + 32
		let thresholdReachedCheck = this.thresholdReachedCheck()
		if (thresholdReachedCheck === true) {
			if (this.threshold === 'boiling' && this.alertThrown === false) {
				this.alertThrown = true
				console.log(`The temperature has reached ${this.threshold}`)
			} else if (this.threshold === 'freezing' && this.alertThrown === false) {
				this.alertThrown = true
				console.log(`The temperature has reached ${this.threshold}`)
			}
		} else {
			this.alertThrown = false
		}
	}

	thresholdReachedCheck () {
		if (this.threshold === "boiling" && this.celcius >= 100) {
			return true
		} else if (this.threshold === "freezing" && this.celcius <= 0) {
			return true
		}
		
	}
}

let thermostat = new Thermometer(0)
thermostat.setThreshold('boiling')
thermostat.setTemperature(1)
thermostat.setTemperature(100)
thermostat.setTemperature(99)
thermostat.setTemperature(101)

thermostat.setThreshold('freezing')
thermostat.setTemperature(0)
thermostat.setTemperature(10)
thermostat.setTemperature(-2)
console.log(thermostat)
