const e = [
  {
    type: "userProfileApp",
    alias: "WhoAmI.UserProfileApp",
    name: "Who Am I Profile App",
    // Higher weight sorts earlier. Built-ins: Profile 900, Theme 200, History 100.
    weight: 800,
    element: () => import("./who-am-i-profile-app.element-CPMER-zR.js"),
    meta: {
      label: "Who Am I",
      pathname: "who-am-i"
    }
  },
  {
    type: "localization",
    alias: "WhoAmI.Localization.En",
    name: "Who Am I English",
    meta: { culture: "en" },
    js: () => import("./en-VGkpb6xD.js")
  }
];
export {
  e as manifests
};
//# sourceMappingURL=who-am-i.js.map
