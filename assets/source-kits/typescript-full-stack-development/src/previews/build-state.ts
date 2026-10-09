export const buildState = (frame: number) => ({
  sharedRequiresAvatar: frame >= 55,
  apiError: frame >= 100 && frame < 175,
  webError: frame >= 100 && frame < 230,
  apiHasAvatar: frame >= 175,
  webHasAvatar: frame >= 230,
  apiBuilds: frame < 100 || frame >= 175,
  webBuilds: frame < 100 || frame >= 230,
});
