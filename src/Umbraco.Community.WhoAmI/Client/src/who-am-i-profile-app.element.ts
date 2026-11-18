import { css, customElement, html, nothing, repeat, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UMB_CURRENT_USER_CONTEXT } from '@umbraco-cms/backoffice/current-user';
import { UMB_EDIT_USER_GROUP_WORKSPACE_PATH_PATTERN, UmbUserGroupItemRepository } from '@umbraco-cms/backoffice/user-group';

// Groups shown before the rest are tucked behind a "+N more" button.
const COLLAPSED_COUNT = 3;
// Only users with the Users section can open a user group page.
const USERS_SECTION_ALIAS = 'Umb.Section.Users';

@customElement('who-am-i-profile-app')
export class WhoAmIProfileAppElement extends UmbLitElement {
  #repository = new UmbUserGroupItemRepository(this);

  @state()
  private _groups: Array<{ unique: string; name: string }> = [];

  @state()
  private _expanded = false;

  @state()
  private _canOpenGroups = false;

  constructor() {
    super();
    this.consumeContext(UMB_CURRENT_USER_CONTEXT, (context) => {
      if (!context) return;
      this.observe(
        context.currentUser,
        (user) => {
          this._canOpenGroups = !!user?.allowedSections?.includes(USERS_SECTION_ALIAS);
          this.#loadGroups(user?.userGroupUniques ?? []);
        },
        '_observeUser',
      );
    });
  }

  #loadToken = 0;

  async #loadGroups(uniques: string[]) {
    const token = ++this.#loadToken;
    if (!uniques.length) {
      this._groups = [];
      return;
    }
    const { data } = await this.#repository.requestItems(uniques);
    // A newer load started while this one was in flight; drop the stale result.
    if (token !== this.#loadToken) return;
    this._groups = data ?? [];
  }

  #toggle() {
    this._expanded = !this._expanded;
  }

  #renderGroup(group: { unique: string; name: string }) {
    // Lit text binding escapes the name, so no HTML injection from group names.
    const tag = html`<uui-tag look="secondary">${group.name}</uui-tag>`;
    if (!this._canOpenGroups) return tag;
    const href = UMB_EDIT_USER_GROUP_WORKSPACE_PATH_PATTERN.generateAbsolute({ unique: group.unique });
    return html`<a class="group-link" href=${href}>${tag}</a>`;
  }

  override render() {
    if (!this._groups.length) return nothing;

    const hiddenCount = this._groups.length - COLLAPSED_COUNT;
    const visible = this._expanded ? this._groups : this._groups.slice(0, COLLAPSED_COUNT);
    const toggleText = this._expanded
      ? this.localize.term('whoAmI_showLess')
      : this.localize.term('whoAmI_showMore', hiddenCount);
    const toggleLabel = this._expanded
      ? this.localize.term('whoAmI_showLessLabel')
      : this.localize.term('whoAmI_showMoreLabel', hiddenCount);

    return html`
      <uui-box>
        <h4 slot="headline"><uui-icon name="icon-users"></uui-icon> ${this.localize.term('whoAmI_heading')}</h4>
        <div class="groups">
          ${repeat(
            visible,
            (group) => group.unique,
            (group) => this.#renderGroup(group),
          )}
          ${hiddenCount > 0
            ? html`<button
                type="button"
                class="toggle"
                aria-label=${toggleLabel}
                aria-expanded=${this._expanded}
                @click=${this.#toggle}>
                ${toggleText}
              </button>`
            : nothing}
        </div>
      </uui-box>
    `;
  }

  static override styles = css`
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
}

export default WhoAmIProfileAppElement;

declare global {
  interface HTMLElementTagNameMap {
    'who-am-i-profile-app': WhoAmIProfileAppElement;
  }
}
