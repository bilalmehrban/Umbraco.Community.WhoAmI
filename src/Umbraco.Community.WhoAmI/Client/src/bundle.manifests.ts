export const manifests: Array<UmbExtensionManifest> = [
  {
    type: 'userProfileApp',
    alias: 'WhoAmI.UserProfileApp',
    name: 'Who Am I Profile App',
    // Higher weight sorts earlier. Built-ins: Profile 900, Theme 200, History 100.
    weight: 800,
    element: () => import('./who-am-i-profile-app.element.js'),
    meta: {
      label: 'Who Am I',
      pathname: 'who-am-i',
    },
  },
  {
    type: 'localization',
    alias: 'WhoAmI.Localization.En',
    name: 'Who Am I English',
    meta: { culture: 'en' },
    js: () => import('./localization/en.js'),
  },
];
