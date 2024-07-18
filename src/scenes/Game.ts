import { Scene } from 'phaser'

export class Game extends Scene {
	camera: Phaser.Cameras.Scene2D.Camera
	player: any
	cursors: Phaser.Types.Input.Keyboard.CursorKeys
	showDebug = false

	constructor() {
		super('Game')
	}
	create() {
		// check if tilemap data is loaded
		if (!this.cache.tilemap.has('fire')) {
			console.error('Tilemap not found for key "fire"')
			return
		}
		// create tilemap, key is name of JSON
		const tilemap = this.make.tilemap({ key: 'fire' })

		// Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
		// Phaser's cache (i.e. the name you used in preload)
		const tiles = tilemap.addTilesetImage('Tileset', 'Tileset', 16, 16, 0, 0)
		const creationTiles = tilemap.addTilesetImage(
			'Creation',
			'Creation',
			16,
			16,
			0,
			0
		)
		const explodeTiles = tilemap.addTilesetImage(
			'Explode',
			'Explode',
			16,
			16,
			0,
			0
		)

		// check if tilesets added to tilemap
		if (!tiles || !creationTiles || !explodeTiles) {
			console.error('Failed to add tilesets')
			return
		}

		// create layers
		// Parameters: layer name (or index) from Tiled, tileset, x, y
		const belowLayer = tilemap.createLayer('Below Player', tiles, 0, 0)
		const worldLayer = tilemap.createLayer(
			'World',
			[tiles, creationTiles, explodeTiles],
			0,
			0
		)
		const aboveLayer = tilemap.createLayer('Above Player', tiles, 0, 0)
		// debug tool
		const debugGraphics = this.add.graphics().setAlpha(0.75)
		// set layer data
		if (!belowLayer || !worldLayer || !aboveLayer) {
			console.error('Failed to create layers')
			return
		}
		const scale = 3
		// Ground Layer
		belowLayer.setDepth(0)
		belowLayer.scale = scale
		// Player Layer
		worldLayer.setDepth(1)
		worldLayer.scale = scale
		worldLayer.setCollisionByProperty({ collides: true })
		worldLayer.renderDebug(debugGraphics, {
			tileColor: null, // Color of non-colliding tiles
			collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
			faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
		})
		// Ceiling Layer
		aboveLayer.setDepth(10)
		aboveLayer.scale = scale

		// Object layers in Tiled let you embed extra info into a map - like a spawn point or custom
		// collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"
		const spawnPoint = tilemap.findObject(
			'Player',
			(obj) => obj.name === 'Spawn Point'
		)

		if (!spawnPoint) {
			console.error('No Spawn Point Found')
			return
		}

		// Create a sprite with physics enabled via the physics system.
		this.player = this.physics.add
			.sprite(spawnPoint.x || 500, spawnPoint.y || 500, 'Player', 0)
			.setScale(scale)

		// Watch the player and worldLayer for collisions, for the duration of the scene:
		this.physics.add.collider(this.player, worldLayer)
		// Create player walking animations
		const anims = this.anims
		anims.create({
			key: 'left-walk',
			frames: anims.generateFrameNames('Player', {
				start: 0,
				end: 0,
			}),
			frameRate: 10,
			repeat: -1,
		})
		anims.create({
			key: 'right-walk',
			frames: anims.generateFrameNames('Player', {
				start: 0,
				end: 0,
			}),
			frameRate: 10,
			repeat: -1,
		})
		anims.create({
			key: 'front-walk',
			frames: anims.generateFrameNames('Player', {
				start: 0,
				end: 0,
			}),
			frameRate: 10,
			repeat: -1,
		})
		anims.create({
			key: 'back-walk',
			frames: anims.generateFrameNames('Player', {
				start: 0,
				end: 0,
			}),
			frameRate: 10,
			repeat: -1,
		})
		// Camera
		this.camera = this.cameras.main
		this.camera.startFollow(this.player)
		this.camera.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels)
		// Inputs
		if (!this.input.keyboard) {
			console.error('Keyboard input not found')
			return
		}
		this.cursors = this.input.keyboard.createCursorKeys()
		// Help text that has a "fixed" position on the screen
		this.add
			.text(16, 16, 'Arrow keys to move\nPress "D" to show hitboxes', {
				font: '18px monospace',
				padding: { x: 20, y: 10 },
				backgroundColor: '#ffffff',
				color: '#000',
			})
			.setScrollFactor(0)
			.setDepth(30)

		// Debug graphics
		this.input.keyboard.once('keydown-D', () => {
			// Turn on physics debugging to show player's hitbox
			this.physics.world.createDebugGraphic()

			// Create worldLayer collision graphic above the player, but below the help text
			const graphics = this.add.graphics().setAlpha(0.75).setDepth(20)
			worldLayer.renderDebug(graphics, {
				tileColor: null, // Color of non-colliding tiles
				collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
				faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
			})
		})
	}

	update(time: number, delta: number) {
		if (!this.player.body) {
			console.error('Player body does not exist')
			return
		}
		const speed = 175
		const prevVelocity = this.player.body.velocity.clone()
		// Stop any previous movement from the last frame
		this.player.body.setVelocity(0)

		// Horizontal movement
		if (this.cursors.left.isDown) {
			this.player.body.setVelocityX(-speed)
		} else if (this.cursors.right.isDown) {
			this.player.body.setVelocityX(speed)
		}

		// Vertical movement
		if (this.cursors.up.isDown) {
			this.player.body.setVelocityY(-speed)
		} else if (this.cursors.down.isDown) {
			this.player.body.setVelocityY(speed)
		}

		// Normalize and scale the velocity so that player can't move faster along a diagonal
		this.player.body.velocity.normalize().scale(speed)

		// Update the animation last and give left/right animations precedence over up/down animations
		if (this.cursors.left.isDown) {
			this.player.anims.play('left-walk', true)
		} else if (this.cursors.right.isDown) {
			this.player.anims.play('right-walk', true)
		} else if (this.cursors.up.isDown) {
			this.player.anims.play('back-walk', true)
		} else if (this.cursors.down.isDown) {
			this.player.anims.play('down-walk', true)
		} else {
			this.player.anims.stop()

			// If we were moving, pick and idle frame to use
			if (prevVelocity.x < 0) this.player.setTexture('Player', 'left')
			else if (prevVelocity.x > 0) this.player.setTexture('Player', 'right')
			else if (prevVelocity.y < 0) this.player.setTexture('Player', 'back')
			else if (prevVelocity.y > 0) this.player.setTexture('Player', 'front')
		}
	}
}
