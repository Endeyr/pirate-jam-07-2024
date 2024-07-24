export class InventoryGridFactory {
	static create(scene: Phaser.Scene) {
		const inventorySlots = 28
		let slots: Phaser.GameObjects.Graphics[] = []
		for (let i = 0; i < inventorySlots; i++) {
			const slot = scene.add.graphics()
			slot.lineStyle(10, 0x000)
			slot.fillStyle(0xfff)
			slot.beginPath()
			slot.moveTo(0, 0)
			slot.lineTo(160, 0)
			slot.lineTo(160, 160)
			slot.lineTo(0, 160)
			slot.lineTo(0, 0)
			slot.closePath()
			slot.strokePath()
			slots.push(slot)
		}

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
