import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { AppError } from './app-error'

export function success<T>(data: T, status = 200) {
  return NextResponse.json({ data, error: null }, { status, headers: { 'Cache-Control': 'no-store' } })
}

export function failure(error: unknown) {
  if (error instanceof SyntaxError) {
    return NextResponse.json({ data: null, error: { code: 'BAD_REQUEST', message: 'Request body must be valid JSON' } }, { status: 400 })
  }
  if (error instanceof ZodError) {
    return NextResponse.json({ data: null, error: { code: 'VALIDATION_ERROR', message: 'Request validation failed', details: error.issues } }, { status: 422 })
  }
  if (error instanceof AppError) {
    return NextResponse.json({ data: null, error: { code: error.code, message: error.message } }, { status: error.status })
  }
  console.error(JSON.stringify({ level: 'error', event: 'api.unhandled_error', errorType: error instanceof Error ? error.name : 'UnknownError', timestamp: new Date().toISOString() }))
  return NextResponse.json({ data: null, error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' } }, { status: 500 })
}
