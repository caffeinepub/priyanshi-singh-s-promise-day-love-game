# Specification

## Summary
**Goal:** Remove start screen personalization inputs and always use the fixed player name “Priyanshi” throughout the game.

**Planned changes:**
- Remove any name/personalization text input controls from the start/home screen UI.
- Set the displayed greeting/name on the start/home screen to always be “Priyanshi”.
- Ensure game state and hydration from saved progress cannot override the name, so all downstream screens (bonus/victory/keepsake) consistently show “Priyanshi”.
- Keep the start button flow unchanged so it still progresses to the next level as before.

**User-visible outcome:** The home screen no longer asks for a name; it always greets “Priyanshi”, and all later screens consistently display “Priyanshi” while gameplay continues as it did previously.
