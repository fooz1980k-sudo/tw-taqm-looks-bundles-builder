var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js
var t, e, s, o, n, r, i, S, c;
var init_css_tag = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js"() {
    t = globalThis;
    e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
    s = Symbol();
    o = /* @__PURE__ */ new WeakMap();
    n = class {
      constructor(t3, e5, o6) {
        if (this._$cssResult$ = true, o6 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t3, this.t = e5;
      }
      get styleSheet() {
        let t3 = this.o;
        const s4 = this.t;
        if (e && void 0 === t3) {
          const e5 = void 0 !== s4 && 1 === s4.length;
          e5 && (t3 = o.get(s4)), void 0 === t3 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e5 && o.set(s4, t3));
        }
        return t3;
      }
      toString() {
        return this.cssText;
      }
    };
    r = (t3) => new n("string" == typeof t3 ? t3 : t3 + "", void 0, s);
    i = (t3, ...e5) => {
      const o6 = 1 === t3.length ? t3[0] : e5.reduce((e6, s4, o7) => e6 + ((t4) => {
        if (true === t4._$cssResult$) return t4.cssText;
        if ("number" == typeof t4) return t4;
        throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
      })(s4) + t3[o7 + 1], t3[0]);
      return new n(o6, t3, s);
    };
    S = (s4, o6) => {
      if (e) s4.adoptedStyleSheets = o6.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet);
      else for (const e5 of o6) {
        const o7 = document.createElement("style"), n5 = t.litNonce;
        void 0 !== n5 && o7.setAttribute("nonce", n5), o7.textContent = e5.cssText, s4.appendChild(o7);
      }
    };
    c = e ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
      let e5 = "";
      for (const s4 of t4.cssRules) e5 += s4.cssText;
      return r(e5);
    })(t3) : t3;
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js
var i2, e2, h, r2, o2, n2, a, c2, l, p, d, u, f, b, y;
var init_reactive_element = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js"() {
    init_css_tag();
    init_css_tag();
    ({ is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object);
    a = globalThis;
    c2 = a.trustedTypes;
    l = c2 ? c2.emptyScript : "";
    p = a.reactiveElementPolyfillSupport;
    d = (t3, s4) => t3;
    u = { toAttribute(t3, s4) {
      switch (s4) {
        case Boolean:
          t3 = t3 ? l : null;
          break;
        case Object:
        case Array:
          t3 = null == t3 ? t3 : JSON.stringify(t3);
      }
      return t3;
    }, fromAttribute(t3, s4) {
      let i5 = t3;
      switch (s4) {
        case Boolean:
          i5 = null !== t3;
          break;
        case Number:
          i5 = null === t3 ? null : Number(t3);
          break;
        case Object:
        case Array:
          try {
            i5 = JSON.parse(t3);
          } catch (t4) {
            i5 = null;
          }
      }
      return i5;
    } };
    f = (t3, s4) => !i2(t3, s4);
    b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
    Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
    y = class extends HTMLElement {
      static addInitializer(t3) {
        this._$Ei(), (this.l ??= []).push(t3);
      }
      static get observedAttributes() {
        return this.finalize(), this._$Eh && [...this._$Eh.keys()];
      }
      static createProperty(t3, s4 = b) {
        if (s4.state && (s4.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t3) && ((s4 = Object.create(s4)).wrapped = true), this.elementProperties.set(t3, s4), !s4.noAccessor) {
          const i5 = Symbol(), h7 = this.getPropertyDescriptor(t3, i5, s4);
          void 0 !== h7 && e2(this.prototype, t3, h7);
        }
      }
      static getPropertyDescriptor(t3, s4, i5) {
        const { get: e5, set: r6 } = h(this.prototype, t3) ?? { get() {
          return this[s4];
        }, set(t4) {
          this[s4] = t4;
        } };
        return { get: e5, set(s5) {
          const h7 = e5?.call(this);
          r6?.call(this, s5), this.requestUpdate(t3, h7, i5);
        }, configurable: true, enumerable: true };
      }
      static getPropertyOptions(t3) {
        return this.elementProperties.get(t3) ?? b;
      }
      static _$Ei() {
        if (this.hasOwnProperty(d("elementProperties"))) return;
        const t3 = n2(this);
        t3.finalize(), void 0 !== t3.l && (this.l = [...t3.l]), this.elementProperties = new Map(t3.elementProperties);
      }
      static finalize() {
        if (this.hasOwnProperty(d("finalized"))) return;
        if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
          const t4 = this.properties, s4 = [...r2(t4), ...o2(t4)];
          for (const i5 of s4) this.createProperty(i5, t4[i5]);
        }
        const t3 = this[Symbol.metadata];
        if (null !== t3) {
          const s4 = litPropertyMetadata.get(t3);
          if (void 0 !== s4) for (const [t4, i5] of s4) this.elementProperties.set(t4, i5);
        }
        this._$Eh = /* @__PURE__ */ new Map();
        for (const [t4, s4] of this.elementProperties) {
          const i5 = this._$Eu(t4, s4);
          void 0 !== i5 && this._$Eh.set(i5, t4);
        }
        this.elementStyles = this.finalizeStyles(this.styles);
      }
      static finalizeStyles(s4) {
        const i5 = [];
        if (Array.isArray(s4)) {
          const e5 = new Set(s4.flat(1 / 0).reverse());
          for (const s5 of e5) i5.unshift(c(s5));
        } else void 0 !== s4 && i5.push(c(s4));
        return i5;
      }
      static _$Eu(t3, s4) {
        const i5 = s4.attribute;
        return false === i5 ? void 0 : "string" == typeof i5 ? i5 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
      }
      constructor() {
        super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
      }
      _$Ev() {
        this._$ES = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t3) => t3(this));
      }
      addController(t3) {
        (this._$EO ??= /* @__PURE__ */ new Set()).add(t3), void 0 !== this.renderRoot && this.isConnected && t3.hostConnected?.();
      }
      removeController(t3) {
        this._$EO?.delete(t3);
      }
      _$E_() {
        const t3 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
        for (const i5 of s4.keys()) this.hasOwnProperty(i5) && (t3.set(i5, this[i5]), delete this[i5]);
        t3.size > 0 && (this._$Ep = t3);
      }
      createRenderRoot() {
        const t3 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
        return S(t3, this.constructor.elementStyles), t3;
      }
      connectedCallback() {
        this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t3) => t3.hostConnected?.());
      }
      enableUpdating(t3) {
      }
      disconnectedCallback() {
        this._$EO?.forEach((t3) => t3.hostDisconnected?.());
      }
      attributeChangedCallback(t3, s4, i5) {
        this._$AK(t3, i5);
      }
      _$ET(t3, s4) {
        const i5 = this.constructor.elementProperties.get(t3), e5 = this.constructor._$Eu(t3, i5);
        if (void 0 !== e5 && true === i5.reflect) {
          const h7 = (void 0 !== i5.converter?.toAttribute ? i5.converter : u).toAttribute(s4, i5.type);
          this._$Em = t3, null == h7 ? this.removeAttribute(e5) : this.setAttribute(e5, h7), this._$Em = null;
        }
      }
      _$AK(t3, s4) {
        const i5 = this.constructor, e5 = i5._$Eh.get(t3);
        if (void 0 !== e5 && this._$Em !== e5) {
          const t4 = i5.getPropertyOptions(e5), h7 = "function" == typeof t4.converter ? { fromAttribute: t4.converter } : void 0 !== t4.converter?.fromAttribute ? t4.converter : u;
          this._$Em = e5;
          const r6 = h7.fromAttribute(s4, t4.type);
          this[e5] = r6 ?? this._$Ej?.get(e5) ?? r6, this._$Em = null;
        }
      }
      requestUpdate(t3, s4, i5, e5 = false, h7) {
        if (void 0 !== t3) {
          const r6 = this.constructor;
          if (false === e5 && (h7 = this[t3]), i5 ??= r6.getPropertyOptions(t3), !((i5.hasChanged ?? f)(h7, s4) || i5.useDefault && i5.reflect && h7 === this._$Ej?.get(t3) && !this.hasAttribute(r6._$Eu(t3, i5)))) return;
          this.C(t3, s4, i5);
        }
        false === this.isUpdatePending && (this._$ES = this._$EP());
      }
      C(t3, s4, { useDefault: i5, reflect: e5, wrapped: h7 }, r6) {
        i5 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t3) && (this._$Ej.set(t3, r6 ?? s4 ?? this[t3]), true !== h7 || void 0 !== r6) || (this._$AL.has(t3) || (this.hasUpdated || i5 || (s4 = void 0), this._$AL.set(t3, s4)), true === e5 && this._$Em !== t3 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t3));
      }
      async _$EP() {
        this.isUpdatePending = true;
        try {
          await this._$ES;
        } catch (t4) {
          Promise.reject(t4);
        }
        const t3 = this.scheduleUpdate();
        return null != t3 && await t3, !this.isUpdatePending;
      }
      scheduleUpdate() {
        return this.performUpdate();
      }
      performUpdate() {
        if (!this.isUpdatePending) return;
        if (!this.hasUpdated) {
          if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
            for (const [t5, s5] of this._$Ep) this[t5] = s5;
            this._$Ep = void 0;
          }
          const t4 = this.constructor.elementProperties;
          if (t4.size > 0) for (const [s5, i5] of t4) {
            const { wrapped: t5 } = i5, e5 = this[s5];
            true !== t5 || this._$AL.has(s5) || void 0 === e5 || this.C(s5, void 0, i5, e5);
          }
        }
        let t3 = false;
        const s4 = this._$AL;
        try {
          t3 = this.shouldUpdate(s4), t3 ? (this.willUpdate(s4), this._$EO?.forEach((t4) => t4.hostUpdate?.()), this.update(s4)) : this._$EM();
        } catch (s5) {
          throw t3 = false, this._$EM(), s5;
        }
        t3 && this._$AE(s4);
      }
      willUpdate(t3) {
      }
      _$AE(t3) {
        this._$EO?.forEach((t4) => t4.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
      }
      _$EM() {
        this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
      }
      get updateComplete() {
        return this.getUpdateComplete();
      }
      getUpdateComplete() {
        return this._$ES;
      }
      shouldUpdate(t3) {
        return true;
      }
      update(t3) {
        this._$Eq &&= this._$Eq.forEach((t4) => this._$ET(t4, this[t4])), this._$EM();
      }
      updated(t3) {
      }
      firstUpdated(t3) {
      }
    };
    y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ??= []).push("2.1.2");
  }
});

// ../_kit/node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/lit-html.js
function V(t3, i5) {
  if (!u2(t3) || !t3.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i5) : i5;
}
function M(t3, i5, s4 = t3, e5) {
  if (i5 === E) return i5;
  let h7 = void 0 !== e5 ? s4._$Co?.[e5] : s4._$Cl;
  const o6 = a2(i5) ? void 0 : i5._$litDirective$;
  return h7?.constructor !== o6 && (h7?._$AO?.(false), void 0 === o6 ? h7 = void 0 : (h7 = new o6(t3), h7._$AT(t3, s4, e5)), void 0 !== e5 ? (s4._$Co ??= [])[e5] = h7 : s4._$Cl = h7), void 0 !== h7 && (i5 = M(t3, h7._$AS(t3, i5.values), h7, e5)), i5;
}
var t2, i3, s2, e3, h2, o3, n3, r3, l2, c3, a2, u2, d2, f2, v, _, m, p2, g, $, y2, x, b2, w, T, E, A, C, P, N, S2, R, k, H, I, L, z, Z, B, D;
var init_lit_html = __esm({
  "../_kit/node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/lit-html.js"() {
    t2 = globalThis;
    i3 = (t3) => t3;
    s2 = t2.trustedTypes;
    e3 = s2 ? s2.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
    h2 = "$lit$";
    o3 = `lit$${Math.random().toFixed(9).slice(2)}$`;
    n3 = "?" + o3;
    r3 = `<${n3}>`;
    l2 = document;
    c3 = () => l2.createComment("");
    a2 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3;
    u2 = Array.isArray;
    d2 = (t3) => u2(t3) || "function" == typeof t3?.[Symbol.iterator];
    f2 = "[ 	\n\f\r]";
    v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
    _ = /-->/g;
    m = />/g;
    p2 = RegExp(`>|${f2}(?:([^\\s"'>=/]+)(${f2}*=${f2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
    g = /'/g;
    $ = /"/g;
    y2 = /^(?:script|style|textarea|title)$/i;
    x = (t3) => (i5, ...s4) => ({ _$litType$: t3, strings: i5, values: s4 });
    b2 = x(1);
    w = x(2);
    T = x(3);
    E = Symbol.for("lit-noChange");
    A = Symbol.for("lit-nothing");
    C = /* @__PURE__ */ new WeakMap();
    P = l2.createTreeWalker(l2, 129);
    N = (t3, i5) => {
      const s4 = t3.length - 1, e5 = [];
      let n5, l3 = 2 === i5 ? "<svg>" : 3 === i5 ? "<math>" : "", c4 = v;
      for (let i6 = 0; i6 < s4; i6++) {
        const s5 = t3[i6];
        let a3, u5, d6 = -1, f4 = 0;
        for (; f4 < s5.length && (c4.lastIndex = f4, u5 = c4.exec(s5), null !== u5); ) f4 = c4.lastIndex, c4 === v ? "!--" === u5[1] ? c4 = _ : void 0 !== u5[1] ? c4 = m : void 0 !== u5[2] ? (y2.test(u5[2]) && (n5 = RegExp("</" + u5[2], "g")), c4 = p2) : void 0 !== u5[3] && (c4 = p2) : c4 === p2 ? ">" === u5[0] ? (c4 = n5 ?? v, d6 = -1) : void 0 === u5[1] ? d6 = -2 : (d6 = c4.lastIndex - u5[2].length, a3 = u5[1], c4 = void 0 === u5[3] ? p2 : '"' === u5[3] ? $ : g) : c4 === $ || c4 === g ? c4 = p2 : c4 === _ || c4 === m ? c4 = v : (c4 = p2, n5 = void 0);
        const x7 = c4 === p2 && t3[i6 + 1].startsWith("/>") ? " " : "";
        l3 += c4 === v ? s5 + r3 : d6 >= 0 ? (e5.push(a3), s5.slice(0, d6) + h2 + s5.slice(d6) + o3 + x7) : s5 + o3 + (-2 === d6 ? i6 : x7);
      }
      return [V(t3, l3 + (t3[s4] || "<?>") + (2 === i5 ? "</svg>" : 3 === i5 ? "</math>" : "")), e5];
    };
    S2 = class _S {
      constructor({ strings: t3, _$litType$: i5 }, e5) {
        let r6;
        this.parts = [];
        let l3 = 0, a3 = 0;
        const u5 = t3.length - 1, d6 = this.parts, [f4, v6] = N(t3, i5);
        if (this.el = _S.createElement(f4, e5), P.currentNode = this.el.content, 2 === i5 || 3 === i5) {
          const t4 = this.el.content.firstChild;
          t4.replaceWith(...t4.childNodes);
        }
        for (; null !== (r6 = P.nextNode()) && d6.length < u5; ) {
          if (1 === r6.nodeType) {
            if (r6.hasAttributes()) for (const t4 of r6.getAttributeNames()) if (t4.endsWith(h2)) {
              const i6 = v6[a3++], s4 = r6.getAttribute(t4).split(o3), e6 = /([.?@])?(.*)/.exec(i6);
              d6.push({ type: 1, index: l3, name: e6[2], strings: s4, ctor: "." === e6[1] ? I : "?" === e6[1] ? L : "@" === e6[1] ? z : H }), r6.removeAttribute(t4);
            } else t4.startsWith(o3) && (d6.push({ type: 6, index: l3 }), r6.removeAttribute(t4));
            if (y2.test(r6.tagName)) {
              const t4 = r6.textContent.split(o3), i6 = t4.length - 1;
              if (i6 > 0) {
                r6.textContent = s2 ? s2.emptyScript : "";
                for (let s4 = 0; s4 < i6; s4++) r6.append(t4[s4], c3()), P.nextNode(), d6.push({ type: 2, index: ++l3 });
                r6.append(t4[i6], c3());
              }
            }
          } else if (8 === r6.nodeType) if (r6.data === n3) d6.push({ type: 2, index: l3 });
          else {
            let t4 = -1;
            for (; -1 !== (t4 = r6.data.indexOf(o3, t4 + 1)); ) d6.push({ type: 7, index: l3 }), t4 += o3.length - 1;
          }
          l3++;
        }
      }
      static createElement(t3, i5) {
        const s4 = l2.createElement("template");
        return s4.innerHTML = t3, s4;
      }
    };
    R = class {
      constructor(t3, i5) {
        this._$AV = [], this._$AN = void 0, this._$AD = t3, this._$AM = i5;
      }
      get parentNode() {
        return this._$AM.parentNode;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      u(t3) {
        const { el: { content: i5 }, parts: s4 } = this._$AD, e5 = (t3?.creationScope ?? l2).importNode(i5, true);
        P.currentNode = e5;
        let h7 = P.nextNode(), o6 = 0, n5 = 0, r6 = s4[0];
        for (; void 0 !== r6; ) {
          if (o6 === r6.index) {
            let i6;
            2 === r6.type ? i6 = new k(h7, h7.nextSibling, this, t3) : 1 === r6.type ? i6 = new r6.ctor(h7, r6.name, r6.strings, this, t3) : 6 === r6.type && (i6 = new Z(h7, this, t3)), this._$AV.push(i6), r6 = s4[++n5];
          }
          o6 !== r6?.index && (h7 = P.nextNode(), o6++);
        }
        return P.currentNode = l2, e5;
      }
      p(t3) {
        let i5 = 0;
        for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t3, s4, i5), i5 += s4.strings.length - 2) : s4._$AI(t3[i5])), i5++;
      }
    };
    k = class _k {
      get _$AU() {
        return this._$AM?._$AU ?? this._$Cv;
      }
      constructor(t3, i5, s4, e5) {
        this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t3, this._$AB = i5, this._$AM = s4, this.options = e5, this._$Cv = e5?.isConnected ?? true;
      }
      get parentNode() {
        let t3 = this._$AA.parentNode;
        const i5 = this._$AM;
        return void 0 !== i5 && 11 === t3?.nodeType && (t3 = i5.parentNode), t3;
      }
      get startNode() {
        return this._$AA;
      }
      get endNode() {
        return this._$AB;
      }
      _$AI(t3, i5 = this) {
        t3 = M(this, t3, i5), a2(t3) ? t3 === A || null == t3 || "" === t3 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t3 !== this._$AH && t3 !== E && this._(t3) : void 0 !== t3._$litType$ ? this.$(t3) : void 0 !== t3.nodeType ? this.T(t3) : d2(t3) ? this.k(t3) : this._(t3);
      }
      O(t3) {
        return this._$AA.parentNode.insertBefore(t3, this._$AB);
      }
      T(t3) {
        this._$AH !== t3 && (this._$AR(), this._$AH = this.O(t3));
      }
      _(t3) {
        this._$AH !== A && a2(this._$AH) ? this._$AA.nextSibling.data = t3 : this.T(l2.createTextNode(t3)), this._$AH = t3;
      }
      $(t3) {
        const { values: i5, _$litType$: s4 } = t3, e5 = "number" == typeof s4 ? this._$AC(t3) : (void 0 === s4.el && (s4.el = S2.createElement(V(s4.h, s4.h[0]), this.options)), s4);
        if (this._$AH?._$AD === e5) this._$AH.p(i5);
        else {
          const t4 = new R(e5, this), s5 = t4.u(this.options);
          t4.p(i5), this.T(s5), this._$AH = t4;
        }
      }
      _$AC(t3) {
        let i5 = C.get(t3.strings);
        return void 0 === i5 && C.set(t3.strings, i5 = new S2(t3)), i5;
      }
      k(t3) {
        u2(this._$AH) || (this._$AH = [], this._$AR());
        const i5 = this._$AH;
        let s4, e5 = 0;
        for (const h7 of t3) e5 === i5.length ? i5.push(s4 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s4 = i5[e5], s4._$AI(h7), e5++;
        e5 < i5.length && (this._$AR(s4 && s4._$AB.nextSibling, e5), i5.length = e5);
      }
      _$AR(t3 = this._$AA.nextSibling, s4) {
        for (this._$AP?.(false, true, s4); t3 !== this._$AB; ) {
          const s5 = i3(t3).nextSibling;
          i3(t3).remove(), t3 = s5;
        }
      }
      setConnected(t3) {
        void 0 === this._$AM && (this._$Cv = t3, this._$AP?.(t3));
      }
    };
    H = class {
      get tagName() {
        return this.element.tagName;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      constructor(t3, i5, s4, e5, h7) {
        this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t3, this.name = i5, this._$AM = e5, this.options = h7, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = A;
      }
      _$AI(t3, i5 = this, s4, e5) {
        const h7 = this.strings;
        let o6 = false;
        if (void 0 === h7) t3 = M(this, t3, i5, 0), o6 = !a2(t3) || t3 !== this._$AH && t3 !== E, o6 && (this._$AH = t3);
        else {
          const e6 = t3;
          let n5, r6;
          for (t3 = h7[0], n5 = 0; n5 < h7.length - 1; n5++) r6 = M(this, e6[s4 + n5], i5, n5), r6 === E && (r6 = this._$AH[n5]), o6 ||= !a2(r6) || r6 !== this._$AH[n5], r6 === A ? t3 = A : t3 !== A && (t3 += (r6 ?? "") + h7[n5 + 1]), this._$AH[n5] = r6;
        }
        o6 && !e5 && this.j(t3);
      }
      j(t3) {
        t3 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 ?? "");
      }
    };
    I = class extends H {
      constructor() {
        super(...arguments), this.type = 3;
      }
      j(t3) {
        this.element[this.name] = t3 === A ? void 0 : t3;
      }
    };
    L = class extends H {
      constructor() {
        super(...arguments), this.type = 4;
      }
      j(t3) {
        this.element.toggleAttribute(this.name, !!t3 && t3 !== A);
      }
    };
    z = class extends H {
      constructor(t3, i5, s4, e5, h7) {
        super(t3, i5, s4, e5, h7), this.type = 5;
      }
      _$AI(t3, i5 = this) {
        if ((t3 = M(this, t3, i5, 0) ?? A) === E) return;
        const s4 = this._$AH, e5 = t3 === A && s4 !== A || t3.capture !== s4.capture || t3.once !== s4.once || t3.passive !== s4.passive, h7 = t3 !== A && (s4 === A || e5);
        e5 && this.element.removeEventListener(this.name, this, s4), h7 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
      }
      handleEvent(t3) {
        "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t3) : this._$AH.handleEvent(t3);
      }
    };
    Z = class {
      constructor(t3, i5, s4) {
        this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s4;
      }
      get _$AU() {
        return this._$AM._$AU;
      }
      _$AI(t3) {
        M(this, t3);
      }
    };
    B = t2.litHtmlPolyfillSupport;
    B?.(S2, k), (t2.litHtmlVersions ??= []).push("3.3.3");
    D = (t3, i5, s4) => {
      const e5 = s4?.renderBefore ?? i5;
      let h7 = e5._$litPart$;
      if (void 0 === h7) {
        const t4 = s4?.renderBefore ?? null;
        e5._$litPart$ = h7 = new k(i5.insertBefore(c3(), t4), t4, void 0, s4 ?? {});
      }
      return h7._$AI(t3), h7;
    };
  }
});

// ../_kit/node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js
var s3, i4, o4;
var init_lit_element = __esm({
  "../_kit/node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js"() {
    init_reactive_element();
    init_reactive_element();
    init_lit_html();
    init_lit_html();
    s3 = globalThis;
    i4 = class extends y {
      constructor() {
        super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
      }
      createRenderRoot() {
        const t3 = super.createRenderRoot();
        return this.renderOptions.renderBefore ??= t3.firstChild, t3;
      }
      update(t3) {
        const r6 = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = D(r6, this.renderRoot, this.renderOptions);
      }
      connectedCallback() {
        super.connectedCallback(), this._$Do?.setConnected(true);
      }
      disconnectedCallback() {
        super.disconnectedCallback(), this._$Do?.setConnected(false);
      }
      render() {
        return E;
      }
    };
    i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
    o4 = s3.litElementPolyfillSupport;
    o4?.({ LitElement: i4 });
    (s3.litElementVersions ??= []).push("4.2.2");
  }
});

// ../_kit/node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/is-server.js
var init_is_server = __esm({
  "../_kit/node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/is-server.js"() {
  }
});

// ../_kit/node_modules/.pnpm/lit@3.3.3/node_modules/lit/index.js
var init_lit = __esm({
  "../_kit/node_modules/.pnpm/lit@3.3.3/node_modules/lit/index.js"() {
    init_reactive_element();
    init_lit_html();
    init_lit_element();
    init_is_server();
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/custom-element.js
var init_custom_element = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/custom-element.js"() {
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js
function n4(t3) {
  return (e5, o6) => "object" == typeof o6 ? r4(t3, e5, o6) : ((t4, e6, o7) => {
    const r6 = e6.hasOwnProperty(o7);
    return e6.constructor.createProperty(o7, t4), r6 ? Object.getOwnPropertyDescriptor(e6, o7) : void 0;
  })(t3, e5, o6);
}
var o5, r4;
var init_property = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js"() {
    init_reactive_element();
    o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
    r4 = (t3 = o5, e5, r6) => {
      const { kind: n5, metadata: i5 } = r6;
      let s4 = globalThis.litPropertyMetadata.get(i5);
      if (void 0 === s4 && globalThis.litPropertyMetadata.set(i5, s4 = /* @__PURE__ */ new Map()), "setter" === n5 && ((t3 = Object.create(t3)).wrapped = true), s4.set(r6.name, t3), "accessor" === n5) {
        const { name: o6 } = r6;
        return { set(r7) {
          const n6 = e5.get.call(this);
          e5.set.call(this, r7), this.requestUpdate(o6, n6, t3, true, r7);
        }, init(e6) {
          return void 0 !== e6 && this.C(o6, void 0, t3, e6), e6;
        } };
      }
      if ("setter" === n5) {
        const { name: o6 } = r6;
        return function(r7) {
          const n6 = this[o6];
          e5.call(this, r7), this.requestUpdate(o6, n6, t3, true, r7);
        };
      }
      throw Error("Unsupported decorator location: " + n5);
    };
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/state.js
function r5(r6) {
  return n4({ ...r6, state: true, attribute: false });
}
var init_state = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/state.js"() {
    init_property();
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/event-options.js
var init_event_options = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/event-options.js"() {
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/base.js
var init_base = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/base.js"() {
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query.js
var init_query = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query.js"() {
    init_base();
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-all.js
var init_query_all = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-all.js"() {
    init_base();
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-async.js
var init_query_async = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-async.js"() {
    init_base();
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
var init_query_assigned_elements = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-assigned-elements.js"() {
    init_base();
  }
});

// ../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js
var init_query_assigned_nodes = __esm({
  "../_kit/node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js"() {
    init_base();
  }
});

// ../_kit/node_modules/.pnpm/lit@3.3.3/node_modules/lit/decorators.js
var init_decorators = __esm({
  "../_kit/node_modules/.pnpm/lit@3.3.3/node_modules/lit/decorators.js"() {
    init_custom_element();
    init_property();
    init_state();
    init_event_options();
    init_query();
    init_query_all();
    init_query_async();
    init_query_assigned_elements();
    init_query_assigned_nodes();
  }
});

// dist/taqm-builder.js
var taqm_builder_exports = {};
__export(taqm_builder_exports, {
  default: () => $2
});
function H2(t3) {
  var l3, g5, p5, m6, o6, u5, f4, R3, B6;
  const e5 = v2(t3 == null ? void 0 : t3.sale_price), a3 = v2((t3 == null ? void 0 : t3.regular_price) ?? (t3 == null ? void 0 : t3.price)), r6 = e5 && e5 < a3 ? e5 : v2(t3 == null ? void 0 : t3.price) || a3, i5 = Math.max(v2(t3 == null ? void 0 : t3.regular_price), v2(t3 == null ? void 0 : t3.price), r6), s4 = (Array.isArray(t3 == null ? void 0 : t3.images) ? t3.images : []).map((S4) => String((S4 == null ? void 0 : S4.url) ?? S4 ?? "")).filter(Boolean), n5 = (t3 == null ? void 0 : t3.sold_quantity) ?? (t3 == null ? void 0 : t3.sold);
  return {
    id: Number(t3 == null ? void 0 : t3.id),
    name: String((t3 == null ? void 0 : t3.name) ?? ""),
    url: String((t3 == null ? void 0 : t3.url) ?? "#"),
    image: String(((l3 = t3 == null ? void 0 : t3.image) == null ? void 0 : l3.url) ?? (t3 == null ? void 0 : t3.main_image) ?? (t3 == null ? void 0 : t3.thumbnail) ?? s4[0] ?? ""),
    images: s4,
    price: r6,
    regular: i5,
    discount: i5 > r6 ? Math.round((1 - r6 / i5) * 100) : 0,
    rating: v2(((g5 = t3 == null ? void 0 : t3.rating) == null ? void 0 : g5.stars) ?? ((p5 = t3 == null ? void 0 : t3.rating) == null ? void 0 : p5.rate) ?? (t3 == null ? void 0 : t3.rating)),
    ratingCount: v2((m6 = t3 == null ? void 0 : t3.rating) == null ? void 0 : m6.count),
    qty: (t3 == null ? void 0 : t3.quantity) == null || t3 != null && t3.unlimited_quantity ? null : v2(t3 == null ? void 0 : t3.quantity),
    available: (t3 == null ? void 0 : t3.is_available) !== false && (t3 == null ? void 0 : t3.status) !== "out" && !((t3 == null ? void 0 : t3.quantity) === 0 && !(t3 != null && t3.unlimited_quantity)),
    sold: n5 == null || n5 === "" || !Number.isFinite(Number(n5)) ? null : Number(n5),
    endsAt: tt((t3 == null ? void 0 : t3.discount_ends) ?? (t3 == null ? void 0 : t3.sale_end) ?? (t3 == null ? void 0 : t3.discount_end)),
    category: String(((o6 = t3 == null ? void 0 : t3.category) == null ? void 0 : o6.name) ?? ((f4 = (u5 = t3 == null ? void 0 : t3.categories) == null ? void 0 : u5[0]) == null ? void 0 : f4.name) ?? ""),
    brand: String(((R3 = t3 == null ? void 0 : t3.brand) == null ? void 0 : R3.name) ?? ""),
    promo: String(((B6 = t3 == null ? void 0 : t3.promotion) == null ? void 0 : B6.title) ?? (t3 == null ? void 0 : t3.promotion_title) ?? "")
  };
}
async function et(t3) {
  var r6, i5, s4;
  const e5 = (r6 = x2()) == null ? void 0 : r6.product;
  if (!e5) return null;
  const a3 = e5.getDetails ? e5.getDetails.bind(e5) : (s4 = (i5 = e5.api) == null ? void 0 : i5.getDetails) == null ? void 0 : s4.bind(e5.api);
  if (!a3) return null;
  try {
    const n5 = await a3(t3, ["images", "sold_quantity", "category"]), l3 = H2((n5 == null ? void 0 : n5.data) ?? n5);
    return l3.name ? l3 : null;
  } catch {
    return null;
  }
}
async function J(t3) {
  await D2();
  const e5 = "ids:" + t3.join(",");
  return _2.has(e5) || _2.set(e5, Promise.all(t3.map(et)).then((a3) => a3.filter((r6) => !!r6))), _2.get(e5);
}
async function O(t3, e5 = [], a3 = 12) {
  await D2();
  const r6 = `src:${t3}:${e5.join(",")}:${a3}`;
  return _2.has(r6) || _2.set(r6, (async () => {
    var n5, l3, g5, p5;
    const i5 = (n5 = x2()) == null ? void 0 : n5.product, s4 = i5 != null && i5.fetch ? i5.fetch.bind(i5) : (g5 = (l3 = i5 == null ? void 0 : i5.api) == null ? void 0 : l3.fetch) == null ? void 0 : g5.bind(i5.api);
    if (!s4) return [];
    try {
      const m6 = { source: t3, per_page: a3 };
      e5.length && (m6.source_value = e5);
      const o6 = await s4(m6);
      return (Array.isArray(o6 == null ? void 0 : o6.data) ? o6.data : Array.isArray(o6) ? o6 : ((p5 = o6 == null ? void 0 : o6.data) == null ? void 0 : p5.products) ?? []).map(H2).filter((f4) => f4.name).slice(0, a3);
    } catch {
      return [];
    }
  })()), _2.get(r6);
}
async function at(t3, e5 = "best_selling", a3 = 12) {
  const r6 = j(t3);
  if (r6.length) return { items: (await J(r6)).slice(0, a3), auto: false };
  let i5 = await O(e5, [], a3);
  return !i5.length && e5 !== "latest" && (i5 = await O("latest", [], a3)), { items: i5, auto: true };
}
async function U(t3, e5 = 1, a3) {
  var r6, i5, s4;
  await D2();
  try {
    return await ((s4 = (i5 = (r6 = x2()) == null ? void 0 : r6.cart) == null ? void 0 : i5.addItem) == null ? void 0 : s4.call(i5, a3 ? { id: t3, quantity: e5, notes: a3 } : { id: t3, quantity: e5 })), true;
  } catch {
    return false;
  }
}
async function rt(t3) {
  var e5, a3, r6;
  if (!t3) return false;
  try {
    return await ((r6 = (a3 = (e5 = x2()) == null ? void 0 : e5.cart) == null ? void 0 : a3.addCoupon) == null ? void 0 : r6.call(a3, t3)), true;
  } catch {
    return false;
  }
}
function K(t3, e5 = true) {
  var a3, r6, i5;
  try {
    (i5 = e5 ? (a3 = x2()) == null ? void 0 : a3.success : (r6 = x2()) == null ? void 0 : r6.error) == null || i5(t3);
  } catch {
  }
}
function C2() {
  try {
    return { ...L2(), ...JSON.parse(localStorage.getItem(N2) || "{}") };
  } catch {
    return L2();
  }
}
function nt(t3) {
  try {
    localStorage.setItem(N2, JSON.stringify(t3));
  } catch {
  }
}
function G(t3) {
  const e5 = C2();
  return t3(e5), nt(e5), e5;
}
function st() {
  let t3 = false;
  try {
    t3 = !sessionStorage.getItem(N2), sessionStorage.setItem(N2, "1");
  } catch {
  }
  return t3 ? G((e5) => {
    e5.visits += 1, e5.last = Date.now();
  }) : C2();
}
function ot() {
  const t3 = [...C2().prices].sort((e5, a3) => e5 - a3);
  return t3.length >= 3 ? t3[Math.floor(t3.length / 2)] : 0;
}
function ct(t3, e5 = C2()) {
  let a3 = (e5.seen[t3.id] || 0) * 2 + (e5.carted.includes(t3.id) ? 4 : 0) + (t3.category && e5.tags[t3.category] || 0);
  const r6 = ot();
  return r6 && (a3 += Math.max(0, 2 - Math.abs(t3.price - r6) / r6 * 2)), a3;
}
function dt() {
  P2 || (P2 = true, it("cart::item.added", (t3) => {
    var a3;
    const e5 = Number(((a3 = t3 == null ? void 0 : t3.data) == null ? void 0 : a3.product_id) ?? 0);
    e5 && G((r6) => {
      r6.carted.includes(e5) || (r6.carted = [...r6.carted.slice(-40), e5]);
    });
  }));
}
function ht(t3) {
  const e5 = mt[t3];
  if (!e5 || T2.has(e5)) return e5;
  T2.add(e5);
  const a3 = document.createElement("link");
  return a3.rel = "stylesheet", a3.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(e5)}:wght@400;500;700;800&display=swap`, document.head.appendChild(a3), e5;
}
async function $t(t3, e5 = "") {
  let a3 = 0;
  for (const { p: r6, q: i5 } of t3) r6.available && await U(r6.id, i5 ?? 1) && a3++;
  return e5 && await rt(e5), K(a3 ? d3(`\u0623\u0636\u0641\u0646\u0627 ${a3} \u0645\u0646\u062A\u062C \u0644\u0644\u0633\u0644\u0629${e5 ? " \u0648\u0637\u0628\u0651\u0642\u0646\u0627 \u0627\u0644\u0643\u0648\u062F" : ""}`, `Added ${a3} items${e5 ? " and applied the code" : ""}`) : d3("\u062A\u0639\u0630\u0651\u0631\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629", "Could not add"), !!a3), a3;
}
var x2, D2, W, V2, d3, w2, y3, h3, b3, Z2, v2, tt, j, _2, k2, it, N2, L2, z2, lt, P2, ut, gt, pt, ft, mt, T2, bt, xt, F, A2, vt, yt, wt, kt, E2, I2, $2;
var init_taqm_builder = __esm({
  "dist/taqm-builder.js"() {
    "use strict";
    init_lit();
    init_decorators();
    x2 = () => window.salla ?? window.Salla;
    D2 = async () => {
      var t3, e5;
      try {
        await ((e5 = (t3 = x2()) == null ? void 0 : t3.onReady) == null ? void 0 : e5.call(t3));
      } catch {
      }
    };
    W = () => {
      var t3, e5, a3, r6, i5;
      try {
        const s4 = ((e5 = (t3 = x2()) == null ? void 0 : t3.lang) == null ? void 0 : e5.locale) ?? ((i5 = (r6 = (a3 = x2()) == null ? void 0 : a3.config) == null ? void 0 : r6.get) == null ? void 0 : i5.call(r6, "user.language_code"));
        if (typeof s4 == "string" && s4) return s4.slice(0, 2);
      } catch {
      }
      return (document.documentElement.lang || "ar").slice(0, 2);
    };
    V2 = () => W() === "en";
    d3 = (t3, e5) => V2() ? e5 : t3;
    w2 = (t3, e5 = "") => {
      if (t3 == null) return e5;
      if (typeof t3 == "string") {
        const a3 = t3.trim();
        if (a3.startsWith("{") && a3.endsWith("}"))
          try {
            return w2(JSON.parse(a3), e5);
          } catch {
          }
        return a3 || e5;
      }
      if (typeof t3 == "number" || typeof t3 == "boolean") return String(t3);
      if (typeof t3 == "object") {
        const a3 = t3, r6 = a3[W()] ?? a3.ar ?? a3.en ?? Object.values(a3).find((i5) => typeof i5 == "string" && i5);
        return typeof r6 == "string" && r6.trim() ? r6 : e5;
      }
      return e5;
    };
    y3 = (t3, e5 = "") => {
      const a3 = Array.isArray(t3) ? t3[0] : t3, r6 = typeof a3 == "object" && a3 ? a3.value : a3;
      return r6 == null || r6 === "" ? e5 : String(r6);
    };
    h3 = (t3, e5 = 0) => {
      const a3 = Number(t3);
      return t3 === "" || t3 == null || !Number.isFinite(a3) ? e5 : a3;
    };
    b3 = (t3, e5 = false) => t3 == null || t3 === "" ? e5 : t3 === true || t3 === "true" || t3 === 1 || t3 === "1";
    Z2 = (t3) => Array.isArray(t3) ? t3 : [];
    v2 = (t3) => {
      const e5 = typeof t3 == "object" && t3 ? t3.amount : t3, a3 = Number(e5);
      return Number.isFinite(a3) ? a3 : 0;
    };
    tt = (t3) => {
      if (!t3) return null;
      const e5 = typeof t3 == "number" ? t3 < 1e12 ? t3 * 1e3 : t3 : Date.parse(String(t3).replace(" ", "T"));
      return Number.isFinite(e5) && e5 > Date.now() ? e5 : null;
    };
    j = (t3) => (Array.isArray(t3) ? t3 : []).map((e5) => Number(typeof e5 == "object" && e5 ? e5.value : e5)).filter((e5) => Number.isFinite(e5) && e5 > 0);
    _2 = /* @__PURE__ */ new Map();
    k2 = (t3) => {
      var e5, a3;
      try {
        const r6 = (a3 = (e5 = x2()) == null ? void 0 : e5.money) == null ? void 0 : a3.call(e5, t3);
        if (r6) return String(r6);
      } catch {
      }
      return `${Math.round(t3 * 100) / 100} ${d3("\u0631.\u0633", "SAR")}`;
    };
    it = (t3, e5) => {
      var a3, r6, i5;
      try {
        (i5 = (r6 = (a3 = x2()) == null ? void 0 : a3.event) == null ? void 0 : r6.on) == null || i5.call(r6, t3, e5);
      } catch {
      }
    };
    N2 = "tw_smart_mem_v1";
    L2 = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
    z2 = (t3, e5 = 1) => G((a3) => {
      a3.seen[t3.id] = (a3.seen[t3.id] || 0) + e5, a3.prices = [...a3.prices.slice(-29), t3.price], t3.category && (a3.tags[t3.category] = (a3.tags[t3.category] || 0) + e5);
    });
    lt = (t3, e5 = true) => {
      if (!e5) return t3;
      const a3 = C2();
      return t3.map((r6, i5) => ({ p: r6, i: i5, s: ct(r6, a3) })).sort((r6, i5) => i5.s - r6.s || r6.i - i5.i).map((r6) => r6.p);
    };
    P2 = false;
    ut = () => {
      const t3 = innerWidth, e5 = navigator.userAgent;
      return /iPad|Tablet/i.test(e5) || t3 >= 700 && t3 < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(e5) || t3 < 700 ? "mobile" : "desktop";
    };
    gt = () => {
      try {
        return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
      } catch {
        return true;
      }
    };
    pt = Object.defineProperty;
    ft = (t3, e5, a3, r6) => {
      for (var i5 = void 0, s4 = t3.length - 1, n5; s4 >= 0; s4--)
        (n5 = t3[s4]) && (i5 = n5(e5, a3, i5) || i5);
      return i5 && pt(e5, a3, i5), i5;
    };
    mt = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" };
    T2 = /* @__PURE__ */ new Set();
    bt = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" };
    xt = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"];
    F = class F2 extends i4 {
      get c() {
        return this.config ?? {};
      }
      connectedCallback() {
        super.connectedCallback(), dt(), st();
      }
      firstUpdated() {
        if (!("IntersectionObserver" in window)) {
          this.setAttribute("in", "");
          return;
        }
        this.io = new IntersectionObserver((e5) => {
          var a3;
          e5.some((r6) => r6.isIntersecting) && (this.setAttribute("in", ""), (a3 = this.io) == null || a3.disconnect());
        }, { threshold: 0.12 }), this.io.observe(this);
      }
      disconnectedCallback() {
        var e5;
        super.disconnectedCallback(), (e5 = this.io) == null || e5.disconnect();
      }
      /** Hidden by the merchant's schedule or device rule? */
      hiddenNow() {
        const e5 = this.c, a3 = Date.now(), r6 = Date.parse(String(e5.s_from || "")), i5 = Date.parse(String(e5.s_to || ""));
        if (Number.isFinite(r6) && a3 < r6 || Number.isFinite(i5) && a3 > i5) return true;
        const s4 = ut();
        return !!(b3(e5.s_hide_mobile) && s4 === "mobile" || b3(e5.s_hide_desktop) && s4 !== "mobile");
      }
      vars(e5 = "") {
        const a3 = this.c, r6 = [], i5 = (n5, l3) => {
          l3 !== "" && l3 != null && r6.push(`${n5}:${l3}`);
        };
        i5("--a", a3.s_accent || ""), i5("--a2", a3.s_accent2 || ""), i5("--bgc", a3.s_bg || ""), i5("--fgc", a3.s_text || ""), i5("--cardc", a3.s_card || ""), i5("--r", `${h3(a3.s_radius, 22)}px`), i5("--gap", `${h3(a3.s_gap, 18)}px`), i5("--ts", `${h3(a3.s_title_size, 38)}px`), i5("--fs", `${h3(a3.s_text_size, 16)}px`), i5("--pt", `${h3(a3.s_pad_top, 56)}px`), i5("--pb", `${h3(a3.s_pad_bottom, 56)}px`), i5("--maxw", bt[y3(a3.s_width, "normal")] ?? "1240px"), i5("--sh", xt[Math.max(0, Math.min(5, h3(a3.s_shadow, 2)))]), i5("--ms", `${h3(a3.s_anim_ms, 700)}ms`), i5("--ov", String(h3(a3.s_overlay, 45) / 100)), a3.s_bg_image && i5("--bgimg", `url("${String(a3.s_bg_image)}")`);
        const s4 = ht(y3(a3.s_font, "inherit"));
        return s4 && i5("font-family", `'${s4}', inherit`), r6.join(";") + (e5 ? ";" + e5 : "");
      }
      cls() {
        const e5 = this.c;
        return [
          "sec",
          `th-${y3(e5.s_theme, "auto")}`,
          `al-${y3(e5.s_align, "start")}`,
          `an-${y3(e5.s_anim, "rise")}`,
          `pt-${y3(e5.s_pattern, "none")}`,
          `bs-${y3(e5.s_btn_style, "pill")}`,
          b3(e5.s_border) ? "bordered" : "",
          b3(e5.s_stagger, true) ? "stagger" : "",
          e5.s_bg_image ? "has-img" : ""
        ].join(" ");
      }
      /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
      shell(e5, a3 = {}, r6 = "", i5 = "", s4 = true) {
        if (this.hiddenNow()) return A;
        const n5 = this.c, l3 = w2(n5.eyebrow, a3.eyebrow ?? ""), g5 = w2(n5.title, a3.title ?? ""), p5 = w2(n5.subtitle, a3.sub ?? ""), m6 = s4 && b3(n5.s_show_head, true) && (l3 || g5 || p5);
        return b2`<section class="${this.cls()} ${r6}" style=${this.vars(i5)} id=${String(n5.s_anchor || "") || A}>
      <div class="wrap">${m6 ? b2`<header class="head">${l3 ? b2`<span class="eyebrow">${l3}</span>` : ""}${g5 ? b2`<h2 class="title">${g5}</h2>` : ""}${p5 ? b2`<p class="sub">${p5}</p>` : ""}</header>` : ""}
      ${e5}</div></section>`;
      }
      /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
      hints(e5) {
        const a3 = e5.filter(Boolean);
        return !a3.length || !gt() || !b3(this.c.s_hints, true) ? "" : b2`<aside class="hints" role="note"><b>💡 ${d3("\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0625\u0639\u062F\u0627\u062F (\u064A\u0638\u0647\u0631 \u0644\u0643 \u0641\u0642\u0637)", "Setup assistant (only you see this)")}</b><ul>${a3.map((r6) => b2`<li>${r6}</li>`)}</ul></aside>`;
      }
      card(e5, a3 = {}) {
        var r6;
        return b2`<article class="pc ${e5.available ? "" : "oos"}">
      <a class="ph" href=${e5.url} @click=${() => z2(e5)}><img src=${e5.image} alt=${e5.name} loading="lazy" />${(r6 = a3.badges) != null && r6.length ? b2`<span class="badges">${a3.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${e5.url} @click=${() => z2(e5)}>${e5.name}</a>
        <div class="pr"><b>${k2(e5.price)}</b>${e5.regular > e5.price ? b2`<s>${k2(e5.regular)}</s>` : ""}</div>
        ${a3.rating !== false && e5.rating > 0 ? b2`<div class="rt">★ ${e5.rating.toFixed(1)}${e5.ratingCount ? b2` <small>(${e5.ratingCount})</small>` : ""}</div>` : ""}
        ${a3.extra ?? ""}
        ${a3.quick !== false ? b2`<button class="btn sm" ?disabled=${!e5.available} @click=${() => this.add(e5)}>${e5.available ? d3("\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629", "Add to cart") : d3("\u0646\u0641\u062F\u062A \u0627\u0644\u0643\u0645\u064A\u0629", "Sold out")}</button>` : ""}
      </div></article>`;
      }
      async add(e5, a3 = 1, r6) {
        z2(e5, 3), await U(e5.id, a3, r6) ? K(d3("\u062A\u0645\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629", "Added to cart")) : location.href = e5.url;
      }
    };
    F.base = i`
  :host { display: block; font-family: inherit; direction: inherit;
    --A: var(--a, var(--color-primary, #b88a44)); --A2: var(--a2, color-mix(in srgb, var(--A) 55%, #000)); --BG: var(--bgc, transparent); --FG: var(--fgc, inherit); --CARD: var(--cardc, #fff); --LINE: color-mix(in srgb, currentColor 14%, transparent); }
  :host([hidden]) { display: none; }
  *, *::before, *::after { box-sizing: border-box; }
  .sec { position: relative; background: var(--BG); color: var(--FG); font-size: var(--fs, 16px); overflow: hidden; isolation: isolate; }
  .sec.has-img::before { content: ''; position: absolute; inset: 0; z-index: -2; background: var(--bgimg) center/cover no-repeat; }
  .sec.has-img::after { content: ''; position: absolute; inset: 0; z-index: -1; background: #000; opacity: var(--ov, .45); }
  .th-light { --BG: var(--bgc, #fff); --FG: var(--fgc, #17140f); --CARD: var(--cardc, #faf8f4); }
  .th-ivory { --BG: var(--bgc, #f7f2e9); --FG: var(--fgc, #1d160c); --CARD: var(--cardc, #fffdf8); }
  .th-dark { --BG: var(--bgc, #111014); --FG: var(--fgc, #f4efe6); --CARD: var(--cardc, #1c1b22); }
  .th-midnight { --BG: var(--bgc, radial-gradient(900px 500px at 85% -10%, #2c1d55 0, transparent 60%), #0f0c18); --FG: var(--fgc, #f6f1e7); --CARD: var(--cardc, #19142d); }
  .th-glass { --BG: var(--bgc, linear-gradient(135deg, color-mix(in srgb, var(--A) 14%, #fff), #fff 60%)); --FG: var(--fgc, #15130f); --CARD: var(--cardc, rgba(255,255,255,.6)); }
  .th-glass .pc, .th-glass .panel { backdrop-filter: blur(14px); }
  .th-accent { --BG: var(--bgc, linear-gradient(135deg, var(--A), var(--A2))); --FG: var(--fgc, #fff); --CARD: var(--cardc, rgba(255,255,255,.12)); }
  .th-dark, .th-midnight, .th-accent { --LINE: rgba(255,255,255,.14); }
  .pt-dots { background-image: radial-gradient(color-mix(in srgb, currentColor 12%, transparent) 1px, transparent 1.4px), var(--BG); background-size: 18px 18px, auto; }
  .pt-grid { background-image: linear-gradient(var(--LINE) 1px, transparent 1px), linear-gradient(90deg, var(--LINE) 1px, transparent 1px), var(--BG); background-size: 36px 36px, 36px 36px, auto; }
  .pt-arabesque { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Cpath d='M28 4l7 17 17 7-17 7-7 17-7-17-17-7 17-7z' fill='none' stroke='%23999' stroke-opacity='.18'/%3E%3C/svg%3E"), var(--BG); }
  .pt-waves { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='20'%3E%3Cpath d='M0 10q20-10 40 0t40 0' fill='none' stroke='%23999' stroke-opacity='.2'/%3E%3C/svg%3E"), var(--BG); }
  .wrap { max-width: var(--maxw, 1240px); margin: 0 auto; padding: var(--pt, 56px) clamp(16px, 4vw, 32px) var(--pb, 56px); }
  .head { margin-bottom: calc(var(--gap, 18px) * 1.4); }
  .al-center .head { text-align: center; } .al-center .head .sub { margin-inline: auto; } .al-end .head { text-align: end; }
  .eyebrow { display: inline-block; letter-spacing: .2em; font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--A); margin-bottom: 10px; }
  .th-accent .eyebrow { color: inherit; opacity: .85; }
  h2.title { margin: 0 0 8px; font-size: clamp(22px, calc(var(--ts, 38px) * .62 + 1.2vw), var(--ts, 38px)); line-height: 1.25; font-weight: 800; }
  .sub { margin: 0; opacity: .72; line-height: 1.8; max-width: 720px; }
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 0; cursor: pointer; text-decoration: none; font: inherit; font-weight: 700;
    padding: 13px 24px; border-radius: 999px; background: var(--A); color: #fff; transition: transform .25s, box-shadow .25s, opacity .2s; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -12px var(--A); } .btn[disabled] { opacity: .45; cursor: not-allowed; transform: none; box-shadow: none; }
  .btn.ghost { background: transparent; color: inherit; border: 1.5px solid currentColor; } .btn.sm { padding: 9px 16px; font-size: 14px; }
  .th-accent .btn:not(.ghost) { background: #fff; color: var(--A2); }
  .bs-rounded .btn { border-radius: 12px; } .bs-square .btn { border-radius: 0; } .bs-outline .btn:not(.ghost) { background: transparent; color: var(--A); border: 1.5px solid var(--A); }
  .bs-underline .btn { background: none; color: var(--A); padding-inline: 0; border-radius: 0; border-bottom: 2px solid var(--A); }
  .bordered .pc, .bordered .panel { border: 1px solid var(--LINE); }
  .panel { background: var(--CARD); border-radius: var(--r, 22px); box-shadow: var(--sh); padding: clamp(16px, 2.4vw, 28px); }
  .grid { display: grid; gap: var(--gap, 18px); grid-template-columns: repeat(var(--cols, 4), minmax(0, 1fr)); }
  @media (max-width: 860px) { .grid { grid-template-columns: repeat(var(--mcols, 2), minmax(0, 1fr)); } }
  .rail { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(220px, calc((100% - var(--gap) * (var(--cols, 4) - 1)) / var(--cols, 4))); gap: var(--gap, 18px); overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 8px; scrollbar-width: thin; }
  @media (max-width: 860px) { .rail { grid-auto-columns: calc((100% - var(--gap)) / var(--mcols, 2) - 8px); } }
  .rail > * { scroll-snap-align: start; }
  .pc { position: relative; display: flex; flex-direction: column; background: var(--CARD); border-radius: var(--r, 22px); overflow: hidden; box-shadow: var(--sh); transition: transform .35s; color: inherit; }
  .pc:hover { transform: translateY(-4px); } .pc.oos { opacity: .55; }
  .ph { position: relative; display: block; aspect-ratio: var(--ratio, 1); background: color-mix(in srgb, currentColor 6%, transparent); }
  .ph img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .badges { position: absolute; inset: 10px 10px auto 10px; display: flex; flex-wrap: wrap; gap: 6px; }
  .bdg { font-size: 11px; font-weight: 800; padding: 4px 9px; border-radius: 999px; background: var(--A); color: #fff; line-height: 1.4; }
  .bdg.alt { background: #111; } .bdg.ok { background: #15803d; } .bdg.warn { background: #b45309; } .bdg.soft { background: #fff; color: #111; }
  .pb { padding: 12px 14px 14px; display: grid; gap: 6px; flex: 1; align-content: start; }
  .pn { color: inherit; text-decoration: none; font-weight: 700; line-height: 1.5; font-size: .95em; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .pr { display: flex; gap: 8px; align-items: baseline; flex-wrap: wrap; } .pr b { color: var(--A); } .th-accent .pr b { color: inherit; } .pr s { opacity: .5; font-size: .85em; }
  .rt { font-size: 13px; color: #d4a017; } .rt small { opacity: .7; color: inherit; }
  .pb .btn { margin-top: auto; width: 100%; }
  .chip { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 999px; border: 1.5px solid var(--LINE); background: var(--CARD); color: inherit; font: inherit; font-size: 14px; cursor: pointer; transition: all .25s; }
  .chip:hover { border-color: var(--A); } .chip.on { background: var(--A); border-color: var(--A); color: #fff; }
  .muted { opacity: .65; } .center { text-align: center; }
  .skel { background: linear-gradient(90deg, #8881 0, #8882 50%, #8881 100%); background-size: 200% 100%; animation: sk 1.4s infinite; border-radius: var(--r, 22px); min-height: 220px; }
  @keyframes sk { to { background-position: -200% 0; } }
  .hints { margin: 0 0 18px; padding: 14px 18px; border-radius: 14px; background: #fff8e1; color: #5b4300; border: 1px dashed #e0b84a; font-size: 13px; line-height: 1.8; }
  .hints ul { margin: 6px 0 0; padding-inline-start: 18px; }
  /* reveal motion */
  .sec .wrap > * { transition: opacity var(--ms, .7s) ease, transform var(--ms, .7s) cubic-bezier(.2,.7,.2,1), filter var(--ms, .7s); }
  :host(:not([in])) .an-fade .wrap > * { opacity: 0; }
  :host(:not([in])) .an-rise .wrap > * { opacity: 0; transform: translateY(28px); }
  :host(:not([in])) .an-zoom .wrap > * { opacity: 0; transform: scale(.94); }
  :host(:not([in])) .an-blur .wrap > * { opacity: 0; filter: blur(12px); }
  :host(:not([in])) .an-slide .wrap > * { opacity: 0; transform: translateX(40px); }
  .stagger .wrap > *:nth-child(2) { transition-delay: .08s; } .stagger .wrap > *:nth-child(3) { transition-delay: .16s; } .stagger .wrap > *:nth-child(4) { transition-delay: .24s; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } :host .sec .wrap > * { opacity: 1 !important; transform: none !important; filter: none !important; } }
  `;
    A2 = F;
    ft([
      n4({ type: Object })
    ], A2.prototype, "config");
    vt = (t3, e5) => e5.filter((a3) => t3 >= a3.min).sort((a3, r6) => r6.pct - a3.pct)[0] ?? null;
    yt = (t3, e5) => e5.filter((a3) => t3 < a3.min).sort((a3, r6) => a3.min - r6.min)[0] ?? null;
    wt = (t3) => (Array.isArray(t3) ? t3 : []).map((e5) => ({ min: h3(e5.min, 0), pct: h3(e5.pct, 0) })).filter((e5) => e5.min > 0 && e5.pct > 0);
    kt = Object.defineProperty;
    E2 = (t3, e5, a3, r6) => {
      for (var i5 = void 0, s4 = t3.length - 1, n5; s4 >= 0; s4--)
        (n5 = t3[s4]) && (i5 = n5(e5, a3, i5) || i5);
      return i5 && kt(e5, a3, i5), i5;
    };
    I2 = class I3 extends A2 {
      constructor() {
        super(...arguments), this.slots = [], this.pick = [], this.auto = false, this.seq = 0;
      }
      willUpdate(e5) {
        e5.has("config") && this.load();
      }
      async load() {
        const e5 = ++this.seq, a3 = this.c;
        let r6 = [], i5 = false;
        const s4 = Z2(a3.slots).filter((n5) => j(n5.products).length);
        if (s4.length) r6 = await Promise.all(s4.map(async (n5) => ({ name: w2(n5.name), emoji: w2(n5.emoji, "\u2728"), req: b3(n5.required, true), items: lt(await J(j(n5.products)), b3(a3.personalize, true)) })));
        else {
          i5 = true;
          const n5 = (await at(a3.products, y3(a3.auto_source, "best_selling"), 30)).items;
          r6 = [...new Set(n5.map((g5) => g5.category).filter(Boolean))].slice(0, h3(a3.auto_slots, 3)).map((g5) => ({ name: g5, emoji: "\u2728", req: false, items: n5.filter((p5) => p5.category === g5) }));
        }
        e5 === this.seq && (this.slots = r6, this.auto = i5, this.pick = r6.map((n5) => {
          var l3;
          return b3(a3.preselect, true) ? ((l3 = n5.items.find((g5) => g5.available)) == null ? void 0 : l3.id) ?? null : null;
        }));
      }
      render() {
        const e5 = this.c, a3 = wt(e5.tiers), r6 = this.slots.map((o6, u5) => o6.items.find((f4) => f4.id === this.pick[u5])).filter((o6) => !!o6), i5 = r6.reduce((o6, u5) => o6 + u5.price, 0), s4 = vt(r6.length, a3), n5 = yt(r6.length, a3), l3 = s4 ? Math.round(i5 * s4.pct) / 100 : 0, g5 = this.slots.some((o6, u5) => o6.req && !this.pick[u5]), p5 = String(e5.coupon || ""), m6 = [[4, 6, "-8deg"], [50, 2, "6deg"], [26, 40, "-2deg"], [2, 52, "10deg"], [52, 50, "-6deg"]];
        return this.shell(
          b2`${this.hints([
            this.auto && d3("\u0644\u0645 \u062A\u0636\u0641 \u062E\u0627\u0646\u0627\u062A\u061B \u0627\u0644\u062E\u0627\u0646\u0627\u062A \u0627\u0644\u0622\u0646 \u0623\u0642\u0633\u0627\u0645 \u0645\u062A\u062C\u0631\u0643 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B. \u0623\u0636\u0641 \u062E\u0627\u0646\u0627\u062A (\u0639\u0637\u0631\u060C \u0628\u062E\u0648\u0631\u060C \u062A\u063A\u0644\u064A\u0641...) \u0648\u0627\u0631\u0628\u0637\u0647\u0627 \u0628\u0645\u0646\u062A\u062C\u0627\u062A.", "No slots yet: using your categories automatically."),
            a3.length > 0 && !p5 && d3("\u0623\u0646\u0634\u0626 \u0643\u0648\u0628\u0648\u0646 \u0623\u0648 \u0639\u0631\u0636 \u0641\u064A \u0633\u0644\u0629 \u0628\u0646\u0641\u0633 \u0646\u0633\u0628\u0629 \u0627\u0644\u062E\u0635\u0645 \u0648\u0636\u0639 \u0627\u0644\u0643\u0648\u062F \u0647\u0646\u0627 \u0644\u064A\u062A\u0637\u0628\u0642 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B.", "Create a matching coupon in Salla and add it here to apply it automatically.")
          ])}
      ${this.slots.length ? b2`<div class="g"><div>${this.slots.map((o6, u5) => b2`<div class="slot">
        <div class="sh"><span class="k">${u5 + 1}</span>${o6.emoji} ${o6.name} <small>${o6.req ? d3("\u0645\u0637\u0644\u0648\u0628", "required") : d3("\u0627\u062E\u062A\u064A\u0627\u0631\u064A", "optional")}</small>${this.pick[u5] ? b2`<span class="ok">✓</span>` : ""}</div>
        <div class="opts">${o6.items.map((f4) => b2`<button class="o ${this.pick[u5] === f4.id ? "on" : ""}" aria-disabled=${!f4.available} @click=${() => {
            f4.available && (z2(f4), this.pick = Object.assign([...this.pick], { [u5]: this.pick[u5] === f4.id && !o6.req ? null : f4.id }));
          }}>
          <img src=${f4.image} alt="" loading="lazy" /><div>${f4.name}<b>${k2(f4.price)}</b></div></button>`)}</div></div>`)}</div>
      <div class="panel sum"><b>${w2(e5.summary_title, d3("\u0637\u0642\u0645\u0643", "Your set"))}</b>
        ${b3(e5.board, true) ? b2`<div class="board">${r6.length ? r6.slice(0, 5).map((o6, u5) => b2`<img src=${o6.image} alt=${o6.name} style=${`left:${m6[u5][0]}%;top:${m6[u5][1]}%;--r0:${m6[u5][2]};transform:rotate(${m6[u5][2]})`} />`) : b2`<div class="ph">${d3("\u0627\u062E\u062A\u0631 \u0642\u0637\u0639\u0643 \u0648\u0634\u0648\u0641\u0647\u0627 \u062A\u062A\u062C\u0645\u0639 \u0647\u0646\u0627", "Pick your pieces and watch them come together")}</div>`}</div>` : ""}
        ${r6.map((o6) => b2`<div class="ln"><span>${o6.name}</span><span>${k2(o6.price)}</span></div>`)}
        ${l3 ? b2`<div class="ln"><span>${d3("\u062E\u0635\u0645 \u0627\u0644\u0637\u0642\u0645", "Set discount")} ${s4.pct}%</span><span class="d">- ${k2(l3)}</span></div>` : ""}
        <div class="ln t"><span>${d3("\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A", "Total")}</span><span>${k2(i5 - l3)}</span></div>
        ${n5 && b3(e5.nudge, true) ? b2`<div class="tip">💡 ${d3(`\u0623\u0636\u0641 ${n5.min - r6.length} \u0642\u0637\u0639\u0629 \u0648\u062E\u0630 \u062E\u0635\u0645 ${n5.pct}%`, `Add ${n5.min - r6.length} more for ${n5.pct}% off`)}</div>` : ""}
        <button class="btn w" ?disabled=${!r6.length || g5} @click=${() => $t(r6.map((o6) => ({ p: o6 })), p5)}>${g5 ? d3("\u0643\u0645\u0651\u0644 \u0627\u0644\u062E\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629", "Complete required slots") : w2(e5.button, d3("\u0623\u0636\u0641 \u0627\u0644\u0637\u0642\u0645 \u0644\u0644\u0633\u0644\u0629", "Add the set to cart"))}</button>
        ${p5 && l3 ? b2`<div class="code">${d3("\u0627\u0644\u062E\u0635\u0645 \u064A\u064F\u0637\u0628\u0651\u0642 \u0628\u0627\u0644\u0643\u0648\u062F", "Applied with code")} <b>${p5}</b></div>` : ""}</div></div>` : b2`<div class="skel"></div>`}`,
          { eyebrow: d3("\u0631\u0643\u0651\u0628 \u0637\u0642\u0645\u0643", "Build your set"), title: d3("\u0627\u062E\u062A\u0631 \u0642\u0637\u0639\u0629 \u0645\u0646 \u0643\u0644 \u062E\u0627\u0646\u0629\u2026 \u0648\u0627\u0644\u0628\u0627\u0642\u064A \u0639\u0644\u064A\u0646\u0627", "One piece per slot, we do the rest") }
        );
      }
    };
    I2.styles = [A2.base, i`
    .g { display: grid; grid-template-columns: 1fr 360px; gap: calc(var(--gap) * 1.4); align-items: start; } @media (max-width: 960px) { .g { grid-template-columns: 1fr; } .sum { position: static !important; } }
    .slot { margin-bottom: 20px; } .sh { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; font-weight: 800; } .sh .k { width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; background: var(--A); color: #fff; font-size: 14px; }
    .sh small { font-weight: 500; opacity: .6; } .sh .ok { color: #16a34a; }
    .opts { display: grid; grid-auto-flow: column; grid-auto-columns: 150px; gap: 10px; overflow-x: auto; padding-bottom: 6px; scroll-snap-type: x mandatory; }
    .o { all: unset; cursor: pointer; scroll-snap-align: start; border-radius: 16px; overflow: hidden; background: var(--CARD); border: 2px solid transparent; box-shadow: var(--sh); transition: all .25s; position: relative; }
    .o.on { border-color: var(--A); transform: translateY(-3px); } .o[aria-disabled=true] { opacity: .4; cursor: not-allowed; }
    .o img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; } .o div { padding: 8px 10px; font-size: 13px; } .o b { color: var(--A); display: block; }
    .o.on::after { content: '✓'; position: absolute; top: 8px; inset-inline-end: 8px; width: 26px; height: 26px; border-radius: 50%; background: var(--A); color: #fff; display: grid; place-items: center; font-weight: 800; }
    .sum { position: sticky; top: 90px; }
    .board { position: relative; height: 230px; margin: 4px 0 18px; border-radius: 18px; background: radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--A) 18%, transparent), transparent 70%); }
    .board img { position: absolute; width: 46%; aspect-ratio: 1; object-fit: cover; border-radius: 18px; box-shadow: 0 18px 40px -18px #0009; border: 4px solid var(--CARD); animation: drop .5s cubic-bezier(.2,.9,.3,1.3); }
    @keyframes drop { from { transform: translateY(-30px) scale(.7) rotate(var(--r0)); opacity: 0; } }
    .board .ph { position: absolute; inset: 0; display: grid; place-items: center; opacity: .5; text-align: center; padding: 20px; }
    .ln { display: flex; justify-content: space-between; padding: 7px 0; font-size: 14px; border-bottom: 1px dashed var(--LINE); } .ln.t { font-size: 18px; font-weight: 800; border: 0; } .ln .d { color: #16a34a; }
    .tip { font-size: 13px; padding: 10px 12px; border-radius: 12px; background: color-mix(in srgb, var(--A) 10%, transparent); margin: 12px 0; } .btn.w { width: 100%; }
    .code { font-size: 12px; opacity: .7; margin-top: 8px; text-align: center; }
  `];
    $2 = I2;
    E2([
      r5()
    ], $2.prototype, "slots");
    E2([
      r5()
    ], $2.prototype, "pick");
    E2([
      r5()
    ], $2.prototype, "auto");
    typeof $2 < "u" && $2.registerSallaComponent("salla-taqm-builder");
  }
});

// dist/taqm-outfit.js
var taqm_outfit_exports = {};
__export(taqm_outfit_exports, {
  default: () => x3
});
function W2(t3) {
  var n5, c4, u5, v6, g5, N5, k6, I5, R3;
  const e5 = b4(t3 == null ? void 0 : t3.sale_price), r6 = b4((t3 == null ? void 0 : t3.regular_price) ?? (t3 == null ? void 0 : t3.price)), a3 = e5 && e5 < r6 ? e5 : b4(t3 == null ? void 0 : t3.price) || r6, i5 = Math.max(b4(t3 == null ? void 0 : t3.regular_price), b4(t3 == null ? void 0 : t3.price), a3), o6 = (Array.isArray(t3 == null ? void 0 : t3.images) ? t3.images : []).map((A5) => String((A5 == null ? void 0 : A5.url) ?? A5 ?? "")).filter(Boolean), s4 = (t3 == null ? void 0 : t3.sold_quantity) ?? (t3 == null ? void 0 : t3.sold);
  return {
    id: Number(t3 == null ? void 0 : t3.id),
    name: String((t3 == null ? void 0 : t3.name) ?? ""),
    url: String((t3 == null ? void 0 : t3.url) ?? "#"),
    image: String(((n5 = t3 == null ? void 0 : t3.image) == null ? void 0 : n5.url) ?? (t3 == null ? void 0 : t3.main_image) ?? (t3 == null ? void 0 : t3.thumbnail) ?? o6[0] ?? ""),
    images: o6,
    price: a3,
    regular: i5,
    discount: i5 > a3 ? Math.round((1 - a3 / i5) * 100) : 0,
    rating: b4(((c4 = t3 == null ? void 0 : t3.rating) == null ? void 0 : c4.stars) ?? ((u5 = t3 == null ? void 0 : t3.rating) == null ? void 0 : u5.rate) ?? (t3 == null ? void 0 : t3.rating)),
    ratingCount: b4((v6 = t3 == null ? void 0 : t3.rating) == null ? void 0 : v6.count),
    qty: (t3 == null ? void 0 : t3.quantity) == null || t3 != null && t3.unlimited_quantity ? null : b4(t3 == null ? void 0 : t3.quantity),
    available: (t3 == null ? void 0 : t3.is_available) !== false && (t3 == null ? void 0 : t3.status) !== "out" && !((t3 == null ? void 0 : t3.quantity) === 0 && !(t3 != null && t3.unlimited_quantity)),
    sold: s4 == null || s4 === "" || !Number.isFinite(Number(s4)) ? null : Number(s4),
    endsAt: tt2((t3 == null ? void 0 : t3.discount_ends) ?? (t3 == null ? void 0 : t3.sale_end) ?? (t3 == null ? void 0 : t3.discount_end)),
    category: String(((g5 = t3 == null ? void 0 : t3.category) == null ? void 0 : g5.name) ?? ((k6 = (N5 = t3 == null ? void 0 : t3.categories) == null ? void 0 : N5[0]) == null ? void 0 : k6.name) ?? ""),
    brand: String(((I5 = t3 == null ? void 0 : t3.brand) == null ? void 0 : I5.name) ?? ""),
    promo: String(((R3 = t3 == null ? void 0 : t3.promotion) == null ? void 0 : R3.title) ?? (t3 == null ? void 0 : t3.promotion_title) ?? "")
  };
}
async function et2(t3) {
  var a3, i5, o6;
  const e5 = (a3 = f3()) == null ? void 0 : a3.product;
  if (!e5) return null;
  const r6 = e5.getDetails ? e5.getDetails.bind(e5) : (o6 = (i5 = e5.api) == null ? void 0 : i5.getDetails) == null ? void 0 : o6.bind(e5.api);
  if (!r6) return null;
  try {
    const s4 = await r6(t3, ["images", "sold_quantity", "category"]), n5 = W2((s4 == null ? void 0 : s4.data) ?? s4);
    return n5.name ? n5 : null;
  } catch {
    return null;
  }
}
async function H3(t3) {
  await G2();
  const e5 = "ids:" + t3.join(",");
  return $3.has(e5) || $3.set(e5, Promise.all(t3.map(et2)).then((r6) => r6.filter((a3) => !!a3))), $3.get(e5);
}
async function q(t3, e5 = [], r6 = 12) {
  await G2();
  const a3 = `src:${t3}:${e5.join(",")}:${r6}`;
  return $3.has(a3) || $3.set(a3, (async () => {
    var s4, n5, c4, u5;
    const i5 = (s4 = f3()) == null ? void 0 : s4.product, o6 = i5 != null && i5.fetch ? i5.fetch.bind(i5) : (c4 = (n5 = i5 == null ? void 0 : i5.api) == null ? void 0 : n5.fetch) == null ? void 0 : c4.bind(i5.api);
    if (!o6) return [];
    try {
      const v6 = { source: t3, per_page: r6 };
      e5.length && (v6.source_value = e5);
      const g5 = await o6(v6);
      return (Array.isArray(g5 == null ? void 0 : g5.data) ? g5.data : Array.isArray(g5) ? g5 : ((u5 = g5 == null ? void 0 : g5.data) == null ? void 0 : u5.products) ?? []).map(W2).filter((k6) => k6.name).slice(0, r6);
    } catch {
      return [];
    }
  })()), $3.get(a3);
}
async function rt2(t3, e5 = "best_selling", r6 = 12) {
  const a3 = j2(t3);
  if (a3.length) return { items: (await H3(a3)).slice(0, r6), auto: false };
  let i5 = await q(e5, [], r6);
  return !i5.length && e5 !== "latest" && (i5 = await q("latest", [], r6)), { items: i5, auto: true };
}
async function J2(t3, e5 = 1, r6) {
  var a3, i5, o6;
  await G2();
  try {
    return await ((o6 = (i5 = (a3 = f3()) == null ? void 0 : a3.cart) == null ? void 0 : i5.addItem) == null ? void 0 : o6.call(i5, r6 ? { id: t3, quantity: e5, notes: r6 } : { id: t3, quantity: e5 })), true;
  } catch {
    return false;
  }
}
async function at2(t3) {
  var e5, r6, a3;
  if (!t3) return false;
  try {
    return await ((a3 = (r6 = (e5 = f3()) == null ? void 0 : e5.cart) == null ? void 0 : r6.addCoupon) == null ? void 0 : a3.call(r6, t3)), true;
  } catch {
    return false;
  }
}
function U2(t3, e5 = true) {
  var r6, a3, i5;
  try {
    (i5 = e5 ? (r6 = f3()) == null ? void 0 : r6.success : (a3 = f3()) == null ? void 0 : a3.error) == null || i5(t3);
  } catch {
  }
}
function K2() {
  try {
    return { ...L3(), ...JSON.parse(localStorage.getItem(C3) || "{}") };
  } catch {
    return L3();
  }
}
function nt2(t3) {
  try {
    localStorage.setItem(C3, JSON.stringify(t3));
  } catch {
  }
}
function F3(t3) {
  const e5 = K2();
  return t3(e5), nt2(e5), e5;
}
function st2() {
  let t3 = false;
  try {
    t3 = !sessionStorage.getItem(C3), sessionStorage.setItem(C3, "1");
  } catch {
  }
  return t3 ? F3((e5) => {
    e5.visits += 1, e5.last = Date.now();
  }) : K2();
}
function ot2() {
  O2 || (O2 = true, it2("cart::item.added", (t3) => {
    var r6;
    const e5 = Number(((r6 = t3 == null ? void 0 : t3.data) == null ? void 0 : r6.product_id) ?? 0);
    e5 && F3((a3) => {
      a3.carted.includes(e5) || (a3.carted = [...a3.carted.slice(-40), e5]);
    });
  }));
}
function ht2(t3) {
  const e5 = gt2[t3];
  if (!e5 || P3.has(e5)) return e5;
  P3.add(e5);
  const r6 = document.createElement("link");
  return r6.rel = "stylesheet", r6.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(e5)}:wght@400;500;700;800&display=swap`, document.head.appendChild(r6), e5;
}
async function bt2(t3, e5 = "") {
  let r6 = 0;
  for (const { p: a3, q: i5 } of t3) a3.available && await J2(a3.id, i5 ?? 1) && r6++;
  return e5 && await at2(e5), U2(r6 ? d4(`\u0623\u0636\u0641\u0646\u0627 ${r6} \u0645\u0646\u062A\u062C \u0644\u0644\u0633\u0644\u0629${e5 ? " \u0648\u0637\u0628\u0651\u0642\u0646\u0627 \u0627\u0644\u0643\u0648\u062F" : ""}`, `Added ${r6} items${e5 ? " and applied the code" : ""}`) : d4("\u062A\u0639\u0630\u0651\u0631\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629", "Could not add"), !!r6), r6;
}
var f3, G2, Y, V3, d4, p3, m2, h4, y4, Z3, b4, tt2, j2, $3, w3, it2, C3, L3, D3, O2, ct2, lt2, dt2, ut2, gt2, P3, ft2, pt2, M2, _3, mt2, z3, E3, x3;
var init_taqm_outfit = __esm({
  "dist/taqm-outfit.js"() {
    "use strict";
    init_lit();
    init_decorators();
    f3 = () => window.salla ?? window.Salla;
    G2 = async () => {
      var t3, e5;
      try {
        await ((e5 = (t3 = f3()) == null ? void 0 : t3.onReady) == null ? void 0 : e5.call(t3));
      } catch {
      }
    };
    Y = () => {
      var t3, e5, r6, a3, i5;
      try {
        const o6 = ((e5 = (t3 = f3()) == null ? void 0 : t3.lang) == null ? void 0 : e5.locale) ?? ((i5 = (a3 = (r6 = f3()) == null ? void 0 : r6.config) == null ? void 0 : a3.get) == null ? void 0 : i5.call(a3, "user.language_code"));
        if (typeof o6 == "string" && o6) return o6.slice(0, 2);
      } catch {
      }
      return (document.documentElement.lang || "ar").slice(0, 2);
    };
    V3 = () => Y() === "en";
    d4 = (t3, e5) => V3() ? e5 : t3;
    p3 = (t3, e5 = "") => {
      if (t3 == null) return e5;
      if (typeof t3 == "string") {
        const r6 = t3.trim();
        if (r6.startsWith("{") && r6.endsWith("}"))
          try {
            return p3(JSON.parse(r6), e5);
          } catch {
          }
        return r6 || e5;
      }
      if (typeof t3 == "number" || typeof t3 == "boolean") return String(t3);
      if (typeof t3 == "object") {
        const r6 = t3, a3 = r6[Y()] ?? r6.ar ?? r6.en ?? Object.values(r6).find((i5) => typeof i5 == "string" && i5);
        return typeof a3 == "string" && a3.trim() ? a3 : e5;
      }
      return e5;
    };
    m2 = (t3, e5 = "") => {
      const r6 = Array.isArray(t3) ? t3[0] : t3, a3 = typeof r6 == "object" && r6 ? r6.value : r6;
      return a3 == null || a3 === "" ? e5 : String(a3);
    };
    h4 = (t3, e5 = 0) => {
      const r6 = Number(t3);
      return t3 === "" || t3 == null || !Number.isFinite(r6) ? e5 : r6;
    };
    y4 = (t3, e5 = false) => t3 == null || t3 === "" ? e5 : t3 === true || t3 === "true" || t3 === 1 || t3 === "1";
    Z3 = (t3) => Array.isArray(t3) ? t3 : [];
    b4 = (t3) => {
      const e5 = typeof t3 == "object" && t3 ? t3.amount : t3, r6 = Number(e5);
      return Number.isFinite(r6) ? r6 : 0;
    };
    tt2 = (t3) => {
      if (!t3) return null;
      const e5 = typeof t3 == "number" ? t3 < 1e12 ? t3 * 1e3 : t3 : Date.parse(String(t3).replace(" ", "T"));
      return Number.isFinite(e5) && e5 > Date.now() ? e5 : null;
    };
    j2 = (t3) => (Array.isArray(t3) ? t3 : []).map((e5) => Number(typeof e5 == "object" && e5 ? e5.value : e5)).filter((e5) => Number.isFinite(e5) && e5 > 0);
    $3 = /* @__PURE__ */ new Map();
    w3 = (t3) => {
      var e5, r6;
      try {
        const a3 = (r6 = (e5 = f3()) == null ? void 0 : e5.money) == null ? void 0 : r6.call(e5, t3);
        if (a3) return String(a3);
      } catch {
      }
      return `${Math.round(t3 * 100) / 100} ${d4("\u0631.\u0633", "SAR")}`;
    };
    it2 = (t3, e5) => {
      var r6, a3, i5;
      try {
        (i5 = (a3 = (r6 = f3()) == null ? void 0 : r6.event) == null ? void 0 : a3.on) == null || i5.call(a3, t3, e5);
      } catch {
      }
    };
    C3 = "tw_smart_mem_v1";
    L3 = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
    D3 = (t3, e5 = 1) => F3((r6) => {
      r6.seen[t3.id] = (r6.seen[t3.id] || 0) + e5, r6.prices = [...r6.prices.slice(-29), t3.price], t3.category && (r6.tags[t3.category] = (r6.tags[t3.category] || 0) + e5);
    });
    O2 = false;
    ct2 = () => {
      const t3 = innerWidth, e5 = navigator.userAgent;
      return /iPad|Tablet/i.test(e5) || t3 >= 700 && t3 < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(e5) || t3 < 700 ? "mobile" : "desktop";
    };
    lt2 = () => {
      try {
        return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
      } catch {
        return true;
      }
    };
    dt2 = Object.defineProperty;
    ut2 = (t3, e5, r6, a3) => {
      for (var i5 = void 0, o6 = t3.length - 1, s4; o6 >= 0; o6--)
        (s4 = t3[o6]) && (i5 = s4(e5, r6, i5) || i5);
      return i5 && dt2(e5, r6, i5), i5;
    };
    gt2 = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" };
    P3 = /* @__PURE__ */ new Set();
    ft2 = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" };
    pt2 = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"];
    M2 = class M3 extends i4 {
      get c() {
        return this.config ?? {};
      }
      connectedCallback() {
        super.connectedCallback(), ot2(), st2();
      }
      firstUpdated() {
        if (!("IntersectionObserver" in window)) {
          this.setAttribute("in", "");
          return;
        }
        this.io = new IntersectionObserver((e5) => {
          var r6;
          e5.some((a3) => a3.isIntersecting) && (this.setAttribute("in", ""), (r6 = this.io) == null || r6.disconnect());
        }, { threshold: 0.12 }), this.io.observe(this);
      }
      disconnectedCallback() {
        var e5;
        super.disconnectedCallback(), (e5 = this.io) == null || e5.disconnect();
      }
      /** Hidden by the merchant's schedule or device rule? */
      hiddenNow() {
        const e5 = this.c, r6 = Date.now(), a3 = Date.parse(String(e5.s_from || "")), i5 = Date.parse(String(e5.s_to || ""));
        if (Number.isFinite(a3) && r6 < a3 || Number.isFinite(i5) && r6 > i5) return true;
        const o6 = ct2();
        return !!(y4(e5.s_hide_mobile) && o6 === "mobile" || y4(e5.s_hide_desktop) && o6 !== "mobile");
      }
      vars(e5 = "") {
        const r6 = this.c, a3 = [], i5 = (s4, n5) => {
          n5 !== "" && n5 != null && a3.push(`${s4}:${n5}`);
        };
        i5("--a", r6.s_accent || ""), i5("--a2", r6.s_accent2 || ""), i5("--bgc", r6.s_bg || ""), i5("--fgc", r6.s_text || ""), i5("--cardc", r6.s_card || ""), i5("--r", `${h4(r6.s_radius, 22)}px`), i5("--gap", `${h4(r6.s_gap, 18)}px`), i5("--ts", `${h4(r6.s_title_size, 38)}px`), i5("--fs", `${h4(r6.s_text_size, 16)}px`), i5("--pt", `${h4(r6.s_pad_top, 56)}px`), i5("--pb", `${h4(r6.s_pad_bottom, 56)}px`), i5("--maxw", ft2[m2(r6.s_width, "normal")] ?? "1240px"), i5("--sh", pt2[Math.max(0, Math.min(5, h4(r6.s_shadow, 2)))]), i5("--ms", `${h4(r6.s_anim_ms, 700)}ms`), i5("--ov", String(h4(r6.s_overlay, 45) / 100)), r6.s_bg_image && i5("--bgimg", `url("${String(r6.s_bg_image)}")`);
        const o6 = ht2(m2(r6.s_font, "inherit"));
        return o6 && i5("font-family", `'${o6}', inherit`), a3.join(";") + (e5 ? ";" + e5 : "");
      }
      cls() {
        const e5 = this.c;
        return [
          "sec",
          `th-${m2(e5.s_theme, "auto")}`,
          `al-${m2(e5.s_align, "start")}`,
          `an-${m2(e5.s_anim, "rise")}`,
          `pt-${m2(e5.s_pattern, "none")}`,
          `bs-${m2(e5.s_btn_style, "pill")}`,
          y4(e5.s_border) ? "bordered" : "",
          y4(e5.s_stagger, true) ? "stagger" : "",
          e5.s_bg_image ? "has-img" : ""
        ].join(" ");
      }
      /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
      shell(e5, r6 = {}, a3 = "", i5 = "", o6 = true) {
        if (this.hiddenNow()) return A;
        const s4 = this.c, n5 = p3(s4.eyebrow, r6.eyebrow ?? ""), c4 = p3(s4.title, r6.title ?? ""), u5 = p3(s4.subtitle, r6.sub ?? ""), v6 = o6 && y4(s4.s_show_head, true) && (n5 || c4 || u5);
        return b2`<section class="${this.cls()} ${a3}" style=${this.vars(i5)} id=${String(s4.s_anchor || "") || A}>
      <div class="wrap">${v6 ? b2`<header class="head">${n5 ? b2`<span class="eyebrow">${n5}</span>` : ""}${c4 ? b2`<h2 class="title">${c4}</h2>` : ""}${u5 ? b2`<p class="sub">${u5}</p>` : ""}</header>` : ""}
      ${e5}</div></section>`;
      }
      /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
      hints(e5) {
        const r6 = e5.filter(Boolean);
        return !r6.length || !lt2() || !y4(this.c.s_hints, true) ? "" : b2`<aside class="hints" role="note"><b>💡 ${d4("\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0625\u0639\u062F\u0627\u062F (\u064A\u0638\u0647\u0631 \u0644\u0643 \u0641\u0642\u0637)", "Setup assistant (only you see this)")}</b><ul>${r6.map((a3) => b2`<li>${a3}</li>`)}</ul></aside>`;
      }
      card(e5, r6 = {}) {
        var a3;
        return b2`<article class="pc ${e5.available ? "" : "oos"}">
      <a class="ph" href=${e5.url} @click=${() => D3(e5)}><img src=${e5.image} alt=${e5.name} loading="lazy" />${(a3 = r6.badges) != null && a3.length ? b2`<span class="badges">${r6.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${e5.url} @click=${() => D3(e5)}>${e5.name}</a>
        <div class="pr"><b>${w3(e5.price)}</b>${e5.regular > e5.price ? b2`<s>${w3(e5.regular)}</s>` : ""}</div>
        ${r6.rating !== false && e5.rating > 0 ? b2`<div class="rt">★ ${e5.rating.toFixed(1)}${e5.ratingCount ? b2` <small>(${e5.ratingCount})</small>` : ""}</div>` : ""}
        ${r6.extra ?? ""}
        ${r6.quick !== false ? b2`<button class="btn sm" ?disabled=${!e5.available} @click=${() => this.add(e5)}>${e5.available ? d4("\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629", "Add to cart") : d4("\u0646\u0641\u062F\u062A \u0627\u0644\u0643\u0645\u064A\u0629", "Sold out")}</button>` : ""}
      </div></article>`;
      }
      async add(e5, r6 = 1, a3) {
        D3(e5, 3), await J2(e5.id, r6, a3) ? U2(d4("\u062A\u0645\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629", "Added to cart")) : location.href = e5.url;
      }
    };
    M2.base = i`
  :host { display: block; font-family: inherit; direction: inherit;
    --A: var(--a, var(--color-primary, #b88a44)); --A2: var(--a2, color-mix(in srgb, var(--A) 55%, #000)); --BG: var(--bgc, transparent); --FG: var(--fgc, inherit); --CARD: var(--cardc, #fff); --LINE: color-mix(in srgb, currentColor 14%, transparent); }
  :host([hidden]) { display: none; }
  *, *::before, *::after { box-sizing: border-box; }
  .sec { position: relative; background: var(--BG); color: var(--FG); font-size: var(--fs, 16px); overflow: hidden; isolation: isolate; }
  .sec.has-img::before { content: ''; position: absolute; inset: 0; z-index: -2; background: var(--bgimg) center/cover no-repeat; }
  .sec.has-img::after { content: ''; position: absolute; inset: 0; z-index: -1; background: #000; opacity: var(--ov, .45); }
  .th-light { --BG: var(--bgc, #fff); --FG: var(--fgc, #17140f); --CARD: var(--cardc, #faf8f4); }
  .th-ivory { --BG: var(--bgc, #f7f2e9); --FG: var(--fgc, #1d160c); --CARD: var(--cardc, #fffdf8); }
  .th-dark { --BG: var(--bgc, #111014); --FG: var(--fgc, #f4efe6); --CARD: var(--cardc, #1c1b22); }
  .th-midnight { --BG: var(--bgc, radial-gradient(900px 500px at 85% -10%, #2c1d55 0, transparent 60%), #0f0c18); --FG: var(--fgc, #f6f1e7); --CARD: var(--cardc, #19142d); }
  .th-glass { --BG: var(--bgc, linear-gradient(135deg, color-mix(in srgb, var(--A) 14%, #fff), #fff 60%)); --FG: var(--fgc, #15130f); --CARD: var(--cardc, rgba(255,255,255,.6)); }
  .th-glass .pc, .th-glass .panel { backdrop-filter: blur(14px); }
  .th-accent { --BG: var(--bgc, linear-gradient(135deg, var(--A), var(--A2))); --FG: var(--fgc, #fff); --CARD: var(--cardc, rgba(255,255,255,.12)); }
  .th-dark, .th-midnight, .th-accent { --LINE: rgba(255,255,255,.14); }
  .pt-dots { background-image: radial-gradient(color-mix(in srgb, currentColor 12%, transparent) 1px, transparent 1.4px), var(--BG); background-size: 18px 18px, auto; }
  .pt-grid { background-image: linear-gradient(var(--LINE) 1px, transparent 1px), linear-gradient(90deg, var(--LINE) 1px, transparent 1px), var(--BG); background-size: 36px 36px, 36px 36px, auto; }
  .pt-arabesque { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Cpath d='M28 4l7 17 17 7-17 7-7 17-7-17-17-7 17-7z' fill='none' stroke='%23999' stroke-opacity='.18'/%3E%3C/svg%3E"), var(--BG); }
  .pt-waves { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='20'%3E%3Cpath d='M0 10q20-10 40 0t40 0' fill='none' stroke='%23999' stroke-opacity='.2'/%3E%3C/svg%3E"), var(--BG); }
  .wrap { max-width: var(--maxw, 1240px); margin: 0 auto; padding: var(--pt, 56px) clamp(16px, 4vw, 32px) var(--pb, 56px); }
  .head { margin-bottom: calc(var(--gap, 18px) * 1.4); }
  .al-center .head { text-align: center; } .al-center .head .sub { margin-inline: auto; } .al-end .head { text-align: end; }
  .eyebrow { display: inline-block; letter-spacing: .2em; font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--A); margin-bottom: 10px; }
  .th-accent .eyebrow { color: inherit; opacity: .85; }
  h2.title { margin: 0 0 8px; font-size: clamp(22px, calc(var(--ts, 38px) * .62 + 1.2vw), var(--ts, 38px)); line-height: 1.25; font-weight: 800; }
  .sub { margin: 0; opacity: .72; line-height: 1.8; max-width: 720px; }
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 0; cursor: pointer; text-decoration: none; font: inherit; font-weight: 700;
    padding: 13px 24px; border-radius: 999px; background: var(--A); color: #fff; transition: transform .25s, box-shadow .25s, opacity .2s; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -12px var(--A); } .btn[disabled] { opacity: .45; cursor: not-allowed; transform: none; box-shadow: none; }
  .btn.ghost { background: transparent; color: inherit; border: 1.5px solid currentColor; } .btn.sm { padding: 9px 16px; font-size: 14px; }
  .th-accent .btn:not(.ghost) { background: #fff; color: var(--A2); }
  .bs-rounded .btn { border-radius: 12px; } .bs-square .btn { border-radius: 0; } .bs-outline .btn:not(.ghost) { background: transparent; color: var(--A); border: 1.5px solid var(--A); }
  .bs-underline .btn { background: none; color: var(--A); padding-inline: 0; border-radius: 0; border-bottom: 2px solid var(--A); }
  .bordered .pc, .bordered .panel { border: 1px solid var(--LINE); }
  .panel { background: var(--CARD); border-radius: var(--r, 22px); box-shadow: var(--sh); padding: clamp(16px, 2.4vw, 28px); }
  .grid { display: grid; gap: var(--gap, 18px); grid-template-columns: repeat(var(--cols, 4), minmax(0, 1fr)); }
  @media (max-width: 860px) { .grid { grid-template-columns: repeat(var(--mcols, 2), minmax(0, 1fr)); } }
  .rail { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(220px, calc((100% - var(--gap) * (var(--cols, 4) - 1)) / var(--cols, 4))); gap: var(--gap, 18px); overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 8px; scrollbar-width: thin; }
  @media (max-width: 860px) { .rail { grid-auto-columns: calc((100% - var(--gap)) / var(--mcols, 2) - 8px); } }
  .rail > * { scroll-snap-align: start; }
  .pc { position: relative; display: flex; flex-direction: column; background: var(--CARD); border-radius: var(--r, 22px); overflow: hidden; box-shadow: var(--sh); transition: transform .35s; color: inherit; }
  .pc:hover { transform: translateY(-4px); } .pc.oos { opacity: .55; }
  .ph { position: relative; display: block; aspect-ratio: var(--ratio, 1); background: color-mix(in srgb, currentColor 6%, transparent); }
  .ph img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .badges { position: absolute; inset: 10px 10px auto 10px; display: flex; flex-wrap: wrap; gap: 6px; }
  .bdg { font-size: 11px; font-weight: 800; padding: 4px 9px; border-radius: 999px; background: var(--A); color: #fff; line-height: 1.4; }
  .bdg.alt { background: #111; } .bdg.ok { background: #15803d; } .bdg.warn { background: #b45309; } .bdg.soft { background: #fff; color: #111; }
  .pb { padding: 12px 14px 14px; display: grid; gap: 6px; flex: 1; align-content: start; }
  .pn { color: inherit; text-decoration: none; font-weight: 700; line-height: 1.5; font-size: .95em; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .pr { display: flex; gap: 8px; align-items: baseline; flex-wrap: wrap; } .pr b { color: var(--A); } .th-accent .pr b { color: inherit; } .pr s { opacity: .5; font-size: .85em; }
  .rt { font-size: 13px; color: #d4a017; } .rt small { opacity: .7; color: inherit; }
  .pb .btn { margin-top: auto; width: 100%; }
  .chip { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 999px; border: 1.5px solid var(--LINE); background: var(--CARD); color: inherit; font: inherit; font-size: 14px; cursor: pointer; transition: all .25s; }
  .chip:hover { border-color: var(--A); } .chip.on { background: var(--A); border-color: var(--A); color: #fff; }
  .muted { opacity: .65; } .center { text-align: center; }
  .skel { background: linear-gradient(90deg, #8881 0, #8882 50%, #8881 100%); background-size: 200% 100%; animation: sk 1.4s infinite; border-radius: var(--r, 22px); min-height: 220px; }
  @keyframes sk { to { background-position: -200% 0; } }
  .hints { margin: 0 0 18px; padding: 14px 18px; border-radius: 14px; background: #fff8e1; color: #5b4300; border: 1px dashed #e0b84a; font-size: 13px; line-height: 1.8; }
  .hints ul { margin: 6px 0 0; padding-inline-start: 18px; }
  /* reveal motion */
  .sec .wrap > * { transition: opacity var(--ms, .7s) ease, transform var(--ms, .7s) cubic-bezier(.2,.7,.2,1), filter var(--ms, .7s); }
  :host(:not([in])) .an-fade .wrap > * { opacity: 0; }
  :host(:not([in])) .an-rise .wrap > * { opacity: 0; transform: translateY(28px); }
  :host(:not([in])) .an-zoom .wrap > * { opacity: 0; transform: scale(.94); }
  :host(:not([in])) .an-blur .wrap > * { opacity: 0; filter: blur(12px); }
  :host(:not([in])) .an-slide .wrap > * { opacity: 0; transform: translateX(40px); }
  .stagger .wrap > *:nth-child(2) { transition-delay: .08s; } .stagger .wrap > *:nth-child(3) { transition-delay: .16s; } .stagger .wrap > *:nth-child(4) { transition-delay: .24s; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } :host .sec .wrap > * { opacity: 1 !important; transform: none !important; filter: none !important; } }
  `;
    _3 = M2;
    ut2([
      n4({ type: Object })
    ], _3.prototype, "config");
    mt2 = Object.defineProperty;
    z3 = (t3, e5, r6, a3) => {
      for (var i5 = void 0, o6 = t3.length - 1, s4; o6 >= 0; o6--)
        (s4 = t3[o6]) && (i5 = s4(e5, r6, i5) || i5);
      return i5 && mt2(e5, r6, i5), i5;
    };
    E3 = class E4 extends _3 {
      constructor() {
        super(...arguments), this.rows = [], this.idx = [], this.budget = 0, this.spin = false, this.seq = 0;
      }
      willUpdate(e5) {
        e5.has("config") && this.load();
      }
      async load() {
        const e5 = ++this.seq, r6 = this.c;
        let a3;
        const i5 = Z3(r6.rows).filter((s4) => j2(s4.products).length);
        if (i5.length) a3 = await Promise.all(i5.map(async (s4) => ({ name: p3(s4.name), items: (await H3(j2(s4.products))).filter((n5) => n5.available) })));
        else {
          const s4 = (await rt2(r6.products, m2(r6.auto_source, "best_selling"), 30)).items.filter((n5) => n5.available);
          a3 = [...new Set(s4.map((n5) => n5.category).filter(Boolean))].slice(0, 3).map((n5) => ({ name: n5, items: s4.filter((c4) => c4.category === n5) }));
        }
        if (a3 = a3.filter((s4) => s4.items.length), e5 !== this.seq) return;
        this.rows = a3, this.idx = a3.map(() => 0);
        const o6 = a3.reduce((s4, n5) => s4 + Math.max(...n5.items.map((c4) => c4.price)), 0);
        this.budget = h4(r6.default_budget, 0) || Math.ceil(o6);
      }
      shuffle() {
        let r6 = null;
        for (let a3 = 0; a3 < 200; a3++) {
          const i5 = this.rows.map((s4) => Math.floor(Math.random() * s4.items.length));
          if (i5.reduce((s4, n5, c4) => s4 + this.rows[c4].items[n5].price, 0) <= this.budget) {
            r6 = i5;
            break;
          }
        }
        this.spin = true, setTimeout(() => {
          r6 && (this.idx = r6), this.spin = false;
        }, 260);
      }
      render() {
        const e5 = this.c;
        if (!this.rows.length) return this.shell(b2`<div class="skel"></div>`);
        const r6 = this.rows.map((n5, c4) => n5.items[this.idx[c4] % n5.items.length]), a3 = r6.reduce((n5, c4) => n5 + c4.price, 0), i5 = this.rows.reduce((n5, c4) => n5 + Math.min(...c4.items.map((u5) => u5.price)), 0), o6 = this.rows.reduce((n5, c4) => n5 + Math.max(...c4.items.map((u5) => u5.price)), 0), s4 = (n5, c4) => this.idx = Object.assign([...this.idx], { [n5]: (this.idx[n5] + c4 + this.rows[n5].items.length) % this.rows[n5].items.length });
        return this.shell(
          b2`<div class="g"><div class="stage ${this.spin ? "spin" : ""}" style=${`--rh:${h4(e5.row_height, 150)}px`}>${this.rows.map((n5, c4) => b2`<div class="r"><div class="rn">${n5.name}</div>
        <button class="nav" aria-label="prev" @click=${() => s4(c4, -1)}>‹</button><a class="pic" href=${r6[c4].url}><img src=${r6[c4].image} alt=${r6[c4].name} /><span>${r6[c4].name}<b>${w3(r6[c4].price)}</b></span></a><button class="nav" aria-label="next" @click=${() => s4(c4, 1)}>›</button></div>`)}</div>
      <div class="side"><h3>${p3(e5.side_title, d4("\u0646\u0633\u0651\u0642\u0647\u0627 \u0639\u0644\u0649 \u0630\u0648\u0642\u0643", "Style it your way"))}</h3><p class="muted">${p3(e5.side_text, d4("\u0642\u0644\u0651\u0628 \u0643\u0644 \u0635\u0641\u060C \u0623\u0648 \u062E\u0644\u0651 \xAB\u0646\u0633\u0651\u0642 \u0644\u064A\xBB \u064A\u062E\u062A\u0627\u0631 \u062A\u0634\u0643\u064A\u0644\u0629 \u0636\u0645\u0646 \u0645\u064A\u0632\u0627\u0646\u064A\u062A\u0643.", "Flip each row, or let \xABStyle me\xBB pick within your budget."))}</p>
        <div class="tot">${w3(a3)}</div>${a3 > this.budget ? b2`<div class="over">${d4("\u0641\u0648\u0642 \u0645\u064A\u0632\u0627\u0646\u064A\u062A\u0643 \u0628\u0640", "Over budget by")} ${w3(a3 - this.budget)}</div>` : ""}
        ${y4(e5.show_budget, true) ? b2`<label class="muted">${d4("\u0645\u064A\u0632\u0627\u0646\u064A\u062A\u0643", "Your budget")}: <b>${w3(this.budget)}</b></label><input type="range" min=${Math.floor(i5)} max=${Math.ceil(o6)} .value=${String(this.budget)} @input=${(n5) => this.budget = +n5.target.value} />` : ""}
        <div class="acts"><button class="btn ghost" @click=${this.shuffle}>🎲 ${p3(e5.shuffle_text, d4("\u0646\u0633\u0651\u0642 \u0644\u064A", "Style me"))}</button><button class="btn" @click=${() => bt2(r6.map((n5) => ({ p: n5 })), String(e5.coupon || ""))}>${p3(e5.button, d4("\u0623\u0636\u0641 \u0627\u0644\u062A\u0646\u0633\u064A\u0642 \u0644\u0644\u0633\u0644\u0629", "Add this look"))}</button></div></div></div>`,
          { eyebrow: d4("\u0645\u0646\u0633\u0651\u0642 \u0627\u0644\u0625\u0637\u0644\u0627\u0644\u0629", "Look stylist"), title: "" }
        );
      }
    };
    E3.styles = [_3.base, i`
    .g { display: grid; grid-template-columns: minmax(0, 520px) 1fr; gap: calc(var(--gap) * 1.6); align-items: center; justify-content: center; } @media (max-width: 860px) { .g { grid-template-columns: 1fr; } }
    .stage { display: grid; gap: 10px; padding: 16px; border-radius: var(--r); background: radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--A) 20%, var(--CARD)), var(--CARD)); box-shadow: var(--sh); }
    .r { display: grid; grid-template-columns: 44px 1fr 44px; align-items: center; gap: 8px; }
    .r button.nav { all: unset; cursor: pointer; width: 44px; height: 44px; border-radius: 50%; background: var(--CARD); display: grid; place-items: center; font-size: 20px; box-shadow: var(--sh); }
    .pic { position: relative; height: var(--rh, 150px); border-radius: 18px; overflow: hidden; } .pic img { width: 100%; height: 100%; object-fit: cover; transition: transform .45s cubic-bezier(.2,.8,.2,1), opacity .3s; }
    .spin .pic img { transform: translateY(-12px) scale(.96); opacity: .4; }
    .pic span { position: absolute; inset: auto 8px 8px 8px; display: flex; justify-content: space-between; padding: 6px 10px; border-radius: 12px; background: #fffe; color: #111; font-size: 12px; font-weight: 700; } .pic span b { color: var(--A); }
    .rn { font-size: 11px; font-weight: 800; letter-spacing: .1em; opacity: .6; text-align: center; grid-column: 1 / -1; margin-bottom: -4px; }
    .side h3 { margin: 0 0 8px; font-size: clamp(22px, 2.6vw, 34px); } .tot { font-size: 30px; font-weight: 900; color: var(--A); margin: 10px 0; }
    input[type=range] { width: 100%; accent-color: var(--A); } .acts { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px; } .over { color: #b91c1c; font-weight: 700; font-size: 14px; }
  `];
    x3 = E3;
    z3([
      r5()
    ], x3.prototype, "rows");
    z3([
      r5()
    ], x3.prototype, "idx");
    z3([
      r5()
    ], x3.prototype, "budget");
    z3([
      r5()
    ], x3.prototype, "spin");
    typeof x3 < "u" && x3.registerSallaComponent("salla-taqm-outfit");
  }
});

// dist/taqm-pick.js
var taqm_pick_exports = {};
__export(taqm_pick_exports, {
  default: () => _4
});
function T3(t3) {
  var c4, f4, h7, p5, o6, l3, w6, I5, F5;
  const e5 = m3(t3 == null ? void 0 : t3.sale_price), r6 = m3((t3 == null ? void 0 : t3.regular_price) ?? (t3 == null ? void 0 : t3.price)), a3 = e5 && e5 < r6 ? e5 : m3(t3 == null ? void 0 : t3.price) || r6, i5 = Math.max(m3(t3 == null ? void 0 : t3.regular_price), m3(t3 == null ? void 0 : t3.price), a3), n5 = (Array.isArray(t3 == null ? void 0 : t3.images) ? t3.images : []).map((S4) => String((S4 == null ? void 0 : S4.url) ?? S4 ?? "")).filter(Boolean), s4 = (t3 == null ? void 0 : t3.sold_quantity) ?? (t3 == null ? void 0 : t3.sold);
  return {
    id: Number(t3 == null ? void 0 : t3.id),
    name: String((t3 == null ? void 0 : t3.name) ?? ""),
    url: String((t3 == null ? void 0 : t3.url) ?? "#"),
    image: String(((c4 = t3 == null ? void 0 : t3.image) == null ? void 0 : c4.url) ?? (t3 == null ? void 0 : t3.main_image) ?? (t3 == null ? void 0 : t3.thumbnail) ?? n5[0] ?? ""),
    images: n5,
    price: a3,
    regular: i5,
    discount: i5 > a3 ? Math.round((1 - a3 / i5) * 100) : 0,
    rating: m3(((f4 = t3 == null ? void 0 : t3.rating) == null ? void 0 : f4.stars) ?? ((h7 = t3 == null ? void 0 : t3.rating) == null ? void 0 : h7.rate) ?? (t3 == null ? void 0 : t3.rating)),
    ratingCount: m3((p5 = t3 == null ? void 0 : t3.rating) == null ? void 0 : p5.count),
    qty: (t3 == null ? void 0 : t3.quantity) == null || t3 != null && t3.unlimited_quantity ? null : m3(t3 == null ? void 0 : t3.quantity),
    available: (t3 == null ? void 0 : t3.is_available) !== false && (t3 == null ? void 0 : t3.status) !== "out" && !((t3 == null ? void 0 : t3.quantity) === 0 && !(t3 != null && t3.unlimited_quantity)),
    sold: s4 == null || s4 === "" || !Number.isFinite(Number(s4)) ? null : Number(s4),
    endsAt: Q((t3 == null ? void 0 : t3.discount_ends) ?? (t3 == null ? void 0 : t3.sale_end) ?? (t3 == null ? void 0 : t3.discount_end)),
    category: String(((o6 = t3 == null ? void 0 : t3.category) == null ? void 0 : o6.name) ?? ((w6 = (l3 = t3 == null ? void 0 : t3.categories) == null ? void 0 : l3[0]) == null ? void 0 : w6.name) ?? ""),
    brand: String(((I5 = t3 == null ? void 0 : t3.brand) == null ? void 0 : I5.name) ?? ""),
    promo: String(((F5 = t3 == null ? void 0 : t3.promotion) == null ? void 0 : F5.title) ?? (t3 == null ? void 0 : t3.promotion_title) ?? "")
  };
}
async function Z4(t3) {
  var a3, i5, n5;
  const e5 = (a3 = b5()) == null ? void 0 : a3.product;
  if (!e5) return null;
  const r6 = e5.getDetails ? e5.getDetails.bind(e5) : (n5 = (i5 = e5.api) == null ? void 0 : i5.getDetails) == null ? void 0 : n5.bind(e5.api);
  if (!r6) return null;
  try {
    const s4 = await r6(t3, ["images", "sold_quantity", "category"]), c4 = T3((s4 == null ? void 0 : s4.data) ?? s4);
    return c4.name ? c4 : null;
  } catch {
    return null;
  }
}
async function tt3(t3) {
  await D4();
  const e5 = "ids:" + t3.join(",");
  return k3.has(e5) || k3.set(e5, Promise.all(t3.map(Z4)).then((r6) => r6.filter((a3) => !!a3))), k3.get(e5);
}
async function B2(t3, e5 = [], r6 = 12) {
  await D4();
  const a3 = `src:${t3}:${e5.join(",")}:${r6}`;
  return k3.has(a3) || k3.set(a3, (async () => {
    var s4, c4, f4, h7;
    const i5 = (s4 = b5()) == null ? void 0 : s4.product, n5 = i5 != null && i5.fetch ? i5.fetch.bind(i5) : (f4 = (c4 = i5 == null ? void 0 : i5.api) == null ? void 0 : c4.fetch) == null ? void 0 : f4.bind(i5.api);
    if (!n5) return [];
    try {
      const p5 = { source: t3, per_page: r6 };
      e5.length && (p5.source_value = e5);
      const o6 = await n5(p5);
      return (Array.isArray(o6 == null ? void 0 : o6.data) ? o6.data : Array.isArray(o6) ? o6 : ((h7 = o6 == null ? void 0 : o6.data) == null ? void 0 : h7.products) ?? []).map(T3).filter((w6) => w6.name).slice(0, r6);
    } catch {
      return [];
    }
  })()), k3.get(a3);
}
async function et3(t3, e5 = "best_selling", r6 = 12) {
  const a3 = V4(t3);
  if (a3.length) return { items: (await tt3(a3)).slice(0, r6), auto: false };
  let i5 = await B2(e5, [], r6);
  return !i5.length && e5 !== "latest" && (i5 = await B2("latest", [], r6)), { items: i5, auto: true };
}
async function Y2(t3, e5 = 1, r6) {
  var a3, i5, n5;
  await D4();
  try {
    return await ((n5 = (i5 = (a3 = b5()) == null ? void 0 : a3.cart) == null ? void 0 : i5.addItem) == null ? void 0 : n5.call(i5, r6 ? { id: t3, quantity: e5, notes: r6 } : { id: t3, quantity: e5 })), true;
  } catch {
    return false;
  }
}
async function rt3(t3) {
  var e5, r6, a3;
  if (!t3) return false;
  try {
    return await ((a3 = (r6 = (e5 = b5()) == null ? void 0 : e5.cart) == null ? void 0 : r6.addCoupon) == null ? void 0 : a3.call(r6, t3)), true;
  } catch {
    return false;
  }
}
function H4(t3, e5 = true) {
  var r6, a3, i5;
  try {
    (i5 = e5 ? (r6 = b5()) == null ? void 0 : r6.success : (a3 = b5()) == null ? void 0 : a3.error) == null || i5(t3);
  } catch {
  }
}
function C4() {
  try {
    return { ...M4(), ...JSON.parse(localStorage.getItem(z4) || "{}") };
  } catch {
    return M4();
  }
}
function it3(t3) {
  try {
    localStorage.setItem(z4, JSON.stringify(t3));
  } catch {
  }
}
function G3(t3) {
  const e5 = C4();
  return t3(e5), it3(e5), e5;
}
function nt3() {
  let t3 = false;
  try {
    t3 = !sessionStorage.getItem(z4), sessionStorage.setItem(z4, "1");
  } catch {
  }
  return t3 ? G3((e5) => {
    e5.visits += 1, e5.last = Date.now();
  }) : C4();
}
function ot3() {
  const t3 = [...C4().prices].sort((e5, r6) => e5 - r6);
  return t3.length >= 3 ? t3[Math.floor(t3.length / 2)] : 0;
}
function st3(t3, e5 = C4()) {
  let r6 = (e5.seen[t3.id] || 0) * 2 + (e5.carted.includes(t3.id) ? 4 : 0) + (t3.category && e5.tags[t3.category] || 0);
  const a3 = ot3();
  return a3 && (r6 += Math.max(0, 2 - Math.abs(t3.price - a3) / a3 * 2)), r6;
}
function lt3() {
  q2 || (q2 = true, at3("cart::item.added", (t3) => {
    var r6;
    const e5 = Number(((r6 = t3 == null ? void 0 : t3.data) == null ? void 0 : r6.product_id) ?? 0);
    e5 && G3((a3) => {
      a3.carted.includes(e5) || (a3.carted = [...a3.carted.slice(-40), e5]);
    });
  }));
}
function bt3(t3) {
  const e5 = ht3[t3];
  if (!e5 || L4.has(e5)) return e5;
  L4.add(e5);
  const r6 = document.createElement("link");
  return r6.rel = "stylesheet", r6.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(e5)}:wght@400;500;700;800&display=swap`, document.head.appendChild(r6), e5;
}
async function xt2(t3, e5 = "") {
  let r6 = 0;
  for (const { p: a3, q: i5 } of t3) a3.available && await Y2(a3.id, i5 ?? 1) && r6++;
  return e5 && await rt3(e5), H4(r6 ? u3(`\u0623\u0636\u0641\u0646\u0627 ${r6} \u0645\u0646\u062A\u062C \u0644\u0644\u0633\u0644\u0629${e5 ? " \u0648\u0637\u0628\u0651\u0642\u0646\u0627 \u0627\u0644\u0643\u0648\u062F" : ""}`, `Added ${r6} items${e5 ? " and applied the code" : ""}`) : u3("\u062A\u0639\u0630\u0651\u0631\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629", "Could not add"), !!r6), r6;
}
var b5, D4, W3, X, u3, $4, x4, g2, y5, m3, Q, V4, k3, v3, at3, z4, M4, N3, ct3, q2, dt3, ut3, gt3, ft3, ht3, L4, pt3, mt3, j3, A3, vt2, J3, E5, _4;
var init_taqm_pick = __esm({
  "dist/taqm-pick.js"() {
    "use strict";
    init_lit();
    init_decorators();
    b5 = () => window.salla ?? window.Salla;
    D4 = async () => {
      var t3, e5;
      try {
        await ((e5 = (t3 = b5()) == null ? void 0 : t3.onReady) == null ? void 0 : e5.call(t3));
      } catch {
      }
    };
    W3 = () => {
      var t3, e5, r6, a3, i5;
      try {
        const n5 = ((e5 = (t3 = b5()) == null ? void 0 : t3.lang) == null ? void 0 : e5.locale) ?? ((i5 = (a3 = (r6 = b5()) == null ? void 0 : r6.config) == null ? void 0 : a3.get) == null ? void 0 : i5.call(a3, "user.language_code"));
        if (typeof n5 == "string" && n5) return n5.slice(0, 2);
      } catch {
      }
      return (document.documentElement.lang || "ar").slice(0, 2);
    };
    X = () => W3() === "en";
    u3 = (t3, e5) => X() ? e5 : t3;
    $4 = (t3, e5 = "") => {
      if (t3 == null) return e5;
      if (typeof t3 == "string") {
        const r6 = t3.trim();
        if (r6.startsWith("{") && r6.endsWith("}"))
          try {
            return $4(JSON.parse(r6), e5);
          } catch {
          }
        return r6 || e5;
      }
      if (typeof t3 == "number" || typeof t3 == "boolean") return String(t3);
      if (typeof t3 == "object") {
        const r6 = t3, a3 = r6[W3()] ?? r6.ar ?? r6.en ?? Object.values(r6).find((i5) => typeof i5 == "string" && i5);
        return typeof a3 == "string" && a3.trim() ? a3 : e5;
      }
      return e5;
    };
    x4 = (t3, e5 = "") => {
      const r6 = Array.isArray(t3) ? t3[0] : t3, a3 = typeof r6 == "object" && r6 ? r6.value : r6;
      return a3 == null || a3 === "" ? e5 : String(a3);
    };
    g2 = (t3, e5 = 0) => {
      const r6 = Number(t3);
      return t3 === "" || t3 == null || !Number.isFinite(r6) ? e5 : r6;
    };
    y5 = (t3, e5 = false) => t3 == null || t3 === "" ? e5 : t3 === true || t3 === "true" || t3 === 1 || t3 === "1";
    m3 = (t3) => {
      const e5 = typeof t3 == "object" && t3 ? t3.amount : t3, r6 = Number(e5);
      return Number.isFinite(r6) ? r6 : 0;
    };
    Q = (t3) => {
      if (!t3) return null;
      const e5 = typeof t3 == "number" ? t3 < 1e12 ? t3 * 1e3 : t3 : Date.parse(String(t3).replace(" ", "T"));
      return Number.isFinite(e5) && e5 > Date.now() ? e5 : null;
    };
    V4 = (t3) => (Array.isArray(t3) ? t3 : []).map((e5) => Number(typeof e5 == "object" && e5 ? e5.value : e5)).filter((e5) => Number.isFinite(e5) && e5 > 0);
    k3 = /* @__PURE__ */ new Map();
    v3 = (t3) => {
      var e5, r6;
      try {
        const a3 = (r6 = (e5 = b5()) == null ? void 0 : e5.money) == null ? void 0 : r6.call(e5, t3);
        if (a3) return String(a3);
      } catch {
      }
      return `${Math.round(t3 * 100) / 100} ${u3("\u0631.\u0633", "SAR")}`;
    };
    at3 = (t3, e5) => {
      var r6, a3, i5;
      try {
        (i5 = (a3 = (r6 = b5()) == null ? void 0 : r6.event) == null ? void 0 : a3.on) == null || i5.call(a3, t3, e5);
      } catch {
      }
    };
    z4 = "tw_smart_mem_v1";
    M4 = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
    N3 = (t3, e5 = 1) => G3((r6) => {
      r6.seen[t3.id] = (r6.seen[t3.id] || 0) + e5, r6.prices = [...r6.prices.slice(-29), t3.price], t3.category && (r6.tags[t3.category] = (r6.tags[t3.category] || 0) + e5);
    });
    ct3 = (t3, e5 = true) => {
      if (!e5) return t3;
      const r6 = C4();
      return t3.map((a3, i5) => ({ p: a3, i: i5, s: st3(a3, r6) })).sort((a3, i5) => i5.s - a3.s || a3.i - i5.i).map((a3) => a3.p);
    };
    q2 = false;
    dt3 = () => {
      const t3 = innerWidth, e5 = navigator.userAgent;
      return /iPad|Tablet/i.test(e5) || t3 >= 700 && t3 < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(e5) || t3 < 700 ? "mobile" : "desktop";
    };
    ut3 = () => {
      try {
        return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
      } catch {
        return true;
      }
    };
    gt3 = Object.defineProperty;
    ft3 = (t3, e5, r6, a3) => {
      for (var i5 = void 0, n5 = t3.length - 1, s4; n5 >= 0; n5--)
        (s4 = t3[n5]) && (i5 = s4(e5, r6, i5) || i5);
      return i5 && gt3(e5, r6, i5), i5;
    };
    ht3 = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" };
    L4 = /* @__PURE__ */ new Set();
    pt3 = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" };
    mt3 = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"];
    j3 = class j4 extends i4 {
      get c() {
        return this.config ?? {};
      }
      connectedCallback() {
        super.connectedCallback(), lt3(), nt3();
      }
      firstUpdated() {
        if (!("IntersectionObserver" in window)) {
          this.setAttribute("in", "");
          return;
        }
        this.io = new IntersectionObserver((e5) => {
          var r6;
          e5.some((a3) => a3.isIntersecting) && (this.setAttribute("in", ""), (r6 = this.io) == null || r6.disconnect());
        }, { threshold: 0.12 }), this.io.observe(this);
      }
      disconnectedCallback() {
        var e5;
        super.disconnectedCallback(), (e5 = this.io) == null || e5.disconnect();
      }
      /** Hidden by the merchant's schedule or device rule? */
      hiddenNow() {
        const e5 = this.c, r6 = Date.now(), a3 = Date.parse(String(e5.s_from || "")), i5 = Date.parse(String(e5.s_to || ""));
        if (Number.isFinite(a3) && r6 < a3 || Number.isFinite(i5) && r6 > i5) return true;
        const n5 = dt3();
        return !!(y5(e5.s_hide_mobile) && n5 === "mobile" || y5(e5.s_hide_desktop) && n5 !== "mobile");
      }
      vars(e5 = "") {
        const r6 = this.c, a3 = [], i5 = (s4, c4) => {
          c4 !== "" && c4 != null && a3.push(`${s4}:${c4}`);
        };
        i5("--a", r6.s_accent || ""), i5("--a2", r6.s_accent2 || ""), i5("--bgc", r6.s_bg || ""), i5("--fgc", r6.s_text || ""), i5("--cardc", r6.s_card || ""), i5("--r", `${g2(r6.s_radius, 22)}px`), i5("--gap", `${g2(r6.s_gap, 18)}px`), i5("--ts", `${g2(r6.s_title_size, 38)}px`), i5("--fs", `${g2(r6.s_text_size, 16)}px`), i5("--pt", `${g2(r6.s_pad_top, 56)}px`), i5("--pb", `${g2(r6.s_pad_bottom, 56)}px`), i5("--maxw", pt3[x4(r6.s_width, "normal")] ?? "1240px"), i5("--sh", mt3[Math.max(0, Math.min(5, g2(r6.s_shadow, 2)))]), i5("--ms", `${g2(r6.s_anim_ms, 700)}ms`), i5("--ov", String(g2(r6.s_overlay, 45) / 100)), r6.s_bg_image && i5("--bgimg", `url("${String(r6.s_bg_image)}")`);
        const n5 = bt3(x4(r6.s_font, "inherit"));
        return n5 && i5("font-family", `'${n5}', inherit`), a3.join(";") + (e5 ? ";" + e5 : "");
      }
      cls() {
        const e5 = this.c;
        return [
          "sec",
          `th-${x4(e5.s_theme, "auto")}`,
          `al-${x4(e5.s_align, "start")}`,
          `an-${x4(e5.s_anim, "rise")}`,
          `pt-${x4(e5.s_pattern, "none")}`,
          `bs-${x4(e5.s_btn_style, "pill")}`,
          y5(e5.s_border) ? "bordered" : "",
          y5(e5.s_stagger, true) ? "stagger" : "",
          e5.s_bg_image ? "has-img" : ""
        ].join(" ");
      }
      /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
      shell(e5, r6 = {}, a3 = "", i5 = "", n5 = true) {
        if (this.hiddenNow()) return A;
        const s4 = this.c, c4 = $4(s4.eyebrow, r6.eyebrow ?? ""), f4 = $4(s4.title, r6.title ?? ""), h7 = $4(s4.subtitle, r6.sub ?? ""), p5 = n5 && y5(s4.s_show_head, true) && (c4 || f4 || h7);
        return b2`<section class="${this.cls()} ${a3}" style=${this.vars(i5)} id=${String(s4.s_anchor || "") || A}>
      <div class="wrap">${p5 ? b2`<header class="head">${c4 ? b2`<span class="eyebrow">${c4}</span>` : ""}${f4 ? b2`<h2 class="title">${f4}</h2>` : ""}${h7 ? b2`<p class="sub">${h7}</p>` : ""}</header>` : ""}
      ${e5}</div></section>`;
      }
      /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
      hints(e5) {
        const r6 = e5.filter(Boolean);
        return !r6.length || !ut3() || !y5(this.c.s_hints, true) ? "" : b2`<aside class="hints" role="note"><b>💡 ${u3("\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0625\u0639\u062F\u0627\u062F (\u064A\u0638\u0647\u0631 \u0644\u0643 \u0641\u0642\u0637)", "Setup assistant (only you see this)")}</b><ul>${r6.map((a3) => b2`<li>${a3}</li>`)}</ul></aside>`;
      }
      card(e5, r6 = {}) {
        var a3;
        return b2`<article class="pc ${e5.available ? "" : "oos"}">
      <a class="ph" href=${e5.url} @click=${() => N3(e5)}><img src=${e5.image} alt=${e5.name} loading="lazy" />${(a3 = r6.badges) != null && a3.length ? b2`<span class="badges">${r6.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${e5.url} @click=${() => N3(e5)}>${e5.name}</a>
        <div class="pr"><b>${v3(e5.price)}</b>${e5.regular > e5.price ? b2`<s>${v3(e5.regular)}</s>` : ""}</div>
        ${r6.rating !== false && e5.rating > 0 ? b2`<div class="rt">★ ${e5.rating.toFixed(1)}${e5.ratingCount ? b2` <small>(${e5.ratingCount})</small>` : ""}</div>` : ""}
        ${r6.extra ?? ""}
        ${r6.quick !== false ? b2`<button class="btn sm" ?disabled=${!e5.available} @click=${() => this.add(e5)}>${e5.available ? u3("\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629", "Add to cart") : u3("\u0646\u0641\u062F\u062A \u0627\u0644\u0643\u0645\u064A\u0629", "Sold out")}</button>` : ""}
      </div></article>`;
      }
      async add(e5, r6 = 1, a3) {
        N3(e5, 3), await Y2(e5.id, r6, a3) ? H4(u3("\u062A\u0645\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629", "Added to cart")) : location.href = e5.url;
      }
    };
    j3.base = i`
  :host { display: block; font-family: inherit; direction: inherit;
    --A: var(--a, var(--color-primary, #b88a44)); --A2: var(--a2, color-mix(in srgb, var(--A) 55%, #000)); --BG: var(--bgc, transparent); --FG: var(--fgc, inherit); --CARD: var(--cardc, #fff); --LINE: color-mix(in srgb, currentColor 14%, transparent); }
  :host([hidden]) { display: none; }
  *, *::before, *::after { box-sizing: border-box; }
  .sec { position: relative; background: var(--BG); color: var(--FG); font-size: var(--fs, 16px); overflow: hidden; isolation: isolate; }
  .sec.has-img::before { content: ''; position: absolute; inset: 0; z-index: -2; background: var(--bgimg) center/cover no-repeat; }
  .sec.has-img::after { content: ''; position: absolute; inset: 0; z-index: -1; background: #000; opacity: var(--ov, .45); }
  .th-light { --BG: var(--bgc, #fff); --FG: var(--fgc, #17140f); --CARD: var(--cardc, #faf8f4); }
  .th-ivory { --BG: var(--bgc, #f7f2e9); --FG: var(--fgc, #1d160c); --CARD: var(--cardc, #fffdf8); }
  .th-dark { --BG: var(--bgc, #111014); --FG: var(--fgc, #f4efe6); --CARD: var(--cardc, #1c1b22); }
  .th-midnight { --BG: var(--bgc, radial-gradient(900px 500px at 85% -10%, #2c1d55 0, transparent 60%), #0f0c18); --FG: var(--fgc, #f6f1e7); --CARD: var(--cardc, #19142d); }
  .th-glass { --BG: var(--bgc, linear-gradient(135deg, color-mix(in srgb, var(--A) 14%, #fff), #fff 60%)); --FG: var(--fgc, #15130f); --CARD: var(--cardc, rgba(255,255,255,.6)); }
  .th-glass .pc, .th-glass .panel { backdrop-filter: blur(14px); }
  .th-accent { --BG: var(--bgc, linear-gradient(135deg, var(--A), var(--A2))); --FG: var(--fgc, #fff); --CARD: var(--cardc, rgba(255,255,255,.12)); }
  .th-dark, .th-midnight, .th-accent { --LINE: rgba(255,255,255,.14); }
  .pt-dots { background-image: radial-gradient(color-mix(in srgb, currentColor 12%, transparent) 1px, transparent 1.4px), var(--BG); background-size: 18px 18px, auto; }
  .pt-grid { background-image: linear-gradient(var(--LINE) 1px, transparent 1px), linear-gradient(90deg, var(--LINE) 1px, transparent 1px), var(--BG); background-size: 36px 36px, 36px 36px, auto; }
  .pt-arabesque { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Cpath d='M28 4l7 17 17 7-17 7-7 17-7-17-17-7 17-7z' fill='none' stroke='%23999' stroke-opacity='.18'/%3E%3C/svg%3E"), var(--BG); }
  .pt-waves { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='20'%3E%3Cpath d='M0 10q20-10 40 0t40 0' fill='none' stroke='%23999' stroke-opacity='.2'/%3E%3C/svg%3E"), var(--BG); }
  .wrap { max-width: var(--maxw, 1240px); margin: 0 auto; padding: var(--pt, 56px) clamp(16px, 4vw, 32px) var(--pb, 56px); }
  .head { margin-bottom: calc(var(--gap, 18px) * 1.4); }
  .al-center .head { text-align: center; } .al-center .head .sub { margin-inline: auto; } .al-end .head { text-align: end; }
  .eyebrow { display: inline-block; letter-spacing: .2em; font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--A); margin-bottom: 10px; }
  .th-accent .eyebrow { color: inherit; opacity: .85; }
  h2.title { margin: 0 0 8px; font-size: clamp(22px, calc(var(--ts, 38px) * .62 + 1.2vw), var(--ts, 38px)); line-height: 1.25; font-weight: 800; }
  .sub { margin: 0; opacity: .72; line-height: 1.8; max-width: 720px; }
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 0; cursor: pointer; text-decoration: none; font: inherit; font-weight: 700;
    padding: 13px 24px; border-radius: 999px; background: var(--A); color: #fff; transition: transform .25s, box-shadow .25s, opacity .2s; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -12px var(--A); } .btn[disabled] { opacity: .45; cursor: not-allowed; transform: none; box-shadow: none; }
  .btn.ghost { background: transparent; color: inherit; border: 1.5px solid currentColor; } .btn.sm { padding: 9px 16px; font-size: 14px; }
  .th-accent .btn:not(.ghost) { background: #fff; color: var(--A2); }
  .bs-rounded .btn { border-radius: 12px; } .bs-square .btn { border-radius: 0; } .bs-outline .btn:not(.ghost) { background: transparent; color: var(--A); border: 1.5px solid var(--A); }
  .bs-underline .btn { background: none; color: var(--A); padding-inline: 0; border-radius: 0; border-bottom: 2px solid var(--A); }
  .bordered .pc, .bordered .panel { border: 1px solid var(--LINE); }
  .panel { background: var(--CARD); border-radius: var(--r, 22px); box-shadow: var(--sh); padding: clamp(16px, 2.4vw, 28px); }
  .grid { display: grid; gap: var(--gap, 18px); grid-template-columns: repeat(var(--cols, 4), minmax(0, 1fr)); }
  @media (max-width: 860px) { .grid { grid-template-columns: repeat(var(--mcols, 2), minmax(0, 1fr)); } }
  .rail { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(220px, calc((100% - var(--gap) * (var(--cols, 4) - 1)) / var(--cols, 4))); gap: var(--gap, 18px); overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 8px; scrollbar-width: thin; }
  @media (max-width: 860px) { .rail { grid-auto-columns: calc((100% - var(--gap)) / var(--mcols, 2) - 8px); } }
  .rail > * { scroll-snap-align: start; }
  .pc { position: relative; display: flex; flex-direction: column; background: var(--CARD); border-radius: var(--r, 22px); overflow: hidden; box-shadow: var(--sh); transition: transform .35s; color: inherit; }
  .pc:hover { transform: translateY(-4px); } .pc.oos { opacity: .55; }
  .ph { position: relative; display: block; aspect-ratio: var(--ratio, 1); background: color-mix(in srgb, currentColor 6%, transparent); }
  .ph img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .badges { position: absolute; inset: 10px 10px auto 10px; display: flex; flex-wrap: wrap; gap: 6px; }
  .bdg { font-size: 11px; font-weight: 800; padding: 4px 9px; border-radius: 999px; background: var(--A); color: #fff; line-height: 1.4; }
  .bdg.alt { background: #111; } .bdg.ok { background: #15803d; } .bdg.warn { background: #b45309; } .bdg.soft { background: #fff; color: #111; }
  .pb { padding: 12px 14px 14px; display: grid; gap: 6px; flex: 1; align-content: start; }
  .pn { color: inherit; text-decoration: none; font-weight: 700; line-height: 1.5; font-size: .95em; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .pr { display: flex; gap: 8px; align-items: baseline; flex-wrap: wrap; } .pr b { color: var(--A); } .th-accent .pr b { color: inherit; } .pr s { opacity: .5; font-size: .85em; }
  .rt { font-size: 13px; color: #d4a017; } .rt small { opacity: .7; color: inherit; }
  .pb .btn { margin-top: auto; width: 100%; }
  .chip { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 999px; border: 1.5px solid var(--LINE); background: var(--CARD); color: inherit; font: inherit; font-size: 14px; cursor: pointer; transition: all .25s; }
  .chip:hover { border-color: var(--A); } .chip.on { background: var(--A); border-color: var(--A); color: #fff; }
  .muted { opacity: .65; } .center { text-align: center; }
  .skel { background: linear-gradient(90deg, #8881 0, #8882 50%, #8881 100%); background-size: 200% 100%; animation: sk 1.4s infinite; border-radius: var(--r, 22px); min-height: 220px; }
  @keyframes sk { to { background-position: -200% 0; } }
  .hints { margin: 0 0 18px; padding: 14px 18px; border-radius: 14px; background: #fff8e1; color: #5b4300; border: 1px dashed #e0b84a; font-size: 13px; line-height: 1.8; }
  .hints ul { margin: 6px 0 0; padding-inline-start: 18px; }
  /* reveal motion */
  .sec .wrap > * { transition: opacity var(--ms, .7s) ease, transform var(--ms, .7s) cubic-bezier(.2,.7,.2,1), filter var(--ms, .7s); }
  :host(:not([in])) .an-fade .wrap > * { opacity: 0; }
  :host(:not([in])) .an-rise .wrap > * { opacity: 0; transform: translateY(28px); }
  :host(:not([in])) .an-zoom .wrap > * { opacity: 0; transform: scale(.94); }
  :host(:not([in])) .an-blur .wrap > * { opacity: 0; filter: blur(12px); }
  :host(:not([in])) .an-slide .wrap > * { opacity: 0; transform: translateX(40px); }
  .stagger .wrap > *:nth-child(2) { transition-delay: .08s; } .stagger .wrap > *:nth-child(3) { transition-delay: .16s; } .stagger .wrap > *:nth-child(4) { transition-delay: .24s; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } :host .sec .wrap > * { opacity: 1 !important; transform: none !important; filter: none !important; } }
  `;
    A3 = j3;
    ft3([
      n4({ type: Object })
    ], A3.prototype, "config");
    vt2 = Object.defineProperty;
    J3 = (t3, e5, r6, a3) => {
      for (var i5 = void 0, n5 = t3.length - 1, s4; n5 >= 0; n5--)
        (s4 = t3[n5]) && (i5 = s4(e5, r6, i5) || i5);
      return i5 && vt2(e5, r6, i5), i5;
    };
    E5 = class E6 extends A3 {
      constructor() {
        super(...arguments), this.pool = [], this.picked = [], this.seq = 0;
      }
      willUpdate(e5) {
        if (e5.has("config")) {
          const r6 = ++this.seq;
          et3(this.c.products, x4(this.c.auto_source, "best_selling"), g2(this.c.limit, 12)).then((a3) => {
            r6 === this.seq && (this.pool = ct3(a3.items, y5(this.c.personalize, true)), this.picked = []);
          });
        }
      }
      render() {
        const e5 = this.c, r6 = g2(e5.count, 3), a3 = g2(e5.price, 0), i5 = g2(e5.percent, 0), n5 = this.picked.map((o6) => this.pool.find((l3) => l3.id === o6)).filter((o6) => !!o6), s4 = n5.reduce((o6, l3) => o6 + l3.price, 0), c4 = n5.length === r6, f4 = c4 ? a3 > 0 ? Math.min(a3, s4) : i5 ? s4 * (1 - i5 / 100) : s4 : s4, h7 = s4 - f4, p5 = $4(e5.offer_label, a3 > 0 ? u3(`\u0623\u064A ${r6} \u0628\u0640 ${v3(a3)}`, `Any ${r6} for ${v3(a3)}`) : u3(`\u0627\u062E\u062A\u0631 ${r6} \u0648\u062E\u0630 \u062E\u0635\u0645 ${i5}%`, `Pick ${r6}, get ${i5}% off`));
        return this.shell(
          b2`${this.hints([
            !e5.coupon && u3("\u0623\u0646\u0634\u0626 \u0639\u0631\u0636\u0627\u064B \u0641\u064A \u0633\u0644\u0629 \u064A\u0637\u0627\u0628\u0642 \u0647\u0630\u0627 \u0627\u0644\u0639\u0631\u0636 \u0648\u0636\u0639 \u0643\u0648\u062F\u0647 \u0647\u0646\u0627 \u0644\u064A\u062A\u0637\u0628\u0642 \u0639\u0646\u062F \u0627\u0644\u062F\u0641\u0639.", "Create a matching Salla offer and put its code here."),
            a3 > 0 && this.pool.length >= r6 && a3 >= [...this.pool].sort((o6, l3) => o6.price - l3.price).slice(0, r6).reduce((o6, l3) => o6 + l3.price, 0) && u3("\u062A\u0646\u0628\u064A\u0647: \u0633\u0639\u0631 \u0627\u0644\u0639\u0631\u0636 \u0623\u0639\u0644\u0649 \u0645\u0646 \u0645\u062C\u0645\u0648\u0639 \u0623\u0631\u062E\u0635 \u0627\u0644\u0642\u0637\u0639\u061B \u0642\u062F \u0644\u0627 \u064A\u0648\u0641\u0651\u0631 \u0644\u0644\u0639\u0645\u064A\u0644.", "Warning: the offer price is above the cheapest combination.")
          ])}
      <div class="top panel"><div><b style="font-size:20px">${p5}</b><div class="muted" style="font-size:14px">${c4 ? u3("\u0627\u0643\u062A\u0645\u0644 \u0627\u062E\u062A\u064A\u0627\u0631\u0643 \u{1F389}", "All picked \u{1F389}") : u3(`\u0627\u062E\u062A\u0631 ${r6 - n5.length} \u0628\u0639\u062F`, `${r6 - n5.length} more to pick`)}</div></div>
        <div class="slots">${Array.from({ length: r6 }, (o6, l3) => b2`<div class="sl">${n5[l3] ? b2`<img src=${n5[l3].image} alt="" />` : l3 + 1}</div>`)}</div>
        <div class="deal"><b>${v3(f4)}</b>${h7 > 0 ? b2`<s>${v3(s4)}</s><small>${u3("\u062A\u0648\u0641\u0651\u0631", "You save")} ${v3(h7)}</small>` : ""}</div>
        <button class="btn" ?disabled=${!c4} @click=${() => xt2(n5.map((o6) => ({ p: o6 })), String(e5.coupon || ""))}>${$4(e5.button, u3("\u0623\u0636\u0641 \u0627\u0644\u0639\u0631\u0636 \u0644\u0644\u0633\u0644\u0629", "Add the offer"))}</button></div>
      <div class="grid" style=${`--cols:${g2(e5.cols, 4)};--mcols:${g2(e5.mcols, 2)}`}>${this.pool.map((o6) => {
            const l3 = this.picked.indexOf(o6.id);
            return b2`<button class="p ${l3 >= 0 ? "on" : ""}" aria-disabled=${!o6.available}
        @click=${() => {
              o6.available && (this.picked = l3 >= 0 ? this.picked.filter((w6) => w6 !== o6.id) : this.picked.length < r6 ? [...this.picked, o6.id] : this.picked);
            }}>
        <span class="n">${l3 >= 0 ? l3 + 1 : "+"}</span><img src=${o6.image} alt="" loading="lazy" /><div>${o6.name}<b>${v3(o6.price)}</b></div></button>`;
          })}</div>`,
          { eyebrow: u3("\u0639\u0631\u0636 \u0627\u0644\u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u062D\u0631", "Mix & match"), title: "" }
        );
      }
    };
    E5.styles = [A3.base, i`
    .top { display: flex; gap: 18px; align-items: center; justify-content: space-between; flex-wrap: wrap; margin-bottom: 18px; position: sticky; top: 0; z-index: 2; }
    .slots { display: flex; gap: 8px; } .sl { width: 64px; height: 64px; border-radius: 16px; border: 2px dashed var(--LINE); overflow: hidden; display: grid; place-items: center; font-size: 22px; opacity: .8; background: var(--CARD); }
    .sl img { width: 100%; height: 100%; object-fit: cover; animation: pop .35s; } @keyframes pop { from { transform: scale(.4); } }
    .deal b { font-size: 22px; color: var(--A); } .deal s { opacity: .55; margin-inline-start: 6px; } .deal small { display: block; color: #16a34a; font-weight: 700; }
    .p { all: unset; cursor: pointer; border-radius: var(--r); overflow: hidden; background: var(--CARD); box-shadow: var(--sh); position: relative; border: 2px solid transparent; transition: all .25s; }
    .p.on { border-color: var(--A); } .p img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; } .p div { padding: 10px 12px; font-size: 14px; } .p b { color: var(--A); display: block; }
    .p .n { position: absolute; top: 10px; inset-inline-end: 10px; width: 30px; height: 30px; border-radius: 50%; background: var(--CARD); display: grid; place-items: center; font-weight: 800; box-shadow: 0 4px 10px #0003; } .p.on .n { background: var(--A); color: #fff; }
    .p[aria-disabled=true] { opacity: .45; cursor: not-allowed; }
  `];
    _4 = E5;
    J3([
      r5()
    ], _4.prototype, "pool");
    J3([
      r5()
    ], _4.prototype, "picked");
    typeof _4 < "u" && _4.registerSallaComponent("salla-taqm-pick");
  }
});

// dist/taqm-tiers.js
var taqm_tiers_exports = {};
__export(taqm_tiers_exports, {
  default: () => w4
});
function Y3(t3) {
  var l3, p5, u5, f4, o6, $6, A5, I5, F5;
  const r6 = b6(t3 == null ? void 0 : t3.sale_price), a3 = b6((t3 == null ? void 0 : t3.regular_price) ?? (t3 == null ? void 0 : t3.price)), n5 = r6 && r6 < a3 ? r6 : b6(t3 == null ? void 0 : t3.price) || a3, e5 = Math.max(b6(t3 == null ? void 0 : t3.regular_price), b6(t3 == null ? void 0 : t3.price), n5), i5 = (Array.isArray(t3 == null ? void 0 : t3.images) ? t3.images : []).map((C5) => String((C5 == null ? void 0 : C5.url) ?? C5 ?? "")).filter(Boolean), s4 = (t3 == null ? void 0 : t3.sold_quantity) ?? (t3 == null ? void 0 : t3.sold);
  return {
    id: Number(t3 == null ? void 0 : t3.id),
    name: String((t3 == null ? void 0 : t3.name) ?? ""),
    url: String((t3 == null ? void 0 : t3.url) ?? "#"),
    image: String(((l3 = t3 == null ? void 0 : t3.image) == null ? void 0 : l3.url) ?? (t3 == null ? void 0 : t3.main_image) ?? (t3 == null ? void 0 : t3.thumbnail) ?? i5[0] ?? ""),
    images: i5,
    price: n5,
    regular: e5,
    discount: e5 > n5 ? Math.round((1 - n5 / e5) * 100) : 0,
    rating: b6(((p5 = t3 == null ? void 0 : t3.rating) == null ? void 0 : p5.stars) ?? ((u5 = t3 == null ? void 0 : t3.rating) == null ? void 0 : u5.rate) ?? (t3 == null ? void 0 : t3.rating)),
    ratingCount: b6((f4 = t3 == null ? void 0 : t3.rating) == null ? void 0 : f4.count),
    qty: (t3 == null ? void 0 : t3.quantity) == null || t3 != null && t3.unlimited_quantity ? null : b6(t3 == null ? void 0 : t3.quantity),
    available: (t3 == null ? void 0 : t3.is_available) !== false && (t3 == null ? void 0 : t3.status) !== "out" && !((t3 == null ? void 0 : t3.quantity) === 0 && !(t3 != null && t3.unlimited_quantity)),
    sold: s4 == null || s4 === "" || !Number.isFinite(Number(s4)) ? null : Number(s4),
    endsAt: Z5((t3 == null ? void 0 : t3.discount_ends) ?? (t3 == null ? void 0 : t3.sale_end) ?? (t3 == null ? void 0 : t3.discount_end)),
    category: String(((o6 = t3 == null ? void 0 : t3.category) == null ? void 0 : o6.name) ?? ((A5 = ($6 = t3 == null ? void 0 : t3.categories) == null ? void 0 : $6[0]) == null ? void 0 : A5.name) ?? ""),
    brand: String(((I5 = t3 == null ? void 0 : t3.brand) == null ? void 0 : I5.name) ?? ""),
    promo: String(((F5 = t3 == null ? void 0 : t3.promotion) == null ? void 0 : F5.title) ?? (t3 == null ? void 0 : t3.promotion_title) ?? "")
  };
}
async function tt4(t3) {
  var n5, e5, i5;
  const r6 = (n5 = h5()) == null ? void 0 : n5.product;
  if (!r6) return null;
  const a3 = r6.getDetails ? r6.getDetails.bind(r6) : (i5 = (e5 = r6.api) == null ? void 0 : e5.getDetails) == null ? void 0 : i5.bind(r6.api);
  if (!a3) return null;
  try {
    const s4 = await a3(t3, ["images", "sold_quantity", "category"]), l3 = Y3((s4 == null ? void 0 : s4.data) ?? s4);
    return l3.name ? l3 : null;
  } catch {
    return null;
  }
}
async function U3(t3) {
  await N4();
  const r6 = "ids:" + t3.join(",");
  return y6.has(r6) || y6.set(r6, Promise.all(t3.map(tt4)).then((a3) => a3.filter((n5) => !!n5))), y6.get(r6);
}
async function R2(t3, r6 = [], a3 = 12) {
  await N4();
  const n5 = `src:${t3}:${r6.join(",")}:${a3}`;
  return y6.has(n5) || y6.set(n5, (async () => {
    var s4, l3, p5, u5;
    const e5 = (s4 = h5()) == null ? void 0 : s4.product, i5 = e5 != null && e5.fetch ? e5.fetch.bind(e5) : (p5 = (l3 = e5 == null ? void 0 : e5.api) == null ? void 0 : l3.fetch) == null ? void 0 : p5.bind(e5.api);
    if (!i5) return [];
    try {
      const f4 = { source: t3, per_page: a3 };
      r6.length && (f4.source_value = r6);
      const o6 = await i5(f4);
      return (Array.isArray(o6 == null ? void 0 : o6.data) ? o6.data : Array.isArray(o6) ? o6 : ((u5 = o6 == null ? void 0 : o6.data) == null ? void 0 : u5.products) ?? []).map(Y3).filter((A5) => A5.name).slice(0, a3);
    } catch {
      return [];
    }
  })()), y6.get(n5);
}
async function rt4(t3, r6 = "best_selling", a3 = 12) {
  const n5 = z5(t3);
  if (n5.length) return { items: (await U3(n5)).slice(0, a3), auto: false };
  let e5 = await R2(r6, [], a3);
  return !e5.length && r6 !== "latest" && (e5 = await R2("latest", [], a3)), { items: e5, auto: true };
}
async function W4(t3, r6 = 1, a3) {
  var n5, e5, i5;
  await N4();
  try {
    return await ((i5 = (e5 = (n5 = h5()) == null ? void 0 : n5.cart) == null ? void 0 : e5.addItem) == null ? void 0 : i5.call(e5, a3 ? { id: t3, quantity: r6, notes: a3 } : { id: t3, quantity: r6 })), true;
  } catch {
    return false;
  }
}
async function at4(t3) {
  var r6, a3, n5;
  if (!t3) return false;
  try {
    return await ((n5 = (a3 = (r6 = h5()) == null ? void 0 : r6.cart) == null ? void 0 : a3.addCoupon) == null ? void 0 : n5.call(a3, t3)), true;
  } catch {
    return false;
  }
}
function H5(t3, r6 = true) {
  var a3, n5, e5;
  try {
    (e5 = r6 ? (a3 = h5()) == null ? void 0 : a3.success : (n5 = h5()) == null ? void 0 : n5.error) == null || e5(t3);
  } catch {
  }
}
function J4() {
  try {
    return { ...B3(), ...JSON.parse(localStorage.getItem(q3) || "{}") };
  } catch {
    return B3();
  }
}
function nt4(t3) {
  try {
    localStorage.setItem(q3, JSON.stringify(t3));
  } catch {
  }
}
function D5(t3) {
  const r6 = J4();
  return t3(r6), nt4(r6), r6;
}
function it4() {
  let t3 = false;
  try {
    t3 = !sessionStorage.getItem(q3), sessionStorage.setItem(q3, "1");
  } catch {
  }
  return t3 ? D5((r6) => {
    r6.visits += 1, r6.last = Date.now();
  }) : J4();
}
function st4() {
  M5 || (M5 = true, et4("cart::item.added", (t3) => {
    var a3;
    const r6 = Number(((a3 = t3 == null ? void 0 : t3.data) == null ? void 0 : a3.product_id) ?? 0);
    r6 && D5((n5) => {
      n5.carted.includes(r6) || (n5.carted = [...n5.carted.slice(-40), r6]);
    });
  }));
}
function gt4(t3) {
  const r6 = ut4[t3];
  if (!r6 || L5.has(r6)) return r6;
  L5.add(r6);
  const a3 = document.createElement("link");
  return a3.rel = "stylesheet", a3.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(r6)}:wght@400;500;700;800&display=swap`, document.head.appendChild(a3), r6;
}
var h5, N4, T4, V5, d5, _5, x5, g3, v4, b6, Z5, z5, y6, m4, et4, q3, B3, S3, M5, ot4, ct4, lt4, dt4, ut4, L5, pt4, ht4, E7, k4, mt4, ft4, bt4, xt3, K3, G4, w4;
var init_taqm_tiers = __esm({
  "dist/taqm-tiers.js"() {
    "use strict";
    init_lit();
    init_decorators();
    h5 = () => window.salla ?? window.Salla;
    N4 = async () => {
      var t3, r6;
      try {
        await ((r6 = (t3 = h5()) == null ? void 0 : t3.onReady) == null ? void 0 : r6.call(t3));
      } catch {
      }
    };
    T4 = () => {
      var t3, r6, a3, n5, e5;
      try {
        const i5 = ((r6 = (t3 = h5()) == null ? void 0 : t3.lang) == null ? void 0 : r6.locale) ?? ((e5 = (n5 = (a3 = h5()) == null ? void 0 : a3.config) == null ? void 0 : n5.get) == null ? void 0 : e5.call(n5, "user.language_code"));
        if (typeof i5 == "string" && i5) return i5.slice(0, 2);
      } catch {
      }
      return (document.documentElement.lang || "ar").slice(0, 2);
    };
    V5 = () => T4() === "en";
    d5 = (t3, r6) => V5() ? r6 : t3;
    _5 = (t3, r6 = "") => {
      if (t3 == null) return r6;
      if (typeof t3 == "string") {
        const a3 = t3.trim();
        if (a3.startsWith("{") && a3.endsWith("}"))
          try {
            return _5(JSON.parse(a3), r6);
          } catch {
          }
        return a3 || r6;
      }
      if (typeof t3 == "number" || typeof t3 == "boolean") return String(t3);
      if (typeof t3 == "object") {
        const a3 = t3, n5 = a3[T4()] ?? a3.ar ?? a3.en ?? Object.values(a3).find((e5) => typeof e5 == "string" && e5);
        return typeof n5 == "string" && n5.trim() ? n5 : r6;
      }
      return r6;
    };
    x5 = (t3, r6 = "") => {
      const a3 = Array.isArray(t3) ? t3[0] : t3, n5 = typeof a3 == "object" && a3 ? a3.value : a3;
      return n5 == null || n5 === "" ? r6 : String(n5);
    };
    g3 = (t3, r6 = 0) => {
      const a3 = Number(t3);
      return t3 === "" || t3 == null || !Number.isFinite(a3) ? r6 : a3;
    };
    v4 = (t3, r6 = false) => t3 == null || t3 === "" ? r6 : t3 === true || t3 === "true" || t3 === 1 || t3 === "1";
    b6 = (t3) => {
      const r6 = typeof t3 == "object" && t3 ? t3.amount : t3, a3 = Number(r6);
      return Number.isFinite(a3) ? a3 : 0;
    };
    Z5 = (t3) => {
      if (!t3) return null;
      const r6 = typeof t3 == "number" ? t3 < 1e12 ? t3 * 1e3 : t3 : Date.parse(String(t3).replace(" ", "T"));
      return Number.isFinite(r6) && r6 > Date.now() ? r6 : null;
    };
    z5 = (t3) => (Array.isArray(t3) ? t3 : []).map((r6) => Number(typeof r6 == "object" && r6 ? r6.value : r6)).filter((r6) => Number.isFinite(r6) && r6 > 0);
    y6 = /* @__PURE__ */ new Map();
    m4 = (t3) => {
      var r6, a3;
      try {
        const n5 = (a3 = (r6 = h5()) == null ? void 0 : r6.money) == null ? void 0 : a3.call(r6, t3);
        if (n5) return String(n5);
      } catch {
      }
      return `${Math.round(t3 * 100) / 100} ${d5("\u0631.\u0633", "SAR")}`;
    };
    et4 = (t3, r6) => {
      var a3, n5, e5;
      try {
        (e5 = (n5 = (a3 = h5()) == null ? void 0 : a3.event) == null ? void 0 : n5.on) == null || e5.call(n5, t3, r6);
      } catch {
      }
    };
    q3 = "tw_smart_mem_v1";
    B3 = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
    S3 = (t3, r6 = 1) => D5((a3) => {
      a3.seen[t3.id] = (a3.seen[t3.id] || 0) + r6, a3.prices = [...a3.prices.slice(-29), t3.price], t3.category && (a3.tags[t3.category] = (a3.tags[t3.category] || 0) + r6);
    });
    M5 = false;
    ot4 = () => {
      const t3 = innerWidth, r6 = navigator.userAgent;
      return /iPad|Tablet/i.test(r6) || t3 >= 700 && t3 < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(r6) || t3 < 700 ? "mobile" : "desktop";
    };
    ct4 = () => {
      try {
        return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
      } catch {
        return true;
      }
    };
    lt4 = Object.defineProperty;
    dt4 = (t3, r6, a3, n5) => {
      for (var e5 = void 0, i5 = t3.length - 1, s4; i5 >= 0; i5--)
        (s4 = t3[i5]) && (e5 = s4(r6, a3, e5) || e5);
      return e5 && lt4(r6, a3, e5), e5;
    };
    ut4 = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" };
    L5 = /* @__PURE__ */ new Set();
    pt4 = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" };
    ht4 = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"];
    E7 = class E8 extends i4 {
      get c() {
        return this.config ?? {};
      }
      connectedCallback() {
        super.connectedCallback(), st4(), it4();
      }
      firstUpdated() {
        if (!("IntersectionObserver" in window)) {
          this.setAttribute("in", "");
          return;
        }
        this.io = new IntersectionObserver((r6) => {
          var a3;
          r6.some((n5) => n5.isIntersecting) && (this.setAttribute("in", ""), (a3 = this.io) == null || a3.disconnect());
        }, { threshold: 0.12 }), this.io.observe(this);
      }
      disconnectedCallback() {
        var r6;
        super.disconnectedCallback(), (r6 = this.io) == null || r6.disconnect();
      }
      /** Hidden by the merchant's schedule or device rule? */
      hiddenNow() {
        const r6 = this.c, a3 = Date.now(), n5 = Date.parse(String(r6.s_from || "")), e5 = Date.parse(String(r6.s_to || ""));
        if (Number.isFinite(n5) && a3 < n5 || Number.isFinite(e5) && a3 > e5) return true;
        const i5 = ot4();
        return !!(v4(r6.s_hide_mobile) && i5 === "mobile" || v4(r6.s_hide_desktop) && i5 !== "mobile");
      }
      vars(r6 = "") {
        const a3 = this.c, n5 = [], e5 = (s4, l3) => {
          l3 !== "" && l3 != null && n5.push(`${s4}:${l3}`);
        };
        e5("--a", a3.s_accent || ""), e5("--a2", a3.s_accent2 || ""), e5("--bgc", a3.s_bg || ""), e5("--fgc", a3.s_text || ""), e5("--cardc", a3.s_card || ""), e5("--r", `${g3(a3.s_radius, 22)}px`), e5("--gap", `${g3(a3.s_gap, 18)}px`), e5("--ts", `${g3(a3.s_title_size, 38)}px`), e5("--fs", `${g3(a3.s_text_size, 16)}px`), e5("--pt", `${g3(a3.s_pad_top, 56)}px`), e5("--pb", `${g3(a3.s_pad_bottom, 56)}px`), e5("--maxw", pt4[x5(a3.s_width, "normal")] ?? "1240px"), e5("--sh", ht4[Math.max(0, Math.min(5, g3(a3.s_shadow, 2)))]), e5("--ms", `${g3(a3.s_anim_ms, 700)}ms`), e5("--ov", String(g3(a3.s_overlay, 45) / 100)), a3.s_bg_image && e5("--bgimg", `url("${String(a3.s_bg_image)}")`);
        const i5 = gt4(x5(a3.s_font, "inherit"));
        return i5 && e5("font-family", `'${i5}', inherit`), n5.join(";") + (r6 ? ";" + r6 : "");
      }
      cls() {
        const r6 = this.c;
        return [
          "sec",
          `th-${x5(r6.s_theme, "auto")}`,
          `al-${x5(r6.s_align, "start")}`,
          `an-${x5(r6.s_anim, "rise")}`,
          `pt-${x5(r6.s_pattern, "none")}`,
          `bs-${x5(r6.s_btn_style, "pill")}`,
          v4(r6.s_border) ? "bordered" : "",
          v4(r6.s_stagger, true) ? "stagger" : "",
          r6.s_bg_image ? "has-img" : ""
        ].join(" ");
      }
      /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
      shell(r6, a3 = {}, n5 = "", e5 = "", i5 = true) {
        if (this.hiddenNow()) return A;
        const s4 = this.c, l3 = _5(s4.eyebrow, a3.eyebrow ?? ""), p5 = _5(s4.title, a3.title ?? ""), u5 = _5(s4.subtitle, a3.sub ?? ""), f4 = i5 && v4(s4.s_show_head, true) && (l3 || p5 || u5);
        return b2`<section class="${this.cls()} ${n5}" style=${this.vars(e5)} id=${String(s4.s_anchor || "") || A}>
      <div class="wrap">${f4 ? b2`<header class="head">${l3 ? b2`<span class="eyebrow">${l3}</span>` : ""}${p5 ? b2`<h2 class="title">${p5}</h2>` : ""}${u5 ? b2`<p class="sub">${u5}</p>` : ""}</header>` : ""}
      ${r6}</div></section>`;
      }
      /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
      hints(r6) {
        const a3 = r6.filter(Boolean);
        return !a3.length || !ct4() || !v4(this.c.s_hints, true) ? "" : b2`<aside class="hints" role="note"><b>💡 ${d5("\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0625\u0639\u062F\u0627\u062F (\u064A\u0638\u0647\u0631 \u0644\u0643 \u0641\u0642\u0637)", "Setup assistant (only you see this)")}</b><ul>${a3.map((n5) => b2`<li>${n5}</li>`)}</ul></aside>`;
      }
      card(r6, a3 = {}) {
        var n5;
        return b2`<article class="pc ${r6.available ? "" : "oos"}">
      <a class="ph" href=${r6.url} @click=${() => S3(r6)}><img src=${r6.image} alt=${r6.name} loading="lazy" />${(n5 = a3.badges) != null && n5.length ? b2`<span class="badges">${a3.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${r6.url} @click=${() => S3(r6)}>${r6.name}</a>
        <div class="pr"><b>${m4(r6.price)}</b>${r6.regular > r6.price ? b2`<s>${m4(r6.regular)}</s>` : ""}</div>
        ${a3.rating !== false && r6.rating > 0 ? b2`<div class="rt">★ ${r6.rating.toFixed(1)}${r6.ratingCount ? b2` <small>(${r6.ratingCount})</small>` : ""}</div>` : ""}
        ${a3.extra ?? ""}
        ${a3.quick !== false ? b2`<button class="btn sm" ?disabled=${!r6.available} @click=${() => this.add(r6)}>${r6.available ? d5("\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629", "Add to cart") : d5("\u0646\u0641\u062F\u062A \u0627\u0644\u0643\u0645\u064A\u0629", "Sold out")}</button>` : ""}
      </div></article>`;
      }
      async add(r6, a3 = 1, n5) {
        S3(r6, 3), await W4(r6.id, a3, n5) ? H5(d5("\u062A\u0645\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629", "Added to cart")) : location.href = r6.url;
      }
    };
    E7.base = i`
  :host { display: block; font-family: inherit; direction: inherit;
    --A: var(--a, var(--color-primary, #b88a44)); --A2: var(--a2, color-mix(in srgb, var(--A) 55%, #000)); --BG: var(--bgc, transparent); --FG: var(--fgc, inherit); --CARD: var(--cardc, #fff); --LINE: color-mix(in srgb, currentColor 14%, transparent); }
  :host([hidden]) { display: none; }
  *, *::before, *::after { box-sizing: border-box; }
  .sec { position: relative; background: var(--BG); color: var(--FG); font-size: var(--fs, 16px); overflow: hidden; isolation: isolate; }
  .sec.has-img::before { content: ''; position: absolute; inset: 0; z-index: -2; background: var(--bgimg) center/cover no-repeat; }
  .sec.has-img::after { content: ''; position: absolute; inset: 0; z-index: -1; background: #000; opacity: var(--ov, .45); }
  .th-light { --BG: var(--bgc, #fff); --FG: var(--fgc, #17140f); --CARD: var(--cardc, #faf8f4); }
  .th-ivory { --BG: var(--bgc, #f7f2e9); --FG: var(--fgc, #1d160c); --CARD: var(--cardc, #fffdf8); }
  .th-dark { --BG: var(--bgc, #111014); --FG: var(--fgc, #f4efe6); --CARD: var(--cardc, #1c1b22); }
  .th-midnight { --BG: var(--bgc, radial-gradient(900px 500px at 85% -10%, #2c1d55 0, transparent 60%), #0f0c18); --FG: var(--fgc, #f6f1e7); --CARD: var(--cardc, #19142d); }
  .th-glass { --BG: var(--bgc, linear-gradient(135deg, color-mix(in srgb, var(--A) 14%, #fff), #fff 60%)); --FG: var(--fgc, #15130f); --CARD: var(--cardc, rgba(255,255,255,.6)); }
  .th-glass .pc, .th-glass .panel { backdrop-filter: blur(14px); }
  .th-accent { --BG: var(--bgc, linear-gradient(135deg, var(--A), var(--A2))); --FG: var(--fgc, #fff); --CARD: var(--cardc, rgba(255,255,255,.12)); }
  .th-dark, .th-midnight, .th-accent { --LINE: rgba(255,255,255,.14); }
  .pt-dots { background-image: radial-gradient(color-mix(in srgb, currentColor 12%, transparent) 1px, transparent 1.4px), var(--BG); background-size: 18px 18px, auto; }
  .pt-grid { background-image: linear-gradient(var(--LINE) 1px, transparent 1px), linear-gradient(90deg, var(--LINE) 1px, transparent 1px), var(--BG); background-size: 36px 36px, 36px 36px, auto; }
  .pt-arabesque { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Cpath d='M28 4l7 17 17 7-17 7-7 17-7-17-17-7 17-7z' fill='none' stroke='%23999' stroke-opacity='.18'/%3E%3C/svg%3E"), var(--BG); }
  .pt-waves { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='20'%3E%3Cpath d='M0 10q20-10 40 0t40 0' fill='none' stroke='%23999' stroke-opacity='.2'/%3E%3C/svg%3E"), var(--BG); }
  .wrap { max-width: var(--maxw, 1240px); margin: 0 auto; padding: var(--pt, 56px) clamp(16px, 4vw, 32px) var(--pb, 56px); }
  .head { margin-bottom: calc(var(--gap, 18px) * 1.4); }
  .al-center .head { text-align: center; } .al-center .head .sub { margin-inline: auto; } .al-end .head { text-align: end; }
  .eyebrow { display: inline-block; letter-spacing: .2em; font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--A); margin-bottom: 10px; }
  .th-accent .eyebrow { color: inherit; opacity: .85; }
  h2.title { margin: 0 0 8px; font-size: clamp(22px, calc(var(--ts, 38px) * .62 + 1.2vw), var(--ts, 38px)); line-height: 1.25; font-weight: 800; }
  .sub { margin: 0; opacity: .72; line-height: 1.8; max-width: 720px; }
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 0; cursor: pointer; text-decoration: none; font: inherit; font-weight: 700;
    padding: 13px 24px; border-radius: 999px; background: var(--A); color: #fff; transition: transform .25s, box-shadow .25s, opacity .2s; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -12px var(--A); } .btn[disabled] { opacity: .45; cursor: not-allowed; transform: none; box-shadow: none; }
  .btn.ghost { background: transparent; color: inherit; border: 1.5px solid currentColor; } .btn.sm { padding: 9px 16px; font-size: 14px; }
  .th-accent .btn:not(.ghost) { background: #fff; color: var(--A2); }
  .bs-rounded .btn { border-radius: 12px; } .bs-square .btn { border-radius: 0; } .bs-outline .btn:not(.ghost) { background: transparent; color: var(--A); border: 1.5px solid var(--A); }
  .bs-underline .btn { background: none; color: var(--A); padding-inline: 0; border-radius: 0; border-bottom: 2px solid var(--A); }
  .bordered .pc, .bordered .panel { border: 1px solid var(--LINE); }
  .panel { background: var(--CARD); border-radius: var(--r, 22px); box-shadow: var(--sh); padding: clamp(16px, 2.4vw, 28px); }
  .grid { display: grid; gap: var(--gap, 18px); grid-template-columns: repeat(var(--cols, 4), minmax(0, 1fr)); }
  @media (max-width: 860px) { .grid { grid-template-columns: repeat(var(--mcols, 2), minmax(0, 1fr)); } }
  .rail { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(220px, calc((100% - var(--gap) * (var(--cols, 4) - 1)) / var(--cols, 4))); gap: var(--gap, 18px); overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 8px; scrollbar-width: thin; }
  @media (max-width: 860px) { .rail { grid-auto-columns: calc((100% - var(--gap)) / var(--mcols, 2) - 8px); } }
  .rail > * { scroll-snap-align: start; }
  .pc { position: relative; display: flex; flex-direction: column; background: var(--CARD); border-radius: var(--r, 22px); overflow: hidden; box-shadow: var(--sh); transition: transform .35s; color: inherit; }
  .pc:hover { transform: translateY(-4px); } .pc.oos { opacity: .55; }
  .ph { position: relative; display: block; aspect-ratio: var(--ratio, 1); background: color-mix(in srgb, currentColor 6%, transparent); }
  .ph img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .badges { position: absolute; inset: 10px 10px auto 10px; display: flex; flex-wrap: wrap; gap: 6px; }
  .bdg { font-size: 11px; font-weight: 800; padding: 4px 9px; border-radius: 999px; background: var(--A); color: #fff; line-height: 1.4; }
  .bdg.alt { background: #111; } .bdg.ok { background: #15803d; } .bdg.warn { background: #b45309; } .bdg.soft { background: #fff; color: #111; }
  .pb { padding: 12px 14px 14px; display: grid; gap: 6px; flex: 1; align-content: start; }
  .pn { color: inherit; text-decoration: none; font-weight: 700; line-height: 1.5; font-size: .95em; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .pr { display: flex; gap: 8px; align-items: baseline; flex-wrap: wrap; } .pr b { color: var(--A); } .th-accent .pr b { color: inherit; } .pr s { opacity: .5; font-size: .85em; }
  .rt { font-size: 13px; color: #d4a017; } .rt small { opacity: .7; color: inherit; }
  .pb .btn { margin-top: auto; width: 100%; }
  .chip { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 999px; border: 1.5px solid var(--LINE); background: var(--CARD); color: inherit; font: inherit; font-size: 14px; cursor: pointer; transition: all .25s; }
  .chip:hover { border-color: var(--A); } .chip.on { background: var(--A); border-color: var(--A); color: #fff; }
  .muted { opacity: .65; } .center { text-align: center; }
  .skel { background: linear-gradient(90deg, #8881 0, #8882 50%, #8881 100%); background-size: 200% 100%; animation: sk 1.4s infinite; border-radius: var(--r, 22px); min-height: 220px; }
  @keyframes sk { to { background-position: -200% 0; } }
  .hints { margin: 0 0 18px; padding: 14px 18px; border-radius: 14px; background: #fff8e1; color: #5b4300; border: 1px dashed #e0b84a; font-size: 13px; line-height: 1.8; }
  .hints ul { margin: 6px 0 0; padding-inline-start: 18px; }
  /* reveal motion */
  .sec .wrap > * { transition: opacity var(--ms, .7s) ease, transform var(--ms, .7s) cubic-bezier(.2,.7,.2,1), filter var(--ms, .7s); }
  :host(:not([in])) .an-fade .wrap > * { opacity: 0; }
  :host(:not([in])) .an-rise .wrap > * { opacity: 0; transform: translateY(28px); }
  :host(:not([in])) .an-zoom .wrap > * { opacity: 0; transform: scale(.94); }
  :host(:not([in])) .an-blur .wrap > * { opacity: 0; filter: blur(12px); }
  :host(:not([in])) .an-slide .wrap > * { opacity: 0; transform: translateX(40px); }
  .stagger .wrap > *:nth-child(2) { transition-delay: .08s; } .stagger .wrap > *:nth-child(3) { transition-delay: .16s; } .stagger .wrap > *:nth-child(4) { transition-delay: .24s; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } :host .sec .wrap > * { opacity: 1 !important; transform: none !important; filter: none !important; } }
  `;
    k4 = E7;
    dt4([
      n4({ type: Object })
    ], k4.prototype, "config");
    mt4 = (t3, r6) => r6.filter((a3) => t3 >= a3.min).sort((a3, n5) => n5.pct - a3.pct)[0] ?? null;
    ft4 = (t3, r6) => r6.filter((a3) => t3 < a3.min).sort((a3, n5) => a3.min - n5.min)[0] ?? null;
    bt4 = (t3) => (Array.isArray(t3) ? t3 : []).map((r6) => ({ min: g3(r6.min, 0), pct: g3(r6.pct, 0) })).filter((r6) => r6.min > 0 && r6.pct > 0);
    xt3 = Object.defineProperty;
    K3 = (t3, r6, a3, n5) => {
      for (var e5 = void 0, i5 = t3.length - 1, s4; i5 >= 0; i5--)
        (s4 = t3[i5]) && (e5 = s4(r6, a3, e5) || e5);
      return e5 && xt3(r6, a3, e5), e5;
    };
    G4 = class G5 extends k4 {
      constructor() {
        super(...arguments), this.p = null, this.q = 1;
      }
      willUpdate(r6) {
        r6.has("config") && (z5(this.c.product).length ? U3(z5(this.c.product)) : rt4(null, x5(this.c.auto_source, "best_selling"), 1).then((a3) => a3.items)).then((a3) => {
          this.p = a3[0] ?? null, this.q = g3(this.c.start_qty, 1);
        });
      }
      render() {
        const r6 = this.c, a3 = this.p;
        if (!a3) return this.shell(b2`<div class="skel"></div>`);
        const n5 = bt4(r6.tiers).sort((o6, $6) => o6.min - $6.min), e5 = mt4(this.q, n5), i5 = ft4(this.q, n5), s4 = a3.price * (1 - ((e5 == null ? void 0 : e5.pct) ?? 0) / 100), l3 = s4 * this.q, p5 = a3.price * this.q - l3, u5 = Math.min(g3(r6.max_qty, 20), a3.qty ?? 999), f4 = async () => {
          await W4(a3.id, this.q) ? (e5 && r6.coupon && await at4(String(r6.coupon)), H5(d5("\u062A\u0645\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629", "Added to cart"))) : location.href = a3.url;
        };
        return this.shell(
          b2`${this.hints([n5.length > 0 && !r6.coupon && d5("\u0636\u0639 \u0643\u0648\u062F \u0627\u0644\u0643\u0648\u0628\u0648\u0646/\u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u0630\u064A \u0623\u0646\u0634\u0623\u062A\u0647 \u0641\u064A \u0633\u0644\u0629 \u0644\u064A\u062A\u0637\u0628\u0642 \u0627\u0644\u062E\u0635\u0645 \u0641\u0639\u0644\u064A\u0627\u064B.", "Add the Salla coupon code so the tier discount really applies.")])}
      <div class="g"><a class="img" href=${a3.url}><img src=${a3.image} alt=${a3.name} /></a><div>
        <h3>${a3.name}</h3><div class="pr"><b>${m4(a3.price)}</b>${a3.regular > a3.price ? b2`<s>${m4(a3.regular)}</s>` : ""} <span class="muted">${d5("\u0644\u0644\u0642\u0637\u0639\u0629", "each")}</span></div>
        <div class="tiers">${n5.map((o6) => b2`<button class="tr ${e5 === o6 ? "on" : ""}" @click=${() => this.q = Math.min(u5, o6.min)}><small>${d5(`${o6.min}+ \u0642\u0637\u0639`, `${o6.min}+ pcs`)}</small><b>-${o6.pct}%</b><small>${m4(a3.price * (1 - o6.pct / 100))} ${d5("\u0644\u0644\u0642\u0637\u0639\u0629", "each")}</small></button>`)}</div>
        <div class="acts"><div class="qty"><button @click=${() => this.q = Math.max(1, this.q - 1)}>−</button><span>${this.q}</span><button @click=${() => this.q = Math.min(u5, this.q + 1)}>+</button></div>
          ${a3.qty != null && v4(r6.show_stock, true) ? b2`<span class="muted">${d5(`\u0645\u062A\u0648\u0641\u0631 ${a3.qty}`, `${a3.qty} in stock`)}</span>` : ""}</div>
        <div class="calc"><div><span>${d5("\u0633\u0639\u0631 \u0627\u0644\u0642\u0637\u0639\u0629", "Unit price")}</span><b>${m4(s4)}</b></div>${p5 > 0 ? b2`<div><span>${d5("\u062A\u0648\u0641\u064A\u0631\u0643", "You save")}</span><span class="save">${m4(p5)}</span></div>` : ""}<div><span>${d5("\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A", "Total")}</span><span class="big">${m4(l3)}</span></div></div>
        ${i5 && v4(r6.nudge, true) && i5.min <= u5 ? b2`<div class="nudge">💡 ${d5(`\u0623\u0636\u0641 ${i5.min - this.q} \u0648\u064A\u0646\u0632\u0644 \u0633\u0639\u0631 \u0627\u0644\u0642\u0637\u0639\u0629 \u0625\u0644\u0649 ${m4(a3.price * (1 - i5.pct / 100))}`, `Add ${i5.min - this.q} more and pay ${m4(a3.price * (1 - i5.pct / 100))} each`)}</div>` : ""}
        <button class="btn" ?disabled=${!a3.available} @click=${f4}>${_5(r6.button, d5("\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629", "Add to cart"))}</button></div></div>`,
          { eyebrow: d5("\u0643\u0644 \u0645\u0627 \u0632\u062F\u062A \u0648\u0641\u0651\u0631\u062A", "Buy more, save more"), title: "" }
        );
      }
    };
    G4.styles = [k4.base, i`
    .g { display: grid; grid-template-columns: 1fr 1.1fr; gap: calc(var(--gap) * 1.6); align-items: center; } @media (max-width: 860px) { .g { grid-template-columns: 1fr; } }
    .img { border-radius: var(--r); overflow: hidden; box-shadow: var(--sh); } .img img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; }
    h3 { margin: 0 0 6px; font-size: clamp(22px, 2.6vw, 32px); }
    .tiers { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 10px; margin: 18px 0; }
    .tr { all: unset; cursor: pointer; text-align: center; padding: 14px 8px; border-radius: 16px; border: 2px solid var(--LINE); background: var(--CARD); transition: all .25s; }
    .tr.on { border-color: var(--A); background: color-mix(in srgb, var(--A) 12%, var(--CARD)); transform: translateY(-3px); } .tr b { display: block; font-size: 22px; color: var(--A); } .tr small { opacity: .7; }
    .qty { display: inline-flex; align-items: center; border: 2px solid var(--LINE); border-radius: 999px; overflow: hidden; } .qty button { all: unset; cursor: pointer; width: 46px; height: 46px; display: grid; place-items: center; font-size: 22px; } .qty span { min-width: 44px; text-align: center; font-weight: 800; font-size: 18px; }
    .calc { display: grid; gap: 6px; margin: 18px 0; } .calc div { display: flex; justify-content: space-between; } .calc .big { font-size: 26px; font-weight: 900; color: var(--A); } .save { color: #16a34a; font-weight: 800; }
    .nudge { padding: 10px 14px; border-radius: 12px; background: color-mix(in srgb, var(--A) 10%, transparent); font-size: 14px; margin-bottom: 14px; }
    .acts { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
  `];
    w4 = G4;
    K3([
      r5()
    ], w4.prototype, "p");
    K3([
      r5()
    ], w4.prototype, "q");
    typeof w4 < "u" && w4.registerSallaComponent("salla-taqm-tiers");
  }
});

// dist/taqm-together.js
var taqm_together_exports = {};
__export(taqm_together_exports, {
  default: () => v5
});
function Y4(t3) {
  var l3, s4, d6, b7, f4, N5, C5, R3, q4;
  const e5 = x6(t3 == null ? void 0 : t3.sale_price), a3 = x6((t3 == null ? void 0 : t3.regular_price) ?? (t3 == null ? void 0 : t3.price)), r6 = e5 && e5 < a3 ? e5 : x6(t3 == null ? void 0 : t3.price) || a3, n5 = Math.max(x6(t3 == null ? void 0 : t3.regular_price), x6(t3 == null ? void 0 : t3.price), r6), i5 = (Array.isArray(t3 == null ? void 0 : t3.images) ? t3.images : []).map((S4) => String((S4 == null ? void 0 : S4.url) ?? S4 ?? "")).filter(Boolean), o6 = (t3 == null ? void 0 : t3.sold_quantity) ?? (t3 == null ? void 0 : t3.sold);
  return {
    id: Number(t3 == null ? void 0 : t3.id),
    name: String((t3 == null ? void 0 : t3.name) ?? ""),
    url: String((t3 == null ? void 0 : t3.url) ?? "#"),
    image: String(((l3 = t3 == null ? void 0 : t3.image) == null ? void 0 : l3.url) ?? (t3 == null ? void 0 : t3.main_image) ?? (t3 == null ? void 0 : t3.thumbnail) ?? i5[0] ?? ""),
    images: i5,
    price: r6,
    regular: n5,
    discount: n5 > r6 ? Math.round((1 - r6 / n5) * 100) : 0,
    rating: x6(((s4 = t3 == null ? void 0 : t3.rating) == null ? void 0 : s4.stars) ?? ((d6 = t3 == null ? void 0 : t3.rating) == null ? void 0 : d6.rate) ?? (t3 == null ? void 0 : t3.rating)),
    ratingCount: x6((b7 = t3 == null ? void 0 : t3.rating) == null ? void 0 : b7.count),
    qty: (t3 == null ? void 0 : t3.quantity) == null || t3 != null && t3.unlimited_quantity ? null : x6(t3 == null ? void 0 : t3.quantity),
    available: (t3 == null ? void 0 : t3.is_available) !== false && (t3 == null ? void 0 : t3.status) !== "out" && !((t3 == null ? void 0 : t3.quantity) === 0 && !(t3 != null && t3.unlimited_quantity)),
    sold: o6 == null || o6 === "" || !Number.isFinite(Number(o6)) ? null : Number(o6),
    endsAt: tt5((t3 == null ? void 0 : t3.discount_ends) ?? (t3 == null ? void 0 : t3.sale_end) ?? (t3 == null ? void 0 : t3.discount_end)),
    category: String(((f4 = t3 == null ? void 0 : t3.category) == null ? void 0 : f4.name) ?? ((C5 = (N5 = t3 == null ? void 0 : t3.categories) == null ? void 0 : N5[0]) == null ? void 0 : C5.name) ?? ""),
    brand: String(((R3 = t3 == null ? void 0 : t3.brand) == null ? void 0 : R3.name) ?? ""),
    promo: String(((q4 = t3 == null ? void 0 : t3.promotion) == null ? void 0 : q4.title) ?? (t3 == null ? void 0 : t3.promotion_title) ?? "")
  };
}
async function et5(t3) {
  var r6, n5, i5;
  const e5 = (r6 = h6()) == null ? void 0 : r6.product;
  if (!e5) return null;
  const a3 = e5.getDetails ? e5.getDetails.bind(e5) : (i5 = (n5 = e5.api) == null ? void 0 : n5.getDetails) == null ? void 0 : i5.bind(e5.api);
  if (!a3) return null;
  try {
    const o6 = await a3(t3, ["images", "sold_quantity", "category"]), l3 = Y4((o6 == null ? void 0 : o6.data) ?? o6);
    return l3.name ? l3 : null;
  } catch {
    return null;
  }
}
async function G6(t3) {
  await E9();
  const e5 = "ids:" + t3.join(",");
  return $5.has(e5) || $5.set(e5, Promise.all(t3.map(et5)).then((a3) => a3.filter((r6) => !!r6))), $5.get(e5);
}
async function O3(t3, e5 = [], a3 = 12) {
  await E9();
  const r6 = `src:${t3}:${e5.join(",")}:${a3}`;
  return $5.has(r6) || $5.set(r6, (async () => {
    var o6, l3, s4, d6;
    const n5 = (o6 = h6()) == null ? void 0 : o6.product, i5 = n5 != null && n5.fetch ? n5.fetch.bind(n5) : (s4 = (l3 = n5 == null ? void 0 : n5.api) == null ? void 0 : l3.fetch) == null ? void 0 : s4.bind(n5.api);
    if (!i5) return [];
    try {
      const b7 = { source: t3, per_page: a3 };
      e5.length && (b7.source_value = e5);
      const f4 = await i5(b7);
      return (Array.isArray(f4 == null ? void 0 : f4.data) ? f4.data : Array.isArray(f4) ? f4 : ((d6 = f4 == null ? void 0 : f4.data) == null ? void 0 : d6.products) ?? []).map(Y4).filter((C5) => C5.name).slice(0, a3);
    } catch {
      return [];
    }
  })()), $5.get(r6);
}
async function P4(t3, e5 = "best_selling", a3 = 12) {
  const r6 = y7(t3);
  if (r6.length) return { items: (await G6(r6)).slice(0, a3), auto: false };
  let n5 = await O3(e5, [], a3);
  return !n5.length && e5 !== "latest" && (n5 = await O3("latest", [], a3)), { items: n5, auto: true };
}
async function K4(t3, e5 = 1, a3) {
  var r6, n5, i5;
  await E9();
  try {
    return await ((i5 = (n5 = (r6 = h6()) == null ? void 0 : r6.cart) == null ? void 0 : n5.addItem) == null ? void 0 : i5.call(n5, a3 ? { id: t3, quantity: e5, notes: a3 } : { id: t3, quantity: e5 })), true;
  } catch {
    return false;
  }
}
async function at5(t3) {
  var e5, a3, r6;
  if (!t3) return false;
  try {
    return await ((r6 = (a3 = (e5 = h6()) == null ? void 0 : e5.cart) == null ? void 0 : a3.addCoupon) == null ? void 0 : r6.call(a3, t3)), true;
  } catch {
    return false;
  }
}
function X2(t3, e5 = true) {
  var a3, r6, n5;
  try {
    (n5 = e5 ? (a3 = h6()) == null ? void 0 : a3.success : (r6 = h6()) == null ? void 0 : r6.error) == null || n5(t3);
  } catch {
  }
}
function A4() {
  try {
    return { ...T5(), ...JSON.parse(localStorage.getItem(z6) || "{}") };
  } catch {
    return T5();
  }
}
function nt5(t3) {
  try {
    localStorage.setItem(z6, JSON.stringify(t3));
  } catch {
  }
}
function F4(t3) {
  const e5 = A4();
  return t3(e5), nt5(e5), e5;
}
function it5() {
  let t3 = false;
  try {
    t3 = !sessionStorage.getItem(z6), sessionStorage.setItem(z6, "1");
  } catch {
  }
  return t3 ? F4((e5) => {
    e5.visits += 1, e5.last = Date.now();
  }) : A4();
}
function st5() {
  const t3 = [...A4().prices].sort((e5, a3) => e5 - a3);
  return t3.length >= 3 ? t3[Math.floor(t3.length / 2)] : 0;
}
function ot5(t3, e5 = A4()) {
  let a3 = (e5.seen[t3.id] || 0) * 2 + (e5.carted.includes(t3.id) ? 4 : 0) + (t3.category && e5.tags[t3.category] || 0);
  const r6 = st5();
  return r6 && (a3 += Math.max(0, 2 - Math.abs(t3.price - r6) / r6 * 2)), a3;
}
function lt5() {
  W5 || (W5 = true, rt5("cart::item.added", (t3) => {
    var a3;
    const e5 = Number(((a3 = t3 == null ? void 0 : t3.data) == null ? void 0 : a3.product_id) ?? 0);
    e5 && F4((r6) => {
      r6.carted.includes(e5) || (r6.carted = [...r6.carted.slice(-40), e5]);
    });
  }));
}
function bt5(t3) {
  const e5 = ht5[t3];
  if (!e5 || H6.has(e5)) return e5;
  H6.add(e5);
  const a3 = document.createElement("link");
  return a3.rel = "stylesheet", a3.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(e5)}:wght@400;500;700;800&display=swap`, document.head.appendChild(a3), e5;
}
async function xt4(t3, e5 = "") {
  let a3 = 0;
  for (const { p: r6, q: n5 } of t3) r6.available && await K4(r6.id, n5 ?? 1) && a3++;
  return e5 && await at5(e5), X2(a3 ? u4(`\u0623\u0636\u0641\u0646\u0627 ${a3} \u0645\u0646\u062A\u062C \u0644\u0644\u0633\u0644\u0629${e5 ? " \u0648\u0637\u0628\u0651\u0642\u0646\u0627 \u0627\u0644\u0643\u0648\u062F" : ""}`, `Added ${a3} items${e5 ? " and applied the code" : ""}`) : u4("\u062A\u0639\u0630\u0651\u0631\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629", "Could not add"), !!a3), a3;
}
var h6, E9, U4, Z6, u4, _6, m5, g4, p4, x6, tt5, y7, $5, w5, rt5, z6, T5, D6, ct5, W5, dt5, ut5, gt5, ft5, ht5, H6, mt5, pt5, B4, k5, vt3, I4, M6, v5;
var init_taqm_together = __esm({
  "dist/taqm-together.js"() {
    "use strict";
    init_lit();
    init_decorators();
    h6 = () => window.salla ?? window.Salla;
    E9 = async () => {
      var t3, e5;
      try {
        await ((e5 = (t3 = h6()) == null ? void 0 : t3.onReady) == null ? void 0 : e5.call(t3));
      } catch {
      }
    };
    U4 = () => {
      var t3, e5, a3, r6, n5;
      try {
        const i5 = ((e5 = (t3 = h6()) == null ? void 0 : t3.lang) == null ? void 0 : e5.locale) ?? ((n5 = (r6 = (a3 = h6()) == null ? void 0 : a3.config) == null ? void 0 : r6.get) == null ? void 0 : n5.call(r6, "user.language_code"));
        if (typeof i5 == "string" && i5) return i5.slice(0, 2);
      } catch {
      }
      return (document.documentElement.lang || "ar").slice(0, 2);
    };
    Z6 = () => U4() === "en";
    u4 = (t3, e5) => Z6() ? e5 : t3;
    _6 = (t3, e5 = "") => {
      if (t3 == null) return e5;
      if (typeof t3 == "string") {
        const a3 = t3.trim();
        if (a3.startsWith("{") && a3.endsWith("}"))
          try {
            return _6(JSON.parse(a3), e5);
          } catch {
          }
        return a3 || e5;
      }
      if (typeof t3 == "number" || typeof t3 == "boolean") return String(t3);
      if (typeof t3 == "object") {
        const a3 = t3, r6 = a3[U4()] ?? a3.ar ?? a3.en ?? Object.values(a3).find((n5) => typeof n5 == "string" && n5);
        return typeof r6 == "string" && r6.trim() ? r6 : e5;
      }
      return e5;
    };
    m5 = (t3, e5 = "") => {
      const a3 = Array.isArray(t3) ? t3[0] : t3, r6 = typeof a3 == "object" && a3 ? a3.value : a3;
      return r6 == null || r6 === "" ? e5 : String(r6);
    };
    g4 = (t3, e5 = 0) => {
      const a3 = Number(t3);
      return t3 === "" || t3 == null || !Number.isFinite(a3) ? e5 : a3;
    };
    p4 = (t3, e5 = false) => t3 == null || t3 === "" ? e5 : t3 === true || t3 === "true" || t3 === 1 || t3 === "1";
    x6 = (t3) => {
      const e5 = typeof t3 == "object" && t3 ? t3.amount : t3, a3 = Number(e5);
      return Number.isFinite(a3) ? a3 : 0;
    };
    tt5 = (t3) => {
      if (!t3) return null;
      const e5 = typeof t3 == "number" ? t3 < 1e12 ? t3 * 1e3 : t3 : Date.parse(String(t3).replace(" ", "T"));
      return Number.isFinite(e5) && e5 > Date.now() ? e5 : null;
    };
    y7 = (t3) => (Array.isArray(t3) ? t3 : []).map((e5) => Number(typeof e5 == "object" && e5 ? e5.value : e5)).filter((e5) => Number.isFinite(e5) && e5 > 0);
    $5 = /* @__PURE__ */ new Map();
    w5 = (t3) => {
      var e5, a3;
      try {
        const r6 = (a3 = (e5 = h6()) == null ? void 0 : e5.money) == null ? void 0 : a3.call(e5, t3);
        if (r6) return String(r6);
      } catch {
      }
      return `${Math.round(t3 * 100) / 100} ${u4("\u0631.\u0633", "SAR")}`;
    };
    rt5 = (t3, e5) => {
      var a3, r6, n5;
      try {
        (n5 = (r6 = (a3 = h6()) == null ? void 0 : a3.event) == null ? void 0 : r6.on) == null || n5.call(r6, t3, e5);
      } catch {
      }
    };
    z6 = "tw_smart_mem_v1";
    T5 = () => ({ first: Date.now(), last: 0, visits: 0, srcFirst: "", srcLast: "", seen: {}, carted: [], prices: [], tags: {}, answers: {}, avail: {}, dismissed: {} });
    D6 = (t3, e5 = 1) => F4((a3) => {
      a3.seen[t3.id] = (a3.seen[t3.id] || 0) + e5, a3.prices = [...a3.prices.slice(-29), t3.price], t3.category && (a3.tags[t3.category] = (a3.tags[t3.category] || 0) + e5);
    });
    ct5 = (t3, e5 = true) => {
      if (!e5) return t3;
      const a3 = A4();
      return t3.map((r6, n5) => ({ p: r6, i: n5, s: ot5(r6, a3) })).sort((r6, n5) => n5.s - r6.s || r6.i - n5.i).map((r6) => r6.p);
    };
    W5 = false;
    dt5 = () => {
      const t3 = innerWidth, e5 = navigator.userAgent;
      return /iPad|Tablet/i.test(e5) || t3 >= 700 && t3 < 1024 && "ontouchstart" in window ? "tablet" : /Mobi|Android|iPhone/i.test(e5) || t3 < 700 ? "mobile" : "desktop";
    };
    ut5 = () => {
      try {
        return window.top !== window.self || /[?&](preview|edit_mode|theme_preview)=/.test(location.search);
      } catch {
        return true;
      }
    };
    gt5 = Object.defineProperty;
    ft5 = (t3, e5, a3, r6) => {
      for (var n5 = void 0, i5 = t3.length - 1, o6; i5 >= 0; i5--)
        (o6 = t3[i5]) && (n5 = o6(e5, a3, n5) || n5);
      return n5 && gt5(e5, a3, n5), n5;
    };
    ht5 = { tajawal: "Tajawal", cairo: "Cairo", almarai: "Almarai", plex: "IBM Plex Sans Arabic", messiri: "El Messiri", readex: "Readex Pro", kufi: "Noto Kufi Arabic", amiri: "Amiri", rubik: "Rubik" };
    H6 = /* @__PURE__ */ new Set();
    mt5 = { narrow: "960px", normal: "1240px", wide: "1440px", full: "100%" };
    pt5 = ["none", "0 6px 18px -12px #0003", "0 14px 34px -20px #0004", "0 22px 50px -26px #0005", "0 30px 70px -30px #0007", "0 40px 90px -30px #0009"];
    B4 = class B5 extends i4 {
      get c() {
        return this.config ?? {};
      }
      connectedCallback() {
        super.connectedCallback(), lt5(), it5();
      }
      firstUpdated() {
        if (!("IntersectionObserver" in window)) {
          this.setAttribute("in", "");
          return;
        }
        this.io = new IntersectionObserver((e5) => {
          var a3;
          e5.some((r6) => r6.isIntersecting) && (this.setAttribute("in", ""), (a3 = this.io) == null || a3.disconnect());
        }, { threshold: 0.12 }), this.io.observe(this);
      }
      disconnectedCallback() {
        var e5;
        super.disconnectedCallback(), (e5 = this.io) == null || e5.disconnect();
      }
      /** Hidden by the merchant's schedule or device rule? */
      hiddenNow() {
        const e5 = this.c, a3 = Date.now(), r6 = Date.parse(String(e5.s_from || "")), n5 = Date.parse(String(e5.s_to || ""));
        if (Number.isFinite(r6) && a3 < r6 || Number.isFinite(n5) && a3 > n5) return true;
        const i5 = dt5();
        return !!(p4(e5.s_hide_mobile) && i5 === "mobile" || p4(e5.s_hide_desktop) && i5 !== "mobile");
      }
      vars(e5 = "") {
        const a3 = this.c, r6 = [], n5 = (o6, l3) => {
          l3 !== "" && l3 != null && r6.push(`${o6}:${l3}`);
        };
        n5("--a", a3.s_accent || ""), n5("--a2", a3.s_accent2 || ""), n5("--bgc", a3.s_bg || ""), n5("--fgc", a3.s_text || ""), n5("--cardc", a3.s_card || ""), n5("--r", `${g4(a3.s_radius, 22)}px`), n5("--gap", `${g4(a3.s_gap, 18)}px`), n5("--ts", `${g4(a3.s_title_size, 38)}px`), n5("--fs", `${g4(a3.s_text_size, 16)}px`), n5("--pt", `${g4(a3.s_pad_top, 56)}px`), n5("--pb", `${g4(a3.s_pad_bottom, 56)}px`), n5("--maxw", mt5[m5(a3.s_width, "normal")] ?? "1240px"), n5("--sh", pt5[Math.max(0, Math.min(5, g4(a3.s_shadow, 2)))]), n5("--ms", `${g4(a3.s_anim_ms, 700)}ms`), n5("--ov", String(g4(a3.s_overlay, 45) / 100)), a3.s_bg_image && n5("--bgimg", `url("${String(a3.s_bg_image)}")`);
        const i5 = bt5(m5(a3.s_font, "inherit"));
        return i5 && n5("font-family", `'${i5}', inherit`), r6.join(";") + (e5 ? ";" + e5 : "");
      }
      cls() {
        const e5 = this.c;
        return [
          "sec",
          `th-${m5(e5.s_theme, "auto")}`,
          `al-${m5(e5.s_align, "start")}`,
          `an-${m5(e5.s_anim, "rise")}`,
          `pt-${m5(e5.s_pattern, "none")}`,
          `bs-${m5(e5.s_btn_style, "pill")}`,
          p4(e5.s_border) ? "bordered" : "",
          p4(e5.s_stagger, true) ? "stagger" : "",
          e5.s_bg_image ? "has-img" : ""
        ].join(" ");
      }
      /** Section shell with the optional eyebrow, title and subtitle the merchant set (defaults are smart, in both languages). */
      shell(e5, a3 = {}, r6 = "", n5 = "", i5 = true) {
        if (this.hiddenNow()) return A;
        const o6 = this.c, l3 = _6(o6.eyebrow, a3.eyebrow ?? ""), s4 = _6(o6.title, a3.title ?? ""), d6 = _6(o6.subtitle, a3.sub ?? ""), b7 = i5 && p4(o6.s_show_head, true) && (l3 || s4 || d6);
        return b2`<section class="${this.cls()} ${r6}" style=${this.vars(n5)} id=${String(o6.s_anchor || "") || A}>
      <div class="wrap">${b7 ? b2`<header class="head">${l3 ? b2`<span class="eyebrow">${l3}</span>` : ""}${s4 ? b2`<h2 class="title">${s4}</h2>` : ""}${d6 ? b2`<p class="sub">${d6}</p>` : ""}</header>` : ""}
      ${e5}</div></section>`;
      }
      /** Setup hints for the merchant, shown only inside Salla's theme editor preview, never to shoppers. */
      hints(e5) {
        const a3 = e5.filter(Boolean);
        return !a3.length || !ut5() || !p4(this.c.s_hints, true) ? "" : b2`<aside class="hints" role="note"><b>💡 ${u4("\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0625\u0639\u062F\u0627\u062F (\u064A\u0638\u0647\u0631 \u0644\u0643 \u0641\u0642\u0637)", "Setup assistant (only you see this)")}</b><ul>${a3.map((r6) => b2`<li>${r6}</li>`)}</ul></aside>`;
      }
      card(e5, a3 = {}) {
        var r6;
        return b2`<article class="pc ${e5.available ? "" : "oos"}">
      <a class="ph" href=${e5.url} @click=${() => D6(e5)}><img src=${e5.image} alt=${e5.name} loading="lazy" />${(r6 = a3.badges) != null && r6.length ? b2`<span class="badges">${a3.badges}</span>` : ""}</a>
      <div class="pb"><a class="pn" href=${e5.url} @click=${() => D6(e5)}>${e5.name}</a>
        <div class="pr"><b>${w5(e5.price)}</b>${e5.regular > e5.price ? b2`<s>${w5(e5.regular)}</s>` : ""}</div>
        ${a3.rating !== false && e5.rating > 0 ? b2`<div class="rt">★ ${e5.rating.toFixed(1)}${e5.ratingCount ? b2` <small>(${e5.ratingCount})</small>` : ""}</div>` : ""}
        ${a3.extra ?? ""}
        ${a3.quick !== false ? b2`<button class="btn sm" ?disabled=${!e5.available} @click=${() => this.add(e5)}>${e5.available ? u4("\u0623\u0636\u0641 \u0644\u0644\u0633\u0644\u0629", "Add to cart") : u4("\u0646\u0641\u062F\u062A \u0627\u0644\u0643\u0645\u064A\u0629", "Sold out")}</button>` : ""}
      </div></article>`;
      }
      async add(e5, a3 = 1, r6) {
        D6(e5, 3), await K4(e5.id, a3, r6) ? X2(u4("\u062A\u0645\u062A \u0627\u0644\u0625\u0636\u0627\u0641\u0629 \u0644\u0644\u0633\u0644\u0629", "Added to cart")) : location.href = e5.url;
      }
    };
    B4.base = i`
  :host { display: block; font-family: inherit; direction: inherit;
    --A: var(--a, var(--color-primary, #b88a44)); --A2: var(--a2, color-mix(in srgb, var(--A) 55%, #000)); --BG: var(--bgc, transparent); --FG: var(--fgc, inherit); --CARD: var(--cardc, #fff); --LINE: color-mix(in srgb, currentColor 14%, transparent); }
  :host([hidden]) { display: none; }
  *, *::before, *::after { box-sizing: border-box; }
  .sec { position: relative; background: var(--BG); color: var(--FG); font-size: var(--fs, 16px); overflow: hidden; isolation: isolate; }
  .sec.has-img::before { content: ''; position: absolute; inset: 0; z-index: -2; background: var(--bgimg) center/cover no-repeat; }
  .sec.has-img::after { content: ''; position: absolute; inset: 0; z-index: -1; background: #000; opacity: var(--ov, .45); }
  .th-light { --BG: var(--bgc, #fff); --FG: var(--fgc, #17140f); --CARD: var(--cardc, #faf8f4); }
  .th-ivory { --BG: var(--bgc, #f7f2e9); --FG: var(--fgc, #1d160c); --CARD: var(--cardc, #fffdf8); }
  .th-dark { --BG: var(--bgc, #111014); --FG: var(--fgc, #f4efe6); --CARD: var(--cardc, #1c1b22); }
  .th-midnight { --BG: var(--bgc, radial-gradient(900px 500px at 85% -10%, #2c1d55 0, transparent 60%), #0f0c18); --FG: var(--fgc, #f6f1e7); --CARD: var(--cardc, #19142d); }
  .th-glass { --BG: var(--bgc, linear-gradient(135deg, color-mix(in srgb, var(--A) 14%, #fff), #fff 60%)); --FG: var(--fgc, #15130f); --CARD: var(--cardc, rgba(255,255,255,.6)); }
  .th-glass .pc, .th-glass .panel { backdrop-filter: blur(14px); }
  .th-accent { --BG: var(--bgc, linear-gradient(135deg, var(--A), var(--A2))); --FG: var(--fgc, #fff); --CARD: var(--cardc, rgba(255,255,255,.12)); }
  .th-dark, .th-midnight, .th-accent { --LINE: rgba(255,255,255,.14); }
  .pt-dots { background-image: radial-gradient(color-mix(in srgb, currentColor 12%, transparent) 1px, transparent 1.4px), var(--BG); background-size: 18px 18px, auto; }
  .pt-grid { background-image: linear-gradient(var(--LINE) 1px, transparent 1px), linear-gradient(90deg, var(--LINE) 1px, transparent 1px), var(--BG); background-size: 36px 36px, 36px 36px, auto; }
  .pt-arabesque { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Cpath d='M28 4l7 17 17 7-17 7-7 17-7-17-17-7 17-7z' fill='none' stroke='%23999' stroke-opacity='.18'/%3E%3C/svg%3E"), var(--BG); }
  .pt-waves { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='20'%3E%3Cpath d='M0 10q20-10 40 0t40 0' fill='none' stroke='%23999' stroke-opacity='.2'/%3E%3C/svg%3E"), var(--BG); }
  .wrap { max-width: var(--maxw, 1240px); margin: 0 auto; padding: var(--pt, 56px) clamp(16px, 4vw, 32px) var(--pb, 56px); }
  .head { margin-bottom: calc(var(--gap, 18px) * 1.4); }
  .al-center .head { text-align: center; } .al-center .head .sub { margin-inline: auto; } .al-end .head { text-align: end; }
  .eyebrow { display: inline-block; letter-spacing: .2em; font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--A); margin-bottom: 10px; }
  .th-accent .eyebrow { color: inherit; opacity: .85; }
  h2.title { margin: 0 0 8px; font-size: clamp(22px, calc(var(--ts, 38px) * .62 + 1.2vw), var(--ts, 38px)); line-height: 1.25; font-weight: 800; }
  .sub { margin: 0; opacity: .72; line-height: 1.8; max-width: 720px; }
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 0; cursor: pointer; text-decoration: none; font: inherit; font-weight: 700;
    padding: 13px 24px; border-radius: 999px; background: var(--A); color: #fff; transition: transform .25s, box-shadow .25s, opacity .2s; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -12px var(--A); } .btn[disabled] { opacity: .45; cursor: not-allowed; transform: none; box-shadow: none; }
  .btn.ghost { background: transparent; color: inherit; border: 1.5px solid currentColor; } .btn.sm { padding: 9px 16px; font-size: 14px; }
  .th-accent .btn:not(.ghost) { background: #fff; color: var(--A2); }
  .bs-rounded .btn { border-radius: 12px; } .bs-square .btn { border-radius: 0; } .bs-outline .btn:not(.ghost) { background: transparent; color: var(--A); border: 1.5px solid var(--A); }
  .bs-underline .btn { background: none; color: var(--A); padding-inline: 0; border-radius: 0; border-bottom: 2px solid var(--A); }
  .bordered .pc, .bordered .panel { border: 1px solid var(--LINE); }
  .panel { background: var(--CARD); border-radius: var(--r, 22px); box-shadow: var(--sh); padding: clamp(16px, 2.4vw, 28px); }
  .grid { display: grid; gap: var(--gap, 18px); grid-template-columns: repeat(var(--cols, 4), minmax(0, 1fr)); }
  @media (max-width: 860px) { .grid { grid-template-columns: repeat(var(--mcols, 2), minmax(0, 1fr)); } }
  .rail { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(220px, calc((100% - var(--gap) * (var(--cols, 4) - 1)) / var(--cols, 4))); gap: var(--gap, 18px); overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 8px; scrollbar-width: thin; }
  @media (max-width: 860px) { .rail { grid-auto-columns: calc((100% - var(--gap)) / var(--mcols, 2) - 8px); } }
  .rail > * { scroll-snap-align: start; }
  .pc { position: relative; display: flex; flex-direction: column; background: var(--CARD); border-radius: var(--r, 22px); overflow: hidden; box-shadow: var(--sh); transition: transform .35s; color: inherit; }
  .pc:hover { transform: translateY(-4px); } .pc.oos { opacity: .55; }
  .ph { position: relative; display: block; aspect-ratio: var(--ratio, 1); background: color-mix(in srgb, currentColor 6%, transparent); }
  .ph img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .badges { position: absolute; inset: 10px 10px auto 10px; display: flex; flex-wrap: wrap; gap: 6px; }
  .bdg { font-size: 11px; font-weight: 800; padding: 4px 9px; border-radius: 999px; background: var(--A); color: #fff; line-height: 1.4; }
  .bdg.alt { background: #111; } .bdg.ok { background: #15803d; } .bdg.warn { background: #b45309; } .bdg.soft { background: #fff; color: #111; }
  .pb { padding: 12px 14px 14px; display: grid; gap: 6px; flex: 1; align-content: start; }
  .pn { color: inherit; text-decoration: none; font-weight: 700; line-height: 1.5; font-size: .95em; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .pr { display: flex; gap: 8px; align-items: baseline; flex-wrap: wrap; } .pr b { color: var(--A); } .th-accent .pr b { color: inherit; } .pr s { opacity: .5; font-size: .85em; }
  .rt { font-size: 13px; color: #d4a017; } .rt small { opacity: .7; color: inherit; }
  .pb .btn { margin-top: auto; width: 100%; }
  .chip { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 999px; border: 1.5px solid var(--LINE); background: var(--CARD); color: inherit; font: inherit; font-size: 14px; cursor: pointer; transition: all .25s; }
  .chip:hover { border-color: var(--A); } .chip.on { background: var(--A); border-color: var(--A); color: #fff; }
  .muted { opacity: .65; } .center { text-align: center; }
  .skel { background: linear-gradient(90deg, #8881 0, #8882 50%, #8881 100%); background-size: 200% 100%; animation: sk 1.4s infinite; border-radius: var(--r, 22px); min-height: 220px; }
  @keyframes sk { to { background-position: -200% 0; } }
  .hints { margin: 0 0 18px; padding: 14px 18px; border-radius: 14px; background: #fff8e1; color: #5b4300; border: 1px dashed #e0b84a; font-size: 13px; line-height: 1.8; }
  .hints ul { margin: 6px 0 0; padding-inline-start: 18px; }
  /* reveal motion */
  .sec .wrap > * { transition: opacity var(--ms, .7s) ease, transform var(--ms, .7s) cubic-bezier(.2,.7,.2,1), filter var(--ms, .7s); }
  :host(:not([in])) .an-fade .wrap > * { opacity: 0; }
  :host(:not([in])) .an-rise .wrap > * { opacity: 0; transform: translateY(28px); }
  :host(:not([in])) .an-zoom .wrap > * { opacity: 0; transform: scale(.94); }
  :host(:not([in])) .an-blur .wrap > * { opacity: 0; filter: blur(12px); }
  :host(:not([in])) .an-slide .wrap > * { opacity: 0; transform: translateX(40px); }
  .stagger .wrap > *:nth-child(2) { transition-delay: .08s; } .stagger .wrap > *:nth-child(3) { transition-delay: .16s; } .stagger .wrap > *:nth-child(4) { transition-delay: .24s; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } :host .sec .wrap > * { opacity: 1 !important; transform: none !important; filter: none !important; } }
  `;
    k5 = B4;
    ft5([
      n4({ type: Object })
    ], k5.prototype, "config");
    vt3 = Object.defineProperty;
    I4 = (t3, e5, a3, r6) => {
      for (var n5 = void 0, i5 = t3.length - 1, o6; i5 >= 0; i5--)
        (o6 = t3[i5]) && (n5 = o6(e5, a3, n5) || n5);
      return n5 && vt3(e5, a3, n5), n5;
    };
    M6 = class M7 extends k5 {
      constructor() {
        super(...arguments), this.main = null, this.adds = [], this.on = [], this.seq = 0;
      }
      willUpdate(e5) {
        e5.has("config") && this.load();
      }
      async load() {
        const e5 = ++this.seq, a3 = this.c, r6 = y7(a3.main).length ? (await G6(y7(a3.main)))[0] : (await P4(null, m5(a3.auto_source, "best_selling"), 1)).items[0];
        let n5 = y7(a3.addons).length ? await G6(y7(a3.addons)) : (await P4(null, m5(a3.addon_source, "best_selling"), 20)).items.filter((i5) => i5.id !== (r6 == null ? void 0 : r6.id) && i5.available);
        r6 && p4(a3.harmony, true) && !y7(a3.addons).length && (n5 = n5.filter((i5) => i5.price <= r6.price * g4(a3.harmony_ratio, 60) / 100 + 1).concat(n5.filter((i5) => i5.price > r6.price * g4(a3.harmony_ratio, 60) / 100 + 1))), n5 = ct5(n5, p4(a3.personalize, true)).slice(0, g4(a3.limit, 3)), e5 === this.seq && (this.main = r6 ?? null, this.adds = n5, this.on = p4(a3.preselect, true) ? n5.filter((i5) => i5.available).map((i5) => i5.id) : []);
      }
      render() {
        const e5 = this.c, a3 = this.main;
        if (!a3) return this.shell(b2`<div class="skel"></div>`);
        const r6 = [a3, ...this.adds.filter((s4) => this.on.includes(s4.id))], n5 = r6.reduce((s4, d6) => s4 + d6.price, 0), i5 = r6.reduce((s4, d6) => s4 + d6.regular, 0), o6 = g4(e5.discount, 0), l3 = r6.length > 1 && o6 ? Math.round(n5 * o6) / 100 : 0;
        return this.shell(
          b2`<div class="row">${[a3, ...this.adds].map((s4, d6) => b2`${d6 ? b2`<span class="plus">+</span>` : ""}<a class="it ${d6 && !this.on.includes(s4.id) ? "off" : ""}" href=${s4.url}><img src=${s4.image} alt=${s4.name} loading="lazy" />${d6 === 0 ? b2`<span class="bdg main-b">${u4("\u0627\u0644\u0623\u0633\u0627\u0633\u064A", "Main")}</span>` : ""}</a>`)}</div>
      <div class="lst">${[a3, ...this.adds].map((s4, d6) => b2`<label class="l"><input type="checkbox" ?checked=${d6 === 0 || this.on.includes(s4.id)} ?disabled=${d6 === 0 || !s4.available} @change=${() => this.on = this.on.includes(s4.id) ? this.on.filter((b7) => b7 !== s4.id) : [...this.on, s4.id]} />
        <span>${d6 === 0 ? b2`<b>${u4("\u0647\u0630\u0627 \u0627\u0644\u0645\u0646\u062A\u062C:", "This item:")}</b> ` : ""}${s4.name}</span>${s4.regular > s4.price ? b2`<s>${w5(s4.regular)}</s>` : ""}<b>${w5(s4.price)}</b></label>`)}</div>
      <div class="tot"><div>${u4("\u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A", "Total price")}: <b>${w5(n5 - l3)}</b> ${i5 - n5 + l3 > 0 ? b2`<span class="save">· ${u4("\u062A\u0648\u0641\u0651\u0631", "save")} ${w5(i5 - n5 + l3)}</span>` : ""}</div>
        <button class="btn" @click=${() => xt4(r6.map((s4) => ({ p: s4 })), l3 ? String(e5.coupon || "") : "")}>${_6(e5.button, u4(`\u0623\u0636\u0641 ${r6.length} \u0644\u0644\u0633\u0644\u0629`, `Add ${r6.length} to cart`))}</button></div>`,
          { eyebrow: u4("\u064A\u064F\u0634\u062A\u0631\u0649 \u0645\u0639\u0627\u064B", "Bought together"), title: u4("\u0643\u0645\u0651\u0644\u0647\u0627 \u0635\u062D", "Complete it right"), sub: "" },
          "",
          "",
          true
        );
      }
    };
    M6.styles = [k5.base, i`
    .row { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; justify-content: center; margin-bottom: 22px; }
    .it { width: clamp(120px, 15vw, 170px); text-align: center; position: relative; transition: opacity .3s; } .it.off { opacity: .35; }
    .it img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 20px; box-shadow: var(--sh); } .it .main-b { position: absolute; top: 8px; inset-inline-start: 8px; }
    .plus { font-size: 26px; opacity: .45; font-weight: 300; }
    .lst { display: grid; gap: 8px; max-width: 640px; margin: 0 auto; } label.l { display: flex; gap: 12px; align-items: center; padding: 10px 14px; border-radius: 14px; background: var(--CARD); cursor: pointer; box-shadow: var(--sh); }
    label.l input { width: 20px; height: 20px; accent-color: var(--A); } label.l span { flex: 1; } label.l s { opacity: .5; font-size: 13px; margin-inline-end: 6px; }
    .tot { display: flex; justify-content: space-between; align-items: center; gap: 12px; max-width: 640px; margin: 16px auto 0; flex-wrap: wrap; } .tot b { font-size: 24px; color: var(--A); }
    .save { color: #16a34a; font-weight: 700; font-size: 14px; }
  `];
    v5 = M6;
    I4([
      r5()
    ], v5.prototype, "main");
    I4([
      r5()
    ], v5.prototype, "adds");
    I4([
      r5()
    ], v5.prototype, "on");
    typeof v5 < "u" && v5.registerSallaComponent("salla-taqm-together");
  }
});

// demo/entry.js
init_lit();
i4.registerSallaComponent = function(n5) {
  if (!customElements.get(n5)) customElements.define(n5, this);
};
await Promise.resolve().then(() => (init_taqm_builder(), taqm_builder_exports));
await Promise.resolve().then(() => (init_taqm_outfit(), taqm_outfit_exports));
await Promise.resolve().then(() => (init_taqm_pick(), taqm_pick_exports));
await Promise.resolve().then(() => (init_taqm_tiers(), taqm_tiers_exports));
await Promise.resolve().then(() => (init_taqm_together(), taqm_together_exports));
window.__ready = true;
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
