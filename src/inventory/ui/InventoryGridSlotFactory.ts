import { InventoryGridContext } from './InventoryGridContext'
import { InventoryGridSlot } from './InventoryGridSlot'

export class InventoryGridSlotFactory {
	static create(
		scene: Phaser.Scene,
		amount: number,
		createSlotSprite: (scene: Phaser.Scene) => Phaser.GameObjects.Image
	) {
		let slots: Phaser.GameObjects.Image[] = []
		for (let i = 0; i < amount; i++) {
			const slotSprite = createSlotSprite(scene)
			const slot = new InventoryGridSlot(
				slotSprite,
				InventoryGridContext.inventory,
				scene
			)
			slots.push(slot)
		}

		return slots
	}
}
