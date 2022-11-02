import { Three0Contract, UserActionType } from '../blockchain/NEAR'
import { isLoggedIn as isLoggedInLocally, getAccountId } from './Session'

export default async function initAuth() {
	if (!isLoggedInLocally()) return

	let isLoggedIn = true

	try {
		const user = await (
			globalThis.contract as unknown as Three0Contract
		).get_user({
			account_id: getAccountId(),
		})
		isLoggedIn = user.is_online
	} catch (e) {
		isLoggedIn = false
		throw e
	}

	if (!isLoggedIn) {
		await (globalThis.contract as unknown as Three0Contract).user_action({
			action: UserActionType.LOGIN,
		})
	}
}
