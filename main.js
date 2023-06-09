function menuClickBelow() {
  // Handle clicks on menu links
  let links = document.querySelectorAll("main a");
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (event) {
      event.preventDefault();
      alert("Clicked " + this.textContent);
    });
  }
  var source =
    "https://www.dropbox.com/s/1sla9b71deqd594/Y2Mate.is%20-%20Near%27s%20Theme%20%28A%29%20-%20Death%20Note-WJW_ldC7sUA-160k-1655490024216.mp3?dl=1";
  var audio = document.createElement("audio");
  audio.autoplay = true;
  audio.load();

  audio.addEventListener("load", function () {
    audio.play();
  });

  audio.src = source;

  //Call dis to change the volume
  audio.volume = 0.5;

  var volumeControl = document.createElement("input");
  volumeControl.type = "range";
  volumeControl.min = "0";
  volumeControl.max = "1";
  volumeControl.step = "0.1";
  volumeControl.value = audio.volume;

  volumeControl.addEventListener("input", function () {
    audio.volume = this.value;
  });

  document.body.appendChild(volumeControl);
}

menuClickBelow();
//Extra Features Above
////////////////////////////////////////////////////////////////////////////////

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 64 * 16;
canvas.height = 64 * 9;

let parsedCollisions;
let collisionBlocks;
let background;
let doors;

const player = new Player({
  imageSrc: "./img/Idle.png",
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 15,
      loop: true,
      imageSrc: "./img/Idle.png",
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 15,
      loop: true,
      imageSrc: "./img/IdleLeft.png",
    },
    runRight: {
      frameRate: 5,
      frameBuffer: 5,
      loop: true,
      imageSrc: "./img/runRight.png",
    },
    runLeft: {
      frameRate: 5,
      frameBuffer: 5,
      loop: true,
      imageSrc: "./img/runLeft.png",
    },

    enterDoor: {
      frameRate: 8,
      frameBuffer: 15,
      loop: false,
      imageSrc: "./img/enterDoor.png",
      onComplete: () => {
        console.log("completed Animation");
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            level++;
            if (level === 4) level = 1;
            levels[level].init();
            player.switchSprite("idleRight");
            player.preventInput = false;
            gsap.to(overlay, {
              opacity: 0,
            });
          },
        });
      },
    },
  },
});
let level = 1;
let levels = {
  1: {
    init: () => {
      parsedCollisions = collData.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 200;
      player.position.y = 250;

      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/Lev1.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 804,
            y: 273.0,
          },
          imageSrc: "./img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 15,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },

  2: {
    init: () => {
      parsedCollisions = collData2.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 200;
      player.position.y = 50;

      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/Lev2.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 212.0,
            y: 400,
          },
          imageSrc: "./img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 15,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },

  3: {
    init: () => {
      parsedCollisions = collData3.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 150;
      player.position.y = 390;

      if (player.currentAnimation) player.currentAnimation.isActive = false;
      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/Lev3.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 178,
            y: 190.67 - 112,
          },
          imageSrc: "./img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 15,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
};

// x-koordinat 804,00 för dörr
//y-koordinat 385,00 för dörr

const keys = {
  w: {
    pressed: false,
  },

  a: {
    pressed: false,
  },

  d: {
    pressed: false,
  },
};
//let bottom = y + 100;

const overlay = {
  opacity: 0,
};

function animate() {
  window.requestAnimationFrame(animate);

  background.draw();

  //collisionBlocks.forEach((CollisionBlock) => {
  // CollisionBlock.draw();
  //});

  doors.forEach((door) => {
    door.draw();
  });

  player.handleInput(keys);
  player.update();
  player.draw();

  c.save();
  c.globalAlpha = overlay.opacity;
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
}
levels[level].init();
animate();
