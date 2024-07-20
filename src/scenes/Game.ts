import { Scene } from 'phaser'
import { Player } from '../Player'
import { GridControls } from './../GridControls'
import { GridPhysics } from './../GridPhysics'

export class Game extends Scene {
	camera: Phaser.Cameras.Scene2D.Camera
	player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
	cursors: Phaser.Types.Input.Keyboard.CursorKeys
	mouse: Phaser.Input.Mouse.MouseManager
	showDebug = false
	static readonly tileSize: number = 16
	static readonly scale: number = 3
	gridControls: GridControls
	gridPhysics: GridPhysics

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
		const tiles = tilemap.addTilesetImage(
			'Tileset',
			'Tileset',
			Game.tileSize,
			Game.tileSize,
			0,
			0
		)
		const creationTiles = tilemap.addTilesetImage(
			'Creation',
			'Creation',
			Game.tileSize,
			Game.tileSize,
			0,
			0
		)
		const explodeTiles = tilemap.addTilesetImage(
			'Explode',
			'Explode',
			Game.tileSize,
			Game.tileSize,
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

		// set layer data
		if (!belowLayer || !worldLayer || !aboveLayer) {
			console.error('Failed to create layers')
			return
		}
		// Ground Layer
		belowLayer.setDepth(0)
		belowLayer.setScale(Game.scale)
		// Player Layer
		worldLayer.setDepth(1)
		worldLayer.setScale(Game.scale)
		worldLayer.setCollisionByProperty({ collides: true })

		// Ceiling Layer
		aboveLayer.setDepth(10)
		aboveLayer.setScale(Game.scale)

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
		this.player = new Player(
			this,
			spawnPoint.x || 300,
			spawnPoint.y || 300,
			'Player',
			0
		) as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody

		// Watch the player and worldLayer for collisions, for the duration of the scene:
		this.physics.add.collider(this.player, worldLayer)

		// Create player walking animations
		const anims = this.anims
		anims.create({
			key: 'walk',
			frames: anims.generateFrameNames('Player', {
				start: 0,
				end: 1,
			}),
			frameRate: 10,
			repeat: -1,
		})
		anims.create({
			key: 'run',
			frames: anims.generateFrameNames('Player', {
				start: 25,
				end: 32,
			}),
			frameRate: 10,
			repeat: -1,
		})
		// Camera
		const cameraSize = 1920
		this.camera = this.cameras.main
		this.camera.startFollow(this.player, true)
		this.camera.setBounds(0, 0, cameraSize, cameraSize)
		// Inputs
		if (!this.input.keyboard || !this.input.mouse) {
			console.error('Input not found')
			return
		}

		// Create the grid objects
		this.gridPhysics = new GridPhysics(this.player)
		this.gridControls = new GridControls(this.input, this.gridPhysics)

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

	update() {
		if (!this.player.body) {
			console.error('Player body does not exist')
			return
		}

		this.gridControls.update()
		this.gridPhysics.update()

		// Update the animation last and give left/right animations precedence over up/down animations
		// if (this.cursors.left.isDown) {
		// 	this.player.setFlipX(true)
		// 	this.player.anims.play('walk', true)
		// } else if (this.cursors.right.isDown) {
		// 	this.player.setFlipX(false)
		// 	this.player.anims.play('walk', true)
		// } else if (this.cursors.up.isDown) {
		// 	this.player.anims.play('walk', true)
		// } else if (this.cursors.down.isDown) {
		// 	this.player.anims.play('walk', true)
		// } else {
		// 	this.player.anims.stop()

		// If we were moving, pick and idle frame to use
		// if (prevVelocity.x < 0) this.player.setTexture('Player', 0)
		// else if (prevVelocity.x > 0) this.player.setTexture('Player', 0)
		// }
	}
}
