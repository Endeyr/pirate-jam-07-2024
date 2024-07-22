import { Scene } from 'phaser'

export class Preloader extends Scene {
	constructor() {
		super('Preloader')
	}

	init() {}
	// Runs once, loads up assets like images and audio
	preload() {
		//  Load the assets for the game - Replace with your own assets
		this.load.setPath('assets')
		// tilemap assets
		this.load.image('Creation', 'images/Creation.png')
		this.load.image('Explode', 'images/Explode.png')
		this.load.image('Tileset', 'images/Tileset.png')
		this.load.tilemapTiledJSON('fire', 'json/fire.json')

		// game assets
		this.load.image('UI', 'images/Inventory.png')

		// player assets
		this.load.spritesheet('Player', 'images/Character.png', {
			frameWidth: 32,
			frameHeight: 32,
			startFrame: 0,
			endFrame: 72,
		})
	}
	// Runs once, after all assets in preload are loaded
	create() {
		//  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
		//  For example, you can define global animations here, so we can use them in other scenes.

		//  Move to the Next Scene
		// TODO create Main Menu then change this to Main Menu
		this.scene.start('Game')
	}
	// Runs once per frame for the duration of the scene
	// to check over time, e.g. updating a player sprite's position based on keyboard input
	// function update(time, delta){}
}
