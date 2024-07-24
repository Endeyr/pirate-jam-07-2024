import { InventoryGridFactory } from './InventoryGridFactory'

export class InventoryWindowFactory {
	static create(scene: Phaser.Scene) {
		let inventory = []

		const backgroundImg = scene.add.graphics()
		backgroundImg.lineStyle(20, 0x000)
		backgroundImg.fillStyle(0xddd)
		backgroundImg.beginPath()
		backgroundImg.moveTo(0, 0)
		backgroundImg.lineTo(640, 0)
		backgroundImg.lineTo(640, 1280)
		backgroundImg.lineTo(0, 1280)
		backgroundImg.lineTo(0, 0)
		backgroundImg.fillPath()
		backgroundImg.closePath()
		backgroundImg.strokePath()

		const inventoryGrid = InventoryGridFactory.create(scene)
		const gridOffsetX = 0
		const gridOffsetY = 160
		inventoryGrid.setPosition(gridOffsetX, gridOffsetY)

		inventory.push(backgroundImg, inventoryGrid)

		const inventoryWindow = scene.add.container(0, 0, inventory)

		inventoryWindow.scale = 0.5
		inventoryWindow.setPosition(450, 125)
		inventoryWindow.setDepth(20)

		const debugGraphics = scene.add.graphics()
		debugGraphics.lineStyle(2, 0xff0000)
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
