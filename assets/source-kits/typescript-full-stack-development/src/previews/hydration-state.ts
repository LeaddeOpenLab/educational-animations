export const hydrationState = (frame: number) => ({
  serverHtml: frame >= 40,
  browserPainted: frame >= 100,
  handlersAttached: frame >= 170,
  clicked: frame >= 235,
  count: frame >= 235 ? 3 : 2,
  nodeIds: ['h1#n1', 'button#n2'],
});
