// Helpers for moving the player by tile
export const getPosition = (
	playerSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
): Phaser.Math.Vector2 => {
	return playerSprite.getBottomCenter()
}

export const setPosition = (
	playerSprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
	position: Phaser.Math.Vector2
): void => {
	playerSprite.setPosition(position.x, position.y)
}
