'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Search = require('./components/Search');

var _Search2 = _interopRequireDefault(_Search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            data: null
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
            });
        }
    }, {
        key: 'handleSearch',
        value: function handleSearch(city) {
            var _this3 = this;

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
                _this3.setState({ weather: temperatureInCelsius });
            });
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.getCities();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'p',
                    null,
                    'Test'
                ),
                this.state.weather,
                _react2.default.createElement(
                    'sup',
                    null,
                    'o'
                ),
                'C',
                _react2.default.createElement(_Search2.default, { handleSearch: this.handleSearch, listOfCities: this.state.data })
            );
        }
    }]);

    return Main;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(Main, null), rootDir);
