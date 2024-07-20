import { Game } from './scenes/Game'

export class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		texture: string,
		frame?: string | number
	) {
		super(scene, x, y, texture, frame)
		scene.add.existing(this)
		scene.physics.add.existing(this)

		// Set origin to center on x and bottom on y
		this.setOrigin(0.5, 1)
		this.setPosition(x, y)
		this.setFrame(0)
		this.setSize(18, 28)
		this.setOffset(7, 4)
		this.setScale(Game.scale)
		this.setDepth(2)
	}
}
