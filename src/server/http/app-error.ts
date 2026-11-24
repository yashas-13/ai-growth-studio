export type AppErrorCode = 'BAD_REQUEST' | 'UNAUTHENTICATED' | 'FORBIDDEN' | 'NOT_FOUND' | 'CONFLICT' | 'VALIDATION_ERROR' | 'AUTH_NOT_CONFIGURED' | 'INTERNAL_ERROR'

const statusByCode: Record<AppErrorCode, number> = {
  BAD_REQUEST: 400,
  UNAUTHENTICATED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  VALIDATION_ERROR: 422,
  AUTH_NOT_CONFIGURED: 503,
  INTERNAL_ERROR: 500,
}

export class AppError extends Error {
  readonly status: number
  constructor(readonly code: AppErrorCode, message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'AppError'
    this.status = statusByCode[code]
  }
}
