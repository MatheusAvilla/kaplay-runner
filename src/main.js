import kaplay from 'https://cdn.jsdelivr.net/npm/kaplay@3001.0.9/+esm'

const k = kaplay({
    width: window.innerWidth,
    height:  window.innerHeight
});

window.addEventListener("resize", () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
  
    k.resize(width, height);
  });

k.setBackground(k.CYAN);

k.scene("main", () => {
    k.setGravity(2000)

    k.loadSprite("basketball", "kaplay-runner/assets/simples-ball.png", {
        sliceX: 5,
        anims: {
            idle: { from: 0, to: 4, speed: 10, loop: true }
        }
    });

    k.add([
        k.rect(k.width(), 300),
        k.pos(0, window.innerHeight / 1.18),
        k.color(k.GREEN),
        k.area(),
        k.outline(3),
        k.body({ isStatic: true })
    ]);
    
    const player = k.add([
        k.sprite("basketball"),
        k.pos(k.center()),
        k.body(),
        k.area(),
        k.offscreen(),
        "player"
    ]);
    
    player.play("idle");
    
    player.onKeyPress("space", () => {
        if (player.isGrounded()) {
            player.jump();
        }
    });

    onClick(() => {
        if (player.isGrounded()) {
            player.jump();
        }
    })
    
    player.onExitScreen(() => {
        k.go("gameover");
    });
    
    let counter = 0;
    
    const counterUI = k.add([
        k.text("0"),
        k.pos(30, 30),
        k.color(k.BLACK)
    ]);
    
    k.loop(1, () => {
        counter++;
        counterUI.text = `Time: ${counter.toString()} seconds`;
    
       const speeds = [300, 500, 800, 1000, 1500];
       const currentSpeed = speeds[Math.floor(Math.random() * speeds.length)];
       const colors = [k.BLUE, k.RED, k.YELLOW, k.MAGENTA, k.BLACK];
       const currentColor = colors[Math.floor(Math.random() * colors.length)]
       
        k.add([
            k.rect(50, 50),
            k.pos(window.innerWidth-80, innerHeight / 1.3),
            k.area(),
            k.body(),
            k.outline(3),
            k.color(currentColor),
            k.move(k.vec2(-1, 0), currentSpeed)
        ]);
    });

    k.scene("gameover", () => {
        k.add([
            k.text(`Game Over! =(\nYour Score: ${counter} seconds!`),
            k.pos( window.innerWidth / 3, window.innerHeight / 2),
            k.color(k.BLACK)
        ]);

        const tryAgainButton = k.add([
            k.text("Try Again!", { size: 32 }),
            k.pos( window.innerWidth / 2.3, window.innerHeight / 1.5),
            k.area(),
            k.color(0, 0, 150)
        ]);

        let isHovered = false;

        k.onUpdate(() => {
            if (tryAgainButton.isHovering()) {
              if (!isHovered) {
                isHovered = true;
                tryAgainButton.color = k.rgb(4, 79, 117);
                tryAgainButton.scale = k.vec2(1.2);
                k.setCursor("pointer");
              }
            } else {
              if (isHovered) {
                isHovered = false;
                tryAgainButton.color = k.rgb(0, 0, 150);
                tryAgainButton.scale = k.vec2(1);
                k.setCursor("default");
              }
            }
        });
        
        tryAgainButton.onClick(() => {
            k.go("main");
        });
    });
    
});

k.go("main");