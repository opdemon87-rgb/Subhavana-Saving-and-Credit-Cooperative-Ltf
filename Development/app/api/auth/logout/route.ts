import { ok, handleErr } from '@/lib/api'
import { destroySession } from '@/lib/auth'

export async function POST() {
  try { await destroySession(); return ok({ loggedOut: true }) }
  catch (e) { return handleErr(e) }
}