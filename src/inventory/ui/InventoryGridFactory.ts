import { InventoryGridSlotFactory } from './InventoryGridSlotFactory'
import { InventoryGridSlotSpriteFactory } from './InventoryGridSlotSpriteFactory'

export class InventoryGridFactory {
	static create(scene: Phaser.Scene) {
		const inventorySlots = 28
		const slots = InventoryGridSlotFactory.create(
			scene,
			inventorySlots,
			InventoryGridSlotSpriteFactory.create
		)

		const cols = 4
		const rows = 7
		const table = scene.add.container(0, 0)
		let index = 0

		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const itemSlot = slots[index]
				itemSlot.setPosition(c * 160, r * 160)
				table.add(itemSlot)
				index++
			}
		}

		return table
	}
}
