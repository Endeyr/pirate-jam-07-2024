import { Direction } from './Directions'
import { Game } from './scenes/Game'

export class Player extends Phaser.Physics.Arcade.Sprite {
	tilePos: Phaser.Math.Vector2
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
		this.tilePos = new Phaser.Math.Vector2(x, y)

		// Set origin to center on x and bottom on y
		this.setOrigin(0.5, 1)
		this.setPosition(x, y)
		this.setFrame(0)
		this.setSize(18, 28)
		this.setOffset(7, 4)
		this.setScale(Game.scale)
		this.setDepth(2)
	}

	stopAnimation() {
		if (this.anims.currentAnim) {
			const standingFrame = this.anims.currentAnim.frames[0].frame.name
			this.anims.stop()
			this.setFrame(standingFrame)
		}
	}

	startAnimation(direction: Direction) {
		if (direction === Direction.LEFT) {
			this.setFlipX(true)
			this.anims.play(direction)
		} else {
			this.setFlipX(false)
			this.anims.play(direction)
		}
	}

	getTilePos(): Phaser.Math.Vector2 {
		return this.tilePos.clone()
	}

	setTilePos(tilePosition: Phaser.Math.Vector2): void {
		this.tilePos = tilePosition.clone()
	}
}
