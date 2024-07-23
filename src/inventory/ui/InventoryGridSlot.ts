import { InventoryGridContext } from './InventoryGridContext'
export class InventoryGridSlot extends Phaser.GameObjects.Image {
	constructor(
		public readonly slotSprite: Phaser.GameObjects.Image,
		public readonly slotType: InventoryGridContext,
		scene: Phaser.Scene
	) {
		super(scene, 0, 0, slotSprite.texture)
	}
}
