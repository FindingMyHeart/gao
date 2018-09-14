function textInCenter(a, b) {
	var c = tooltipCanvas.getContext("2d");
	c.clearRect(0, 0, tooltipCanvas.width, tooltipCanvas.height), c.restore(), c.fillStyle = "#333333", c.font = "24px sans-serif", c.textBaseline = "middle";
	var d = {
		x: Math.round((tooltipCanvas.width - c.measureText(a).width) / 2),
		y: tooltipCanvas.height / 2
	};
	c.fillText(a, d.x, d.y), c.fillStyle = "#AAAAAA", c.font = "8px sans-serif";
	var e = {
		x: Math.round((tooltipCanvas.width - c.measureText(b).width) / 2),
		y: tooltipCanvas.height / 2
	};
	c.fillText(b, e.x, e.y - 20), c.save()
}

function addData(a, b, c) {
	a.data.labels.push(b), a.update()
}! function(a) {
	if("object" == typeof exports && "undefined" != typeof module) module.exports = a();
	else if("function" == typeof define && define.amd) define([], a);
	else {
		var b;
		b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.Chart = a()
	}
}(function() {
	return function a(b, c, d) {
		function e(g, h) {
			if(!c[g]) {
				if(!b[g]) {
					var i = "function" == typeof require && require;
					if(!h && i) return i(g, !0);
					if(f) return f(g, !0);
					var j = new Error("Cannot find module '" + g + "'");
					throw j.code = "MODULE_NOT_FOUND", j
				}
				var k = c[g] = {
					exports: {}
				};
				b[g][0].call(k.exports, function(a) {
					var c = b[g][1][a];
					return e(c || a)
				}, k, k.exports, a, b, c, d)
			}
			return c[g].exports
		}
		for(var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
		return e
	}({
		1: [function(a, b, c) {}, {}],
		2: [function(a, b, c) {
			function d(a) {
				if(a) {
					var b = /^#([a-fA-F0-9]{3})$/i,
						c = /^#([a-fA-F0-9]{6})$/i,
						d = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i,
						e = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i,
						f = /(\w+)/,
						g = [0, 0, 0],
						h = 1,
						i = a.match(b);
					if(i) {
						i = i[1];
						for(var j = 0; j < g.length; j++) g[j] = parseInt(i[j] + i[j], 16)
					} else if(i = a.match(c)) {
						i = i[1];
						for(var j = 0; j < g.length; j++) g[j] = parseInt(i.slice(2 * j, 2 * j + 2), 16)
					} else if(i = a.match(d)) {
						for(var j = 0; j < g.length; j++) g[j] = parseInt(i[j + 1]);
						h = parseFloat(i[4])
					} else if(i = a.match(e)) {
						for(var j = 0; j < g.length; j++) g[j] = Math.round(2.55 * parseFloat(i[j + 1]));
						h = parseFloat(i[4])
					} else if(i = a.match(f)) {
						if("transparent" == i[1]) return [0, 0, 0, 0];
						if(!(g = u[i[1]])) return
					}
					for(var j = 0; j < g.length; j++) g[j] = s(g[j], 0, 255);
					return h = h || 0 == h ? s(h, 0, 1) : 1, g[3] = h, g
				}
			}

			function e(a) {
				if(a) {
					var b = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
						c = a.match(b);
					if(c) {
						var d = parseFloat(c[4]);
						return [s(parseInt(c[1]), 0, 360), s(parseFloat(c[2]), 0, 100), s(parseFloat(c[3]), 0, 100), s(isNaN(d) ? 1 : d, 0, 1)]
					}
				}
			}

			function f(a) {
				if(a) {
					var b = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
						c = a.match(b);
					if(c) {
						var d = parseFloat(c[4]);
						return [s(parseInt(c[1]), 0, 360), s(parseFloat(c[2]), 0, 100), s(parseFloat(c[3]), 0, 100), s(isNaN(d) ? 1 : d, 0, 1)]
					}
				}
			}

			function g(a) {
				var b = d(a);
				return b && b.slice(0, 3)
			}

			function h(a) {
				var b = e(a);
				return b && b.slice(0, 3)
			}

			function i(a) {
				var b = d(a);
				return b ? b[3] : (b = e(a)) ? b[3] : (b = f(a)) ? b[3] : void 0
			}

			function j(a) {
				return "#" + t(a[0]) + t(a[1]) + t(a[2])
			}

			function k(a, b) {
				return b < 1 || a[3] && a[3] < 1 ? l(a, b) : "rgb(" + a[0] + ", " + a[1] + ", " + a[2] + ")"
			}

			function l(a, b) {
				return void 0 === b && (b = void 0 !== a[3] ? a[3] : 1), "rgba(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + b + ")"
			}

			function m(a, b) {
				return b < 1 || a[3] && a[3] < 1 ? n(a, b) : "rgb(" + Math.round(a[0] / 255 * 100) + "%, " + Math.round(a[1] / 255 * 100) + "%, " + Math.round(a[2] / 255 * 100) + "%)"
			}

			function n(a, b) {
				return "rgba(" + Math.round(a[0] / 255 * 100) + "%, " + Math.round(a[1] / 255 * 100) + "%, " + Math.round(a[2] / 255 * 100) + "%, " + (b || a[3] || 1) + ")"
			}

			function o(a, b) {
				return b < 1 || a[3] && a[3] < 1 ? p(a, b) : "hsl(" + a[0] + ", " + a[1] + "%, " + a[2] + "%)"
			}

			function p(a, b) {
				return void 0 === b && (b = void 0 !== a[3] ? a[3] : 1), "hsla(" + a[0] + ", " + a[1] + "%, " + a[2] + "%, " + b + ")"
			}

			function q(a, b) {
				return void 0 === b && (b = void 0 !== a[3] ? a[3] : 1), "hwb(" + a[0] + ", " + a[1] + "%, " + a[2] + "%" + (void 0 !== b && 1 !== b ? ", " + b : "") + ")"
			}

			function r(a) {
				return v[a.slice(0, 3)]
			}

			function s(a, b, c) {
				return Math.min(Math.max(b, a), c)
			}

			function t(a) {
				var b = a.toString(16).toUpperCase();
				return b.length < 2 ? "0" + b : b
			}
			var u = a(6);
			b.exports = {
				getRgba: d,
				getHsla: e,
				getRgb: g,
				getHsl: h,
				getHwb: f,
				getAlpha: i,
				hexString: j,
				rgbString: k,
				rgbaString: l,
				percentString: m,
				percentaString: n,
				hslString: o,
				hslaString: p,
				hwbString: q,
				keyword: r
			};
			var v = {};
			for(var w in u) v[u[w]] = w
		}, {
			6: 6
		}],
		3: [function(a, b, c) {
			var d = a(5),
				e = a(2),
				f = function(a) {
					if(a instanceof f) return a;
					if(!(this instanceof f)) return new f(a);
					this.valid = !1, this.values = {
						rgb: [0, 0, 0],
						hsl: [0, 0, 0],
						hsv: [0, 0, 0],
						hwb: [0, 0, 0],
						cmyk: [0, 0, 0, 0],
						alpha: 1
					};
					var b;
					"string" == typeof a ? (b = e.getRgba(a), b ? this.setValues("rgb", b) : (b = e.getHsla(a)) ? this.setValues("hsl", b) : (b = e.getHwb(a)) && this.setValues("hwb", b)) : "object" == typeof a && (b = a, void 0 !== b.r || void 0 !== b.red ? this.setValues("rgb", b) : void 0 !== b.l || void 0 !== b.lightness ? this.setValues("hsl", b) : void 0 !== b.v || void 0 !== b.value ? this.setValues("hsv", b) : void 0 !== b.w || void 0 !== b.whiteness ? this.setValues("hwb", b) : void 0 === b.c && void 0 === b.cyan || this.setValues("cmyk", b))
				};
			f.prototype = {
				isValid: function() {
					return this.valid
				},
				rgb: function() {
					return this.setSpace("rgb", arguments)
				},
				hsl: function() {
					return this.setSpace("hsl", arguments)
				},
				hsv: function() {
					return this.setSpace("hsv", arguments)
				},
				hwb: function() {
					return this.setSpace("hwb", arguments)
				},
				cmyk: function() {
					return this.setSpace("cmyk", arguments)
				},
				rgbArray: function() {
					return this.values.rgb
				},
				hslArray: function() {
					return this.values.hsl
				},
				hsvArray: function() {
					return this.values.hsv
				},
				hwbArray: function() {
					var a = this.values;
					return 1 !== a.alpha ? a.hwb.concat([a.alpha]) : a.hwb
				},
				cmykArray: function() {
					return this.values.cmyk
				},
				rgbaArray: function() {
					var a = this.values;
					return a.rgb.concat([a.alpha])
				},
				hslaArray: function() {
					var a = this.values;
					return a.hsl.concat([a.alpha])
				},
				alpha: function(a) {
					return void 0 === a ? this.values.alpha : (this.setValues("alpha", a), this)
				},
				red: function(a) {
					return this.setChannel("rgb", 0, a)
				},
				green: function(a) {
					return this.setChannel("rgb", 1, a)
				},
				blue: function(a) {
					return this.setChannel("rgb", 2, a)
				},
				hue: function(a) {
					return a && (a %= 360, a = a < 0 ? 360 + a : a), this.setChannel("hsl", 0, a)
				},
				saturation: function(a) {
					return this.setChannel("hsl", 1, a)
				},
				lightness: function(a) {
					return this.setChannel("hsl", 2, a)
				},
				saturationv: function(a) {
					return this.setChannel("hsv", 1, a)
				},
				whiteness: function(a) {
					return this.setChannel("hwb", 1, a)
				},
				blackness: function(a) {
					return this.setChannel("hwb", 2, a)
				},
				value: function(a) {
					return this.setChannel("hsv", 2, a)
				},
				cyan: function(a) {
					return this.setChannel("cmyk", 0, a)
				},
				magenta: function(a) {
					return this.setChannel("cmyk", 1, a)
				},
				yellow: function(a) {
					return this.setChannel("cmyk", 2, a)
				},
				black: function(a) {
					return this.setChannel("cmyk", 3, a)
				},
				hexString: function() {
					return e.hexString(this.values.rgb)
				},
				rgbString: function() {
					return e.rgbString(this.values.rgb, this.values.alpha)
				},
				rgbaString: function() {
					return e.rgbaString(this.values.rgb, this.values.alpha)
				},
				percentString: function() {
					return e.percentString(this.values.rgb, this.values.alpha)
				},
				hslString: function() {
					return e.hslString(this.values.hsl, this.values.alpha)
				},
				hslaString: function() {
					return e.hslaString(this.values.hsl, this.values.alpha)
				},
				hwbString: function() {
					return e.hwbString(this.values.hwb, this.values.alpha)
				},
				keyword: function() {
					return e.keyword(this.values.rgb, this.values.alpha)
				},
				rgbNumber: function() {
					var a = this.values.rgb;
					return a[0] << 16 | a[1] << 8 | a[2]
				},
				luminosity: function() {
					for(var a = this.values.rgb, b = [], c = 0; c < a.length; c++) {
						var d = a[c] / 255;
						b[c] = d <= .03928 ? d / 12.92 : Math.pow((d + .055) / 1.055, 2.4)
					}
					return .2126 * b[0] + .7152 * b[1] + .0722 * b[2]
				},
				contrast: function(a) {
					var b = this.luminosity(),
						c = a.luminosity();
					return b > c ? (b + .05) / (c + .05) : (c + .05) / (b + .05)
				},
				level: function(a) {
					var b = this.contrast(a);
					return b >= 7.1 ? "AAA" : b >= 4.5 ? "AA" : ""
				},
				dark: function() {
					var a = this.values.rgb;
					return(299 * a[0] + 587 * a[1] + 114 * a[2]) / 1e3 < 128
				},
				light: function() {
					return !this.dark()
				},
				negate: function() {
					for(var a = [], b = 0; b < 3; b++) a[b] = 255 - this.values.rgb[b];
					return this.setValues("rgb", a), this
				},
				lighten: function(a) {
					var b = this.values.hsl;
					return b[2] += b[2] * a, this.setValues("hsl", b), this
				},
				darken: function(a) {
					var b = this.values.hsl;
					return b[2] -= b[2] * a, this.setValues("hsl", b), this
				},
				saturate: function(a) {
					var b = this.values.hsl;
					return b[1] += b[1] * a, this.setValues("hsl", b), this
				},
				desaturate: function(a) {
					var b = this.values.hsl;
					return b[1] -= b[1] * a, this.setValues("hsl", b), this
				},
				whiten: function(a) {
					var b = this.values.hwb;
					return b[1] += b[1] * a, this.setValues("hwb", b), this
				},
				blacken: function(a) {
					var b = this.values.hwb;
					return b[2] += b[2] * a, this.setValues("hwb", b), this
				},
				greyscale: function() {
					var a = this.values.rgb,
						b = .3 * a[0] + .59 * a[1] + .11 * a[2];
					return this.setValues("rgb", [b, b, b]), this
				},
				clearer: function(a) {
					var b = this.values.alpha;
					return this.setValues("alpha", b - b * a), this
				},
				opaquer: function(a) {
					var b = this.values.alpha;
					return this.setValues("alpha", b + b * a), this
				},
				rotate: function(a) {
					var b = this.values.hsl,
						c = (b[0] + a) % 360;
					return b[0] = c < 0 ? 360 + c : c, this.setValues("hsl", b), this
				},
				mix: function(a, b) {
					var c = this,
						d = a,
						e = void 0 === b ? .5 : b,
						f = 2 * e - 1,
						g = c.alpha() - d.alpha(),
						h = ((f * g == -1 ? f : (f + g) / (1 + f * g)) + 1) / 2,
						i = 1 - h;
					return this.rgb(h * c.red() + i * d.red(), h * c.green() + i * d.green(), h * c.blue() + i * d.blue()).alpha(c.alpha() * e + d.alpha() * (1 - e))
				},
				toJSON: function() {
					return this.rgb()
				},
				clone: function() {
					var a, b, c = new f,
						d = this.values,
						e = c.values;
					for(var g in d) d.hasOwnProperty(g) && (a = d[g], b = {}.toString.call(a), "[object Array]" === b ? e[g] = a.slice(0) : "[object Number]" === b ? e[g] = a : console.error("unexpected color value:", a));
					return c
				}
			}, f.prototype.spaces = {
				rgb: ["red", "green", "blue"],
				hsl: ["hue", "saturation", "lightness"],
				hsv: ["hue", "saturation", "value"],
				hwb: ["hue", "whiteness", "blackness"],
				cmyk: ["cyan", "magenta", "yellow", "black"]
			}, f.prototype.maxes = {
				rgb: [255, 255, 255],
				hsl: [360, 100, 100],
				hsv: [360, 100, 100],
				hwb: [360, 100, 100],
				cmyk: [100, 100, 100, 100]
			}, f.prototype.getValues = function(a) {
				for(var b = this.values, c = {}, d = 0; d < a.length; d++) c[a.charAt(d)] = b[a][d];
				return 1 !== b.alpha && (c.a = b.alpha), c
			}, f.prototype.setValues = function(a, b) {
				var c, e = this.values,
					f = this.spaces,
					g = this.maxes,
					h = 1;
				if(this.valid = !0, "alpha" === a) h = b;
				else if(b.length) e[a] = b.slice(0, a.length), h = b[a.length];
				else if(void 0 !== b[a.charAt(0)]) {
					for(c = 0; c < a.length; c++) e[a][c] = b[a.charAt(c)];
					h = b.a
				} else if(void 0 !== b[f[a][0]]) {
					var i = f[a];
					for(c = 0; c < a.length; c++) e[a][c] = b[i[c]];
					h = b.alpha
				}
				if(e.alpha = Math.max(0, Math.min(1, void 0 === h ? e.alpha : h)), "alpha" === a) return !1;
				var j;
				for(c = 0; c < a.length; c++) j = Math.max(0, Math.min(g[a][c], e[a][c])), e[a][c] = Math.round(j);
				for(var k in f) k !== a && (e[k] = d[a][k](e[a]));
				return !0
			}, f.prototype.setSpace = function(a, b) {
				var c = b[0];
				return void 0 === c ? this.getValues(a) : ("number" == typeof c && (c = Array.prototype.slice.call(b)), this.setValues(a, c), this)
			}, f.prototype.setChannel = function(a, b, c) {
				var d = this.values[a];
				return void 0 === c ? d[b] : c === d[b] ? this : (d[b] = c, this.setValues(a, d), this)
			}, "undefined" != typeof window && (window.Color = f), b.exports = f
		}, {
			2: 2,
			5: 5
		}],
		4: [function(a, c, d) {
			function e(a) {
				var b, c, d, e = a[0] / 255,
					f = a[1] / 255,
					g = a[2] / 255,
					h = Math.min(e, f, g),
					i = Math.max(e, f, g),
					j = i - h;
				return i == h ? b = 0 : e == i ? b = (f - g) / j : f == i ? b = 2 + (g - e) / j : g == i && (b = 4 + (e - f) / j), b = Math.min(60 * b, 360), b < 0 && (b += 360), d = (h + i) / 2, c = i == h ? 0 : d <= .5 ? j / (i + h) : j / (2 - i - h), [b, 100 * c, 100 * d]
			}

			function f(a) {
				var b, c, d, e = a[0],
					f = a[1],
					g = a[2],
					h = Math.min(e, f, g),
					i = Math.max(e, f, g),
					j = i - h;
				return c = 0 == i ? 0 : j / i * 1e3 / 10, i == h ? b = 0 : e == i ? b = (f - g) / j : f == i ? b = 2 + (g - e) / j : g == i && (b = 4 + (e - f) / j), b = Math.min(60 * b, 360), b < 0 && (b += 360), d = i / 255 * 1e3 / 10, [b, c, d]
			}

			function h(a) {
				var b = a[0],
					c = a[1],
					d = a[2],
					f = e(a)[0],
					g = 1 / 255 * Math.min(b, Math.min(c, d)),
					d = 1 - 1 / 255 * Math.max(b, Math.max(c, d));
				return [f, 100 * g, 100 * d]
			}

			function i(a) {
				var b, c, d, e, f = a[0] / 255,
					g = a[1] / 255,
					h = a[2] / 255;
				return e = Math.min(1 - f, 1 - g, 1 - h), b = (1 - f - e) / (1 - e) || 0, c = (1 - g - e) / (1 - e) || 0, d = (1 - h - e) / (1 - e) || 0, [100 * b, 100 * c, 100 * d, 100 * e]
			}

			function j(a) {
				return Z[JSON.stringify(a)]
			}

			function k(a) {
				var b = a[0] / 255,
					c = a[1] / 255,
					d = a[2] / 255;
				return b = b > .04045 ? Math.pow((b + .055) / 1.055, 2.4) : b / 12.92, c = c > .04045 ? Math.pow((c + .055) / 1.055, 2.4) : c / 12.92, d = d > .04045 ? Math.pow((d + .055) / 1.055, 2.4) : d / 12.92, [100 * (.4124 * b + .3576 * c + .1805 * d), 100 * (.2126 * b + .7152 * c + .0722 * d), 100 * (.0193 * b + .1192 * c + .9505 * d)]
			}

			function l(a) {
				var b, c, d, e = k(a),
					f = e[0],
					g = e[1],
					h = e[2];
				return f /= 95.047, g /= 100, h /= 108.883, f = f > .008856 ? Math.pow(f, 1 / 3) : 7.787 * f + 16 / 116, g = g > .008856 ? Math.pow(g, 1 / 3) : 7.787 * g + 16 / 116, h = h > .008856 ? Math.pow(h, 1 / 3) : 7.787 * h + 16 / 116, b = 116 * g - 16, c = 500 * (f - g), d = 200 * (g - h), [b, c, d]
			}

			function m(a) {
				return M(l(a))
			}

			function n(a) {
				var b, c, d, e, f, g = a[0] / 360,
					h = a[1] / 100,
					i = a[2] / 100;
				if(0 == h) return f = 255 * i, [f, f, f];
				c = i < .5 ? i * (1 + h) : i + h - i * h, b = 2 * i - c, e = [0, 0, 0];
				for(var j = 0; j < 3; j++) d = g + 1 / 3 * -(j - 1), d < 0 && d++, d > 1 && d--, f = 6 * d < 1 ? b + 6 * (c - b) * d : 2 * d < 1 ? c : 3 * d < 2 ? b + (c - b) * (2 / 3 - d) * 6 : b, e[j] = 255 * f;
				return e
			}

			function o(a) {
				var b, c, d = a[0],
					e = a[1] / 100,
					f = a[2] / 100;
				return 0 === f ? [0, 0, 0] : (f *= 2, e *= f <= 1 ? f : 2 - f, c = (f + e) / 2, b = 2 * e / (f + e), [d, 100 * b, 100 * c])
			}

			function p(a) {
				return h(n(a))
			}

			function q(a) {
				return i(n(a))
			}

			function s(a) {
				return j(n(a))
			}

			function t(a) {
				var b = a[0] / 60,
					c = a[1] / 100,
					d = a[2] / 100,
					e = Math.floor(b) % 6,
					f = b - Math.floor(b),
					g = 255 * d * (1 - c),
					h = 255 * d * (1 - c * f),
					i = 255 * d * (1 - c * (1 - f)),
					d = 255 * d;
				switch(e) {
					case 0:
						return [d, i, g];
					case 1:
						return [h, d, g];
					case 2:
						return [g, d, i];
					case 3:
						return [g, h, d];
					case 4:
						return [i, g, d];
					case 5:
						return [d, g, h]
				}
			}

			function u(a) {
				var b, c, d = a[0],
					e = a[1] / 100,
					f = a[2] / 100;
				return c = (2 - e) * f, b = e * f, b /= c <= 1 ? c : 2 - c, b = b || 0, c /= 2, [d, 100 * b, 100 * c]
			}

			function v(a) {
				return h(t(a))
			}

			function w(a) {
				return i(t(a))
			}

			function x(a) {
				return j(t(a))
			}

			function y(a) {
				var c, d, e, f, h = a[0] / 360,
					i = a[1] / 100,
					j = a[2] / 100,
					k = i + j;
				switch(k > 1 && (i /= k, j /= k), c = Math.floor(6 * h), d = 1 - j, e = 6 * h - c, 0 != (1 & c) && (e = 1 - e), f = i + e * (d - i), c) {
					default:
						case 6:
						case 0:
						r = d,
					g = f,
					b = i;
					break;
					case 1:
							r = f,
						g = d,
						b = i;
						break;
					case 2:
							r = i,
						g = d,
						b = f;
						break;
					case 3:
							r = i,
						g = f,
						b = d;
						break;
					case 4:
							r = f,
						g = i,
						b = d;
						break;
					case 5:
							r = d,
						g = i,
						b = f
				}
				return [255 * r, 255 * g, 255 * b]
			}

			function z(a) {
				return e(y(a))
			}

			function A(a) {
				return f(y(a))
			}

			function B(a) {
				return i(y(a))
			}

			function C(a) {
				return j(y(a))
			}

			function D(a) {
				var b, c, d, e = a[0] / 100,
					f = a[1] / 100,
					g = a[2] / 100,
					h = a[3] / 100;
				return b = 1 - Math.min(1, e * (1 - h) + h), c = 1 - Math.min(1, f * (1 - h) + h), d = 1 - Math.min(1, g * (1 - h) + h), [255 * b, 255 * c, 255 * d]
			}

			function E(a) {
				return e(D(a))
			}

			function F(a) {
				return f(D(a))
			}

			function G(a) {
				return h(D(a))
			}

			function H(a) {
				return j(D(a))
			}

			function I(a) {
				var b, c, d, e = a[0] / 100,
					f = a[1] / 100,
					g = a[2] / 100;
				return b = 3.2406 * e + -1.5372 * f + -.4986 * g, c = -.9689 * e + 1.8758 * f + .0415 * g, d = .0557 * e + -.204 * f + 1.057 * g, b = b > .0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - .055 : b *= 12.92, c = c > .0031308 ? 1.055 * Math.pow(c, 1 / 2.4) - .055 : c *= 12.92, d = d > .0031308 ? 1.055 * Math.pow(d, 1 / 2.4) - .055 : d *= 12.92, b = Math.min(Math.max(0, b), 1), c = Math.min(Math.max(0, c), 1), d = Math.min(Math.max(0, d), 1), [255 * b, 255 * c, 255 * d]
			}

			function J(a) {
				var b, c, d, e = a[0],
					f = a[1],
					g = a[2];
				return e /= 95.047, f /= 100, g /= 108.883, e = e > .008856 ? Math.pow(e, 1 / 3) : 7.787 * e + 16 / 116, f = f > .008856 ? Math.pow(f, 1 / 3) : 7.787 * f + 16 / 116, g = g > .008856 ? Math.pow(g, 1 / 3) : 7.787 * g + 16 / 116, b = 116 * f - 16, c = 500 * (e - f), d = 200 * (f - g), [b, c, d]
			}

			function K(a) {
				return M(J(a))
			}

			function L(a) {
				var b, c, d, e, f = a[0],
					g = a[1],
					h = a[2];
				return f <= 8 ? (c = 100 * f / 903.3, e = c / 100 * 7.787 + 16 / 116) : (c = 100 * Math.pow((f + 16) / 116, 3), e = Math.pow(c / 100, 1 / 3)), b = b / 95.047 <= .008856 ? b = 95.047 * (g / 500 + e - 16 / 116) / 7.787 : 95.047 * Math.pow(g / 500 + e, 3), d = d / 108.883 <= .008859 ? d = 108.883 * (e - h / 200 - 16 / 116) / 7.787 : 108.883 * Math.pow(e - h / 200, 3), [b, c, d]
			}

			function M(a) {
				var b, c, d, e = a[0],
					f = a[1],
					g = a[2];
				return b = Math.atan2(g, f), c = 360 * b / 2 / Math.PI, c < 0 && (c += 360), d = Math.sqrt(f * f + g * g), [e, d, c]
			}

			function N(a) {
				return I(L(a))
			}

			function O(a) {
				var b, c, d, e = a[0],
					f = a[1],
					g = a[2];
				return d = g / 360 * 2 * Math.PI, b = f * Math.cos(d), c = f * Math.sin(d), [e, b, c]
			}

			function P(a) {
				return L(O(a))
			}

			function Q(a) {
				return N(O(a))
			}

			function R(a) {
				return Y[a]
			}

			function S(a) {
				return e(R(a))
			}

			function T(a) {
				return f(R(a))
			}

			function U(a) {
				return h(R(a))
			}

			function V(a) {
				return i(R(a))
			}

			function W(a) {
				return l(R(a))
			}

			function X(a) {
				return k(R(a))
			}
			c.exports = {
				rgb2hsl: e,
				rgb2hsv: f,
				rgb2hwb: h,
				rgb2cmyk: i,
				rgb2keyword: j,
				rgb2xyz: k,
				rgb2lab: l,
				rgb2lch: m,
				hsl2rgb: n,
				hsl2hsv: o,
				hsl2hwb: p,
				hsl2cmyk: q,
				hsl2keyword: s,
				hsv2rgb: t,
				hsv2hsl: u,
				hsv2hwb: v,
				hsv2cmyk: w,
				hsv2keyword: x,
				hwb2rgb: y,
				hwb2hsl: z,
				hwb2hsv: A,
				hwb2cmyk: B,
				hwb2keyword: C,
				cmyk2rgb: D,
				cmyk2hsl: E,
				cmyk2hsv: F,
				cmyk2hwb: G,
				cmyk2keyword: H,
				keyword2rgb: R,
				keyword2hsl: S,
				keyword2hsv: T,
				keyword2hwb: U,
				keyword2cmyk: V,
				keyword2lab: W,
				keyword2xyz: X,
				xyz2rgb: I,
				xyz2lab: J,
				xyz2lch: K,
				lab2xyz: L,
				lab2rgb: N,
				lab2lch: M,
				lch2lab: O,
				lch2xyz: P,
				lch2rgb: Q
			};
			var Y = {
					aliceblue: [240, 248, 255],
					antiquewhite: [250, 235, 215],
					aqua: [0, 255, 255],
					aquamarine: [127, 255, 212],
					azure: [240, 255, 255],
					beige: [245, 245, 220],
					bisque: [255, 228, 196],
					black: [0, 0, 0],
					blanchedalmond: [255, 235, 205],
					blue: [0, 0, 255],
					blueviolet: [138, 43, 226],
					brown: [165, 42, 42],
					burlywood: [222, 184, 135],
					cadetblue: [95, 158, 160],
					chartreuse: [127, 255, 0],
					chocolate: [210, 105, 30],
					coral: [255, 127, 80],
					cornflowerblue: [100, 149, 237],
					cornsilk: [255, 248, 220],
					crimson: [220, 20, 60],
					cyan: [0, 255, 255],
					darkblue: [0, 0, 139],
					darkcyan: [0, 139, 139],
					darkgoldenrod: [184, 134, 11],
					darkgray: [169, 169, 169],
					darkgreen: [0, 100, 0],
					darkgrey: [169, 169, 169],
					darkkhaki: [189, 183, 107],
					darkmagenta: [139, 0, 139],
					darkolivegreen: [85, 107, 47],
					darkorange: [255, 140, 0],
					darkorchid: [153, 50, 204],
					darkred: [139, 0, 0],
					darksalmon: [233, 150, 122],
					darkseagreen: [143, 188, 143],
					darkslateblue: [72, 61, 139],
					darkslategray: [47, 79, 79],
					darkslategrey: [47, 79, 79],
					darkturquoise: [0, 206, 209],
					darkviolet: [148, 0, 211],
					deeppink: [255, 20, 147],
					deepskyblue: [0, 191, 255],
					dimgray: [105, 105, 105],
					dimgrey: [105, 105, 105],
					dodgerblue: [30, 144, 255],
					firebrick: [178, 34, 34],
					floralwhite: [255, 250, 240],
					forestgreen: [34, 139, 34],
					fuchsia: [255, 0, 255],
					gainsboro: [220, 220, 220],
					ghostwhite: [248, 248, 255],
					gold: [255, 215, 0],
					goldenrod: [218, 165, 32],
					gray: [128, 128, 128],
					green: [0, 128, 0],
					greenyellow: [173, 255, 47],
					grey: [128, 128, 128],
					honeydew: [240, 255, 240],
					hotpink: [255, 105, 180],
					indianred: [205, 92, 92],
					indigo: [75, 0, 130],
					ivory: [255, 255, 240],
					khaki: [240, 230, 140],
					lavender: [230, 230, 250],
					lavenderblush: [255, 240, 245],
					lawngreen: [124, 252, 0],
					lemonchiffon: [255, 250, 205],
					lightblue: [173, 216, 230],
					lightcoral: [240, 128, 128],
					lightcyan: [224, 255, 255],
					lightgoldenrodyellow: [250, 250, 210],
					lightgray: [211, 211, 211],
					lightgreen: [144, 238, 144],
					lightgrey: [211, 211, 211],
					lightpink: [255, 182, 193],
					lightsalmon: [255, 160, 122],
					lightseagreen: [32, 178, 170],
					lightskyblue: [135, 206, 250],
					lightslategray: [119, 136, 153],
					lightslategrey: [119, 136, 153],
					lightsteelblue: [176, 196, 222],
					lightyellow: [255, 255, 224],
					lime: [0, 255, 0],
					limegreen: [50, 205, 50],
					linen: [250, 240, 230],
					magenta: [255, 0, 255],
					maroon: [128, 0, 0],
					mediumaquamarine: [102, 205, 170],
					mediumblue: [0, 0, 205],
					mediumorchid: [186, 85, 211],
					mediumpurple: [147, 112, 219],
					mediumseagreen: [60, 179, 113],
					mediumslateblue: [123, 104, 238],
					mediumspringgreen: [0, 250, 154],
					mediumturquoise: [72, 209, 204],
					mediumvioletred: [199, 21, 133],
					midnightblue: [25, 25, 112],
					mintcream: [245, 255, 250],
					mistyrose: [255, 228, 225],
					moccasin: [255, 228, 181],
					navajowhite: [255, 222, 173],
					navy: [0, 0, 128],
					oldlace: [253, 245, 230],
					olive: [128, 128, 0],
					olivedrab: [107, 142, 35],
					orange: [255, 165, 0],
					orangered: [255, 69, 0],
					orchid: [218, 112, 214],
					palegoldenrod: [238, 232, 170],
					palegreen: [152, 251, 152],
					paleturquoise: [175, 238, 238],
					palevioletred: [219, 112, 147],
					papayawhip: [255, 239, 213],
					peachpuff: [255, 218, 185],
					peru: [205, 133, 63],
					pink: [255, 192, 203],
					plum: [221, 160, 221],
					powderblue: [176, 224, 230],
					purple: [128, 0, 128],
					rebeccapurple: [102, 51, 153],
					red: [255, 0, 0],
					rosybrown: [188, 143, 143],
					royalblue: [65, 105, 225],
					saddlebrown: [139, 69, 19],
					salmon: [250, 128, 114],
					sandybrown: [244, 164, 96],
					seagreen: [46, 139, 87],
					seashell: [255, 245, 238],
					sienna: [160, 82, 45],
					silver: [192, 192, 192],
					skyblue: [135, 206, 235],
					slateblue: [106, 90, 205],
					slategray: [112, 128, 144],
					slategrey: [112, 128, 144],
					snow: [255, 250, 250],
					springgreen: [0, 255, 127],
					steelblue: [70, 130, 180],
					tan: [210, 180, 140],
					teal: [0, 128, 128],
					thistle: [216, 191, 216],
					tomato: [255, 99, 71],
					turquoise: [64, 224, 208],
					violet: [238, 130, 238],
					wheat: [245, 222, 179],
					white: [255, 255, 255],
					whitesmoke: [245, 245, 245],
					yellow: [255, 255, 0],
					yellowgreen: [154, 205, 50]
				},
				Z = {};
			for(var $ in Y) Z[JSON.stringify(Y[$])] = $
		}, {}],
		5: [function(a, b, c) {
			var d = a(4),
				e = function() {
					return new j
				};
			for(var f in d) {
				e[f + "Raw"] = function(a) {
					return function(b) {
						return "number" == typeof b && (b = Array.prototype.slice.call(arguments)), d[a](b)
					}
				}(f);
				var g = /(\w+)2(\w+)/.exec(f),
					h = g[1],
					i = g[2];
				e[h] = e[h] || {}, e[h][i] = e[f] = function(a) {
					return function(b) {
						"number" == typeof b && (b = Array.prototype.slice.call(arguments));
						var c = d[a](b);
						if("string" == typeof c || void 0 === c) return c;
						for(var e = 0; e < c.length; e++) c[e] = Math.round(c[e]);
						return c
					}
				}(f)
			}
			var j = function() {
				this.convs = {}
			};
			j.prototype.routeSpace = function(a, b) {
				var c = b[0];
				return void 0 === c ? this.getValues(a) : ("number" == typeof c && (c = Array.prototype.slice.call(b)), this.setValues(a, c))
			}, j.prototype.setValues = function(a, b) {
				return this.space = a, this.convs = {}, this.convs[a] = b, this
			}, j.prototype.getValues = function(a) {
				var b = this.convs[a];
				if(!b) {
					var c = this.space,
						d = this.convs[c];
					b = e[c][a](d), this.convs[a] = b
				}
				return b
			}, ["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(a) {
				j.prototype[a] = function(b) {
					return this.routeSpace(a, arguments)
				}
			}), b.exports = e
		}, {
			4: 4
		}],
		6: [function(a, b, c) {
			"use strict";
			b.exports = {
				aliceblue: [240, 248, 255],
				antiquewhite: [250, 235, 215],
				aqua: [0, 255, 255],
				aquamarine: [127, 255, 212],
				azure: [240, 255, 255],
				beige: [245, 245, 220],
				bisque: [255, 228, 196],
				black: [0, 0, 0],
				blanchedalmond: [255, 235, 205],
				blue: [0, 0, 255],
				blueviolet: [138, 43, 226],
				brown: [165, 42, 42],
				burlywood: [222, 184, 135],
				cadetblue: [95, 158, 160],
				chartreuse: [127, 255, 0],
				chocolate: [210, 105, 30],
				coral: [255, 127, 80],
				cornflowerblue: [100, 149, 237],
				cornsilk: [255, 248, 220],
				crimson: [220, 20, 60],
				cyan: [0, 255, 255],
				darkblue: [0, 0, 139],
				darkcyan: [0, 139, 139],
				darkgoldenrod: [184, 134, 11],
				darkgray: [169, 169, 169],
				darkgreen: [0, 100, 0],
				darkgrey: [169, 169, 169],
				darkkhaki: [189, 183, 107],
				darkmagenta: [139, 0, 139],
				darkolivegreen: [85, 107, 47],
				darkorange: [255, 140, 0],
				darkorchid: [153, 50, 204],
				darkred: [139, 0, 0],
				darksalmon: [233, 150, 122],
				darkseagreen: [143, 188, 143],
				darkslateblue: [72, 61, 139],
				darkslategray: [47, 79, 79],
				darkslategrey: [47, 79, 79],
				darkturquoise: [0, 206, 209],
				darkviolet: [148, 0, 211],
				deeppink: [255, 20, 147],
				deepskyblue: [0, 191, 255],
				dimgray: [105, 105, 105],
				dimgrey: [105, 105, 105],
				dodgerblue: [30, 144, 255],
				firebrick: [178, 34, 34],
				floralwhite: [255, 250, 240],
				forestgreen: [34, 139, 34],
				fuchsia: [255, 0, 255],
				gainsboro: [220, 220, 220],
				ghostwhite: [248, 248, 255],
				gold: [255, 215, 0],
				goldenrod: [218, 165, 32],
				gray: [128, 128, 128],
				green: [0, 128, 0],
				greenyellow: [173, 255, 47],
				grey: [128, 128, 128],
				honeydew: [240, 255, 240],
				hotpink: [255, 105, 180],
				indianred: [205, 92, 92],
				indigo: [75, 0, 130],
				ivory: [255, 255, 240],
				khaki: [240, 230, 140],
				lavender: [230, 230, 250],
				lavenderblush: [255, 240, 245],
				lawngreen: [124, 252, 0],
				lemonchiffon: [255, 250, 205],
				lightblue: [173, 216, 230],
				lightcoral: [240, 128, 128],
				lightcyan: [224, 255, 255],
				lightgoldenrodyellow: [250, 250, 210],
				lightgray: [211, 211, 211],
				lightgreen: [144, 238, 144],
				lightgrey: [211, 211, 211],
				lightpink: [255, 182, 193],
				lightsalmon: [255, 160, 122],
				lightseagreen: [32, 178, 170],
				lightskyblue: [135, 206, 250],
				lightslategray: [119, 136, 153],
				lightslategrey: [119, 136, 153],
				lightsteelblue: [176, 196, 222],
				lightyellow: [255, 255, 224],
				lime: [0, 255, 0],
				limegreen: [50, 205, 50],
				linen: [250, 240, 230],
				magenta: [255, 0, 255],
				maroon: [128, 0, 0],
				mediumaquamarine: [102, 205, 170],
				mediumblue: [0, 0, 205],
				mediumorchid: [186, 85, 211],
				mediumpurple: [147, 112, 219],
				mediumseagreen: [60, 179, 113],
				mediumslateblue: [123, 104, 238],
				mediumspringgreen: [0, 250, 154],
				mediumturquoise: [72, 209, 204],
				mediumvioletred: [199, 21, 133],
				midnightblue: [25, 25, 112],
				mintcream: [245, 255, 250],
				mistyrose: [255, 228, 225],
				moccasin: [255, 228, 181],
				navajowhite: [255, 222, 173],
				navy: [0, 0, 128],
				oldlace: [253, 245, 230],
				olive: [128, 128, 0],
				olivedrab: [107, 142, 35],
				orange: [255, 165, 0],
				orangered: [255, 69, 0],
				orchid: [218, 112, 214],
				palegoldenrod: [238, 232, 170],
				palegreen: [152, 251, 152],
				paleturquoise: [175, 238, 238],
				palevioletred: [219, 112, 147],
				papayawhip: [255, 239, 213],
				peachpuff: [255, 218, 185],
				peru: [205, 133, 63],
				pink: [255, 192, 203],
				plum: [221, 160, 221],
				powderblue: [176, 224, 230],
				purple: [128, 0, 128],
				rebeccapurple: [102, 51, 153],
				red: [255, 0, 0],
				rosybrown: [188, 143, 143],
				royalblue: [65, 105, 225],
				saddlebrown: [139, 69, 19],
				salmon: [250, 128, 114],
				sandybrown: [244, 164, 96],
				seagreen: [46, 139, 87],
				seashell: [255, 245, 238],
				sienna: [160, 82, 45],
				silver: [192, 192, 192],
				skyblue: [135, 206, 235],
				slateblue: [106, 90, 205],
				slategray: [112, 128, 144],
				slategrey: [112, 128, 144],
				snow: [255, 250, 250],
				springgreen: [0, 255, 127],
				steelblue: [70, 130, 180],
				tan: [210, 180, 140],
				teal: [0, 128, 128],
				thistle: [216, 191, 216],
				tomato: [255, 99, 71],
				turquoise: [64, 224, 208],
				violet: [238, 130, 238],
				wheat: [245, 222, 179],
				white: [255, 255, 255],
				whitesmoke: [245, 245, 245],
				yellow: [255, 255, 0],
				yellowgreen: [154, 205, 50]
			}
		}, {}],
		7: [function(a, b, c) {
			var d = a(29)();
			d.helpers = a(45), a(27)(d), d.defaults = a(25), d.Element = a(26), d.elements = a(40), d.Interaction = a(28), d.platform = a(48), a(31)(d), a(22)(d), a(23)(d), a(24)(d), a(30)(d), a(33)(d), a(32)(d), a(35)(d), a(54)(d), a(52)(d), a(53)(d), a(55)(d), a(56)(d), a(57)(d), a(15)(d), a(16)(d), a(17)(d), a(18)(d), a(19)(d), a(20)(d), a(21)(d), a(8)(d), a(9)(d), a(10)(d), a(11)(d), a(12)(d), a(13)(d), a(14)(d);
			var e = [];
			e.push(a(49)(d), a(50)(d), a(51)(d)), d.plugins.register(e), d.platform.initialize(), b.exports = d, "undefined" != typeof window && (window.Chart = d), d.canvasHelpers = d.helpers.canvas
		}, {
			10: 10,
			11: 11,
			12: 12,
			13: 13,
			14: 14,
			15: 15,
			16: 16,
			17: 17,
			18: 18,
			19: 19,
			20: 20,
			21: 21,
			22: 22,
			23: 23,
			24: 24,
			25: 25,
			26: 26,
			27: 27,
			28: 28,
			29: 29,
			30: 30,
			31: 31,
			32: 32,
			33: 33,
			35: 35,
			40: 40,
			45: 45,
			48: 48,
			49: 49,
			50: 50,
			51: 51,
			52: 52,
			53: 53,
			54: 54,
			55: 55,
			56: 56,
			57: 57,
			8: 8,
			9: 9
		}],
		8: [function(a, b, c) {
			"use strict";
			b.exports = function(a) {
				a.Bar = function(b, c) {
					return c.type = "bar", new a(b, c)
				}
			}
		}, {}],
		9: [function(a, b, c) {
			"use strict";
			b.exports = function(a) {
				a.Bubble = function(b, c) {
					return c.type = "bubble", new a(b, c)
				}
			}
		}, {}],
		10: [function(a, b, c) {
			"use strict";
			b.exports = function(a) {
				a.Doughnut = function(b, c) {
					return c.type = "doughnut", new a(b, c)
				}
			}
		}, {}],
		11: [function(a, b, c) {
			"use strict";
			b.exports = function(a) {
				a.Line = function(b, c) {
					return c.type = "line", new a(b, c)
				}
			}
		}, {}],
		12: [function(a, b, c) {
			"use strict";
			b.exports = function(a) {
				a.PolarArea = function(b, c) {
					return c.type = "polarArea", new a(b, c)
				}
			}
		}, {}],
		13: [function(a, b, c) {
			"use strict";
			b.exports = function(a) {
				a.Radar = function(b, c) {
					return c.type = "radar", new a(b, c)
				}
			}
		}, {}],
		14: [function(a, b, c) {
			"use strict";
			b.exports = function(a) {
				a.Scatter = function(b, c) {
					return c.type = "scatter", new a(b, c)
				}
			}
		}, {}],
		15: [function(a, b, c) {
			"use strict";
			var d = a(25),
				e = a(40),
				f = a(45);
			d._set("bar", {
				hover: {
					mode: "label"
				},
				scales: {
					xAxes: [{
						type: "category",
						categoryPercentage: .8,
						barPercentage: .9,
						offset: !0,
						gridLines: {
							offsetGridLines: !0
						}
					}],
					yAxes: [{
						type: "linear"
					}]
				}
			}), d._set("horizontalBar", {
				hover: {
					mode: "index",
					axis: "y"
				},
				scales: {
					xAxes: [{
						type: "linear",
						position: "bottom"
					}],
					yAxes: [{
						position: "left",
						type: "category",
						categoryPercentage: .8,
						barPercentage: .9,
						offset: !0,
						gridLines: {
							offsetGridLines: !0
						}
					}]
				},
				elements: {
					rectangle: {
						borderSkipped: "left"
					}
				},
				tooltips: {
					callbacks: {
						title: function(a, b) {
							var c = "";
							return a.length > 0 && (a[0].yLabel ? c = a[0].yLabel : b.labels.length > 0 && a[0].index < b.labels.length && (c = b.labels[a[0].index])), c
						},
						label: function(a, b) {
							return(b.datasets[a.datasetIndex].label || "") + ": " + a.xLabel
						}
					},
					mode: "index",
					axis: "y"
				}
			}), b.exports = function(a) {
				a.controllers.bar = a.DatasetController.extend({
					dataElementType: e.Rectangle,
					initialize: function() {
						var b, c = this;
						a.DatasetController.prototype.initialize.apply(c, arguments), b = c.getMeta(), b.stack = c.getDataset().stack, b.bar = !0
					},
					update: function(a) {
						var b, c, d = this,
							e = d.getMeta().data;
						for(d._ruler = d.getRuler(), b = 0, c = e.length; b < c; ++b) d.updateElement(e[b], b, a)
					},
					updateElement: function(a, b, c) {
						var d = this,
							e = d.chart,
							g = d.getMeta(),
							h = d.getDataset(),
							i = a.custom || {},
							j = e.options.elements.rectangle;
						a._xScale = d.getScaleForId(g.xAxisID), a._yScale = d.getScaleForId(g.yAxisID), a._datasetIndex = d.index, a._index = b, a._model = {
							datasetLabel: h.label,
							label: e.data.labels[b],
							borderSkipped: i.borderSkipped ? i.borderSkipped : j.borderSkipped,
							backgroundColor: i.backgroundColor ? i.backgroundColor : f.valueAtIndexOrDefault(h.backgroundColor, b, j.backgroundColor),
							borderColor: i.borderColor ? i.borderColor : f.valueAtIndexOrDefault(h.borderColor, b, j.borderColor),
							borderWidth: i.borderWidth ? i.borderWidth : f.valueAtIndexOrDefault(h.borderWidth, b, j.borderWidth)
						}, d.updateElementGeometry(a, b, c), a.pivot()
					},
					updateElementGeometry: function(a, b, c) {
						var d = this,
							e = a._model,
							f = d.getValueScale(),
							g = f.getBasePixel(),
							h = f.isHorizontal(),
							i = d._ruler || d.getRuler(),
							j = d.calculateBarValuePixels(d.index, b),
							k = d.calculateBarIndexPixels(d.index, b, i);
						e.horizontal = h, e.base = c ? g : j.base, e.x = h ? c ? g : j.head : k.center, e.y = h ? k.center : c ? g : j.head, e.height = h ? k.size : void 0, e.width = h ? void 0 : k.size
					},
					getValueScaleId: function() {
						return this.getMeta().yAxisID
					},
					getIndexScaleId: function() {
						return this.getMeta().xAxisID
					},
					getValueScale: function() {
						return this.getScaleForId(this.getValueScaleId())
					},
					getIndexScale: function() {
						return this.getScaleForId(this.getIndexScaleId())
					},
					getStackCount: function(a) {
						var b, c, d = this,
							e = d.chart,
							f = d.getIndexScale(),
							g = f.options.stacked,
							h = void 0 === a ? e.data.datasets.length : a + 1,
							i = [];
						for(b = 0; b < h; ++b) c = e.getDatasetMeta(b), c.bar && e.isDatasetVisible(b) && (!1 === g || !0 === g && -1 === i.indexOf(c.stack) || void 0 === g && (void 0 === c.stack || -1 === i.indexOf(c.stack))) && i.push(c.stack);
						return i.length
					},
					getStackIndex: function(a) {
						return this.getStackCount(a) - 1
					},
					getRuler: function() {
						var a, b, c = this,
							d = c.getIndexScale(),
							e = c.getStackCount(),
							f = c.index,
							g = [],
							h = d.isHorizontal(),
							i = h ? d.left : d.top,
							j = i + (h ? d.width : d.height);
						for(a = 0, b = c.getMeta().data.length; a < b; ++a) g.push(d.getPixelForValue(null, a, f));
						return {
							pixels: g,
							start: i,
							end: j,
							stackCount: e,
							scale: d
						}
					},
					calculateBarValuePixels: function(a, b) {
						var c, d, e, f, g, h, i = this,
							j = i.chart,
							k = i.getMeta(),
							l = i.getValueScale(),
							m = j.data.datasets,
							n = l.getRightValue(m[a].data[b]),
							o = l.options.stacked,
							p = k.stack,
							q = 0;
						if(o || void 0 === o && void 0 !== p)
							for(c = 0; c < a; ++c) d = j.getDatasetMeta(c), d.bar && d.stack === p && d.controller.getValueScaleId() === l.id && j.isDatasetVisible(c) && (e = l.getRightValue(m[c].data[b]), (n < 0 && e < 0 || n >= 0 && e > 0) && (q += e));
						return f = l.getPixelForValue(q), g = l.getPixelForValue(q + n), h = (g - f) / 2, {
							size: h,
							base: f,
							head: g,
							center: g + h / 2
						}
					},
					calculateBarIndexPixels: function(a, b, c) {
						var d, e, g, h, i, j, k = this,
							l = c.scale.options,
							m = k.getStackIndex(a),
							n = c.pixels,
							o = n[b],
							p = n.length,
							q = c.start,
							r = c.end;
						return 1 === p ? (d = o > q ? o - q : r - o, e = o < r ? r - o : o - q) : (b > 0 && (d = (o - n[b - 1]) / 2, b === p - 1 && (e = d)), b < p - 1 && (e = (n[b + 1] - o) / 2, 0 === b && (d = e))), g = d * l.categoryPercentage, h = e * l.categoryPercentage, i = (g + h) / c.stackCount, j = i * l.barPercentage, j = Math.min(f.valueOrDefault(l.barThickness, j), f.valueOrDefault(l.maxBarThickness, 1 / 0)), o -= g, o += i * m, o += (i - j) / 2, {
							size: j,
							base: o,
							head: o + j,
							center: o + j / 2
						}
					},
					draw: function() {
						var a = this,
							b = a.chart,
							c = a.getValueScale(),
							d = a.getMeta().data,
							e = a.getDataset(),
							g = d.length,
							h = 0;
						for(f.canvas.clipArea(b.ctx, b.chartArea); h < g; ++h) isNaN(c.getRightValue(e.data[h])) || d[h].draw();
						f.canvas.unclipArea(b.ctx)
					},
					setHoverStyle: function(a) {
						var b = this.chart.data.datasets[a._datasetIndex],
							c = a._index,
							d = a.custom || {},
							e = a._model;
						e.backgroundColor = d.hoverBackgroundColor ? d.hoverBackgroundColor : f.valueAtIndexOrDefault(b.hoverBackgroundColor, c, f.getHoverColor(e.backgroundColor)), e.borderColor = d.hoverBorderColor ? d.hoverBorderColor : f.valueAtIndexOrDefault(b.hoverBorderColor, c, f.getHoverColor(e.borderColor)), e.borderWidth = d.hoverBorderWidth ? d.hoverBorderWidth : f.valueAtIndexOrDefault(b.hoverBorderWidth, c, e.borderWidth)
					},
					removeHoverStyle: function(a) {
						var b = this.chart.data.datasets[a._datasetIndex],
							c = a._index,
							d = a.custom || {},
							e = a._model,
							g = this.chart.options.elements.rectangle;
						e.backgroundColor = d.backgroundColor ? d.backgroundColor : f.valueAtIndexOrDefault(b.backgroundColor, c, g.backgroundColor), e.borderColor = d.borderColor ? d.borderColor : f.valueAtIndexOrDefault(b.borderColor, c, g.borderColor), e.borderWidth = d.borderWidth ? d.borderWidth : f.valueAtIndexOrDefault(b.borderWidth, c, g.borderWidth)
					}
				}), a.controllers.horizontalBar = a.controllers.bar.extend({
					getValueScaleId: function() {
						return this.getMeta().xAxisID
					},
					getIndexScaleId: function() {
						return this.getMeta().yAxisID
					}
				})
			}
		}, {
			25: 25,
			40: 40,
			45: 45
		}],
		16: [function(a, b, c) {
			"use strict";
			var d = a(25),
				e = a(40),
				f = a(45);
			d._set("bubble", {
				hover: {
					mode: "single"
				},
				scales: {
					xAxes: [{
						type: "linear",
						position: "bottom",
						id: "x-axis-0"
					}],
					yAxes: [{
						type: "linear",
						position: "left",
						id: "y-axis-0"
					}]
				},
				tooltips: {
					callbacks: {
						title: function() {
							return ""
						},
						label: function(a, b) {
							var c = b.datasets[a.datasetIndex].label || "",
								d = b.datasets[a.datasetIndex].data[a.index];
							return c + ": (" + a.xLabel + ", " + a.yLabel + ", " + d.r + ")"
						}
					}
				}
			}), b.exports = function(a) {
				a.controllers.bubble = a.DatasetController.extend({
					dataElementType: e.Point,
					update: function(a) {
						var b = this,
							c = b.getMeta(),
							d = c.data;
						f.each(d, function(c, d) {
							b.updateElement(c, d, a)
						})
					},
					updateElement: function(a, b, c) {
						var d = this,
							e = d.getMeta(),
							f = a.custom || {},
							g = d.getScaleForId(e.xAxisID),
							h = d.getScaleForId(e.yAxisID),
							i = d._resolveElementOptions(a, b),
							j = d.getDataset().data[b],
							k = d.index,
							l = c ? g.getPixelForDecimal(.5) : g.getPixelForValue("object" == typeof j ? j : NaN, b, k),
							m = c ? h.getBasePixel() : h.getPixelForValue(j, b, k);
						a._xScale = g, a._yScale = h, a._options = i, a._datasetIndex = k, a._index = b, a._model = {
							backgroundColor: i.backgroundColor,
							borderColor: i.borderColor,
							borderWidth: i.borderWidth,
							hitRadius: i.hitRadius,
							pointStyle: i.pointStyle,
							radius: c ? 0 : i.radius,
							skip: f.skip || isNaN(l) || isNaN(m),
							x: l,
							y: m
						}, a.pivot()
					},
					setHoverStyle: function(a) {
						var b = a._model,
							c = a._options;
						b.backgroundColor = f.valueOrDefault(c.hoverBackgroundColor, f.getHoverColor(c.backgroundColor)), b.borderColor = f.valueOrDefault(c.hoverBorderColor, f.getHoverColor(c.borderColor)), b.borderWidth = f.valueOrDefault(c.hoverBorderWidth, c.borderWidth), b.radius = c.radius + c.hoverRadius
					},
					removeHoverStyle: function(a) {
						var b = a._model,
							c = a._options;
						b.backgroundColor = c.backgroundColor, b.borderColor = c.borderColor, b.borderWidth = c.borderWidth, b.radius = c.radius
					},
					_resolveElementOptions: function(a, b) {
						var c, d, e, g = this,
							h = g.chart,
							i = h.data.datasets,
							j = i[g.index],
							k = a.custom || {},
							l = h.options.elements.point,
							m = f.options.resolve,
							n = j.data[b],
							o = {},
							p = {
								chart: h,
								dataIndex: b,
								dataset: j,
								datasetIndex: g.index
							},
							q = ["backgroundColor", "borderColor", "borderWidth", "hoverBackgroundColor", "hoverBorderColor", "hoverBorderWidth", "hoverRadius", "hitRadius", "pointStyle"];
						for(c = 0, d = q.length; c < d; ++c) e = q[c], o[e] = m([k[e], j[e], l[e]], p, b);
						return o.radius = m([k.radius, n ? n.r : void 0, j.radius, l.radius], p, b), o
					}
				})
			}
		}, {
			25: 25,
			40: 40,
			45: 45
		}],
		17: [function(a, b, c) {
			"use strict";
			var d = a(25),
				e = a(40),
				f = a(45);
			d._set("doughnut", {
				animation: {
					animateRotate: !0,
					animateScale: !1
				},
				hover: {
					mode: "single"
				},
				legendCallback: function(a) {
					var b = [];
					b.push('<ul class="' + a.id + '-legend">');
					var c = a.data,
						d = c.datasets,
						e = c.labels;
					if(d.length)
						for(var f = 0; f < d[0].data.length; ++f) b.push('<li><span style="background-color:' + d[0].backgroundColor[f] + '"></span>'), e[f] && b.push(e[f]), b.push("</li>");
					return b.push("</ul>"), b.join("")
				},
				legend: {
					labels: {
						generateLabels: function(a) {
							var b = a.data;
							return b.labels.length && b.datasets.length ? b.labels.map(function(c, d) {
								var e = a.getDatasetMeta(0),
									g = b.datasets[0],
									h = e.data[d],
									i = h && h.custom || {},
									j = f.valueAtIndexOrDefault,
									k = a.options.elements.arc;
								return {
									text: c,
									fillStyle: i.backgroundColor ? i.backgroundColor : j(g.backgroundColor, d, k.backgroundColor),
									strokeStyle: i.borderColor ? i.borderColor : j(g.borderColor, d, k.borderColor),
									lineWidth: i.borderWidth ? i.borderWidth : j(g.borderWidth, d, k.borderWidth),
									hidden: isNaN(g.data[d]) || e.data[d].hidden,
									index: d
								}
							}) : []
						}
					},
					onClick: function(a, b) {
						var c, d, e, f = b.index,
							g = this.chart;
						for(c = 0, d = (g.data.datasets || []).length; c < d; ++c) e = g.getDatasetMeta(c), e.data[f] && (e.data[f].hidden = !e.data[f].hidden);
						g.update()
					}
				},
				cutoutPercentage: 50,
				rotation: -.5 * Math.PI,
				circumference: 2 * Math.PI,
				tooltips: {
					callbacks: {
						title: function() {
							return ""
						},
						label: function(a, b) {
							var c = b.labels[a.index],
								d = ": " + b.datasets[a.datasetIndex].data[a.index];
							return f.isArray(c) ? (c = c.slice(), c[0] += d) : c += d, c
						}
					}
				}
			}), d._set("pie", f.clone(d.doughnut)), d._set("pie", {
				cutoutPercentage: 0
			}), b.exports = function(a) {
				a.controllers.doughnut = a.controllers.pie = a.DatasetController.extend({
					dataElementType: e.Arc,
					linkScales: f.noop,
					getRingIndex: function(a) {
						for(var b = 0, c = 0; c < a; ++c) this.chart.isDatasetVisible(c) && ++b;
						return b
					},
					update: function(a) {
						var b = this,
							c = b.chart,
							d = c.chartArea,
							e = c.options,
							g = e.elements.arc,
							h = d.right - d.left - g.borderWidth,
							i = d.bottom - d.top - g.borderWidth,
							j = Math.min(h, i),
							k = {
								x: 0,
								y: 0
							},
							l = b.getMeta(),
							m = e.cutoutPercentage,
							n = e.circumference;
						if(n < 2 * Math.PI) {
							var o = e.rotation % (2 * Math.PI);
							o += 2 * Math.PI * (o >= Math.PI ? -1 : o < -Math.PI ? 1 : 0);
							var p = o + n,
								q = {
									x: Math.cos(o),
									y: Math.sin(o)
								},
								r = {
									x: Math.cos(p),
									y: Math.sin(p)
								},
								s = o <= 0 && p >= 0 || o <= 2 * Math.PI && 2 * Math.PI <= p,
								t = o <= .5 * Math.PI && .5 * Math.PI <= p || o <= 2.5 * Math.PI && 2.5 * Math.PI <= p,
								u = o <= -Math.PI && -Math.PI <= p || o <= Math.PI && Math.PI <= p,
								v = o <= .5 * -Math.PI && .5 * -Math.PI <= p || o <= 1.5 * Math.PI && 1.5 * Math.PI <= p,
								w = m / 100,
								x = {
									x: u ? -1 : Math.min(q.x * (q.x < 0 ? 1 : w), r.x * (r.x < 0 ? 1 : w)),
									y: v ? -1 : Math.min(q.y * (q.y < 0 ? 1 : w), r.y * (r.y < 0 ? 1 : w))
								},
								y = {
									x: s ? 1 : Math.max(q.x * (q.x > 0 ? 1 : w), r.x * (r.x > 0 ? 1 : w)),
									y: t ? 1 : Math.max(q.y * (q.y > 0 ? 1 : w), r.y * (r.y > 0 ? 1 : w))
								},
								z = {
									width: .5 * (y.x - x.x),
									height: .5 * (y.y - x.y)
								};
							j = Math.min(h / z.width, i / z.height), k = {
								x: -.5 * (y.x + x.x),
								y: -.5 * (y.y + x.y)
							}
						}
						c.borderWidth = b.getMaxBorderWidth(l.data), c.outerRadius = Math.max((j - c.borderWidth) / 2, 0), c.innerRadius = Math.max(m ? c.outerRadius / 100 * m : 0, 0), c.radiusLength = (c.outerRadius - c.innerRadius) / c.getVisibleDatasetCount(), c.offsetX = k.x * c.outerRadius, c.offsetY = k.y * c.outerRadius, l.total = b.calculateTotal(), b.outerRadius = c.outerRadius - c.radiusLength * b.getRingIndex(b.index), b.innerRadius = Math.max(b.outerRadius - c.radiusLength, 0), f.each(l.data, function(c, d) {
							b.updateElement(c, d, a)
						})
					},
					updateElement: function(a, b, c) {
						var d = this,
							e = d.chart,
							g = e.chartArea,
							h = e.options,
							i = h.animation,
							j = (g.left + g.right) / 2,
							k = (g.top + g.bottom) / 2,
							l = h.rotation,
							m = h.rotation,
							n = d.getDataset(),
							o = c && i.animateRotate ? 0 : a.hidden ? 0 : d.calculateCircumference(n.data[b]) * (h.circumference / (2 * Math.PI)),
							p = c && i.animateScale ? 0 : d.innerRadius,
							q = c && i.animateScale ? 0 : d.outerRadius,
							r = f.valueAtIndexOrDefault;
						f.extend(a, {
							_datasetIndex: d.index,
							_index: b,
							_model: {
								x: j + e.offsetX,
								y: k + e.offsetY,
								startAngle: l,
								endAngle: m,
								circumference: o,
								outerRadius: q,
								innerRadius: p,
								label: r(n.label, b, e.data.labels[b])
							}
						});
						var s = a._model;
						this.removeHoverStyle(a), c && i.animateRotate || (s.startAngle = 0 === b ? h.rotation : d.getMeta().data[b - 1]._model.endAngle, s.endAngle = s.startAngle + s.circumference), a.pivot()
					},
					removeHoverStyle: function(b) {
						a.DatasetController.prototype.removeHoverStyle.call(this, b, this.chart.options.elements.arc)
					},
					calculateTotal: function() {
						var a, b = this.getDataset(),
							c = this.getMeta(),
							d = 0;
						return f.each(c.data, function(c, e) {
							a = b.data[e], isNaN(a) || c.hidden || (d += Math.abs(a))
						}), d
					},
					calculateCircumference: function(a) {
						var b = this.getMeta().total;
						return b > 0 && !isNaN(a) ? 2 * Math.PI * (a / b) : 0
					},
					getMaxBorderWidth: function(a) {
						for(var b, c, d = 0, e = this.index, f = a.length, g = 0; g < f; g++) b = a[g]._model ? a[g]._model.borderWidth : 0, c = a[g]._chart ? a[g]._chart.config.data.datasets[e].hoverBorderWidth : 0, d = b > d ? b : d, d = c > d ? c : d;
						return d
					}
				})
			}
		}, {
			25: 25,
			40: 40,
			45: 45
		}],
		18: [function(a, b, c) {
			"use strict";
			var d = a(25),
				e = a(40),
				f = a(45);
			d._set("line", {
				showLines: !0,
				spanGaps: !1,
				hover: {
					mode: "label"
				},
				scales: {
					xAxes: [{
						type: "category",
						id: "x-axis-0"
					}],
					yAxes: [{
						type: "linear",
						id: "y-axis-0"
					}]
				}
			}), b.exports = function(a) {
				function b(a, b) {
					return f.valueOrDefault(a.showLine, b.showLines)
				}
				a.controllers.line = a.DatasetController.extend({
					datasetElementType: e.Line,
					dataElementType: e.Point,
					update: function(a) {
						var c, d, e, g = this,
							h = g.getMeta(),
							i = h.dataset,
							j = h.data || [],
							k = g.chart.options,
							l = k.elements.line,
							m = g.getScaleForId(h.yAxisID),
							n = g.getDataset(),
							o = b(n, k);
						for(o && (e = i.custom || {}, void 0 !== n.tension && void 0 === n.lineTension && (n.lineTension = n.tension), i._scale = m, i._datasetIndex = g.index, i._children = j, i._model = {
								spanGaps: n.spanGaps ? n.spanGaps : k.spanGaps,
								tension: e.tension ? e.tension : f.valueOrDefault(n.lineTension, l.tension),
								backgroundColor: e.backgroundColor ? e.backgroundColor : n.backgroundColor || l.backgroundColor,
								borderWidth: e.borderWidth ? e.borderWidth : n.borderWidth || l.borderWidth,
								borderColor: e.borderColor ? e.borderColor : n.borderColor || l.borderColor,
								borderCapStyle: e.borderCapStyle ? e.borderCapStyle : n.borderCapStyle || l.borderCapStyle,
								borderDash: e.borderDash ? e.borderDash : n.borderDash || l.borderDash,
								borderDashOffset: e.borderDashOffset ? e.borderDashOffset : n.borderDashOffset || l.borderDashOffset,
								borderJoinStyle: e.borderJoinStyle ? e.borderJoinStyle : n.borderJoinStyle || l.borderJoinStyle,
								fill: e.fill ? e.fill : void 0 !== n.fill ? n.fill : l.fill,
								steppedLine: e.steppedLine ? e.steppedLine : f.valueOrDefault(n.steppedLine, l.stepped),
								cubicInterpolationMode: e.cubicInterpolationMode ? e.cubicInterpolationMode : f.valueOrDefault(n.cubicInterpolationMode, l.cubicInterpolationMode)
							}, i.pivot()), c = 0, d = j.length; c < d; ++c) g.updateElement(j[c], c, a);
						for(o && 0 !== i._model.tension && g.updateBezierControlPoints(), c = 0, d = j.length; c < d; ++c) j[c].pivot()
					},
					getPointBackgroundColor: function(a, b) {
						var c = this.chart.options.elements.point.backgroundColor,
							d = this.getDataset(),
							e = a.custom || {};
						return e.backgroundColor ? c = e.backgroundColor : d.pointBackgroundColor ? c = f.valueAtIndexOrDefault(d.pointBackgroundColor, b, c) : d.backgroundColor && (c = d.backgroundColor), c
					},
					getPointBorderColor: function(a, b) {
						var c = this.chart.options.elements.point.borderColor,
							d = this.getDataset(),
							e = a.custom || {};
						return e.borderColor ? c = e.borderColor : d.pointBorderColor ? c = f.valueAtIndexOrDefault(d.pointBorderColor, b, c) : d.borderColor && (c = d.borderColor), c
					},
					getPointBorderWidth: function(a, b) {
						var c = this.chart.options.elements.point.borderWidth,
							d = this.getDataset(),
							e = a.custom || {};
						return isNaN(e.borderWidth) ? !isNaN(d.pointBorderWidth) || f.isArray(d.pointBorderWidth) ? c = f.valueAtIndexOrDefault(d.pointBorderWidth, b, c) : isNaN(d.borderWidth) || (c = d.borderWidth) : c = e.borderWidth, c
					},
					updateElement: function(a, b, c) {
						var d, e, g = this,
							h = g.getMeta(),
							i = a.custom || {},
							j = g.getDataset(),
							k = g.index,
							l = j.data[b],
							m = g.getScaleForId(h.yAxisID),
							n = g.getScaleForId(h.xAxisID),
							o = g.chart.options.elements.point;
						void 0 !== j.radius && void 0 === j.pointRadius && (j.pointRadius = j.radius), void 0 !== j.hitRadius && void 0 === j.pointHitRadius && (j.pointHitRadius = j.hitRadius), d = n.getPixelForValue("object" == typeof l ? l : NaN, b, k), e = c ? m.getBasePixel() : g.calculatePointY(l, b, k), a._xScale = n, a._yScale = m, a._datasetIndex = k, a._index = b, a._model = {
							x: d,
							y: e,
							skip: i.skip || isNaN(d) || isNaN(e),
							radius: i.radius || f.valueAtIndexOrDefault(j.pointRadius, b, o.radius),
							pointStyle: i.pointStyle || f.valueAtIndexOrDefault(j.pointStyle, b, o.pointStyle),
							backgroundColor: g.getPointBackgroundColor(a, b),
							borderColor: g.getPointBorderColor(a, b),
							borderWidth: g.getPointBorderWidth(a, b),
							tension: h.dataset._model ? h.dataset._model.tension : 0,
							steppedLine: !!h.dataset._model && h.dataset._model.steppedLine,
							hitRadius: i.hitRadius || f.valueAtIndexOrDefault(j.pointHitRadius, b, o.hitRadius)
						}
					},
					calculatePointY: function(a, b, c) {
						var d, e, f, g = this,
							h = g.chart,
							i = g.getMeta(),
							j = g.getScaleForId(i.yAxisID),
							k = 0,
							l = 0;
						if(j.options.stacked) {
							for(d = 0; d < c; d++)
								if(e = h.data.datasets[d], f = h.getDatasetMeta(d), "line" === f.type && f.yAxisID === j.id && h.isDatasetVisible(d)) {
									var m = Number(j.getRightValue(e.data[b]));
									m < 0 ? l += m || 0 : k += m || 0
								}
							var n = Number(j.getRightValue(a));
							return n < 0 ? j.getPixelForValue(l + n) : j.getPixelForValue(k + n)
						}
						return j.getPixelForValue(a)
					},
					updateBezierControlPoints: function() {
						function a(a, b, c) {
							return Math.max(Math.min(a, c), b)
						}
						var b, c, d, e, g, h = this,
							i = h.getMeta(),
							j = h.chart.chartArea,
							k = i.data || [];
						if(i.dataset._model.spanGaps && (k = k.filter(function(a) {
								return !a._model.skip
							})), "monotone" === i.dataset._model.cubicInterpolationMode) f.splineCurveMonotone(k);
						else
							for(b = 0, c = k.length; b < c; ++b) d = k[b], e = d._model, g = f.splineCurve(f.previousItem(k, b)._model, e, f.nextItem(k, b)._model, i.dataset._model.tension), e.controlPointPreviousX = g.previous.x, e.controlPointPreviousY = g.previous.y, e.controlPointNextX = g.next.x, e.controlPointNextY = g.next.y;
						if(h.chart.options.elements.line.capBezierPoints)
							for(b = 0, c = k.length; b < c; ++b) e = k[b]._model, e.controlPointPreviousX = a(e.controlPointPreviousX, j.left, j.right), e.controlPointPreviousY = a(e.controlPointPreviousY, j.top, j.bottom), e.controlPointNextX = a(e.controlPointNextX, j.left, j.right), e.controlPointNextY = a(e.controlPointNextY, j.top, j.bottom)
					},
					draw: function() {
						var a = this,
							c = a.chart,
							d = a.getMeta(),
							e = d.data || [],
							g = c.chartArea,
							h = e.length,
							i = 0;
						for(f.canvas.clipArea(c.ctx, g), b(a.getDataset(), c.options) && d.dataset.draw(), f.canvas.unclipArea(c.ctx); i < h; ++i) e[i].draw(g)
					},
					setHoverStyle: function(a) {
						var b = this.chart.data.datasets[a._datasetIndex],
							c = a._index,
							d = a.custom || {},
							e = a._model;
						e.radius = d.hoverRadius || f.valueAtIndexOrDefault(b.pointHoverRadius, c, this.chart.options.elements.point.hoverRadius), e.backgroundColor = d.hoverBackgroundColor || f.valueAtIndexOrDefault(b.pointHoverBackgroundColor, c, f.getHoverColor(e.backgroundColor)), e.borderColor = d.hoverBorderColor || f.valueAtIndexOrDefault(b.pointHoverBorderColor, c, f.getHoverColor(e.borderColor)), e.borderWidth = d.hoverBorderWidth || f.valueAtIndexOrDefault(b.pointHoverBorderWidth, c, e.borderWidth)
					},
					removeHoverStyle: function(a) {
						var b = this,
							c = b.chart.data.datasets[a._datasetIndex],
							d = a._index,
							e = a.custom || {},
							g = a._model;
						void 0 !== c.radius && void 0 === c.pointRadius && (c.pointRadius = c.radius), g.radius = e.radius || f.valueAtIndexOrDefault(c.pointRadius, d, b.chart.options.elements.point.radius), g.backgroundColor = b.getPointBackgroundColor(a, d), g.borderColor = b.getPointBorderColor(a, d), g.borderWidth = b.getPointBorderWidth(a, d)
					}
				})
			}
		}, {
			25: 25,
			40: 40,
			45: 45
		}],
		19: [function(a, b, c) {
			"use strict";
			var d = a(25),
				e = a(40),
				f = a(45);
			d._set("polarArea", {
				scale: {
					type: "radialLinear",
					angleLines: {
						display: !1
					},
					gridLines: {
						circular: !0
					},
					pointLabels: {
						display: !1
					},
					ticks: {
						beginAtZero: !0
					}
				},
				animation: {
					animateRotate: !0,
					animateScale: !0
				},
				startAngle: -.5 * Math.PI,
				legendCallback: function(a) {
					var b = [];
					b.push('<ul class="' + a.id + '-legend">');
					var c = a.data,
						d = c.datasets,
						e = c.labels;
					if(d.length)
						for(var f = 0; f < d[0].data.length; ++f) b.push('<li><span style="background-color:' + d[0].backgroundColor[f] + '"></span>'), e[f] && b.push(e[f]), b.push("</li>");
					return b.push("</ul>"), b.join("")
				},
				legend: {
					labels: {
						generateLabels: function(a) {
							var b = a.data;
							return b.labels.length && b.datasets.length ? b.labels.map(function(c, d) {
								var e = a.getDatasetMeta(0),
									g = b.datasets[0],
									h = e.data[d],
									i = h.custom || {},
									j = f.valueAtIndexOrDefault,
									k = a.options.elements.arc;
								return {
									text: c,
									fillStyle: i.backgroundColor ? i.backgroundColor : j(g.backgroundColor, d, k.backgroundColor),
									strokeStyle: i.borderColor ? i.borderColor : j(g.borderColor, d, k.borderColor),
									lineWidth: i.borderWidth ? i.borderWidth : j(g.borderWidth, d, k.borderWidth),
									hidden: isNaN(g.data[d]) || e.data[d].hidden,
									index: d
								}
							}) : []
						}
					},
					onClick: function(a, b) {
						var c, d, e, f = b.index,
							g = this.chart;
						for(c = 0, d = (g.data.datasets || []).length; c < d; ++c) e = g.getDatasetMeta(c), e.data[f].hidden = !e.data[f].hidden;
						g.update()
					}
				},
				tooltips: {
					callbacks: {
						title: function() {
							return ""
						},
						label: function(a, b) {
							return b.labels[a.index] + ": " + a.yLabel
						}
					}
				}
			}), b.exports = function(a) {
				a.controllers.polarArea = a.DatasetController.extend({
					dataElementType: e.Arc,
					linkScales: f.noop,
					update: function(a) {
						var b = this,
							c = b.chart,
							d = c.chartArea,
							e = b.getMeta(),
							g = c.options,
							h = g.elements.arc,
							i = Math.min(d.right - d.left, d.bottom - d.top);
						c.outerRadius = Math.max((i - h.borderWidth / 2) / 2, 0), c.innerRadius = Math.max(g.cutoutPercentage ? c.outerRadius / 100 * g.cutoutPercentage : 1, 0), c.radiusLength = (c.outerRadius - c.innerRadius) / c.getVisibleDatasetCount(), b.outerRadius = c.outerRadius - c.radiusLength * b.index, b.innerRadius = b.outerRadius - c.radiusLength, e.count = b.countVisibleElements(), f.each(e.data, function(c, d) {
							b.updateElement(c, d, a)
						})
					},
					updateElement: function(a, b, c) {
						for(var d = this, e = d.chart, g = d.getDataset(), h = e.options, i = h.animation, j = e.scale, k = e.data.labels, l = d.calculateCircumference(g.data[b]), m = j.xCenter, n = j.yCenter, o = 0, p = d.getMeta(), q = 0; q < b; ++q) isNaN(g.data[q]) || p.data[q].hidden || ++o;
						var r = h.startAngle,
							s = a.hidden ? 0 : j.getDistanceFromCenterForValue(g.data[b]),
							t = r + l * o,
							u = t + (a.hidden ? 0 : l),
							v = i.animateScale ? 0 : j.getDistanceFromCenterForValue(g.data[b]);
						f.extend(a, {
							_datasetIndex: d.index,
							_index: b,
							_scale: j,
							_model: {
								x: m,
								y: n,
								innerRadius: 0,
								outerRadius: c ? v : s,
								startAngle: c && i.animateRotate ? r : t,
								endAngle: c && i.animateRotate ? r : u,
								label: f.valueAtIndexOrDefault(k, b, k[b])
							}
						}), d.removeHoverStyle(a), a.pivot()
					},
					removeHoverStyle: function(b) {
						a.DatasetController.prototype.removeHoverStyle.call(this, b, this.chart.options.elements.arc)
					},
					countVisibleElements: function() {
						var a = this.getDataset(),
							b = this.getMeta(),
							c = 0;
						return f.each(b.data, function(b, d) {
							isNaN(a.data[d]) || b.hidden || c++
						}), c
					},
					calculateCircumference: function(a) {
						var b = this.getMeta().count;
						return b > 0 && !isNaN(a) ? 2 * Math.PI / b : 0
					}
				})
			}
		}, {
			25: 25,
			40: 40,
			45: 45
		}],
		20: [function(a, b, c) {
			"use strict";
			var d = a(25),
				e = a(40),
				f = a(45);
			d._set("radar", {
				scale: {
					type: "radialLinear"
				},
				elements: {
					line: {
						tension: 0
					}
				}
			}), b.exports = function(a) {
				a.controllers.radar = a.DatasetController.extend({
					datasetElementType: e.Line,
					dataElementType: e.Point,
					linkScales: f.noop,
					update: function(a) {
						var b = this,
							c = b.getMeta(),
							d = c.dataset,
							e = c.data,
							g = d.custom || {},
							h = b.getDataset(),
							i = b.chart.options.elements.line,
							j = b.chart.scale;
						void 0 !== h.tension && void 0 === h.lineTension && (h.lineTension = h.tension), f.extend(c.dataset, {
							_datasetIndex: b.index,
							_scale: j,
							_children: e,
							_loop: !0,
							_model: {
								tension: g.tension ? g.tension : f.valueOrDefault(h.lineTension, i.tension),
								backgroundColor: g.backgroundColor ? g.backgroundColor : h.backgroundColor || i.backgroundColor,
								borderWidth: g.borderWidth ? g.borderWidth : h.borderWidth || i.borderWidth,
								borderColor: g.borderColor ? g.borderColor : h.borderColor || i.borderColor,
								fill: g.fill ? g.fill : void 0 !== h.fill ? h.fill : i.fill,
								borderCapStyle: g.borderCapStyle ? g.borderCapStyle : h.borderCapStyle || i.borderCapStyle,
								borderDash: g.borderDash ? g.borderDash : h.borderDash || i.borderDash,
								borderDashOffset: g.borderDashOffset ? g.borderDashOffset : h.borderDashOffset || i.borderDashOffset,
								borderJoinStyle: g.borderJoinStyle ? g.borderJoinStyle : h.borderJoinStyle || i.borderJoinStyle
							}
						}), c.dataset.pivot(), f.each(e, function(c, d) {
							b.updateElement(c, d, a)
						}, b), b.updateBezierControlPoints()
					},
					updateElement: function(a, b, c) {
						var d = this,
							e = a.custom || {},
							g = d.getDataset(),
							h = d.chart.scale,
							i = d.chart.options.elements.point,
							j = h.getPointPositionForValue(b, g.data[b]);
						void 0 !== g.radius && void 0 === g.pointRadius && (g.pointRadius = g.radius), void 0 !== g.hitRadius && void 0 === g.pointHitRadius && (g.pointHitRadius = g.hitRadius), f.extend(a, {
							_datasetIndex: d.index,
							_index: b,
							_scale: h,
							_model: {
								x: c ? h.xCenter : j.x,
								y: c ? h.yCenter : j.y,
								tension: e.tension ? e.tension : f.valueOrDefault(g.lineTension, d.chart.options.elements.line.tension),
								radius: e.radius ? e.radius : f.valueAtIndexOrDefault(g.pointRadius, b, i.radius),
								backgroundColor: e.backgroundColor ? e.backgroundColor : f.valueAtIndexOrDefault(g.pointBackgroundColor, b, i.backgroundColor),
								borderColor: e.borderColor ? e.borderColor : f.valueAtIndexOrDefault(g.pointBorderColor, b, i.borderColor),
								borderWidth: e.borderWidth ? e.borderWidth : f.valueAtIndexOrDefault(g.pointBorderWidth, b, i.borderWidth),
								pointStyle: e.pointStyle ? e.pointStyle : f.valueAtIndexOrDefault(g.pointStyle, b, i.pointStyle),
								hitRadius: e.hitRadius ? e.hitRadius : f.valueAtIndexOrDefault(g.pointHitRadius, b, i.hitRadius)
							}
						}), a._model.skip = e.skip ? e.skip : isNaN(a._model.x) || isNaN(a._model.y)
					},
					updateBezierControlPoints: function() {
						var a = this.chart.chartArea,
							b = this.getMeta();
						f.each(b.data, function(c, d) {
							var e = c._model,
								g = f.splineCurve(f.previousItem(b.data, d, !0)._model, e, f.nextItem(b.data, d, !0)._model, e.tension);
							e.controlPointPreviousX = Math.max(Math.min(g.previous.x, a.right), a.left), e.controlPointPreviousY = Math.max(Math.min(g.previous.y, a.bottom), a.top), e.controlPointNextX = Math.max(Math.min(g.next.x, a.right), a.left), e.controlPointNextY = Math.max(Math.min(g.next.y, a.bottom), a.top), c.pivot()
						})
					},
					setHoverStyle: function(a) {
						var b = this.chart.data.datasets[a._datasetIndex],
							c = a.custom || {},
							d = a._index,
							e = a._model;
						e.radius = c.hoverRadius ? c.hoverRadius : f.valueAtIndexOrDefault(b.pointHoverRadius, d, this.chart.options.elements.point.hoverRadius), e.backgroundColor = c.hoverBackgroundColor ? c.hoverBackgroundColor : f.valueAtIndexOrDefault(b.pointHoverBackgroundColor, d, f.getHoverColor(e.backgroundColor)), e.borderColor = c.hoverBorderColor ? c.hoverBorderColor : f.valueAtIndexOrDefault(b.pointHoverBorderColor, d, f.getHoverColor(e.borderColor)), e.borderWidth = c.hoverBorderWidth ? c.hoverBorderWidth : f.valueAtIndexOrDefault(b.pointHoverBorderWidth, d, e.borderWidth)
					},
					removeHoverStyle: function(a) {
						var b = this.chart.data.datasets[a._datasetIndex],
							c = a.custom || {},
							d = a._index,
							e = a._model,
							g = this.chart.options.elements.point;
						e.radius = c.radius ? c.radius : f.valueAtIndexOrDefault(b.pointRadius, d, g.radius), e.backgroundColor = c.backgroundColor ? c.backgroundColor : f.valueAtIndexOrDefault(b.pointBackgroundColor, d, g.backgroundColor), e.borderColor = c.borderColor ? c.borderColor : f.valueAtIndexOrDefault(b.pointBorderColor, d, g.borderColor), e.borderWidth = c.borderWidth ? c.borderWidth : f.valueAtIndexOrDefault(b.pointBorderWidth, d, g.borderWidth)
					}
				})
			}
		}, {
			25: 25,
			40: 40,
			45: 45
		}],
		21: [function(a, b, c) {
			"use strict";
			a(25)._set("scatter", {
				hover: {
					mode: "single"
				},
				scales: {
					xAxes: [{
						id: "x-axis-1",
						type: "linear",
						position: "bottom"
					}],
					yAxes: [{
						id: "y-axis-1",
						type: "linear",
						position: "left"
					}]
				},
				showLines: !1,
				tooltips: {
					callbacks: {
						title: function() {
							return ""
						},
						label: function(a) {
							return "(" + a.xLabel + ", " + a.yLabel + ")"
						}
					}
				}
			}), b.exports = function(a) {
				a.controllers.scatter = a.controllers.line
			}
		}, {
			25: 25
		}],
		22: [function(a, b, c) {
			"use strict";
			var d = a(25),
				e = a(26),
				f = a(45);
			d._set("global", {
				animation: {
					duration: 1e3,
					easing: "easeOutQuart",
					onProgress: f.noop,
					onComplete: f.noop
				}
			}), b.exports = function(a) {
				a.Animation = e.extend({
					chart: null,
					currentStep: 0,
					numSteps: 60,
					easing: "",
					render: null,
					onAnimationProgress: null,
					onAnimationComplete: null
				}), a.animationService = {
					frameDuration: 17,
					animations: [],
					dropFrames: 0,
					request: null,
					addAnimation: function(a, b, c, d) {
						var e, f, g = this.animations;
						for(b.chart = a, d || (a.animating = !0), e = 0, f = g.length; e < f; ++e)
							if(g[e].chart === a) return void(g[e] = b);
						g.push(b), 1 === g.length && this.requestAnimationFrame()
					},
					cancelAnimation: function(a) {
						var b = f.findIndex(this.animations, function(b) {
							return b.chart === a
						}); - 1 !== b && (this.animations.splice(b, 1), a.animating = !1)
					},
					requestAnimationFrame: function() {
						var a = this;
						null === a.request && (a.request = f.requestAnimFrame.call(window, function() {
							a.request = null, a.startDigest()
						}))
					},
					startDigest: function() {
						var a = this,
							b = Date.now(),
							c = 0;
						a.dropFrames > 1 && (c = Math.floor(a.dropFrames), a.dropFrames = a.dropFrames % 1), a.advance(1 + c);
						var d = Date.now();
						a.dropFrames += (d - b) / a.frameDuration, a.animations.length > 0 && a.requestAnimationFrame()
					},
					advance: function(a) {
						for(var b, c, d = this.animations, e = 0; e < d.length;) b = d[e], c = b.chart, b.currentStep = (b.currentStep || 0) + a, b.currentStep = Math.min(b.currentStep, b.numSteps), f.callback(b.render, [c, b], c), f.callback(b.onAnimationProgress, [b], c), b.currentStep >= b.numSteps ? (f.callback(b.onAnimationComplete, [b], c), c.animating = !1, d.splice(e, 1)) : ++e
					}
				}, Object.defineProperty(a.Animation.prototype, "animationObject", {
					get: function() {
						return this
					}
				}), Object.defineProperty(a.Animation.prototype, "chartInstance", {
					get: function() {
						return this.chart
					},
					set: function(a) {
						this.chart = a
					}
				})
			}
		}, {
			25: 25,
			26: 26,
			45: 45
		}],
		23: [function(a, b, c) {
			"use strict";
			var d = a(25),
				e = a(45),
				f = a(28),
				g = a(48);
			b.exports = function(a) {
				function b(a) {
					a = a || {};
					var b = a.data = a.data || {};
					return b.datasets = b.datasets || [], b.labels = b.labels || [], a.options = e.configMerge(d.global, d[a.type], a.options || {}), a
				}

				function c(a) {
					var b = a.options;
					b.scale ? a.scale.options = b.scale : b.scales && b.scales.xAxes.concat(b.scales.yAxes).forEach(function(b) {
						a.scales[b.id].options = b
					}), a.tooltip._options = b.tooltips
				}

				function h(a) {
					return "top" === a || "bottom" === a
				}
				var i = a.plugins;
				a.types = {}, a.instances = {}, a.controllers = {}, e.extend(a.prototype, {
					construct: function(c, d) {
						var f = this;
						d = b(d);
						var h = g.acquireContext(c, d),
							i = h && h.canvas,
							j = i && i.height,
							k = i && i.width;
						if(f.id = e.uid(), f.ctx = h, f.canvas = i, f.config = d, f.width = k, f.height = j, f.aspectRatio = j ? k / j : null, f.options = d.options, f._bufferedRender = !1, f.chart = f, f.controller = f, a.instances[f.id] = f, Object.defineProperty(f, "data", {
								get: function() {
									return f.config.data
								},
								set: function(a) {
									f.config.data = a
								}
							}), !h || !i) return void console.error("Failed to create chart: can't acquire context from the given item");
						f.initialize(), f.update()
					},
					initialize: function() {
						var a = this;
						return i.notify(a, "beforeInit"), e.retinaScale(a, a.options.devicePixelRatio), a.bindEvents(), a.options.responsive && a.resize(!0), a.ensureScalesHaveIDs(), a.buildScales(), a.initToolTip(), i.notify(a, "afterInit"), a
					},
					clear: function() {
						return e.canvas.clear(this), this
					},
					stop: function() {
						return a.animationService.cancelAnimation(this), this
					},
					resize: function(a) {
						var b = this,
							c = b.options,
							d = b.canvas,
							f = c.maintainAspectRatio && b.aspectRatio || null,
							g = Math.max(0, Math.floor(e.getMaximumWidth(d))),
							h = Math.max(0, Math.floor(f ? g / f : e.getMaximumHeight(d)));
						if((b.width !== g || b.height !== h) && (d.width = b.width = g, d.height = b.height = h, d.style.width = g + "px", d.style.height = h + "px", e.retinaScale(b, c.devicePixelRatio), !a)) {
							var j = {
								width: g,
								height: h
							};
							i.notify(b, "resize", [j]), b.options.onResize && b.options.onResize(b, j), b.stop(), b.update(b.options.responsiveAnimationDuration)
						}
					},
					ensureScalesHaveIDs: function() {
						var a = this.options,
							b = a.scales || {},
							c = a.scale;
						e.each(b.xAxes, function(a, b) {
							a.id = a.id || "x-axis-" + b
						}), e.each(b.yAxes, function(a, b) {
							a.id = a.id || "y-axis-" + b
						}), c && (c.id = c.id || "scale")
					},
					buildScales: function() {
						var b = this,
							c = b.options,
							d = b.scales = {},
							f = [];
						c.scales && (f = f.concat((c.scales.xAxes || []).map(function(a) {
							return {
								options: a,
								dtype: "category",
								dposition: "bottom"
							}
						}), (c.scales.yAxes || []).map(function(a) {
							return {
								options: a,
								dtype: "linear",
								dposition: "left"
							}
						}))), c.scale && f.push({
							options: c.scale,
							dtype: "radialLinear",
							isDefault: !0,
							dposition: "chartArea"
						}), e.each(f, function(c) {
							var f = c.options,
								g = e.valueOrDefault(f.type, c.dtype),
								i = a.scaleService.getScaleConstructor(g);
							if(i) {
								h(f.position) !== h(c.dposition) && (f.position = c.dposition);
								var j = new i({
									id: f.id,
									options: f,
									ctx: b.ctx,
									chart: b
								});
								d[j.id] = j, j.mergeTicksOptions(), c.isDefault && (b.scale = j)
							}
						}), a.scaleService.addScalesToLayout(this)
					},
					buildOrUpdateControllers: function() {
						var b = this,
							c = [],
							d = [];
						return e.each(b.data.datasets, function(e, f) {
							var g = b.getDatasetMeta(f),
								h = e.type || b.config.type;
							if(g.type && g.type !== h && (b.destroyDatasetMeta(f), g = b.getDatasetMeta(f)), g.type = h, c.push(g.type), g.controller) g.controller.updateIndex(f);
							else {
								var i = a.controllers[g.type];
								if(void 0 === i) throw new Error('"' + g.type + '" is not a chart type.');
								g.controller = new i(b, f), d.push(g.controller)
							}
						}, b), d
					},
					resetElements: function() {
						var a = this;
						e.each(a.data.datasets, function(b, c) {
							a.getDatasetMeta(c).controller.reset()
						}, a)
					},
					reset: function() {
						this.resetElements(), this.tooltip.initialize()
					},
					update: function(a) {
						var b = this;
						if(a && "object" == typeof a || (a = {
								duration: a,
								lazy: arguments[1]
							}), c(b), !1 !== i.notify(b, "beforeUpdate")) {
							b.tooltip._data = b.data;
							var d = b.buildOrUpdateControllers();
							e.each(b.data.datasets, function(a, c) {
								b.getDatasetMeta(c).controller.buildOrUpdateElements()
							}, b), b.updateLayout(), e.each(d, function(a) {
								a.reset()
							}), b.updateDatasets(), i.notify(b, "afterUpdate"), b._bufferedRender ? b._bufferedRequest = {
								duration: a.duration,
								easing: a.easing,
								lazy: a.lazy
							} : b.render(a)
						}
					},
					updateLayout: function() {
						var b = this;
						!1 !== i.notify(b, "beforeLayout") && (a.layoutService.update(this, this.width, this.height), i.notify(b, "afterScaleUpdate"), i.notify(b, "afterLayout"))
					},
					updateDatasets: function() {
						var a = this;
						if(!1 !== i.notify(a, "beforeDatasetsUpdate")) {
							for(var b = 0, c = a.data.datasets.length; b < c; ++b) a.updateDataset(b);
							i.notify(a, "afterDatasetsUpdate")
						}
					},
					updateDataset: function(a) {
						var b = this,
							c = b.getDatasetMeta(a),
							d = {
								meta: c,
								index: a
							};
						!1 !== i.notify(b, "beforeDatasetUpdate", [d]) && (c.controller.update(), i.notify(b, "afterDatasetUpdate", [d]))
					},
					render: function(b) {
						var c = this;
						b && "object" == typeof b || (b = {
							duration: b,
							lazy: arguments[1]
						});
						var d = b.duration,
							f = b.lazy;
						if(!1 !== i.notify(c, "beforeRender")) {
							var g = c.options.animation,
								h = function(a) {
									i.notify(c, "afterRender"), e.callback(g && g.onComplete, [a], c)
								};
							if(g && (void 0 !== d && 0 !== d || void 0 === d && 0 !== g.duration)) {
								var j = new a.Animation({
									numSteps: (d || g.duration) / 16.66,
									easing: b.easing || g.easing,
									render: function(a, b) {
										var c = e.easing.effects[b.easing],
											d = b.currentStep,
											f = d / b.numSteps;
										a.draw(c(f), f, d)
									},
									onAnimationProgress: g.onProgress,
									onAnimationComplete: h
								});
								a.animationService.addAnimation(c, j, d, f)
							} else c.draw(), h(new a.Animation({
								numSteps: 0,
								chart: c
							}));
							return c
						}
					},
					draw: function(a) {
						var b = this;
						b.clear(), e.isNullOrUndef(a) && (a = 1), b.transition(a), !1 !== i.notify(b, "beforeDraw", [a]) && (e.each(b.boxes, function(a) {
							a.draw(b.chartArea)
						}, b), b.scale && b.scale.draw(), b.drawDatasets(a), b.tooltip.draw(), i.notify(b, "afterDraw", [a]))
					},
					transition: function(a) {
						for(var b = this, c = 0, d = (b.data.datasets || []).length; c < d; ++c) b.isDatasetVisible(c) && b.getDatasetMeta(c).controller.transition(a);
						b.tooltip.transition(a)
					},
					drawDatasets: function(a) {
						var b = this;
						if(!1 !== i.notify(b, "beforeDatasetsDraw", [a])) {
							for(var c = (b.data.datasets || []).length - 1; c >= 0; --c) b.isDatasetVisible(c) && b.drawDataset(c, a);
							i.notify(b, "afterDatasetsDraw", [a])
						}
					},
					drawDataset: function(a, b) {
						var c = this,
							d = c.getDatasetMeta(a),
							e = {
								meta: d,
								index: a,
								easingValue: b
							};
						!1 !== i.notify(c, "beforeDatasetDraw", [e]) && (d.controller.draw(b), i.notify(c, "afterDatasetDraw", [e]))
					},
					getElementAtEvent: function(a) {
						return f.modes.single(this, a)
					},
					getElementsAtEvent: function(a) {
						return f.modes.label(this, a, {
							intersect: !0
						})
					},
					getElementsAtXAxis: function(a) {
						return f.modes["x-axis"](this, a, {
							intersect: !0
						})
					},
					getElementsAtEventForMode: function(a, b, c) {
						var d = f.modes[b];
						return "function" == typeof d ? d(this, a, c) : []
					},
					getDatasetAtEvent: function(a) {
						return f.modes.dataset(this, a, {
							intersect: !0
						})
					},
					getDatasetMeta: function(a) {
						var b = this,
							c = b.data.datasets[a];
						c._meta || (c._meta = {});
						var d = c._meta[b.id];
						return d || (d = c._meta[b.id] = {
							type: null,
							data: [],
							dataset: null,
							controller: null,
							hidden: null,
							xAxisID: null,
							yAxisID: null
						}), d
					},
					getVisibleDatasetCount: function() {
						for(var a = 0, b = 0, c = this.data.datasets.length; b < c; ++b) this.isDatasetVisible(b) && a++;
						return a
					},
					isDatasetVisible: function(a) {
						var b = this.getDatasetMeta(a);
						return "boolean" == typeof b.hidden ? !b.hidden : !this.data.datasets[a].hidden
					},
					generateLegend: function() {
						return this.options.legendCallback(this)
					},
					destroyDatasetMeta: function(a) {
						var b = this.id,
							c = this.data.datasets[a],
							d = c._meta && c._meta[b];
						d && (d.controller.destroy(), delete c._meta[b])
					},
					destroy: function() {
						var b, c, d = this,
							f = d.canvas;
						for(d.stop(), b = 0, c = d.data.datasets.length; b < c; ++b) d.destroyDatasetMeta(b);
						f && (d.unbindEvents(), e.canvas.clear(d), g.releaseContext(d.ctx), d.canvas = null, d.ctx = null), i.notify(d, "destroy"), delete a.instances[d.id]
					},
					toBase64Image: function() {
						return this.canvas.toDataURL.apply(this.canvas, arguments)
					},
					initToolTip: function() {
						var b = this;
						b.tooltip = new a.Tooltip({
							_chart: b,
							_chartInstance: b,
							_data: b.data,
							_options: b.options.tooltips
						}, b)
					},
					bindEvents: function() {
						var a = this,
							b = a._listeners = {},
							c = function() {
								a.eventHandler.apply(a, arguments)
							};
						e.each(a.options.events, function(d) {
							g.addEventListener(a, d, c), b[d] = c
						}), a.options.responsive && (c = function() {
							a.resize()
						}, g.addEventListener(a, "resize", c), b.resize = c)
					},
					unbindEvents: function() {
						var a = this,
							b = a._listeners;
						b && (delete a._listeners, e.each(b, function(b, c) {
							g.removeEventListener(a, c, b)
						}))
					},
					updateHoverStyle: function(a, b, c) {
						var d, e, f, g = c ? "setHoverStyle" : "removeHoverStyle";
						for(e = 0, f = a.length; e < f; ++e)(d = a[e]) && this.getDatasetMeta(d._datasetIndex).controller[g](d)
					},
					eventHandler: function(a) {
						var b = this,
							c = b.tooltip;
						if(!1 !== i.notify(b, "beforeEvent", [a])) {
							b._bufferedRender = !0, b._bufferedRequest = null;
							var d = b.handleEvent(a);
							d |= c && c.handleEvent(a), i.notify(b, "afterEvent", [a]);
							var e = b._bufferedRequest;
							return e ? b.render(e) : d && !b.animating && (b.stop(), b.render(b.options.hover.animationDuration, !0)), b._bufferedRender = !1, b._bufferedRequest = null, b
						}
					},
					handleEvent: function(a) {
						var b = this,
							c = b.options || {},
							d = c.hover,
							f = !1;
						return b.lastActive = b.lastActive || [], "mouseout" === a.type ? b.active = [] : b.active = b.getElementsAtEventForMode(a, d.mode, d), e.callback(c.onHover || c.hover.onHover, [a.native, b.active], b), "mouseup" !== a.type && "click" !== a.type || c.onClick && c.onClick.call(b, a.native, b.active), b.lastActive.length && b.updateHoverStyle(b.lastActive, d.mode, !1), b.active.length && d.mode && b.updateHoverStyle(b.active, d.mode, !0), f = !e.arrayEquals(b.active, b.lastActive), b.lastActive = b.active, f
					}
				}), a.Controller = a
			}
		}, {
			25: 25,
			28: 28,
			45: 45,
			48: 48
		}],
		24: [function(a, b, c) {
			"use strict";
			var d = a(45);
			b.exports = function(a) {
				function b(a, b) {
					if(a._chartjs) return void a._chartjs.listeners.push(b);
					Object.defineProperty(a, "_chartjs", {
						configurable: !0,
						enumerable: !1,
						value: {
							listeners: [b]
						}
					}), e.forEach(function(b) {
						var c = "onData" + b.charAt(0).toUpperCase() + b.slice(1),
							e = a[b];
						Object.defineProperty(a, b, {
							configurable: !0,
							enumerable: !1,
							value: function() {
								var b = Array.prototype.slice.call(arguments),
									f = e.apply(this, b);
								return d.each(a._chartjs.listeners, function(a) {
									"function" == typeof a[c] && a[c].apply(a, b)
								}), f
							}
						})
					})
				}

				function c(a, b) {
					var c = a._chartjs;
					if(c) {
						var d = c.listeners,
							f = d.indexOf(b); - 1 !== f && d.splice(f, 1), d.length > 0 || (e.forEach(function(b) {
							delete a[b]
						}), delete a._chartjs)
					}
				}
				var e = ["push", "pop", "shift", "splice", "unshift"];
				a.DatasetController = function(a, b) {
					this.initialize(a, b)
				}, d.extend(a.DatasetController.prototype, {
					datasetElementType: null,
					dataElementType: null,
					initialize: function(a, b) {
						var c = this;
						c.chart = a, c.index = b, c.linkScales(), c.addElements()
					},
					updateIndex: function(a) {
						this.index = a
					},
					linkScales: function() {
						var a = this,
							b = a.getMeta(),
							c = a.getDataset();
						null === b.xAxisID && (b.xAxisID = c.xAxisID || a.chart.options.scales.xAxes[0].id), null === b.yAxisID && (b.yAxisID = c.yAxisID || a.chart.options.scales.yAxes[0].id)
					},
					getDataset: function() {
						return this.chart.data.datasets[this.index]
					},
					getMeta: function() {
						return this.chart.getDatasetMeta(this.index)
					},
					getScaleForId: function(a) {
						return this.chart.scales[a]
					},
					reset: function() {
						this.update(!0)
					},
					destroy: function() {
						this._data && c(this._data, this)
					},
					createMetaDataset: function() {
						var a = this,
							b = a.datasetElementType;
						return b && new b({
							_chart: a.chart,
							_datasetIndex: a.index
						})
					},
					createMetaData: function(a) {
						var b = this,
							c = b.dataElementType;
						return c && new c({
							_chart: b.chart,
							_datasetIndex: b.index,
							_index: a
						})
					},
					addElements: function() {
						var a, b, c = this,
							d = c.getMeta(),
							e = c.getDataset().data || [],
							f = d.data;
						for(a = 0, b = e.length; a < b; ++a) f[a] = f[a] || c.createMetaData(a);
						d.dataset = d.dataset || c.createMetaDataset()
					},
					addElementAndReset: function(a) {
						var b = this.createMetaData(a);
						this.getMeta().data.splice(a, 0, b), this.updateElement(b, a, !0)
					},
					buildOrUpdateElements: function() {
						var a = this,
							d = a.getDataset(),
							e = d.data || (d.data = []);
						a._data !== e && (a._data && c(a._data, a), b(e, a), a._data = e), a.resyncElements()
					},
					update: d.noop,
					transition: function(a) {
						for(var b = this.getMeta(), c = b.data || [], d = c.length, e = 0; e < d; ++e) c[e].transition(a);
						b.dataset && b.dataset.transition(a)
					},
					draw: function() {
						var a = this.getMeta(),
							b = a.data || [],
							c = b.length,
							d = 0;
						for(a.dataset && a.dataset.draw(); d < c; ++d) b[d].draw()
					},
					removeHoverStyle: function(a, b) {
						var c = this.chart.data.datasets[a._datasetIndex],
							e = a._index,
							f = a.custom || {},
							g = d.valueAtIndexOrDefault,
							h = a._model;
						h.backgroundColor = f.backgroundColor ? f.backgroundColor : g(c.backgroundColor, e, b.backgroundColor), h.borderColor = f.borderColor ? f.borderColor : g(c.borderColor, e, b.borderColor), h.borderWidth = f.borderWidth ? f.borderWidth : g(c.borderWidth, e, b.borderWidth)
					},
					setHoverStyle: function(a) {
						var b = this.chart.data.datasets[a._datasetIndex],
							c = a._index,
							e = a.custom || {},
							f = d.valueAtIndexOrDefault,
							g = d.getHoverColor,
							h = a._model;
						h.backgroundColor = e.hoverBackgroundColor ? e.hoverBackgroundColor : f(b.hoverBackgroundColor, c, g(h.backgroundColor)), h.borderColor = e.hoverBorderColor ? e.hoverBorderColor : f(b.hoverBorderColor, c, g(h.borderColor)), h.borderWidth = e.hoverBorderWidth ? e.hoverBorderWidth : f(b.hoverBorderWidth, c, h.borderWidth)
					},
					resyncElements: function() {
						var a = this,
							b = a.getMeta(),
							c = a.getDataset().data,
							d = b.data.length,
							e = c.length;
						e < d ? b.data.splice(e, d - e) : e > d && a.insertElements(d, e - d)
					},
					insertElements: function(a, b) {
						for(var c = 0; c < b; ++c) this.addElementAndReset(a + c)
					},
					onDataPush: function() {
						this.insertElements(this.getDataset().data.length - 1, arguments.length)
					},
					onDataPop: function() {
						this.getMeta().data.pop()
					},
					onDataShift: function() {
						this.getMeta().data.shift()
					},
					onDataSplice: function(a, b) {
						this.getMeta().data.splice(a, b), this.insertElements(a, arguments.length - 2)
					},
					onDataUnshift: function() {
						this.insertElements(0, arguments.length)
					}
				}), a.DatasetController.extend = d.inherits
			}
		}, {
			45: 45
		}],
		25: [function(a, b, c) {
			"use strict";
			var d = a(45);
			b.exports = {
				_set: function(a, b) {
					return d.merge(this[a] || (this[a] = {}), b)
				}
			}
		}, {
			45: 45
		}],
		26: [function(a, b, c) {
			"use strict";

			function d(a, b, c, d) {
				var f, g, h, i, j, k, l, m, n, o = Object.keys(c);
				for(f = 0, g = o.length; f < g; ++f)
					if(h = o[f], k = c[h], b.hasOwnProperty(h) || (b[h] = k), (i = b[h]) !== k && "_" !== h[0]) {
						if(a.hasOwnProperty(h) || (a[h] = i), j = a[h], (l = typeof k) === typeof j)
							if("string" === l) {
								if(m = e(j), m.valid && (n = e(k), n.valid)) {
									b[h] = n.mix(m, d).rgbString();
									continue
								}
							} else if("number" === l && isFinite(j) && isFinite(k)) {
							b[h] = j + (k - j) * d;
							continue
						}
						b[h] = k
					}
			}
			var e = a(3),
				f = a(45),
				g = function(a) {
					f.extend(this, a), this.initialize.apply(this, arguments)
				};
			f.extend(g.prototype, {
				initialize: function() {
					this.hidden = !1
				},
				pivot: function() {
					var a = this;
					return a._view || (a._view = f.clone(a._model)), a._start = {}, a
				},
				transition: function(a) {
					var b = this,
						c = b._model,
						e = b._start,
						f = b._view;
					return c && 1 !== a ? (f || (f = b._view = {}), e || (e = b._start = {}), d(e, f, c, a), b) : (b._view = c, b._start = null, b)
				},
				tooltipPosition: function() {
					return {
						x: this._model.x,
						y: this._model.y
					}
				},
				hasValue: function() {
					return f.isNumber(this._model.x) && f.isNumber(this._model.y)
				}
			}), g.extend = f.inherits, b.exports = g
		}, {
			3: 3,
			45: 45
		}],
		27: [function(a, b, c) {
			"use strict";
			var d = a(3),
				e = a(25),
				f = a(45);
			b.exports = function(a) {
				function b(a, b, c) {
					var d;
					return "string" == typeof a ? (d = parseInt(a, 10), -1 !== a.indexOf("%") && (d = d / 100 * b.parentNode[c])) : d = a, d
				}

				function c(a) {
					return void 0 !== a && null !== a && "none" !== a
				}

				function g(a, d, e) {
					var f = document.defaultView,
						g = a.parentNode,
						h = f.getComputedStyle(a)[d],
						i = f.getComputedStyle(g)[d],
						j = c(h),
						k = c(i),
						l = Number.POSITIVE_INFINITY;
					return j || k ? Math.min(j ? b(h, a, e) : l, k ? b(i, g, e) : l) : "none"
				}
				f.extend = function(a) {
					for(var b = function(b, c) {
							a[c] = b
						}, c = 1, d = arguments.length; c < d; c++) f.each(arguments[c], b);
					return a
				}, f.configMerge = function() {
					return f.merge(f.clone(arguments[0]), [].slice.call(arguments, 1), {
						merger: function(b, c, d, e) {
							var g = c[b] || {},
								h = d[b];
							"scales" === b ? c[b] = f.scaleMerge(g, h) : "scale" === b ? c[b] = f.merge(g, [a.scaleService.getScaleDefaults(h.type), h]) : f._merger(b, c, d, e)
						}
					})
				}, f.scaleMerge = function() {
					return f.merge(f.clone(arguments[0]), [].slice.call(arguments, 1), {
						merger: function(b, c, d, e) {
							if("xAxes" === b || "yAxes" === b) {
								var g, h, i, j = d[b].length;
								for(c[b] || (c[b] = []), g = 0; g < j; ++g) i = d[b][g], h = f.valueOrDefault(i.type, "xAxes" === b ? "category" : "linear"), g >= c[b].length && c[b].push({}), !c[b][g].type || i.type && i.type !== c[b][g].type ? f.merge(c[b][g], [a.scaleService.getScaleDefaults(h), i]) : f.merge(c[b][g], i)
							} else f._merger(b, c, d, e)
						}
					})
				}, f.where = function(a, b) {
					if(f.isArray(a) && Array.prototype.filter) return a.filter(b);
					var c = [];
					return f.each(a, function(a) {
						b(a) && c.push(a)
					}), c
				}, f.findIndex = Array.prototype.findIndex ? function(a, b, c) {
					return a.findIndex(b, c)
				} : function(a, b, c) {
					c = void 0 === c ? a : c;
					for(var d = 0, e = a.length; d < e; ++d)
						if(b.call(c, a[d], d, a)) return d;
					return -1
				}, f.findNextWhere = function(a, b, c) {
					f.isNullOrUndef(c) && (c = -1);
					for(var d = c + 1; d < a.length; d++) {
						var e = a[d];
						if(b(e)) return e
					}
				}, f.findPreviousWhere = function(a, b, c) {
					f.isNullOrUndef(c) && (c = a.length);
					for(var d = c - 1; d >= 0; d--) {
						var e = a[d];
						if(b(e)) return e
					}
				}, f.inherits = function(a) {
					var b = this,
						c = a && a.hasOwnProperty("constructor") ? a.constructor : function() {
							return b.apply(this, arguments)
						},
						d = function() {
							this.constructor = c
						};
					return d.prototype = b.prototype, c.prototype = new d, c.extend = f.inherits, a && f.extend(c.prototype, a), c.__super__ = b.prototype, c
				}, f.isNumber = function(a) {
					return !isNaN(parseFloat(a)) && isFinite(a)
				}, f.almostEquals = function(a, b, c) {
					return Math.abs(a - b) < c
				}, f.almostWhole = function(a, b) {
					var c = Math.round(a);
					return c - b < a && c + b > a
				}, f.max = function(a) {
					return a.reduce(function(a, b) {
						return isNaN(b) ? a : Math.max(a, b)
					}, Number.NEGATIVE_INFINITY)
				}, f.min = function(a) {
					return a.reduce(function(a, b) {
						return isNaN(b) ? a : Math.min(a, b)
					}, Number.POSITIVE_INFINITY)
				}, f.sign = Math.sign ? function(a) {
					return Math.sign(a)
				} : function(a) {
					return a = +a, 0 === a || isNaN(a) ? a : a > 0 ? 1 : -1
				}, f.log10 = Math.log10 ? function(a) {
					return Math.log10(a)
				} : function(a) {
					return Math.log(a) / Math.LN10
				}, f.toRadians = function(a) {
					return a * (Math.PI / 180)
				}, f.toDegrees = function(a) {
					return a * (180 / Math.PI)
				}, f.getAngleFromPoint = function(a, b) {
					var c = b.x - a.x,
						d = b.y - a.y,
						e = Math.sqrt(c * c + d * d),
						f = Math.atan2(d, c);
					return f < -.5 * Math.PI && (f += 2 * Math.PI), {
						angle: f,
						distance: e
					}
				}, f.distanceBetweenPoints = function(a, b) {
					return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))
				}, f.aliasPixel = function(a) {
					return a % 2 == 0 ? 0 : .5
				}, f.splineCurve = function(a, b, c, d) {
					var e = a.skip ? b : a,
						f = b,
						g = c.skip ? b : c,
						h = Math.sqrt(Math.pow(f.x - e.x, 2) + Math.pow(f.y - e.y, 2)),
						i = Math.sqrt(Math.pow(g.x - f.x, 2) + Math.pow(g.y - f.y, 2)),
						j = h / (h + i),
						k = i / (h + i);
					j = isNaN(j) ? 0 : j, k = isNaN(k) ? 0 : k;
					var l = d * j,
						m = d * k;
					return {
						previous: {
							x: f.x - l * (g.x - e.x),
							y: f.y - l * (g.y - e.y)
						},
						next: {
							x: f.x + m * (g.x - e.x),
							y: f.y + m * (g.y - e.y)
						}
					}
				}, f.EPSILON = Number.EPSILON || 1e-14, f.splineCurveMonotone = function(a) {
					var b, c, d, e, g = (a || []).map(function(a) {
							return {
								model: a._model,
								deltaK: 0,
								mK: 0
							}
						}),
						h = g.length;
					for(b = 0; b < h; ++b)
						if(d = g[b], !d.model.skip) {
							if(c = b > 0 ? g[b - 1] : null, (e = b < h - 1 ? g[b + 1] : null) && !e.model.skip) {
								var i = e.model.x - d.model.x;
								d.deltaK = 0 !== i ? (e.model.y - d.model.y) / i : 0
							}!c || c.model.skip ? d.mK = d.deltaK : !e || e.model.skip ? d.mK = c.deltaK : this.sign(c.deltaK) !== this.sign(d.deltaK) ? d.mK = 0 : d.mK = (c.deltaK + d.deltaK) / 2
						}
					var j, k, l, m;
					for(b = 0; b < h - 1; ++b) d = g[b], e = g[b + 1], d.model.skip || e.model.skip || (f.almostEquals(d.deltaK, 0, this.EPSILON) ? d.mK = e.mK = 0 : (j = d.mK / d.deltaK, k = e.mK / d.deltaK, (m = Math.pow(j, 2) + Math.pow(k, 2)) <= 9 || (l = 3 / Math.sqrt(m), d.mK = j * l * d.deltaK, e.mK = k * l * d.deltaK)));
					var n;
					for(b = 0; b < h; ++b) d = g[b], d.model.skip || (c = b > 0 ? g[b - 1] : null, e = b < h - 1 ? g[b + 1] : null, c && !c.model.skip && (n = (d.model.x - c.model.x) / 3, d.model.controlPointPreviousX = d.model.x - n, d.model.controlPointPreviousY = d.model.y - n * d.mK), e && !e.model.skip && (n = (e.model.x - d.model.x) / 3, d.model.controlPointNextX = d.model.x + n, d.model.controlPointNextY = d.model.y + n * d.mK))
				}, f.nextItem = function(a, b, c) {
					return c ? b >= a.length - 1 ? a[0] : a[b + 1] : b >= a.length - 1 ? a[a.length - 1] : a[b + 1]
				}, f.previousItem = function(a, b, c) {
					return c ? b <= 0 ? a[a.length - 1] : a[b - 1] : b <= 0 ? a[0] : a[b - 1]
				}, f.niceNum = function(a, b) {
					var c = Math.floor(f.log10(a)),
						d = a / Math.pow(10, c);
					return(b ? d < 1.5 ? 1 : d < 3 ? 2 : d < 7 ? 5 : 10 : d <= 1 ? 1 : d <= 2 ? 2 : d <= 5 ? 5 : 10) * Math.pow(10, c)
				}, f.requestAnimFrame = function() {
					return "undefined" == typeof window ? function(a) {
						a()
					} : window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
						return window.setTimeout(a, 1e3 / 60)
					}
				}(), f.getRelativePosition = function(a, b) {
					var c, d, e = a.originalEvent || a,
						g = a.currentTarget || a.srcElement,
						h = g.getBoundingClientRect(),
						i = e.touches;
					i && i.length > 0 ? (c = i[0].clientX, d = i[0].clientY) : (c = e.clientX, d = e.clientY);
					var j = parseFloat(f.getStyle(g, "padding-left")),
						k = parseFloat(f.getStyle(g, "padding-top")),
						l = parseFloat(f.getStyle(g, "padding-right")),
						m = parseFloat(f.getStyle(g, "padding-bottom")),
						n = h.right - h.left - j - l,
						o = h.bottom - h.top - k - m;
					return c = Math.round((c - h.left - j) / n * g.width / b.currentDevicePixelRatio), d = Math.round((d - h.top - k) / o * g.height / b.currentDevicePixelRatio), {
						x: c,
						y: d
					}
				}, f.getConstraintWidth = function(a) {
					return g(a, "max-width", "clientWidth")
				}, f.getConstraintHeight = function(a) {
					return g(a, "max-height", "clientHeight")
				}, f.getMaximumWidth = function(a) {
					var b = a.parentNode;
					if(!b) return a.clientWidth;
					var c = parseInt(f.getStyle(b, "padding-left"), 10),
						d = parseInt(f.getStyle(b, "padding-right"), 10),
						e = b.clientWidth - c - d,
						g = f.getConstraintWidth(a);
					return isNaN(g) ? e : Math.min(e, g)
				}, f.getMaximumHeight = function(a) {
					var b = a.parentNode;
					if(!b) return a.clientHeight;
					var c = parseInt(f.getStyle(b, "padding-top"), 10),
						d = parseInt(f.getStyle(b, "padding-bottom"), 10),
						e = b.clientHeight - c - d,
						g = f.getConstraintHeight(a);
					return isNaN(g) ? e : Math.min(e, g)
				}, f.getStyle = function(a, b) {
					return a.currentStyle ? a.currentStyle[b] : document.defaultView.getComputedStyle(a, null).getPropertyValue(b)
				}, f.retinaScale = function(a, b) {
					var c = a.currentDevicePixelRatio = b || window.devicePixelRatio || 1;
					if(1 !== c) {
						var d = a.canvas,
							e = a.height,
							f = a.width;
						d.height = e * c, d.width = f * c, a.ctx.scale(c, c), d.style.height = e + "px", d.style.width = f + "px"
					}
				}, f.fontString = function(a, b, c) {
					return b + " " + a + "px " + c
				}, f.longestText = function(a, b, c, d) {
					d = d || {};
					var e = d.data = d.data || {},
						g = d.garbageCollect = d.garbageCollect || [];
					d.font !== b && (e = d.data = {}, g = d.garbageCollect = [], d.font = b), a.font = b;
					var h = 0;
					f.each(c, function(b) {
						void 0 !== b && null !== b && !0 !== f.isArray(b) ? h = f.measureText(a, e, g, h, b) : f.isArray(b) && f.each(b, function(b) {
							void 0 === b || null === b || f.isArray(b) || (h = f.measureText(a, e, g, h, b))
						})
					});
					var i = g.length / 2;
					if(i > c.length) {
						for(var j = 0; j < i; j++) delete e[g[j]];
						g.splice(0, i)
					}
					return h
				}, f.measureText = function(a, b, c, d, e) {
					var f = b[e];
					return f || (f = b[e] = a.measureText(e).width, c.push(e)), f > d && (d = f), d
				}, f.numberOfLabelLines = function(a) {
					var b = 1;
					return f.each(a, function(a) {
						f.isArray(a) && a.length > b && (b = a.length)
					}), b
				}, f.color = d ? function(a) {
					return a instanceof CanvasGradient && (a = e.global.defaultColor), d(a)
				} : function(a) {
					return console.error("Color.js not found!"), a
				}, f.getHoverColor = function(a) {
					return a instanceof CanvasPattern ? a : f.color(a).saturate(.5).darken(.1).rgbString()
				}
			}
		}, {
			25: 25,
			3: 3,
			45: 45
		}],
		28: [function(a, b, c) {
			"use strict";

			function d(a, b) {
				return a.native ? {
					x: a.x,
					y: a.y
				} : j.getRelativePosition(a, b)
			}

			function e(a, b) {
				var c, d, e, f, g, h = a.data.datasets;
				for(d = 0, f = h.length; d < f; ++d)
					if(a.isDatasetVisible(d))
						for(c = a.getDatasetMeta(d), e = 0, g = c.data.length; e < g; ++e) {
							var i = c.data[e];
							i._view.skip || b(i)
						}
			}

			function f(a, b) {
				var c = [];
				return e(a, function(a) {
					a.inRange(b.x, b.y) && c.push(a)
				}), c
			}

			function g(a, b, c, d) {
				var f = Number.POSITIVE_INFINITY,
					g = [];
				return e(a, function(a) {
					if(!c || a.inRange(b.x, b.y)) {
						var e = a.getCenterPoint(),
							h = d(b, e);
						h < f ? (g = [a], f = h) : h === f && g.push(a)
					}
				}), g
			}

			function h(a) {
				var b = -1 !== a.indexOf("x"),
					c = -1 !== a.indexOf("y");
				return function(a, d) {
					var e = b ? Math.abs(a.x - d.x) : 0,
						f = c ? Math.abs(a.y - d.y) : 0;
					return Math.sqrt(Math.pow(e, 2) + Math.pow(f, 2))
				}
			}

			function i(a, b, c) {
				var e = d(b, a);
				c.axis = c.axis || "x";
				var i = h(c.axis),
					j = c.intersect ? f(a, e) : g(a, e, !1, i),
					k = [];
				return j.length ? (a.data.datasets.forEach(function(b, c) {
					if(a.isDatasetVisible(c)) {
						var d = a.getDatasetMeta(c),
							e = d.data[j[0]._index];
						e && !e._view.skip && k.push(e)
					}
				}), k) : []
			}
			var j = a(45);
			b.exports = {
				modes: {
					single: function(a, b) {
						var c = d(b, a),
							f = [];
						return e(a, function(a) {
							if(a.inRange(c.x, c.y)) return f.push(a), f
						}), f.slice(0, 1)
					},
					label: i,
					index: i,
					dataset: function(a, b, c) {
						var e = d(b, a);
						c.axis = c.axis || "xy";
						var i = h(c.axis),
							j = c.intersect ? f(a, e) : g(a, e, !1, i);
						return j.length > 0 && (j = a.getDatasetMeta(j[0]._datasetIndex).data), j
					},
					"x-axis": function(a, b) {
						return i(a, b, {
							intersect: !0
						})
					},
					point: function(a, b) {
						return f(a, d(b, a))
					},
					nearest: function(a, b, c) {
						var e = d(b, a);
						c.axis = c.axis || "xy";
						var f = h(c.axis),
							i = g(a, e, c.intersect, f);
						return i.length > 1 && i.sort(function(a, b) {
							var c = a.getArea(),
								d = b.getArea(),
								e = c - d;
							return 0 === e && (e = a._datasetIndex - b._datasetIndex), e
						}), i.slice(0, 1)
					},
					x: function(a, b, c) {
						var f = d(b, a),
							g = [],
							h = !1;
						return e(a, function(a) {
							a.inXRange(f.x) && g.push(a), a.inRange(f.x, f.y) && (h = !0)
						}), c.intersect && !h && (g = []), g
					},
					y: function(a, b, c) {
						var f = d(b, a),
							g = [],
							h = !1;
						return e(a, function(a) {
							a.inYRange(f.y) && g.push(a), a.inRange(f.x, f.y) && (h = !0)
						}), c.intersect && !h && (g = []), g
					}
				}
			}
		}, {
			45: 45
		}],
		29: [function(a, b, c) {
			"use strict";
			a(25)._set("global", {
				responsive: !0,
				responsiveAnimationDuration: 0,
				maintainAspectRatio: !0,
				events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
				hover: {
					onHover: null,
					mode: "nearest",
					intersect: !0,
					animationDuration: 400
				},
				onClick: null,
				defaultColor: "rgba(0,0,0,0.1)",
				defaultFontColor: "#666",
				defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
				defaultFontSize: 12,
				defaultFontStyle: "normal",
				showLines: !0,
				elements: {},
				layout: {
					padding: {
						top: 0,
						right: 0,
						bottom: 0,
						left: 0
					}
				}
			}), b.exports = function() {
				var a = function(a, b) {
					return this.construct(a, b), this
				};
				return a.Chart = a, a
			}
		}, {
			25: 25
		}],
		30: [function(a, b, c) {
			"use strict";
			var d = a(45);
			b.exports = function(a) {
				function b(a, b) {
					return d.where(a, function(a) {
						return a.position === b
					})
				}

				function c(a, b) {
					a.forEach(function(a, b) {
						return a._tmpIndex_ = b, a
					}), a.sort(function(a, c) {
						var d = b ? c : a,
							e = b ? a : c;
						return d.weight === e.weight ? d._tmpIndex_ - e._tmpIndex_ : d.weight - e.weight
					}), a.forEach(function(a) {
						delete a._tmpIndex_
					})
				}
				a.layoutService = {
					defaults: {},
					addBox: function(a, b) {
						a.boxes || (a.boxes = []), b.fullWidth = b.fullWidth || !1, b.position = b.position || "top", b.weight = b.weight || 0, a.boxes.push(b)
					},
					removeBox: function(a, b) {
						var c = a.boxes ? a.boxes.indexOf(b) : -1; - 1 !== c && a.boxes.splice(c, 1)
					},
					configure: function(a, b, c) {
						for(var d, e = ["fullWidth", "position", "weight"], f = e.length, g = 0; g < f; ++g) d = e[g], c.hasOwnProperty(d) && (b[d] = c[d])
					},
					update: function(a, e, f) {
						function g(a) {
							var b, c = a.isHorizontal();
							c ? (b = a.update(a.fullWidth ? v : B, A), C -= b.height) : (b = a.update(z, y), B -= b.width), D.push({
								horizontal: c,
								minSize: b,
								box: a
							})
						}

						function h(a) {
							var b = d.findNextWhere(D, function(b) {
								return b.box === a
							});
							if(b)
								if(a.isHorizontal()) {
									var c = {
										left: Math.max(I, E),
										right: Math.max(J, F),
										top: 0,
										bottom: 0
									};
									a.update(a.fullWidth ? v : B, w / 2, c)
								} else a.update(b.minSize.width, C)
						}

						function i(a) {
							var b = d.findNextWhere(D, function(b) {
									return b.box === a
								}),
								c = {
									left: 0,
									right: 0,
									top: K,
									bottom: L
								};
							b && a.update(b.minSize.width, C, c)
						}

						function j(a) {
							a.isHorizontal() ? (a.left = a.fullWidth ? m : I, a.right = a.fullWidth ? e - n : I + B, a.top = R, a.bottom = R + a.height, R = a.bottom) : (a.left = Q, a.right = Q + a.width, a.top = K, a.bottom = K + C, Q = a.right)
						}
						if(a) {
							var k = a.options.layout || {},
								l = d.options.toPadding(k.padding),
								m = l.left,
								n = l.right,
								o = l.top,
								p = l.bottom,
								q = b(a.boxes, "left"),
								r = b(a.boxes, "right"),
								s = b(a.boxes, "top"),
								t = b(a.boxes, "bottom"),
								u = b(a.boxes, "chartArea");
							c(q, !0), c(r, !1), c(s, !0), c(t, !1);
							var v = e - m - n,
								w = f - o - p,
								x = v / 2,
								y = w / 2,
								z = (e - x) / (q.length + r.length),
								A = (f - y) / (s.length + t.length),
								B = v,
								C = w,
								D = [];
							d.each(q.concat(r, s, t), g);
							var E = 0,
								F = 0,
								G = 0,
								H = 0;
							d.each(s.concat(t), function(a) {
								if(a.getPadding) {
									var b = a.getPadding();
									E = Math.max(E, b.left), F = Math.max(F, b.right)
								}
							}), d.each(q.concat(r), function(a) {
								if(a.getPadding) {
									var b = a.getPadding();
									G = Math.max(G, b.top), H = Math.max(H, b.bottom)
								}
							});
							var I = m,
								J = n,
								K = o,
								L = p;
							d.each(q.concat(r), h), d.each(q, function(a) {
								I += a.width
							}), d.each(r, function(a) {
								J += a.width
							}), d.each(s.concat(t), h), d.each(s, function(a) {
								K += a.height
							}), d.each(t, function(a) {
								L += a.height
							}), d.each(q.concat(r), i), I = m, J = n, K = o, L = p, d.each(q, function(a) {
								I += a.width
							}), d.each(r, function(a) {
								J += a.width
							}), d.each(s, function(a) {
								K += a.height
							}), d.each(t, function(a) {
								L += a.height
							});
							var M = Math.max(E - I, 0);
							I += M, J += Math.max(F - J, 0);
							var N = Math.max(G - K, 0);
							K += N, L += Math.max(H - L, 0);
							var O = f - K - L,
								P = e - I - J;
							P === B && O === C || (d.each(q, function(a) {
								a.height = O
							}), d.each(r, function(a) {
								a.height = O
							}), d.each(s, function(a) {
								a.fullWidth || (a.width = P)
							}), d.each(t, function(a) {
								a.fullWidth || (a.width = P)
							}), C = O, B = P);
							var Q = m + M,
								R = o + N;
							d.each(q.concat(s), j), Q += B, R += C, d.each(r, j), d.each(t, j), a.chartArea = {
								left: I,
								top: K,
								right: I + B,
								bottom: K + C
							}, d.each(u, function(b) {
								b.left = a.chartArea.left, b.top = a.chartArea.top, b.right = a.chartArea.right, b.bottom = a.chartArea.bottom, b.update(B, C)
							})
						}
					}
				}
			}
		}, {
			45: 45
		}],
		31: [function(a, b, c) {
			"use strict";
			var d = a(25),
				e = a(26),
				f = a(45);
			d._set("global", {
				plugins: {}
			}), b.exports = function(a) {
				a.plugins = {
					_plugins: [],
					_cacheId: 0,
					register: function(a) {
						var b = this._plugins;
						[].concat(a).forEach(function(a) {
							-1 === b.indexOf(a) && b.push(a)
						}), this._cacheId++
					},
					unregister: function(a) {
						var b = this._plugins;
						[].concat(a).forEach(function(a) {
							var c = b.indexOf(a); - 1 !== c && b.splice(c, 1)
						}), this._cacheId++
					},
					clear: function() {
						this._plugins = [], this._cacheId++
					},
					count: function() {
						return this._plugins.length
					},
					getAll: function() {
						return this._plugins
					},
					notify: function(a, b, c) {
						var d, e, f, g, h, i = this.descriptors(a),
							j = i.length;
						for(d = 0; d < j; ++d)
							if(e = i[d], f = e.plugin, "function" == typeof(h = f[b]) && (g = [a].concat(c || []), g.push(e.options), !1 === h.apply(f, g))) return !1;
						return !0
					},
					descriptors: function(a) {
						var b = a._plugins || (a._plugins = {});
						if(b.id === this._cacheId) return b.descriptors;
						var c = [],
							e = [],
							g = a && a.config || {},
							h = g.options && g.options.plugins || {};
						return this._plugins.concat(g.plugins || []).forEach(function(a) {
							if(-1 === c.indexOf(a)) {
								var b = a.id,
									g = h[b];
								!1 !== g && (!0 === g && (g = f.clone(d.global.plugins[b])), c.push(a), e.push({
									plugin: a,
									options: g || {}
								}))
							}
						}), b.descriptors = e, b.id = this._cacheId, e
					}
				}, a.pluginService = a.plugins, a.PluginBase = e.extend({})
			}
		}, {
			25: 25,
			26: 26,
			45: 45
		}],
		32: [function(a, b, c) {
			"use strict";

			function d(a) {
				var b, c, d = [];
				for(b = 0, c = a.length; b < c; ++b) d.push(a[b].label);
				return d
			}

			function e(a, b, c) {
				var d = a.getPixelForTick(b);
				return c && (d -= 0 === b ? (a.getPixelForTick(1) - d) / 2 : (d - a.getPixelForTick(b - 1)) / 2), d
			}
			var f = a(25),
				g = a(26),
				h = a(45),
				i = a(34);
			f._set("scale", {
				display: !0,
				position: "left",
				offset: !1,
				gridLines: {
					display: !0,
					color: "rgba(0, 0, 0, 0.1)",
					lineWidth: 1,
					drawBorder: !0,
					drawOnChartArea: !0,
					drawTicks: !0,
					tickMarkLength: 10,
					zeroLineWidth: 1,
					zeroLineColor: "rgba(0,0,0,0.25)",
					zeroLineBorderDash: [],
					zeroLineBorderDashOffset: 0,
					offsetGridLines: !1,
					borderDash: [],
					borderDashOffset: 0
				},
				scaleLabel: {
					display: !1,
					labelString: "",
					lineHeight: 1.2,
					padding: {
						top: 4,
						bottom: 4
					}
				},
				ticks: {
					beginAtZero: !1,
					minRotation: 0,
					maxRotation: 50,
					mirror: !1,
					padding: 0,
					reverse: !1,
					display: !0,
					autoSkip: !0,
					autoSkipPadding: 0,
					labelOffset: 0,
					callback: i.formatters.values,
					minor: {},
					major: {}
				}
			}), b.exports = function(a) {
				function b(a, b, c) {
					return h.isArray(b) ? h.longestText(a, c, b) : a.measureText(b).width
				}

				function c(a) {
					var b = h.valueOrDefault,
						c = f.global,
						d = b(a.fontSize, c.defaultFontSize),
						e = b(a.fontStyle, c.defaultFontStyle),
						g = b(a.fontFamily, c.defaultFontFamily);
					return {
						size: d,
						style: e,
						family: g,
						font: h.fontString(d, e, g)
					}
				}

				function i(a) {
					return h.options.toLineHeight(h.valueOrDefault(a.lineHeight, 1.2), h.valueOrDefault(a.fontSize, f.global.defaultFontSize))
				}
				a.Scale = g.extend({
					getPadding: function() {
						var a = this;
						return {
							left: a.paddingLeft || 0,
							top: a.paddingTop || 0,
							right: a.paddingRight || 0,
							bottom: a.paddingBottom || 0
						}
					},
					getTicks: function() {
						return this._ticks
					},
					mergeTicksOptions: function() {
						var a = this.options.ticks;
						!1 === a.minor && (a.minor = {
							display: !1
						}), !1 === a.major && (a.major = {
							display: !1
						});
						for(var b in a) "major" !== b && "minor" !== b && (void 0 === a.minor[b] && (a.minor[b] = a[b]), void 0 === a.major[b] && (a.major[b] = a[b]))
					},
					beforeUpdate: function() {
						h.callback(this.options.beforeUpdate, [this])
					},
					update: function(a, b, c) {
						var d, e, f, g, i, j, k = this;
						for(k.beforeUpdate(), k.maxWidth = a, k.maxHeight = b, k.margins = h.extend({
								left: 0,
								right: 0,
								top: 0,
								bottom: 0
							}, c), k.longestTextCache = k.longestTextCache || {}, k.beforeSetDimensions(), k.setDimensions(), k.afterSetDimensions(), k.beforeDataLimits(), k.determineDataLimits(), k.afterDataLimits(), k.beforeBuildTicks(), i = k.buildTicks() || [], k.afterBuildTicks(), k.beforeTickToLabelConversion(), f = k.convertTicksToLabels(i) || k.ticks, k.afterTickToLabelConversion(), k.ticks = f, d = 0, e = f.length; d < e; ++d) g = f[d], j = i[d], j ? j.label = g : i.push(j = {
							label: g,
							major: !1
						});
						return k._ticks = i, k.beforeCalculateTickRotation(), k.calculateTickRotation(), k.afterCalculateTickRotation(), k.beforeFit(), k.fit(), k.afterFit(), k.afterUpdate(), k.minSize
					},
					afterUpdate: function() {
						h.callback(this.options.afterUpdate, [this])
					},
					beforeSetDimensions: function() {
						h.callback(this.options.beforeSetDimensions, [this])
					},
					setDimensions: function() {
						var a = this;
						a.isHorizontal() ? (a.width = a.maxWidth, a.left = 0, a.right = a.width) : (a.height = a.maxHeight, a.top = 0, a.bottom = a.height), a.paddingLeft = 0, a.paddingTop = 0, a.paddingRight = 0, a.paddingBottom = 0
					},
					afterSetDimensions: function() {
						h.callback(this.options.afterSetDimensions, [this])
					},
					beforeDataLimits: function() {
						h.callback(this.options.beforeDataLimits, [this])
					},
					determineDataLimits: h.noop,
					afterDataLimits: function() {
						h.callback(this.options.afterDataLimits, [this])
					},
					beforeBuildTicks: function() {
						h.callback(this.options.beforeBuildTicks, [this])
					},
					buildTicks: h.noop,
					afterBuildTicks: function() {
						h.callback(this.options.afterBuildTicks, [this])
					},
					beforeTickToLabelConversion: function() {
						h.callback(this.options.beforeTickToLabelConversion, [this])
					},
					convertTicksToLabels: function() {
						var a = this,
							b = a.options.ticks;
						a.ticks = a.ticks.map(b.userCallback || b.callback, this)
					},
					afterTickToLabelConversion: function() {
						h.callback(this.options.afterTickToLabelConversion, [this])
					},
					beforeCalculateTickRotation: function() {
						h.callback(this.options.beforeCalculateTickRotation, [this])
					},
					calculateTickRotation: function() {
						var a = this,
							b = a.ctx,
							e = a.options.ticks,
							f = d(a._ticks),
							g = c(e);
						b.font = g.font;
						var i = e.minRotation || 0;
						if(f.length && a.options.display && a.isHorizontal())
							for(var j, k = h.longestText(b, g.font, f, a.longestTextCache), l = k, m = a.getPixelForTick(1) - a.getPixelForTick(0) - 6; l > m && i < e.maxRotation;) {
								var n = h.toRadians(i);
								if(j = Math.cos(n), Math.sin(n) * k > a.maxHeight) {
									i--;
									break
								}
								i++, l = j * k
							}
						a.labelRotation = i
					},
					afterCalculateTickRotation: function() {
						h.callback(this.options.afterCalculateTickRotation, [this])
					},
					beforeFit: function() {
						h.callback(this.options.beforeFit, [this])
					},
					fit: function() {
						var a = this,
							e = a.minSize = {
								width: 0,
								height: 0
							},
							f = d(a._ticks),
							g = a.options,
							j = g.ticks,
							k = g.scaleLabel,
							l = g.gridLines,
							m = g.display,
							n = a.isHorizontal(),
							o = c(j),
							p = g.gridLines.tickMarkLength;
						if(e.width = n ? a.isFullWidth() ? a.maxWidth - a.margins.left - a.margins.right : a.maxWidth : m && l.drawTicks ? p : 0, e.height = n ? m && l.drawTicks ? p : 0 : a.maxHeight, k.display && m) {
							var q = i(k),
								r = h.options.toPadding(k.padding),
								s = q + r.height;
							n ? e.height += s : e.width += s
						}
						if(j.display && m) {
							var t = h.longestText(a.ctx, o.font, f, a.longestTextCache),
								u = h.numberOfLabelLines(f),
								v = .5 * o.size,
								w = a.options.ticks.padding;
							if(n) {
								a.longestLabelWidth = t;
								var x = h.toRadians(a.labelRotation),
									y = Math.cos(x),
									z = Math.sin(x),
									A = z * t + o.size * u + v * (u - 1) + v;
								e.height = Math.min(a.maxHeight, e.height + A + w), a.ctx.font = o.font;
								var B = b(a.ctx, f[0], o.font),
									C = b(a.ctx, f[f.length - 1], o.font);
								0 !== a.labelRotation ? (a.paddingLeft = "bottom" === g.position ? y * B + 3 : y * v + 3, a.paddingRight = "bottom" === g.position ? y * v + 3 : y * C + 3) : (a.paddingLeft = B / 2 + 3, a.paddingRight = C / 2 + 3)
							} else j.mirror ? t = 0 : t += w + v, e.width = Math.min(a.maxWidth, e.width + t), a.paddingTop = o.size / 2, a.paddingBottom = o.size / 2
						}
						a.handleMargins(), a.width = e.width, a.height = e.height
					},
					handleMargins: function() {
						var a = this;
						a.margins && (a.paddingLeft = Math.max(a.paddingLeft - a.margins.left, 0), a.paddingTop = Math.max(a.paddingTop - a.margins.top, 0), a.paddingRight = Math.max(a.paddingRight - a.margins.right, 0), a.paddingBottom = Math.max(a.paddingBottom - a.margins.bottom, 0))
					},
					afterFit: function() {
						h.callback(this.options.afterFit, [this])
					},
					isHorizontal: function() {
						return "top" === this.options.position || "bottom" === this.options.position
					},
					isFullWidth: function() {
						return this.options.fullWidth
					},
					getRightValue: function(a) {
						if(h.isNullOrUndef(a)) return NaN;
						if("number" == typeof a && !isFinite(a)) return NaN;
						if(a)
							if(this.isHorizontal()) {
								if(void 0 !== a.x) return this.getRightValue(a.x)
							} else if(void 0 !== a.y) return this.getRightValue(a.y);
						return a
					},
					getLabelForIndex: h.noop,
					getPixelForValue: h.noop,
					getValueForPixel: h.noop,
					getPixelForTick: function(a) {
						var b = this,
							c = b.options.offset;
						if(b.isHorizontal()) {
							var d = b.width - (b.paddingLeft + b.paddingRight),
								e = d / Math.max(b._ticks.length - (c ? 0 : 1), 1),
								f = e * a + b.paddingLeft;
							c && (f += e / 2);
							var g = b.left + Math.round(f);
							return g += b.isFullWidth() ? b.margins.left : 0
						}
						var h = b.height - (b.paddingTop + b.paddingBottom);
						return b.top + a * (h / (b._ticks.length - 1))
					},
					getPixelForDecimal: function(a) {
						var b = this;
						if(b.isHorizontal()) {
							var c = b.width - (b.paddingLeft + b.paddingRight),
								d = c * a + b.paddingLeft,
								e = b.left + Math.round(d);
							return e += b.isFullWidth() ? b.margins.left : 0
						}
						return b.top + a * b.height
					},
					getBasePixel: function() {
						return this.getPixelForValue(this.getBaseValue())
					},
					getBaseValue: function() {
						var a = this,
							b = a.min,
							c = a.max;
						return a.beginAtZero ? 0 : b < 0 && c < 0 ? c : b > 0 && c > 0 ? b : 0
					},
					_autoSkip: function(a) {
						var b, c, d, e, f, g = this,
							i = g.isHorizontal(),
							j = g.options.ticks.minor,
							k = a.length,
							l = h.toRadians(g.labelRotation),
							m = Math.cos(l),
							n = g.longestLabelWidth * m,
							o = [];
						for(j.maxTicksLimit && (f = j.maxTicksLimit), i && (b = !1, (n + j.autoSkipPadding) * k > g.width - (g.paddingLeft + g.paddingRight) && (b = 1 + Math.floor((n + j.autoSkipPadding) * k / (g.width - (g.paddingLeft + g.paddingRight)))), f && k > f && (b = Math.max(b, Math.floor(k / f)))), c = 0; c < k; c++) d = a[c], e = b > 1 && c % b > 0 || c % b == 0 && c + b >= k, (e && c !== k - 1 || h.isNullOrUndef(d.label)) && delete d.label, o.push(d);
						return o
					},
					draw: function(a) {
						var b = this,
							d = b.options;
						if(d.display) {
							var g = b.ctx,
								j = f.global,
								k = d.ticks.minor,
								l = d.ticks.major || k,
								m = d.gridLines,
								n = d.scaleLabel,
								o = 0 !== b.labelRotation,
								p = b.isHorizontal(),
								q = k.autoSkip ? b._autoSkip(b.getTicks()) : b.getTicks(),
								r = h.valueOrDefault(k.fontColor, j.defaultFontColor),
								s = c(k),
								t = h.valueOrDefault(l.fontColor, j.defaultFontColor),
								u = c(l),
								v = m.drawTicks ? m.tickMarkLength : 0,
								w = h.valueOrDefault(n.fontColor, j.defaultFontColor),
								x = c(n),
								y = h.options.toPadding(n.padding),
								z = h.toRadians(b.labelRotation),
								A = [],
								B = "right" === d.position ? b.left : b.right - v,
								C = "right" === d.position ? b.left + v : b.right,
								D = "bottom" === d.position ? b.top : b.bottom - v,
								E = "bottom" === d.position ? b.top + v : b.bottom;
							if(h.each(q, function(c, f) {
									if(void 0 !== c.label) {
										var g, i, l, n, r = c.label;
										f === b.zeroLineIndex && d.offset === m.offsetGridLines ? (g = m.zeroLineWidth, i = m.zeroLineColor, l = m.zeroLineBorderDash, n = m.zeroLineBorderDashOffset) : (g = h.valueAtIndexOrDefault(m.lineWidth, f), i = h.valueAtIndexOrDefault(m.color, f), l = h.valueOrDefault(m.borderDash, j.borderDash), n = h.valueOrDefault(m.borderDashOffset, j.borderDashOffset));
										var s, t, u, w, x, y, F, G, H, I, J = "middle",
											K = "middle",
											L = k.padding;
										if(p) {
											var M = v + L;
											"bottom" === d.position ? (K = o ? "middle" : "top", J = o ? "right" : "center", I = b.top + M) : (K = o ? "middle" : "bottom", J = o ? "left" : "center", I = b.bottom - M);
											var N = e(b, f, m.offsetGridLines && q.length > 1);
											N < b.left && (i = "rgba(0,0,0,0)"), N += h.aliasPixel(g), H = b.getPixelForTick(f) + k.labelOffset, s = u = x = F = N, t = D, w = E, y = a.top, G = a.bottom
										} else {
											var O, P = "left" === d.position;
											k.mirror ? (J = P ? "left" : "right", O = L) : (J = P ? "right" : "left", O = v + L), H = P ? b.right - O : b.left + O;
											var Q = e(b, f, m.offsetGridLines && q.length > 1);
											Q < b.top && (i = "rgba(0,0,0,0)"), Q += h.aliasPixel(g), I = b.getPixelForTick(f) + k.labelOffset, s = B, u = C, x = a.left, F = a.right, t = w = y = G = Q
										}
										A.push({
											tx1: s,
											ty1: t,
											tx2: u,
											ty2: w,
											x1: x,
											y1: y,
											x2: F,
											y2: G,
											labelX: H,
											labelY: I,
											glWidth: g,
											glColor: i,
											glBorderDash: l,
											glBorderDashOffset: n,
											rotation: -1 * z,
											label: r,
											major: c.major,
											textBaseline: K,
											textAlign: J
										})
									}
								}), h.each(A, function(a) {
									if(m.display && (g.save(), g.lineWidth = a.glWidth, g.strokeStyle = a.glColor, g.setLineDash && (g.setLineDash(a.glBorderDash), g.lineDashOffset = a.glBorderDashOffset), g.beginPath(), m.drawTicks && (g.moveTo(a.tx1, a.ty1), g.lineTo(a.tx2, a.ty2)), m.drawOnChartArea && (g.moveTo(a.x1, a.y1), g.lineTo(a.x2, a.y2)), g.stroke(), g.restore()), k.display) {
										g.save(), g.translate(a.labelX, a.labelY), g.rotate(a.rotation), g.font = a.major ? u.font : s.font, g.fillStyle = a.major ? t : r, g.textBaseline = a.textBaseline, g.textAlign = a.textAlign;
										var b = a.label;
										if(h.isArray(b))
											for(var c = 0, d = 0; c < b.length; ++c) g.fillText("" + b[c], 0, d), d += 1.5 * s.size;
										else g.fillText(b, 0, 0);
										g.restore()
									}
								}), n.display) {
								var F, G, H = 0,
									I = i(n) / 2;
								if(p) F = b.left + (b.right - b.left) / 2, G = "bottom" === d.position ? b.bottom - I - y.bottom : b.top + I + y.top;
								else {
									var J = "left" === d.position;
									F = J ? b.left + I + y.top : b.right - I - y.top, G = b.top + (b.bottom - b.top) / 2, H = J ? -.5 * Math.PI : .5 * Math.PI
								}
								g.save(), g.translate(F, G), g.rotate(H), g.textAlign = "center", g.textBaseline = "middle", g.fillStyle = w, g.font = x.font, g.fillText(n.labelString, 0, 0), g.restore()
							}
							if(m.drawBorder) {
								g.lineWidth = h.valueAtIndexOrDefault(m.lineWidth, 0), g.strokeStyle = h.valueAtIndexOrDefault(m.color, 0);
								var K = b.left,
									L = b.right,
									M = b.top,
									N = b.bottom,
									O = h.aliasPixel(g.lineWidth);
								p ? (M = N = "top" === d.position ? b.bottom : b.top, M += O, N += O) : (K = L = "left" === d.position ? b.right : b.left, K += O, L += O), g.beginPath(), g.moveTo(K, M), g.lineTo(L, N), g.stroke()
							}
						}
					}
				})
			}
		}, {
			25: 25,
			26: 26,
			34: 34,
			45: 45
		}],
		33: [function(a, b, c) {
			"use strict";
			var d = a(25),
				e = a(45);
			b.exports = function(a) {
				a.scaleService = {
					constructors: {},
					defaults: {},
					registerScaleType: function(a, b, c) {
						this.constructors[a] = b, this.defaults[a] = e.clone(c)
					},
					getScaleConstructor: function(a) {
						return this.constructors.hasOwnProperty(a) ? this.constructors[a] : void 0
					},
					getScaleDefaults: function(a) {
						return this.defaults.hasOwnProperty(a) ? e.merge({}, [d.scale, this.defaults[a]]) : {}
					},
					updateScaleDefaults: function(a, b) {
						var c = this;
						c.defaults.hasOwnProperty(a) && (c.defaults[a] = e.extend(c.defaults[a], b))
					},
					addScalesToLayout: function(b) {
						e.each(b.scales, function(c) {
							c.fullWidth = c.options.fullWidth, c.position = c.options.position, c.weight = c.options.weight, a.layoutService.addBox(b, c)
						})
					}
				}
			}
		}, {
			25: 25,
			45: 45
		}],
		34: [function(a, b, c) {
			"use strict";
			var d = a(45);
			b.exports = {
				generators: {
					linear: function(a, b) {
						var c, e = [];
						if(a.stepSize && a.stepSize > 0) c = a.stepSize;
						else {
							var f = d.niceNum(b.max - b.min, !1);
							c = d.niceNum(f / (a.maxTicks - 1), !0)
						}
						var g = Math.floor(b.min / c) * c,
							h = Math.ceil(b.max / c) * c;
						a.min && a.max && a.stepSize && d.almostWhole((a.max - a.min) / a.stepSize, c / 1e3) && (g = a.min, h = a.max);
						var i = (h - g) / c;
						i = d.almostEquals(i, Math.round(i), c / 1e3) ? Math.round(i) : Math.ceil(i), e.push(void 0 !== a.min ? a.min : g);
						for(var j = 1; j < i; ++j) e.push(g + j * c);
						return e.push(void 0 !== a.max ? a.max : h), e
					},
					logarithmic: function(a, b) {
						var c, e, f = [],
							g = d.valueOrDefault,
							h = g(a.min, Math.pow(10, Math.floor(d.log10(b.min)))),
							i = Math.floor(d.log10(b.max)),
							j = Math.ceil(b.max / Math.pow(10, i));
						0 === h ? (c = Math.floor(d.log10(b.minNotZero)), e = Math.floor(b.minNotZero / Math.pow(10, c)), f.push(h), h = e * Math.pow(10, c)) : (c = Math.floor(d.log10(h)), e = Math.floor(h / Math.pow(10, c)));
						do {
							f.push(h), ++e, 10 === e && (e = 1, ++c), h = e * Math.pow(10, c)
						} while (c < i || c === i && e < j);
						var k = g(a.max, h);
						return f.push(k), f
					}
				},
				formatters: {
					values: function(a) {
						return d.isArray(a) ? a : "" + a
					},
					linear: function(a, b, c) {
						var e = c.length > 3 ? c[2] - c[1] : c[1] - c[0];
						Math.abs(e) > 1 && a !== Math.floor(a) && (e = a - Math.floor(a));
						var f = d.log10(Math.abs(e)),
							g = "";
						if(0 !== a) {
							var h = -1 * Math.floor(f);
							h = Math.max(Math.min(h, 20), 0), g = a.toFixed(h)
						} else g = "0";
						return g
					},
					logarithmic: function(a, b, c) {
						var e = a / Math.pow(10, Math.floor(d.log10(a)));
						return 0 === a ? "0" : 1 === e || 2 === e || 5 === e || 0 === b || b === c.length - 1 ? a.toExponential() : ""
					}
				}
			}
		}, {
			45: 45
		}],
		35: [function(a, b, c) {
			"use strict";
			var d = a(25),
				e = a(26),
				f = a(45);
			d._set("global", {
				tooltips: {
					enabled: !0,
					custom: null,
					mode: "nearest",
					position: "average",
					intersect: !0,
					backgroundColor: "rgba(0,0,0,0.8)",
					titleFontStyle: "bold",
					titleSpacing: 2,
					titleMarginBottom: 6,
					titleFontColor: "#fff",
					titleAlign: "left",
					bodySpacing: 2,
					bodyFontColor: "#fff",
					bodyAlign: "left",
					footerFontStyle: "bold",
					footerSpacing: 2,
					footerMarginTop: 6,
					footerFontColor: "#fff",
					footerAlign: "left",
					yPadding: 6,
					xPadding: 6,
					caretPadding: 2,
					caretSize: 5,
					cornerRadius: 6,
					multiKeyBackground: "#fff",
					displayColors: !0,
					borderColor: "rgba(0,0,0,0)",
					borderWidth: 0,
					callbacks: {
						beforeTitle: f.noop,
						title: function(a, b) {
							var c = "",
								d = b.labels,
								e = d ? d.length : 0;
							if(a.length > 0) {
								var f = a[0];
								f.xLabel ? c = f.xLabel : e > 0 && f.index < e && (c = d[f.index])
							}
							return c
						},
						afterTitle: f.noop,
						beforeBody: f.noop,
						beforeLabel: f.noop,
						label: function(a, b) {
							var c = b.datasets[a.datasetIndex].label || "";
							return c && (c += ": "), c += a.yLabel
						},
						labelColor: function(a, b) {
							var c = b.getDatasetMeta(a.datasetIndex),
								d = c.data[a.index],
								e = d._view;
							return {
								borderColor: e.borderColor,
								backgroundColor: e.backgroundColor
							}
						},
						labelTextColor: function() {
							return this._options.bodyFontColor
						},
						afterLabel: f.noop,
						afterBody: f.noop,
						beforeFooter: f.noop,
						footer: f.noop,
						afterFooter: f.noop
					}
				}
			}), b.exports = function(a) {
				function b(a, b) {
					var c = f.color(a);
					return c.alpha(b * c.alpha()).rgbaString()
				}

				function c(a, b) {
					return b && (f.isArray(b) ? Array.prototype.push.apply(a, b) : a.push(b)), a
				}

				function g(a) {
					var b = a._xScale,
						c = a._yScale || a._scale,
						d = a._index,
						e = a._datasetIndex;
					return {
						xLabel: b ? b.getLabelForIndex(d, e) : "",
						yLabel: c ? c.getLabelForIndex(d, e) : "",
						index: d,
						datasetIndex: e,
						x: a._model.x,
						y: a._model.y
					}
				}

				function h(a) {
					var b = d.global,
						c = f.valueOrDefault;
					return {
						xPadding: a.xPadding,
						yPadding: a.yPadding,
						xAlign: a.xAlign,
						yAlign: a.yAlign,
						bodyFontColor: a.bodyFontColor,
						_bodyFontFamily: c(a.bodyFontFamily, b.defaultFontFamily),
						_bodyFontStyle: c(a.bodyFontStyle, b.defaultFontStyle),
						_bodyAlign: a.bodyAlign,
						bodyFontSize: c(a.bodyFontSize, b.defaultFontSize),
						bodySpacing: a.bodySpacing,
						titleFontColor: a.titleFontColor,
						_titleFontFamily: c(a.titleFontFamily, b.defaultFontFamily),
						_titleFontStyle: c(a.titleFontStyle, b.defaultFontStyle),
						titleFontSize: c(a.titleFontSize, b.defaultFontSize),
						_titleAlign: a.titleAlign,
						titleSpacing: a.titleSpacing,
						titleMarginBottom: a.titleMarginBottom,
						footerFontColor: a.footerFontColor,
						_footerFontFamily: c(a.footerFontFamily, b.defaultFontFamily),
						_footerFontStyle: c(a.footerFontStyle, b.defaultFontStyle),
						footerFontSize: c(a.footerFontSize, b.defaultFontSize),
						_footerAlign: a.footerAlign,
						footerSpacing: a.footerSpacing,
						footerMarginTop: a.footerMarginTop,
						caretSize: a.caretSize,
						cornerRadius: a.cornerRadius,
						backgroundColor: a.backgroundColor,
						opacity: 0,
						legendColorBackground: a.multiKeyBackground,
						displayColors: a.displayColors,
						borderColor: a.borderColor,
						borderWidth: a.borderWidth
					}
				}

				function i(a, b) {
					var c = a._chart.ctx,
						d = 2 * b.yPadding,
						e = 0,
						g = b.body,
						h = g.reduce(function(a, b) {
							return a + b.before.length + b.lines.length + b.after.length
						}, 0);
					h += b.beforeBody.length + b.afterBody.length;
					var i = b.title.length,
						j = b.footer.length,
						k = b.titleFontSize,
						l = b.bodyFontSize,
						m = b.footerFontSize;
					d += i * k, d += i ? (i - 1) * b.titleSpacing : 0, d += i ? b.titleMarginBottom : 0, d += h * l, d += h ? (h - 1) * b.bodySpacing : 0, d += j ? b.footerMarginTop : 0, d += j * m, d += j ? (j - 1) * b.footerSpacing : 0;
					var n = 0,
						o = function(a) {
							e = Math.max(e, c.measureText(a).width + n)
						};
					return c.font = f.fontString(k, b._titleFontStyle, b._titleFontFamily), f.each(b.title, o), c.font = f.fontString(l, b._bodyFontStyle, b._bodyFontFamily), f.each(b.beforeBody.concat(b.afterBody), o), n = b.displayColors ? l + 2 : 0, f.each(g, function(a) {
						f.each(a.before, o), f.each(a.lines, o), f.each(a.after, o)
					}), n = 0, c.font = f.fontString(m, b._footerFontStyle, b._footerFontFamily), f.each(b.footer, o), e += 2 * b.xPadding, {
						width: e,
						height: d
					}
				}

				function j(a, b) {
					var c = a._model,
						d = a._chart,
						e = a._chart.chartArea,
						f = "center",
						g = "center";
					c.y < b.height ? g = "top" : c.y > d.height - b.height && (g = "bottom");
					var h, i, j, k, l, m = (e.left + e.right) / 2,
						n = (e.top + e.bottom) / 2;
					"center" === g ? (h = function(a) {
						return a <= m
					}, i = function(a) {
						return a > m
					}) : (h = function(a) {
						return a <= b.width / 2
					}, i = function(a) {
						return a >= d.width - b.width / 2
					}), j = function(a) {
						return a + b.width > d.width
					}, k = function(a) {
						return a - b.width < 0
					}, l = function(a) {
						return a <= n ? "top" : "bottom"
					}, h(c.x) ? (f = "left", j(c.x) && (f = "center", g = l(c.y))) : i(c.x) && (f = "right", k(c.x) && (f = "center", g = l(c.y)));
					var o = a._options;
					return {
						xAlign: o.xAlign ? o.xAlign : f,
						yAlign: o.yAlign ? o.yAlign : g
					}
				}

				function k(a, b, c) {
					var d = a.x,
						e = a.y,
						f = a.caretSize,
						g = a.caretPadding,
						h = a.cornerRadius,
						i = c.xAlign,
						j = c.yAlign,
						k = f + g,
						l = h + g;
					return "right" === i ? d -= b.width : "center" === i && (d -= b.width / 2), "top" === j ? e += k : e -= "bottom" === j ? b.height + k : b.height / 2, "center" === j ? "left" === i ? d += k : "right" === i && (d -= k) : "left" === i ? d -= l : "right" === i && (d += l), {
						x: d,
						y: e
					}
				}
				a.Tooltip = e.extend({
					initialize: function() {
						this._model = h(this._options)
					},
					getTitle: function() {
						var a = this,
							b = a._options,
							d = b.callbacks,
							e = d.beforeTitle.apply(a, arguments),
							f = d.title.apply(a, arguments),
							g = d.afterTitle.apply(a, arguments),
							h = [];
						return h = c(h, e), h = c(h, f), h = c(h, g)
					},
					getBeforeBody: function() {
						var a = this._options.callbacks.beforeBody.apply(this, arguments);
						return f.isArray(a) ? a : void 0 !== a ? [a] : []
					},
					getBody: function(a, b) {
						var d = this,
							e = d._options.callbacks,
							g = [];
						return f.each(a, function(a) {
							var f = {
								before: [],
								lines: [],
								after: []
							};
							c(f.before, e.beforeLabel.call(d, a, b)), c(f.lines, e.label.call(d, a, b)), c(f.after, e.afterLabel.call(d, a, b)), g.push(f)
						}), g
					},
					getAfterBody: function() {
						var a = this._options.callbacks.afterBody.apply(this, arguments);
						return f.isArray(a) ? a : void 0 !== a ? [a] : []
					},
					getFooter: function() {
						var a = this,
							b = a._options.callbacks,
							d = b.beforeFooter.apply(a, arguments),
							e = b.footer.apply(a, arguments),
							f = b.afterFooter.apply(a, arguments),
							g = [];
						return g = c(g, d), g = c(g, e), g = c(g, f)
					},
					update: function(b) {
						var c, d, e = this,
							l = e._options,
							m = e._model,
							n = e._model = h(l),
							o = e._active,
							p = e._data,
							q = {
								xAlign: m.xAlign,
								yAlign: m.yAlign
							},
							r = {
								x: m.x,
								y: m.y
							},
							s = {
								width: m.width,
								height: m.height
							},
							t = {
								x: m.caretX,
								y: m.caretY
							};
						if(o.length) {
							n.opacity = 1;
							var u = [],
								v = [];
							t = a.Tooltip.positioners[l.position](o, e._eventPosition);
							var w = [];
							for(c = 0, d = o.length; c < d; ++c) w.push(g(o[c]));
							l.filter && (w = w.filter(function(a) {
								return l.filter(a, p)
							})), l.itemSort && (w = w.sort(function(a, b) {
								return l.itemSort(a, b, p)
							})), f.each(w, function(a) {
								u.push(l.callbacks.labelColor.call(e, a, e._chart)), v.push(l.callbacks.labelTextColor.call(e, a, e._chart))
							}), n.title = e.getTitle(w, p), n.beforeBody = e.getBeforeBody(w, p), n.body = e.getBody(w, p), n.afterBody = e.getAfterBody(w, p), n.footer = e.getFooter(w, p), n.x = Math.round(t.x), n.y = Math.round(t.y), n.caretPadding = l.caretPadding, n.labelColors = u, n.labelTextColors = v, n.dataPoints = w, s = i(this, n), q = j(this, s), r = k(n, s, q)
						} else n.opacity = 0;
						return n.xAlign = q.xAlign, n.yAlign = q.yAlign, n.x = r.x, n.y = r.y, n.width = s.width, n.height = s.height, n.caretX = t.x, n.caretY = t.y, e._model = n, b && l.custom && l.custom.call(e, n), e
					},
					drawCaret: function(a, b) {
						var c = this._chart.ctx,
							d = this._view,
							e = this.getCaretPosition(a, b, d);
						c.lineTo(e.x1, e.y1), c.lineTo(e.x2, e.y2), c.lineTo(e.x3, e.y3)
					},
					getCaretPosition: function(a, b, c) {
						var d, e, f, g, h, i, j = c.caretSize,
							k = c.cornerRadius,
							l = c.xAlign,
							m = c.yAlign,
							n = a.x,
							o = a.y,
							p = b.width,
							q = b.height;
						if("center" === m) h = o + q / 2, "left" === l ? (d = n, e = d - j, f = d, g = h + j, i = h - j) : (d = n + p, e = d + j, f = d, g = h - j, i = h + j);
						else if("left" === l ? (e = n + k + j, d = e - j, f = e + j) : "right" === l ? (e = n + p - k - j, d = e - j, f = e + j) : (e = n + p / 2, d = e - j, f = e + j), "top" === m) g = o, h = g - j, i = g;
						else {
							g = o + q, h = g + j, i = g;
							var r = f;
							f = d, d = r
						}
						return {
							x1: d,
							x2: e,
							x3: f,
							y1: g,
							y2: h,
							y3: i
						}
					},
					drawTitle: function(a, c, d, e) {
						var g = c.title;
						if(g.length) {
							d.textAlign = c._titleAlign, d.textBaseline = "top";
							var h = c.titleFontSize,
								i = c.titleSpacing;
							d.fillStyle = b(c.titleFontColor, e), d.font = f.fontString(h, c._titleFontStyle, c._titleFontFamily);
							var j, k;
							for(j = 0, k = g.length; j < k; ++j) d.fillText(g[j], a.x, a.y), a.y += h + i, j + 1 === g.length && (a.y += c.titleMarginBottom - i)
						}
					},
					drawBody: function(a, c, d, e) {
						var g = c.bodyFontSize,
							h = c.bodySpacing,
							i = c.body;
						d.textAlign = c._bodyAlign, d.textBaseline = "top", d.font = f.fontString(g, c._bodyFontStyle, c._bodyFontFamily);
						var j = 0,
							k = function(b) {
								d.fillText(b, a.x + j, a.y), a.y += g + h
							};
						f.each(c.beforeBody, k);
						var l = c.displayColors;
						j = l ? g + 2 : 0, f.each(i, function(h, i) {
							f.each(h.before, k), f.each(h.lines, function(f) {
								if(l) {
									d.fillStyle = b(c.legendColorBackground, e), d.fillRect(a.x, a.y, g, g), d.lineWidth = 1, d.strokeStyle = b(c.labelColors[i].borderColor, e), d.strokeRect(a.x, a.y, g, g), d.fillStyle = b(c.labelColors[i].backgroundColor, e), d.fillRect(a.x + 1, a.y + 1, g - 2, g - 2);
									var h = b(c.labelTextColors[i], e);
									d.fillStyle = h
								}
								k(f)
							}), f.each(h.after, k)
						}), j = 0, f.each(c.afterBody, k), a.y -= h
					},
					drawFooter: function(a, c, d, e) {
						var g = c.footer;
						g.length && (a.y += c.footerMarginTop, d.textAlign = c._footerAlign, d.textBaseline = "top", d.fillStyle = b(c.footerFontColor, e), d.font = f.fontString(c.footerFontSize, c._footerFontStyle, c._footerFontFamily), f.each(g, function(b) {
							d.fillText(b, a.x, a.y), a.y += c.footerFontSize + c.footerSpacing
						}))
					},
					drawBackground: function(a, c, d, e, f) {
						d.fillStyle = b(c.backgroundColor, f), d.strokeStyle = b(c.borderColor, f), d.lineWidth = c.borderWidth;
						var g = c.xAlign,
							h = c.yAlign,
							i = a.x,
							j = a.y,
							k = e.width,
							l = e.height,
							m = c.cornerRadius;
						d.beginPath(), d.moveTo(i + m, j), "top" === h && this.drawCaret(a, e), d.lineTo(i + k - m, j), d.quadraticCurveTo(i + k, j, i + k, j + m), "center" === h && "right" === g && this.drawCaret(a, e), d.lineTo(i + k, j + l - m), d.quadraticCurveTo(i + k, j + l, i + k - m, j + l), "bottom" === h && this.drawCaret(a, e), d.lineTo(i + m, j + l), d.quadraticCurveTo(i, j + l, i, j + l - m), "center" === h && "left" === g && this.drawCaret(a, e), d.lineTo(i, j + m), d.quadraticCurveTo(i, j, i + m, j), d.closePath(), d.fill(), c.borderWidth > 0 && d.stroke()
					},
					draw: function() {
						var a = this._chart.ctx,
							b = this._view;
						if(0 !== b.opacity) {
							var c = {
									width: b.width,
									height: b.height
								},
								d = {
									x: b.x,
									y: b.y
								},
								e = Math.abs(b.opacity < .001) ? 0 : b.opacity,
								f = b.title.length || b.beforeBody.length || b.body.length || b.afterBody.length || b.footer.length;
							this._options.enabled && f && (this.drawBackground(d, b, a, c, e), d.x += b.xPadding, d.y += b.yPadding, this.drawTitle(d, b, a, e), this.drawBody(d, b, a, e), this.drawFooter(d, b, a, e))
						}
					},
					handleEvent: function(a) {
						var b = this,
							c = b._options,
							d = !1;
						if(b._lastActive = b._lastActive || [], "mouseout" === a.type ? b._active = [] : b._active = b._chart.getElementsAtEventForMode(a, c.mode, c), !(d = !f.arrayEquals(b._active, b._lastActive))) return !1;
						if(b._lastActive = b._active, c.enabled || c.custom) {
							b._eventPosition = {
								x: a.x,
								y: a.y
							};
							var e = b._model;
							b.update(!0), b.pivot(), d |= e.x !== b._model.x || e.y !== b._model.y
						}
						return d
					}
				}), a.Tooltip.positioners = {
					average: function(a) {
						if(!a.length) return !1;
						var b, c, d = 0,
							e = 0,
							f = 0;
						for(b = 0, c = a.length; b < c; ++b) {
							var g = a[b];
							if(g && g.hasValue()) {
								var h = g.tooltipPosition();
								d += h.x, e += h.y, ++f
							}
						}
						return {
							x: Math.round(d / f),
							y: Math.round(e / f)
						}
					},
					nearest: function(a, b) {
						var c, d, e, g = b.x,
							h = b.y,
							i = Number.POSITIVE_INFINITY;
						for(c = 0, d = a.length; c < d; ++c) {
							var j = a[c];
							if(j && j.hasValue()) {
								var k = j.getCenterPoint(),
									l = f.distanceBetweenPoints(b, k);
								l < i && (i = l, e = j)
							}
						}
						if(e) {
							var m = e.tooltipPosition();
							g = m.x, h = m.y
						}
						return {
							x: g,
							y: h
						}
					}
				}
			}
		}, {
			25: 25,
			26: 26,
			45: 45
		}],
		36: [function(a, b, c) {
			"use strict";
			var d = a(25),
				e = a(26),
				f = a(45);
			d._set("global", {
				elements: {
					arc: {
						backgroundColor: d.global.defaultColor,
						borderColor: "#fff",
						borderWidth: 2
					}
				}
			}), b.exports = e.extend({
				inLabelRange: function(a) {
					var b = this._view;
					return !!b && Math.pow(a - b.x, 2) < Math.pow(b.radius + b.hoverRadius, 2)
				},
				inRange: function(a, b) {
					var c = this._view;
					if(c) {
						for(var d = f.getAngleFromPoint(c, {
								x: a,
								y: b
							}), e = d.angle, g = d.distance, h = c.startAngle, i = c.endAngle; i < h;) i += 2 * Math.PI;
						for(; e > i;) e -= 2 * Math.PI;
						for(; e < h;) e += 2 * Math.PI;
						var j = e >= h && e <= i,
							k = g >= c.innerRadius && g <= c.outerRadius;
						return j && k
					}
					return !1
				},
				getCenterPoint: function() {
					var a = this._view,
						b = (a.startAngle + a.endAngle) / 2,
						c = (a.innerRadius + a.outerRadius) / 2;
					return {
						x: a.x + Math.cos(b) * c,
						y: a.y + Math.sin(b) * c
					}
				},
				getArea: function() {
					var a = this._view;
					return Math.PI * ((a.endAngle - a.startAngle) / (2 * Math.PI)) * (Math.pow(a.outerRadius, 2) - Math.pow(a.innerRadius, 2))
				},
				tooltipPosition: function() {
					var a = this._view,
						b = a.startAngle + (a.endAngle - a.startAngle) / 2,
						c = (a.outerRadius - a.innerRadius) / 2 + a.innerRadius;
					return {
						x: a.x + Math.cos(b) * c,
						y: a.y + Math.sin(b) * c
					}
				},
				draw: function() {
					var a = this._chart.ctx,
						b = this._view,
						c = b.startAngle,
						d = b.endAngle;
					a.beginPath(), a.arc(b.x, b.y, b.outerRadius, c, d), a.arc(b.x, b.y, b.innerRadius, d, c, !0), a.closePath(), a.strokeStyle = b.borderColor, a.lineWidth = b.borderWidth, a.fillStyle = b.backgroundColor, a.fill(), a.lineJoin = "bevel", b.borderWidth && a.stroke()
				}
			})
		}, {
			25: 25,
			26: 26,
			45: 45
		}],
		37: [function(a, b, c) {
			"use strict";
			var d = a(25),
				e = a(26),
				f = a(45),
				g = d.global;
			d._set("global", {
				elements: {
					line: {
						tension: .4,
						backgroundColor: g.defaultColor,
						borderWidth: 3,
						borderColor: g.defaultColor,
						borderCapStyle: "butt",
						borderDash: [],
						borderDashOffset: 0,
						borderJoinStyle: "miter",
						capBezierPoints: !0,
						fill: !0
					}
				}
			}), b.exports = e.extend({
				draw: function() {
					var a, b, c, d, e = this,
						h = e._view,
						i = e._chart.ctx,
						j = h.spanGaps,
						k = e._children.slice(),
						l = g.elements.line,
						m = -1;
					for(e._loop && k.length && k.push(k[0]), i.save(), i.lineCap = h.borderCapStyle || l.borderCapStyle, i.setLineDash && i.setLineDash(h.borderDash || l.borderDash), i.lineDashOffset = h.borderDashOffset || l.borderDashOffset, i.lineJoin = h.borderJoinStyle || l.borderJoinStyle, i.lineWidth = h.borderWidth || l.borderWidth, i.strokeStyle = h.borderColor || g.defaultColor, i.beginPath(), m = -1, a = 0; a < k.length; ++a) b = k[a], c = f.previousItem(k, a), d = b._view, 0 === a ? d.skip || (i.moveTo(d.x, d.y), m = a) : (c = -1 === m ? c : k[m], d.skip || (m !== a - 1 && !j || -1 === m ? i.moveTo(d.x, d.y) : f.canvas.lineTo(i, c._view, b._view), m = a));
					i.stroke(), i.restore()
				}
			})
		}, {
			25: 25,
			26: 26,
			45: 45
		}],
		38: [function(a, b, c) {
			"use strict";

			function d(a) {
				var b = this._view;
				return !!b && Math.pow(a - b.x, 2) < Math.pow(b.radius + b.hitRadius, 2)
			}

			function e(a) {
				var b = this._view;
				return !!b && Math.pow(a - b.y, 2) < Math.pow(b.radius + b.hitRadius, 2)
			}
			var f = a(25),
				g = a(26),
				h = a(45),
				i = f.global.defaultColor;
			f._set("global", {
				elements: {
					point: {
						radius: 3,
						pointStyle: "circle",
						backgroundColor: i,
						borderColor: i,
						borderWidth: 1,
						hitRadius: 1,
						hoverRadius: 4,
						hoverBorderWidth: 1
					}
				}
			}), b.exports = g.extend({
				inRange: function(a, b) {
					var c = this._view;
					return !!c && Math.pow(a - c.x, 2) + Math.pow(b - c.y, 2) < Math.pow(c.hitRadius + c.radius, 2)
				},
				inLabelRange: d,
				inXRange: d,
				inYRange: e,
				getCenterPoint: function() {
					var a = this._view;
					return {
						x: a.x,
						y: a.y
					}
				},
				getArea: function() {
					return Math.PI * Math.pow(this._view.radius, 2)
				},
				tooltipPosition: function() {
					var a = this._view;
					return {
						x: a.x,
						y: a.y,
						padding: a.radius + a.borderWidth
					}
				},
				draw: function(a) {
					var b = this._view,
						c = this._model,
						d = this._chart.ctx,
						e = b.pointStyle,
						g = b.radius,
						j = b.x,
						k = b.y,
						l = h.color,
						m = 0;
					b.skip || (d.strokeStyle = b.borderColor || i, d.lineWidth = h.valueOrDefault(b.borderWidth, f.global.elements.point.borderWidth), d.fillStyle = b.backgroundColor || i, void 0 !== a && (c.x < a.left || 1.01 * a.right < c.x || c.y < a.top || 1.01 * a.bottom < c.y) && (c.x < a.left ? m = (j - c.x) / (a.left - c.x) : 1.01 * a.right < c.x ? m = (c.x - j) / (c.x - a.right) : c.y < a.top ? m = (k - c.y) / (a.top - c.y) : 1.01 * a.bottom < c.y && (m = (c.y - k) / (c.y - a.bottom)), m = Math.round(100 * m) / 100, d.strokeStyle = l(d.strokeStyle).alpha(m).rgbString(), d.fillStyle = l(d.fillStyle).alpha(m).rgbString()), h.canvas.drawPoint(d, e, g, j, k))
				}
			})
		}, {
			25: 25,
			26: 26,
			45: 45
		}],
		39: [function(a, b, c) {
			"use strict";

			function d(a) {
				return void 0 !== a._view.width
			}

			function e(a) {
				var b, c, e, f, g = a._view;
				if(d(a)) {
					var h = g.width / 2;
					b = g.x - h, c = g.x + h, e = Math.min(g.y, g.base), f = Math.max(g.y, g.base)
				} else {
					var i = g.height / 2;
					b = Math.min(g.x, g.base), c = Math.max(g.x, g.base), e = g.y - i, f = g.y + i
				}
				return {
					left: b,
					top: e,
					right: c,
					bottom: f
				}
			}
			var f = a(25),
				g = a(26);
			f._set("global", {
				elements: {
					rectangle: {
						backgroundColor: f.global.defaultColor,
						borderColor: f.global.defaultColor,
						borderSkipped: "bottom",
						borderWidth: 0
					}
				}
			}), b.exports = g.extend({
				draw: function() {
					function a(a) {
						return r[(t + a) % 4]
					}
					var b, c, d, e, f, g, h, i = this._chart.ctx,
						j = this._view,
						k = j.borderWidth;
					if(j.horizontal ? (b = j.base, c = j.x, d = j.y - j.height / 2, e = j.y + j.height / 2, f = c > b ? 1 : -1, g = 1, h = j.borderSkipped || "left") : (b = j.x - j.width / 2, c = j.x + j.width / 2, d = j.y, e = j.base, f = 1, g = e > d ? 1 : -1, h = j.borderSkipped || "bottom"), k) {
						var l = Math.min(Math.abs(b - c), Math.abs(d - e));
						k = k > l ? l : k;
						var m = k / 2,
							n = b + ("left" !== h ? m * f : 0),
							o = c + ("right" !== h ? -m * f : 0),
							p = d + ("top" !== h ? m * g : 0),
							q = e + ("bottom" !== h ? -m * g : 0);
						n !== o && (d = p, e = q), p !== q && (b = n, c = o)
					}
					i.beginPath(), i.fillStyle = j.backgroundColor, i.strokeStyle = j.borderColor, i.lineWidth = k;
					var r = [
							[b, e],
							[b, d],
							[c, d],
							[c, e]
						],
						s = ["bottom", "left", "top", "right"],
						t = s.indexOf(h, 0); - 1 === t && (t = 0);
					var u = a(0);
					i.moveTo(u[0], u[1]);
					for(var v = 1; v < 4; v++) u = a(v), i.lineTo(u[0], u[1]);
					i.fill(), k && i.stroke()
				},
				height: function() {
					var a = this._view;
					return a.base - a.y
				},
				inRange: function(a, b) {
					var c = !1;
					if(this._view) {
						var d = e(this);
						c = a >= d.left && a <= d.right && b >= d.top && b <= d.bottom
					}
					return c
				},
				inLabelRange: function(a, b) {
					var c = this;
					if(!c._view) return !1;
					var f = e(c);
					return d(c) ? a >= f.left && a <= f.right : b >= f.top && b <= f.bottom
				},
				inXRange: function(a) {
					var b = e(this);
					return a >= b.left && a <= b.right
				},
				inYRange: function(a) {
					var b = e(this);
					return a >= b.top && a <= b.bottom
				},
				getCenterPoint: function() {
					var a, b, c = this._view;
					return d(this) ? (a = c.x, b = (c.y + c.base) / 2) : (a = (c.x + c.base) / 2, b = c.y), {
						x: a,
						y: b
					}
				},
				getArea: function() {
					var a = this._view;
					return a.width * Math.abs(a.y - a.base)
				},
				tooltipPosition: function() {
					var a = this._view;
					return {
						x: a.x,
						y: a.y
					}
				}
			})
		}, {
			25: 25,
			26: 26
		}],
		40: [function(a, b, c) {
			"use strict";
			b.exports = {}, b.exports.Arc = a(36), b.exports.Line = a(37), b.exports.Point = a(38), b.exports.Rectangle = a(39)
		}, {
			36: 36,
			37: 37,
			38: 38,
			39: 39
		}],
		41: [function(a, b, c) {
			"use strict";
			var d = a(42),
				c = b.exports = {
					clear: function(a) {
						a.ctx.clearRect(0, 0, a.width, a.height)
					},
					roundedRect: function(a, b, c, d, e, f) {
						if(f) {
							var g = Math.min(f, d / 2),
								h = Math.min(f, e / 2);
							a.moveTo(b + g, c), a.lineTo(b + d - g, c), a.quadraticCurveTo(b + d, c, b + d, c + h), a.lineTo(b + d, c + e - h), a.quadraticCurveTo(b + d, c + e, b + d - g, c + e), a.lineTo(b + g, c + e), a.quadraticCurveTo(b, c + e, b, c + e - h), a.lineTo(b, c + h), a.quadraticCurveTo(b, c, b + g, c)
						} else a.rect(b, c, d, e)
					},
					drawPoint: function(a, b, c, d, e) {
						var f, g, h, i, j, k;
						if("object" == typeof b && ("[object HTMLImageElement]" === (f = b.toString()) || "[object HTMLCanvasElement]" === f)) return void a.drawImage(b, d - b.width / 2, e - b.height / 2, b.width, b.height);
						if(!(isNaN(c) || c <= 0)) {
							switch(b) {
								default: a.beginPath(),
								a.arc(d, e, c, 0, 2 * Math.PI),
								a.closePath(),
								a.fill();
								break;
								case "triangle":
										a.beginPath(),
									g = 3 * c / Math.sqrt(3),
									j = g * Math.sqrt(3) / 2,
									a.moveTo(d - g / 2, e + j / 3),
									a.lineTo(d + g / 2, e + j / 3),
									a.lineTo(d, e - 2 * j / 3),
									a.closePath(),
									a.fill();
									break;
								case "rect":
										k = 1 / Math.SQRT2 * c,
									a.beginPath(),
									a.fillRect(d - k, e - k, 2 * k, 2 * k),
									a.strokeRect(d - k, e - k, 2 * k, 2 * k);
									break;
								case "rectRounded":
										var l = c / Math.SQRT2,
										m = d - l,
										n = e - l,
										o = Math.SQRT2 * c;a.beginPath(),
									this.roundedRect(a, m, n, o, o, c / 2),
									a.closePath(),
									a.fill();
									break;
								case "rectRot":
										k = 1 / Math.SQRT2 * c,
									a.beginPath(),
									a.moveTo(d - k, e),
									a.lineTo(d, e + k),
									a.lineTo(d + k, e),
									a.lineTo(d, e - k),
									a.closePath(),
									a.fill();
									break;
								case "cross":
										a.beginPath(),
									a.moveTo(d, e + c),
									a.lineTo(d, e - c),
									a.moveTo(d - c, e),
									a.lineTo(d + c, e),
									a.closePath();
									break;
								case "crossRot":
										a.beginPath(),
									h = Math.cos(Math.PI / 4) * c,
									i = Math.sin(Math.PI / 4) * c,
									a.moveTo(d - h, e - i),
									a.lineTo(d + h, e + i),
									a.moveTo(d - h, e + i),
									a.lineTo(d + h, e - i),
									a.closePath();
									break;
								case "star":
										a.beginPath(),
									a.moveTo(d, e + c),
									a.lineTo(d, e - c),
									a.moveTo(d - c, e),
									a.lineTo(d + c, e),
									h = Math.cos(Math.PI / 4) * c,
									i = Math.sin(Math.PI / 4) * c,
									a.moveTo(d - h, e - i),
									a.lineTo(d + h, e + i),
									a.moveTo(d - h, e + i),
									a.lineTo(d + h, e - i),
									a.closePath();
									break;
								case "line":
										a.beginPath(),
									a.moveTo(d - c, e),
									a.lineTo(d + c, e),
									a.closePath();
									break;
								case "dash":
										a.beginPath(),
									a.moveTo(d, e),
									a.lineTo(d + c, e),
									a.closePath()
							}
							a.stroke()
						}
					},
					clipArea: function(a, b) {
						a.save(), a.beginPath(), a.rect(b.left, b.top, b.right - b.left, b.bottom - b.top), a.clip()
					},
					unclipArea: function(a) {
						a.restore()
					},
					lineTo: function(a, b, c, d) {
						return c.steppedLine ? ("after" === c.steppedLine && !d || "after" !== c.steppedLine && d ? a.lineTo(b.x, c.y) : a.lineTo(c.x, b.y), void a.lineTo(c.x, c.y)) : c.tension ? void a.bezierCurveTo(d ? b.controlPointPreviousX : b.controlPointNextX, d ? b.controlPointPreviousY : b.controlPointNextY, d ? c.controlPointNextX : c.controlPointPreviousX, d ? c.controlPointNextY : c.controlPointPreviousY, c.x, c.y) : void a.lineTo(c.x, c.y)
					}
				};
			d.clear = c.clear, d.drawRoundedRectangle = function(a) {
				a.beginPath(), c.roundedRect.apply(c, arguments), a.closePath()
			}
		}, {
			42: 42
		}],
		42: [function(a, b, c) {
			"use strict";
			var d = {
				noop: function() {},
				uid: function() {
					var a = 0;
					return function() {
						return a++
					}
				}(),
				isNullOrUndef: function(a) {
					return null === a || void 0 === a
				},
				isArray: Array.isArray ? Array.isArray : function(a) {
					return "[object Array]" === Object.prototype.toString.call(a)
				},
				isObject: function(a) {
					return null !== a && "[object Object]" === Object.prototype.toString.call(a)
				},
				valueOrDefault: function(a, b) {
					return void 0 === a ? b : a
				},
				valueAtIndexOrDefault: function(a, b, c) {
					return d.valueOrDefault(d.isArray(a) ? a[b] : a, c)
				},
				callback: function(a, b, c) {
					if(a && "function" == typeof a.call) return a.apply(c, b)
				},
				each: function(a, b, c, e) {
					var f, g, h;
					if(d.isArray(a))
						if(g = a.length, e)
							for(f = g - 1; f >= 0; f--) b.call(c, a[f], f);
						else
							for(f = 0; f < g; f++) b.call(c, a[f], f);
					else if(d.isObject(a))
						for(h = Object.keys(a), g = h.length, f = 0; f < g; f++) b.call(c, a[h[f]], h[f])
				},
				arrayEquals: function(a, b) {
					var c, e, f, g;
					if(!a || !b || a.length !== b.length) return !1;
					for(c = 0, e = a.length; c < e; ++c)
						if(f = a[c], g = b[c], f instanceof Array && g instanceof Array) {
							if(!d.arrayEquals(f, g)) return !1
						} else if(f !== g) return !1;
					return !0
				},
				clone: function(a) {
					if(d.isArray(a)) return a.map(d.clone);
					if(d.isObject(a)) {
						for(var b = {}, c = Object.keys(a), e = c.length, f = 0; f < e; ++f) b[c[f]] = d.clone(a[c[f]]);
						return b
					}
					return a
				},
				_merger: function(a, b, c, e) {
					var f = b[a],
						g = c[a];
					d.isObject(f) && d.isObject(g) ? d.merge(f, g, e) : b[a] = d.clone(g)
				},
				_mergerIf: function(a, b, c) {
					var e = b[a],
						f = c[a];
					d.isObject(e) && d.isObject(f) ? d.mergeIf(e, f) : b.hasOwnProperty(a) || (b[a] = d.clone(f))
				},
				merge: function(a, b, c) {
					var e, f, g, h, i, j = d.isArray(b) ? b : [b],
						k = j.length;
					if(!d.isObject(a)) return a;
					for(c = c || {}, e = c.merger || d._merger, f = 0; f < k; ++f)
						if(b = j[f], d.isObject(b))
							for(g = Object.keys(b), i = 0, h = g.length; i < h; ++i) e(g[i], a, b, c);
					return a
				},
				mergeIf: function(a, b) {
					return d.merge(a, b, {
						merger: d._mergerIf
					})
				}
			};
			b.exports = d, d.callCallback = d.callback, d.indexOf = function(a, b, c) {
				return Array.prototype.indexOf.call(a, b, c)
			}, d.getValueOrDefault = d.valueOrDefault, d.getValueAtIndexOrDefault = d.valueAtIndexOrDefault
		}, {}],
		43: [function(a, b, c) {
			"use strict";
			var d = a(42),
				e = {
					linear: function(a) {
						return a
					},
					easeInQuad: function(a) {
						return a * a
					},
					easeOutQuad: function(a) {
						return -a * (a - 2)
					},
					easeInOutQuad: function(a) {
						return(a /= .5) < 1 ? .5 * a * a : -.5 * (--a * (a - 2) - 1)
					},
					easeInCubic: function(a) {
						return a * a * a
					},
					easeOutCubic: function(a) {
						return(a -= 1) * a * a + 1
					},
					easeInOutCubic: function(a) {
						return(a /= .5) < 1 ? .5 * a * a * a : .5 * ((a -= 2) * a * a + 2)
					},
					easeInQuart: function(a) {
						return a * a * a * a
					},
					easeOutQuart: function(a) {
						return -((a -= 1) * a * a * a - 1)
					},
					easeInOutQuart: function(a) {
						return(a /= .5) < 1 ? .5 * a * a * a * a : -.5 * ((a -= 2) * a * a * a - 2)
					},
					easeInQuint: function(a) {
						return a * a * a * a * a
					},
					easeOutQuint: function(a) {
						return(a -= 1) * a * a * a * a + 1
					},
					easeInOutQuint: function(a) {
						return(a /= .5) < 1 ? .5 * a * a * a * a * a : .5 * ((a -= 2) * a * a * a * a + 2)
					},
					easeInSine: function(a) {
						return 1 - Math.cos(a * (Math.PI / 2))
					},
					easeOutSine: function(a) {
						return Math.sin(a * (Math.PI / 2))
					},
					easeInOutSine: function(a) {
						return -.5 * (Math.cos(Math.PI * a) - 1)
					},
					easeInExpo: function(a) {
						return 0 === a ? 0 : Math.pow(2, 10 * (a - 1))
					},
					easeOutExpo: function(a) {
						return 1 === a ? 1 : 1 - Math.pow(2, -10 * a)
					},
					easeInOutExpo: function(a) {
						return 0 === a ? 0 : 1 === a ? 1 : (a /= .5) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -10 * --a))
					},
					easeInCirc: function(a) {
						return a >= 1 ? a : -(Math.sqrt(1 - a * a) - 1)
					},
					easeOutCirc: function(a) {
						return Math.sqrt(1 - (a -= 1) * a)
					},
					easeInOutCirc: function(a) {
						return(a /= .5) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
					},
					easeInElastic: function(a) {
						var b = 1.70158,
							c = 0,
							d = 1;
						return 0 === a ? 0 : 1 === a ? 1 : (c || (c = .3), d < 1 ? (d = 1, b = c / 4) : b = c / (2 * Math.PI) * Math.asin(1 / d), -d * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - b) * (2 * Math.PI) / c))
					},
					easeOutElastic: function(a) {
						var b = 1.70158,
							c = 0,
							d = 1;
						return 0 === a ? 0 : 1 === a ? 1 : (c || (c = .3), d < 1 ? (d = 1, b = c / 4) : b = c / (2 * Math.PI) * Math.asin(1 / d), d * Math.pow(2, -10 * a) * Math.sin((a - b) * (2 * Math.PI) / c) + 1)
					},
					easeInOutElastic: function(a) {
						var b = 1.70158,
							c = 0,
							d = 1;
						return 0 === a ? 0 : 2 == (a /= .5) ? 1 : (c || (c = .45), d < 1 ? (d = 1, b = c / 4) : b = c / (2 * Math.PI) * Math.asin(1 / d), a < 1 ? d * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - b) * (2 * Math.PI) / c) * -.5 : d * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - b) * (2 * Math.PI) / c) * .5 + 1)
					},
					easeInBack: function(a) {
						var b = 1.70158;
						return a * a * ((b + 1) * a - b)
					},
					easeOutBack: function(a) {
						var b = 1.70158;
						return(a -= 1) * a * ((b + 1) * a + b) + 1
					},
					easeInOutBack: function(a) {
						var b = 1.70158;
						return(a /= .5) < 1 ? a * a * ((1 + (b *= 1.525)) * a - b) * .5 : .5 * ((a -= 2) * a * ((1 + (b *= 1.525)) * a + b) + 2)
					},
					easeInBounce: function(a) {
						return 1 - e.easeOutBounce(1 - a)
					},
					easeOutBounce: function(a) {
						return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
					},
					easeInOutBounce: function(a) {
						return a < .5 ? .5 * e.easeInBounce(2 * a) : .5 * e.easeOutBounce(2 * a - 1) + .5
					}
				};
			b.exports = {
				effects: e
			}, d.easingEffects = e
		}, {
			42: 42
		}],
		44: [function(a, b, c) {
			"use strict";
			var d = a(42);
			b.exports = {
				toLineHeight: function(a, b) {
					var c = ("" + a).match(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);
					if(!c || "normal" === c[1]) return 1.2 * b;
					switch(a = +c[2], c[3]) {
						case "px":
							return a;
						case "%":
							a /= 100
					}
					return b * a
				},
				toPadding: function(a) {
					var b, c, e, f;
					return d.isObject(a) ? (b = +a.top || 0, c = +a.right || 0, e = +a.bottom || 0, f = +a.left || 0) : b = c = e = f = +a || 0, {
						top: b,
						right: c,
						bottom: e,
						left: f,
						height: b + e,
						width: f + c
					}
				},
				resolve: function(a, b, c) {
					var e, f, g;
					for(e = 0, f = a.length; e < f; ++e)
						if(void 0 !== (g = a[e]) && (void 0 !== b && "function" == typeof g && (g = g(b)), void 0 !== c && d.isArray(g) && (g = g[c]), void 0 !== g)) return g
				}
			}
		}, {
			42: 42
		}],
		45: [function(a, b, c) {
			"use strict";
			b.exports = a(42), b.exports.easing = a(43), b.exports.canvas = a(41), b.exports.options = a(44)
		}, {
			41: 41,
			42: 42,
			43: 43,
			44: 44
		}],
		46: [function(a, b, c) {
			b.exports = {
				acquireContext: function(a) {
					return a && a.canvas && (a = a.canvas), a && a.getContext("2d") || null
				}
			}
		}, {}],
		47: [function(a, b, c) {
			"use strict";

			function d(a, b) {
				var c = q.getStyle(a, b),
					d = c && c.match(/^(\d+)(\.\d+)?px$/);
				return d ? Number(d[1]) : void 0
			}

			function e(a, b) {
				var c = a.style,
					e = a.getAttribute("height"),
					f = a.getAttribute("width");
				if(a[r] = {
						initial: {
							height: e,
							width: f,
							style: {
								display: c.display,
								height: c.height,
								width: c.width
							}
						}
					}, c.display = c.display || "block", null === f || "" === f) {
					var g = d(a, "width");
					void 0 !== g && (a.width = g)
				}
				if(null === e || "" === e)
					if("" === a.style.height) a.height = a.width / (b.options.aspectRatio || 2);
					else {
						var h = d(a, "height");
						void 0 !== g && (a.height = h)
					}
				return a
			}

			function f(a, b, c) {
				a.addEventListener(b, c, y)
			}

			function g(a, b, c) {
				a.removeEventListener(b, c, y)
			}

			function h(a, b, c, d, e) {
				return {
					type: a,
					chart: b,
					native: e || null,
					x: void 0 !== c ? c : null,
					y: void 0 !== d ? d : null
				}
			}

			function i(a, b) {
				var c = w[a.type] || a.type,
					d = q.getRelativePosition(a, b);
				return h(c, b, d.x, d.y, a)
			}

			function j(a, b) {
				var c = !1,
					d = [];
				return function() {
					d = Array.prototype.slice.call(arguments), b = b || this, c || (c = !0, q.requestAnimFrame.call(window, function() {
						c = !1, a.apply(b, d)
					}))
				}
			}

			function k(a) {
				var b = document.createElement("div"),
					c = s + "size-monitor",
					d = "position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;";
				b.style.cssText = d, b.className = c, b.innerHTML = '<div class="' + c + '-expand" style="' + d + '"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="' + c + '-shrink" style="' + d + '"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div>';
				var e = b.childNodes[0],
					g = b.childNodes[1];
				b._reset = function() {
					e.scrollLeft = 1e6, e.scrollTop = 1e6, g.scrollLeft = 1e6, g.scrollTop = 1e6
				};
				var h = function() {
					b._reset(), a()
				};
				return f(e, "scroll", h.bind(e, "expand")), f(g, "scroll", h.bind(g, "shrink")), b
			}

			function l(a, b) {
				var c = a[r] || (a[r] = {}),
					d = c.renderProxy = function(a) {
						a.animationName === u && b()
					};
				q.each(v, function(b) {
					f(a, b, d)
				}), a.classList.add(t)
			}

			function m(a) {
				var b = a[r] || {},
					c = b.renderProxy;
				c && (q.each(v, function(b) {
					g(a, b, c)
				}), delete b.renderProxy), a.classList.remove(t)
			}

			function n(a, b, c) {
				var d = a[r] || (a[r] = {}),
					e = d.resizer = k(j(function() {
						if(d.resizer) return b(h("resize", c))
					}));
				l(a, function() {
					if(d.resizer) {
						var b = a.parentNode;
						b && b !== e.parentNode && b.insertBefore(e, b.firstChild), e._reset()
					}
				})
			}

			function o(a) {
				var b = a[r] || {},
					c = b.resizer;
				delete b.resizer, m(a), c && c.parentNode && c.parentNode.removeChild(c)
			}

			function p(a, b) {
				var c = a._style || document.createElement("style");
				a._style || (a._style = c, b = "/* Chart.js */\n" + b, c.setAttribute("type", "text/css"), document.getElementsByTagName("head")[0].appendChild(c)), c.appendChild(document.createTextNode(b))
			}
			var q = a(45),
				r = "$chartjs",
				s = "chartjs-",
				t = s + "render-monitor",
				u = s + "render-animation",
				v = ["animationstart", "webkitAnimationStart"],
				w = {
					touchstart: "mousedown",
					touchmove: "mousemove",
					touchend: "mouseup",
					pointerenter: "mouseenter",
					pointerdown: "mousedown",
					pointermove: "mousemove",
					pointerup: "mouseup",
					pointerleave: "mouseout",
					pointerout: "mouseout"
				},
				x = function() {
					var a = !1;
					try {
						var b = Object.defineProperty({}, "passive", {
							get: function() {
								a = !0
							}
						});
						window.addEventListener("e", null, b)
					} catch(a) {}
					return a
				}(),
				y = !!x && {
					passive: !0
				};
			b.exports = {
				_enabled: "undefined" != typeof window && "undefined" != typeof document,
				initialize: function() {
					var a = "from{opacity:0.99}to{opacity:1}";
					p(this, "@-webkit-keyframes " + u + "{" + a + "}@keyframes " + u + "{" + a + "}." + t + "{-webkit-animation:" + u + " 0.001s;animation:" + u + " 0.001s;}")
				},
				acquireContext: function(a, b) {
					"string" == typeof a ? a = document.getElementById(a) : a.length && (a = a[0]), a && a.canvas && (a = a.canvas);
					var c = a && a.getContext && a.getContext("2d");
					return c && c.canvas === a ? (e(a, b), c) : null
				},
				releaseContext: function(a) {
					var b = a.canvas;
					if(b[r]) {
						var c = b[r].initial;
						["height", "width"].forEach(function(a) {
							var d = c[a];
							q.isNullOrUndef(d) ? b.removeAttribute(a) : b.setAttribute(a, d)
						}), q.each(c.style || {}, function(a, c) {
							b.style[c] = a
						}), b.width = b.width, delete b[r]
					}
				},
				addEventListener: function(a, b, c) {
					var d = a.canvas;
					if("resize" === b) return void n(d, c, a);
					var e = c[r] || (c[r] = {});
					f(d, b, (e.proxies || (e.proxies = {}))[a.id + "_" + b] = function(b) {
						c(i(b, a))
					})
				},
				removeEventListener: function(a, b, c) {
					var d = a.canvas;
					if("resize" === b) return void o(d);
					var e = c[r] || {},
						f = e.proxies || {},
						h = f[a.id + "_" + b];
					h && g(d, b, h)
				}
			}, q.addEvent = f, q.removeEvent = g
		}, {
			45: 45
		}],
		48: [function(a, b, c) {
			"use strict";
			var d = a(45),
				e = a(46),
				f = a(47),
				g = f._enabled ? f : e;
			b.exports = d.extend({
				initialize: function() {},
				acquireContext: function() {},
				releaseContext: function() {},
				addEventListener: function() {},
				removeEventListener: function() {}
			}, g)
		}, {
			45: 45,
			46: 46,
			47: 47
		}],
		49: [function(a, b, c) {
			"use strict";
			var d = a(25),
				e = a(40),
				f = a(45);
			d._set("global", {
				plugins: {
					filler: {
						propagate: !0
					}
				}
			}), b.exports = function() {
				function a(a, b, c) {
					var d, e = a._model || {},
						f = e.fill;
					if(void 0 === f && (f = !!e.backgroundColor), !1 === f || null === f) return !1;
					if(!0 === f) return "origin";
					if(d = parseFloat(f, 10), isFinite(d) && Math.floor(d) === d) return "-" !== f[0] && "+" !== f[0] || (d = b + d), !(d === b || d < 0 || d >= c) && d;
					switch(f) {
						case "bottom":
							return "start";
						case "top":
							return "end";
						case "zero":
							return "origin";
						case "origin":
						case "start":
						case "end":
							return f;
						default:
							return !1
					}
				}

				function b(a) {
					var b, c = a.el._model || {},
						d = a.el._scale || {},
						e = a.fill,
						f = null;
					if(isFinite(e)) return null;
					if("start" === e ? f = void 0 === c.scaleBottom ? d.bottom : c.scaleBottom : "end" === e ? f = void 0 === c.scaleTop ? d.top : c.scaleTop : void 0 !== c.scaleZero ? f = c.scaleZero : d.getBasePosition ? f = d.getBasePosition() : d.getBasePixel && (f = d.getBasePixel()), void 0 !== f && null !== f) {
						if(void 0 !== f.x && void 0 !== f.y) return f;
						if("number" == typeof f && isFinite(f)) return b = d.isHorizontal(), {
							x: b ? f : null,
							y: b ? null : f
						}
					}
					return null
				}

				function c(a, b, c) {
					var d, e = a[b],
						f = e.fill,
						g = [b];
					if(!c) return f;
					for(; !1 !== f && -1 === g.indexOf(f);) {
						if(!isFinite(f)) return f;
						if(!(d = a[f])) return !1;
						if(d.visible) return f;
						g.push(f), f = d.fill
					}
					return !1
				}

				function g(a) {
					var b = a.fill,
						c = "dataset";
					return !1 === b ? null : (isFinite(b) || (c = "boundary"), k[c](a))
				}

				function h(a) {
					return a && !a.skip
				}

				function i(a, b, c, d, e) {
					var g;
					if(d && e) {
						for(a.moveTo(b[0].x, b[0].y), g = 1; g < d; ++g) f.canvas.lineTo(a, b[g - 1], b[g]);
						for(a.lineTo(c[e - 1].x, c[e - 1].y), g = e - 1; g > 0; --g) f.canvas.lineTo(a, c[g], c[g - 1], !0)
					}
				}

				function j(a, b, c, d, e, f) {
					var g, j, k, l, m, n, o, p = b.length,
						q = d.spanGaps,
						r = [],
						s = [],
						t = 0,
						u = 0;
					for(a.beginPath(), g = 0, j = p + !!f; g < j; ++g) k = g % p, l = b[k]._view, m = c(l, k, d), n = h(l), o = h(m), n && o ? (t = r.push(l), u = s.push(m)) : t && u && (q ? (n && r.push(l), o && s.push(m)) : (i(a, r, s, t, u), t = u = 0, r = [], s = []));
					i(a, r, s, t, u), a.closePath(), a.fillStyle = e, a.fill()
				}
				var k = {
					dataset: function(a) {
						var b = a.fill,
							c = a.chart,
							d = c.getDatasetMeta(b),
							e = d && c.isDatasetVisible(b),
							f = e && d.dataset._children || [],
							g = f.length || 0;
						return g ? function(a, b) {
							return b < g && f[b]._view || null
						} : null
					},
					boundary: function(a) {
						var b = a.boundary,
							c = b ? b.x : null,
							d = b ? b.y : null;
						return function(a) {
							return {
								x: null === c ? a.x : c,
								y: null === d ? a.y : d
							}
						}
					}
				};
				return {
					id: "filler",
					afterDatasetsUpdate: function(d, f) {
						var h, i, j, k, l = (d.data.datasets || []).length,
							m = f.propagate,
							n = [];
						for(i = 0; i < l; ++i) h = d.getDatasetMeta(i), j = h.dataset, k = null, j && j._model && j instanceof e.Line && (k = {
							visible: d.isDatasetVisible(i),
							fill: a(j, i, l),
							chart: d,
							el: j
						}), h.$filler = k, n.push(k);
						for(i = 0; i < l; ++i)(k = n[i]) && (k.fill = c(n, i, m), k.boundary = b(k), k.mapper = g(k))
					},
					beforeDatasetDraw: function(a, b) {
						var c = b.meta.$filler;
						if(c) {
							var e = a.ctx,
								g = c.el,
								h = g._view,
								i = g._children || [],
								k = c.mapper,
								l = h.backgroundColor || d.global.defaultColor;
							k && l && i.length && (f.canvas.clipArea(e, a.chartArea), j(e, i, k, h, l, g._loop), f.canvas.unclipArea(e))
						}
					}
				}
			}
		}, {
			25: 25,
			40: 40,
			45: 45
		}],
		50: [function(a, b, c) {
			"use strict";
			var d = a(25),
				e = a(26),
				f = a(45);
			d._set("global", {
				legend: {
					display: !0,
					position: "top",
					fullWidth: !0,
					reverse: !1,
					weight: 1e3,
					onClick: function(a, b) {
						var c = b.datasetIndex,
							d = this.chart,
							e = d.getDatasetMeta(c);
						e.hidden = null === e.hidden ? !d.data.datasets[c].hidden : null, d.update()
					},
					onHover: null,
					labels: {
						boxWidth: 40,
						padding: 10,
						generateLabels: function(a) {
							var b = a.data;
							return f.isArray(b.datasets) ? b.datasets.map(function(b, c) {
								return {
									text: b.label,
									fillStyle: f.isArray(b.backgroundColor) ? b.backgroundColor[0] : b.backgroundColor,
									hidden: !a.isDatasetVisible(c),
									lineCap: b.borderCapStyle,
									lineDash: b.borderDash,
									lineDashOffset: b.borderDashOffset,
									lineJoin: b.borderJoinStyle,
									lineWidth: b.borderWidth,
									strokeStyle: b.borderColor,
									pointStyle: b.pointStyle,
									datasetIndex: c
								}
							}, this) : []
						}
					}
				},
				legendCallback: function(a) {
					var b = [];
					b.push('<ul class="' + a.id + '-legend">');
					for(var c = 0; c < a.data.datasets.length; c++) b.push('<li><span style="background-color:' + a.data.datasets[c].backgroundColor + '"></span>'), a.data.datasets[c].label && b.push(a.data.datasets[c].label), b.push("</li>");
					return b.push("</ul>"), b.join("")
				}
			}), b.exports = function(a) {
				function b(a, b) {
					return a.usePointStyle ? b * Math.SQRT2 : a.boxWidth
				}

				function c(b, c) {
					var d = new a.Legend({
						ctx: b.ctx,
						options: c,
						chart: b
					});
					g.configure(b, d, c), g.addBox(b, d), b.legend = d
				}
				var g = a.layoutService,
					h = f.noop;
				return a.Legend = e.extend({
					initialize: function(a) {
						f.extend(this, a), this.legendHitBoxes = [], this.doughnutMode = !1
					},
					beforeUpdate: h,
					update: function(a, b, c) {
						var d = this;
						return d.beforeUpdate(), d.maxWidth = a, d.maxHeight = b, d.margins = c, d.beforeSetDimensions(), d.setDimensions(), d.afterSetDimensions(), d.beforeBuildLabels(), d.buildLabels(), d.afterBuildLabels(), d.beforeFit(), d.fit(), d.afterFit(), d.afterUpdate(), d.minSize
					},
					afterUpdate: h,
					beforeSetDimensions: h,
					setDimensions: function() {
						var a = this;
						a.isHorizontal() ? (a.width = a.maxWidth, a.left = 0, a.right = a.width) : (a.height = a.maxHeight, a.top = 0, a.bottom = a.height), a.paddingLeft = 0, a.paddingTop = 0, a.paddingRight = 0, a.paddingBottom = 0, a.minSize = {
							width: 0,
							height: 0
						}
					},
					afterSetDimensions: h,
					beforeBuildLabels: h,
					buildLabels: function() {
						var a = this,
							b = a.options.labels || {},
							c = f.callback(b.generateLabels, [a.chart], a) || [];
						b.filter && (c = c.filter(function(c) {
							return b.filter(c, a.chart.data)
						})), a.options.reverse && c.reverse(), a.legendItems = c
					},
					afterBuildLabels: h,
					beforeFit: h,
					fit: function() {
						var a = this,
							c = a.options,
							e = c.labels,
							g = c.display,
							h = a.ctx,
							i = d.global,
							j = f.valueOrDefault,
							k = j(e.fontSize, i.defaultFontSize),
							l = j(e.fontStyle, i.defaultFontStyle),
							m = j(e.fontFamily, i.defaultFontFamily),
							n = f.fontString(k, l, m),
							o = a.legendHitBoxes = [],
							p = a.minSize,
							q = a.isHorizontal();
						if(q ? (p.width = a.maxWidth, p.height = g ? 10 : 0) : (p.width = g ? 10 : 0, p.height = a.maxHeight), g)
							if(h.font = n, q) {
								var r = a.lineWidths = [0],
									s = a.legendItems.length ? k + e.padding : 0;
								h.textAlign = "left", h.textBaseline = "top", f.each(a.legendItems, function(c, d) {
									var f = b(e, k),
										g = f + k / 2 + h.measureText(c.text).width;
									r[r.length - 1] + g + e.padding >= a.width && (s += k + e.padding, r[r.length] = a.left), o[d] = {
										left: 0,
										top: 0,
										width: g,
										height: k
									}, r[r.length - 1] += g + e.padding
								}), p.height += s
							} else {
								var t = e.padding,
									u = a.columnWidths = [],
									v = e.padding,
									w = 0,
									x = 0,
									y = k + t;
								f.each(a.legendItems, function(a, c) {
									var d = b(e, k),
										f = d + k / 2 + h.measureText(a.text).width;
									x + y > p.height && (v += w + e.padding, u.push(w), w = 0, x = 0), w = Math.max(w, f), x += y, o[c] = {
										left: 0,
										top: 0,
										width: f,
										height: k
									}
								}), v += w, u.push(w), p.width += v
							}
						a.width = p.width, a.height = p.height
					},
					afterFit: h,
					isHorizontal: function() {
						return "top" === this.options.position || "bottom" === this.options.position
					},
					draw: function() {
						var a = this,
							c = a.options,
							e = c.labels,
							g = d.global,
							h = g.elements.line,
							i = a.width,
							j = a.lineWidths;
						if(c.display) {
							var k, l = a.ctx,
								m = f.valueOrDefault,
								n = m(e.fontColor, g.defaultFontColor),
								o = m(e.fontSize, g.defaultFontSize),
								p = m(e.fontStyle, g.defaultFontStyle),
								q = m(e.fontFamily, g.defaultFontFamily),
								r = f.fontString(o, p, q);
							l.textAlign = "left", l.textBaseline = "middle", l.lineWidth = .5, l.strokeStyle = n, l.fillStyle = n, l.font = r;
							var s = b(e, o),
								t = a.legendHitBoxes,
								u = function(a, b, d) {
									if(!(isNaN(s) || s <= 0)) {
										l.save(), l.fillStyle = m(d.fillStyle, g.defaultColor), l.lineCap = m(d.lineCap, h.borderCapStyle), l.lineDashOffset = m(d.lineDashOffset, h.borderDashOffset), l.lineJoin = m(d.lineJoin, h.borderJoinStyle), l.lineWidth = m(d.lineWidth, h.borderWidth), l.strokeStyle = m(d.strokeStyle, g.defaultColor);
										var e = 0 === m(d.lineWidth, h.borderWidth);
										if(l.setLineDash && l.setLineDash(m(d.lineDash, h.borderDash)), c.labels && c.labels.usePointStyle) {
											var i = o * Math.SQRT2 / 2,
												j = i / Math.SQRT2,
												k = a + j,
												n = b + j;
											f.canvas.drawPoint(l, d.pointStyle, i, k, n)
										} else e || l.strokeRect(a, b, s, o), l.fillRect(a, b, s, o);
										l.restore()
									}
								},
								v = function(a, b, c, d) {
									var e = o / 2,
										f = s + e + a,
										g = b + e;
									l.fillText(c.text, f, g), c.hidden && (l.beginPath(), l.lineWidth = 2, l.moveTo(f, g), l.lineTo(f + d, g), l.stroke())
								},
								w = a.isHorizontal();
							k = w ? {
								x: a.left + (i - j[0]) / 2,
								y: a.top + e.padding,
								line: 0
							} : {
								x: a.left + e.padding,
								y: a.top + e.padding,
								line: 0
							};
							var x = o + e.padding;
							f.each(a.legendItems, function(b, c) {
								var d = l.measureText(b.text).width,
									f = s + o / 2 + d,
									g = k.x,
									h = k.y;
								w ? g + f >= i && (h = k.y += x, k.line++, g = k.x = a.left + (i - j[k.line]) / 2) : h + x > a.bottom && (g = k.x = g + a.columnWidths[k.line] + e.padding, h = k.y = a.top + e.padding, k.line++), u(g, h, b), t[c].left = g, t[c].top = h, v(g, h, b, d), w ? k.x += f + e.padding : k.y += x
							})
						}
					},
					handleEvent: function(a) {
						var b = this,
							c = b.options,
							d = "mouseup" === a.type ? "click" : a.type,
							e = !1;
						if("mousemove" === d) {
							if(!c.onHover) return
						} else {
							if("click" !== d) return;
							if(!c.onClick) return
						}
						var f = a.x,
							g = a.y;
						if(f >= b.left && f <= b.right && g >= b.top && g <= b.bottom)
							for(var h = b.legendHitBoxes, i = 0; i < h.length; ++i) {
								var j = h[i];
								if(f >= j.left && f <= j.left + j.width && g >= j.top && g <= j.top + j.height) {
									if("click" === d) {
										c.onClick.call(b, a.native, b.legendItems[i]), e = !0;
										break
									}
									if("mousemove" === d) {
										c.onHover.call(b, a.native, b.legendItems[i]), e = !0;
										break
									}
								}
							}
						return e
					}
				}), {
					id: "legend",
					beforeInit: function(a) {
						var b = a.options.legend;
						b && c(a, b)
					},
					beforeUpdate: function(a) {
						var b = a.options.legend,
							e = a.legend;
						b ? (f.mergeIf(b, d.global.legend), e ? (g.configure(a, e, b), e.options = b) : c(a, b)) : e && (g.removeBox(a, e), delete a.legend)
					},
					afterEvent: function(a, b) {
						var c = a.legend;
						c && c.handleEvent(b)
					}
				}
			}
		}, {
			25: 25,
			26: 26,
			45: 45
		}],
		51: [function(a, b, c) {
			"use strict";
			var d = a(25),
				e = a(26),
				f = a(45);
			d._set("global", {
				title: {
					display: !1,
					fontStyle: "bold",
					fullWidth: !0,
					lineHeight: 1.2,
					padding: 10,
					position: "top",
					text: "",
					weight: 2e3
				}
			}), b.exports = function(a) {
				function b(b, d) {
					var e = new a.Title({
						ctx: b.ctx,
						options: d,
						chart: b
					});
					c.configure(b, e, d), c.addBox(b, e), b.titleBlock = e
				}
				var c = a.layoutService,
					g = f.noop;
				return a.Title = e.extend({
					initialize: function(a) {
						var b = this;
						f.extend(b, a), b.legendHitBoxes = []
					},
					beforeUpdate: g,
					update: function(a, b, c) {
						var d = this;
						return d.beforeUpdate(), d.maxWidth = a, d.maxHeight = b, d.margins = c, d.beforeSetDimensions(), d.setDimensions(), d.afterSetDimensions(), d.beforeBuildLabels(), d.buildLabels(), d.afterBuildLabels(), d.beforeFit(), d.fit(), d.afterFit(), d.afterUpdate(), d.minSize
					},
					afterUpdate: g,
					beforeSetDimensions: g,
					setDimensions: function() {
						var a = this;
						a.isHorizontal() ? (a.width = a.maxWidth, a.left = 0, a.right = a.width) : (a.height = a.maxHeight, a.top = 0, a.bottom = a.height), a.paddingLeft = 0, a.paddingTop = 0, a.paddingRight = 0, a.paddingBottom = 0, a.minSize = {
							width: 0,
							height: 0
						}
					},
					afterSetDimensions: g,
					beforeBuildLabels: g,
					buildLabels: g,
					afterBuildLabels: g,
					beforeFit: g,
					fit: function() {
						var a = this,
							b = f.valueOrDefault,
							c = a.options,
							e = c.display,
							g = b(c.fontSize, d.global.defaultFontSize),
							h = a.minSize,
							i = f.isArray(c.text) ? c.text.length : 1,
							j = f.options.toLineHeight(c.lineHeight, g),
							k = e ? i * j + 2 * c.padding : 0;
						a.isHorizontal() ? (h.width = a.maxWidth, h.height = k) : (h.width = k, h.height = a.maxHeight), a.width = h.width, a.height = h.height
					},
					afterFit: g,
					isHorizontal: function() {
						var a = this.options.position;
						return "top" === a || "bottom" === a
					},
					draw: function() {
						var a = this,
							b = a.ctx,
							c = f.valueOrDefault,
							e = a.options,
							g = d.global;
						if(e.display) {
							var h, i, j, k = c(e.fontSize, g.defaultFontSize),
								l = c(e.fontStyle, g.defaultFontStyle),
								m = c(e.fontFamily, g.defaultFontFamily),
								n = f.fontString(k, l, m),
								o = f.options.toLineHeight(e.lineHeight, k),
								p = o / 2 + e.padding,
								q = 0,
								r = a.top,
								s = a.left,
								t = a.bottom,
								u = a.right;
							b.fillStyle = c(e.fontColor, g.defaultFontColor), b.font = n, a.isHorizontal() ? (i = s + (u - s) / 2, j = r + p, h = u - s) : (i = "left" === e.position ? s + p : u - p, j = r + (t - r) / 2, h = t - r, q = Math.PI * ("left" === e.position ? -.5 : .5)), b.save(), b.translate(i, j), b.rotate(q), b.textAlign = "center", b.textBaseline = "middle";
							var v = e.text;
							if(f.isArray(v))
								for(var w = 0, x = 0; x < v.length; ++x) b.fillText(v[x], 0, w, h), w += o;
							else b.fillText(v, 0, 0, h);
							b.restore()
						}
					}
				}), {
					id: "title",
					beforeInit: function(a) {
						var c = a.options.title;
						c && b(a, c)
					},
					beforeUpdate: function(e) {
						var g = e.options.title,
							h = e.titleBlock;
						g ? (f.mergeIf(g, d.global.title), h ? (c.configure(e, h, g), h.options = g) : b(e, g)) : h && (a.layoutService.removeBox(e, h), delete e.titleBlock)
					}
				}
			}
		}, {
			25: 25,
			26: 26,
			45: 45
		}],
		52: [function(a, b, c) {
			"use strict";
			b.exports = function(a) {
				var b = {
						position: "bottom"
					},
					c = a.Scale.extend({
						getLabels: function() {
							var a = this.chart.data;
							return this.options.labels || (this.isHorizontal() ? a.xLabels : a.yLabels) || a.labels
						},
						determineDataLimits: function() {
							var a = this,
								b = a.getLabels();
							a.minIndex = 0, a.maxIndex = b.length - 1;
							var c;
							void 0 !== a.options.ticks.min && (c = b.indexOf(a.options.ticks.min), a.minIndex = -1 !== c ? c : a.minIndex), void 0 !== a.options.ticks.max && (c = b.indexOf(a.options.ticks.max), a.maxIndex = -1 !== c ? c : a.maxIndex), a.min = b[a.minIndex], a.max = b[a.maxIndex]
						},
						buildTicks: function() {
							var a = this,
								b = a.getLabels();
							a.ticks = 0 === a.minIndex && a.maxIndex === b.length - 1 ? b : b.slice(a.minIndex, a.maxIndex + 1)
						},
						getLabelForIndex: function(a, b) {
							var c = this,
								d = c.chart.data,
								e = c.isHorizontal();
							return d.yLabels && !e ? c.getRightValue(d.datasets[b].data[a]) : c.ticks[a - c.minIndex]
						},
						getPixelForValue: function(a, b) {
							var c, d = this,
								e = d.options.offset,
								f = Math.max(d.maxIndex + 1 - d.minIndex - (e ? 0 : 1), 1);
							if(void 0 !== a && null !== a && (c = d.isHorizontal() ? a.x : a.y), void 0 !== c || void 0 !== a && isNaN(b)) {
								var g = d.getLabels();
								a = c || a;
								var h = g.indexOf(a);
								b = -1 !== h ? h : b
							}
							if(d.isHorizontal()) {
								var i = d.width / f,
									j = i * (b - d.minIndex);
								return e && (j += i / 2), d.left + Math.round(j)
							}
							var k = d.height / f,
								l = k * (b - d.minIndex);
							return e && (l += k / 2), d.top + Math.round(l)
						},
						getPixelForTick: function(a) {
							return this.getPixelForValue(this.ticks[a], a + this.minIndex, null)
						},
						getValueForPixel: function(a) {
							var b = this,
								c = b.options.offset,
								d = Math.max(b._ticks.length - (c ? 0 : 1), 1),
								e = b.isHorizontal(),
								f = (e ? b.width : b.height) / d;
							return a -= e ? b.left : b.top, c && (a -= f / 2), (a <= 0 ? 0 : Math.round(a / f)) + b.minIndex
						},
						getBasePixel: function() {
							return this.bottom
						}
					});
				a.scaleService.registerScaleType("category", c, b)
			}
		}, {}],
		53: [function(a, b, c) {
			"use strict";
			var d = a(25),
				e = a(45),
				f = a(34);
			b.exports = function(a) {
				var b = {
						position: "left",
						ticks: {
							callback: f.formatters.linear
						}
					},
					c = a.LinearScaleBase.extend({
						determineDataLimits: function() {
							function a(a) {
								return h ? a.xAxisID === b.id : a.yAxisID === b.id
							}
							var b = this,
								c = b.options,
								d = b.chart,
								f = d.data,
								g = f.datasets,
								h = b.isHorizontal();
							b.min = null, b.max = null;
							var i = c.stacked;
							if(void 0 === i && e.each(g, function(b, c) {
									if(!i) {
										var e = d.getDatasetMeta(c);
										d.isDatasetVisible(c) && a(e) && void 0 !== e.stack && (i = !0)
									}
								}), c.stacked || i) {
								var j = {};
								e.each(g, function(f, g) {
									var h = d.getDatasetMeta(g),
										i = [h.type, void 0 === c.stacked && void 0 === h.stack ? g : "", h.stack].join(".");
									void 0 === j[i] && (j[i] = {
										positiveValues: [],
										negativeValues: []
									});
									var k = j[i].positiveValues,
										l = j[i].negativeValues;
									d.isDatasetVisible(g) && a(h) && e.each(f.data, function(a, d) {
										var e = +b.getRightValue(a);
										isNaN(e) || h.data[d].hidden || (k[d] = k[d] || 0, l[d] = l[d] || 0, c.relativePoints ? k[d] = 100 : e < 0 ? l[d] += e : k[d] += e)
									})
								}), e.each(j, function(a) {
									var c = a.positiveValues.concat(a.negativeValues),
										d = e.min(c),
										f = e.max(c);
									b.min = null === b.min ? d : Math.min(b.min, d), b.max = null === b.max ? f : Math.max(b.max, f)
								})
							} else e.each(g, function(c, f) {
								var g = d.getDatasetMeta(f);
								d.isDatasetVisible(f) && a(g) && e.each(c.data, function(a, c) {
									var d = +b.getRightValue(a);
									isNaN(d) || g.data[c].hidden || (null === b.min ? b.min = d : d < b.min && (b.min = d), null === b.max ? b.max = d : d > b.max && (b.max = d))
								})
							});
							b.min = isFinite(b.min) && !isNaN(b.min) ? b.min : 0, b.max = isFinite(b.max) && !isNaN(b.max) ? b.max : 1, this.handleTickRangeOptions()
						},
						getTickLimit: function() {
							var a, b = this,
								c = b.options.ticks;
							if(b.isHorizontal()) a = Math.min(c.maxTicksLimit ? c.maxTicksLimit : 11, Math.ceil(b.width / 50));
							else {
								var f = e.valueOrDefault(c.fontSize, d.global.defaultFontSize);
								a = Math.min(c.maxTicksLimit ? c.maxTicksLimit : 11, Math.ceil(b.height / (2 * f)))
							}
							return a
						},
						handleDirectionalChanges: function() {
							this.isHorizontal() || this.ticks.reverse()
						},
						getLabelForIndex: function(a, b) {
							return +this.getRightValue(this.chart.data.datasets[b].data[a])
						},
						getPixelForValue: function(a) {
							var b, c = this,
								d = c.start,
								e = +c.getRightValue(a),
								f = c.end - d;
							return c.isHorizontal() ? (b = c.left + c.width / f * (e - d), Math.round(b)) : (b = c.bottom - c.height / f * (e - d), Math.round(b))
						},
						getValueForPixel: function(a) {
							var b = this,
								c = b.isHorizontal(),
								d = c ? b.width : b.height,
								e = (c ? a - b.left : b.bottom - a) / d;
							return b.start + (b.end - b.start) * e
						},
						getPixelForTick: function(a) {
							return this.getPixelForValue(this.ticksAsNumbers[a])
						}
					});
				a.scaleService.registerScaleType("linear", c, b)
			}
		}, {
			25: 25,
			34: 34,
			45: 45
		}],
		54: [function(a, b, c) {
			"use strict";
			var d = a(45),
				e = a(34);
			b.exports = function(a) {
				var b = d.noop;
				a.LinearScaleBase = a.Scale.extend({
					getRightValue: function(b) {
						return "string" == typeof b ? +b : a.Scale.prototype.getRightValue.call(this, b)
					},
					handleTickRangeOptions: function() {
						var a = this,
							b = a.options,
							c = b.ticks;
						if(c.beginAtZero) {
							var e = d.sign(a.min),
								f = d.sign(a.max);
							e < 0 && f < 0 ? a.max = 0 : e > 0 && f > 0 && (a.min = 0)
						}
						var g = void 0 !== c.min || void 0 !== c.suggestedMin,
							h = void 0 !== c.max || void 0 !== c.suggestedMax;
						void 0 !== c.min ? a.min = c.min : void 0 !== c.suggestedMin && (null === a.min ? a.min = c.suggestedMin : a.min = Math.min(a.min, c.suggestedMin)), void 0 !== c.max ? a.max = c.max : void 0 !== c.suggestedMax && (null === a.max ? a.max = c.suggestedMax : a.max = Math.max(a.max, c.suggestedMax)), g !== h && a.min >= a.max && (g ? a.max = a.min + 1 : a.min = a.max - 1), a.min === a.max && (a.max++, c.beginAtZero || a.min--)
					},
					getTickLimit: b,
					handleDirectionalChanges: b,
					buildTicks: function() {
						var a = this,
							b = a.options,
							c = b.ticks,
							f = a.getTickLimit();
						f = Math.max(2, f);
						var g = {
								maxTicks: f,
								min: c.min,
								max: c.max,
								stepSize: d.valueOrDefault(c.fixedStepSize, c.stepSize)
							},
							h = a.ticks = e.generators.linear(g, a);
						a.handleDirectionalChanges(), a.max = d.max(h), a.min = d.min(h), c.reverse ? (h.reverse(), a.start = a.max, a.end = a.min) : (a.start = a.min, a.end = a.max)
					},
					convertTicksToLabels: function() {
						var b = this;
						b.ticksAsNumbers = b.ticks.slice(), b.zeroLineIndex = b.ticks.indexOf(0), a.Scale.prototype.convertTicksToLabels.call(b)
					}
				})
			}
		}, {
			34: 34,
			45: 45
		}],
		55: [function(a, b, c) {
			"use strict";
			var d = a(45),
				e = a(34);
			b.exports = function(a) {
				var b = {
						position: "left",
						ticks: {
							callback: e.formatters.logarithmic
						}
					},
					c = a.Scale.extend({
						determineDataLimits: function() {
							function a(a) {
								return j ? a.xAxisID === b.id : a.yAxisID === b.id
							}
							var b = this,
								c = b.options,
								e = c.ticks,
								f = b.chart,
								g = f.data,
								h = g.datasets,
								i = d.valueOrDefault,
								j = b.isHorizontal();
							b.min = null, b.max = null, b.minNotZero = null;
							var k = c.stacked;
							if(void 0 === k && d.each(h, function(b, c) {
									if(!k) {
										var d = f.getDatasetMeta(c);
										f.isDatasetVisible(c) && a(d) && void 0 !== d.stack && (k = !0)
									}
								}), c.stacked || k) {
								var l = {};
								d.each(h, function(e, g) {
									var h = f.getDatasetMeta(g),
										i = [h.type, void 0 === c.stacked && void 0 === h.stack ? g : "", h.stack].join(".");
									f.isDatasetVisible(g) && a(h) && (void 0 === l[i] && (l[i] = []), d.each(e.data, function(a, d) {
										var e = l[i],
											f = +b.getRightValue(a);
										isNaN(f) || h.data[d].hidden || (e[d] = e[d] || 0, c.relativePoints ? e[d] = 100 : e[d] += f)
									}))
								}), d.each(l, function(a) {
									var c = d.min(a),
										e = d.max(a);
									b.min = null === b.min ? c : Math.min(b.min, c), b.max = null === b.max ? e : Math.max(b.max, e)
								})
							} else d.each(h, function(c, e) {
								var g = f.getDatasetMeta(e);
								f.isDatasetVisible(e) && a(g) && d.each(c.data, function(a, c) {
									var d = +b.getRightValue(a);
									isNaN(d) || g.data[c].hidden || (null === b.min ? b.min = d : d < b.min && (b.min = d), null === b.max ? b.max = d : d > b.max && (b.max = d), 0 !== d && (null === b.minNotZero || d < b.minNotZero) && (b.minNotZero = d))
								})
							});
							b.min = i(e.min, b.min), b.max = i(e.max, b.max), b.min === b.max && (0 !== b.min && null !== b.min ? (b.min = Math.pow(10, Math.floor(d.log10(b.min)) - 1), b.max = Math.pow(10, Math.floor(d.log10(b.max)) + 1)) : (b.min = 1, b.max = 10))
						},
						buildTicks: function() {
							var a = this,
								b = a.options,
								c = b.ticks,
								f = {
									min: c.min,
									max: c.max
								},
								g = a.ticks = e.generators.logarithmic(f, a);
							a.isHorizontal() || g.reverse(), a.max = d.max(g), a.min = d.min(g), c.reverse ? (g.reverse(), a.start = a.max, a.end = a.min) : (a.start = a.min, a.end = a.max)
						},
						convertTicksToLabels: function() {
							this.tickValues = this.ticks.slice(), a.Scale.prototype.convertTicksToLabels.call(this)
						},
						getLabelForIndex: function(a, b) {
							return +this.getRightValue(this.chart.data.datasets[b].data[a])
						},
						getPixelForTick: function(a) {
							return this.getPixelForValue(this.tickValues[a])
						},
						getPixelForValue: function(a) {
							var b, c, e, f = this,
								g = f.start,
								h = +f.getRightValue(a),
								i = f.options,
								j = i.ticks;
							return f.isHorizontal() ? (e = d.log10(f.end) - d.log10(g), 0 === h ? c = f.left : (b = f.width, c = f.left + b / e * (d.log10(h) - d.log10(g)))) : (b = f.height, 0 !== g || j.reverse ? 0 === f.end && j.reverse ? (e = d.log10(f.start) - d.log10(f.minNotZero), c = h === f.end ? f.top : h === f.minNotZero ? f.top + .02 * b : f.top + .02 * b + .98 * b / e * (d.log10(h) - d.log10(f.minNotZero))) : 0 === h ? c = j.reverse ? f.top : f.bottom : (e = d.log10(f.end) - d.log10(g), b = f.height, c = f.bottom - b / e * (d.log10(h) - d.log10(g))) : (e = d.log10(f.end) - d.log10(f.minNotZero), c = h === g ? f.bottom : h === f.minNotZero ? f.bottom - .02 * b : f.bottom - .02 * b - .98 * b / e * (d.log10(h) - d.log10(f.minNotZero)))), c
						},
						getValueForPixel: function(a) {
							var b, c, e = this,
								f = d.log10(e.end) - d.log10(e.start);
							return e.isHorizontal() ? (c = e.width, b = e.start * Math.pow(10, (a - e.left) * f / c)) : (c = e.height, b = Math.pow(10, (e.bottom - a) * f / c) / e.start), b
						}
					});
				a.scaleService.registerScaleType("logarithmic", c, b)
			}
		}, {
			34: 34,
			45: 45
		}],
		56: [function(a, b, c) {
			"use strict";
			var d = a(25),
				e = a(45),
				f = a(34);
			b.exports = function(a) {
				function b(a) {
					var b = a.options;
					return b.angleLines.display || b.pointLabels.display ? a.chart.data.labels.length : 0
				}

				function c(a) {
					var b = a.options.pointLabels,
						c = e.valueOrDefault(b.fontSize, q.defaultFontSize),
						d = e.valueOrDefault(b.fontStyle, q.defaultFontStyle),
						f = e.valueOrDefault(b.fontFamily, q.defaultFontFamily);
					return {
						size: c,
						style: d,
						family: f,
						font: e.fontString(c, d, f)
					}
				}

				function g(a, b, c) {
					return e.isArray(c) ? {
						w: e.longestText(a, a.font, c),
						h: c.length * b + 1.5 * (c.length - 1) * b
					} : {
						w: a.measureText(c).width,
						h: b
					}
				}

				function h(a, b, c, d, e) {
					return a === d || a === e ? {
						start: b - c / 2,
						end: b + c / 2
					} : a < d || a > e ? {
						start: b - c - 5,
						end: b
					} : {
						start: b,
						end: b + c + 5
					}
				}

				function i(a) {
					var d, f, i, j = c(a),
						k = Math.min(a.height / 2, a.width / 2),
						l = {
							r: a.width,
							l: 0,
							t: a.height,
							b: 0
						},
						m = {};
					a.ctx.font = j.font, a._pointLabelSizes = [];
					var n = b(a);
					for(d = 0; d < n; d++) {
						i = a.getPointPosition(d, k), f = g(a.ctx, j.size, a.pointLabels[d] || ""), a._pointLabelSizes[d] = f;
						var o = a.getIndexAngle(d),
							p = e.toDegrees(o) % 360,
							q = h(p, i.x, f.w, 0, 180),
							r = h(p, i.y, f.h, 90, 270);
						q.start < l.l && (l.l = q.start, m.l = o), q.end > l.r && (l.r = q.end, m.r = o), r.start < l.t && (l.t = r.start, m.t = o), r.end > l.b && (l.b = r.end, m.b = o)
					}
					a.setReductions(k, l, m)
				}

				function j(a) {
					var b = Math.min(a.height / 2, a.width / 2);
					a.drawingArea = Math.round(b), a.setCenterPoint(0, 0, 0, 0)
				}

				function k(a) {
					return 0 === a || 180 === a ? "center" : a < 180 ? "left" : "right"
				}

				function l(a, b, c, d) {
					if(e.isArray(b))
						for(var f = c.y, g = 1.5 * d, h = 0; h < b.length; ++h) a.fillText(b[h], c.x, f), f += g;
					else a.fillText(b, c.x, c.y)
				}

				function m(a, b, c) {
					90 === a || 270 === a ? c.y -= b.h / 2 : (a > 270 || a < 90) && (c.y -= b.h)
				}

				function n(a) {
					var d = a.ctx,
						f = e.valueOrDefault,
						g = a.options,
						h = g.angleLines,
						i = g.pointLabels;
					d.lineWidth = h.lineWidth, d.strokeStyle = h.color;
					var j = a.getDistanceFromCenterForValue(g.ticks.reverse ? a.min : a.max),
						n = c(a);
					d.textBaseline = "top";
					for(var o = b(a) - 1; o >= 0; o--) {
						if(h.display) {
							var p = a.getPointPosition(o, j);
							d.beginPath(), d.moveTo(a.xCenter, a.yCenter), d.lineTo(p.x, p.y), d.stroke(), d.closePath()
						}
						if(i.display) {
							var r = a.getPointPosition(o, j + 5),
								s = f(i.fontColor, q.defaultFontColor);
							d.font = n.font, d.fillStyle = s;
							var t = a.getIndexAngle(o),
								u = e.toDegrees(t);
							d.textAlign = k(u), m(u, a._pointLabelSizes[o], r), l(d, a.pointLabels[o] || "", r, n.size)
						}
					}
				}

				function o(a, c, d, f) {
					var g = a.ctx;
					if(g.strokeStyle = e.valueAtIndexOrDefault(c.color, f - 1), g.lineWidth = e.valueAtIndexOrDefault(c.lineWidth, f - 1), a.options.gridLines.circular) g.beginPath(), g.arc(a.xCenter, a.yCenter, d, 0, 2 * Math.PI), g.closePath(), g.stroke();
					else {
						var h = b(a);
						if(0 === h) return;
						g.beginPath();
						var i = a.getPointPosition(0, d);
						g.moveTo(i.x, i.y);
						for(var j = 1; j < h; j++) i = a.getPointPosition(j, d), g.lineTo(i.x, i.y);
						g.closePath(), g.stroke()
					}
				}

				function p(a) {
					return e.isNumber(a) ? a : 0
				}
				var q = d.global,
					r = {
						display: !0,
						animate: !0,
						position: "chartArea",
						angleLines: {
							display: !0,
							color: "rgba(0, 0, 0, 0.1)",
							lineWidth: 1
						},
						gridLines: {
							circular: !1
						},
						ticks: {
							showLabelBackdrop: !0,
							backdropColor: "rgba(255,255,255,0.75)",
							backdropPaddingY: 2,
							backdropPaddingX: 2,
							callback: f.formatters.linear
						},
						pointLabels: {
							display: !0,
							fontSize: 10,
							callback: function(a) {
								return a
							}
						}
					},
					s = a.LinearScaleBase.extend({
						setDimensions: function() {
							var a = this,
								b = a.options,
								c = b.ticks;
							a.width = a.maxWidth, a.height = a.maxHeight, a.xCenter = Math.round(a.width / 2), a.yCenter = Math.round(a.height / 2);
							var d = e.min([a.height, a.width]),
								f = e.valueOrDefault(c.fontSize, q.defaultFontSize);
							a.drawingArea = b.display ? d / 2 - (f / 2 + c.backdropPaddingY) : d / 2
						},
						determineDataLimits: function() {
							var a = this,
								b = a.chart,
								c = Number.POSITIVE_INFINITY,
								d = Number.NEGATIVE_INFINITY;
							e.each(b.data.datasets, function(f, g) {
								if(b.isDatasetVisible(g)) {
									var h = b.getDatasetMeta(g);
									e.each(f.data, function(b, e) {
										var f = +a.getRightValue(b);
										isNaN(f) || h.data[e].hidden || (c = Math.min(f, c), d = Math.max(f, d))
									})
								}
							}), a.min = c === Number.POSITIVE_INFINITY ? 0 : c, a.max = d === Number.NEGATIVE_INFINITY ? 0 : d, a.handleTickRangeOptions()
						},
						getTickLimit: function() {
							var a = this.options.ticks,
								b = e.valueOrDefault(a.fontSize, q.defaultFontSize);
							return Math.min(a.maxTicksLimit ? a.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * b)))
						},
						convertTicksToLabels: function() {
							var b = this;
							a.LinearScaleBase.prototype.convertTicksToLabels.call(b), b.pointLabels = b.chart.data.labels.map(b.options.pointLabels.callback, b)
						},
						getLabelForIndex: function(a, b) {
							return +this.getRightValue(this.chart.data.datasets[b].data[a])
						},
						fit: function() {
							this.options.pointLabels.display ? i(this) : j(this)
						},
						setReductions: function(a, b, c) {
							var d = this,
								e = b.l / Math.sin(c.l),
								f = Math.max(b.r - d.width, 0) / Math.sin(c.r),
								g = -b.t / Math.cos(c.t),
								h = -Math.max(b.b - d.height, 0) / Math.cos(c.b);
							e = p(e), f = p(f), g = p(g), h = p(h), d.drawingArea = Math.min(Math.round(a - (e + f) / 2), Math.round(a - (g + h) / 2)), d.setCenterPoint(e, f, g, h)
						},
						setCenterPoint: function(a, b, c, d) {
							var e = this,
								f = e.width - b - e.drawingArea,
								g = a + e.drawingArea,
								h = c + e.drawingArea,
								i = e.height - d - e.drawingArea;
							e.xCenter = Math.round((g + f) / 2 + e.left), e.yCenter = Math.round((h + i) / 2 + e.top)
						},
						getIndexAngle: function(a) {
							return a * (2 * Math.PI / b(this)) + (this.chart.options && this.chart.options.startAngle ? this.chart.options.startAngle : 0) * Math.PI * 2 / 360
						},
						getDistanceFromCenterForValue: function(a) {
							var b = this;
							if(null === a) return 0;
							var c = b.drawingArea / (b.max - b.min);
							return b.options.ticks.reverse ? (b.max - a) * c : (a - b.min) * c
						},
						getPointPosition: function(a, b) {
							var c = this,
								d = c.getIndexAngle(a) - Math.PI / 2;
							return {
								x: Math.round(Math.cos(d) * b) + c.xCenter,
								y: Math.round(Math.sin(d) * b) + c.yCenter
							}
						},
						getPointPositionForValue: function(a, b) {
							return this.getPointPosition(a, this.getDistanceFromCenterForValue(b))
						},
						getBasePosition: function() {
							var a = this,
								b = a.min,
								c = a.max;
							return a.getPointPositionForValue(0, a.beginAtZero ? 0 : b < 0 && c < 0 ? c : b > 0 && c > 0 ? b : 0)
						},
						draw: function() {
							var a = this,
								b = a.options,
								c = b.gridLines,
								d = b.ticks,
								f = e.valueOrDefault;
							if(b.display) {
								var g = a.ctx,
									h = this.getIndexAngle(0),
									i = f(d.fontSize, q.defaultFontSize),
									j = f(d.fontStyle, q.defaultFontStyle),
									k = f(d.fontFamily, q.defaultFontFamily),
									l = e.fontString(i, j, k);
								e.each(a.ticks, function(b, e) {
									if(e > 0 || d.reverse) {
										var j = a.getDistanceFromCenterForValue(a.ticksAsNumbers[e]);
										if(c.display && 0 !== e && o(a, c, j, e), d.display) {
											var k = f(d.fontColor, q.defaultFontColor);
											if(g.font = l, g.save(), g.translate(a.xCenter, a.yCenter), g.rotate(h), d.showLabelBackdrop) {
												var m = g.measureText(b).width;
												g.fillStyle = d.backdropColor, g.fillRect(-m / 2 - d.backdropPaddingX, -j - i / 2 - d.backdropPaddingY, m + 2 * d.backdropPaddingX, i + 2 * d.backdropPaddingY)
											}
											g.textAlign = "center", g.textBaseline = "middle", g.fillStyle = k, g.fillText(b, 0, -j), g.restore()
										}
									}
								}), (b.angleLines.display || b.pointLabels.display) && n(a)
							}
						}
					});
				a.scaleService.registerScaleType("radialLinear", s, r)
			}
		}, {
			25: 25,
			34: 34,
			45: 45
		}],
		57: [function(a, b, c) {
			"use strict";

			function d(a, b) {
				return a - b
			}

			function e(a) {
				var b, c, d, e = {},
					f = [];
				for(b = 0, c = a.length; b < c; ++b) d = a[b], e[d] || (e[d] = !0, f.push(d));
				return f
			}

			function f(a, b, c, d) {
				if("linear" === d || !a.length) return [{
					time: b,
					pos: 0
				}, {
					time: c,
					pos: 1
				}];
				var e, f, g, h, i, j = [],
					k = [b];
				for(e = 0, f = a.length; e < f; ++e)(h = a[e]) > b && h < c && k.push(h);
				for(k.push(c), e = 0, f = k.length; e < f; ++e) i = k[e + 1], g = k[e - 1], h = k[e], void 0 !== g && void 0 !== i && Math.round((i + g) / 2) === h || j.push({
					time: h,
					pos: e / (f - 1)
				});
				return j
			}

			function g(a, b, c) {
				for(var d, e, f, g = 0, h = a.length - 1; g >= 0 && g <= h;) {
					if(d = g + h >> 1, e = a[d - 1] || null, f = a[d], !e) return {
						lo: null,
						hi: f
					};
					if(f[b] < c) g = d + 1;
					else {
						if(!(e[b] > c)) return {
							lo: e,
							hi: f
						};
						h = d - 1
					}
				}
				return {
					lo: f,
					hi: null
				}
			}

			function h(a, b, c, d) {
				var e = g(a, b, c),
					f = e.lo ? e.hi ? e.lo : a[a.length - 2] : a[0],
					h = e.lo ? e.hi ? e.hi : a[a.length - 1] : a[1],
					i = h[b] - f[b],
					j = i ? (c - f[b]) / i : 0,
					k = (h[d] - f[d]) * j;
				return f[d] + k
			}

			function i(a, b) {
				var c = b.parser,
					d = b.parser || b.format;
				return "function" == typeof c ? c(a) : "string" == typeof a && "string" == typeof d ? q(a, d) : (a instanceof q || (a = q(a)), a.isValid() ? a : "function" == typeof d ? d(a) : a)
			}

			function j(a, b) {
				if(s.isNullOrUndef(a)) return null;
				var c = b.options.time,
					d = i(b.getRightValue(a), c);
				return d.isValid() ? (c.round && d.startOf(c.round), d.valueOf()) : null
			}

			function k(a, b, c, d) {
				var e, f, g, h = b - a,
					i = v[c],
					j = i.size,
					k = i.steps;
				if(!k) return Math.ceil(h / ((d || 1) * j));
				for(e = 0, f = k.length; e < f && (g = k[e], !(Math.ceil(h / (j * g)) <= d)); ++e);
				return g
			}

			function l(a, b, c, d) {
				var e, f, g, h = w.length;
				for(e = w.indexOf(a); e < h - 1; ++e)
					if(f = v[w[e]], g = f.steps ? f.steps[f.steps.length - 1] : u, Math.ceil((c - b) / (g * f.size)) <= d) return w[e];
				return w[h - 1]
			}

			function m(a) {
				for(var b = w.indexOf(a) + 1, c = w.length; b < c; ++b)
					if(v[w[b]].major) return w[b]
			}

			function n(a, b, c, d, e, f) {
				var g, h = f.time,
					i = s.valueOrDefault(h.stepSize, h.unitStepSize),
					j = "week" === c && h.isoWeekday,
					l = f.ticks.major.enabled,
					m = v[c],
					n = q(a),
					o = q(b),
					p = [];
				for(i || (i = k(a, b, c, e)), j && (n = n.isoWeekday(j), o = o.isoWeekday(j)), n = n.startOf(j ? "day" : c), o = o.startOf(j ? "day" : c), o < b && o.add(1, c), g = q(n), l && d && !j && !h.round && (g.startOf(d), g.add(~~((n - g) / (m.size * i)) * i, c)); g < o; g.add(i, c)) p.push(+g);
				return p.push(+g), p
			}

			function o(a, b, c, d, e) {
				var f, g, i = 0,
					j = 0;
				return e.offset && b.length && (e.time.min || (f = b.length > 1 ? b[1] : d, g = b[0], i = (h(a, "time", f, "pos") - h(a, "time", g, "pos")) / 2), e.time.max || (f = b[b.length - 1], g = b.length > 1 ? b[b.length - 2] : c, j = (h(a, "time", f, "pos") - h(a, "time", g, "pos")) / 2)), {
					left: i,
					right: j
				}
			}

			function p(a, b) {
				var c, d, e, f, g = [];
				for(c = 0, d = a.length; c < d; ++c) e = a[c], f = !!b && e === +q(e).startOf(b), g.push({
					value: e,
					major: f
				});
				return g
			}
			var q = a(1);
			q = "function" == typeof q ? q : window.moment;
			var r = a(25),
				s = a(45),
				t = Number.MIN_SAFE_INTEGER || -9007199254740991,
				u = Number.MAX_SAFE_INTEGER || 9007199254740991,
				v = {
					millisecond: {
						major: !0,
						size: 1,
						steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
					},
					second: {
						major: !0,
						size: 1e3,
						steps: [1, 2, 5, 10, 30]
					},
					minute: {
						major: !0,
						size: 6e4,
						steps: [1, 2, 5, 10, 30]
					},
					hour: {
						major: !0,
						size: 36e5,
						steps: [1, 2, 3, 6, 12]
					},
					day: {
						major: !0,
						size: 864e5,
						steps: [1, 2, 5]
					},
					week: {
						major: !1,
						size: 6048e5,
						steps: [1, 2, 3, 4]
					},
					month: {
						major: !0,
						size: 2628e6,
						steps: [1, 2, 3]
					},
					quarter: {
						major: !1,
						size: 7884e6,
						steps: [1, 2, 3, 4]
					},
					year: {
						major: !0,
						size: 3154e7
					}
				},
				w = Object.keys(v);
			b.exports = function(a) {
				var b = {
						position: "bottom",
						distribution: "linear",
						bounds: "data",
						time: {
							parser: !1,
							format: !1,
							unit: !1,
							round: !1,
							displayFormat: !1,
							isoWeekday: !1,
							minUnit: "millisecond",
							displayFormats: {
								millisecond: "h:mm:ss.SSS a",
								second: "h:mm:ss a",
								minute: "h:mm a",
								hour: "hA",
								day: "MMM D",
								week: "ll",
								month: "MMM YYYY",
								quarter: "[Q]Q - YYYY",
								year: "YYYY"
							}
						},
						ticks: {
							autoSkip: !1,
							source: "auto",
							major: {
								enabled: !1
							}
						}
					},
					c = a.Scale.extend({
						initialize: function() {
							if(!q) throw new Error("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com");
							this.mergeTicksOptions(), a.Scale.prototype.initialize.call(this)
						},
						update: function() {
							var b = this,
								c = b.options;
							return c.time && c.time.format && console.warn("options.time.format is deprecated and replaced by options.time.parser."), a.Scale.prototype.update.apply(b, arguments)
						},
						getRightValue: function(b) {
							return b && void 0 !== b.t && (b = b.t), a.Scale.prototype.getRightValue.call(this, b)
						},
						determineDataLimits: function() {
							var a, b, c, f, g, h, i = this,
								k = i.chart,
								l = i.options.time,
								m = j(l.min, i) || u,
								n = j(l.max, i) || t,
								o = [],
								p = [],
								r = [];
							for(a = 0, c = k.data.labels.length; a < c; ++a) r.push(j(k.data.labels[a], i));
							for(a = 0, c = (k.data.datasets || []).length; a < c; ++a)
								if(k.isDatasetVisible(a))
									if(g = k.data.datasets[a].data, s.isObject(g[0]))
										for(p[a] = [], b = 0, f = g.length; b < f; ++b) h = j(g[b], i), o.push(h), p[a][b] = h;
									else o.push.apply(o, r), p[a] = r.slice(0);
							else p[a] = [];
							r.length && (r = e(r).sort(d), m = Math.min(m, r[0]), n = Math.max(n, r[r.length - 1])), o.length && (o = e(o).sort(d), m = Math.min(m, o[0]), n = Math.max(n, o[o.length - 1])), m = m === u ? +q().startOf("day") : m, n = n === t ? +q().endOf("day") + 1 : n, i.min = Math.min(m, n), i.max = Math.max(m + 1, n), i._horizontal = i.isHorizontal(), i._table = [], i._timestamps = {
								data: o,
								datasets: p,
								labels: r
							}
						},
						buildTicks: function() {
							var a, b, c, d = this,
								e = d.min,
								g = d.max,
								h = d.options,
								i = h.time,
								k = i.displayFormats,
								q = d.getLabelCapacity(e),
								r = i.unit || l(i.minUnit, e, g, q),
								s = m(r),
								t = [],
								u = [];
							switch(h.ticks.source) {
								case "data":
									t = d._timestamps.data;
									break;
								case "labels":
									t = d._timestamps.labels;
									break;
								case "auto":
								default:
									t = n(e, g, r, s, q, h)
							}
							for("ticks" === h.bounds && t.length && (e = t[0], g = t[t.length - 1]), e = j(i.min, d) || e, g = j(i.max, d) || g, a = 0, b = t.length; a < b; ++a)(c = t[a]) >= e && c <= g && u.push(c);
							return d.min = e, d.max = g, d._unit = r, d._majorUnit = s, d._minorFormat = k[r], d._majorFormat = k[s], d._table = f(d._timestamps.data, e, g, h.distribution), d._offsets = o(d._table, u, e, g, h), p(u, s)
						},
						getLabelForIndex: function(a, b) {
							var c = this,
								d = c.chart.data,
								e = c.options.time,
								f = d.labels && a < d.labels.length ? d.labels[a] : "",
								g = d.datasets[b].data[a];
							return s.isObject(g) && (f = c.getRightValue(g)), e.tooltipFormat && (f = i(f, e).format(e.tooltipFormat)), f
						},
						tickFormatFunction: function(a, b, c) {
							var d = this,
								e = d.options,
								f = a.valueOf(),
								g = d._majorUnit,
								h = d._majorFormat,
								i = a.clone().startOf(d._majorUnit).valueOf(),
								j = e.ticks.major,
								k = j.enabled && g && h && f === i,
								l = a.format(k ? h : d._minorFormat),
								m = k ? j : e.ticks.minor,
								n = s.valueOrDefault(m.callback, m.userCallback);
							return n ? n(l, b, c) : l
						},
						convertTicksToLabels: function(a) {
							var b, c, d = [];
							for(b = 0, c = a.length; b < c; ++b) d.push(this.tickFormatFunction(q(a[b].value), b, a));
							return d
						},
						getPixelForOffset: function(a) {
							var b = this,
								c = b._horizontal ? b.width : b.height,
								d = b._horizontal ? b.left : b.top,
								e = h(b._table, "time", a, "pos");
							return d + c * (b._offsets.left + e) / (b._offsets.left + 1 + b._offsets.right)
						},
						getPixelForValue: function(a, b, c) {
							var d = this,
								e = null;
							if(void 0 !== b && void 0 !== c && (e = d._timestamps.datasets[c][b]), null === e && (e = j(a, d)), null !== e) return d.getPixelForOffset(e)
						},
						getPixelForTick: function(a) {
							var b = this.getTicks();
							return a >= 0 && a < b.length ? this.getPixelForOffset(b[a].value) : null
						},
						getValueForPixel: function(a) {
							var b = this,
								c = b._horizontal ? b.width : b.height,
								d = b._horizontal ? b.left : b.top,
								e = (c ? (a - d) / c : 0) * (b._offsets.left + 1 + b._offsets.left) - b._offsets.right,
								f = h(b._table, "pos", e, "time");
							return q(f)
						},
						getLabelWidth: function(a) {
							var b = this,
								c = b.options.ticks,
								d = b.ctx.measureText(a).width,
								e = s.toRadians(c.maxRotation),
								f = Math.cos(e),
								g = Math.sin(e);
							return d * f + s.valueOrDefault(c.fontSize, r.global.defaultFontSize) * g
						},
						getLabelCapacity: function(a) {
							var b = this;
							b._minorFormat = b.options.time.displayFormats.millisecond;
							var c = b.tickFormatFunction(q(a), 0, []),
								d = b.getLabelWidth(c),
								e = b.isHorizontal() ? b.width : b.height;
							return Math.floor(e / d)
						}
					});
				a.scaleService.registerScaleType("time", c, b)
			}
		}, {
			1: 1,
			25: 25,
			45: 45
		}]
	}, {}, [7])(7)
});
var canvas = document.getElementById("canvas"),
	tooltipCanvas = document.getElementById("tooltip-canvas"),
	gradientBlue = canvas.getContext("2d").createLinearGradient(0, 0, 0, 150);
gradientBlue.addColorStop(0, "#5555FF"), gradientBlue.addColorStop(1, "#9787FF");
var gradientRed = canvas.getContext("2d").createLinearGradient(0, 0, 0, 150);
gradientRed.addColorStop(0, "#FF55B8"), gradientRed.addColorStop(1, "#FF8787");
var gradientGrey = canvas.getContext("2d").createLinearGradient(0, 0, 0, 150);
gradientGrey.addColorStop(0, "#888888"), gradientGrey.addColorStop(1, "#AAAAAA"), window.arcSpacing = .15, window.segmentHovered = !1, Chart.elements.Arc.prototype.draw = function() {
	var a = this._chart.ctx,
		b = this._view,
		c = b.startAngle,
		d = b.endAngle;
	a.beginPath(), a.arc(b.x, b.y, b.outerRadius, c + window.arcSpacing, d - window.arcSpacing), a.strokeStyle = b.backgroundColor, a.lineWidth = b.borderWidth, a.lineCap = "round", a.stroke(), a.closePath()
};
var config = {
	type: "doughnut",
	data: {
		labels: ["Chrome", "Mozila", "Safari"],
		datasets: [{
			data: [400, 540, 290],
			backgroundColor: [gradientRed, gradientGrey, gradientBlue]
		}]
	},
	options: {
		cutoutPercentage: 80,
		elements: {
			arc: {
				borderWidth: 10
			}
		},
		legend: {
			display: !1
		},
		animation: {
			onComplete: function(a) {
				if(!window.segmentHovered) {
					textInCenter(this.config.data.datasets[0].data.reduce(function(a, b) {
						return a + b
					}, 0), "T O T A L")
				}
			}
		},
		tooltips: {
			enabled: !1,
			custom: function(a) {
				if(a.body) {
					var b = a.body[0].lines[0],
						c = b.split(": ");
					textInCenter(c[1], c[0].split("").join(" ").toUpperCase()), window.segmentHovered = !0
				} else window.segmentHovered = !1
			}
		}
	}
};
window.chart = new Chart(canvas, config);