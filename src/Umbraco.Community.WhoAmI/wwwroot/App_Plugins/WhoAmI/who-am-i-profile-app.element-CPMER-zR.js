import { nothing as m, repeat as E, html as n, css as U, state as g, customElement as k } from "@umbraco-cms/backoffice/external/lit";
import { UmbLitElement as O } from "@umbraco-cms/backoffice/lit-element";
import { UMB_CURRENT_USER_CONTEXT as z } from "@umbraco-cms/backoffice/current-user";
import { UmbUserGroupItemRepository as I, UMB_EDIT_USER_GROUP_WORKSPACE_PATH_PATTERN as S } from "@umbraco-cms/backoffice/user-group";
var C = Object.defineProperty, P = Object.getOwnPropertyDescriptor, x = (e) => {
  throw TypeError(e);
}, u = (e, o, t, a) => {
  for (var r = a > 1 ? void 0 : a ? P(o, t) : o, p = e.length - 1, c; p >= 0; p--)
    (c = e[p]) && (r = (a ? c(o, t, r) : c(r)) || r);
  return a && r && C(o, t, r), r;
}, v = (e, o, t) => o.has(e) || x("Cannot " + t), _ = (e, o, t) => (v(e, o, "read from private field"), t ? t.call(e) : o.get(e)), h = (e, o, t) => o.has(e) ? x("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, t), T = (e, o, t, a) => (v(e, o, "write to private field"), o.set(e, t), t), d = (e, o, t) => (v(e, o, "access private method"), t), G = (e, o, t, a) => ({
  set _(r) {
    T(e, o, r);
  },
  get _() {
    return _(e, o, a);
  }
}), f, l, i, b, A, y;
const w = 3, $ = "Umb.Section.Users";
let s = class extends O {
  constructor() {
    super(), h(this, i), h(this, f, new I(this)), this._groups = [], this._expanded = !1, this._canOpenGroups = !1, h(this, l, 0), this.consumeContext(z, (e) => {
      e && this.observe(
        e.currentUser,
        (o) => {
          this._canOpenGroups = !!o?.allowedSections?.includes($), d(this, i, b).call(this, o?.userGroupUniques ?? []);
        },
        "_observeUser"
      );
    });
  }
  render() {
    if (!this._groups.length) return m;
    const e = this._groups.length - w, o = this._expanded ? this._groups : this._groups.slice(0, w), t = this._expanded ? this.localize.term("whoAmI_showLess") : this.localize.term("whoAmI_showMore", e), a = this._expanded ? this.localize.term("whoAmI_showLessLabel") : this.localize.term("whoAmI_showMoreLabel", e);
    return n`
      <uui-box>
        <h4 slot="headline"><uui-icon name="icon-users"></uui-icon> ${this.localize.term("whoAmI_heading")}</h4>
        <div class="groups">
          ${E(
      o,
      (r) => r.unique,
      (r) => d(this, i, y).call(this, r)
    )}
          ${e > 0 ? n`<button
                type="button"
                class="toggle"
                aria-label=${a}
                aria-expanded=${this._expanded}
                @click=${d(this, i, A)}>
                ${t}
              </button>` : m}
        </div>
      </uui-box>
    `;
  }
};
f = /* @__PURE__ */ new WeakMap();
l = /* @__PURE__ */ new WeakMap();
i = /* @__PURE__ */ new WeakSet();
b = async function(e) {
  const o = ++G(this, l)._;
  if (!e.length) {
    this._groups = [];
    return;
  }
  const { data: t } = await _(this, f).requestItems(e);
  o === _(this, l) && (this._groups = t ?? []);
};
A = function() {
  this._expanded = !this._expanded;
};
y = function(e) {
  const o = n`<uui-tag look="secondary">${e.name}</uui-tag>`;
  if (!this._canOpenGroups) return o;
  const t = S.generateAbsolute({ unique: e.unique });
  return n`<a class="group-link" href=${t}>${o}</a>`;
};
s.styles = U`
    :host {
      display: block;
    }
    h4 {
      display: flex;
      align-items: center;
      gap: var(--uui-size-space-2);
      margin: 0;
    }
    .groups {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--uui-size-space-2);
    }
    .group-link {
      display: inline-block;
      max-width: 100%;
      text-decoration: none;
    }
    .group-link:hover uui-tag {
      text-decoration: underline;
    }
    /* "+N" / "less" pill: same shape and size as a tag, dashed so it reads as an action */
    .toggle {
      font: inherit;
      font-size: var(--uui-type-small-size);
      font-weight: 700;
      line-height: 1;
      padding: calc(var(--uui-size-space-1) + 2px) calc(var(--uui-size-space-1) + 0.5em + 2px);
      border: 1px dashed var(--who-am-i-tag-border-color, var(--uui-color-border-standalone));
      border-radius: var(--uui-size-4);
      background: transparent;
      color: var(--who-am-i-tag-color, var(--uui-color-default-standalone));
      cursor: pointer;
    }
    .toggle:hover {
      background-color: var(--who-am-i-tag-background, var(--uui-color-surface-alt));
    }
    .toggle:focus-visible {
      outline: 2px solid var(--uui-color-focus);
      outline-offset: 1px;
    }
    /* Optional overrides, set on :root: --who-am-i-tag-color, --who-am-i-tag-background, --who-am-i-tag-border-color */
    uui-tag {
      max-width: 100%;
      box-sizing: border-box;
      overflow-wrap: anywhere;
      color: var(--who-am-i-tag-color, var(--uui-color-default-standalone));
      background-color: var(--who-am-i-tag-background, var(--uui-color-surface-alt));
      --uui-tag-border-color: var(--who-am-i-tag-border-color, var(--uui-color-divider-standalone));
    }
  `;
u([
  g()
], s.prototype, "_groups", 2);
u([
  g()
], s.prototype, "_expanded", 2);
u([
  g()
], s.prototype, "_canOpenGroups", 2);
s = u([
  k("who-am-i-profile-app")
], s);
const N = s;
export {
  s as WhoAmIProfileAppElement,
  N as default
};
//# sourceMappingURL=who-am-i-profile-app.element-CPMER-zR.js.map
