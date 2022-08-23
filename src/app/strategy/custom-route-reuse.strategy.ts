import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private storedRoutes = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    if (route.routeConfig) {
      return route.data['key'] === 'list_comp';
    } else {
      return false;
    }
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (route.routeConfig?.path !== undefined)
      this.storedRoutes.set(route.routeConfig.path, handle);
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    if (
      route.data['key'] === 'list_comp' &&
      route.routeConfig?.path !== undefined
    ) {
      return (
        !!route.routeConfig && !!this.storedRoutes.get(route.routeConfig.path)
      );
    } else {
      return false;
    }
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (
      !route.routeConfig ||
      route.routeConfig.loadChildren ||
      !route.routeConfig.path
    ) {
      return null;
    }
    return this.storedRoutes.get(route.routeConfig.path) as DetachedRouteHandle;
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
