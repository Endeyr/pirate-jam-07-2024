import { InventoryGridFactory } from './InventoryGridFactory'

export class InventoryWindowFactory {
	static create(scene: Phaser.Scene) {
		let inventory = []

		const backgroundImg = scene.add.image(0, 0, 'Inventory')
		backgroundImg.setOrigin(0, 0)

		const inventoryGrid = InventoryGridFactory.create(scene)
		const gridOffsetX = 88
		const gridOffsetY = 240
		inventoryGrid.setPosition(gridOffsetX, gridOffsetY)

		inventory.push(backgroundImg, inventoryGrid)

		const inventoryWindow = scene.add.container(0, 0, inventory)

		inventoryWindow.scale = 0.5
		inventoryWindow.setPosition(450, 125)
		inventoryWindow.setDepth(20)

		const debugGraphics = scene.add.graphics()
		debugGraphics.lineStyle(2, 0xff0000)
		debugGraphics.strokeRect(0, 0, backgroundImg.width, backgroundImg.height)
		debugGraphics.lineStyle(2, 0x00ff00)
		debugGraphics.strokeRect(
			gridOffsetX,
			gridOffsetY,
			inventoryGrid.width,
			inventoryGrid.height
		)
		inventoryWindow.add(debugGraphics)

		return inventoryWindow
	}
}
