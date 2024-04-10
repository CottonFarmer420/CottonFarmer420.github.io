import Phaser from 'phaser';
import background from './assets/diesdas.jpg';
import underground from './assets/derboden.png';
import startbackground from './assets/background.png';
import button from './assets/2.png';
import buttonHome from './assets/home.png'
import Figur1 from './assets/spieler.png';
import Hindernis from './assets/hindernisnormal.png';
import HindernisHoch2 from './assets/hindernisshocj.png';
//import playbackground from './assets/start.png'
import HindernisLang from './assets/hindernishoch.png'
import HindernisHoch from './assets/hindernisspitz.png'
import schrift from './assets/schrift.png'


class StartScene extends Phaser.Scene
{
    constructor() {
        super({ key: 'StartScene' });
    }

    preload(){
        this.load.video('backgroundvideo', ['./assets/video.mp4']);
        this.load.audio('backgroundsound', ['./assets/soundon.mp3']);

    }

    create(){
        this.Background = this.add.video(screen.width/2,screen.height/2.3,'backgroundvideo').setScale(0.8);

        this.Background.play();

        this.music = this.sound.add('backgroundsound', {
            volume: 0.2,
        })

        if (!this.sound.locked) {
            this.music.play()
        }
        else {
            this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                this.music.play()
            })
        }

        this.Background.setInteractive();
        this.Background.on('pointerdown', () =>{
            this.scene.start('GameHome');
            this.physics.pause('StartScene');
        });
    }
}

class GameHome extends Phaser.Scene
{
    constructor() {
        super({ key: 'GameHome' });
    }

    preload(){
        this.load.image('HomeBackground', startbackground);
        this.load.image('Spielfigur', Figur1);
        this.load.image('ButtonSpielen', button);
        this.load.image('buttonHome', buttonHome);
        this.load.image('schrift', schrift);
    }

    create(){

        const Background = this.add.image(screen.width/2,screen.height/2,'HomeBackground').setScale(0.9);
        const Buttonspielen = this.add.sprite(screen.width/1.1, screen.height/1.3, 'ButtonSpielen').setScale(0.1);
        const Player = this.add.image(screen.width/2.1, screen.height/2,'Spielfigur').setScale(1.5)
            .setScale(0.4)
        const ButtonHome = this.add.sprite(60, 30, 'buttonHome').setScale(0.06);

        const schrift = this.add.image(screen.width/2, screen.height/4,'schrift');


        Buttonspielen.setInteractive();
        Buttonspielen.on('pointerdown', () =>{
            this.scene.start('MyGame');
        });


        ButtonHome.setInteractive();
        ButtonHome.on('pointerdown',()=>{
            this.scene.start('StartScene');
        });
    }
}


class MyGame extends Phaser.Scene {
    constructor() {
        super({key: 'MyGame'});
        this.backgroundSpeed = 6
        this.bgMusic = null;
    }

    preload() {
        this.load.image('background', background);
        this.load.image('buttonHome', buttonHome);
        this.load.image('floor', underground);
        this.load.spritesheet('Spielfigur', Figur1,{
            frameHeight:48,
            frameWidth: 32
        })
        this.load.image('Hindernis', Hindernis);
        this.load.image('HindernisLang', HindernisLang);
        this.load.image('HindernisHoch', HindernisHoch);
        this.load.image('HindernisHoch2', HindernisHoch2);
        this.load.audio('music', ['./assets/lied.ogg']);
        this.load.audio('soundgameover', ['./assets/dead.mp3']);
    }

    create() {

        this.music = this.sound.add('music', {
            volume: 0.2,
            loop: true
        })

        if (!this.sound.locked) {
            this.music.play()
        }
        else {
            this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                this.music.play()
            })
        }

        this.background1 = this.add.image(0, 0, 'background').setOrigin(0, 0)
        this.background2 = this.add.image(this.background1.x + this.background1.width, 0, 'background').setOrigin(0, 0)

        this.floor1 = this.physics.add.sprite(0, 600, 'floor').setOrigin(0, 0).setScale(0.8);
        this.floor2 = this.physics.add.sprite(this.floor1.x + this.floor1.width-(this.floor1.width/2), 600, 'floor').setOrigin(0, 0).setScale(0.8);

        this.physics.world.enable([this.floor1, this.floor2]);
        this.physics.world.setBounds(0, 0, this.game.config.width, 545);

        this.spieler = this.physics.add.sprite(100, 450, 'Spielfigur').setOrigin(0, 0).setScale(0.1)


        this.physics.add.collider(this.spieler, this.floor1);
        this.physics.add.collider(this.spieler, this.floor2);


        this.gefHindernisse = this.physics.add.group()
        this.Hindernisse = this.physics.add.group()

        this.createHindernisse= ()=> {

            const Random= Math.floor(Math.random() * (6 - 1 + 1)) + 1;

            if(Random ===1){
                const Hindernissen1 = this.gefHindernisse.create(1800, 500, 'HindernisHoch').setOrigin(0, 0).setScale(0.4)
                const Hindernissen = this.Hindernisse.create(1900, 500, 'Hindernis').setOrigin(0, 0).setScale(0.4)
                this.physics.add.collider(Hindernissen, this.floor1)
                this.physics.add.collider(Hindernissen, this.floor2)
                this.physics.add.collider(Hindernissen1, this.floor1)
                this.physics.add.collider(Hindernissen1, this.floor2)

                this.time.addEvent({
                    delay:7000,
                    callback:  () => Hindernissen.destroy(),

                });
            }
            if(Random ===2){
                const Hindernissen1 = this.gefHindernisse.create(1800, 500, 'HindernisHoch').setOrigin(0, 0).setScale(0.4)
                const Hindernissen = this.Hindernisse.create(1850, 500, 'HindernisLang').setOrigin(0, 0).setScale(0.4)
                const Hindernissen2 = this.gefHindernisse.create(2000, 500, 'HindernisHoch').setOrigin(0, 0).setScale(0.4)
                this.physics.add.collider(Hindernissen1, this.floor1)
                this.physics.add.collider(Hindernissen1, this.floor2)
                this.physics.add.collider(Hindernissen, this.floor1)
                this.physics.add.collider(Hindernissen, this.floor2)
                this.physics.add.collider(Hindernissen2, this.floor1)
                this.physics.add.collider(Hindernissen2, this.floor2)

                this.time.addEvent({
                    delay:7000,
                    callback:  () => Hindernissen.destroy(),

                });
            }
            if(Random===3){
                const Hindernissen = this.gefHindernisse.create(1900, 500, 'HindernisHoch').setOrigin(0, 0).setScale(0.4)
                this.physics.add.collider(Hindernissen, this.floor2)
                this.physics.add.collider(Hindernissen, this.floor1)

                this.time.addEvent({
                    delay:7000,
                    callback:  () => Hindernissen.destroy(),

                });
            }
            if(Random===4){
                const Hindernissen = this.gefHindernisse.create(1900, 500, 'HindernisHoch').setOrigin(0, 0).setScale(0.4)
                const Hindernissen2 = this.gefHindernisse.create(1950, 500, 'HindernisHoch').setOrigin(0, 0).setScale(0.4)
                this.physics.add.collider(Hindernissen, this.floor2)
                this.physics.add.collider(Hindernissen, this.floor1)
                this.physics.add.collider(Hindernissen2, this.floor2)
                this.physics.add.collider(Hindernissen2, this.floor1)

                this.time.addEvent({
                    delay:7000,
                    callback:  () => Hindernissen.destroy(),

                });
            }
            if(Random===5){
                const Hindernissen = this.gefHindernisse.create(1800, 500, 'HindernisHoch').setOrigin(0, 0).setScale(0.4)
                const Hindernissen1 = this.Hindernisse.create(1850, 500, 'Hindernis').setOrigin(0, 0).setScale(0.4)
                const Hindernissen2 = this.Hindernisse.create(2000, 500, 'HindernisHoch2').setOrigin(0, 0).setScale(0.4)
                this.physics.add.collider(Hindernissen, this.floor2)
                this.physics.add.collider(Hindernissen, this.floor1)
                this.physics.add.collider(Hindernissen1, this.floor2)
                this.physics.add.collider(Hindernissen1, this.floor1)
                this.physics.add.collider(Hindernissen2, this.floor2)
                this.physics.add.collider(Hindernissen2, this.floor1)

                this.time.addEvent({
                    delay:7000,
                    callback:  () => Hindernissen.destroy(),

                });
            }
            if(Random ===6){
                const Hindernissen1 = this.gefHindernisse.create(1800, 500, 'HindernisHoch').setOrigin(0, 0).setScale(0.4)
                const Hindernissen = this.Hindernisse.create(1900, 500, 'HindernisLang').setOrigin(0, 0).setScale(0.4)
                this.physics.add.collider(Hindernissen1, this.floor1)
                this.physics.add.collider(Hindernissen1, this.floor2)
                this.physics.add.collider(Hindernissen, this.floor1)
                this.physics.add.collider(Hindernissen, this.floor2)

                this.time.addEvent({
                    delay:7000,
                    callback:  () => Hindernissen.destroy(),

                });
            }

        }

        const min = 2000;
        const max = 5000;
        const randomGap=Math.floor(Math.random() * (max - min + 1)) + min;

            this.HindernissLoop= this.time.addEvent({
                delay:randomGap,
                callback: this.createHindernisse,
                callbackScope: this,
                loop: true
            });

        let score= 0;
        this.score=0;

        this.ScoreText = this.add.text(20, 60, 'Score: ' + this.score, {
            font: '18px Arial',
            fill: '#ffffff'
        });

        this.WonText = this.add.text(screen.width/2.7, screen.height/3, '', {
            font: '50px Arial',
            fill: '#ffffff'
        });
        this.GameOverText = this.add.text(screen.width/2.7, screen.height/3, '', {
            font: '50px Arial',
            fill: '#ffffff'
        });

        this.punktesammeln = () => {
            this.gefHindernisse.getChildren().forEach(Hindernis => {
                if ((-100*this.backgroundSpeed) > Hindernis.x && !Hindernis.passed) {
                    Hindernis.passed = true;
                    this.score = this.score + 1;
                }

            });

            this.gefHindernisse.getChildren().forEach(Hindernis => {
                if (Hindernis.passed && this.spieler.x <= Hindernis.x) {
                    Hindernis.passed = false;
                }
            });

            this.ScoreText.setText('Score: ' + this.score);

            if(this.score === 15){
                this.backgroundSpeed=6;
            }
            if(this.score===30){
                this.backgroundSpeed=7;
            }
            if(this.score===40){
                this.backgroundSpeed=8;
            }

            if (this.score >= 50) {
                this.HindernissLoop.destroy();

                setTimeout(() => {
                    this.backgroundSpeed=0;

                    this.WonText = this.add.text(screen.width/2.7, screen.height/3, 'You won! :)', {
                        font: '50px Arial',
                        fill: '#ffffff'
                    });
                    this.physics.pause();
                }, 7000);

            }
        };

        this.effect = this.sound.add('soundgameover', {
            volume: 0.2
        })

        const gameOver = (won = false) => {
            this.HindernissLoop.destroy();
            this.physics.pause();
            this.backgroundSpeed = 0;
            this.music.pause();
            this.effect.play();

            this.anims.create({
                frames: this.anims.generateFrameNumbers('Spielfigur',{
                    start:0,
                    end:12
                }),
                frameRate: 14,
                repeat: -1
            })


            this.GameOverText = this.add.text(screen.width/2.7, screen.height/3, 'Game Over! :(', {
                font: '50px Arial',
                fill: '#ffffff'
            });

            setTimeout(() => {
                this.scene.restart('MyGame');
                this.score = 0;
                this.backgroundSpeed = 5;
            }, 5000);
        };

        this.physics.add.collider(this.spieler, this.Hindernisse)
        this.physics.add.collider(this.spieler, this.gefHindernisse, gameOver, null, this)

        this.input.setDefaultCursor('none');

        const ButtonHomee = this.add.sprite(60, 30, 'buttonHome').setScale(0.06);

        ButtonHomee.setInteractive();
        ButtonHomee.on('pointerdown',()=>{
            this.scene.start('GameHome');
            this.physics.pause();
            this.scene.stop('MyGame');
            this.music.stop()
        });
    }


    update() {

            this.background1.x -= this.backgroundSpeed;
            this.background2.x -= this.backgroundSpeed;//Moving the background

            //checking if the background is moving seamless
            if (this.background1.x + this.background1.width < 0) {
                this.background1.x = this.background2.x + this.background2.width;
            }

            if (this.background2.x + this.background2.width < 0) {
                this.background2.x = this.background1.x + this.background1.width;
            }

            this.floor1.x -= this.backgroundSpeed;
            this.floor2.x -= this.backgroundSpeed;

            //Checking
            if (this.floor1.x + this.floor1.width-(this.floor1.width/2) < 0) {
                this.floor1.x = this.floor2.x + this.floor2.width-(this.floor2.width/2);
            }

            if (this.floor2.x + this.floor2.width-(this.floor2.width/2) < 0) {
                this.floor2.x = this.floor1.x + this.floor1.width-(this.floor1.width/2);
            }

        this.Hindernisse.getChildren().forEach(Hindernis => {
            Hindernis.x -= this.backgroundSpeed;

            // Überprüfe Kollision mit dem Boden
            if (this.physics.overlap(Hindernis, this.floor1)) {
                Hindernis.setVelocityX(this.floor1.body.velocity.x); // Setze die x-Geschwindigkeit des Bodens
                Hindernis.x = Hindernis.x; // Behalte die x-Position bei
            }
        });
        this.gefHindernisse.getChildren().forEach(Hindernis => {
            Hindernis.x -= this.backgroundSpeed;

            // Überprüfe Kollision mit dem Boden
            if (this.physics.overlap(Hindernis, this.floor1)) {
                Hindernis.setVelocityX(this.floor1.body.velocity.x); // Setze die x-Geschwindigkeit des Bodens
                Hindernis.x = Hindernis.x; // Behalte die x-Position bei
            }
        });

            this.punktesammeln();

    const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        if(spaceKey.isDown && this.spieler.body.touching.down){
            this.spieler.setVelocityY(-225)
            this.spieler.body.gravity.y = 8;
        }

        if (this.floor1.y >= screen.height/1.4) {
            this.floor1.setVelocityY(0);
            this.floor1.setY(screen.height/1.4);
        }

        if (this.floor2.y >= screen.height/1.4) {
            this.floor2.setVelocityY(0);
            this.floor2.setY(screen.height/1.4);
        }

    }

}


const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade:{
            gravity: {y:450},
            debug: false,
        }
    },
    scale:{
        mode: Phaser.Scale.RESIZE,
        parent: 'phaser-example',
        width: '100%',
        height: '100%'
    },
    width: 800,
    height: 600,
    scene: [StartScene,GameHome,MyGame],
};

const game = new Phaser.Game(config);