'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _SearchForm = require('./components/SearchForm');

var _SearchForm2 = _interopRequireDefault(_SearchForm);

var _Footer = require('./components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var rootDir = document.getElementById('app');

var Main = function (_React$Component) {
    _inherits(Main, _React$Component);

    function Main(props) {
        _classCallCheck(this, Main);

        var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

        _this.handleSearch = _this.handleSearch.bind(_this);
        _this.state = {
            weather: '',
            temperature: '',
            data: null,
            ready: false,
            error: false,
            typedCity: ''
        };
        return _this;
    }

    _createClass(Main, [{
        key: 'getCities',
        value: function getCities() {
            var _this2 = this;

            fetch('cities2.json').then(function (results) {
                return results.json();
            }).then(function (data) {
                _this2.setState({ data: data });
                _this2.setState({ ready: true });
            });
        }
    }, {
        key: 'handleSearch',
        value: function handleSearch(city) {
            var _this3 = this;

            console.log("selected: " + city);
            var temperatureInKelvins = void 0;
            var temperatureInCelsius = 0;
            var APICallbackObject = void 0;
            var requestURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=a5d803bdbb963adcf81a3a6444580326';

            fetch(requestURL).then(function (results) {
                return results.json();
            }).then(function (data) {
                return APICallbackObject = data;
            }).then(function () {
                temperatureInKelvins = APICallbackObject.list[0].main.temp;
                temperatureInCelsius = Math.floor((temperatureInKelvins - 273.15) * 100) / 100;
                _this3.setState({
                    temperature: temperatureInCelsius + '℃',
                    error: false,
                    typedCity: city
                });
            }).catch(function (error) {
                console.log(error);
                _this3.setState({ error: true, typedCity: city });
            });
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.getCities();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            console.log(this.state.data);
        }
    }, {
        key: 'render',
        value: function render() {

            if (!this.state.ready) return null;
            if (this.state.error) {
                return _react2.default.createElement(
                    'div',
                    { className: 'app' },
                    _react2.default.createElement(
                        'main',
                        { className: 'weather-app' },
                        _react2.default.createElement(
                            'div',
                            { className: 'container' },
                            _react2.default.createElement(
                                'header',
                                null,
                                _react2.default.createElement(
                                    'h1',
                                    { className: 'weather-app__title' },
                                    'Weather App 0.2A'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'weather-app__city' },
                                    'Nie znaleziono miejscowo\u015Bci o nazwie ',
                                    _react2.default.createElement(
                                        'b',
                                        null,
                                        '"',
                                        this.state.typedCity,
                                        '"'
                                    ),
                                    ', spr\xF3buj ponownie!'
                                )
                            ),
                            _react2.default.createElement(_SearchForm2.default, _defineProperty({ handleSearch: this.handleSearch, listOfCities: this.state.data }, 'handleSearch', this.handleSearch))
                        )
                    ),
                    _react2.default.createElement(_Footer2.default, null)
                );
            } else {
                return _react2.default.createElement(
                    'div',
                    { className: 'app' },
                    _react2.default.createElement(
                        'main',
                        { className: 'weather-app' },
                        _react2.default.createElement(
                            'div',
                            { className: 'container' },
                            _react2.default.createElement(
                                'header',
                                null,
                                _react2.default.createElement(
                                    'h1',
                                    { className: 'weather-app__title' },
                                    'Weather App 0.2A'
                                ),
                                this.state.temperature ? _react2.default.createElement(
                                    'p',
                                    { className: 'weather-app__city' },
                                    _react2.default.createElement(
                                        'b',
                                        null,
                                        this.state.typedCity
                                    )
                                ) : ''
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'weather-app__temperature' },
                                this.state.temperature
                            ),
                            _react2.default.createElement(_SearchForm2.default, _defineProperty({ handleSearch: this.handleSearch, listOfCities: this.state.data }, 'handleSearch', this.handleSearch))
                        )
                    ),
                    _react2.default.createElement(_Footer2.default, null)
                );
            }
        }
    }]);

    return Main;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(Main, null), rootDir);
