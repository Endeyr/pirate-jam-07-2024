export class InventoryGridSlotSpriteFactory {
	static create(scene: Phaser.Scene) {
		const slotSprite = scene.add.image(0, 0, 'Slot')
		return slotSprite
	}
}
