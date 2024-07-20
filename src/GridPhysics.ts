import { Direction } from './Directions'
import { Game } from './scenes/Game'

const Vector2 = Phaser.Math.Vector2
type Vector2Type = Phaser.Math.Vector2

export class GridPhysics {
	private movementDirectionVectors: {
		[key in Direction]?: Vector2Type
	} = {
		[Direction.UP]: Vector2.UP,
		[Direction.DOWN]: Vector2.DOWN,
		[Direction.LEFT]: Vector2.LEFT,
		[Direction.RIGHT]: Vector2.RIGHT,
	}
	private readonly speedPixelsPerSecond: number = Game.tileSize * 16
	private currentDirection: Direction = Direction.NONE
	constructor(
		private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
	) {}

	movePlayer(direction: Direction): void {
		this.currentDirection = direction
		this.updatePlayerVelocity()
	}

	stopMoving(): void {
		this.currentDirection = Direction.NONE
		this.updatePlayerVelocity()
	}

	private updatePlayerVelocity(): void {
		const vector = this.movementDirectionVectors[this.currentDirection]
		if (vector) {
			this.player.setVelocity(
				vector.x * this.speedPixelsPerSecond,
				vector.y * this.speedPixelsPerSecond
			)
		} else {
			this.player.setVelocity(0, 0)
		}
	}

	update(): void {}
}
