import { Scene } from 'phaser'

export class Game extends Scene {
	camera: Phaser.Cameras.Scene2D.Camera
	player: Phaser.GameObjects.Sprite
	cursor: Phaser.Input.InputManager

	constructor() {
		super('Game')
	}
	create() {
		// check if tilemap data is loaded
		if (!this.cache.tilemap.has('city')) {
			console.error('Tilemap not found for key "city"')
			return
		}
		// create tilemap, key is name of JSON
		const tilemap = this.make.tilemap({ key: 'city' })

		// Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
		// Phaser's cache (i.e. the name you used in preload)
		const groundTiles = tilemap.addTilesetImage('Ground', 'Ground')
		const plantTiles = tilemap.addTilesetImage('Plant', 'Plant')
		const propsTiles = tilemap.addTilesetImage('Props', 'Props')

		// check if tilesets added to tilemap
		if (!groundTiles || !plantTiles || !propsTiles) {
			console.error('Failed to add tilesets')
			return
		}

		// create layers
		// Parameters: layer name (or index) from Tiled, tileset, x, y
		const baseLayer = tilemap.createLayer('Base', groundTiles, 300, 10)
		const topLayer = tilemap.createLayer(
			'Layer1',
			[plantTiles, propsTiles],
			300,
			10
		)
		// debug tool
		const debugGraphics = this.add.graphics().setAlpha(0.75)
		// set layer data
		if (baseLayer) {
			baseLayer.setDepth(0)
			baseLayer.scale = 2.5
		}

		if (topLayer) {
			topLayer.setDepth(1)
			topLayer.scale = 2.5
			topLayer.setCollisionByProperty({ collides: true })
			topLayer.renderDebug(debugGraphics, {
				tileColor: null, // Color of non-colliding tiles
				collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
				faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
			})
		}
	}
}
