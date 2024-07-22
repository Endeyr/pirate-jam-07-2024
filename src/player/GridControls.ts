import { Direction } from './Directions'
import { GridPhysics } from './GridPhysics'

export class GridControls {
	private cursors: Phaser.Types.Input.Keyboard.CursorKeys
	private lastDirection: Direction = Direction.NONE
	constructor(
		private input: Phaser.Input.InputPlugin,
		private gridPhysics: GridPhysics
	) {
		if (!this.input.keyboard) {
			console.error('No keyboard detected')
			return
		}
		this.cursors = this.input.keyboard.createCursorKeys()
	}

	update() {
		const direction = this.getDirection()
		if (direction !== this.lastDirection) {
			if (direction === Direction.NONE) {
				this.gridPhysics.stopMoving()
			} else {
				this.gridPhysics.movePlayer(direction)
			}
			this.lastDirection = direction
		}
	}

	private getDirection(): Direction {
		if (this.cursors.left.isDown) {
			return Direction.LEFT
		} else if (this.cursors.right.isDown) {
			return Direction.RIGHT
		} else if (this.cursors.up.isDown) {
			return Direction.UP
		} else if (this.cursors.down.isDown) {
			return Direction.DOWN
		}
		return Direction.NONE
	}
}
