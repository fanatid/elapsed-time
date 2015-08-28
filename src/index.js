import hrtime from './hrtime'

/**
 * @param {number} value Time in nanoseconds
 * @return {string}
 */
let defaultFormatter = (value) => {
  if (value < 1e3) {
    return `${value}ns`
  }

  if (value < 1e6) {
    return `${(value / 1e3).toFixed(3)}us`
  }

  if (value < 1e9) {
    return `${(value / 1e6).toFixed(3)}ms`
  }

  return `${(value / 1e9).toFixed(3)}s`
}

/**
 * @class ElapsedTime
 */
export default class ElapsedTime {
  /**
   * @constructor
   * @param {Object} [opts]
   * @param {function} [opts.formatter]
   */
  constructor (opts) {
    this._prevTime = null
    this._savedTime = null

    this._formatter = Object(opts).formatter
    if (typeof this._formatter !== 'function') {
      this._formatter = defaultFormatter
    }
  }

  /**
   * @param {Object} [opts]
   * @param {function} [opts.formatter]
   * @return {ElapsedTime}
   */
  static new (opts) { return new ElapsedTime(opts) }

  /**
   * @param {function} formatter
   */
  static setDefaultFormatter (formatter) { defaultFormatter = formatter }

  /**
   * @return {ElapsedTime}
   */
  start () {
    if (this._prevTime !== null || this._savedTime !== null) {
      throw new Error('ElapsedTime already started, please call `reset` first!')
    }

    this._prevTime = hrtime()
    this._savedTime = null

    return this
  }

  /**
   * @return {ElapsedTime}
   */
  pause () {
    if (this._prevTime === null && this._savedTime === null) {
      throw new Error('ElapsedTime not started, please call `start` first!')
    }

    if (this._savedTime !== null) {
      throw new Error('ElapsedTime already paused, please call `resume` first!')
    }

    let [seconds, nanoseconds] = hrtime(this._prevTime)

    this._prevTime = null
    this._savedTime = seconds * 1e9 + nanoseconds

    return this
  }

  /**
   * @return {ElapsedTime}
   */
  resume () {
    if (this._prevTime === null && this._savedTime === null) {
      throw new Error('ElapsedTime not started, please call `start` first!')
    }

    if (this._savedTime === null) {
      throw new Error('ElapsedTime not paused, please call `pause` first!')
    }

    let [seconds, nanoseconds] = hrtime()
    seconds -= Math.floor(this._savedTime / 1e9)
    nanoseconds -= this._savedTime % 1e9
    if (nanoseconds < 0) {
      seconds -= 1
      nanoseconds += 1e9
    }

    this._prevTime = [seconds, nanoseconds]
    this._savedTime = null

    return this
  }

  /**
   * @param {number} timeout
   * @return {ElapsedTime}
   */
  sleep (timeout) {
    this.pause()
    setTimeout(::this.resume, timeout)

    return this
  }

  /**
   * @return {ElapsedTime}
   */
  reset () {
    this._prevTime = null
    this._savedTime = null

    return this
  }

  /**
   * @return {number}
   */
  getRawValue () {
    if (this._prevTime === null && this._savedTime === null) {
      throw new Error('ElapsedTime not started yet, please call `start` first!')
    }

    if (this._savedTime !== null) {
      return this._savedTime
    }

    let [seconds, nanoseconds] = hrtime(this._prevTime)
    return seconds * 1e9 + nanoseconds
  }

  /**
   * @param {Object} [opts]
   * @param {function} [opts.formatter]
   * @return {string}
   */
  getValue (opts) {
    let formatter = Object(opts).formatter
    if (typeof formatter !== 'function') {
      formatter = this._formatter
    }

    return formatter(this.getRawValue())
  }
}
