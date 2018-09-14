! function(a) {
	a.fn.extend({
		slimScroll: function(b) {
			var c = {
					width: "auto",
					height: "250px",
					size: "7px",
					color: "#000",
					position: "right",
					distance: "1px",
					start: "top",
					opacity: .4,
					alwaysVisible: !1,
					disableFadeOut: !1,
					railVisible: !1,
					railColor: "#333",
					railOpacity: .2,
					railDraggable: !0,
					railClass: "slimScrollRail",
					barClass: "slimScrollBar",
					wrapperClass: "slimScrollDiv",
					allowPageScroll: !1,
					wheelStep: 20,
					touchScrollStep: 200,
					borderRadius: "0",
					railBorderRadius: "0"
				},
				d = a.extend(c, b);
			return this.each(function() {
				function c(b) {
					if(i) {
						var b = b || window.event,
							c = 0;
						b.wheelDelta && (c = -b.wheelDelta / 120), b.detail && (c = b.detail / 3);
						var f = b.target || b.srcTarget || b.srcElement;
						a(f).closest("." + d.wrapperClass).is(u.parent()) && e(c, !0), b.preventDefault && !s && b.preventDefault(), s || (b.returnValue = !1)
					}
				}

				function e(a, b, c) {
					s = !1;
					var e = a,
						f = u.outerHeight() - z.outerHeight();
					if(b && (e = parseInt(z.css("top")) + a * parseInt(d.wheelStep) / 100 * z.outerHeight(), e = Math.min(Math.max(e, 0), f), e = a > 0 ? Math.ceil(e) : Math.floor(e), z.css({
							top: e + "px"
						})), o = parseInt(z.css("top")) / (u.outerHeight() - z.outerHeight()), e = o * (u[0].scrollHeight - u.outerHeight()), c) {
						e = a;
						var i = e / u[0].scrollHeight * u.outerHeight();
						i = Math.min(Math.max(i, 0), f), z.css({
							top: i + "px"
						})
					}
					u.scrollTop(e), u.trigger("slimscrolling", ~~e), g(), h()
				}

				function f() {
					n = Math.max(u.outerHeight() / u[0].scrollHeight * u.outerHeight(), r), z.css({
						height: n + "px"
					});
					var a = n == u.outerHeight() ? "none" : "block";
					z.css({
						display: a
					})
				}

				function g() {
					if(f(), clearTimeout(l), o == ~~o) {
						if(s = d.allowPageScroll, p != o) {
							var a = 0 == ~~o ? "top" : "bottom";
							u.trigger("slimscroll", a)
						}
					} else s = !1;
					if(p = o, n >= u.outerHeight()) return void(s = !0);
					z.stop(!0, !0).fadeIn("fast"), d.railVisible && y.stop(!0, !0).fadeIn("fast")
				}

				function h() {
					d.alwaysVisible || (l = setTimeout(function() {
						d.disableFadeOut && i || j || k || (z.fadeOut("slow"), y.fadeOut("slow"))
					}, 1e3))
				}
				var i, j, k, l, m, n, o, p, q = "<div></div>",
					r = 30,
					s = !1,
					u = a(this);
				if(u.parent().hasClass(d.wrapperClass)) {
					var v = u.scrollTop();
					if(z = u.closest("." + d.barClass), y = u.closest("." + d.railClass), f(), a.isPlainObject(b)) {
						if("height" in b && "auto" == b.height) {
							u.parent().css("height", "auto"), u.css("height", "auto");
							var w = u.parent().parent().height();
							u.parent().css("height", w), u.css("height", w)
						}
						if("scrollTo" in b) v = parseInt(d.scrollTo);
						else if("scrollBy" in b) v += parseInt(d.scrollBy);
						else if("destroy" in b) return z.remove(), y.remove(), void u.unwrap();
						e(v, !1, !0)
					}
				} else if(!(a.isPlainObject(b) && "destroy" in b)) {
					d.height = "auto" == d.height ? u.parent().height() : d.height;
					var x = a(q).addClass(d.wrapperClass).css({
						position: "relative",
						overflow: "hidden",
						width: d.width,
						height: d.height
					});
					u.css({
						overflow: "hidden",
						width: d.width,
						height: d.height
					});
					var y = a(q).addClass(d.railClass).css({
							width: d.size,
							height: "100%",
							position: "absolute",
							top: 0,
							display: d.alwaysVisible && d.railVisible ? "block" : "none",
							"border-radius": d.railBorderRadius,
							background: d.railColor,
							opacity: d.railOpacity,
							zIndex: 90
						}),
						z = a(q).addClass(d.barClass).css({
							background: d.color,
							width: d.size,
							position: "absolute",
							top: 0,
							opacity: d.opacity,
							display: d.alwaysVisible ? "block" : "none",
							"border-radius": d.borderRadius,
							BorderRadius: d.borderRadius,
							MozBorderRadius: d.borderRadius,
							WebkitBorderRadius: d.borderRadius,
							zIndex: 99
						}),
						A = "right" == d.position ? {
							right: d.distance
						} : {
							left: d.distance
						};
					y.css(A), z.css(A), u.wrap(x), u.parent().append(z), u.parent().append(y), d.railDraggable && z.bind("mousedown", function(b) {
							var c = a(document);
							return k = !0, t = parseFloat(z.css("top")), pageY = b.pageY, c.bind("mousemove.slimscroll", function(a) {
								currTop = t + a.pageY - pageY, z.css("top", currTop), e(0, z.position().top, !1)
							}), c.bind("mouseup.slimscroll", function(a) {
								k = !1, h(), c.unbind(".slimscroll")
							}), !1
						}).bind("selectstart.slimscroll", function(a) {
							return a.stopPropagation(), a.preventDefault(), !1
						}), y.hover(function() {
							g()
						}, function() {
							h()
						}), z.hover(function() {
							j = !0
						}, function() {
							j = !1
						}), u.hover(function() {
							i = !0, g(), h()
						}, function() {
							i = !1, h()
						}), u.bind("touchstart", function(a, b) {
							a.originalEvent.touches.length && (m = a.originalEvent.touches[0].pageY)
						}), u.bind("touchmove", function(a) {
							if(s || a.originalEvent.preventDefault(), a.originalEvent.touches.length) {
								e((m - a.originalEvent.touches[0].pageY) / d.touchScrollStep, !0), m = a.originalEvent.touches[0].pageY
							}
						}), f(), "bottom" === d.start ? (z.css({
							top: u.outerHeight() - z.outerHeight()
						}), e(0, !0)) : "top" !== d.start && (e(a(d.start).position().top, null, !0), d.alwaysVisible || z.hide()),
						function(a) {
							window.addEventListener ? (a.addEventListener("DOMMouseScroll", c, !1), a.addEventListener("mousewheel", c, !1)) : document.attachEvent("onmousewheel", c)
						}(this)
				}
			}), this
		}
	}), a.fn.extend({
		slimscroll: a.fn.slimScroll
	})
}(jQuery),
function(a, b) {
	"use strict";
	"function" == typeof define && define.amd ? define([], function() {
		return b.apply(a)
	}) : "object" == typeof exports ? module.exports = b.call(a) : a.Waves = b.call(a)
}("object" == typeof global ? global : this, function() {
	"use strict";

	function a(a) {
		return null !== a && a === a.window
	}

	function b(b) {
		return a(b) ? b : 9 === b.nodeType && b.defaultView
	}

	function c(a) {
		var b = typeof a;
		return "function" === b || "object" === b && !!a
	}

	function d(a) {
		return c(a) && a.nodeType > 0
	}

	function e(a) {
		var b = m.call(a);
		return "[object String]" === b ? l(a) : c(a) && /^\[object (Array|HTMLCollection|NodeList|Object)\]$/.test(b) && a.hasOwnProperty("length") ? a : d(a) ? [a] : []
	}

	function f(a) {
		var c, d, e = {
				top: 0,
				left: 0
			},
			f = a && a.ownerDocument;
		return c = f.documentElement, void 0 !== a.getBoundingClientRect && (e = a.getBoundingClientRect()), d = b(f), {
			top: e.top + d.pageYOffset - c.clientTop,
			left: e.left + d.pageXOffset - c.clientLeft
		}
	}

	function g(a) {
		var b = "";
		for(var c in a) a.hasOwnProperty(c) && (b += c + ":" + a[c] + ";");
		return b
	}

	function h(a, b, c) {
		if(c) {
			c.classList.remove("waves-rippling");
			var d = c.getAttribute("data-x"),
				e = c.getAttribute("data-y"),
				f = c.getAttribute("data-scale"),
				h = c.getAttribute("data-translate"),
				i = Date.now() - Number(c.getAttribute("data-hold")),
				j = 350 - i;
			j < 0 && (j = 0), "mousemove" === a.type && (j = 150);
			var k = "mousemove" === a.type ? 2500 : o.duration;
			setTimeout(function() {
				var a = {
					top: e + "px",
					left: d + "px",
					opacity: "0",
					"-webkit-transition-duration": k + "ms",
					"-moz-transition-duration": k + "ms",
					"-o-transition-duration": k + "ms",
					"transition-duration": k + "ms",
					"-webkit-transform": f + " " + h,
					"-moz-transform": f + " " + h,
					"-ms-transform": f + " " + h,
					"-o-transform": f + " " + h,
					transform: f + " " + h
				};
				c.setAttribute("style", g(a)), setTimeout(function() {
					try {
						b.removeChild(c)
					} catch(a) {
						return !1
					}
				}, k)
			}, j)
		}
	}

	function i(a) {
		if(!1 === q.allowEvent(a)) return null;
		for(var b = null, c = a.target || a.srcElement; null !== c.parentElement;) {
			if(c.classList.contains("waves-effect") && !(c instanceof SVGElement)) {
				b = c;
				break
			}
			c = c.parentElement
		}
		return b
	}

	function j(a) {
		var b = i(a);
		if(null !== b) {
			if(b.disabled || b.getAttribute("disabled") || b.classList.contains("disabled")) return;
			if(q.registerEvent(a), "touchstart" === a.type && o.delay) {
				var c = !1,
					d = setTimeout(function() {
						d = null, o.show(a, b)
					}, o.delay),
					e = function(e) {
						d && (clearTimeout(d), d = null, o.show(a, b)), c || (c = !0, o.hide(e, b))
					},
					f = function(a) {
						d && (clearTimeout(d), d = null), e(a)
					};
				b.addEventListener("touchmove", f, !1), b.addEventListener("touchend", e, !1), b.addEventListener("touchcancel", e, !1)
			} else o.show(a, b), n && (b.addEventListener("touchend", o.hide, !1), b.addEventListener("touchcancel", o.hide, !1)), b.addEventListener("mouseup", o.hide, !1), b.addEventListener("mouseleave", o.hide, !1)
		}
	}
	var k = k || {},
		l = document.querySelectorAll.bind(document),
		m = Object.prototype.toString,
		n = "ontouchstart" in window,
		o = {
			duration: 750,
			delay: 200,
			show: function(a, b, c) {
				if(2 === a.button) return !1;
				b = b || this;
				var d = document.createElement("div");
				d.className = "waves-ripple waves-rippling", b.appendChild(d);
				var e = f(b),
					h = 0,
					i = 0;
				"touches" in a && a.touches.length ? (h = a.touches[0].pageY - e.top, i = a.touches[0].pageX - e.left) : (h = a.pageY - e.top, i = a.pageX - e.left), i = i >= 0 ? i : 0, h = h >= 0 ? h : 0;
				var j = "scale(" + b.clientWidth / 100 * 3 + ")",
					k = "translate(0,0)";
				c && (k = "translate(" + c.x + "px, " + c.y + "px)"), d.setAttribute("data-hold", Date.now()), d.setAttribute("data-x", i), d.setAttribute("data-y", h), d.setAttribute("data-scale", j), d.setAttribute("data-translate", k);
				var l = {
					top: h + "px",
					left: i + "px"
				};
				d.classList.add("waves-notransition"), d.setAttribute("style", g(l)), d.classList.remove("waves-notransition"), l["-webkit-transform"] = j + " " + k, l["-moz-transform"] = j + " " + k, l["-ms-transform"] = j + " " + k, l["-o-transform"] = j + " " + k, l.transform = j + " " + k, l.opacity = "1";
				var m = "mousemove" === a.type ? 2500 : o.duration;
				l["-webkit-transition-duration"] = m + "ms", l["-moz-transition-duration"] = m + "ms", l["-o-transition-duration"] = m + "ms", l["transition-duration"] = m + "ms", d.setAttribute("style", g(l))
			},
			hide: function(a, b) {
				b = b || this;
				for(var c = b.getElementsByClassName("waves-rippling"), d = 0, e = c.length; d < e; d++) h(a, b, c[d])
			}
		},
		p = {
			input: function(a) {
				var b = a.parentNode;
				if("i" !== b.tagName.toLowerCase() || !b.classList.contains("waves-effect")) {
					var c = document.createElement("i");
					c.className = a.className + " waves-input-wrapper", a.className = "waves-button-input", b.replaceChild(c, a), c.appendChild(a);
					var d = window.getComputedStyle(a, null),
						e = d.color,
						f = d.backgroundColor;
					c.setAttribute("style", "color:" + e + ";background:" + f), a.setAttribute("style", "background-color:rgba(0,0,0,0);")
				}
			},
			img: function(a) {
				var b = a.parentNode;
				if("i" !== b.tagName.toLowerCase() || !b.classList.contains("waves-effect")) {
					var c = document.createElement("i");
					b.replaceChild(c, a), c.appendChild(a)
				}
			}
		},
		q = {
			touches: 0,
			allowEvent: function(a) {
				var b = !0;
				return /^(mousedown|mousemove)$/.test(a.type) && q.touches && (b = !1), b
			},
			registerEvent: function(a) {
				var b = a.type;
				"touchstart" === b ? q.touches += 1 : /^(touchend|touchcancel)$/.test(b) && setTimeout(function() {
					q.touches && (q.touches -= 1)
				}, 500)
			}
		};
	return k.init = function(a) {
		var b = document.body;
		a = a || {}, "duration" in a && (o.duration = a.duration), "delay" in a && (o.delay = a.delay), n && (b.addEventListener("touchstart", j, !1), b.addEventListener("touchcancel", q.registerEvent, !1), b.addEventListener("touchend", q.registerEvent, !1)), b.addEventListener("mousedown", j, !1)
	}, k.attach = function(a, b) {
		a = e(a), "[object Array]" === m.call(b) && (b = b.join(" ")), b = b ? " " + b : "";
		for(var c, d, f = 0, g = a.length; f < g; f++) c = a[f], d = c.tagName.toLowerCase(), -1 !== ["input", "img"].indexOf(d) && (p[d](c), c = c.parentElement), -1 === c.className.indexOf("waves-effect") && (c.className += " waves-effect" + b)
	}, k.ripple = function(a, b) {
		a = e(a);
		var c = a.length;
		if(b = b || {}, b.wait = b.wait || 0, b.position = b.position || null, c)
			for(var d, g, h, i = {}, j = 0, k = {
					type: "mousedown",
					button: 1
				}; j < c; j++)
				if(d = a[j], g = b.position || {
						x: d.clientWidth / 2,
						y: d.clientHeight / 2
					}, h = f(d), i.x = h.left + g.x, i.y = h.top + g.y, k.pageX = i.x, k.pageY = i.y, o.show(k, d), b.wait >= 0 && null !== b.wait) {
					var l = {
						type: "mouseup",
						button: 1
					};
					setTimeout(function(a, b) {
						return function() {
							o.hide(a, b)
						}
					}(l, d), b.wait)
				}
	}, k.calm = function(a) {
		a = e(a);
		for(var b = {
				type: "mouseup",
				button: 1
			}, c = 0, d = a.length; c < d; c++) o.hide(b, a[c])
	}, k.displayEffect = function(a) {
		console.error("Waves.displayEffect() has been deprecated and will be removed in future version. Please use Waves.init() to initialize Waves effect"), k.init(a)
	}, k
});