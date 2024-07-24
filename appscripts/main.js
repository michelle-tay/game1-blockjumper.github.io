var character = document.getElementById("character");
var block = document.getElementById("block");
var counter = document.getElementById("counter");
var score = 0;
var blockAnimationDuration = 1; // Start with 1 second duration for the animation

// Start button and game container
var startButton = document.getElementById("start-button");
var gameContainer = document.getElementById("game1");
var colorPicker = document.getElementById("character-color");

character.style.backgroundColor = colorPicker.value;

startButton.addEventListener('click', function() {
    // Hide the start button and show the game area
    startButton.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    
    // Hide the start button
    startButton.style.display = 'none';

    // Resume animations
    gameContainer.style.animationPlayState = 'running';
    block.style.animationPlayState = 'running';

    // Start game logic
    startGame();
});

colorPicker.addEventListener('input', function() {
    character.style.backgroundColor = colorPicker.value;
});

function startGame() {
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space' && !character.classList.contains('animate')) {
            character.classList.add('animate');

            // Remove the animation class after the animation ends
            character.addEventListener('animationend', () => {
                character.classList.remove('animate');
            }, { once: true });
        }
    });

    var checklose = setInterval(function() {
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

        if (blockLeft < 20 && blockLeft > 0 && characterTop >= 130) {
            block.style.animation = "none";
            block.style.display = "none";
            alert("You hit the block, you lost! Try again.");
            resetGame();
        } else if (blockLeft < 0) {
            // Increment score when block passes the character
            score++;
            counter.innerText = "Score: " + score;

            // Increase speed every 10 jumps, but not too drastically
            if (score % 5 === 0) {
                blockAnimationDuration = Math.max(0.5, blockAnimationDuration * 0.9); // Increase speed gradually
            }

            // Reset block position to continue the game
            block.style.display = "none"; // Hide the block briefly
            setTimeout(function() {
                block.style.display = "block";
                block.style.left = "480px"; // Reset to start position
                block.style.animation = `block ${blockAnimationDuration}s infinite linear`; // Apply new speed
                block.style.animationPlayState = 'running';
            }, 10); // Small delay to ensure the block reset correctly
        }
    }, 10);
}

function resetGame() {
    // Reset score
    score = 0;
    counter.innerText = "Score: " + score;

    // Reset block position and animation speed
    block.style.display = "block";
    block.style.left = "480px"; // Ensure the block starts from the right side
    blockAnimationDuration = 1; // Reset to the initial speed for new game
    block.style.animation = `block ${blockAnimationDuration}s infinite linear`; // Reapply the initial animation speed
    block.style.animationPlayState = 'paused'; // Pause the block's animation

    // Show start button and hide game area
    startButton.classList.remove('hidden');
    startButton.style.display = 'block'; // Ensure button is visible
    gameContainer.classList.add('hidden');
    gameContainer.style.animationPlayState = 'paused'; // Pause animations
}

window.addEventListener('load', function(){
    // get the element id of myAudio
    let myAudio = document.getElementById("myAudio");
    
    //set isplaying to true on play
    myAudio.onplaying = function() {
      isPlaying = true;
    };

    //set isplaying to false on pause 
    myAudio.onpause = function() {
      isPlaying = false;
    };
});


//let is playing to be set to false at first so music doesnt play first unless button is pressed.
let isPlaying = false;

// declare function to toggle between play and pause
function togglePlay() {
    if (isPlaying) {
        myAudio.pause()
    } else {
        myAudio.play();
    }}

