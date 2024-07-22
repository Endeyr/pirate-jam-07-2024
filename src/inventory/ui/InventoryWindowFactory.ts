import { centerVH } from '../../utils/helpers'

export class InventoryWindowFactory {
	constructor(scene: Phaser.Scene) {
		const backgroundImg = scene.add.image(0, 0, 'UI')
		const inventoryWindow = scene.add.container(350, 350, backgroundImg)
		inventoryWindow.scale = 4

		centerVH(inventoryWindow)
	}
}
