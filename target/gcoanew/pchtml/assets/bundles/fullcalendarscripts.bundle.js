(function(a) {
	function b(a, b, c) {
		switch(arguments.length) {
			case 2:
				return null != a ? a : b;
			case 3:
				return null != a ? a : null != b ? b : c;
			default:
				throw new Error("Implement me")
		}
	}

	function c(a, b) {
		return xa.call(a, b)
	}

	function d() {
		return {
			empty: !1,
			unusedTokens: [],
			unusedInput: [],
			overflow: -2,
			charsLeftOver: 0,
			nullInput: !1,
			invalidMonth: null,
			invalidFormat: !1,
			userInvalidated: !1,
			iso: !1
		}
	}

	function e(a) {
		!1 === sa.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + a)
	}

	function f(a, b) {
		var c = !0;
		return n(function() {
			return c && (e(a), c = !1), b.apply(this, arguments)
		}, b)
	}

	function g(a, b) {
		nb[a] || (e(b), nb[a] = !0)
	}

	function h(a, b) {
		return function(c) {
			return q(a.call(this, c), b)
		}
	}

	function i(a, b) {
		var c, d, e = 12 * (b.year() - a.year()) + (b.month() - a.month()),
			f = a.clone().add(e, "months");
		return 0 > b - f ? (c = a.clone().add(e - 1, "months"), d = (b - f) / (f - c)) : (c = a.clone().add(e + 1, "months"), d = (b - f) / (c - f)), -(e + d)
	}

	function j(a, b, c) {
		var d;
		return null == c ? b : null != a.meridiemHour ? a.meridiemHour(b, c) : null != a.isPM ? (d = a.isPM(c), d && 12 > b && (b += 12), d || 12 !== b || (b = 0), b) : b
	}

	function k() {}

	function l(a, b) {
		!1 !== b && F(a), o(this, a), this._d = new Date(+a._d), !1 === pb && (pb = !0, sa.updateOffset(this), pb = !1)
	}

	function m(a) {
		var b = z(a),
			c = b.year || 0,
			d = b.quarter || 0,
			e = b.month || 0,
			f = b.week || 0,
			g = b.day || 0,
			h = b.hour || 0,
			i = b.minute || 0,
			j = b.second || 0,
			k = b.millisecond || 0;
		this._milliseconds = +k + 1e3 * j + 6e4 * i + 36e5 * h, this._days = +g + 7 * f, this._months = +e + 3 * d + 12 * c, this._data = {}, this._locale = sa.localeData(), this._bubble()
	}

	function n(a, b) {
		for(var d in b) c(b, d) && (a[d] = b[d]);
		return c(b, "toString") && (a.toString = b.toString), c(b, "valueOf") && (a.valueOf = b.valueOf), a
	}

	function o(a, b) {
		var c, d, e;
		if(void 0 !== b._isAMomentObject && (a._isAMomentObject = b._isAMomentObject), void 0 !== b._i && (a._i = b._i), void 0 !== b._f && (a._f = b._f), void 0 !== b._l && (a._l = b._l), void 0 !== b._strict && (a._strict = b._strict), void 0 !== b._tzm && (a._tzm = b._tzm), void 0 !== b._isUTC && (a._isUTC = b._isUTC), void 0 !== b._offset && (a._offset = b._offset), void 0 !== b._pf && (a._pf = b._pf), void 0 !== b._locale && (a._locale = b._locale), Ga.length > 0)
			for(c in Ga) d = Ga[c], void 0 !== (e = b[d]) && (a[d] = e);
		return a
	}

	function p(a) {
		return 0 > a ? Math.ceil(a) : Math.floor(a)
	}

	function q(a, b, c) {
		for(var d = "" + Math.abs(a), e = a >= 0; d.length < b;) d = "0" + d;
		return(e ? c ? "+" : "" : "-") + d
	}

	function r(a, b) {
		var c = {
			milliseconds: 0,
			months: 0
		};
		return c.months = b.month() - a.month() + 12 * (b.year() - a.year()), a.clone().add(c.months, "M").isAfter(b) && --c.months, c.milliseconds = +b - +a.clone().add(c.months, "M"), c
	}

	function s(a, b) {
		var c;
		return b = K(b, a), a.isBefore(b) ? c = r(a, b) : (c = r(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months), c
	}

	function t(a, b) {
		return function(c, d) {
			var e, f;
			return null === d || isNaN(+d) || (g(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period)."), f = c, c = d, d = f), c = "string" == typeof c ? +c : c, e = sa.duration(c, d), u(this, e, a), this
		}
	}

	function u(a, b, c, d) {
		var e = b._milliseconds,
			f = b._days,
			g = b._months;
		d = null == d || d, e && a._d.setTime(+a._d + e * c), f && na(a, "Date", ma(a, "Date") + f * c), g && la(a, ma(a, "Month") + g * c), d && sa.updateOffset(a, f || g)
	}

	function v(a) {
		return "[object Array]" === Object.prototype.toString.call(a)
	}

	function w(a) {
		return "[object Date]" === Object.prototype.toString.call(a) || a instanceof Date
	}

	function x(a, b, c) {
		var d, e = Math.min(a.length, b.length),
			f = Math.abs(a.length - b.length),
			g = 0;
		for(d = 0; e > d; d++)(c && a[d] !== b[d] || !c && A(a[d]) !== A(b[d])) && g++;
		return g + f
	}

	function y(a) {
		if(a) {
			var b = a.toLowerCase().replace(/(.)s$/, "$1");
			a = gb[a] || hb[b] || b
		}
		return a
	}

	function z(a) {
		var b, d, e = {};
		for(d in a) c(a, d) && (b = y(d)) && (e[b] = a[d]);
		return e
	}

	function A(a) {
		var b = +a,
			c = 0;
		return 0 !== b && isFinite(b) && (c = b >= 0 ? Math.floor(b) : Math.ceil(b)), c
	}

	function B(a, b) {
		return new Date(Date.UTC(a, b + 1, 0)).getUTCDate()
	}

	function C(a, b, c) {
		return ha(sa([a, 11, 31 + b - c]), b, c).week
	}

	function D(a) {
		return E(a) ? 366 : 365
	}

	function E(a) {
		return a % 4 == 0 && a % 100 != 0 || a % 400 == 0
	}

	function F(a) {
		var b;
		a._a && -2 === a._pf.overflow && (b = a._a[za] < 0 || a._a[za] > 11 ? za : a._a[Aa] < 1 || a._a[Aa] > B(a._a[ya], a._a[za]) ? Aa : a._a[Ba] < 0 || a._a[Ba] > 24 || 24 === a._a[Ba] && (0 !== a._a[Ca] || 0 !== a._a[Da] || 0 !== a._a[Ea]) ? Ba : a._a[Ca] < 0 || a._a[Ca] > 59 ? Ca : a._a[Da] < 0 || a._a[Da] > 59 ? Da : a._a[Ea] < 0 || a._a[Ea] > 999 ? Ea : -1, a._pf._overflowDayOfYear && (ya > b || b > Aa) && (b = Aa), a._pf.overflow = b)
	}

	function G(b) {
		return null == b._isValid && (b._isValid = !isNaN(b._d.getTime()) && b._pf.overflow < 0 && !b._pf.empty && !b._pf.invalidMonth && !b._pf.nullInput && !b._pf.invalidFormat && !b._pf.userInvalidated, b._strict && (b._isValid = b._isValid && 0 === b._pf.charsLeftOver && 0 === b._pf.unusedTokens.length && b._pf.bigHour === a)), b._isValid
	}

	function H(a) {
		return a ? a.toLowerCase().replace("_", "-") : a
	}

	function I(a) {
		for(var b, c, d, e, f = 0; f < a.length;) {
			for(e = H(a[f]).split("-"), b = e.length, c = H(a[f + 1]), c = c ? c.split("-") : null; b > 0;) {
				if(d = J(e.slice(0, b).join("-"))) return d;
				if(c && c.length >= b && x(e, c, !0) >= b - 1) break;
				b--
			}
			f++
		}
		return null
	}

	function J(a) {
		var b = null;
		if(!Fa[a] && Ha) try {
			b = sa.locale(), require("./locale/" + a), sa.locale(b)
		} catch(a) {}
		return Fa[a]
	}

	function K(a, b) {
		var c, d;
		return b._isUTC ? (c = b.clone(), d = (sa.isMoment(a) || w(a) ? +a : +sa(a)) - +c, c._d.setTime(+c._d + d), sa.updateOffset(c, !1), c) : sa(a).local()
	}

	function L(a) {
		return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "")
	}

	function M(a) {
		var b, c, d = a.match(La);
		for(b = 0, c = d.length; c > b; b++) d[b] = mb[d[b]] ? mb[d[b]] : L(d[b]);
		return function(e) {
			var f = "";
			for(b = 0; c > b; b++) f += d[b] instanceof Function ? d[b].call(e, a) : d[b];
			return f
		}
	}

	function N(a, b) {
		return a.isValid() ? (b = O(b, a.localeData()), ib[b] || (ib[b] = M(b)), ib[b](a)) : a.localeData().invalidDate()
	}

	function O(a, b) {
		function c(a) {
			return b.longDateFormat(a) || a
		}
		var d = 5;
		for(Ma.lastIndex = 0; d >= 0 && Ma.test(a);) a = a.replace(Ma, c), Ma.lastIndex = 0, d -= 1;
		return a
	}

	function P(a, b) {
		var c = b._strict;
		switch(a) {
			case "Q":
				return Xa;
			case "DDDD":
				return Za;
			case "YYYY":
			case "GGGG":
			case "gggg":
				return c ? $a : Pa;
			case "Y":
			case "G":
			case "g":
				return ab;
			case "YYYYYY":
			case "YYYYY":
			case "GGGGG":
			case "ggggg":
				return c ? _a : Qa;
			case "S":
				if(c) return Xa;
			case "SS":
				if(c) return Ya;
			case "SSS":
				if(c) return Za;
			case "DDD":
				return Oa;
			case "MMM":
			case "MMMM":
			case "dd":
			case "ddd":
			case "dddd":
				return Sa;
			case "a":
			case "A":
				return b._locale._meridiemParse;
			case "x":
				return Va;
			case "X":
				return Wa;
			case "Z":
			case "ZZ":
				return Ta;
			case "T":
				return Ua;
			case "SSSS":
				return Ra;
			case "MM":
			case "DD":
			case "YY":
			case "GG":
			case "gg":
			case "HH":
			case "hh":
			case "mm":
			case "ss":
			case "ww":
			case "WW":
				return c ? Ya : Na;
			case "M":
			case "D":
			case "d":
			case "H":
			case "h":
			case "m":
			case "s":
			case "w":
			case "W":
			case "e":
			case "E":
				return Na;
			case "Do":
				return c ? b._locale._ordinalParse : b._locale._ordinalParseLenient;
			default:
				return new RegExp(Y(X(a.replace("\\", ""))))
		}
	}

	function Q(a) {
		a = a || "";
		var b = a.match(Ta) || [],
			c = b[b.length - 1] || [],
			d = (c + "").match(eb) || ["-", 0, 0],
			e = 60 * d[1] + A(d[2]);
		return "+" === d[0] ? e : -e
	}

	function R(a, b, c) {
		var d, e = c._a;
		switch(a) {
			case "Q":
				null != b && (e[za] = 3 * (A(b) - 1));
				break;
			case "M":
			case "MM":
				null != b && (e[za] = A(b) - 1);
				break;
			case "MMM":
			case "MMMM":
				d = c._locale.monthsParse(b, a, c._strict), null != d ? e[za] = d : c._pf.invalidMonth = b;
				break;
			case "D":
			case "DD":
				null != b && (e[Aa] = A(b));
				break;
			case "Do":
				null != b && (e[Aa] = A(parseInt(b.match(/\d{1,2}/)[0], 10)));
				break;
			case "DDD":
			case "DDDD":
				null != b && (c._dayOfYear = A(b));
				break;
			case "YY":
				e[ya] = sa.parseTwoDigitYear(b);
				break;
			case "YYYY":
			case "YYYYY":
			case "YYYYYY":
				e[ya] = A(b);
				break;
			case "a":
			case "A":
				c._meridiem = b;
				break;
			case "h":
			case "hh":
				c._pf.bigHour = !0;
			case "H":
			case "HH":
				e[Ba] = A(b);
				break;
			case "m":
			case "mm":
				e[Ca] = A(b);
				break;
			case "s":
			case "ss":
				e[Da] = A(b);
				break;
			case "S":
			case "SS":
			case "SSS":
			case "SSSS":
				e[Ea] = A(1e3 * ("0." + b));
				break;
			case "x":
				c._d = new Date(A(b));
				break;
			case "X":
				c._d = new Date(1e3 * parseFloat(b));
				break;
			case "Z":
			case "ZZ":
				c._useUTC = !0, c._tzm = Q(b);
				break;
			case "dd":
			case "ddd":
			case "dddd":
				d = c._locale.weekdaysParse(b), null != d ? (c._w = c._w || {}, c._w.d = d) : c._pf.invalidWeekday = b;
				break;
			case "w":
			case "ww":
			case "W":
			case "WW":
			case "d":
			case "e":
			case "E":
				a = a.substr(0, 1);
			case "gggg":
			case "GGGG":
			case "GGGGG":
				a = a.substr(0, 2), b && (c._w = c._w || {}, c._w[a] = A(b));
				break;
			case "gg":
			case "GG":
				c._w = c._w || {}, c._w[a] = sa.parseTwoDigitYear(b)
		}
	}

	function S(a) {
		var c, d, e, f, g, h, i;
		c = a._w, null != c.GG || null != c.W || null != c.E ? (g = 1, h = 4, d = b(c.GG, a._a[ya], ha(sa(), 1, 4).year), e = b(c.W, 1), f = b(c.E, 1)) : (g = a._locale._week.dow, h = a._locale._week.doy, d = b(c.gg, a._a[ya], ha(sa(), g, h).year), e = b(c.w, 1), null != c.d ? (f = c.d, g > f && ++e) : f = null != c.e ? c.e + g : g), i = ia(d, e, f, h, g), a._a[ya] = i.year, a._dayOfYear = i.dayOfYear
	}

	function T(a) {
		var c, d, e, f, g = [];
		if(!a._d) {
			for(e = V(a), a._w && null == a._a[Aa] && null == a._a[za] && S(a), a._dayOfYear && (f = b(a._a[ya], e[ya]), a._dayOfYear > D(f) && (a._pf._overflowDayOfYear = !0), d = da(f, 0, a._dayOfYear), a._a[za] = d.getUTCMonth(), a._a[Aa] = d.getUTCDate()), c = 0; 3 > c && null == a._a[c]; ++c) a._a[c] = g[c] = e[c];
			for(; 7 > c; c++) a._a[c] = g[c] = null == a._a[c] ? 2 === c ? 1 : 0 : a._a[c];
			24 === a._a[Ba] && 0 === a._a[Ca] && 0 === a._a[Da] && 0 === a._a[Ea] && (a._nextDay = !0, a._a[Ba] = 0), a._d = (a._useUTC ? da : ca).apply(null, g), null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm), a._nextDay && (a._a[Ba] = 24)
		}
	}

	function U(a) {
		var b;
		a._d || (b = z(a._i), a._a = [b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond], T(a))
	}

	function V(a) {
		var b = new Date;
		return a._useUTC ? [b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate()] : [b.getFullYear(), b.getMonth(), b.getDate()]
	}

	function W(b) {
		if(b._f === sa.ISO_8601) return void $(b);
		b._a = [], b._pf.empty = !0;
		var c, d, e, f, g, h = "" + b._i,
			i = h.length,
			k = 0;
		for(e = O(b._f, b._locale).match(La) || [], c = 0; c < e.length; c++) f = e[c], d = (h.match(P(f, b)) || [])[0], d && (g = h.substr(0, h.indexOf(d)), g.length > 0 && b._pf.unusedInput.push(g), h = h.slice(h.indexOf(d) + d.length), k += d.length), mb[f] ? (d ? b._pf.empty = !1 : b._pf.unusedTokens.push(f), R(f, d, b)) : b._strict && !d && b._pf.unusedTokens.push(f);
		b._pf.charsLeftOver = i - k, h.length > 0 && b._pf.unusedInput.push(h), !0 === b._pf.bigHour && b._a[Ba] <= 12 && (b._pf.bigHour = a), b._a[Ba] = j(b._locale, b._a[Ba], b._meridiem), T(b), F(b)
	}

	function X(a) {
		return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(a, b, c, d, e) {
			return b || c || d || e
		})
	}

	function Y(a) {
		return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
	}

	function Z(a) {
		var b, c, e, f, g;
		if(0 === a._f.length) return a._pf.invalidFormat = !0, void(a._d = new Date(NaN));
		for(f = 0; f < a._f.length; f++) g = 0, b = o({}, a), null != a._useUTC && (b._useUTC = a._useUTC), b._pf = d(), b._f = a._f[f], W(b), G(b) && (g += b._pf.charsLeftOver, g += 10 * b._pf.unusedTokens.length, b._pf.score = g, (null == e || e > g) && (e = g, c = b));
		n(a, c || b)
	}

	function $(a) {
		var b, c, d = a._i,
			e = bb.exec(d);
		if(e) {
			for(a._pf.iso = !0, b = 0, c = cb.length; c > b; b++)
				if(cb[b][1].exec(d)) {
					a._f = cb[b][0] + (e[6] || " ");
					break
				}
			for(b = 0, c = db.length; c > b; b++)
				if(db[b][1].exec(d)) {
					a._f += db[b][0];
					break
				}
			d.match(Ta) && (a._f += "Z"), W(a)
		} else a._isValid = !1
	}

	function _(a) {
		$(a), !1 === a._isValid && (delete a._isValid, sa.createFromInputFallback(a))
	}

	function aa(a, b) {
		var c, d = [];
		for(c = 0; c < a.length; ++c) d.push(b(a[c], c));
		return d
	}

	function ba(b) {
		var c, d = b._i;
		d === a ? b._d = new Date : w(d) ? b._d = new Date(+d) : null !== (c = Ia.exec(d)) ? b._d = new Date(+c[1]) : "string" == typeof d ? _(b) : v(d) ? (b._a = aa(d.slice(0), function(a) {
			return parseInt(a, 10)
		}), T(b)) : "object" == typeof d ? U(b) : "number" == typeof d ? b._d = new Date(d) : sa.createFromInputFallback(b)
	}

	function ca(a, b, c, d, e, f, g) {
		var h = new Date(a, b, c, d, e, f, g);
		return 1970 > a && h.setFullYear(a), h
	}

	function da(a) {
		var b = new Date(Date.UTC.apply(null, arguments));
		return 1970 > a && b.setUTCFullYear(a), b
	}

	function ea(a, b) {
		if("string" == typeof a)
			if(isNaN(a)) {
				if("number" != typeof(a = b.weekdaysParse(a))) return null
			} else a = parseInt(a, 10);
		return a
	}

	function fa(a, b, c, d, e) {
		return e.relativeTime(b || 1, !!c, a, d)
	}

	function ga(a, b, c) {
		var d = sa.duration(a).abs(),
			e = wa(d.as("s")),
			f = wa(d.as("m")),
			g = wa(d.as("h")),
			h = wa(d.as("d")),
			i = wa(d.as("M")),
			j = wa(d.as("y")),
			k = e < jb.s && ["s", e] || 1 === f && ["m"] || f < jb.m && ["mm", f] || 1 === g && ["h"] || g < jb.h && ["hh", g] || 1 === h && ["d"] || h < jb.d && ["dd", h] || 1 === i && ["M"] || i < jb.M && ["MM", i] || 1 === j && ["y"] || ["yy", j];
		return k[2] = b, k[3] = +a > 0, k[4] = c, fa.apply({}, k)
	}

	function ha(a, b, c) {
		var d, e = c - b,
			f = c - a.day();
		return f > e && (f -= 7), e - 7 > f && (f += 7), d = sa(a).add(f, "d"), {
			week: Math.ceil(d.dayOfYear() / 7),
			year: d.year()
		}
	}

	function ia(a, b, c, d, e) {
		var f, g, h = da(a, 0, 1).getUTCDay();
		return h = 0 === h ? 7 : h, c = null != c ? c : e, f = e - h + (h > d ? 7 : 0) - (e > h ? 7 : 0), g = 7 * (b - 1) + (c - e) + f + 1, {
			year: g > 0 ? a : a - 1,
			dayOfYear: g > 0 ? g : D(a - 1) + g
		}
	}

	function ja(b) {
		var c, d = b._i,
			e = b._f;
		return b._locale = b._locale || sa.localeData(b._l), null === d || e === a && "" === d ? sa.invalid({
			nullInput: !0
		}) : ("string" == typeof d && (b._i = d = b._locale.preparse(d)), sa.isMoment(d) ? new l(d, !0) : (e ? v(e) ? Z(b) : W(b) : ba(b), c = new l(b), c._nextDay && (c.add(1, "d"), c._nextDay = a), c))
	}

	function ka(a, b) {
		var c, d;
		if(1 === b.length && v(b[0]) && (b = b[0]), !b.length) return sa();
		for(c = b[0], d = 1; d < b.length; ++d) b[d][a](c) && (c = b[d]);
		return c
	}

	function la(a, b) {
		var c;
		return "string" == typeof b && "number" != typeof(b = a.localeData().monthsParse(b)) ? a : (c = Math.min(a.date(), B(a.year(), b)), a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a)
	}

	function ma(a, b) {
		return a._d["get" + (a._isUTC ? "UTC" : "") + b]()
	}

	function na(a, b, c) {
		return "Month" === b ? la(a, c) : a._d["set" + (a._isUTC ? "UTC" : "") + b](c)
	}

	function oa(a, b) {
		return function(c) {
			return null != c ? (na(this, a, c), sa.updateOffset(this, b), this) : ma(this, a)
		}
	}

	function pa(a) {
		return 400 * a / 146097
	}

	function qa(a) {
		return 146097 * a / 400
	}

	function ra(a) {
		"undefined" == typeof ender && (ta = va.moment, va.moment = a ? f("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", sa) : sa)
	}
	for(var sa, ta, ua, va = "undefined" == typeof global || "undefined" != typeof window && window !== global.window ? this : global, wa = Math.round, xa = Object.prototype.hasOwnProperty, ya = 0, za = 1, Aa = 2, Ba = 3, Ca = 4, Da = 5, Ea = 6, Fa = {}, Ga = [], Ha = "undefined" != typeof module && module && module.exports, Ia = /^\/?Date\((\-?\d+)/i, Ja = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Ka = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, La = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g, Ma = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Na = /\d\d?/, Oa = /\d{1,3}/, Pa = /\d{1,4}/, Qa = /[+\-]?\d{1,6}/, Ra = /\d+/, Sa = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Ta = /Z|[\+\-]\d\d:?\d\d/gi, Ua = /T/i, Va = /[\+\-]?\d+/, Wa = /[\+\-]?\d+(\.\d{1,3})?/, Xa = /\d/, Ya = /\d\d/, Za = /\d{3}/, $a = /\d{4}/, _a = /[+-]?\d{6}/, ab = /[+-]?\d+/, bb = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, cb = [
			["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/],
			["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/],
			["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/],
			["GGGG-[W]WW", /\d{4}-W\d{2}/],
			["YYYY-DDD", /\d{4}-\d{3}/]
		], db = [
			["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/],
			["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
			["HH:mm", /(T| )\d\d:\d\d/],
			["HH", /(T| )\d\d/]
		], eb = /([\+\-]|\d\d)/gi, fb = ("Date|Hours|Minutes|Seconds|Milliseconds".split("|"), {
			Milliseconds: 1,
			Seconds: 1e3,
			Minutes: 6e4,
			Hours: 36e5,
			Days: 864e5,
			Months: 2592e6,
			Years: 31536e6
		}), gb = {
			ms: "millisecond",
			s: "second",
			m: "minute",
			h: "hour",
			d: "day",
			D: "date",
			w: "week",
			W: "isoWeek",
			M: "month",
			Q: "quarter",
			y: "year",
			DDD: "dayOfYear",
			e: "weekday",
			E: "isoWeekday",
			gg: "weekYear",
			GG: "isoWeekYear"
		}, hb = {
			dayofyear: "dayOfYear",
			isoweekday: "isoWeekday",
			isoweek: "isoWeek",
			weekyear: "weekYear",
			isoweekyear: "isoWeekYear"
		}, ib = {}, jb = {
			s: 45,
			m: 45,
			h: 22,
			d: 26,
			M: 11
		}, kb = "DDD w W M D d".split(" "), lb = "M D H h m s w W".split(" "), mb = {
			M: function() {
				return this.month() + 1
			},
			MMM: function(a) {
				return this.localeData().monthsShort(this, a)
			},
			MMMM: function(a) {
				return this.localeData().months(this, a)
			},
			D: function() {
				return this.date()
			},
			DDD: function() {
				return this.dayOfYear()
			},
			d: function() {
				return this.day()
			},
			dd: function(a) {
				return this.localeData().weekdaysMin(this, a)
			},
			ddd: function(a) {
				return this.localeData().weekdaysShort(this, a)
			},
			dddd: function(a) {
				return this.localeData().weekdays(this, a)
			},
			w: function() {
				return this.week()
			},
			W: function() {
				return this.isoWeek()
			},
			YY: function() {
				return q(this.year() % 100, 2)
			},
			YYYY: function() {
				return q(this.year(), 4)
			},
			YYYYY: function() {
				return q(this.year(), 5)
			},
			YYYYYY: function() {
				var a = this.year();
				return(a >= 0 ? "+" : "-") + q(Math.abs(a), 6)
			},
			gg: function() {
				return q(this.weekYear() % 100, 2)
			},
			gggg: function() {
				return q(this.weekYear(), 4)
			},
			ggggg: function() {
				return q(this.weekYear(), 5)
			},
			GG: function() {
				return q(this.isoWeekYear() % 100, 2)
			},
			GGGG: function() {
				return q(this.isoWeekYear(), 4)
			},
			GGGGG: function() {
				return q(this.isoWeekYear(), 5)
			},
			e: function() {
				return this.weekday()
			},
			E: function() {
				return this.isoWeekday()
			},
			a: function() {
				return this.localeData().meridiem(this.hours(), this.minutes(), !0)
			},
			A: function() {
				return this.localeData().meridiem(this.hours(), this.minutes(), !1)
			},
			H: function() {
				return this.hours()
			},
			h: function() {
				return this.hours() % 12 || 12
			},
			m: function() {
				return this.minutes()
			},
			s: function() {
				return this.seconds()
			},
			S: function() {
				return A(this.milliseconds() / 100)
			},
			SS: function() {
				return q(A(this.milliseconds() / 10), 2)
			},
			SSS: function() {
				return q(this.milliseconds(), 3)
			},
			SSSS: function() {
				return q(this.milliseconds(), 3)
			},
			Z: function() {
				var a = this.utcOffset(),
					b = "+";
				return 0 > a && (a = -a, b = "-"), b + q(A(a / 60), 2) + ":" + q(A(a) % 60, 2)
			},
			ZZ: function() {
				var a = this.utcOffset(),
					b = "+";
				return 0 > a && (a = -a, b = "-"), b + q(A(a / 60), 2) + q(A(a) % 60, 2)
			},
			z: function() {
				return this.zoneAbbr()
			},
			zz: function() {
				return this.zoneName()
			},
			x: function() {
				return this.valueOf()
			},
			X: function() {
				return this.unix()
			},
			Q: function() {
				return this.quarter()
			}
		}, nb = {}, ob = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"], pb = !1; kb.length;) ua = kb.pop(), mb[ua + "o"] = function(a, b) {
		return function(c) {
			return this.localeData().ordinal(a.call(this, c), b)
		}
	}(mb[ua], ua);
	for(; lb.length;) ua = lb.pop(), mb[ua + ua] = h(mb[ua], 2);
	mb.DDDD = h(mb.DDD, 3), n(k.prototype, {
		set: function(a) {
			var b, c;
			for(c in a) b = a[c], "function" == typeof b ? this[c] = b : this["_" + c] = b;
			this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
		},
		_months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
		months: function(a) {
			return this._months[a.month()]
		},
		_monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
		monthsShort: function(a) {
			return this._monthsShort[a.month()]
		},
		monthsParse: function(a, b, c) {
			var d, e, f;
			for(this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), d = 0; 12 > d; d++) {
				if(e = sa.utc([2e3, d]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$", "i"), this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$", "i")), c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""), this._monthsParse[d] = new RegExp(f.replace(".", ""), "i")), c && "MMMM" === b && this._longMonthsParse[d].test(a)) return d;
				if(c && "MMM" === b && this._shortMonthsParse[d].test(a)) return d;
				if(!c && this._monthsParse[d].test(a)) return d
			}
		},
		_weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
		weekdays: function(a) {
			return this._weekdays[a.day()]
		},
		_weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
		weekdaysShort: function(a) {
			return this._weekdaysShort[a.day()]
		},
		_weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
		weekdaysMin: function(a) {
			return this._weekdaysMin[a.day()]
		},
		weekdaysParse: function(a) {
			var b, c, d;
			for(this._weekdaysParse || (this._weekdaysParse = []), b = 0; 7 > b; b++)
				if(this._weekdaysParse[b] || (c = sa([2e3, 1]).day(b), d = "^" + this.weekdays(c, "") + "|^" + this.weekdaysShort(c, "") + "|^" + this.weekdaysMin(c, ""), this._weekdaysParse[b] = new RegExp(d.replace(".", ""), "i")), this._weekdaysParse[b].test(a)) return b
		},
		_longDateFormat: {
			LTS: "h:mm:ss A",
			LT: "h:mm A",
			L: "MM/DD/YYYY",
			LL: "MMMM D, YYYY",
			LLL: "MMMM D, YYYY LT",
			LLLL: "dddd, MMMM D, YYYY LT"
		},
		longDateFormat: function(a) {
			var b = this._longDateFormat[a];
			return !b && this._longDateFormat[a.toUpperCase()] && (b = this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(a) {
				return a.slice(1)
			}), this._longDateFormat[a] = b), b
		},
		isPM: function(a) {
			return "p" === (a + "").toLowerCase().charAt(0)
		},
		_meridiemParse: /[ap]\.?m?\.?/i,
		meridiem: function(a, b, c) {
			return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"
		},
		_calendar: {
			sameDay: "[Today at] LT",
			nextDay: "[Tomorrow at] LT",
			nextWeek: "dddd [at] LT",
			lastDay: "[Yesterday at] LT",
			lastWeek: "[Last] dddd [at] LT",
			sameElse: "L"
		},
		calendar: function(a, b, c) {
			var d = this._calendar[a];
			return "function" == typeof d ? d.apply(b, [c]) : d
		},
		_relativeTime: {
			future: "in %s",
			past: "%s ago",
			s: "a few seconds",
			m: "a minute",
			mm: "%d minutes",
			h: "an hour",
			hh: "%d hours",
			d: "a day",
			dd: "%d days",
			M: "a month",
			MM: "%d months",
			y: "a year",
			yy: "%d years"
		},
		relativeTime: function(a, b, c, d) {
			var e = this._relativeTime[c];
			return "function" == typeof e ? e(a, b, c, d) : e.replace(/%d/i, a)
		},
		pastFuture: function(a, b) {
			var c = this._relativeTime[a > 0 ? "future" : "past"];
			return "function" == typeof c ? c(b) : c.replace(/%s/i, b)
		},
		ordinal: function(a) {
			return this._ordinal.replace("%d", a)
		},
		_ordinal: "%d",
		_ordinalParse: /\d{1,2}/,
		preparse: function(a) {
			return a
		},
		postformat: function(a) {
			return a
		},
		week: function(a) {
			return ha(a, this._week.dow, this._week.doy).week
		},
		_week: {
			dow: 0,
			doy: 6
		},
		firstDayOfWeek: function() {
			return this._week.dow
		},
		firstDayOfYear: function() {
			return this._week.doy
		},
		_invalidDate: "Invalid date",
		invalidDate: function() {
			return this._invalidDate
		}
	}), sa = function(b, c, e, f) {
		var g;
		return "boolean" == typeof e && (f = e, e = a), g = {}, g._isAMomentObject = !0, g._i = b, g._f = c, g._l = e, g._strict = f, g._isUTC = !1, g._pf = d(), ja(g)
	}, sa.suppressDeprecationWarnings = !1, sa.createFromInputFallback = f("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(a) {
		a._d = new Date(a._i + (a._useUTC ? " UTC" : ""))
	}), sa.min = function() {
		return ka("isBefore", [].slice.call(arguments, 0))
	}, sa.max = function() {
		return ka("isAfter", [].slice.call(arguments, 0))
	}, sa.utc = function(b, c, e, f) {
		var g;
		return "boolean" == typeof e && (f = e, e = a), g = {}, g._isAMomentObject = !0, g._useUTC = !0, g._isUTC = !0, g._l = e, g._i = b, g._f = c, g._strict = f, g._pf = d(), ja(g).utc()
	}, sa.unix = function(a) {
		return sa(1e3 * a)
	}, sa.duration = function(a, b) {
		var d, e, f, g, h = a,
			i = null;
		return sa.isDuration(a) ? h = {
			ms: a._milliseconds,
			d: a._days,
			M: a._months
		} : "number" == typeof a ? (h = {}, b ? h[b] = a : h.milliseconds = a) : (i = Ja.exec(a)) ? (d = "-" === i[1] ? -1 : 1, h = {
			y: 0,
			d: A(i[Aa]) * d,
			h: A(i[Ba]) * d,
			m: A(i[Ca]) * d,
			s: A(i[Da]) * d,
			ms: A(i[Ea]) * d
		}) : (i = Ka.exec(a)) ? (d = "-" === i[1] ? -1 : 1, f = function(a) {
			var b = a && parseFloat(a.replace(",", "."));
			return(isNaN(b) ? 0 : b) * d
		}, h = {
			y: f(i[2]),
			M: f(i[3]),
			d: f(i[4]),
			h: f(i[5]),
			m: f(i[6]),
			s: f(i[7]),
			w: f(i[8])
		}) : null == h ? h = {} : "object" == typeof h && ("from" in h || "to" in h) && (g = s(sa(h.from), sa(h.to)), h = {}, h.ms = g.milliseconds, h.M = g.months), e = new m(h), sa.isDuration(a) && c(a, "_locale") && (e._locale = a._locale), e
	}, sa.version = "2.9.0", sa.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", sa.ISO_8601 = function() {}, sa.momentProperties = Ga, sa.updateOffset = function() {}, sa.relativeTimeThreshold = function(b, c) {
		return jb[b] !== a && (c === a ? jb[b] : (jb[b] = c, !0))
	}, sa.lang = f("moment.lang is deprecated. Use moment.locale instead.", function(a, b) {
		return sa.locale(a, b)
	}), sa.locale = function(a, b) {
		var c;
		return a && (c = void 0 !== b ? sa.defineLocale(a, b) : sa.localeData(a)) && (sa.duration._locale = sa._locale = c), sa._locale._abbr
	}, sa.defineLocale = function(a, b) {
		return null !== b ? (b.abbr = a, Fa[a] || (Fa[a] = new k), Fa[a].set(b), sa.locale(a), Fa[a]) : (delete Fa[a], null)
	}, sa.langData = f("moment.langData is deprecated. Use moment.localeData instead.", function(a) {
		return sa.localeData(a)
	}), sa.localeData = function(a) {
		var b;
		if(a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a) return sa._locale;
		if(!v(a)) {
			if(b = J(a)) return b;
			a = [a]
		}
		return I(a)
	}, sa.isMoment = function(a) {
		return a instanceof l || null != a && c(a, "_isAMomentObject")
	}, sa.isDuration = function(a) {
		return a instanceof m
	};
	for(ua = ob.length - 1; ua >= 0; --ua) ! function(b) {
		var c, d;
		if(0 === b.indexOf("week")) c = 7, d = "day";
		else {
			if(0 !== b.indexOf("month")) return;
			c = 12, d = "month"
		}
		sa[b] = function(e, f) {
			var g, h, i = sa._locale[b],
				j = [];
			if("number" == typeof e && (f = e, e = a), h = function(a) {
					var b = sa().utc().set(d, a);
					return i.call(sa._locale, b, e || "")
				}, null != f) return h(f);
			for(g = 0; c > g; g++) j.push(h(g));
			return j
		}
	}(ob[ua]);
	sa.normalizeUnits = function(a) {
		return y(a)
	}, sa.invalid = function(a) {
		var b = sa.utc(NaN);
		return null != a ? n(b._pf, a) : b._pf.userInvalidated = !0, b
	}, sa.parseZone = function() {
		return sa.apply(null, arguments).parseZone()
	}, sa.parseTwoDigitYear = function(a) {
		return A(a) + (A(a) > 68 ? 1900 : 2e3)
	}, sa.isDate = w, n(sa.fn = l.prototype, {
		clone: function() {
			return sa(this)
		},
		valueOf: function() {
			return +this._d - 6e4 * (this._offset || 0)
		},
		unix: function() {
			return Math.floor(+this / 1e3)
		},
		toString: function() {
			return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
		},
		toDate: function() {
			return this._offset ? new Date(+this) : this._d
		},
		toISOString: function() {
			var a = sa(this).utc();
			return 0 < a.year() && a.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : N(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : N(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
		},
		toArray: function() {
			var a = this;
			return [a.year(), a.month(), a.date(), a.hours(), a.minutes(), a.seconds(), a.milliseconds()]
		},
		isValid: function() {
			return G(this)
		},
		isDSTShifted: function() {
			return !!this._a && (this.isValid() && x(this._a, (this._isUTC ? sa.utc(this._a) : sa(this._a)).toArray()) > 0)
		},
		parsingFlags: function() {
			return n({}, this._pf)
		},
		invalidAt: function() {
			return this._pf.overflow
		},
		utc: function(a) {
			return this.utcOffset(0, a)
		},
		local: function(a) {
			return this._isUTC && (this.utcOffset(0, a), this._isUTC = !1, a && this.subtract(this._dateUtcOffset(), "m")), this
		},
		format: function(a) {
			var b = N(this, a || sa.defaultFormat);
			return this.localeData().postformat(b)
		},
		add: t(1, "add"),
		subtract: t(-1, "subtract"),
		diff: function(a, b, c) {
			var d, e, f = K(a, this),
				g = 6e4 * (f.utcOffset() - this.utcOffset());
			return b = y(b), "year" === b || "month" === b || "quarter" === b ? (e = i(this, f), "quarter" === b ? e /= 3 : "year" === b && (e /= 12)) : (d = this - f, e = "second" === b ? d / 1e3 : "minute" === b ? d / 6e4 : "hour" === b ? d / 36e5 : "day" === b ? (d - g) / 864e5 : "week" === b ? (d - g) / 6048e5 : d), c ? e : p(e)
		},
		from: function(a, b) {
			return sa.duration({
				to: this,
				from: a
			}).locale(this.locale()).humanize(!b)
		},
		fromNow: function(a) {
			return this.from(sa(), a)
		},
		calendar: function(a) {
			var b = a || sa(),
				c = K(b, this).startOf("day"),
				d = this.diff(c, "days", !0),
				e = -6 > d ? "sameElse" : -1 > d ? "lastWeek" : 0 > d ? "lastDay" : 1 > d ? "sameDay" : 2 > d ? "nextDay" : 7 > d ? "nextWeek" : "sameElse";
			return this.format(this.localeData().calendar(e, this, sa(b)))
		},
		isLeapYear: function() {
			return E(this.year())
		},
		isDST: function() {
			return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
		},
		day: function(a) {
			var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
			return null != a ? (a = ea(a, this.localeData()), this.add(a - b, "d")) : b
		},
		month: oa("Month", !0),
		startOf: function(a) {
			switch(a = y(a)) {
				case "year":
					this.month(0);
				case "quarter":
				case "month":
					this.date(1);
				case "week":
				case "isoWeek":
				case "day":
					this.hours(0);
				case "hour":
					this.minutes(0);
				case "minute":
					this.seconds(0);
				case "second":
					this.milliseconds(0)
			}
			return "week" === a ? this.weekday(0) : "isoWeek" === a && this.isoWeekday(1), "quarter" === a && this.month(3 * Math.floor(this.month() / 3)), this
		},
		endOf: function(b) {
			return b = y(b), b === a || "millisecond" === b ? this : this.startOf(b).add(1, "isoWeek" === b ? "week" : b).subtract(1, "ms")
		},
		isAfter: function(a, b) {
			return b = y(void 0 !== b ? b : "millisecond"), "millisecond" === b ? (a = sa.isMoment(a) ? a : sa(a), +this > +a) : (sa.isMoment(a) ? +a : +sa(a)) < +this.clone().startOf(b)
		},
		isBefore: function(a, b) {
			var c;
			return b = y(void 0 !== b ? b : "millisecond"), "millisecond" === b ? +(a = sa.isMoment(a) ? a : sa(a)) > +this : (c = sa.isMoment(a) ? +a : +sa(a), +this.clone().endOf(b) < c)
		},
		isBetween: function(a, b, c) {
			return this.isAfter(a, c) && this.isBefore(b, c)
		},
		isSame: function(a, b) {
			var c;
			return b = y(b || "millisecond"), "millisecond" === b ? (a = sa.isMoment(a) ? a : sa(a), +this == +a) : (c = +sa(a), +this.clone().startOf(b) <= c && c <= +this.clone().endOf(b))
		},
		min: f("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function(a) {
			return a = sa.apply(null, arguments), this > a ? this : a
		}),
		max: f("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function(a) {
			return a = sa.apply(null, arguments), a > this ? this : a
		}),
		zone: f("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", function(a, b) {
			return null != a ? ("string" != typeof a && (a = -a), this.utcOffset(a, b), this) : -this.utcOffset()
		}),
		utcOffset: function(a, b) {
			var c, d = this._offset || 0;
			return null != a ? ("string" == typeof a && (a = Q(a)), Math.abs(a) < 16 && (a *= 60), !this._isUTC && b && (c = this._dateUtcOffset()), this._offset = a, this._isUTC = !0, null != c && this.add(c, "m"), d !== a && (!b || this._changeInProgress ? u(this, sa.duration(a - d, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, sa.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? d : this._dateUtcOffset()
		},
		isLocal: function() {
			return !this._isUTC
		},
		isUtcOffset: function() {
			return this._isUTC
		},
		isUtc: function() {
			return this._isUTC && 0 === this._offset
		},
		zoneAbbr: function() {
			return this._isUTC ? "UTC" : ""
		},
		zoneName: function() {
			return this._isUTC ? "Coordinated Universal Time" : ""
		},
		parseZone: function() {
			return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(Q(this._i)), this
		},
		hasAlignedHourOffset: function(a) {
			return a = a ? sa(a).utcOffset() : 0, (this.utcOffset() - a) % 60 == 0
		},
		daysInMonth: function() {
			return B(this.year(), this.month())
		},
		dayOfYear: function(a) {
			var b = wa((sa(this).startOf("day") - sa(this).startOf("year")) / 864e5) + 1;
			return null == a ? b : this.add(a - b, "d")
		},
		quarter: function(a) {
			return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3)
		},
		weekYear: function(a) {
			var b = ha(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
			return null == a ? b : this.add(a - b, "y")
		},
		isoWeekYear: function(a) {
			var b = ha(this, 1, 4).year;
			return null == a ? b : this.add(a - b, "y")
		},
		week: function(a) {
			var b = this.localeData().week(this);
			return null == a ? b : this.add(7 * (a - b), "d")
		},
		isoWeek: function(a) {
			var b = ha(this, 1, 4).week;
			return null == a ? b : this.add(7 * (a - b), "d")
		},
		weekday: function(a) {
			var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
			return null == a ? b : this.add(a - b, "d")
		},
		isoWeekday: function(a) {
			return null == a ? this.day() || 7 : this.day(this.day() % 7 ? a : a - 7)
		},
		isoWeeksInYear: function() {
			return C(this.year(), 1, 4)
		},
		weeksInYear: function() {
			var a = this.localeData()._week;
			return C(this.year(), a.dow, a.doy)
		},
		get: function(a) {
			return a = y(a), this[a]()
		},
		set: function(a, b) {
			var c;
			if("object" == typeof a)
				for(c in a) this.set(c, a[c]);
			else a = y(a), "function" == typeof this[a] && this[a](b);
			return this
		},
		locale: function(b) {
			var c;
			return b === a ? this._locale._abbr : (c = sa.localeData(b), null != c && (this._locale = c), this)
		},
		lang: f("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(b) {
			return b === a ? this.localeData() : this.locale(b)
		}),
		localeData: function() {
			return this._locale
		},
		_dateUtcOffset: function() {
			return 15 * -Math.round(this._d.getTimezoneOffset() / 15)
		}
	}), sa.fn.millisecond = sa.fn.milliseconds = oa("Milliseconds", !1), sa.fn.second = sa.fn.seconds = oa("Seconds", !1), sa.fn.minute = sa.fn.minutes = oa("Minutes", !1), sa.fn.hour = sa.fn.hours = oa("Hours", !0), sa.fn.date = oa("Date", !0), sa.fn.dates = f("dates accessor is deprecated. Use date instead.", oa("Date", !0)), sa.fn.year = oa("FullYear", !0), sa.fn.years = f("years accessor is deprecated. Use year instead.", oa("FullYear", !0)), sa.fn.days = sa.fn.day, sa.fn.months = sa.fn.month, sa.fn.weeks = sa.fn.week, sa.fn.isoWeeks = sa.fn.isoWeek, sa.fn.quarters = sa.fn.quarter, sa.fn.toJSON = sa.fn.toISOString, sa.fn.isUTC = sa.fn.isUtc, n(sa.duration.fn = m.prototype, {
		_bubble: function() {
			var a, b, c, d = this._milliseconds,
				e = this._days,
				f = this._months,
				g = this._data,
				h = 0;
			g.milliseconds = d % 1e3, a = p(d / 1e3), g.seconds = a % 60, b = p(a / 60), g.minutes = b % 60, c = p(b / 60), g.hours = c % 24, e += p(c / 24), h = p(pa(e)), e -= p(qa(h)), f += p(e / 30), e %= 30, h += p(f / 12), f %= 12, g.days = e, g.months = f, g.years = h
		},
		abs: function() {
			return this._milliseconds = Math.abs(this._milliseconds), this._days = Math.abs(this._days), this._months = Math.abs(this._months), this._data.milliseconds = Math.abs(this._data.milliseconds), this._data.seconds = Math.abs(this._data.seconds), this._data.minutes = Math.abs(this._data.minutes), this._data.hours = Math.abs(this._data.hours), this._data.months = Math.abs(this._data.months), this._data.years = Math.abs(this._data.years), this
		},
		weeks: function() {
			return p(this.days() / 7)
		},
		valueOf: function() {
			return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * A(this._months / 12)
		},
		humanize: function(a) {
			var b = ga(this, !a, this.localeData());
			return a && (b = this.localeData().pastFuture(+this, b)), this.localeData().postformat(b)
		},
		add: function(a, b) {
			var c = sa.duration(a, b);
			return this._milliseconds += c._milliseconds, this._days += c._days, this._months += c._months,
				this._bubble(), this
		},
		subtract: function(a, b) {
			var c = sa.duration(a, b);
			return this._milliseconds -= c._milliseconds, this._days -= c._days, this._months -= c._months, this._bubble(), this
		},
		get: function(a) {
			return a = y(a), this[a.toLowerCase() + "s"]()
		},
		as: function(a) {
			var b, c;
			if("month" === (a = y(a)) || "year" === a) return b = this._days + this._milliseconds / 864e5, c = this._months + 12 * pa(b), "month" === a ? c : c / 12;
			switch(b = this._days + Math.round(qa(this._months / 12)), a) {
				case "week":
					return b / 7 + this._milliseconds / 6048e5;
				case "day":
					return b + this._milliseconds / 864e5;
				case "hour":
					return 24 * b + this._milliseconds / 36e5;
				case "minute":
					return 24 * b * 60 + this._milliseconds / 6e4;
				case "second":
					return 24 * b * 60 * 60 + this._milliseconds / 1e3;
				case "millisecond":
					return Math.floor(24 * b * 60 * 60 * 1e3) + this._milliseconds;
				default:
					throw new Error("Unknown unit " + a)
			}
		},
		lang: sa.fn.lang,
		locale: sa.fn.locale,
		toIsoString: f("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", function() {
			return this.toISOString()
		}),
		toISOString: function() {
			var a = Math.abs(this.years()),
				b = Math.abs(this.months()),
				c = Math.abs(this.days()),
				d = Math.abs(this.hours()),
				e = Math.abs(this.minutes()),
				f = Math.abs(this.seconds() + this.milliseconds() / 1e3);
			return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (a ? a + "Y" : "") + (b ? b + "M" : "") + (c ? c + "D" : "") + (d || e || f ? "T" : "") + (d ? d + "H" : "") + (e ? e + "M" : "") + (f ? f + "S" : "") : "P0D"
		},
		localeData: function() {
			return this._locale
		},
		toJSON: function() {
			return this.toISOString()
		}
	}), sa.duration.fn.toString = sa.duration.fn.toISOString;
	for(ua in fb) c(fb, ua) && function(a) {
		sa.duration.fn[a] = function() {
			return this._data[a]
		}
	}(ua.toLowerCase());
	sa.duration.fn.asMilliseconds = function() {
		return this.as("ms")
	}, sa.duration.fn.asSeconds = function() {
		return this.as("s")
	}, sa.duration.fn.asMinutes = function() {
		return this.as("m")
	}, sa.duration.fn.asHours = function() {
		return this.as("h")
	}, sa.duration.fn.asDays = function() {
		return this.as("d")
	}, sa.duration.fn.asWeeks = function() {
		return this.as("weeks")
	}, sa.duration.fn.asMonths = function() {
		return this.as("M")
	}, sa.duration.fn.asYears = function() {
		return this.as("y")
	}, sa.locale("en", {
		ordinalParse: /\d{1,2}(th|st|nd|rd)/,
		ordinal: function(a) {
			var b = a % 10;
			return a + (1 === A(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th")
		}
	}), Ha ? module.exports = sa : "function" == typeof define && define.amd ? (define(function(a, b, c) {
		return c.config && c.config() && !0 === c.config().noGlobal && (va.moment = ta), sa
	}), ra(!0)) : ra()
}).call(this),
	function(a) {
		"function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
	}(function(a) {
		function b(b, d) {
			var e, f, g, h = b.nodeName.toLowerCase();
			return "area" === h ? (e = b.parentNode, f = e.name, !(!b.href || !f || "map" !== e.nodeName.toLowerCase()) && (!!(g = a("img[usemap='#" + f + "']")[0]) && c(g))) : (/input|select|textarea|button|object/.test(h) ? !b.disabled : "a" === h ? b.href || d : d) && c(b)
		}

		function c(b) {
			return a.expr.filters.visible(b) && !a(b).parents().addBack().filter(function() {
				return "hidden" === a.css(this, "visibility")
			}).length
		}
		a.ui = a.ui || {}, a.extend(a.ui, {
			version: "1.11.2",
			keyCode: {
				BACKSPACE: 8,
				COMMA: 188,
				DELETE: 46,
				DOWN: 40,
				END: 35,
				ENTER: 13,
				ESCAPE: 27,
				HOME: 36,
				LEFT: 37,
				PAGE_DOWN: 34,
				PAGE_UP: 33,
				PERIOD: 190,
				RIGHT: 39,
				SPACE: 32,
				TAB: 9,
				UP: 38
			}
		}), a.fn.extend({
			scrollParent: function(b) {
				var c = this.css("position"),
					d = "absolute" === c,
					e = b ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
					f = this.parents().filter(function() {
						var b = a(this);
						return(!d || "static" !== b.css("position")) && e.test(b.css("overflow") + b.css("overflow-y") + b.css("overflow-x"))
					}).eq(0);
				return "fixed" !== c && f.length ? f : a(this[0].ownerDocument || document)
			},
			uniqueId: function() {
				var a = 0;
				return function() {
					return this.each(function() {
						this.id || (this.id = "ui-id-" + ++a)
					})
				}
			}(),
			removeUniqueId: function() {
				return this.each(function() {
					/^ui-id-\d+$/.test(this.id) && a(this).removeAttr("id")
				})
			}
		}), a.extend(a.expr[":"], {
			data: a.expr.createPseudo ? a.expr.createPseudo(function(b) {
				return function(c) {
					return !!a.data(c, b)
				}
			}) : function(b, c, d) {
				return !!a.data(b, d[3])
			},
			focusable: function(c) {
				return b(c, !isNaN(a.attr(c, "tabindex")))
			},
			tabbable: function(c) {
				var d = a.attr(c, "tabindex"),
					e = isNaN(d);
				return(e || d >= 0) && b(c, !e)
			}
		}), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function(b, c) {
			function d(b, c, d, f) {
				return a.each(e, function() {
					c -= parseFloat(a.css(b, "padding" + this)) || 0, d && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0), f && (c -= parseFloat(a.css(b, "margin" + this)) || 0)
				}), c
			}
			var e = "Width" === c ? ["Left", "Right"] : ["Top", "Bottom"],
				f = c.toLowerCase(),
				g = {
					innerWidth: a.fn.innerWidth,
					innerHeight: a.fn.innerHeight,
					outerWidth: a.fn.outerWidth,
					outerHeight: a.fn.outerHeight
				};
			a.fn["inner" + c] = function(b) {
				return void 0 === b ? g["inner" + c].call(this) : this.each(function() {
					a(this).css(f, d(this, b) + "px")
				})
			}, a.fn["outer" + c] = function(b, e) {
				return "number" != typeof b ? g["outer" + c].call(this, b) : this.each(function() {
					a(this).css(f, d(this, b, !0, e) + "px")
				})
			}
		}), a.fn.addBack || (a.fn.addBack = function(a) {
			return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
		}), a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = function(b) {
			return function(c) {
				return arguments.length ? b.call(this, a.camelCase(c)) : b.call(this)
			}
		}(a.fn.removeData)), a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), a.fn.extend({
			focus: function(b) {
				return function(c, d) {
					return "number" == typeof c ? this.each(function() {
						var b = this;
						setTimeout(function() {
							a(b).focus(), d && d.call(b)
						}, c)
					}) : b.apply(this, arguments)
				}
			}(a.fn.focus),
			disableSelection: function() {
				var a = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
				return function() {
					return this.bind(a + ".ui-disableSelection", function(a) {
						a.preventDefault()
					})
				}
			}(),
			enableSelection: function() {
				return this.unbind(".ui-disableSelection")
			},
			zIndex: function(b) {
				if(void 0 !== b) return this.css("zIndex", b);
				if(this.length)
					for(var c, d, e = a(this[0]); e.length && e[0] !== document;) {
						if(("absolute" === (c = e.css("position")) || "relative" === c || "fixed" === c) && (d = parseInt(e.css("zIndex"), 10), !isNaN(d) && 0 !== d)) return d;
						e = e.parent()
					}
				return 0
			}
		}), a.ui.plugin = {
			add: function(b, c, d) {
				var e, f = a.ui[b].prototype;
				for(e in d) f.plugins[e] = f.plugins[e] || [], f.plugins[e].push([c, d[e]])
			},
			call: function(a, b, c, d) {
				var e, f = a.plugins[b];
				if(f && (d || a.element[0].parentNode && 11 !== a.element[0].parentNode.nodeType))
					for(e = 0; f.length > e; e++) a.options[f[e][0]] && f[e][1].apply(a.element, c)
			}
		}
	}),
	function(a) {
		"function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
	}(function(a) {
		var b = 0,
			c = Array.prototype.slice;
		return a.cleanData = function(b) {
			return function(c) {
				var d, e, f;
				for(f = 0; null != (e = c[f]); f++) try {
					(d = a._data(e, "events")) && d.remove && a(e).triggerHandler("remove")
				} catch(a) {}
				b(c)
			}
		}(a.cleanData), a.widget = function(b, c, d) {
			var e, f, g, h, i = {},
				j = b.split(".")[0];
			return b = b.split(".")[1], e = j + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][e.toLowerCase()] = function(b) {
				return !!a.data(b, e)
			}, a[j] = a[j] || {}, f = a[j][b], g = a[j][b] = function(a, b) {
				return this._createWidget ? void(arguments.length && this._createWidget(a, b)) : new g(a, b)
			}, a.extend(g, f, {
				version: d.version,
				_proto: a.extend({}, d),
				_childConstructors: []
			}), h = new c, h.options = a.widget.extend({}, h.options), a.each(d, function(b, d) {
				return a.isFunction(d) ? void(i[b] = function() {
					var a = function() {
							return c.prototype[b].apply(this, arguments)
						},
						e = function(a) {
							return c.prototype[b].apply(this, a)
						};
					return function() {
						var b, c = this._super,
							f = this._superApply;
						return this._super = a, this._superApply = e, b = d.apply(this, arguments), this._super = c, this._superApply = f, b
					}
				}()) : void(i[b] = d)
			}), g.prototype = a.widget.extend(h, {
				widgetEventPrefix: f ? h.widgetEventPrefix || b : b
			}, i, {
				constructor: g,
				namespace: j,
				widgetName: b,
				widgetFullName: e
			}), f ? (a.each(f._childConstructors, function(b, c) {
				var d = c.prototype;
				a.widget(d.namespace + "." + d.widgetName, g, c._proto)
			}), delete f._childConstructors) : c._childConstructors.push(g), a.widget.bridge(b, g), g
		}, a.widget.extend = function(b) {
			for(var d, e, f = c.call(arguments, 1), g = 0, h = f.length; h > g; g++)
				for(d in f[g]) e = f[g][d], f[g].hasOwnProperty(d) && void 0 !== e && (b[d] = a.isPlainObject(e) ? a.isPlainObject(b[d]) ? a.widget.extend({}, b[d], e) : a.widget.extend({}, e) : e);
			return b
		}, a.widget.bridge = function(b, d) {
			var e = d.prototype.widgetFullName || b;
			a.fn[b] = function(f) {
				var g = "string" == typeof f,
					h = c.call(arguments, 1),
					i = this;
				return f = !g && h.length ? a.widget.extend.apply(null, [f].concat(h)) : f, g ? this.each(function() {
					var c, d = a.data(this, e);
					return "instance" === f ? (i = d, !1) : d ? a.isFunction(d[f]) && "_" !== f.charAt(0) ? (c = d[f].apply(d, h), c !== d && void 0 !== c ? (i = c && c.jquery ? i.pushStack(c.get()) : c, !1) : void 0) : a.error("no such method '" + f + "' for " + b + " widget instance") : a.error("cannot call methods on " + b + " prior to initialization; attempted to call method '" + f + "'")
				}) : this.each(function() {
					var b = a.data(this, e);
					b ? (b.option(f || {}), b._init && b._init()) : a.data(this, e, new d(f, this))
				}), i
			}
		}, a.Widget = function() {}, a.Widget._childConstructors = [], a.Widget.prototype = {
			widgetName: "widget",
			widgetEventPrefix: "",
			defaultElement: "<div>",
			options: {
				disabled: !1,
				create: null
			},
			_createWidget: function(c, d) {
				d = a(d || this.defaultElement || this)[0], this.element = a(d), this.uuid = b++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = a(), this.hoverable = a(), this.focusable = a(), d !== this && (a.data(d, this.widgetFullName, this), this._on(!0, this.element, {
					remove: function(a) {
						a.target === d && this.destroy()
					}
				}), this.document = a(d.style ? d.ownerDocument : d.document || d), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)), this.options = a.widget.extend({}, this.options, this._getCreateOptions(), c), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
			},
			_getCreateOptions: a.noop,
			_getCreateEventData: a.noop,
			_create: a.noop,
			_init: a.noop,
			destroy: function() {
				this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
			},
			_destroy: a.noop,
			widget: function() {
				return this.element
			},
			option: function(b, c) {
				var d, e, f, g = b;
				if(0 === arguments.length) return a.widget.extend({}, this.options);
				if("string" == typeof b)
					if(g = {}, d = b.split("."), b = d.shift(), d.length) {
						for(e = g[b] = a.widget.extend({}, this.options[b]), f = 0; d.length - 1 > f; f++) e[d[f]] = e[d[f]] || {}, e = e[d[f]];
						if(b = d.pop(), 1 === arguments.length) return void 0 === e[b] ? null : e[b];
						e[b] = c
					} else {
						if(1 === arguments.length) return void 0 === this.options[b] ? null : this.options[b];
						g[b] = c
					}
				return this._setOptions(g), this
			},
			_setOptions: function(a) {
				var b;
				for(b in a) this._setOption(b, a[b]);
				return this
			},
			_setOption: function(a, b) {
				return this.options[a] = b, "disabled" === a && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!b), b && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
			},
			enable: function() {
				return this._setOptions({
					disabled: !1
				})
			},
			disable: function() {
				return this._setOptions({
					disabled: !0
				})
			},
			_on: function(b, c, d) {
				var e, f = this;
				"boolean" != typeof b && (d = c, c = b, b = !1), d ? (c = e = a(c), this.bindings = this.bindings.add(c)) : (d = c, c = this.element, e = this.widget()), a.each(d, function(d, g) {
					function h() {
						return b || !0 !== f.options.disabled && !a(this).hasClass("ui-state-disabled") ? ("string" == typeof g ? f[g] : g).apply(f, arguments) : void 0
					}
					"string" != typeof g && (h.guid = g.guid = g.guid || h.guid || a.guid++);
					var i = d.match(/^([\w:-]*)\s*(.*)$/),
						j = i[1] + f.eventNamespace,
						k = i[2];
					k ? e.delegate(k, j, h) : c.bind(j, h)
				})
			},
			_off: function(b, c) {
				c = (c || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, b.unbind(c).undelegate(c), this.bindings = a(this.bindings.not(b).get()), this.focusable = a(this.focusable.not(b).get()), this.hoverable = a(this.hoverable.not(b).get())
			},
			_delay: function(a, b) {
				function c() {
					return("string" == typeof a ? d[a] : a).apply(d, arguments)
				}
				var d = this;
				return setTimeout(c, b || 0)
			},
			_hoverable: function(b) {
				this.hoverable = this.hoverable.add(b), this._on(b, {
					mouseenter: function(b) {
						a(b.currentTarget).addClass("ui-state-hover")
					},
					mouseleave: function(b) {
						a(b.currentTarget).removeClass("ui-state-hover")
					}
				})
			},
			_focusable: function(b) {
				this.focusable = this.focusable.add(b), this._on(b, {
					focusin: function(b) {
						a(b.currentTarget).addClass("ui-state-focus")
					},
					focusout: function(b) {
						a(b.currentTarget).removeClass("ui-state-focus")
					}
				})
			},
			_trigger: function(b, c, d) {
				var e, f, g = this.options[b];
				if(d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent)
					for(e in f) e in c || (c[e] = f[e]);
				return this.element.trigger(c, d), !(a.isFunction(g) && !1 === g.apply(this.element[0], [c].concat(d)) || c.isDefaultPrevented())
			}
		}, a.each({
			show: "fadeIn",
			hide: "fadeOut"
		}, function(b, c) {
			a.Widget.prototype["_" + b] = function(d, e, f) {
				"string" == typeof e && (e = {
					effect: e
				});
				var g, h = e ? !0 === e || "number" == typeof e ? c : e.effect || c : b;
				e = e || {}, "number" == typeof e && (e = {
					duration: e
				}), g = !a.isEmptyObject(e), e.complete = f, e.delay && d.delay(e.delay), g && a.effects && a.effects.effect[h] ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function(c) {
					a(this)[b](), f && f.call(d[0]), c()
				})
			}
		}), a.widget
	}),
	function(a) {
		"function" == typeof define && define.amd ? define(["jquery", "./widget"], a) : a(jQuery)
	}(function(a) {
		var b = !1;
		return a(document).mouseup(function() {
			b = !1
		}), a.widget("ui.mouse", {
			version: "1.11.2",
			options: {
				cancel: "input,textarea,button,select,option",
				distance: 1,
				delay: 0
			},
			_mouseInit: function() {
				var b = this;
				this.element.bind("mousedown." + this.widgetName, function(a) {
					return b._mouseDown(a)
				}).bind("click." + this.widgetName, function(c) {
					return !0 === a.data(c.target, b.widgetName + ".preventClickEvent") ? (a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1) : void 0
				}), this.started = !1
			},
			_mouseDestroy: function() {
				this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
			},
			_mouseDown: function(c) {
				if(!b) {
					this._mouseMoved = !1, this._mouseStarted && this._mouseUp(c), this._mouseDownEvent = c;
					var d = this,
						e = 1 === c.which,
						f = !("string" != typeof this.options.cancel || !c.target.nodeName) && a(c.target).closest(this.options.cancel).length;
					return !(e && !f && this._mouseCapture(c)) || (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
						d.mouseDelayMet = !0
					}, this.options.delay)), this._mouseDistanceMet(c) && this._mouseDelayMet(c) && (this._mouseStarted = !1 !== this._mouseStart(c), !this._mouseStarted) ? (c.preventDefault(), !0) : (!0 === a.data(c.target, this.widgetName + ".preventClickEvent") && a.removeData(c.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(a) {
						return d._mouseMove(a)
					}, this._mouseUpDelegate = function(a) {
						return d._mouseUp(a)
					}, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), c.preventDefault(), b = !0, !0))
				}
			},
			_mouseMove: function(b) {
				if(this._mouseMoved) {
					if(a.ui.ie && (!document.documentMode || 9 > document.documentMode) && !b.button) return this._mouseUp(b);
					if(!b.which) return this._mouseUp(b)
				}
				return(b.which || b.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, b), this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted)
			},
			_mouseUp: function(c) {
				return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, c.target === this._mouseDownEvent.target && a.data(c.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(c)), b = !1, !1
			},
			_mouseDistanceMet: function(a) {
				return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
			},
			_mouseDelayMet: function() {
				return this.mouseDelayMet
			},
			_mouseStart: function() {},
			_mouseDrag: function() {},
			_mouseStop: function() {},
			_mouseCapture: function() {
				return !0
			}
		})
	}),
	function(a) {
		"function" == typeof define && define.amd ? define(["jquery", "./core", "./mouse", "./widget"], a) : a(jQuery)
	}(function(a) {
		return a.widget("ui.draggable", a.ui.mouse, {
			version: "1.11.2",
			widgetEventPrefix: "drag",
			options: {
				addClasses: !0,
				appendTo: "parent",
				axis: !1,
				connectToSortable: !1,
				containment: !1,
				cursor: "auto",
				cursorAt: !1,
				grid: !1,
				handle: !1,
				helper: "original",
				iframeFix: !1,
				opacity: !1,
				refreshPositions: !1,
				revert: !1,
				revertDuration: 500,
				scope: "default",
				scroll: !0,
				scrollSensitivity: 20,
				scrollSpeed: 20,
				snap: !1,
				snapMode: "both",
				snapTolerance: 20,
				stack: !1,
				zIndex: !1,
				drag: null,
				start: null,
				stop: null
			},
			_create: function() {
				"original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._setHandleClassName(), this._mouseInit()
			},
			_setOption: function(a, b) {
				this._super(a, b), "handle" === a && (this._removeHandleClassName(), this._setHandleClassName())
			},
			_destroy: function() {
				return(this.helper || this.element).is(".ui-draggable-dragging") ? void(this.destroyOnClear = !0) : (this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._removeHandleClassName(), void this._mouseDestroy())
			},
			_mouseCapture: function(b) {
				var c = this.options;
				return this._blurActiveElement(b), !(this.helper || c.disabled || a(b.target).closest(".ui-resizable-handle").length > 0) && (this.handle = this._getHandle(b), !!this.handle && (this._blockFrames(!0 === c.iframeFix ? "iframe" : c.iframeFix), !0))
			},
			_blockFrames: function(b) {
				this.iframeBlocks = this.document.find(b).map(function() {
					var b = a(this);
					return a("<div>").css("position", "absolute").appendTo(b.parent()).outerWidth(b.outerWidth()).outerHeight(b.outerHeight()).offset(b.offset())[0]
				})
			},
			_unblockFrames: function() {
				this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
			},
			_blurActiveElement: function(b) {
				var c = this.document[0];
				if(this.handleElement.is(b.target)) try {
					c.activeElement && "body" !== c.activeElement.nodeName.toLowerCase() && a(c.activeElement).blur()
				} catch(a) {}
			},
			_mouseStart: function(b) {
				var c = this.options;
				return this.helper = this._createHelper(b), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function() {
					return "fixed" === a(this).css("position")
				}).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(b), this.originalPosition = this.position = this._generatePosition(b, !1), this.originalPageX = b.pageX, this.originalPageY = b.pageY, c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt), this._setContainment(), !1 === this._trigger("start", b) ? (this._clear(), !1) : (this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this._normalizeRightBottom(), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b), !0)
			},
			_refreshOffsets: function(a) {
				this.offset = {
					top: this.positionAbs.top - this.margins.top,
					left: this.positionAbs.left - this.margins.left,
					scroll: !1,
					parent: this._getParentOffset(),
					relative: this._getRelativeOffset()
				}, this.offset.click = {
					left: a.pageX - this.offset.left,
					top: a.pageY - this.offset.top
				}
			},
			_mouseDrag: function(b, c) {
				if(this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(b, !0), this.positionAbs = this._convertPositionTo("absolute"), !c) {
					var d = this._uiHash();
					if(!1 === this._trigger("drag", b, d)) return this._mouseUp({}), !1;
					this.position = d.position
				}
				return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", a.ui.ddmanager && a.ui.ddmanager.drag(this, b), !1
			},
			_mouseStop: function(b) {
				var c = this,
					d = !1;
				return a.ui.ddmanager && !this.options.dropBehaviour && (d = a.ui.ddmanager.drop(this, b)), this.dropped && (d = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !d || "valid" === this.options.revert && d || !0 === this.options.revert || a.isFunction(this.options.revert) && this.options.revert.call(this.element, d) ? a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
					!1 !== c._trigger("stop", b) && c._clear()
				}) : !1 !== this._trigger("stop", b) && this._clear(), !1
			},
			_mouseUp: function(b) {
				return this._unblockFrames(), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b), this.handleElement.is(b.target) && this.element.focus(), a.ui.mouse.prototype._mouseUp.call(this, b)
			},
			cancel: function() {
				return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
			},
			_getHandle: function(b) {
				return !this.options.handle || !!a(b.target).closest(this.element.find(this.options.handle)).length
			},
			_setHandleClassName: function() {
				this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this.handleElement.addClass("ui-draggable-handle")
			},
			_removeHandleClassName: function() {
				this.handleElement.removeClass("ui-draggable-handle")
			},
			_createHelper: function(b) {
				var c = this.options,
					d = a.isFunction(c.helper),
					e = d ? a(c.helper.apply(this.element[0], [b])) : "clone" === c.helper ? this.element.clone().removeAttr("id") : this.element;
				return e.parents("body").length || e.appendTo("parent" === c.appendTo ? this.element[0].parentNode : c.appendTo), d && e[0] === this.element[0] && this._setPositionRelative(), e[0] === this.element[0] || /(fixed|absolute)/.test(e.css("position")) || e.css("position", "absolute"), e
			},
			_setPositionRelative: function() {
				/^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
			},
			_adjustOffsetFromHelper: function(b) {
				"string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = {
					left: +b[0],
					top: +b[1] || 0
				}), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
			},
			_isRootNode: function(a) {
				return /(html|body)/i.test(a.tagName) || a === this.document[0]
			},
			_getParentOffset: function() {
				var b = this.offsetParent.offset(),
					c = this.document[0];
				return "absolute" === this.cssPosition && this.scrollParent[0] !== c && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (b = {
					top: 0,
					left: 0
				}), {
					top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
					left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
				}
			},
			_getRelativeOffset: function() {
				if("relative" !== this.cssPosition) return {
					top: 0,
					left: 0
				};
				var a = this.element.position(),
					b = this._isRootNode(this.scrollParent[0]);
				return {
					top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + (b ? 0 : this.scrollParent.scrollTop()),
					left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + (b ? 0 : this.scrollParent.scrollLeft())
				}
			},
			_cacheMargins: function() {
				this.margins = {
					left: parseInt(this.element.css("marginLeft"), 10) || 0,
					top: parseInt(this.element.css("marginTop"), 10) || 0,
					right: parseInt(this.element.css("marginRight"), 10) || 0,
					bottom: parseInt(this.element.css("marginBottom"), 10) || 0
				}
			},
			_cacheHelperProportions: function() {
				this.helperProportions = {
					width: this.helper.outerWidth(),
					height: this.helper.outerHeight()
				}
			},
			_setContainment: function() {
				var b, c, d, e = this.options,
					f = this.document[0];
				return this.relativeContainer = null, e.containment ? "window" === e.containment ? void(this.containment = [a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, a(window).scrollLeft() + a(window).width() - this.helperProportions.width - this.margins.left, a(window).scrollTop() + (a(window).height() || f.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : "document" === e.containment ? void(this.containment = [0, 0, a(f).width() - this.helperProportions.width - this.margins.left, (a(f).height() || f.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : e.containment.constructor === Array ? void(this.containment = e.containment) : ("parent" === e.containment && (e.containment = this.helper[0].parentNode), c = a(e.containment), void((d = c[0]) && (b = /(scroll|auto)/.test(c.css("overflow")), this.containment = [(parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (b ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (b ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = c))) : void(this.containment = null)
			},
			_convertPositionTo: function(a, b) {
				b || (b = this.position);
				var c = "absolute" === a ? 1 : -1,
					d = this._isRootNode(this.scrollParent[0]);
				return {
					top: b.top + this.offset.relative.top * c + this.offset.parent.top * c - ("fixed" === this.cssPosition ? -this.offset.scroll.top : d ? 0 : this.offset.scroll.top) * c,
					left: b.left + this.offset.relative.left * c + this.offset.parent.left * c - ("fixed" === this.cssPosition ? -this.offset.scroll.left : d ? 0 : this.offset.scroll.left) * c
				}
			},
			_generatePosition: function(a, b) {
				var c, d, e, f, g = this.options,
					h = this._isRootNode(this.scrollParent[0]),
					i = a.pageX,
					j = a.pageY;
				return h && this.offset.scroll || (this.offset.scroll = {
					top: this.scrollParent.scrollTop(),
					left: this.scrollParent.scrollLeft()
				}), b && (this.containment && (this.relativeContainer ? (d = this.relativeContainer.offset(), c = [this.containment[0] + d.left, this.containment[1] + d.top, this.containment[2] + d.left, this.containment[3] + d.top]) : c = this.containment, a.pageX - this.offset.click.left < c[0] && (i = c[0] + this.offset.click.left), a.pageY - this.offset.click.top < c[1] && (j = c[1] + this.offset.click.top), a.pageX - this.offset.click.left > c[2] && (i = c[2] + this.offset.click.left), a.pageY - this.offset.click.top > c[3] && (j = c[3] + this.offset.click.top)), g.grid && (e = g.grid[1] ? this.originalPageY + Math.round((j - this.originalPageY) / g.grid[1]) * g.grid[1] : this.originalPageY, j = c ? e - this.offset.click.top >= c[1] || e - this.offset.click.top > c[3] ? e : e - this.offset.click.top >= c[1] ? e - g.grid[1] : e + g.grid[1] : e, f = g.grid[0] ? this.originalPageX + Math.round((i - this.originalPageX) / g.grid[0]) * g.grid[0] : this.originalPageX, i = c ? f - this.offset.click.left >= c[0] || f - this.offset.click.left > c[2] ? f : f - this.offset.click.left >= c[0] ? f - g.grid[0] : f + g.grid[0] : f), "y" === g.axis && (i = this.originalPageX), "x" === g.axis && (j = this.originalPageY)), {
					top: j - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : h ? 0 : this.offset.scroll.top),
					left: i - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : h ? 0 : this.offset.scroll.left)
				}
			},
			_clear: function() {
				this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy()
			},
			_normalizeRightBottom: function() {
				"y" !== this.options.axis && "auto" !== this.helper.css("right") && (this.helper.width(this.helper.width()), this.helper.css("right", "auto")), "x" !== this.options.axis && "auto" !== this.helper.css("bottom") && (this.helper.height(this.helper.height()), this.helper.css("bottom", "auto"))
			},
			_trigger: function(b, c, d) {
				return d = d || this._uiHash(), a.ui.plugin.call(this, b, [c, d, this], !0), /^(drag|start|stop)/.test(b) && (this.positionAbs = this._convertPositionTo("absolute"), d.offset = this.positionAbs), a.Widget.prototype._trigger.call(this, b, c, d)
			},
			plugins: {},
			_uiHash: function() {
				return {
					helper: this.helper,
					position: this.position,
					originalPosition: this.originalPosition,
					offset: this.positionAbs
				}
			}
		}), a.ui.plugin.add("draggable", "connectToSortable", {
			start: function(b, c, d) {
				var e = a.extend({}, c, {
					item: d.element
				});
				d.sortables = [], a(d.options.connectToSortable).each(function() {
					var c = a(this).sortable("instance");
					c && !c.options.disabled && (d.sortables.push(c), c.refreshPositions(), c._trigger("activate", b, e))
				})
			},
			stop: function(b, c, d) {
				var e = a.extend({}, c, {
					item: d.element
				});
				d.cancelHelperRemoval = !1, a.each(d.sortables, function() {
					var a = this;
					a.isOver ? (a.isOver = 0, d.cancelHelperRemoval = !0, a.cancelHelperRemoval = !1, a._storedCSS = {
						position: a.placeholder.css("position"),
						top: a.placeholder.css("top"),
						left: a.placeholder.css("left")
					}, a._mouseStop(b), a.options.helper = a.options._helper) : (a.cancelHelperRemoval = !0, a._trigger("deactivate", b, e))
				})
			},
			drag: function(b, c, d) {
				a.each(d.sortables, function() {
					var e = !1,
						f = this;
					f.positionAbs = d.positionAbs, f.helperProportions = d.helperProportions, f.offset.click = d.offset.click, f._intersectsWith(f.containerCache) && (e = !0, a.each(d.sortables, function() {
						return this.positionAbs = d.positionAbs, this.helperProportions = d.helperProportions, this.offset.click = d.offset.click, this !== f && this._intersectsWith(this.containerCache) && a.contains(f.element[0], this.element[0]) && (e = !1), e
					})), e ? (f.isOver || (f.isOver = 1, f.currentItem = c.helper.appendTo(f.element).data("ui-sortable-item", !0), f.options._helper = f.options.helper, f.options.helper = function() {
						return c.helper[0]
					}, b.target = f.currentItem[0], f._mouseCapture(b, !0), f._mouseStart(b, !0, !0), f.offset.click.top = d.offset.click.top, f.offset.click.left = d.offset.click.left, f.offset.parent.left -= d.offset.parent.left - f.offset.parent.left, f.offset.parent.top -= d.offset.parent.top - f.offset.parent.top, d._trigger("toSortable", b), d.dropped = f.element, a.each(d.sortables, function() {
						this.refreshPositions()
					}), d.currentItem = d.element, f.fromOutside = d), f.currentItem && (f._mouseDrag(b), c.position = f.position)) : f.isOver && (f.isOver = 0, f.cancelHelperRemoval = !0, f.options._revert = f.options.revert, f.options.revert = !1, f._trigger("out", b, f._uiHash(f)), f._mouseStop(b, !0), f.options.revert = f.options._revert, f.options.helper = f.options._helper, f.placeholder && f.placeholder.remove(), d._refreshOffsets(b), c.position = d._generatePosition(b, !0), d._trigger("fromSortable", b), d.dropped = !1, a.each(d.sortables, function() {
						this.refreshPositions()
					}))
				})
			}
		}), a.ui.plugin.add("draggable", "cursor", {
			start: function(b, c, d) {
				var e = a("body"),
					f = d.options;
				e.css("cursor") && (f._cursor = e.css("cursor")), e.css("cursor", f.cursor)
			},
			stop: function(b, c, d) {
				var e = d.options;
				e._cursor && a("body").css("cursor", e._cursor)
			}
		}), a.ui.plugin.add("draggable", "opacity", {
			start: function(b, c, d) {
				var e = a(c.helper),
					f = d.options;
				e.css("opacity") && (f._opacity = e.css("opacity")), e.css("opacity", f.opacity)
			},
			stop: function(b, c, d) {
				var e = d.options;
				e._opacity && a(c.helper).css("opacity", e._opacity)
			}
		}), a.ui.plugin.add("draggable", "scroll", {
			start: function(a, b, c) {
				c.scrollParentNotHidden || (c.scrollParentNotHidden = c.helper.scrollParent(!1)), c.scrollParentNotHidden[0] !== c.document[0] && "HTML" !== c.scrollParentNotHidden[0].tagName && (c.overflowOffset = c.scrollParentNotHidden.offset())
			},
			drag: function(b, c, d) {
				var e = d.options,
					f = !1,
					g = d.scrollParentNotHidden[0],
					h = d.document[0];
				g !== h && "HTML" !== g.tagName ? (e.axis && "x" === e.axis || (d.overflowOffset.top + g.offsetHeight - b.pageY < e.scrollSensitivity ? g.scrollTop = f = g.scrollTop + e.scrollSpeed : b.pageY - d.overflowOffset.top < e.scrollSensitivity && (g.scrollTop = f = g.scrollTop - e.scrollSpeed)), e.axis && "y" === e.axis || (d.overflowOffset.left + g.offsetWidth - b.pageX < e.scrollSensitivity ? g.scrollLeft = f = g.scrollLeft + e.scrollSpeed : b.pageX - d.overflowOffset.left < e.scrollSensitivity && (g.scrollLeft = f = g.scrollLeft - e.scrollSpeed))) : (e.axis && "x" === e.axis || (b.pageY - a(h).scrollTop() < e.scrollSensitivity ? f = a(h).scrollTop(a(h).scrollTop() - e.scrollSpeed) : a(window).height() - (b.pageY - a(h).scrollTop()) < e.scrollSensitivity && (f = a(h).scrollTop(a(h).scrollTop() + e.scrollSpeed))), e.axis && "y" === e.axis || (b.pageX - a(h).scrollLeft() < e.scrollSensitivity ? f = a(h).scrollLeft(a(h).scrollLeft() - e.scrollSpeed) : a(window).width() - (b.pageX - a(h).scrollLeft()) < e.scrollSensitivity && (f = a(h).scrollLeft(a(h).scrollLeft() + e.scrollSpeed)))), !1 !== f && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(d, b)
			}
		}), a.ui.plugin.add("draggable", "snap", {
			start: function(b, c, d) {
				var e = d.options;
				d.snapElements = [], a(e.snap.constructor !== String ? e.snap.items || ":data(ui-draggable)" : e.snap).each(function() {
					var b = a(this),
						c = b.offset();
					this !== d.element[0] && d.snapElements.push({
						item: this,
						width: b.outerWidth(),
						height: b.outerHeight(),
						top: c.top,
						left: c.left
					})
				})
			},
			drag: function(b, c, d) {
				var e, f, g, h, i, j, k, l, m, n, o = d.options,
					p = o.snapTolerance,
					q = c.offset.left,
					r = q + d.helperProportions.width,
					s = c.offset.top,
					t = s + d.helperProportions.height;
				for(m = d.snapElements.length - 1; m >= 0; m--) i = d.snapElements[m].left - d.margins.left, j = i + d.snapElements[m].width, k = d.snapElements[m].top - d.margins.top, l = k + d.snapElements[m].height, i - p > r || q > j + p || k - p > t || s > l + p || !a.contains(d.snapElements[m].item.ownerDocument, d.snapElements[m].item) ? (d.snapElements[m].snapping && d.options.snap.release && d.options.snap.release.call(d.element, b, a.extend(d._uiHash(), {
					snapItem: d.snapElements[m].item
				})), d.snapElements[m].snapping = !1) : ("inner" !== o.snapMode && (e = p >= Math.abs(k - t), f = p >= Math.abs(l - s), g = p >= Math.abs(i - r), h = p >= Math.abs(j - q), e && (c.position.top = d._convertPositionTo("relative", {
					top: k - d.helperProportions.height,
					left: 0
				}).top), f && (c.position.top = d._convertPositionTo("relative", {
					top: l,
					left: 0
				}).top), g && (c.position.left = d._convertPositionTo("relative", {
					top: 0,
					left: i - d.helperProportions.width
				}).left), h && (c.position.left = d._convertPositionTo("relative", {
					top: 0,
					left: j
				}).left)), n = e || f || g || h, "outer" !== o.snapMode && (e = p >= Math.abs(k - s), f = p >= Math.abs(l - t), g = p >= Math.abs(i - q), h = p >= Math.abs(j - r), e && (c.position.top = d._convertPositionTo("relative", {
					top: k,
					left: 0
				}).top), f && (c.position.top = d._convertPositionTo("relative", {
					top: l - d.helperProportions.height,
					left: 0
				}).top), g && (c.position.left = d._convertPositionTo("relative", {
					top: 0,
					left: i
				}).left), h && (c.position.left = d._convertPositionTo("relative", {
					top: 0,
					left: j - d.helperProportions.width
				}).left)), !d.snapElements[m].snapping && (e || f || g || h || n) && d.options.snap.snap && d.options.snap.snap.call(d.element, b, a.extend(d._uiHash(), {
					snapItem: d.snapElements[m].item
				})), d.snapElements[m].snapping = e || f || g || h || n)
			}
		}), a.ui.plugin.add("draggable", "stack", {
			start: function(b, c, d) {
				var e, f = d.options,
					g = a.makeArray(a(f.stack)).sort(function(b, c) {
						return(parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0)
					});
				g.length && (e = parseInt(a(g[0]).css("zIndex"), 10) || 0, a(g).each(function(b) {
					a(this).css("zIndex", e + b)
				}), this.css("zIndex", e + g.length))
			}
		}), a.ui.plugin.add("draggable", "zIndex", {
			start: function(b, c, d) {
				var e = a(c.helper),
					f = d.options;
				e.css("zIndex") && (f._zIndex = e.css("zIndex")), e.css("zIndex", f.zIndex)
			},
			stop: function(b, c, d) {
				var e = d.options;
				e._zIndex && a(c.helper).css("zIndex", e._zIndex)
			}
		}), a.ui.draggable
	}),
	function(a) {
		"function" == typeof define && define.amd ? define(["jquery", "moment"], a) : "object" == typeof exports ? module.exports = a(require("jquery"), require("moment")) : a(jQuery, moment)
	}(function(a, b) {
		function c() {
			var b, c, d, e, f, g = Array.prototype.slice.call(arguments),
				h = {};
			for(b = 0; Ka.length > b; b++) {
				for(c = Ka[b], d = null, e = 0; g.length > e; e++) f = g[e][c], a.isPlainObject(f) ? d = a.extend(d || {}, f) : null != f && (d = null);
				null !== d && (h[c] = d)
			}
			return g.unshift({}), g.push(h), a.extend.apply(a, g)
		}

		function d(b) {
			var c, d = {
				views: b.views || {}
			};
			return a.each(b, function(b, e) {
				"views" != b && (a.isPlainObject(e) && !/(time|duration|interval)$/i.test(b) && -1 == a.inArray(b, Ka) ? (c = null, a.each(e, function(a, e) {
					/^(month|week|day|default|basic(Week|Day)?|agenda(Week|Day)?)$/.test(a) ? (d.views[a] || (d.views[a] = {}), d.views[a][b] = e) : (c || (c = {}), c[a] = e)
				}), c && (d[b] = c)) : d[b] = e)
			}), d
		}

		function e(a, b) {
			b.left && a.css({
				"border-left-width": 1,
				"margin-left": b.left - 1
			}), b.right && a.css({
				"border-right-width": 1,
				"margin-right": b.right - 1
			})
		}

		function f(a) {
			a.css({
				"margin-left": "",
				"margin-right": "",
				"border-left-width": "",
				"border-right-width": ""
			})
		}

		function g() {
			a("body").addClass("fc-not-allowed")
		}

		function h() {
			a("body").removeClass("fc-not-allowed")
		}

		function i(b, c, d) {
			var e = Math.floor(c / b.length),
				f = Math.floor(c - e * (b.length - 1)),
				g = [],
				h = [],
				i = [],
				k = 0;
			j(b), b.each(function(c, d) {
				var j = c === b.length - 1 ? f : e,
					l = a(d).outerHeight(!0);
				j > l ? (g.push(d), h.push(l), i.push(a(d).height())) : k += l
			}), d && (c -= k, e = Math.floor(c / g.length), f = Math.floor(c - e * (g.length - 1))), a(g).each(function(b, c) {
				var d = b === g.length - 1 ? f : e,
					j = h[b],
					k = i[b],
					l = d - (j - k);
				d > j && a(c).height(l)
			})
		}

		function j(a) {
			a.height("")
		}

		function k(b) {
			var c = 0;
			return b.find("> *").each(function(b, d) {
				var e = a(d).outerWidth();
				e > c && (c = e)
			}), c++, b.width(c), c
		}

		function l(a, b) {
			return a.height(b).addClass("fc-scroller"), a[0].scrollHeight - 1 > a[0].clientHeight || (m(a), !1)
		}

		function m(a) {
			a.height("").removeClass("fc-scroller")
		}

		function n(b) {
			var c = b.css("position"),
				d = b.parents().filter(function() {
					var b = a(this);
					return /(auto|scroll)/.test(b.css("overflow") + b.css("overflow-y") + b.css("overflow-x"))
				}).eq(0);
			return "fixed" !== c && d.length ? d : a(b[0].ownerDocument || document)
		}

		function o(a) {
			var b = a.offset();
			return {
				left: b.left,
				right: b.left + a.outerWidth(),
				top: b.top,
				bottom: b.top + a.outerHeight()
			}
		}

		function p(a) {
			var b = a.offset(),
				c = r(a),
				d = b.left + u(a, "border-left-width") + c.left,
				e = b.top + u(a, "border-top-width") + c.top;
			return {
				left: d,
				right: d + a[0].clientWidth,
				top: e,
				bottom: e + a[0].clientHeight
			}
		}

		function q(a) {
			var b = a.offset(),
				c = b.left + u(a, "border-left-width") + u(a, "padding-left"),
				d = b.top + u(a, "border-top-width") + u(a, "padding-top");
			return {
				left: c,
				right: c + a.width(),
				top: d,
				bottom: d + a.height()
			}
		}

		function r(a) {
			var b = a.innerWidth() - a[0].clientWidth,
				c = {
					left: 0,
					right: 0,
					top: 0,
					bottom: a.innerHeight() - a[0].clientHeight
				};
			return s() && "rtl" == a.css("direction") ? c.left = b : c.right = b, c
		}

		function s() {
			return null === La && (La = t()), La
		}

		function t() {
			var b = a("<div><div/></div>").css({
					position: "absolute",
					top: -1e3,
					left: 0,
					border: 0,
					padding: 0,
					overflow: "scroll",
					direction: "rtl"
				}).appendTo("body"),
				c = b.children(),
				d = c.offset().left > b.offset().left;
			return b.remove(), d
		}

		function u(a, b) {
			return parseFloat(a.css(b)) || 0
		}

		function v(a) {
			return 1 == a.which && !a.ctrlKey
		}

		function w(a, b) {
			var c = {
				left: Math.max(a.left, b.left),
				right: Math.min(a.right, b.right),
				top: Math.max(a.top, b.top),
				bottom: Math.min(a.bottom, b.bottom)
			};
			return c.left < c.right && c.top < c.bottom && c
		}

		function x(a, b) {
			return {
				left: Math.min(Math.max(a.left, b.left), b.right),
				top: Math.min(Math.max(a.top, b.top), b.bottom)
			}
		}

		function y(a) {
			return {
				left: (a.left + a.right) / 2,
				top: (a.top + a.bottom) / 2
			}
		}

		function z(a, b) {
			return {
				left: a.left - b.left,
				top: a.top - b.top
			}
		}

		function A(a, b) {
			var c, d, e, f, g = a.start,
				h = a.end,
				i = b.start,
				j = b.end;
			return h > i && j > g ? (g >= i ? (c = g.clone(), e = !0) : (c = i.clone(), e = !1), j >= h ? (d = h.clone(), f = !0) : (d = j.clone(), f = !1), {
				start: c,
				end: d,
				isStart: e,
				isEnd: f
			}) : void 0
		}

		function B(a, c) {
			return b.duration({
				days: a.clone().stripTime().diff(c.clone().stripTime(), "days"),
				ms: a.time() - c.time()
			})
		}

		function C(a, c) {
			return b.duration({
				days: a.clone().stripTime().diff(c.clone().stripTime(), "days")
			})
		}

		function D(a, c, d) {
			return b.duration(Math.round(a.diff(c, d, !0)), d)
		}

		function E(a, b) {
			var c, d, e;
			for(c = 0; Qa.length > c && (d = Qa[c], !((e = F(d, a, b)) >= 1 && V(e))); c++);
			return d
		}

		function F(a, c, d) {
			return null != d ? d.diff(c, a, !0) : b.isDuration(c) ? c.as(a) : c.end.diff(c.start, a, !0)
		}

		function G(a) {
			return Boolean(a.hours() || a.minutes() || a.seconds() || a.milliseconds())
		}

		function H(a) {
			return "[object Date]" === Object.prototype.toString.call(a) || a instanceof Date
		}

		function I(a) {
			return /^\d+\:\d+(?:\:\d+\.?(?:\d{3})?)?$/.test(a)
		}

		function J(a) {
			var b = function() {};
			return b.prototype = a, new b
		}

		function K(a, b) {
			for(var c in a) M(a, c) && (b[c] = a[c])
		}

		function L(a, b) {
			var c, d, e = ["constructor", "toString", "valueOf"];
			for(c = 0; e.length > c; c++) d = e[c], a[d] !== Object.prototype[d] && (b[d] = a[d])
		}

		function M(a, b) {
			return Ra.call(a, b)
		}

		function N(b) {
			return /undefined|null|boolean|number|string/.test(a.type(b))
		}

		function O(b, c, d) {
			if(a.isFunction(b) && (b = [b]), b) {
				var e, f;
				for(e = 0; b.length > e; e++) f = b[e].apply(c, d) || f;
				return f
			}
		}

		function P() {
			for(var a = 0; arguments.length > a; a++)
				if(void 0 !== arguments[a]) return arguments[a]
		}

		function Q(a) {
			return(a + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;").replace(/\n/g, "<br />")
		}

		function R(a) {
			return a.replace(/&.*?;/g, "")
		}

		function S(b) {
			var c = [];
			return a.each(b, function(a, b) {
				null != b && c.push(a + ":" + b)
			}), c.join(";")
		}

		function T(a) {
			return a.charAt(0).toUpperCase() + a.slice(1)
		}

		function U(a, b) {
			return a - b
		}

		function V(a) {
			return 0 == a % 1
		}

		function W(a, b) {
			var c = a[b];
			return function() {
				return c.apply(a, arguments)
			}
		}

		function X(a, b) {
			var c, d, e, f, g = function() {
				var h = +new Date - f;
				b > h && h > 0 ? c = setTimeout(g, b - h) : (c = null, a.apply(e, d), c || (e = d = null))
			};
			return function() {
				e = this, d = arguments, f = +new Date, c || (c = setTimeout(g, b))
			}
		}

		function Y(c, d, e) {
			var f, g, h, i, j = c[0],
				k = 1 == c.length && "string" == typeof j;
			return b.isMoment(j) ? (i = b.apply(null, c), $(j, i)) : H(j) || void 0 === j ? i = b.apply(null, c) : (f = !1, g = !1, k ? Sa.test(j) ? (j += "-01", c = [j], f = !0, g = !0) : (h = Ta.exec(j)) && (f = !h[5], g = !0) : a.isArray(j) && (g = !0), i = d || f ? b.utc.apply(b, c) : b.apply(null, c), f ? (i._ambigTime = !0, i._ambigZone = !0) : e && (g ? i._ambigZone = !0 : k && (i.utcOffset ? i.utcOffset(j) : i.zone(j)))), i._fullCalendar = !0, i
		}

		function Z(a, c) {
			var d, e, f = !1,
				g = !1,
				h = a.length,
				i = [];
			for(d = 0; h > d; d++) e = a[d], b.isMoment(e) || (e = Ia.moment.parseZone(e)), f = f || e._ambigTime, g = g || e._ambigZone, i.push(e);
			for(d = 0; h > d; d++) e = i[d], c || !f || e._ambigTime ? g && !e._ambigZone && (i[d] = e.clone().stripZone()) : i[d] = e.clone().stripTime();
			return i
		}

		function $(a, b) {
			a._ambigTime ? b._ambigTime = !0 : b._ambigTime && (b._ambigTime = !1), a._ambigZone ? b._ambigZone = !0 : b._ambigZone && (b._ambigZone = !1)
		}

		function _(a, b) {
			a.year(b[0] || 0).month(b[1] || 0).date(b[2] || 0).hours(b[3] || 0).minutes(b[4] || 0).seconds(b[5] || 0).milliseconds(b[6] || 0)
		}

		function aa(a, b) {
			return Va.format.call(a, b)
		}

		function ba(a, b) {
			return ca(a, ha(b))
		}

		function ca(a, b) {
			var c, d = "";
			for(c = 0; b.length > c; c++) d += da(a, b[c]);
			return d
		}

		function da(a, b) {
			var c, d;
			return "string" == typeof b ? b : (c = b.token) ? Wa[c] ? Wa[c](a) : aa(a, c) : b.maybe && (d = ca(a, b.maybe), d.match(/[1-9]/)) ? d : ""
		}

		function ea(a, b, c, d, e) {
			var f;
			return a = Ia.moment.parseZone(a), b = Ia.moment.parseZone(b), f = (a.localeData || a.lang).call(a), c = f.longDateFormat(c) || c, d = d || " - ", fa(a, b, ha(c), d, e)
		}

		function fa(a, b, c, d, e) {
			var f, g, h, i, j = "",
				k = "",
				l = "",
				m = "",
				n = "";
			for(g = 0; c.length > g && !1 !== (f = ga(a, b, c[g])); g++) j += f;
			for(h = c.length - 1; h > g && !1 !== (f = ga(a, b, c[h])); h--) k = f + k;
			for(i = g; h >= i; i++) l += da(a, c[i]), m += da(b, c[i]);
			return(l || m) && (n = e ? m + d + l : l + d + m), j + n + k
		}

		function ga(a, b, c) {
			var d, e;
			return "string" == typeof c ? c : !!((d = c.token) && (e = Xa[d.charAt(0)]) && a.isSame(b, e)) && aa(a, d)
		}

		function ha(a) {
			return a in Ya ? Ya[a] : Ya[a] = ia(a)
		}

		function ia(a) {
			for(var b, c = [], d = /\[([^\]]*)\]|\(([^\)]*)\)|(LTS|LT|(\w)\4*o?)|([^\w\[\(]+)/g; b = d.exec(a);) b[1] ? c.push(b[1]) : b[2] ? c.push({
				maybe: ia(b[2])
			}) : b[3] ? c.push({
				token: b[3]
			}) : b[5] && c.push(b[5]);
			return c
		}

		function ja() {}

		function ka(a, b) {
			return !a && !b || !(!a || !b) && (a.grid === b.grid && a.row === b.row && a.col === b.col)
		}

		function la(a) {
			var b = na(a);
			return "background" === b || "inverse-background" === b
		}

		function ma(a) {
			return "inverse-background" === na(a)
		}

		function na(a) {
			return P((a.source || {}).rendering, a.rendering)
		}

		function oa(a) {
			var b, c, d = {};
			for(b = 0; a.length > b; b++) c = a[b], (d[c._id] || (d[c._id] = [])).push(c);
			return d
		}

		function pa(a, b) {
			return a.eventStartMS - b.eventStartMS
		}

		function qa(a, b) {
			return a.eventStartMS - b.eventStartMS || b.eventDurationMS - a.eventDurationMS || b.event.allDay - a.event.allDay || (a.event.title || "").localeCompare(b.event.title)
		}

		function ra(c) {
			var d, e, f, g, h = Ia.dataAttrPrefix;
			return h && (h += "-"), d = c.data(h + "event") || null, d && (d = "object" == typeof d ? a.extend({}, d) : {}, e = d.start, null == e && (e = d.time), f = d.duration, g = d.stick, delete d.start, delete d.time, delete d.duration, delete d.stick), null == e && (e = c.data(h + "start")), null == e && (e = c.data(h + "time")), null == f && (f = c.data(h + "duration")), null == g && (g = c.data(h + "stick")), e = null != e ? b.duration(e) : null, f = null != f ? b.duration(f) : null, g = Boolean(g), {
				eventProps: d,
				startTime: e,
				duration: f,
				stick: g
			}
		}

		function sa(a, b) {
			var c, d;
			for(c = 0; b.length > c; c++)
				if(d = b[c], d.leftCol <= a.rightCol && d.rightCol >= a.leftCol) return !0;
			return !1
		}

		function ta(a, b) {
			return a.leftCol - b.leftCol
		}

		function ua(a) {
			var b, c, d;
			if(a.sort(qa), b = va(a), wa(b), c = b[0]) {
				for(d = 0; c.length > d; d++) xa(c[d]);
				for(d = 0; c.length > d; d++) ya(c[d], 0, 0)
			}
		}

		function va(a) {
			var b, c, d, e = [];
			for(b = 0; a.length > b; b++) {
				for(c = a[b], d = 0; e.length > d && za(c, e[d]).length; d++);
				c.level = d, (e[d] || (e[d] = [])).push(c)
			}
			return e
		}

		function wa(a) {
			var b, c, d, e, f;
			for(b = 0; a.length > b; b++)
				for(c = a[b], d = 0; c.length > d; d++)
					for(e = c[d], e.forwardSegs = [], f = b + 1; a.length > f; f++) za(e, a[f], e.forwardSegs)
		}

		function xa(a) {
			var b, c, d = a.forwardSegs,
				e = 0;
			if(void 0 === a.forwardPressure) {
				for(b = 0; d.length > b; b++) c = d[b], xa(c), e = Math.max(e, 1 + c.forwardPressure);
				a.forwardPressure = e
			}
		}

		function ya(a, b, c) {
			var d, e = a.forwardSegs;
			if(void 0 === a.forwardCoord)
				for(e.length ? (e.sort(Ba), ya(e[0], b + 1, c), a.forwardCoord = e[0].backwardCoord) : a.forwardCoord = 1, a.backwardCoord = a.forwardCoord - (a.forwardCoord - c) / (b + 1), d = 0; e.length > d; d++) ya(e[d], 0, a.forwardCoord)
		}

		function za(a, b, c) {
			c = c || [];
			for(var d = 0; b.length > d; d++) Aa(a, b[d]) && c.push(b[d]);
			return c
		}

		function Aa(a, b) {
			return a.bottom > b.top && a.top < b.bottom
		}

		function Ba(a, b) {
			return b.forwardPressure - a.forwardPressure || (a.backwardCoord || 0) - (b.backwardCoord || 0) || qa(a, b)
		}

		function Ca(c, d) {
			function e() {
				U ? h() && (k(), i()) : f()
			}

			function f() {
				V = P.theme ? "ui" : "fc", c.addClass("fc"), P.isRTL ? c.addClass("fc-rtl") : c.addClass("fc-ltr"), P.theme ? c.addClass("ui-widget") : c.addClass("fc-unthemed"), U = a("<div class='fc-view-container'/>").prependTo(c), S = O.header = new Fa(O, P), T = S.render(), T && c.prepend(T), i(P.defaultView), P.handleWindowResize && (Z = X(m, P.windowResizeDelay), a(window).resize(Z))
			}

			function g() {
				W && W.removeElement(), S.destroy(), U.remove(), c.removeClass("fc fc-ltr fc-rtl fc-unthemed ui-widget"), Z && a(window).unbind("resize", Z)
			}

			function h() {
				return c.is(":visible")
			}

			function i(b) {
				da++, W && b && W.type !== b && (S.deactivateButton(W.type), H(), W.removeElement(), W = O.view = null), !W && b && (W = O.view = ca[b] || (ca[b] = O.instantiateView(b)), W.setElement(a("<div class='fc-view fc-" + b + "-view' />").appendTo(U)), S.activateButton(b)), W && ($ = W.massageCurrentDate($), W.isDisplayed && $.isWithin(W.intervalStart, W.intervalEnd) || h() && (H(), W.display($), I(), u(), v(), q())), I(), da--
			}

			function j(a) {
				return h() ? (a && l(), da++, W.updateSize(!0), da--, !0) : void 0
			}

			function k() {
				h() && l()
			}

			function l() {
				Y = "number" == typeof P.contentHeight ? P.contentHeight : "number" == typeof P.height ? P.height - (T ? T.outerHeight(!0) : 0) : Math.round(U.width() / Math.max(P.aspectRatio, .5))
			}

			function m(a) {
				!da && a.target === window && W.start && j(!0) && W.trigger("windowResize", ba)
			}

			function n() {
				p(), r()
			}

			function o() {
				h() && (H(), W.displayEvents(ea), I())
			}

			function p() {
				H(), W.clearEvents(), I()
			}

			function q() {
				!P.lazyFetching || _(W.start, W.end) ? r() : o()
			}

			function r() {
				aa(W.start, W.end)
			}

			function s(a) {
				ea = a, o()
			}

			function t() {
				o()
			}

			function u() {
				S.updateTitle(W.title)
			}

			function v() {
				O.getNow().isWithin(W.intervalStart, W.intervalEnd) ? S.disableButton("today") : S.enableButton("today")
			}

			function w(a, b) {
				a = O.moment(a), b = b ? O.moment(b) : a.hasTime() ? a.clone().add(O.defaultTimedEventDuration) : a.clone().add(O.defaultAllDayEventDuration), W.select({
					start: a,
					end: b
				})
			}

			function x() {
				W && W.unselect()
			}

			function y() {
				$ = W.computePrevDate($), i()
			}

			function z() {
				$ = W.computeNextDate($), i()
			}

			function A() {
				$.add(-1, "years"), i()
			}

			function B() {
				$.add(1, "years"), i()
			}

			function C() {
				$ = O.getNow(), i()
			}

			function D(a) {
				$ = O.moment(a), i()
			}

			function E(a) {
				$.add(b.duration(a)), i()
			}

			function F(a, b) {
				var c;
				b = b || "day", c = O.getViewSpec(b) || O.getUnitViewSpec(b), $ = a, i(c ? c.type : null)
			}

			function G() {
				return $.clone()
			}

			function H() {
				U.css({
					width: "100%",
					height: U.height(),
					overflow: "hidden"
				})
			}

			function I() {
				U.css({
					width: "",
					height: "",
					overflow: ""
				})
			}

			function K() {
				return O
			}

			function L() {
				return W
			}

			function M(a, b) {
				return void 0 === b ? P[a] : void(("height" == a || "contentHeight" == a || "aspectRatio" == a) && (P[a] = b, j(!0)))
			}

			function N(a, b) {
				return P[a] ? P[a].apply(b || ba, Array.prototype.slice.call(arguments, 2)) : void 0
			}
			var O = this;
			O.initOptions(d || {});
			var P = this.options;
			O.render = e, O.destroy = g, O.refetchEvents = n, O.reportEvents = s, O.reportEventChange = t, O.rerenderEvents = o, O.changeView = i, O.select = w, O.unselect = x, O.prev = y, O.next = z, O.prevYear = A, O.nextYear = B, O.today = C, O.gotoDate = D, O.incrementDate = E, O.zoomTo = F, O.getDate = G, O.getCalendar = K, O.getView = L, O.option = M, O.trigger = N;
			var Q = J(Ea(P.lang));
			if(P.monthNames && (Q._months = P.monthNames), P.monthNamesShort && (Q._monthsShort = P.monthNamesShort), P.dayNames && (Q._weekdays = P.dayNames), P.dayNamesShort && (Q._weekdaysShort = P.dayNamesShort), null != P.firstDay) {
				var R = J(Q._week);
				R.dow = P.firstDay, Q._week = R
			}
			Q._fullCalendar_weekCalc = function(a) {
				return "function" == typeof a ? a : "local" === a ? a : "iso" === a || "ISO" === a ? "ISO" : void 0
			}(P.weekNumberCalculation), O.defaultAllDayEventDuration = b.duration(P.defaultAllDayEventDuration), O.defaultTimedEventDuration = b.duration(P.defaultTimedEventDuration), O.moment = function() {
				var a;
				return "local" === P.timezone ? (a = Ia.moment.apply(null, arguments), a.hasTime() && a.local()) : a = "UTC" === P.timezone ? Ia.moment.utc.apply(null, arguments) : Ia.moment.parseZone.apply(null, arguments), "_locale" in a ? a._locale = Q : a._lang = Q, a
			}, O.getIsAmbigTimezone = function() {
				return "local" !== P.timezone && "UTC" !== P.timezone
			}, O.rezoneDate = function(a) {
				return O.moment(a.toArray())
			}, O.getNow = function() {
				var a = P.now;
				return "function" == typeof a && (a = a()), O.moment(a)
			}, O.getEventEnd = function(a) {
				return a.end ? a.end.clone() : O.getDefaultEventEnd(a.allDay, a.start)
			}, O.getDefaultEventEnd = function(a, b) {
				var c = b.clone();
				return a ? c.stripTime().add(O.defaultAllDayEventDuration) : c.add(O.defaultTimedEventDuration), O.getIsAmbigTimezone() && c.stripZone(), c
			}, O.humanizeDuration = function(a) {
				return(a.locale || a.lang).call(a, P.lang).humanize()
			}, Ga.call(O, P);
			var S, T, U, V, W, Y, Z, $, _ = O.isFetchNeeded,
				aa = O.fetchEvents,
				ba = c[0],
				ca = {},
				da = 0,
				ea = [];
			$ = null != P.defaultDate ? O.moment(P.defaultDate) : O.getNow(), O.getSuggestedViewHeight = function() {
				return void 0 === Y && k(), Y
			}, O.isHeightAuto = function() {
				return "auto" === P.contentHeight || "auto" === P.height
			}
		}

		function Da(b) {
			a.each(mb, function(a, c) {
				null == b[a] && (b[a] = c(b))
			})
		}

		function Ea(a) {
			var c = b.localeData || b.langData;
			return c.call(b, a) || c.call(b, "en")
		}

		function Fa(b, c) {
			function d() {
				var b = c.header;
				return n = c.theme ? "ui" : "fc", b ? o = a("<div class='fc-toolbar'/>").append(f("left")).append(f("right")).append(f("center")).append('<div class="fc-clear"/>') : void 0
			}

			function e() {
				o.remove()
			}

			function f(d) {
				var e = a('<div class="fc-' + d + '"/>'),
					f = c.header[d];
				return f && a.each(f.split(" "), function() {
					var d, f = a(),
						g = !0;
					a.each(this.split(","), function(d, e) {
						var h, i, j, k, l, m, o, q, r;
						"title" == e ? (f = f.add(a("<h2>&nbsp;</h2>")), g = !1) : (h = b.getViewSpec(e), h ? (i = function() {
							b.changeView(e)
						}, p.push(e), j = h.buttonTextOverride, k = h.buttonTextDefault) : b[e] && (i = function() {
							b[e]()
						}, j = (b.overrides.buttonText || {})[e], k = c.buttonText[e]), i && (l = c.themeButtonIcons[e], m = c.buttonIcons[e], o = j ? Q(j) : l && c.theme ? "<span class='ui-icon ui-icon-" + l + "'></span>" : m && !c.theme ? "<span class='fc-icon fc-icon-" + m + "'></span>" : Q(k), q = ["fc-" + e + "-button", n + "-button", n + "-state-default"], r = a('<button type="button" class="' + q.join(" ") + '">' + o + "</button>").click(function() {
							r.hasClass(n + "-state-disabled") || (i(), (r.hasClass(n + "-state-active") || r.hasClass(n + "-state-disabled")) && r.removeClass(n + "-state-hover"))
						}).mousedown(function() {
							r.not("." + n + "-state-active").not("." + n + "-state-disabled").addClass(n + "-state-down")
						}).mouseup(function() {
							r.removeClass(n + "-state-down")
						}).hover(function() {
							r.not("." + n + "-state-active").not("." + n + "-state-disabled").addClass(n + "-state-hover")
						}, function() {
							r.removeClass(n + "-state-hover").removeClass(n + "-state-down")
						}), f = f.add(r)))
					}), g && f.first().addClass(n + "-corner-left").end().last().addClass(n + "-corner-right").end(), f.length > 1 ? (d = a("<div/>"), g && d.addClass("fc-button-group"), d.append(f), e.append(d)) : e.append(f)
				}), e
			}

			function g(a) {
				o.find("h2").text(a)
			}

			function h(a) {
				o.find(".fc-" + a + "-button").addClass(n + "-state-active")
			}

			function i(a) {
				o.find(".fc-" + a + "-button").removeClass(n + "-state-active")
			}

			function j(a) {
				o.find(".fc-" + a + "-button").attr("disabled", "disabled").addClass(n + "-state-disabled")
			}

			function k(a) {
				o.find(".fc-" + a + "-button").removeAttr("disabled").removeClass(n + "-state-disabled")
			}

			function l() {
				return p
			}
			var m = this;
			m.render = d, m.destroy = e, m.updateTitle = g, m.activateButton = h, m.deactivateButton = i, m.disableButton = j, m.enableButton = k, m.getViewsWithButtons = l;
			var n, o = a(),
				p = []
		}

		function Ga(c) {
			function d(a, b) {
				return !S || a.clone().stripZone() < S.clone().stripZone() || b.clone().stripZone() > T.clone().stripZone()
			}

			function e(a, b) {
				S = a, T = b, aa = [];
				var c = ++Z,
					d = Y.length;
				$ = d;
				for(var e = 0; d > e; e++) f(Y[e], c)
			}

			function f(b, c) {
				g(b, function(d) {
					var e, f, g, h = a.isArray(b.events);
					if(c == Z) {
						if(d)
							for(e = 0; d.length > e; e++) f = d[e], (g = h ? f : u(f, b)) && aa.push.apply(aa, z(g));
						--$ || W(aa)
					}
				})
			}

			function g(b, d) {
				var e, f, h = Ia.sourceFetchers;
				for(e = 0; h.length > e; e++) {
					if(!0 === (f = h[e].call(R, b, S.clone(), T.clone(), c.timezone, d))) return;
					if("object" == typeof f) return void g(f, d)
				}
				var i = b.events;
				if(i) a.isFunction(i) ? (s(), i.call(R, S.clone(), T.clone(), c.timezone, function(a) {
					d(a), t()
				})) : a.isArray(i) ? d(i) : d();
				else {
					if(b.url) {
						var j, k = b.success,
							l = b.error,
							m = b.complete;
						j = a.isFunction(b.data) ? b.data() : b.data;
						var n = a.extend({}, j || {}),
							o = P(b.startParam, c.startParam),
							p = P(b.endParam, c.endParam),
							q = P(b.timezoneParam, c.timezoneParam);
						o && (n[o] = S.format()), p && (n[p] = T.format()), c.timezone && "local" != c.timezone && (n[q] = c.timezone), s(), a.ajax(a.extend({}, nb, b, {
							data: n,
							success: function(b) {
								b = b || [];
								var c = O(k, this, arguments);
								a.isArray(c) && (b = c), d(b)
							},
							error: function() {
								O(l, this, arguments), d()
							},
							complete: function() {
								O(m, this, arguments), t()
							}
						}))
					} else d()
				}
			}

			function h(a) {
				var b = i(a);
				b && (Y.push(b), $++, f(b, Z))
			}

			function i(b) {
				var c, d, e = Ia.sourceNormalizers;
				if(a.isFunction(b) || a.isArray(b) ? c = {
						events: b
					} : "string" == typeof b ? c = {
						url: b
					} : "object" == typeof b && (c = a.extend({}, b)), c) {
					for(c.className ? "string" == typeof c.className && (c.className = c.className.split(/\s+/)) : c.className = [], a.isArray(c.events) && (c.origArray = c.events, c.events = a.map(c.events, function(a) {
							return u(a, c)
						})), d = 0; e.length > d; d++) e[d].call(R, c);
					return c
				}
			}

			function j(b) {
				Y = a.grep(Y, function(a) {
					return !k(a, b)
				}), aa = a.grep(aa, function(a) {
					return !k(a.source, b)
				}), W(aa)
			}

			function k(a, b) {
				return a && b && l(a) == l(b)
			}

			function l(a) {
				return("object" == typeof a ? a.origArray || a.googleCalendarId || a.url || a.events : null) || a
			}

			function m(a) {
				a.start = R.moment(a.start), a.end = a.end ? R.moment(a.end) : null, A(a, n(a)), W(aa)
			}

			function n(b) {
				var c = {};
				return a.each(b, function(a, b) {
					o(a) && void 0 !== b && N(b) && (c[a] = b)
				}), c
			}

			function o(a) {
				return !/^_|^(id|allDay|start|end)$/.test(a)
			}

			function p(a, b) {
				var c, d, e, f = u(a);
				if(f) {
					for(c = z(f), d = 0; c.length > d; d++) e = c[d], e.source || (b && (X.events.push(e), e.source = X), aa.push(e));
					return W(aa), c
				}
				return []
			}

			function q(b) {
				var c, d;
				for(null == b ? b = function() {
						return !0
					} : a.isFunction(b) || (c = b + "", b = function(a) {
						return a._id == c
					}), aa = a.grep(aa, b, !0), d = 0; Y.length > d; d++) a.isArray(Y[d].events) && (Y[d].events = a.grep(Y[d].events, b, !0));
				W(aa)
			}

			function r(b) {
				return a.isFunction(b) ? a.grep(aa, b) : null != b ? (b += "", a.grep(aa, function(a) {
					return a._id == b
				})) : aa
			}

			function s() {
				_++ || U("loading", null, !0, V())
			}

			function t() {
				--_ || U("loading", null, !1, V())
			}

			function u(d, e) {
				var f, g, h, i = {};
				if(c.eventDataTransform && (d = c.eventDataTransform(d)), e && e.eventDataTransform && (d = e.eventDataTransform(d)), a.extend(i, d), e && (i.source = e), i._id = d._id || (void 0 === d.id ? "_fc" + ob++ : d.id + ""), i.className = d.className ? "string" == typeof d.className ? d.className.split(/\s+/) : d.className : [], f = d.start || d.date, g = d.end, I(f) && (f = b.duration(f)), I(g) && (g = b.duration(g)), d.dow || b.isDuration(f) || b.isDuration(g)) i.start = f ? b.duration(f) : null, i.end = g ? b.duration(g) : null, i._recurring = !0;
				else {
					if(f && (f = R.moment(f), !f.isValid())) return !1;
					g && (g = R.moment(g), g.isValid() || (g = null)), h = d.allDay, void 0 === h && (h = P(e ? e.allDayDefault : void 0, c.allDayDefault)), v(f, g, h, i)
				}
				return i
			}

			function v(a, b, c, d) {
				d.start = a, d.end = b, d.allDay = c, w(d), Ha(d)
			}

			function w(a) {
				x(a), a.end && !a.end.isAfter(a.start) && (a.end = null), a.end || (a.end = c.forceEventDuration ? R.getDefaultEventEnd(a.allDay, a.start) : null)
			}

			function x(a) {
				null == a.allDay && (a.allDay = !(a.start.hasTime() || a.end && a.end.hasTime())), a.allDay ? (a.start.stripTime(), a.end && a.end.stripTime()) : (a.start.hasTime() || (a.start = R.rezoneDate(a.start)), a.end && !a.end.hasTime() && (a.end = R.rezoneDate(a.end)))
			}

			function y(b) {
				var c;
				return b.end || (c = b.allDay, null == c && (c = !b.start.hasTime()), b = a.extend({}, b), b.end = R.getDefaultEventEnd(c, b.start)), b
			}

			function z(b, c, d) {
				var e, f, g, h, i, j, k, l, m, n = [];
				if(c = c || S, d = d || T, b)
					if(b._recurring) {
						if(f = b.dow)
							for(e = {}, g = 0; f.length > g; g++) e[f[g]] = !0;
						for(h = c.clone().stripTime(); h.isBefore(d);)(!e || e[h.day()]) && (i = b.start, j = b.end, k = h.clone(), l = null, i && (k = k.time(i)), j && (l = h.clone().time(j)), m = a.extend({}, b), v(k, l, !i && !j, m), n.push(m)), h.add(1, "days")
					} else n.push(b);
				return n
			}

			function A(b, c, d) {
				function e(a, b) {
					return d ? D(a, b, d) : c.allDay ? C(a, b) : B(a, b)
				}
				var f, g, h, i, j, k, l = {};
				return c = c || {}, c.start || (c.start = b.start.clone()), void 0 === c.end && (c.end = b.end ? b.end.clone() : null), null == c.allDay && (c.allDay = b.allDay), w(c), f = {
					start: b._start.clone(),
					end: b._end ? b._end.clone() : R.getDefaultEventEnd(b._allDay, b._start),
					allDay: c.allDay
				}, w(f), g = null !== b._end && null === c.end, h = e(c.start, f.start), c.end ? (i = e(c.end, f.end), j = i.subtract(h)) : j = null, a.each(c, function(a, b) {
					o(a) && void 0 !== b && (l[a] = b)
				}), k = E(r(b._id), g, c.allDay, h, j, l), {
					dateDelta: h,
					durationDelta: j,
					undo: k
				}
			}

			function E(b, c, d, e, f, g) {
				var h = R.getIsAmbigTimezone(),
					i = [];
				return e && !e.valueOf() && (e = null), f && !f.valueOf() && (f = null), a.each(b, function(b, j) {
						var k, l;
						k = {
							start: j.start.clone(),
							end: j.end ? j.end.clone() : null,
							allDay: j.allDay
						}, a.each(g, function(a) {
							k[a] = j[a]
						}), l = {
							start: j._start,
							end: j._end,
							allDay: d
						}, w(l), c ? l.end = null : f && !l.end && (l.end = R.getDefaultEventEnd(l.allDay, l.start)), e && (l.start.add(e), l.end && l.end.add(e)), f && l.end.add(f), h && !l.allDay && (e || f) && (l.start.stripZone(), l.end && l.end.stripZone()), a.extend(j, g, l), Ha(j), i.push(function() {
							a.extend(j, k), Ha(j)
						})
					}),
					function() {
						for(var a = 0; i.length > a; a++) i[a]()
					}
			}

			function F(b) {
				var d, e = c.businessHours,
					f = {
						className: "fc-nonbusiness",
						start: "09:00",
						end: "17:00",
						dow: [1, 2, 3, 4, 5],
						rendering: "inverse-background"
					},
					g = R.getView();
				return e && (d = a.extend({}, f, "object" == typeof e ? e : {})), d ? (b && (d.start = null, d.end = null), z(u(d), g.start, g.end)) : []
			}

			function G(a, b) {
				var d = b.source || {},
					e = P(b.constraint, d.constraint, c.eventConstraint),
					f = P(b.overlap, d.overlap, c.eventOverlap);
				return a = y(a), K(a, e, f, b)
			}

			function H(a) {
				return K(a, c.selectConstraint, c.selectOverlap)
			}

			function J(b, c) {
				var d, e;
				return c && (d = a.extend({}, c, b), e = z(u(d))[0]), e ? G(b, e) : (b = y(b), H(b))
			}

			function K(b, c, d, e) {
				var f, g, h, i, j, k;
				if(b = a.extend({}, b), b.start = b.start.clone().stripZone(), b.end = b.end.clone().stripZone(), null != c) {
					for(f = L(c), g = !1, i = 0; f.length > i; i++)
						if(M(f[i], b)) {
							g = !0;
							break
						}
					if(!g) return !1
				}
				for(h = R.getPeerEvents(e, b), i = 0; h.length > i; i++)
					if(j = h[i], Q(j, b)) {
						if(!1 === d) return !1;
						if("function" == typeof d && !d(j, e)) return !1;
						if(e) {
							if(!1 === (k = P(j.overlap, (j.source || {}).overlap))) return !1;
							if("function" == typeof k && !k(e, j)) return !1
						}
					}
				return !0
			}

			function L(a) {
				return "businessHours" === a ? F() : "object" == typeof a ? z(u(a)) : r(a)
			}

			function M(a, b) {
				var c = a.start.clone().stripZone(),
					d = R.getEventEnd(a).stripZone();
				return b.start >= c && d >= b.end
			}

			function Q(a, b) {
				var c = a.start.clone().stripZone();
				return R.getEventEnd(a).stripZone() > b.start && b.end > c
			}
			var R = this;
			R.isFetchNeeded = d, R.fetchEvents = e, R.addEventSource = h, R.removeEventSource = j, R.updateEvent = m, R.renderEvent = p, R.removeEvents = q, R.clientEvents = r, R.mutateEvent = A, R.normalizeEventRange = w, R.normalizeEventRangeTimes = x, R.ensureVisibleEventRange = y;
			var S, T, U = R.trigger,
				V = R.getView,
				W = R.reportEvents,
				X = {
					events: []
				},
				Y = [X],
				Z = 0,
				$ = 0,
				_ = 0,
				aa = [];
			a.each((c.events ? [c.events] : []).concat(c.eventSources || []), function(a, b) {
				var c = i(b);
				c && Y.push(c)
			}), R.getBusinessHoursEvents = F, R.isEventRangeAllowed = G, R.isSelectionRangeAllowed = H, R.isExternalDropRangeAllowed = J, R.getEventCache = function() {
				return aa
			}
		}

		function Ha(a) {
			a._allDay = a.allDay, a._start = a.start.clone(), a._end = a.end ? a.end.clone() : null
		}
		var Ia = a.fullCalendar = {
				version: "2.3.1"
			},
			Ja = Ia.views = {};
		a.fn.fullCalendar = function(b) {
			var c = Array.prototype.slice.call(arguments, 1),
				d = this;
			return this.each(function(e, f) {
				var g, h = a(f),
					i = h.data("fullCalendar");
				"string" == typeof b ? i && a.isFunction(i[b]) && (g = i[b].apply(i, c), e || (d = g), "destroy" === b && h.removeData("fullCalendar")) : i || (i = new Ia.CalendarBase(h, b), h.data("fullCalendar", i), i.render())
			}), d
		};
		var Ka = ["header", "buttonText", "buttonIcons", "themeButtonIcons"];
		Ia.intersectionToSeg = A, Ia.applyAll = O, Ia.debounce = X, Ia.isInt = V, Ia.htmlEscape = Q, Ia.cssToStr = S, Ia.proxy = W, Ia.getClientRect = p, Ia.getContentRect = q, Ia.getScrollbarWidths = r;
		var La = null;
		Ia.computeIntervalUnit = E, Ia.durationHasTime = G;
		var Ma, Na, Oa, Pa = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
			Qa = ["year", "month", "week", "day", "hour", "minute", "second", "millisecond"],
			Ra = {}.hasOwnProperty,
			Sa = /^\s*\d{4}-\d\d$/,
			Ta = /^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?)?$/,
			Ua = b.fn,
			Va = a.extend({}, Ua);
		Ia.moment = function() {
			return Y(arguments)
		}, Ia.moment.utc = function() {
			var a = Y(arguments, !0);
			return a.hasTime() && a.utc(), a
		}, Ia.moment.parseZone = function() {
			return Y(arguments, !0, !0)
		}, Ua.clone = function() {
			var a = Va.clone.apply(this, arguments);
			return $(this, a), this._fullCalendar && (a._fullCalendar = !0), a
		}, Ua.week = Ua.weeks = function(a) {
			var b = (this._locale || this._lang)._fullCalendar_weekCalc;
			return null == a && "function" == typeof b ? b(this) : "ISO" === b ? Va.isoWeek.apply(this, arguments) : Va.week.apply(this, arguments)
		}, Ua.time = function(a) {
			if(!this._fullCalendar) return Va.time.apply(this, arguments);
			if(null == a) return b.duration({
				hours: this.hours(),
				minutes: this.minutes(),
				seconds: this.seconds(),
				milliseconds: this.milliseconds()
			});
			this._ambigTime = !1, b.isDuration(a) || b.isMoment(a) || (a = b.duration(a));
			var c = 0;
			return b.isDuration(a) && (c = 24 * Math.floor(a.asDays())), this.hours(c + a.hours()).minutes(a.minutes()).seconds(a.seconds()).milliseconds(a.milliseconds())
		}, Ua.stripTime = function() {
			var a;
			return this._ambigTime || (a = this.toArray(), this.utc(), Na(this, a.slice(0, 3)), this._ambigTime = !0, this._ambigZone = !0), this
		}, Ua.hasTime = function() {
			return !this._ambigTime
		}, Ua.stripZone = function() {
			var a, b;
			return this._ambigZone || (a = this.toArray(), b = this._ambigTime, this.utc(), Na(this, a), this._ambigTime = b || !1, this._ambigZone = !0), this
		}, Ua.hasZone = function() {
			return !this._ambigZone
		}, Ua.local = function() {
			var a = this.toArray(),
				b = this._ambigZone;
			return Va.local.apply(this, arguments), this._ambigTime = !1, this._ambigZone = !1, b && Oa(this, a), this
		}, Ua.utc = function() {
			return Va.utc.apply(this, arguments), this._ambigTime = !1, this._ambigZone = !1, this
		}, a.each(["zone", "utcOffset"], function(a, b) {
			Va[b] && (Ua[b] = function(a) {
				return null != a && (this._ambigTime = !1, this._ambigZone = !1), Va[b].apply(this, arguments)
			})
		}), Ua.format = function() {
			return this._fullCalendar && arguments[0] ? ba(this, arguments[0]) : this._ambigTime ? aa(this, "YYYY-MM-DD") : this._ambigZone ? aa(this, "YYYY-MM-DD[T]HH:mm:ss") : Va.format.apply(this, arguments)
		}, Ua.toISOString = function() {
			return this._ambigTime ? aa(this, "YYYY-MM-DD") : this._ambigZone ? aa(this, "YYYY-MM-DD[T]HH:mm:ss") : Va.toISOString.apply(this, arguments)
		}, Ua.isWithin = function(a, b) {
			var c = Z([this, a, b]);
			return c[0] >= c[1] && c[0] < c[2]
		}, Ua.isSame = function(a, b) {
			var c;
			return this._fullCalendar ? b ? (c = Z([this, a], !0), Va.isSame.call(c[0], c[1], b)) : (a = Ia.moment.parseZone(a), Va.isSame.call(this, a) && Boolean(this._ambigTime) === Boolean(a._ambigTime) && Boolean(this._ambigZone) === Boolean(a._ambigZone)) : Va.isSame.apply(this, arguments)
		}, a.each(["isBefore", "isAfter"], function(a, b) {
			Ua[b] = function(a, c) {
				var d;
				return this._fullCalendar ? (d = Z([this, a]), Va[b].call(d[0], d[1], c)) : Va[b].apply(this, arguments)
			}
		}), Ma = "_d" in b() && "updateOffset" in b, Na = Ma ? function(a, c) {
			a._d.setTime(Date.UTC.apply(Date, c)), b.updateOffset(a, !1)
		} : _, Oa = Ma ? function(a, c) {
			a._d.setTime(+new Date(c[0] || 0, c[1] || 0, c[2] || 0, c[3] || 0, c[4] || 0, c[5] || 0, c[6] || 0)), b.updateOffset(a, !1)
		} : _;
		var Wa = {
			t: function(a) {
				return aa(a, "a").charAt(0)
			},
			T: function(a) {
				return aa(a, "A").charAt(0)
			}
		};
		Ia.formatRange = ea;
		var Xa = {
				Y: "year",
				M: "month",
				D: "day",
				d: "day",
				A: "second",
				a: "second",
				T: "second",
				t: "second",
				H: "second",
				h: "second",
				m: "second",
				s: "second"
			},
			Ya = {};
		Ia.Class = ja, ja.extend = function(a) {
			var b, c = this;
			return a = a || {}, M(a, "constructor") && (b = a.constructor), "function" != typeof b && (b = a.constructor = function() {
				c.apply(this, arguments)
			}), b.prototype = J(c.prototype), K(a, b.prototype), L(a, b.prototype), K(c, b), b
		}, ja.mixin = function(a) {
			K(a.prototype || a, this.prototype)
		};
		var Za = ja.extend({
				isHidden: !0,
				options: null,
				el: null,
				documentMousedownProxy: null,
				margin: 10,
				constructor: function(a) {
					this.options = a || {}
				},
				show: function() {
					this.isHidden && (this.el || this.render(), this.el.show(), this.position(), this.isHidden = !1, this.trigger("show"))
				},
				hide: function() {
					this.isHidden || (this.el.hide(), this.isHidden = !0, this.trigger("hide"))
				},
				render: function() {
					var b = this,
						c = this.options;
					this.el = a('<div class="fc-popover"/>').addClass(c.className || "").css({
						top: 0,
						left: 0
					}).append(c.content).appendTo(c.parentEl), this.el.on("click", ".fc-close", function() {
						b.hide()
					}), c.autoHide && a(document).on("mousedown", this.documentMousedownProxy = W(this, "documentMousedown"))
				},
				documentMousedown: function(b) {
					this.el && !a(b.target).closest(this.el).length && this.hide()
				},
				destroy: function() {
					this.hide(), this.el && (this.el.remove(), this.el = null), a(document).off("mousedown", this.documentMousedownProxy)
				},
				position: function() {
					var b, c, d, e, f, g = this.options,
						h = this.el.offsetParent().offset(),
						i = this.el.outerWidth(),
						j = this.el.outerHeight(),
						k = a(window),
						l = n(this.el);
					e = g.top || 0, f = void 0 !== g.left ? g.left : void 0 !== g.right ? g.right - i : 0, l.is(window) || l.is(document) ? (l = k, b = 0, c = 0) : (d = l.offset(), b = d.top, c = d.left), b += k.scrollTop(), c += k.scrollLeft(), !1 !== g.viewportConstrain && (e = Math.min(e, b + l.outerHeight() - j - this.margin), e = Math.max(e, b + this.margin), f = Math.min(f, c + l.outerWidth() - i - this.margin), f = Math.max(f, c + this.margin)), this.el.css({
						top: e - h.top,
						left: f - h.left
					})
				},
				trigger: function(a) {
					this.options[a] && this.options[a].apply(this, Array.prototype.slice.call(arguments, 1))
				}
			}),
			$a = ja.extend({
				grid: null,
				rowCoords: null,
				colCoords: null,
				containerEl: null,
				bounds: null,
				constructor: function(a) {
					this.grid = a
				},
				build: function() {
					this.rowCoords = this.grid.computeRowCoords(), this.colCoords = this.grid.computeColCoords(), this.computeBounds()
				},
				clear: function() {
					this.rowCoords = null, this.colCoords = null
				},
				getCell: function(b, c) {
					var d, e, f, g = this.rowCoords,
						h = g.length,
						i = this.colCoords,
						j = i.length,
						k = null,
						l = null;
					if(this.inBounds(b, c)) {
						for(d = 0; h > d; d++)
							if(e = g[d], c >= e.top && e.bottom > c) {
								k = d;
								break
							}
						for(d = 0; j > d; d++)
							if(e = i[d], b >= e.left && e.right > b) {
								l = d;
								break
							}
						if(null !== k && null !== l) return f = this.grid.getCell(k, l), f.grid = this.grid, a.extend(f, g[k], i[l]), f
					}
					return null
				},
				computeBounds: function() {
					this.bounds = this.containerEl ? p(this.containerEl) : null
				},
				inBounds: function(a, b) {
					var c = this.bounds;
					return !c || a >= c.left && c.right > a && b >= c.top && c.bottom > b
				}
			}),
			_a = ja.extend({
				coordMaps: null,
				constructor: function(a) {
					this.coordMaps = a
				},
				build: function() {
					var a, b = this.coordMaps;
					for(a = 0; b.length > a; a++) b[a].build()
				},
				getCell: function(a, b) {
					var c, d = this.coordMaps,
						e = null;
					for(c = 0; d.length > c && !e; c++) e = d[c].getCell(a, b);
					return e
				},
				clear: function() {
					var a, b = this.coordMaps;
					for(a = 0; b.length > a; a++) b[a].clear()
				}
			}),
			ab = Ia.DragListener = ja.extend({
				options: null,
				isListening: !1,
				isDragging: !1,
				originX: null,
				originY: null,
				mousemoveProxy: null,
				mouseupProxy: null,
				subjectEl: null,
				subjectHref: null,
				scrollEl: null,
				scrollBounds: null,
				scrollTopVel: null,
				scrollLeftVel: null,
				scrollIntervalId: null,
				scrollHandlerProxy: null,
				scrollSensitivity: 30,
				scrollSpeed: 200,
				scrollIntervalMs: 50,
				constructor: function(a) {
					a = a || {}, this.options = a, this.subjectEl = a.subjectEl
				},
				mousedown: function(a) {
					v(a) && (a.preventDefault(), this.startListening(a), this.options.distance || this.startDrag(a))
				},
				startListening: function(b) {
					var c;
					this.isListening || (b && this.options.scroll && (c = n(a(b.target)), c.is(window) || c.is(document) || (this.scrollEl = c, this.scrollHandlerProxy = X(W(this, "scrollHandler"), 100), this.scrollEl.on("scroll", this.scrollHandlerProxy))), a(document).on("mousemove", this.mousemoveProxy = W(this, "mousemove")).on("mouseup", this.mouseupProxy = W(this, "mouseup")).on("selectstart", this.preventDefault), b ? (this.originX = b.pageX, this.originY = b.pageY) : (this.originX = 0, this.originY = 0), this.isListening = !0, this.listenStart(b))
				},
				listenStart: function(a) {
					this.trigger("listenStart", a)
				},
				mousemove: function(a) {
					var b, c = a.pageX - this.originX,
						d = a.pageY - this.originY;
					this.isDragging || (b = this.options.distance || 1, c * c + d * d >= b * b && this.startDrag(a)), this.isDragging && this.drag(c, d, a)
				},
				startDrag: function(a) {
					this.isListening || this.startListening(), this.isDragging || (this.isDragging = !0, this.dragStart(a))
				},
				dragStart: function(a) {
					var b = this.subjectEl;
					this.trigger("dragStart", a), (this.subjectHref = b ? b.attr("href") : null) && b.removeAttr("href")
				},
				drag: function(a, b, c) {
					this.trigger("drag", a, b, c), this.updateScroll(c)
				},
				mouseup: function(a) {
					this.stopListening(a)
				},
				stopDrag: function(a) {
					this.isDragging && (this.stopScrolling(), this.dragStop(a), this.isDragging = !1)
				},
				dragStop: function(a) {
					var b = this;
					this.trigger("dragStop", a), setTimeout(function() {
						b.subjectHref && b.subjectEl.attr("href", b.subjectHref)
					}, 0)
				},
				stopListening: function(b) {
					this.stopDrag(b), this.isListening && (this.scrollEl && (this.scrollEl.off("scroll", this.scrollHandlerProxy), this.scrollHandlerProxy = null), a(document).off("mousemove", this.mousemoveProxy).off("mouseup", this.mouseupProxy).off("selectstart", this.preventDefault), this.mousemoveProxy = null, this.mouseupProxy = null, this.isListening = !1, this.listenStop(b))
				},
				listenStop: function(a) {
					this.trigger("listenStop", a)
				},
				trigger: function(a) {
					this.options[a] && this.options[a].apply(this, Array.prototype.slice.call(arguments, 1))
				},
				preventDefault: function(a) {
					a.preventDefault()
				},
				computeScrollBounds: function() {
					var a = this.scrollEl;
					this.scrollBounds = a ? o(a) : null
				},
				updateScroll: function(a) {
					var b, c, d, e, f = this.scrollSensitivity,
						g = this.scrollBounds,
						h = 0,
						i = 0;
					g && (b = (f - (a.pageY - g.top)) / f, c = (f - (g.bottom - a.pageY)) / f, d = (f - (a.pageX - g.left)) / f, e = (f - (g.right - a.pageX)) / f, b >= 0 && 1 >= b ? h = -1 * b * this.scrollSpeed : c >= 0 && 1 >= c && (h = c * this.scrollSpeed), d >= 0 && 1 >= d ? i = -1 * d * this.scrollSpeed : e >= 0 && 1 >= e && (i = e * this.scrollSpeed)), this.setScrollVel(h, i)
				},
				setScrollVel: function(a, b) {
					this.scrollTopVel = a, this.scrollLeftVel = b, this.constrainScrollVel(), !this.scrollTopVel && !this.scrollLeftVel || this.scrollIntervalId || (this.scrollIntervalId = setInterval(W(this, "scrollIntervalFunc"), this.scrollIntervalMs))
				},
				constrainScrollVel: function() {
					var a = this.scrollEl;
					0 > this.scrollTopVel ? 0 >= a.scrollTop() && (this.scrollTopVel = 0) : this.scrollTopVel > 0 && a.scrollTop() + a[0].clientHeight >= a[0].scrollHeight && (this.scrollTopVel = 0), 0 > this.scrollLeftVel ? 0 >= a.scrollLeft() && (this.scrollLeftVel = 0) : this.scrollLeftVel > 0 && a.scrollLeft() + a[0].clientWidth >= a[0].scrollWidth && (this.scrollLeftVel = 0)
				},
				scrollIntervalFunc: function() {
					var a = this.scrollEl,
						b = this.scrollIntervalMs / 1e3;
					this.scrollTopVel && a.scrollTop(a.scrollTop() + this.scrollTopVel * b), this.scrollLeftVel && a.scrollLeft(a.scrollLeft() + this.scrollLeftVel * b), this.constrainScrollVel(), this.scrollTopVel || this.scrollLeftVel || this.stopScrolling()
				},
				stopScrolling: function() {
					this.scrollIntervalId && (clearInterval(this.scrollIntervalId), this.scrollIntervalId = null, this.scrollStop())
				},
				scrollHandler: function() {
					this.scrollIntervalId || this.scrollStop()
				},
				scrollStop: function() {}
			}),
			bb = ab.extend({
				coordMap: null,
				origCell: null,
				cell: null,
				coordAdjust: null,
				constructor: function(a, b) {
					ab.prototype.constructor.call(this, b), this.coordMap = a
				},
				listenStart: function(a) {
					var b, c, d, e = this.subjectEl;
					ab.prototype.listenStart.apply(this, arguments), this.computeCoords(), a ? (c = {
						left: a.pageX,
						top: a.pageY
					}, d = c, e && (b = o(e), d = x(d, b)), this.origCell = this.getCell(d.left, d.top), e && this.options.subjectCenter && (this.origCell && (b = w(this.origCell, b) || b), d = y(b)), this.coordAdjust = z(d, c)) : (this.origCell = null, this.coordAdjust = null)
				},
				computeCoords: function() {
					this.coordMap.build(), this.computeScrollBounds()
				},
				dragStart: function(a) {
					var b;
					ab.prototype.dragStart.apply(this, arguments), (b = this.getCell(a.pageX, a.pageY)) && this.cellOver(b)
				},
				drag: function(a, b, c) {
					var d;
					ab.prototype.drag.apply(this, arguments), d = this.getCell(c.pageX, c.pageY), ka(d, this.cell) || (this.cell && this.cellOut(), d && this.cellOver(d))
				},
				dragStop: function() {
					this.cellDone(), ab.prototype.dragStop.apply(this, arguments)
				},
				cellOver: function(a) {
					this.cell = a, this.trigger("cellOver", a, ka(a, this.origCell), this.origCell)
				},
				cellOut: function() {
					this.cell && (this.trigger("cellOut", this.cell), this.cellDone(), this.cell = null)
				},
				cellDone: function() {
					this.cell && this.trigger("cellDone", this.cell)
				},
				listenStop: function() {
					ab.prototype.listenStop.apply(this, arguments), this.origCell = this.cell = null, this.coordMap.clear()
				},
				scrollStop: function() {
					ab.prototype.scrollStop.apply(this, arguments), this.computeCoords()
				},
				getCell: function(a, b) {
					return this.coordAdjust && (a += this.coordAdjust.left, b += this.coordAdjust.top), this.coordMap.getCell(a, b)
				}
			}),
			cb = ja.extend({
				options: null,
				sourceEl: null,
				el: null,
				parentEl: null,
				top0: null,
				left0: null,
				mouseY0: null,
				mouseX0: null,
				topDelta: null,
				leftDelta: null,
				mousemoveProxy: null,
				isFollowing: !1,
				isHidden: !1,
				isAnimating: !1,
				constructor: function(b, c) {
					this.options = c = c || {}, this.sourceEl = b, this.parentEl = c.parentEl ? a(c.parentEl) : b.parent()
				},
				start: function(b) {
					this.isFollowing || (this.isFollowing = !0, this.mouseY0 = b.pageY, this.mouseX0 = b.pageX, this.topDelta = 0, this.leftDelta = 0, this.isHidden || this.updatePosition(), a(document).on("mousemove", this.mousemoveProxy = W(this, "mousemove")))
				},
				stop: function(b, c) {
					function d() {
						this.isAnimating = !1, e.destroyEl(), this.top0 = this.left0 = null, c && c()
					}
					var e = this,
						f = this.options.revertDuration;
					this.isFollowing && !this.isAnimating && (this.isFollowing = !1, a(document).off("mousemove", this.mousemoveProxy), b && f && !this.isHidden ? (this.isAnimating = !0, this.el.animate({
						top: this.top0,
						left: this.left0
					}, {
						duration: f,
						complete: d
					})) : d())
				},
				getEl: function() {
					var a = this.el;
					return a || (this.sourceEl.width(), a = this.el = this.sourceEl.clone().css({
						position: "absolute",
						visibility: "",
						display: this.isHidden ? "none" : "",
						margin: 0,
						right: "auto",
						bottom: "auto",
						width: this.sourceEl.width(),
						height: this.sourceEl.height(),
						opacity: this.options.opacity || "",
						zIndex: this.options.zIndex
					}).appendTo(this.parentEl)), a
				},
				destroyEl: function() {
					this.el && (this.el.remove(), this.el = null)
				},
				updatePosition: function() {
					var a, b;
					this.getEl(), null === this.top0 && (this.sourceEl.width(), a = this.sourceEl.offset(), b = this.el.offsetParent().offset(), this.top0 = a.top - b.top, this.left0 = a.left - b.left), this.el.css({
						top: this.top0 + this.topDelta,
						left: this.left0 + this.leftDelta
					})
				},
				mousemove: function(a) {
					this.topDelta = a.pageY - this.mouseY0, this.leftDelta = a.pageX - this.mouseX0, this.isHidden || this.updatePosition()
				},
				hide: function() {
					this.isHidden || (this.isHidden = !0, this.el && this.el.hide())
				},
				show: function() {
					this.isHidden && (this.isHidden = !1, this.updatePosition(), this.getEl().show())
				}
			}),
			db = ja.extend({
				view: null,
				isRTL: null,
				cellHtml: "<td/>",
				constructor: function(a) {
					this.view = a, this.isRTL = a.opt("isRTL")
				},
				rowHtml: function(a, b) {
					var c, d, e = this.getHtmlRenderer("cell", a),
						f = "";
					for(b = b || 0, c = 0; this.colCnt > c; c++) d = this.getCell(b, c), f += e(d);
					return "<tr>" + (f = this.bookendCells(f, a, b)) + "</tr>"
				},
				bookendCells: function(a, b, c) {
					var d = this.getHtmlRenderer("intro", b)(c || 0),
						e = this.getHtmlRenderer("outro", b)(c || 0),
						f = this.isRTL ? e : d,
						g = this.isRTL ? d : e;
					return "string" == typeof a ? f + a + g : a.prepend(f).append(g)
				},
				getHtmlRenderer: function(a, b) {
					var c, d, e, f, g = this.view;
					return c = a + "Html", b && (d = b + T(a) + "Html"), d && (f = g[d]) ? e = g : d && (f = this[d]) ? e = this : (f = g[c]) ? e = g : (f = this[c]) && (e = this), "function" == typeof f ? function() {
						return f.apply(e, arguments) || ""
					} : function() {
						return f || ""
					}
				}
			}),
			eb = Ia.Grid = db.extend({
				start: null,
				end: null,
				rowCnt: 0,
				colCnt: 0,
				rowData: null,
				colData: null,
				el: null,
				coordMap: null,
				elsByFill: null,
				externalDragStartProxy: null,
				colHeadFormat: null,
				eventTimeFormat: null,
				displayEventTime: null,
				displayEventEnd: null,
				cellDuration: null,
				largeUnit: null,
				constructor: function() {
					db.apply(this, arguments), this.coordMap = new $a(this), this.elsByFill = {}, this.externalDragStartProxy = W(this, "externalDragStart")
				},
				computeColHeadFormat: function() {},
				computeEventTimeFormat: function() {
					return this.view.opt("smallTimeFormat")
				},
				computeDisplayEventTime: function() {
					return !0
				},
				computeDisplayEventEnd: function() {
					return !0
				},
				setRange: function(a) {
					var b, c, d = this.view;
					this.start = a.start.clone(), this.end = a.end.clone(), this.rowData = [], this.colData = [], this.updateCells(), this.colHeadFormat = d.opt("columnFormat") || this.computeColHeadFormat(), this.eventTimeFormat = d.opt("eventTimeFormat") || d.opt("timeFormat") || this.computeEventTimeFormat(), b = d.opt("displayEventTime"), null == b && (b = this.computeDisplayEventTime()), c = d.opt("displayEventEnd"), null == c && (c = this.computeDisplayEventEnd()), this.displayEventTime = b, this.displayEventEnd = c
				},
				updateCells: function() {},
				rangeToSegs: function() {},
				diffDates: function(a, b) {
					return this.largeUnit ? D(a, b, this.largeUnit) : B(a, b)
				},
				getCell: function(b, c) {
					var d;
					return null == c && ("number" == typeof b ? (c = b % this.colCnt, b = Math.floor(b / this.colCnt)) : (c = b.col, b = b.row)), d = {
						row: b,
						col: c
					}, a.extend(d, this.getRowData(b), this.getColData(c)), a.extend(d, this.computeCellRange(d)), d
				},
				computeCellRange: function(a) {
					var b = this.computeCellDate(a);
					return {
						start: b,
						end: b.clone().add(this.cellDuration)
					}
				},
				computeCellDate: function() {},
				getRowData: function(a) {
					return this.rowData[a] || {}
				},
				getColData: function(a) {
					return this.colData[a] || {}
				},
				getRowEl: function() {},
				getColEl: function() {},
				getCellDayEl: function(a) {
					return this.getColEl(a.col) || this.getRowEl(a.row)
				},
				computeRowCoords: function() {
					var a, b, c, d = [];
					for(a = 0; this.rowCnt > a; a++) b = this.getRowEl(a), c = b.offset().top, d.push({
						top: c,
						bottom: c + b.outerHeight()
					});
					return d
				},
				computeColCoords: function() {
					var a, b, c, d = [];
					for(a = 0; this.colCnt > a; a++) b = this.getColEl(a), c = b.offset().left, d.push({
						left: c,
						right: c + b.outerWidth()
					});
					return d
				},
				setElement: function(b) {
					var c = this;
					this.el = b, b.on("mousedown", function(b) {
						a(b.target).is(".fc-event-container *, .fc-more") || a(b.target).closest(".fc-popover").length || c.dayMousedown(b)
					}), this.bindSegHandlers(), this.bindGlobalHandlers()
				},
				removeElement: function() {
					this.unbindGlobalHandlers(), this.el.remove()
				},
				renderSkeleton: function() {},
				renderDates: function() {},
				destroyDates: function() {},
				bindGlobalHandlers: function() {
					a(document).on("dragstart sortstart", this.externalDragStartProxy)
				},
				unbindGlobalHandlers: function() {
					a(document).off("dragstart sortstart", this.externalDragStartProxy)
				},
				dayMousedown: function(a) {
					var b, c, d = this,
						e = this.view,
						f = e.opt("selectable");
					new bb(this.coordMap, {
						scroll: e.opt("dragScroll"),
						dragStart: function() {
							e.unselect()
						},
						cellOver: function(a, e, h) {
							h && (b = e ? a : null, f && (c = d.computeSelection(h, a), c ? d.renderSelection(c) : g()))
						},
						cellOut: function() {
							b = null, c = null, d.destroySelection(), h()
						},
						listenStop: function(a) {
							b && e.trigger("dayClick", d.getCellDayEl(b), b.start, a), c && e.reportSelection(c, a), h()
						}
					}).mousedown(a)
				},
				renderRangeHelper: function(a, b) {
					var c = this.fabricateHelperEvent(a, b);
					this.renderHelper(c, b)
				},
				fabricateHelperEvent: function(a, b) {
					var c = b ? J(b.event) : {};
					return c.start = a.start.clone(), c.end = a.end ? a.end.clone() : null, c.allDay = null, this.view.calendar.normalizeEventRange(c), c.className = (c.className || []).concat("fc-helper"), b || (c.editable = !1), c
				},
				renderHelper: function() {},
				destroyHelper: function() {},
				renderSelection: function(a) {
					this.renderHighlight(a)
				},
				destroySelection: function() {
					this.destroyHighlight()
				},
				computeSelection: function(a, b) {
					var c, d = [a.start, a.end, b.start, b.end];
					return d.sort(U), c = {
						start: d[0].clone(),
						end: d[3].clone()
					}, this.view.calendar.isSelectionRangeAllowed(c) ? c : null
				},
				renderHighlight: function(a) {
					this.renderFill("highlight", this.rangeToSegs(a))
				},
				destroyHighlight: function() {
					this.destroyFill("highlight")
				},
				highlightSegClasses: function() {
					return ["fc-highlight"]
				},
				renderFill: function() {},
				destroyFill: function(a) {
					var b = this.elsByFill[a];
					b && (b.remove(), delete this.elsByFill[a])
				},
				renderFillSegEls: function(b, c) {
					var d, e = this,
						f = this[b + "SegEl"],
						g = "",
						h = [];
					if(c.length) {
						for(d = 0; c.length > d; d++) g += this.fillSegHtml(b, c[d]);
						a(g).each(function(b, d) {
							var g = c[b],
								i = a(d);
							f && (i = f.call(e, g, i)), i && (i = a(i), i.is(e.fillSegTag) && (g.el = i, h.push(g)))
						})
					}
					return h
				},
				fillSegTag: "div",
				fillSegHtml: function(a, b) {
					var c = this[a + "SegClasses"],
						d = this[a + "SegCss"],
						e = c ? c.call(this, b) : [],
						f = S(d ? d.call(this, b) : {});
					return "<" + this.fillSegTag + (e.length ? ' class="' + e.join(" ") + '"' : "") + (f ? ' style="' + f + '"' : "") + " />"
				},
				headHtml: function() {
					return '<div class="fc-row ' + this.view.widgetHeaderClass + '"><table><thead>' + this.rowHtml("head") + "</thead></table></div>"
				},
				headCellHtml: function(a) {
					var b = this.view,
						c = a.start;
					return '<th class="fc-day-header ' + b.widgetHeaderClass + " fc-" + Pa[c.day()] + '">' + Q(c.format(this.colHeadFormat)) + "</th>"
				},
				bgCellHtml: function(a) {
					var b = this.view,
						c = a.start,
						d = this.getDayClasses(c);
					return d.unshift("fc-day", b.widgetContentClass), '<td class="' + d.join(" ") + '" data-date="' + c.format("YYYY-MM-DD") + '"></td>'
				},
				getDayClasses: function(a) {
					var b = this.view,
						c = b.calendar.getNow().stripTime(),
						d = ["fc-" + Pa[a.day()]];
					return 1 == b.intervalDuration.as("months") && a.month() != b.intervalStart.month() && d.push("fc-other-month"), a.isSame(c, "day") ? d.push("fc-today", b.highlightStateClass) : c > a ? d.push("fc-past") : d.push("fc-future"), d
				}
			});
		eb.mixin({
			mousedOverSeg: null,
			isDraggingSeg: !1,
			isResizingSeg: !1,
			isDraggingExternal: !1,
			segs: null,
			renderEvents: function(a) {
				var b, c, d = this.eventsToSegs(a),
					e = [],
					f = [];
				for(b = 0; d.length > b; b++) c = d[b], la(c.event) ? e.push(c) : f.push(c);
				e = this.renderBgSegs(e) || e, f = this.renderFgSegs(f) || f, this.segs = e.concat(f)
			},
			destroyEvents: function() {
				this.triggerSegMouseout(), this.destroyFgSegs(), this.destroyBgSegs(), this.segs = null
			},
			getEventSegs: function() {
				return this.segs || []
			},
			renderFgSegs: function() {},
			destroyFgSegs: function() {},
			renderFgSegEls: function(b, c) {
				var d, e = this.view,
					f = "",
					g = [];
				if(b.length) {
					for(d = 0; b.length > d; d++) f += this.fgSegHtml(b[d], c);
					a(f).each(function(c, d) {
						var f = b[c],
							h = e.resolveEventEl(f.event, a(d));
						h && (h.data("fc-seg", f), f.el = h, g.push(f))
					})
				}
				return g
			},
			fgSegHtml: function() {},
			renderBgSegs: function(a) {
				return this.renderFill("bgEvent", a)
			},
			destroyBgSegs: function() {
				this.destroyFill("bgEvent")
			},
			bgEventSegEl: function(a, b) {
				return this.view.resolveEventEl(a.event, b)
			},
			bgEventSegClasses: function(a) {
				var b = a.event,
					c = b.source || {};
				return ["fc-bgevent"].concat(b.className, c.className || [])
			},
			bgEventSegCss: function(a) {
				var b = this.view,
					c = a.event,
					d = c.source || {};
				return {
					"background-color": c.backgroundColor || c.color || d.backgroundColor || d.color || b.opt("eventBackgroundColor") || b.opt("eventColor")
				}
			},
			businessHoursSegClasses: function() {
				return ["fc-nonbusiness", "fc-bgevent"]
			},
			bindSegHandlers: function() {
				var b = this,
					c = this.view;
				a.each({
					mouseenter: function(a, c) {
						b.triggerSegMouseover(a, c)
					},
					mouseleave: function(a, c) {
						b.triggerSegMouseout(a, c)
					},
					click: function(a, b) {
						return c.trigger("eventClick", this, a.event, b)
					},
					mousedown: function(d, e) {
						a(e.target).is(".fc-resizer") && c.isEventResizable(d.event) ? b.segResizeMousedown(d, e, a(e.target).is(".fc-start-resizer")) : c.isEventDraggable(d.event) && b.segDragMousedown(d, e)
					}
				}, function(c, d) {
					b.el.on(c, ".fc-event-container > *", function(c) {
						var e = a(this).data("fc-seg");
						return !e || b.isDraggingSeg || b.isResizingSeg ? void 0 : d.call(this, e, c)
					})
				})
			},
			triggerSegMouseover: function(a, b) {
				this.mousedOverSeg || (this.mousedOverSeg = a, this.view.trigger("eventMouseover", a.el[0], a.event, b))
			},
			triggerSegMouseout: function(a, b) {
				b = b || {}, this.mousedOverSeg && (a = a || this.mousedOverSeg, this.mousedOverSeg = null, this.view.trigger("eventMouseout", a.el[0], a.event, b))
			},
			segDragMousedown: function(a, b) {
				var c, d = this,
					e = this.view,
					f = e.calendar,
					i = a.el,
					j = a.event,
					k = new cb(a.el, {
						parentEl: e.el,
						opacity: e.opt("dragOpacity"),
						revertDuration: e.opt("dragRevertDuration"),
						zIndex: 2
					});
				new bb(e.coordMap, {
					distance: 5,
					scroll: e.opt("dragScroll"),
					subjectEl: i,
					subjectCenter: !0,
					listenStart: function(a) {
						k.hide(), k.start(a)
					},
					dragStart: function(b) {
						d.triggerSegMouseout(a, b), d.segDragStart(a, b), e.hideEvent(j)
					},
					cellOver: function(b, h, i) {
						a.cell && (i = a.cell), c = d.computeEventDrop(i, b, j), c && !f.isEventRangeAllowed(c, j) && (g(), c = null), c && e.renderDrag(c, a) ? k.hide() : k.show(), h && (c = null)
					},
					cellOut: function() {
						e.destroyDrag(), k.show(), c = null
					},
					cellDone: function() {
						h()
					},
					dragStop: function(b) {
						k.stop(!c, function() {
							e.destroyDrag(), e.showEvent(j), d.segDragStop(a, b), c && e.reportEventDrop(j, c, this.largeUnit, i, b)
						})
					},
					listenStop: function() {
						k.stop()
					}
				}).mousedown(b)
			},
			segDragStart: function(a, b) {
				this.isDraggingSeg = !0, this.view.trigger("eventDragStart", a.el[0], a.event, b, {})
			},
			segDragStop: function(a, b) {
				this.isDraggingSeg = !1, this.view.trigger("eventDragStop", a.el[0], a.event, b, {})
			},
			computeEventDrop: function(a, b, c) {
				var d, e, f = this.view.calendar,
					g = a.start,
					h = b.start;
				return g.hasTime() === h.hasTime() ? (d = this.diffDates(h, g), c.allDay && G(d) ? (e = {
					start: c.start.clone(),
					end: f.getEventEnd(c),
					allDay: !1
				}, f.normalizeEventRangeTimes(e)) : e = {
					start: c.start.clone(),
					end: c.end ? c.end.clone() : null,
					allDay: c.allDay
				}, e.start.add(d), e.end && e.end.add(d)) : e = {
					start: h.clone(),
					end: null,
					allDay: !h.hasTime()
				}, e
			},
			applyDragOpacity: function(a) {
				var b = this.view.opt("dragOpacity");
				null != b && a.each(function(a, c) {
					c.style.opacity = b
				})
			},
			externalDragStart: function(b, c) {
				var d, e, f = this.view;
				f.opt("droppable") && (d = a((c ? c.item : null) || b.target), e = f.opt("dropAccept"), (a.isFunction(e) ? e.call(d[0], d) : d.is(e)) && (this.isDraggingExternal || this.listenToExternalDrag(d, b, c)))
			},
			listenToExternalDrag: function(a, b, c) {
				var d, e, f = this,
					i = ra(a);
				d = new bb(this.coordMap, {
					listenStart: function() {
						f.isDraggingExternal = !0
					},
					cellOver: function(a) {
						e = f.computeExternalDrop(a, i), e ? f.renderDrag(e) : g()
					},
					cellOut: function() {
						e = null, f.destroyDrag(), h()
					},
					dragStop: function() {
						f.destroyDrag(), h(), e && f.view.reportExternalDrop(i, e, a, b, c)
					},
					listenStop: function() {
						f.isDraggingExternal = !1
					}
				}), d.startDrag(b)
			},
			computeExternalDrop: function(a, b) {
				var c = {
					start: a.start.clone(),
					end: null
				};
				return b.startTime && !c.start.hasTime() && c.start.time(b.startTime), b.duration && (c.end = c.start.clone().add(b.duration)), this.view.calendar.isExternalDropRangeAllowed(c, b.eventProps) ? c : null
			},
			renderDrag: function() {},
			destroyDrag: function() {},
			segResizeMousedown: function(a, b, c) {
				var d, e, f = this,
					i = this.view,
					j = i.calendar,
					k = a.el,
					l = a.event,
					m = j.getEventEnd(l);
				d = new bb(this.coordMap, {
					distance: 5,
					scroll: i.opt("dragScroll"),
					subjectEl: k,
					dragStart: function(b) {
						f.triggerSegMouseout(a, b), f.segResizeStart(a, b)
					},
					cellOver: function(b, d, h) {
						e = c ? f.computeEventStartResize(h, b, l) : f.computeEventEndResize(h, b, l), e && (j.isEventRangeAllowed(e, l) ? e.start.isSame(l.start) && e.end.isSame(m) && (e = null) : (g(), e = null)), e && (i.hideEvent(l), f.renderEventResize(e, a))
					},
					cellOut: function() {
						e = null
					},
					cellDone: function() {
						f.destroyEventResize(), i.showEvent(l), h()
					},
					dragStop: function(b) {
						f.segResizeStop(a, b), e && i.reportEventResize(l, e, this.largeUnit, k, b)
					}
				}), d.mousedown(b)
			},
			segResizeStart: function(a, b) {
				this.isResizingSeg = !0, this.view.trigger("eventResizeStart", a.el[0], a.event, b, {})
			},
			segResizeStop: function(a, b) {
				this.isResizingSeg = !1, this.view.trigger("eventResizeStop", a.el[0], a.event, b, {})
			},
			computeEventStartResize: function(a, b, c) {
				return this.computeEventResize("start", a, b, c)
			},
			computeEventEndResize: function(a, b, c) {
				return this.computeEventResize("end", a, b, c)
			},
			computeEventResize: function(a, b, c, d) {
				var e, f, g = this.view.calendar,
					h = this.diffDates(c[a], b[a]);
				return e = {
					start: d.start.clone(),
					end: g.getEventEnd(d),
					allDay: d.allDay
				}, e.allDay && G(h) && (e.allDay = !1, g.normalizeEventRangeTimes(e)), e[a].add(h), e.start.isBefore(e.end) || (f = d.allDay ? g.defaultAllDayEventDuration : g.defaultTimedEventDuration, this.cellDuration && f > this.cellDuration && (f = this.cellDuration), "start" == a ? e.start = e.end.clone().subtract(f) : e.end = e.start.clone().add(f)), e
			},
			renderEventResize: function() {},
			destroyEventResize: function() {},
			getEventTimeText: function(a, b, c) {
				return null == b && (b = this.eventTimeFormat), null == c && (c = this.displayEventEnd), this.displayEventTime && a.start.hasTime() ? c && a.end ? this.view.formatRange(a, b) : a.start.format(b) : ""
			},
			getSegClasses: function(a, b, c) {
				var d = a.event,
					e = ["fc-event", a.isStart ? "fc-start" : "fc-not-start", a.isEnd ? "fc-end" : "fc-not-end"].concat(d.className, d.source ? d.source.className : []);
				return b && e.push("fc-draggable"), c && e.push("fc-resizable"), e
			},
			getEventSkinCss: function(a) {
				var b = this.view,
					c = a.source || {},
					d = a.color,
					e = c.color,
					f = b.opt("eventColor");
				return {
					"background-color": a.backgroundColor || d || c.backgroundColor || e || b.opt("eventBackgroundColor") || f,
					"border-color": a.borderColor || d || c.borderColor || e || b.opt("eventBorderColor") || f,
					color: a.textColor || c.textColor || b.opt("eventTextColor")
				}
			},
			eventsToSegs: function(a, b) {
				var c, d = this.eventsToRanges(a),
					e = [];
				for(c = 0; d.length > c; c++) e.push.apply(e, this.eventRangeToSegs(d[c], b));
				return e
			},
			eventsToRanges: function(b) {
				var c = this,
					d = oa(b),
					e = [];
				return a.each(d, function(a, b) {
					b.length && e.push.apply(e, ma(b[0]) ? c.eventsToInverseRanges(b) : c.eventsToNormalRanges(b))
				}), e
			},
			eventsToNormalRanges: function(a) {
				var b, c, d, e, f = this.view.calendar,
					g = [];
				for(b = 0; a.length > b; b++) c = a[b], d = c.start.clone().stripZone(), e = f.getEventEnd(c).stripZone(), g.push({
					event: c,
					start: d,
					end: e,
					eventStartMS: +d,
					eventDurationMS: e - d
				});
				return g
			},
			eventsToInverseRanges: function(a) {
				var b, c, d = this.view,
					e = d.start.clone().stripZone(),
					f = d.end.clone().stripZone(),
					g = this.eventsToNormalRanges(a),
					h = [],
					i = a[0],
					j = e;
				for(g.sort(pa), b = 0; g.length > b; b++) c = g[b], c.start > j && h.push({
					event: i,
					start: j,
					end: c.start
				}), j = c.end;
				return f > j && h.push({
					event: i,
					start: j,
					end: f
				}), h
			},
			eventRangeToSegs: function(a, b) {
				var c, d, e;
				for(c = b ? b(a) : this.rangeToSegs(a), d = 0; c.length > d; d++) e = c[d], e.event = a.event, e.eventStartMS = a.eventStartMS, e.eventDurationMS = a.eventDurationMS;
				return c
			}
		}), Ia.compareSegs = qa, Ia.dataAttrPrefix = "";
		var fb = eb.extend({
			numbersVisible: !1,
			bottomCoordPadding: 0,
			breakOnWeeks: null,
			cellDates: null,
			dayToCellOffsets: null,
			rowEls: null,
			dayEls: null,
			helperEls: null,
			constructor: function() {
				eb.apply(this, arguments), this.cellDuration = b.duration(1, "day")
			},
			renderDates: function(a) {
				var b, c, d, e = this.view,
					f = this.rowCnt,
					g = this.colCnt,
					h = f * g,
					i = "";
				for(b = 0; f > b; b++) i += this.dayRowHtml(b, a);
				for(this.el.html(i), this.rowEls = this.el.find(".fc-row"), this.dayEls = this.el.find(".fc-day"), c = 0; h > c; c++) d = this.getCell(c), e.trigger("dayRender", null, d.start, this.dayEls.eq(c))
			},
			destroyDates: function() {
				this.destroySegPopover()
			},
			renderBusinessHours: function() {
				var a = this.view.calendar.getBusinessHoursEvents(!0),
					b = this.eventsToSegs(a);
				this.renderFill("businessHours", b, "bgevent")
			},
			dayRowHtml: function(a, b) {
				var c = this.view,
					d = ["fc-row", "fc-week", c.widgetContentClass];
				return b && d.push("fc-rigid"), '<div class="' + d.join(" ") + '"><div class="fc-bg"><table>' + this.rowHtml("day", a) + '</table></div><div class="fc-content-skeleton"><table>' + (this.numbersVisible ? "<thead>" + this.rowHtml("number", a) + "</thead>" : "") + "</table></div></div>"
			},
			dayCellHtml: function(a) {
				return this.bgCellHtml(a)
			},
			computeColHeadFormat: function() {
				return this.rowCnt > 1 ? "ddd" : this.colCnt > 1 ? this.view.opt("dayOfMonthFormat") : "dddd"
			},
			computeEventTimeFormat: function() {
				return this.view.opt("extraSmallTimeFormat")
			},
			computeDisplayEventEnd: function() {
				return 1 == this.colCnt
			},
			updateCells: function() {
				var a, b, c, d;
				if(this.updateCellDates(), a = this.cellDates, this.breakOnWeeks) {
					for(b = a[0].day(), d = 1; a.length > d && a[d].day() != b; d++);
					c = Math.ceil(a.length / d)
				} else c = 1, d = a.length;
				this.rowCnt = c, this.colCnt = d
			},
			updateCellDates: function() {
				for(var a = this.view, b = this.start.clone(), c = [], d = -1, e = []; b.isBefore(this.end);) a.isHiddenDay(b) ? e.push(d + .5) : (d++, e.push(d), c.push(b.clone())), b.add(1, "days");
				this.cellDates = c, this.dayToCellOffsets = e
			},
			computeCellDate: function(a) {
				var b = this.colCnt,
					c = a.row * b + (this.isRTL ? b - a.col - 1 : a.col);
				return this.cellDates[c].clone()
			},
			getRowEl: function(a) {
				return this.rowEls.eq(a)
			},
			getColEl: function(a) {
				return this.dayEls.eq(a)
			},
			getCellDayEl: function(a) {
				return this.dayEls.eq(a.row * this.colCnt + a.col)
			},
			computeRowCoords: function() {
				var a = eb.prototype.computeRowCoords.call(this);
				return a[a.length - 1].bottom += this.bottomCoordPadding, a
			},
			rangeToSegs: function(a) {
				var b, c, d, e, f, g, h, i, j, k, l = this.isRTL,
					m = this.rowCnt,
					n = this.colCnt,
					o = [];
				for(a = this.view.computeDayRange(a), b = this.dateToCellOffset(a.start), c = this.dateToCellOffset(a.end.subtract(1, "days")), d = 0; m > d; d++) e = d * n, f = e + n - 1, i = Math.max(e, b), j = Math.min(f, c), i = Math.ceil(i), (j = Math.floor(j)) >= i && (g = i === b, h = j === c, i -= e, j -= e, k = {
					row: d,
					isStart: g,
					isEnd: h
				}, l ? (k.leftCol = n - j - 1, k.rightCol = n - i - 1) : (k.leftCol = i, k.rightCol = j), o.push(k));
				return o
			},
			dateToCellOffset: function(a) {
				var b = this.dayToCellOffsets,
					c = a.diff(this.start, "days");
				return 0 > c ? b[0] - 1 : c >= b.length ? b[b.length - 1] + 1 : b[c]
			},
			renderDrag: function(a, b) {
				return this.renderHighlight(this.view.calendar.ensureVisibleEventRange(a)), b && !b.el.closest(this.el).length ? (this.renderRangeHelper(a, b), this.applyDragOpacity(this.helperEls), !0) : void 0
			},
			destroyDrag: function() {
				this.destroyHighlight(), this.destroyHelper()
			},
			renderEventResize: function(a, b) {
				this.renderHighlight(a), this.renderRangeHelper(a, b)
			},
			destroyEventResize: function() {
				this.destroyHighlight(), this.destroyHelper()
			},
			renderHelper: function(b, c) {
				var d, e = [],
					f = this.eventsToSegs([b]);
				f = this.renderFgSegEls(f), d = this.renderSegRows(f), this.rowEls.each(function(b, f) {
					var g, h = a(f),
						i = a('<div class="fc-helper-skeleton"><table/></div>');
					g = c && c.row === b ? c.el.position().top : h.find(".fc-content-skeleton tbody").position().top, i.css("top", g).find("table").append(d[b].tbodyEl), h.append(i), e.push(i[0])
				}), this.helperEls = a(e)
			},
			destroyHelper: function() {
				this.helperEls && (this.helperEls.remove(), this.helperEls = null)
			},
			fillSegTag: "td",
			renderFill: function(b, c, d) {
				var e, f, g, h = [];
				for(c = this.renderFillSegEls(b, c), e = 0; c.length > e; e++) f = c[e], g = this.renderFillRow(b, f, d), this.rowEls.eq(f.row).append(g), h.push(g[0]);
				return this.elsByFill[b] = a(h), c
			},
			renderFillRow: function(b, c, d) {
				var e, f, g = this.colCnt,
					h = c.leftCol,
					i = c.rightCol + 1;
				return d = d || b.toLowerCase(), e = a('<div class="fc-' + d + '-skeleton"><table><tr/></table></div>'), f = e.find("tr"), h > 0 && f.append('<td colspan="' + h + '"/>'), f.append(c.el.attr("colspan", i - h)), g > i && f.append('<td colspan="' + (g - i) + '"/>'), this.bookendCells(f, b), e
			}
		});
		fb.mixin({
			rowStructs: null,
			destroyEvents: function() {
				this.destroySegPopover(), eb.prototype.destroyEvents.apply(this, arguments)
			},
			getEventSegs: function() {
				return eb.prototype.getEventSegs.call(this).concat(this.popoverSegs || [])
			},
			renderBgSegs: function(b) {
				var c = a.grep(b, function(a) {
					return a.event.allDay
				});
				return eb.prototype.renderBgSegs.call(this, c)
			},
			renderFgSegs: function(b) {
				var c;
				return b = this.renderFgSegEls(b), c = this.rowStructs = this.renderSegRows(b), this.rowEls.each(function(b, d) {
					a(d).find(".fc-content-skeleton > table").append(c[b].tbodyEl)
				}), b
			},
			destroyFgSegs: function() {
				for(var a, b = this.rowStructs || []; a = b.pop();) a.tbodyEl.remove();
				this.rowStructs = null
			},
			renderSegRows: function(a) {
				var b, c, d = [];
				for(b = this.groupSegRows(a), c = 0; b.length > c; c++) d.push(this.renderSegRow(c, b[c]));
				return d
			},
			fgSegHtml: function(a, b) {
				var c, d, e = this.view,
					f = a.event,
					g = e.isEventDraggable(f),
					h = !b && f.allDay && a.isStart && e.isEventResizableFromStart(f),
					i = !b && f.allDay && a.isEnd && e.isEventResizableFromEnd(f),
					j = this.getSegClasses(a, g, h || i),
					k = S(this.getEventSkinCss(f)),
					l = "";
				return j.unshift("fc-day-grid-event", "fc-h-event"), a.isStart && (c = this.getEventTimeText(f)) && (l = '<span class="fc-time">' + Q(c) + "</span>"), d = '<span class="fc-title">' + (Q(f.title || "") || "&nbsp;") + "</span>", '<a class="' + j.join(" ") + '"' + (f.url ? ' href="' + Q(f.url) + '"' : "") + (k ? ' style="' + k + '"' : "") + '><div class="fc-content">' + (this.isRTL ? d + " " + l : l + " " + d) + "</div>" + (h ? '<div class="fc-resizer fc-start-resizer" />' : "") + (i ? '<div class="fc-resizer fc-end-resizer" />' : "") + "</a>"
			},
			renderSegRow: function(b, c) {
				function d(b) {
					for(; b > g;) k = (r[e - 1] || [])[g], k ? k.attr("rowspan", parseInt(k.attr("rowspan") || 1, 10) + 1) : (k = a("<td/>"), h.append(k)), q[e][g] = k, r[e][g] = k, g++
				}
				var e, f, g, h, i, j, k, l = this.colCnt,
					m = this.buildSegLevels(c),
					n = Math.max(1, m.length),
					o = a("<tbody/>"),
					p = [],
					q = [],
					r = [];
				for(e = 0; n > e; e++) {
					if(f = m[e], g = 0, h = a("<tr/>"), p.push([]), q.push([]), r.push([]), f)
						for(i = 0; f.length > i; i++) {
							for(j = f[i], d(j.leftCol), k = a('<td class="fc-event-container"/>').append(j.el), j.leftCol != j.rightCol ? k.attr("colspan", j.rightCol - j.leftCol + 1) : r[e][g] = k; j.rightCol >= g;) q[e][g] = k, p[e][g] = j, g++;
							h.append(k)
						}
					d(l), this.bookendCells(h, "eventSkeleton"), o.append(h)
				}
				return {
					row: b,
					tbodyEl: o,
					cellMatrix: q,
					segMatrix: p,
					segLevels: m,
					segs: c
				}
			},
			buildSegLevels: function(a) {
				var b, c, d, e = [];
				for(a.sort(qa), b = 0; a.length > b; b++) {
					for(c = a[b], d = 0; e.length > d && sa(c, e[d]); d++);
					c.level = d, (e[d] || (e[d] = [])).push(c)
				}
				for(d = 0; e.length > d; d++) e[d].sort(ta);
				return e
			},
			groupSegRows: function(a) {
				var b, c = [];
				for(b = 0; this.rowCnt > b; b++) c.push([]);
				for(b = 0; a.length > b; b++) c[a[b].row].push(a[b]);
				return c
			}
		}), fb.mixin({
			segPopover: null,
			popoverSegs: null,
			destroySegPopover: function() {
				this.segPopover && this.segPopover.hide()
			},
			limitRows: function(a) {
				var b, c, d = this.rowStructs || [];
				for(b = 0; d.length > b; b++) this.unlimitRow(b), !1 !== (c = !!a && ("number" == typeof a ? a : this.computeRowLevelLimit(b))) && this.limitRow(b, c)
			},
			computeRowLevelLimit: function(b) {
				function c(b, c) {
					f = Math.max(f, a(c).outerHeight())
				}
				var d, e, f, g = this.rowEls.eq(b),
					h = g.height(),
					i = this.rowStructs[b].tbodyEl.children();
				for(d = 0; i.length > d; d++)
					if(e = i.eq(d).removeClass("fc-limited"), f = 0, e.find("> td > :first-child").each(c), e.position().top + f > h) return d;
				return !1
			},
			limitRow: function(b, c) {
				function d(d) {
					for(; d > x;) e = u.getCell(b, x), k = u.getCellSegs(e, c), k.length && (n = g[c - 1][x], t = u.renderMoreLink(e, k), s = a("<div/>").append(t), n.append(s), w.push(s[0])), x++
				}
				var e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = this,
					v = this.rowStructs[b],
					w = [],
					x = 0;
				if(c && v.segLevels.length > c) {
					for(f = v.segLevels[c - 1], g = v.cellMatrix, h = v.tbodyEl.children().slice(c).addClass("fc-limited").get(), i = 0; f.length > i; i++) {
						for(j = f[i], d(j.leftCol), m = [], l = 0; j.rightCol >= x;) e = this.getCell(b, x), k = this.getCellSegs(e, c), m.push(k), l += k.length, x++;
						if(l) {
							for(n = g[c - 1][j.leftCol], o = n.attr("rowspan") || 1, p = [], q = 0; m.length > q; q++) r = a('<td class="fc-more-cell"/>').attr("rowspan", o), k = m[q], e = this.getCell(b, j.leftCol + q), t = this.renderMoreLink(e, [j].concat(k)), s = a("<div/>").append(t), r.append(s), p.push(r[0]), w.push(r[0]);
							n.addClass("fc-limited").after(a(p)), h.push(n[0])
						}
					}
					d(this.colCnt), v.moreEls = a(w), v.limitedEls = a(h)
				}
			},
			unlimitRow: function(a) {
				var b = this.rowStructs[a];
				b.moreEls && (b.moreEls.remove(), b.moreEls = null), b.limitedEls && (b.limitedEls.removeClass("fc-limited"), b.limitedEls = null)
			},
			renderMoreLink: function(b, c) {
				var d = this,
					e = this.view;
				return a('<a class="fc-more"/>').text(this.getMoreLinkText(c.length)).on("click", function(f) {
					var g = e.opt("eventLimitClick"),
						h = b.start,
						i = a(this),
						j = d.getCellDayEl(b),
						k = d.getCellSegs(b),
						l = d.resliceDaySegs(k, h),
						m = d.resliceDaySegs(c, h);
					"function" == typeof g && (g = e.trigger("eventLimitClick", null, {
						date: h,
						dayEl: j,
						moreEl: i,
						segs: l,
						hiddenSegs: m
					}, f)), "popover" === g ? d.showSegPopover(b, i, l) : "string" == typeof g && e.calendar.zoomTo(h, g)
				})
			},
			showSegPopover: function(a, b, c) {
				var d, e, f = this,
					g = this.view,
					h = b.parent();
				d = 1 == this.rowCnt ? g.el : this.rowEls.eq(a.row), e = {
					className: "fc-more-popover",
					content: this.renderSegPopoverContent(a, c),
					parentEl: this.el,
					top: d.offset().top,
					autoHide: !0,
					viewportConstrain: g.opt("popoverViewportConstrain"),
					hide: function() {
						f.segPopover.destroy(), f.segPopover = null, f.popoverSegs = null
					}
				}, this.isRTL ? e.right = h.offset().left + h.outerWidth() + 1 : e.left = h.offset().left - 1, this.segPopover = new Za(e), this.segPopover.show()
			},
			renderSegPopoverContent: function(b, c) {
				var d, e = this.view,
					f = e.opt("theme"),
					g = b.start.format(e.opt("dayPopoverFormat")),
					h = a('<div class="fc-header ' + e.widgetHeaderClass + '"><span class="fc-close ' + (f ? "ui-icon ui-icon-closethick" : "fc-icon fc-icon-x") + '"></span><span class="fc-title">' + Q(g) + '</span><div class="fc-clear"/></div><div class="fc-body ' + e.widgetContentClass + '"><div class="fc-event-container"></div></div>'),
					i = h.find(".fc-event-container");
				for(c = this.renderFgSegEls(c, !0), this.popoverSegs = c, d = 0; c.length > d; d++) c[d].cell = b, i.append(c[d].el);
				return h
			},
			resliceDaySegs: function(b, c) {
				var d = a.map(b, function(a) {
						return a.event
					}),
					e = c.clone().stripTime(),
					f = e.clone().add(1, "days"),
					g = {
						start: e,
						end: f
					};
				return b = this.eventsToSegs(d, function(a) {
					var b = A(a, g);
					return b ? [b] : []
				}), b.sort(qa), b
			},
			getMoreLinkText: function(a) {
				var b = this.view.opt("eventLimitText");
				return "function" == typeof b ? b(a) : "+" + a + " " + b
			},
			getCellSegs: function(a, b) {
				for(var c, d = this.rowStructs[a.row].segMatrix, e = b || 0, f = []; d.length > e;) c = d[e][a.col], c && f.push(c), e++;
				return f
			}
		});
		var gb = eb.extend({
			slotDuration: null,
			snapDuration: null,
			minTime: null,
			maxTime: null,
			axisFormat: null,
			dayEls: null,
			slatEls: null,
			slatTops: null,
			helperEl: null,
			businessHourSegs: null,
			constructor: function() {
				eb.apply(this, arguments), this.processOptions()
			},
			renderDates: function() {
				this.el.html(this.renderHtml()), this.dayEls = this.el.find(".fc-day"), this.slatEls = this.el.find(".fc-slats tr")
			},
			renderBusinessHours: function() {
				var a = this.view.calendar.getBusinessHoursEvents();
				this.businessHourSegs = this.renderFill("businessHours", this.eventsToSegs(a), "bgevent")
			},
			renderHtml: function() {
				return '<div class="fc-bg"><table>' + this.rowHtml("slotBg") + '</table></div><div class="fc-slats"><table>' + this.slatRowHtml() + "</table></div>"
			},
			slotBgCellHtml: function(a) {
				return this.bgCellHtml(a)
			},
			slatRowHtml: function() {
				for(var a, c, d, e = this.view, f = this.isRTL, g = "", h = 0 == this.slotDuration.asMinutes() % 15, i = b.duration(+this.minTime); this.maxTime > i;) a = this.start.clone().time(i), c = a.minutes(), d = '<td class="fc-axis fc-time ' + e.widgetContentClass + '" ' + e.axisStyleAttr() + ">" + (h && c ? "" : "<span>" + Q(a.format(this.axisFormat)) + "</span>") + "</td>", g += "<tr " + (c ? 'class="fc-minor"' : "") + ">" + (f ? "" : d) + '<td class="' + e.widgetContentClass + '"/>' + (f ? d : "") + "</tr>", i.add(this.slotDuration);
				return g
			},
			processOptions: function() {
				var a = this.view,
					c = a.opt("slotDuration"),
					d = a.opt("snapDuration");
				c = b.duration(c), d = d ? b.duration(d) : c, this.slotDuration = c, this.snapDuration = d, this.cellDuration = d, this.minTime = b.duration(a.opt("minTime")), this.maxTime = b.duration(a.opt("maxTime")), this.axisFormat = a.opt("axisFormat") || a.opt("smallTimeFormat")
			},
			computeColHeadFormat: function() {
				return this.colCnt > 1 ? this.view.opt("dayOfMonthFormat") : "dddd"
			},
			computeEventTimeFormat: function() {
				return this.view.opt("noMeridiemTimeFormat")
			},
			computeDisplayEventEnd: function() {
				return !0
			},
			updateCells: function() {
				var a, b = this.view,
					c = [];
				for(a = this.start.clone(); a.isBefore(this.end);) c.push({
					day: a.clone()
				}), a.add(1, "day"), a = b.skipHiddenDays(a);
				this.isRTL && c.reverse(), this.colData = c, this.colCnt = c.length, this.rowCnt = Math.ceil((this.maxTime - this.minTime) / this.snapDuration)
			},
			computeCellDate: function(a) {
				var b = this.computeSnapTime(a.row);
				return this.view.calendar.rezoneDate(a.day).time(b)
			},
			getColEl: function(a) {
				return this.dayEls.eq(a)
			},
			computeSnapTime: function(a) {
				return b.duration(this.minTime + this.snapDuration * a)
			},
			rangeToSegs: function(a) {
				var b, c, d, e, f = this.colCnt,
					g = [];
				for(a = {
						start: a.start.clone().stripZone(),
						end: a.end.clone().stripZone()
					}, c = 0; f > c; c++) d = this.colData[c].day, e = {
					start: d.clone().time(this.minTime),
					end: d.clone().time(this.maxTime)
				}, (b = A(a, e)) && (b.col = c, g.push(b));
				return g
			},
			updateSize: function(a) {
				this.computeSlatTops(), a && this.updateSegVerticals()
			},
			computeRowCoords: function() {
				var a, b, c = this.el.offset().top,
					d = [];
				for(a = 0; this.rowCnt > a; a++) b = {
					top: c + this.computeTimeTop(this.computeSnapTime(a))
				}, a > 0 && (d[a - 1].bottom = b.top), d.push(b);
				return b.bottom = b.top + this.computeTimeTop(this.computeSnapTime(a)), d
			},
			computeDateTop: function(a, c) {
				return this.computeTimeTop(b.duration(a.clone().stripZone() - c.clone().stripTime()))
			},
			computeTimeTop: function(a) {
				var b, c, d, e, f = (a - this.minTime) / this.slotDuration;
				return f = Math.max(0, f), f = Math.min(this.slatEls.length, f), b = Math.floor(f), c = f - b, d = this.slatTops[b], c ? (e = this.slatTops[b + 1], d + (e - d) * c) : d
			},
			computeSlatTops: function() {
				var b, c = [];
				this.slatEls.each(function(d, e) {
					b = a(e).position().top, c.push(b)
				}), c.push(b + this.slatEls.last().outerHeight()), this.slatTops = c
			},
			renderDrag: function(a, b) {
				return b ? (this.renderRangeHelper(a, b), this.applyDragOpacity(this.helperEl), !0) : void this.renderHighlight(this.view.calendar.ensureVisibleEventRange(a))
			},
			destroyDrag: function() {
				this.destroyHelper(), this.destroyHighlight()
			},
			renderEventResize: function(a, b) {
				this.renderRangeHelper(a, b)
			},
			destroyEventResize: function() {
				this.destroyHelper()
			},
			renderHelper: function(b, c) {
				var d, e, f, g, h = this.eventsToSegs([b]);
				for(h = this.renderFgSegEls(h), d = this.renderSegTable(h), e = 0; h.length > e; e++) f = h[e], c && c.col === f.col && (g = c.el, f.el.css({
					left: g.css("left"),
					right: g.css("right"),
					"margin-left": g.css("margin-left"),
					"margin-right": g.css("margin-right")
				}));
				this.helperEl = a('<div class="fc-helper-skeleton"/>').append(d).appendTo(this.el)
			},
			destroyHelper: function() {
				this.helperEl && (this.helperEl.remove(), this.helperEl = null)
			},
			renderSelection: function(a) {
				this.view.opt("selectHelper") ? this.renderRangeHelper(a) : this.renderHighlight(a)
			},
			destroySelection: function() {
				this.destroyHelper(), this.destroyHighlight()
			},
			renderFill: function(b, c, d) {
				var e, f, g, h, i, j, k, l, m, n;
				if(c.length) {
					for(c = this.renderFillSegEls(b, c), e = this.groupSegCols(c), d = d || b.toLowerCase(), f = a('<div class="fc-' + d + '-skeleton"><table><tr/></table></div>'), g = f.find("tr"), h = 0; e.length > h; h++)
						if(i = e[h], j = a("<td/>").appendTo(g), i.length)
							for(k = a('<div class="fc-' + d + '-container"/>').appendTo(j), l = this.colData[h].day, m = 0; i.length > m; m++) n = i[m], k.append(n.el.css({
								top: this.computeDateTop(n.start, l),
								bottom: -this.computeDateTop(n.end, l)
							}));
					this.bookendCells(g, b), this.el.append(f), this.elsByFill[b] = f
				}
				return c
			}
		});
		gb.mixin({
			eventSkeletonEl: null,
			renderFgSegs: function(b) {
				return b = this.renderFgSegEls(b), this.el.append(this.eventSkeletonEl = a('<div class="fc-content-skeleton"/>').append(this.renderSegTable(b))), b
			},
			destroyFgSegs: function() {
				this.eventSkeletonEl && (this.eventSkeletonEl.remove(), this.eventSkeletonEl = null)
			},
			renderSegTable: function(b) {
				var c, d, e, f, g, h, i = a("<table><tr/></table>"),
					j = i.find("tr");
				for(c = this.groupSegCols(b), this.computeSegVerticals(b), f = 0; c.length > f; f++) {
					for(g = c[f], ua(g), h = a('<div class="fc-event-container"/>'), d = 0; g.length > d; d++) e = g[d], e.el.css(this.generateSegPositionCss(e)), 30 > e.bottom - e.top && e.el.addClass("fc-short"), h.append(e.el);
					j.append(a("<td/>").append(h))
				}
				return this.bookendCells(j, "eventSkeleton"), i
			},
			updateSegVerticals: function() {
				var a, b = (this.segs || []).concat(this.businessHourSegs || []);
				for(this.computeSegVerticals(b), a = 0; b.length > a; a++) b[a].el.css(this.generateSegVerticalCss(b[a]))
			},
			computeSegVerticals: function(a) {
				var b, c;
				for(b = 0; a.length > b; b++) c = a[b], c.top = this.computeDateTop(c.start, c.start), c.bottom = this.computeDateTop(c.end, c.start)
			},
			fgSegHtml: function(a, b) {
				var c, d, e, f = this.view,
					g = a.event,
					h = f.isEventDraggable(g),
					i = !b && a.isStart && f.isEventResizableFromStart(g),
					j = !b && a.isEnd && f.isEventResizableFromEnd(g),
					k = this.getSegClasses(a, h, i || j),
					l = S(this.getEventSkinCss(g));
				return k.unshift("fc-time-grid-event", "fc-v-event"), f.isMultiDayEvent(g) ? (a.isStart || a.isEnd) && (c = this.getEventTimeText(a), d = this.getEventTimeText(a, "LT"), e = this.getEventTimeText(a, null, !1)) : (c = this.getEventTimeText(g), d = this.getEventTimeText(g, "LT"), e = this.getEventTimeText(g, null, !1)), '<a class="' + k.join(" ") + '"' + (g.url ? ' href="' + Q(g.url) + '"' : "") + (l ? ' style="' + l + '"' : "") + '><div class="fc-content">' + (c ? '<div class="fc-time" data-start="' + Q(e) + '" data-full="' + Q(d) + '"><span>' + Q(c) + "</span></div>" : "") + (g.title ? '<div class="fc-title">' + Q(g.title) + "</div>" : "") + '</div><div class="fc-bg"/>' + (j ? '<div class="fc-resizer fc-end-resizer" />' : "") + "</a>"
			},
			generateSegPositionCss: function(a) {
				var b, c, d = this.view.opt("slotEventOverlap"),
					e = a.backwardCoord,
					f = a.forwardCoord,
					g = this.generateSegVerticalCss(a);
				return d && (f = Math.min(1, e + 2 * (f - e))), this.isRTL ? (b = 1 - f, c = e) : (b = e, c = 1 - f), g.zIndex = a.level + 1, g.left = 100 * b + "%", g.right = 100 * c + "%", d && a.forwardPressure && (g[this.isRTL ? "marginLeft" : "marginRight"] = 20), g
			},
			generateSegVerticalCss: function(a) {
				return {
					top: a.top,
					bottom: -a.bottom
				}
			},
			groupSegCols: function(a) {
				var b, c = [];
				for(b = 0; this.colCnt > b; b++) c.push([]);
				for(b = 0; a.length > b; b++) c[a[b].col].push(a[b]);
				return c
			}
		});
		var hb = Ia.View = ja.extend({
				type: null,
				name: null,
				title: null,
				calendar: null,
				options: null,
				coordMap: null,
				el: null,
				isDisplayed: !1,
				isSkeletonRendered: !1,
				isEventsRendered: !1,
				start: null,
				end: null,
				intervalStart: null,
				intervalEnd: null,
				intervalDuration: null,
				intervalUnit: null,
				isSelected: !1,
				scrollerEl: null,
				scrollTop: null,
				widgetHeaderClass: null,
				widgetContentClass: null,
				highlightStateClass: null,
				nextDayThreshold: null,
				isHiddenDayHash: null,
				documentMousedownProxy: null,
				constructor: function(a, c, d, e) {
					this.calendar = a, this.type = this.name = c, this.options = d, this.intervalDuration = e || b.duration(1, "day"), this.nextDayThreshold = b.duration(this.opt("nextDayThreshold")), this.initThemingProps(), this.initHiddenDays(), this.documentMousedownProxy = W(this, "documentMousedown"), this.initialize()
				},
				initialize: function() {},
				opt: function(a) {
					return this.options[a]
				},
				trigger: function(a, b) {
					var c = this.calendar;
					return c.trigger.apply(c, [a, b || this].concat(Array.prototype.slice.call(arguments, 2), [this]))
				},
				setDate: function(a) {
					this.setRange(this.computeRange(a))
				},
				setRange: function(b) {
					a.extend(this, b), this.updateTitle()
				},
				computeRange: function(a) {
					var b, c, d = E(this.intervalDuration),
						e = a.clone().startOf(d),
						f = e.clone().add(this.intervalDuration);
					return /year|month|week|day/.test(d) ? (e.stripTime(), f.stripTime()) : (e.hasTime() || (e = this.calendar.rezoneDate(e)), f.hasTime() || (f = this.calendar.rezoneDate(f))), b = e.clone(), b = this.skipHiddenDays(b), c = f.clone(), c = this.skipHiddenDays(c, -1, !0), {
						intervalUnit: d,
						intervalStart: e,
						intervalEnd: f,
						start: b,
						end: c
					}
				},
				computePrevDate: function(a) {
					return this.massageCurrentDate(a.clone().startOf(this.intervalUnit).subtract(this.intervalDuration), -1)
				},
				computeNextDate: function(a) {
					return this.massageCurrentDate(a.clone().startOf(this.intervalUnit).add(this.intervalDuration))
				},
				massageCurrentDate: function(a, b) {
					return 1 >= this.intervalDuration.as("days") && this.isHiddenDay(a) && (a = this.skipHiddenDays(a, b), a.startOf("day")), a
				},
				updateTitle: function() {
					this.title = this.computeTitle()
				},
				computeTitle: function() {
					return this.formatRange({
						start: this.intervalStart,
						end: this.intervalEnd
					}, this.opt("titleFormat") || this.computeTitleFormat(), this.opt("titleRangeSeparator"))
				},
				computeTitleFormat: function() {
					return "year" == this.intervalUnit ? "YYYY" : "month" == this.intervalUnit ? this.opt("monthYearFormat") : this.intervalDuration.as("days") > 1 ? "ll" : "LL"
				},
				formatRange: function(a, b, c) {
					var d = a.end;
					return d.hasTime() || (d = d.clone().subtract(1)), ea(a.start, d, b, c, this.opt("isRTL"))
				},
				setElement: function(a) {
					this.el = a, this.bindGlobalHandlers()
				},
				removeElement: function() {
					this.clear(), this.isSkeletonRendered && (this.destroySkeleton(), this.isSkeletonRendered = !1), this.unbindGlobalHandlers(), this.el.remove()
				},
				display: function(a) {
					var b = null;
					this.isDisplayed && (b = this.queryScroll()), this.clear(), this.setDate(a), this.render(), this.updateSize(), this.renderBusinessHours(), this.isDisplayed = !0, b = this.computeInitialScroll(b), this.forceScroll(b), this.triggerRender()
				},
				clear: function() {
					this.isDisplayed && (this.unselect(), this.clearEvents(), this.triggerDestroy(), this.destroyBusinessHours(), this.destroy(), this.isDisplayed = !1)
				},
				render: function() {
					this.isSkeletonRendered || (this.renderSkeleton(), this.isSkeletonRendered = !0), this.renderDates()
				},
				destroy: function() {
					this.destroyDates()
				},
				renderSkeleton: function() {},
				destroySkeleton: function() {},
				renderDates: function() {},
				destroyDates: function() {},
				renderBusinessHours: function() {},
				destroyBusinessHours: function() {},
				triggerRender: function() {
					this.trigger("viewRender", this, this, this.el)
				},
				triggerDestroy: function() {
					this.trigger("viewDestroy", this, this, this.el)
				},
				bindGlobalHandlers: function() {
					a(document).on("mousedown", this.documentMousedownProxy)
				},
				unbindGlobalHandlers: function() {
					a(document).off("mousedown", this.documentMousedownProxy)
				},
				initThemingProps: function() {
					var a = this.opt("theme") ? "ui" : "fc";
					this.widgetHeaderClass = a + "-widget-header", this.widgetContentClass = a + "-widget-content", this.highlightStateClass = a + "-state-highlight"
				},
				updateSize: function(a) {
					var b;
					a && (b = this.queryScroll()), this.updateHeight(), this.updateWidth(), a && this.setScroll(b)
				},
				updateWidth: function() {},
				updateHeight: function() {
					var a = this.calendar;
					this.setHeight(a.getSuggestedViewHeight(), a.isHeightAuto())
				},
				setHeight: function() {},
				computeScrollerHeight: function(a) {
					var b, c, d = this.scrollerEl;
					return b = this.el.add(d), b.css({
						position: "relative",
						left: -1
					}), c = this.el.outerHeight() - d.height(), b.css({
						position: "",
						left: ""
					}), a - c
				},
				computeInitialScroll: function() {
					return 0
				},
				queryScroll: function() {
					return this.scrollerEl ? this.scrollerEl.scrollTop() : void 0
				},
				setScroll: function(a) {
					return this.scrollerEl ? this.scrollerEl.scrollTop(a) : void 0
				},
				forceScroll: function(a) {
					var b = this;
					this.setScroll(a), setTimeout(function() {
						b.setScroll(a)
					}, 0)
				},
				displayEvents: function(a) {
					var b = this.queryScroll();
					this.clearEvents(), this.renderEvents(a), this.isEventsRendered = !0, this.setScroll(b), this.triggerEventRender()
				},
				clearEvents: function() {
					this.isEventsRendered && (this.triggerEventDestroy(), this.destroyEvents(), this.isEventsRendered = !1)
				},
				renderEvents: function() {},
				destroyEvents: function() {},
				triggerEventRender: function() {
					this.renderedEventSegEach(function(a) {
						this.trigger("eventAfterRender", a.event, a.event, a.el)
					}), this.trigger("eventAfterAllRender")
				},
				triggerEventDestroy: function() {
					this.renderedEventSegEach(function(a) {
						this.trigger("eventDestroy", a.event, a.event, a.el)
					})
				},
				resolveEventEl: function(b, c) {
					var d = this.trigger("eventRender", b, b, c);
					return !1 === d ? c = null : d && !0 !== d && (c = a(d)), c
				},
				showEvent: function(a) {
					this.renderedEventSegEach(function(a) {
						a.el.css("visibility", "")
					}, a)
				},
				hideEvent: function(a) {
					this.renderedEventSegEach(function(a) {
						a.el.css("visibility", "hidden")
					}, a)
				},
				renderedEventSegEach: function(a, b) {
					var c, d = this.getEventSegs();
					for(c = 0; d.length > c; c++) b && d[c].event._id !== b._id || d[c].el && a.call(this, d[c])
				},
				getEventSegs: function() {
					return []
				},
				isEventDraggable: function(a) {
					var b = a.source || {};
					return P(a.startEditable, b.startEditable, this.opt("eventStartEditable"), a.editable, b.editable, this.opt("editable"))
				},
				reportEventDrop: function(a, b, c, d, e) {
					var f = this.calendar,
						g = f.mutateEvent(a, b, c),
						h = function() {
							g.undo(), f.reportEventChange()
						};
					this.triggerEventDrop(a, g.dateDelta, h, d, e), f.reportEventChange()
				},
				triggerEventDrop: function(a, b, c, d, e) {
					this.trigger("eventDrop", d[0], a, b, c, e, {})
				},
				reportExternalDrop: function(b, c, d, e, f) {
					var g, h, i = b.eventProps;
					i && (g = a.extend({}, i, c), h = this.calendar.renderEvent(g, b.stick)[0]), this.triggerExternalDrop(h, c, d, e, f)
				},
				triggerExternalDrop: function(a, b, c, d, e) {
					this.trigger("drop", c[0], b.start, d, e), a && this.trigger("eventReceive", null, a)
				},
				renderDrag: function() {},
				destroyDrag: function() {},
				isEventResizableFromStart: function(a) {
					return this.opt("eventResizableFromStart") && this.isEventResizable(a)
				},
				isEventResizableFromEnd: function(a) {
					return this.isEventResizable(a)
				},
				isEventResizable: function(a) {
					var b = a.source || {};
					return P(a.durationEditable, b.durationEditable, this.opt("eventDurationEditable"), a.editable, b.editable, this.opt("editable"))
				},
				reportEventResize: function(a, b, c, d, e) {
					var f = this.calendar,
						g = f.mutateEvent(a, b, c),
						h = function() {
							g.undo(), f.reportEventChange()
						};
					this.triggerEventResize(a, g.durationDelta, h, d, e), f.reportEventChange()
				},
				triggerEventResize: function(a, b, c, d, e) {
					this.trigger("eventResize", d[0], a, b, c, e, {})
				},
				select: function(a, b) {
					this.unselect(b), this.renderSelection(a), this.reportSelection(a, b)
				},
				renderSelection: function() {},
				reportSelection: function(a, b) {
					this.isSelected = !0, this.trigger("select", null, a.start, a.end, b)
				},
				unselect: function(a) {
					this.isSelected && (this.isSelected = !1, this.destroySelection(), this.trigger("unselect", null, a))
				},
				destroySelection: function() {},
				documentMousedown: function(b) {
					var c;
					this.isSelected && this.opt("unselectAuto") && v(b) && ((c = this.opt("unselectCancel")) && a(b.target).closest(c).length || this.unselect(b))
				},
				initHiddenDays: function() {
					var b, c = this.opt("hiddenDays") || [],
						d = [],
						e = 0;
					for(!1 === this.opt("weekends") && c.push(0, 6), b = 0; 7 > b; b++)(d[b] = -1 !== a.inArray(b, c)) || e++;
					if(!e) throw "invalid hiddenDays";
					this.isHiddenDayHash = d
				},
				isHiddenDay: function(a) {
					return b.isMoment(a) && (a = a.day()), this.isHiddenDayHash[a]
				},
				skipHiddenDays: function(a, b, c) {
					var d = a.clone();
					for(b = b || 1; this.isHiddenDayHash[(d.day() + (c ? b : 0) + 7) % 7];) d.add(b, "days");
					return d
				},
				computeDayRange: function(a) {
					var b, c = a.start.clone().stripTime(),
						d = a.end,
						e = null;
					return d && (e = d.clone().stripTime(), (b = +d.time()) && b >= this.nextDayThreshold && e.add(1, "days")), (!d || c >= e) && (e = c.clone().add(1, "days")), {
						start: c,
						end: e
					}
				},
				isMultiDayEvent: function(a) {
					var b = this.computeDayRange(a);
					return b.end.diff(b.start, "days") > 1
				}
			}),
			ib = Ia.Calendar = Ia.CalendarBase = ja.extend({
				dirDefaults: null,
				langDefaults: null,
				overrides: null,
				options: null,
				viewSpecCache: null,
				view: null,
				header: null,
				constructor: Ca,
				initOptions: function(a) {
					var b, e, f, g;
					a = d(a), b = a.lang, e = jb[b], e || (b = ib.defaults.lang, e = jb[b] || {}), f = P(a.isRTL, e.isRTL, ib.defaults.isRTL), g = f ? ib.rtlDefaults : {}, this.dirDefaults = g, this.langDefaults = e, this.overrides = a, this.options = c(ib.defaults, g, e, a), Da(this.options), this.viewSpecCache = {}
				},
				getViewSpec: function(a) {
					var b = this.viewSpecCache;
					return b[a] || (b[a] = this.buildViewSpec(a))
				},
				getUnitViewSpec: function(b) {
					var c, d, e;
					if(-1 != a.inArray(b, Qa))
						for(c = this.header.getViewsWithButtons(), a.each(Ia.views, function(a) {
								c.push(a)
							}), d = 0; c.length > d; d++)
							if((e = this.getViewSpec(c[d])) && e.singleUnit == b) return e
				},
				buildViewSpec: function(a) {
					for(var d, e, f, g, h, i, j = this.overrides.views || {}, k = [], l = [], m = a; m && !d;) e = Ja[m] || {}, f = j[m] || {}, g = g || f.duration || e.duration, m = f.type || e.type, "function" == typeof e ? (d = e, k.unshift(d.defaults || {})) : k.unshift(e), l.unshift(f);
					return d ? (i = {
						class: d,
						type: a
					}, g && (g = b.duration(g), g.valueOf() || (g = null)), g && (i.duration = g, h = E(g), 1 === g.as(h) && (i.singleUnit = h, l.unshift(j[h] || {}))), i.defaults = c.apply(null, k), i.overrides = c.apply(null, l), this.buildViewSpecOptions(i), this.buildViewSpecButtonText(i, a), i) : void 0
				},
				buildViewSpecOptions: function(a) {
					a.options = c(ib.defaults, a.defaults, this.dirDefaults, this.langDefaults, this.overrides, a.overrides), Da(a.options)
				},
				buildViewSpecButtonText: function(a, b) {
					function c(c) {
						var d = c.buttonText || {};
						return d[b] || (a.singleUnit ? d[a.singleUnit] : null)
					}
					a.buttonTextOverride = c(this.overrides) || a.overrides.buttonText, a.buttonTextDefault = c(this.langDefaults) || c(this.dirDefaults) || a.defaults.buttonText || c(ib.defaults) || (a.duration ? this.humanizeDuration(a.duration) : null) || b
				},
				instantiateView: function(a) {
					var b = this.getViewSpec(a);
					return new b.class(this, a, b.options, b.duration)
				},
				isValidViewType: function(a) {
					return Boolean(this.getViewSpec(a))
				}
			});
		ib.defaults = {
			titleRangeSeparator: " — ",
			monthYearFormat: "MMMM YYYY",
			defaultTimedEventDuration: "02:00:00",
			defaultAllDayEventDuration: {
				days: 1
			},
			forceEventDuration: !1,
			nextDayThreshold: "09:00:00",
			defaultView: "month",
			aspectRatio: 1.35,
			header: {
				left: "title",
				center: "",
				right: "today prev,next"
			},
			weekends: !0,
			weekNumbers: !1,
			weekNumberTitle: "W",
			weekNumberCalculation: "local",
			lazyFetching: !0,
			startParam: "start",
			endParam: "end",
			timezoneParam: "timezone",
			timezone: !1,
			isRTL: !1,
			buttonText: {
				prev: "prev",
				next: "next",
				prevYear: "prev year",
				nextYear: "next year",
				year: "year",
				today: "today",
				month: "month",
				week: "week",
				day: "day"
			},
			buttonIcons: {
				prev: "left-single-arrow",
				next: "right-single-arrow",
				prevYear: "left-double-arrow",
				nextYear: "right-double-arrow"
			},
			theme: !1,
			themeButtonIcons: {
				prev: "circle-triangle-w",
				next: "circle-triangle-e",
				prevYear: "seek-prev",
				nextYear: "seek-next"
			},
			dragOpacity: .75,
			dragRevertDuration: 500,
			dragScroll: !0,
			unselectAuto: !0,
			dropAccept: "*",
			eventLimit: !1,
			eventLimitText: "more",
			eventLimitClick: "popover",
			dayPopoverFormat: "LL",
			handleWindowResize: !0,
			windowResizeDelay: 200
		}, ib.englishDefaults = {
			dayPopoverFormat: "dddd, MMMM D"
		}, ib.rtlDefaults = {
			header: {
				left: "next,prev today",
				center: "",
				right: "title"
			},
			buttonIcons: {
				prev: "right-single-arrow",
				next: "left-single-arrow",
				prevYear: "right-double-arrow",
				nextYear: "left-double-arrow"
			},
			themeButtonIcons: {
				prev: "circle-triangle-e",
				next: "circle-triangle-w",
				nextYear: "seek-prev",
				prevYear: "seek-next"
			}
		};
		var jb = Ia.langs = {};
		Ia.datepickerLang = function(b, c, d) {
			var e = jb[b] || (jb[b] = {});
			e.isRTL = d.isRTL, e.weekNumberTitle = d.weekHeader, a.each(kb, function(a, b) {
				e[a] = b(d)
			}), a.datepicker && (a.datepicker.regional[c] = a.datepicker.regional[b] = d, a.datepicker.regional.en = a.datepicker.regional[""], a.datepicker.setDefaults(d))
		}, Ia.lang = function(b, d) {
			var e, f;
			e = jb[b] || (jb[b] = {}), d && (e = jb[b] = c(e, d)), f = Ea(b), a.each(lb, function(a, b) {
				null == e[a] && (e[a] = b(f, e))
			}), ib.defaults.lang = b
		};
		var kb = {
				buttonText: function(a) {
					return {
						prev: R(a.prevText),
						next: R(a.nextText),
						today: R(a.currentText)
					}
				},
				monthYearFormat: function(a) {
					return a.showMonthAfterYear ? "YYYY[" + a.yearSuffix + "] MMMM" : "MMMM YYYY[" + a.yearSuffix + "]"
				}
			},
			lb = {
				dayOfMonthFormat: function(a, b) {
					var c = a.longDateFormat("l");
					return c = c.replace(/^Y+[^\w\s]*|[^\w\s]*Y+$/g, ""), b.isRTL ? c += " ddd" : c = "ddd " + c, c
				},
				mediumTimeFormat: function(a) {
					return a.longDateFormat("LT").replace(/\s*a$/i, "a")
				},
				smallTimeFormat: function(a) {
					return a.longDateFormat("LT").replace(":mm", "(:mm)").replace(/(\Wmm)$/, "($1)").replace(/\s*a$/i, "a")
				},
				extraSmallTimeFormat: function(a) {
					return a.longDateFormat("LT").replace(":mm", "(:mm)").replace(/(\Wmm)$/, "($1)").replace(/\s*a$/i, "t")
				},
				hourFormat: function(a) {
					return a.longDateFormat("LT").replace(":mm", "").replace(/(\Wmm)$/, "").replace(/\s*a$/i, "a")
				},
				noMeridiemTimeFormat: function(a) {
					return a.longDateFormat("LT").replace(/\s*a$/i, "")
				}
			},
			mb = {
				smallDayDateFormat: function(a) {
					return a.isRTL ? "D dd" : "dd D"
				},
				weekFormat: function(a) {
					return a.isRTL ? "w[ " + a.weekNumberTitle + "]" : "[" + a.weekNumberTitle + " ]w"
				},
				smallWeekFormat: function(a) {
					return a.isRTL ? "w[" + a.weekNumberTitle + "]" : "[" + a.weekNumberTitle + "]w"
				}
			};
		Ia.lang("en", ib.englishDefaults), Ia.sourceNormalizers = [], Ia.sourceFetchers = [];
		var nb = {
				dataType: "json",
				cache: !1
			},
			ob = 1;
		ib.prototype.getPeerEvents = function(a) {
			var b, c, d = this.getEventCache(),
				e = [];
			for(b = 0; d.length > b; b++) c = d[b], a && a._id === c._id || e.push(c);
			return e
		};
		var pb = Ja.basic = hb.extend({
				dayGrid: null,
				dayNumbersVisible: !1,
				weekNumbersVisible: !1,
				weekNumberWidth: null,
				headRowEl: null,
				initialize: function() {
					this.dayGrid = new fb(this), this.coordMap = this.dayGrid.coordMap
				},
				setRange: function(a) {
					hb.prototype.setRange.call(this, a), this.dayGrid.breakOnWeeks = /year|month|week/.test(this.intervalUnit), this.dayGrid.setRange(a)
				},
				computeRange: function(a) {
					var b = hb.prototype.computeRange.call(this, a);
					return /year|month/.test(b.intervalUnit) && (b.start.startOf("week"), b.start = this.skipHiddenDays(b.start), b.end.weekday() && (b.end.add(1, "week").startOf("week"), b.end = this.skipHiddenDays(b.end, -1, !0))), b
				},
				render: function() {
					this.dayNumbersVisible = this.dayGrid.rowCnt > 1, this.weekNumbersVisible = this.opt("weekNumbers"), this.dayGrid.numbersVisible = this.dayNumbersVisible || this.weekNumbersVisible, this.el.addClass("fc-basic-view").html(this.renderHtml()), this.headRowEl = this.el.find("thead .fc-row"), this.scrollerEl = this.el.find(".fc-day-grid-container"), this.dayGrid.coordMap.containerEl = this.scrollerEl, this.dayGrid.setElement(this.el.find(".fc-day-grid")), this.dayGrid.renderDates(this.hasRigidRows())
				},
				destroy: function() {
					this.dayGrid.destroyDates(), this.dayGrid.removeElement()
				},
				renderBusinessHours: function() {
					this.dayGrid.renderBusinessHours()
				},
				renderHtml: function() {
					return '<table><thead class="fc-head"><tr><td class="' + this.widgetHeaderClass + '">' + this.dayGrid.headHtml() + '</td></tr></thead><tbody class="fc-body"><tr><td class="' + this.widgetContentClass + '"><div class="fc-day-grid-container"><div class="fc-day-grid"/></div></td></tr></tbody></table>'
				},
				headIntroHtml: function() {
					return this.weekNumbersVisible ? '<th class="fc-week-number ' + this.widgetHeaderClass + '" ' + this.weekNumberStyleAttr() + "><span>" + Q(this.opt("weekNumberTitle")) + "</span></th>" : void 0
				},
				numberIntroHtml: function(a) {
					return this.weekNumbersVisible ? '<td class="fc-week-number" ' + this.weekNumberStyleAttr() + "><span>" + this.dayGrid.getCell(a, 0).start.format("w") + "</span></td>" : void 0
				},
				dayIntroHtml: function() {
					return this.weekNumbersVisible ? '<td class="fc-week-number ' + this.widgetContentClass + '" ' + this.weekNumberStyleAttr() + "></td>" : void 0
				},
				introHtml: function() {
					return this.weekNumbersVisible ? '<td class="fc-week-number" ' + this.weekNumberStyleAttr() + "></td>" : void 0
				},
				numberCellHtml: function(a) {
					var b, c = a.start;
					return this.dayNumbersVisible ? (b = this.dayGrid.getDayClasses(c), b.unshift("fc-day-number"), '<td class="' + b.join(" ") + '" data-date="' + c.format() + '">' + c.date() + "</td>") : "<td/>"
				},
				weekNumberStyleAttr: function() {
					return null !== this.weekNumberWidth ? 'style="width:' + this.weekNumberWidth + 'px"' : ""
				},
				hasRigidRows: function() {
					var a = this.opt("eventLimit");
					return a && "number" != typeof a
				},
				updateWidth: function() {
					this.weekNumbersVisible && (this.weekNumberWidth = k(this.el.find(".fc-week-number")))
				},
				setHeight: function(a, b) {
					var c, d = this.opt("eventLimit");
					m(this.scrollerEl), f(this.headRowEl), this.dayGrid.destroySegPopover(), d && "number" == typeof d && this.dayGrid.limitRows(d), c = this.computeScrollerHeight(a), this.setGridHeight(c, b), d && "number" != typeof d && this.dayGrid.limitRows(d), !b && l(this.scrollerEl, c) && (e(this.headRowEl, r(this.scrollerEl)), c = this.computeScrollerHeight(a), this.scrollerEl.height(c))
				},
				setGridHeight: function(a, b) {
					b ? j(this.dayGrid.rowEls) : i(this.dayGrid.rowEls, a, !0)
				},
				renderEvents: function(a) {
					this.dayGrid.renderEvents(a), this.updateHeight()
				},
				getEventSegs: function() {
					return this.dayGrid.getEventSegs()
				},
				destroyEvents: function() {
					this.dayGrid.destroyEvents()
				},
				renderDrag: function(a, b) {
					return this.dayGrid.renderDrag(a, b)
				},
				destroyDrag: function() {
					this.dayGrid.destroyDrag()
				},
				renderSelection: function(a) {
					this.dayGrid.renderSelection(a)
				},
				destroySelection: function() {
					this.dayGrid.destroySelection()
				}
			}),
			qb = Ja.month = pb.extend({
				computeRange: function(a) {
					var b, c = pb.prototype.computeRange.call(this, a);
					return this.isFixedWeeks() && (b = Math.ceil(c.end.diff(c.start, "weeks", !0)), c.end.add(6 - b, "weeks")), c
				},
				setGridHeight: function(a, b) {
					b = b || "variable" === this.opt("weekMode"), b && (a *= this.rowCnt / 6), i(this.dayGrid.rowEls, a, !b)
				},
				isFixedWeeks: function() {
					var a = this.opt("weekMode");
					return a ? "fixed" === a : this.opt("fixedWeekCount")
				}
			});
		qb.duration = {
			months: 1
		}, qb.defaults = {
			fixedWeekCount: !0
		}, Ja.basicWeek = {
			type: "basic",
			duration: {
				weeks: 1
			}
		}, Ja.basicDay = {
			type: "basic",
			duration: {
				days: 1
			}
		};
		var rb = {
			allDaySlot: !0,
			allDayText: "all-day",
			scrollTime: "06:00:00",
			slotDuration: "00:30:00",
			minTime: "00:00:00",
			maxTime: "24:00:00",
			slotEventOverlap: !0
		};
		return(Ja.agenda = hb.extend({
			timeGrid: null,
			dayGrid: null,
			axisWidth: null,
			noScrollRowEls: null,
			bottomRuleEl: null,
			bottomRuleHeight: null,
			initialize: function() {
				this.timeGrid = new gb(this), this.opt("allDaySlot") ? (this.dayGrid = new fb(this), this.coordMap = new _a([this.dayGrid.coordMap, this.timeGrid.coordMap])) : this.coordMap = this.timeGrid.coordMap
			},
			setRange: function(a) {
				hb.prototype.setRange.call(this, a), this.timeGrid.setRange(a), this.dayGrid && this.dayGrid.setRange(a)
			},
			render: function() {
				this.el.addClass("fc-agenda-view").html(this.renderHtml()), this.scrollerEl = this.el.find(".fc-time-grid-container"), this.timeGrid.coordMap.containerEl = this.scrollerEl, this.timeGrid.setElement(this.el.find(".fc-time-grid")), this.timeGrid.renderDates(), this.bottomRuleEl = a('<hr class="fc-divider ' + this.widgetHeaderClass + '"/>').appendTo(this.timeGrid.el), this.dayGrid && (this.dayGrid.setElement(this.el.find(".fc-day-grid")), this.dayGrid.renderDates(), this.dayGrid.bottomCoordPadding = this.dayGrid.el.next("hr").outerHeight()), this.noScrollRowEls = this.el.find(".fc-row:not(.fc-scroller *)")
			},
			destroy: function() {
				this.timeGrid.destroyDates(), this.timeGrid.removeElement(), this.dayGrid && (this.dayGrid.destroyDates(), this.dayGrid.removeElement())
			},
			renderBusinessHours: function() {
				this.timeGrid.renderBusinessHours(), this.dayGrid && this.dayGrid.renderBusinessHours()
			},
			renderHtml: function() {
				return '<table><thead class="fc-head"><tr><td class="' + this.widgetHeaderClass + '">' + this.timeGrid.headHtml() + '</td></tr></thead><tbody class="fc-body"><tr><td class="' + this.widgetContentClass + '">' + (this.dayGrid ? '<div class="fc-day-grid"/><hr class="fc-divider ' + this.widgetHeaderClass + '"/>' : "") + '<div class="fc-time-grid-container"><div class="fc-time-grid"/></div></td></tr></tbody></table>'
			},
			headIntroHtml: function() {
				var a, b;
				return this.opt("weekNumbers") ? (a = this.timeGrid.getCell(0).start, b = a.format(this.opt("smallWeekFormat")), '<th class="fc-axis fc-week-number ' + this.widgetHeaderClass + '" ' + this.axisStyleAttr() + "><span>" + Q(b) + "</span></th>") : '<th class="fc-axis ' + this.widgetHeaderClass + '" ' + this.axisStyleAttr() + "></th>"
			},
			dayIntroHtml: function() {
				return '<td class="fc-axis ' + this.widgetContentClass + '" ' + this.axisStyleAttr() + "><span>" + (this.opt("allDayHtml") || Q(this.opt("allDayText"))) + "</span></td>"
			},
			slotBgIntroHtml: function() {
				return '<td class="fc-axis ' + this.widgetContentClass + '" ' + this.axisStyleAttr() + "></td>"
			},
			introHtml: function() {
				return '<td class="fc-axis" ' + this.axisStyleAttr() + "></td>"
			},
			axisStyleAttr: function() {
				return null !== this.axisWidth ? 'style="width:' + this.axisWidth + 'px"' : ""
			},
			updateSize: function(a) {
				this.timeGrid.updateSize(a), hb.prototype.updateSize.call(this, a)
			},
			updateWidth: function() {
				this.axisWidth = k(this.el.find(".fc-axis"))
			},
			setHeight: function(a, b) {
				var c, d;
				null === this.bottomRuleHeight && (this.bottomRuleHeight = this.bottomRuleEl.outerHeight()), this.bottomRuleEl.hide(), this.scrollerEl.css("overflow", ""), m(this.scrollerEl), f(this.noScrollRowEls), this.dayGrid && (this.dayGrid.destroySegPopover(), c = this.opt("eventLimit"), c && "number" != typeof c && (c = 5), c && this.dayGrid.limitRows(c)), b || (d = this.computeScrollerHeight(a), l(this.scrollerEl, d) ? (e(this.noScrollRowEls, r(this.scrollerEl)), d = this.computeScrollerHeight(a), this.scrollerEl.height(d)) : (this.scrollerEl.height(d).css("overflow", "hidden"), this.bottomRuleEl.show()))
			},
			computeInitialScroll: function() {
				var a = b.duration(this.opt("scrollTime")),
					c = this.timeGrid.computeTimeTop(a);
				return c = Math.ceil(c), c && c++, c
			},
			renderEvents: function(a) {
				var b, c = [],
					d = [];
				for(b = 0; a.length > b; b++) a[b].allDay ? c.push(a[b]) : d.push(a[b]);
				this.timeGrid.renderEvents(d), this.dayGrid && this.dayGrid.renderEvents(c), this.updateHeight()
			},
			getEventSegs: function() {
				return this.timeGrid.getEventSegs().concat(this.dayGrid ? this.dayGrid.getEventSegs() : [])
			},
			destroyEvents: function() {
				this.timeGrid.destroyEvents(), this.dayGrid && this.dayGrid.destroyEvents()
			},
			renderDrag: function(a, b) {
				return a.start.hasTime() ? this.timeGrid.renderDrag(a, b) : this.dayGrid ? this.dayGrid.renderDrag(a, b) : void 0
			},
			destroyDrag: function() {
				this.timeGrid.destroyDrag(), this.dayGrid && this.dayGrid.destroyDrag()
			},
			renderSelection: function(a) {
				a.start.hasTime() || a.end.hasTime() ? this.timeGrid.renderSelection(a) : this.dayGrid && this.dayGrid.renderSelection(a)
			},
			destroySelection: function() {
				this.timeGrid.destroySelection(), this.dayGrid && this.dayGrid.destroySelection()
			}
		})).defaults = rb, Ja.agendaWeek = {
			type: "agenda",
			duration: {
				weeks: 1
			}
		}, Ja.agendaDay = {
			type: "agenda",
			duration: {
				days: 1
			}
		}, Ia
	});