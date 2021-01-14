# OO-ES6-Thermometer

> Designing and implementing in OO a thermometer class that reads the temperature of an external source

> Technology used: Javascript (ES6)

## Criteria

- Design and implement a thermometer class or classes that reads the temperature of an external source
- Thermometer must be able to provide temperature in Farenheit and Celcius
- Callers of class(es) are able to define arbitrary thresholds (such as freezing /boiling point) which the thermometer class will alert when the threshold has been reached
- Alerts should only be sent if a threshold was reached from a certain direction (freezing point alert only if temperature is decreasing etc)
- Callers may not want insignificant fluctuations (+/- 0.5 °C) to trigger the alert

## Properties of Thermometer

- celcius: degrees in Celcius
- farenheit: degrees in Farenheit
- thresholdName: arbitrary name of threshold
- thresholdTemperature: the minimum or maximum temperature (°C) for a threshold based on the direction of temperature
- thresholdDirection: the direction that the temperature must be moving in in order for threshold alert to be thrown (increase / decrease)
- significanceFilter: a boolean for whether to filter out insignificant values (+/- 0.5 °Cfrom thresholdTemperature
