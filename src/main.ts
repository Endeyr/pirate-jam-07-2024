import { Boot } from './scenes/Boot'
import { Game as MainGame } from './scenes/Game'
import { GameOver } from './scenes/GameOver'
import { MainMenu } from './scenes/MainMenu'
import { Preloader } from './scenes/Preloader'

import { Game, Types } from 'phaser'

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
	title: 'Pirate Jam',
	render: { antialias: false },
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	audio: { disableWebAudio: true },
	physics: { default: 'arcade', arcade: { fps: 60, gravity: { x: 0, y: 0 } } },
	parent: 'game-container',
	backgroundColor: '#000',
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
}

export default new Game(config)
