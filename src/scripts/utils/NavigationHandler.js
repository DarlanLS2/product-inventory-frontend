export class NavigationHandler {
  static goTo(path) {
    window.location.href = path;
  }
  static reload() {
    window.location.reload();
  }
}
