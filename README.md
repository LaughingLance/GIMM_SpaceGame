This is a modification of the 42 Butterflies JavaScript game.

The changes that I made are:

Graphics:
  I changed the theming of the game to a space game.
    The background was changed to a moon landscape with stars and Earth in the background.
    The player was changed to an astronaut.
    The butterflies were changed to stars.
    
Code:
  The butterfly.js was changed to star.js and all the internal code removed the butterfly and replaced it with star
  and called the new star-sprite.png file to load the new star asset.
  
  I added a variable "orbit" to track to see if the player jumped to far away from the moon as entered orbit. This
  created the losing game condition. It is hard to lose, but that's ok.
  
  I changed gravity to a negative because the game is played upside down, so instead of pulling you down... it pushes you up.
  
  I changed the jump ket to down arrow and halved the maximum speed so that they couldn't jump so high. I also changed
  player.jumping to always false, so that the player could multi jump, which is needed to reach the higher stars, and
  if done enough leads to the losing "gone into orbit" condition.
  
  in the check to see if the level has been cleared I entered my winning and losing conditions
  
  Checking to see if the orbit variable has been set to true caused the losing condtion to clear the screen and put up a
  game over message.
  
  Also, if the losing condition hadn't been met, then the game checked to see if the levelCount equaled 10. If this was
  the case then the winning condition was met and the cleared screen placed the winning message.
  
  In setting up the player I chagned the vertical boundaries to now check for the floor at the top of the stage instead
  of at the bottom.
  
  To make my life easier I added a restart button onto the main html page that can be clicked at any point, and calls
  to the javascript to "location.reload(); which reloads the whole page and starts the game over.
  
  finally. I lowered the number of starting stars so that at level 10 the stage wouldn't be completely covered in stars.
  
  
  
  
