export enum MiddlewareType {
    AdminAuth = 'admin',
    AppAuth = 'app',
    ServiceAuth = 'service',
    TokenAuth = 'token'
}

export const routesForMiddleware = {
    '/api/food': [MiddlewareType.TokenAuth, MiddlewareType.AdminAuth, MiddlewareType.ServiceAuth],
    '/api/product': [MiddlewareType.TokenAuth, MiddlewareType.AdminAuth],
    '/api/video': [MiddlewareType.TokenAuth, MiddlewareType.ServiceAuth, MiddlewareType.AppAuth],
    '/api/food/store-admin': [MiddlewareType.TokenAuth, MiddlewareType.AdminAuth, MiddlewareType.ServiceAuth, MiddlewareType.AppAuth],
    '/api/product/store-admin': [MiddlewareType.TokenAuth, MiddlewareType.AdminAuth, MiddlewareType.ServiceAuth, MiddlewareType.AppAuth],
    '/api/video/store-admin': [MiddlewareType.TokenAuth, MiddlewareType.AdminAuth, MiddlewareType.ServiceAuth, MiddlewareType.AppAuth],
    '/api/common/store-admin': [MiddlewareType.TokenAuth, MiddlewareType.AdminAuth, MiddlewareType.ServiceAuth, MiddlewareType.AppAuth],
    '/api/super-admin': [MiddlewareType.TokenAuth, MiddlewareType.ServiceAuth, MiddlewareType.AppAuth]
};
